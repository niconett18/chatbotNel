"""
LLM service – Integration with OpenRouter.
"""

import os
import httpx
from typing import List, Optional
from dotenv import load_dotenv

from app.schemas import HistoryMessage

# Load environment variables from .env file
load_dotenv()

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
# Using a free model available on OpenRouter
OPENROUTER_MODEL = "google/gemini-2.5-flash"

SYSTEM_INSTRUCTION = (
    "You are NelBOT, a friendly and helpful AI assistant. "
    "You respond in a clear, concise, and conversational manner. "
    "When appropriate, use formatting such as bullet points or numbered lists. "
    "Keep responses focused and helpful."
)

async def get_ai_response(
    message: str,
    history: Optional[List[HistoryMessage]] = None,
) -> str:
    """
    Send the conversation to OpenRouter and return the response.

    Parameters
    ----------
    message : str
        The latest message from the user.
    history : list[HistoryMessage], optional
        Previous messages in the conversation.

    Returns
    -------
    str
        The AI-generated reply.
    """
    messages = [{"role": "system", "content": SYSTEM_INSTRUCTION}]

    for msg in (history or [])[:-1]:
        messages.append({
            "role": msg.role,
            "content": msg.content
        })

    messages.append({
        "role": "user",
        "content": message
    })
    
    payload = {
        "model": OPENROUTER_MODEL,
        "messages": messages,
        "max_tokens": 2048,
    }

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                OPENROUTER_URL,
                json=payload,
                headers=headers
            )
            response.raise_for_status()
            data = response.json()
            
            choices = data.get("choices", [])
            if choices:
                return choices[0].get("message", {}).get("content", "I couldn't generate a response.")

            return "I couldn't generate a response. Please try again."

    except httpx.TimeoutException:
        return "Sorry, the request timed out. Please try again."
    except httpx.HTTPStatusError as e:
        error_msg = f"OpenRouter API error: {e.response.status_code} - {e.response.text}"
        print(error_msg)
        return error_msg
    except Exception as e:
        print(f"Unexpected error: {e}")
        return "Sorry, something went wrong. Please try again."
