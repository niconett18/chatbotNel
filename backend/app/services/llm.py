"""
LLM service – Google Gemini integration via REST API.

Uses the Gemini API directly through httpx for maximum compatibility.
"""

import httpx
from typing import List, Optional

from app.schemas import HistoryMessage

GEMINI_API_KEY = "AIzaSyCskHYsNdNjNBlzeWxNNiOikkLe59soBJw"
GEMINI_MODEL = "gemini-2.5-flash"
GEMINI_URL = (
    f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}"
    f":generateContent?key={GEMINI_API_KEY}"
)

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
    Send the conversation to Google Gemini and return the response.

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
    contents = []

    for msg in (history or [])[:-1]:
        role = "user" if msg.role == "user" else "model"
        contents.append({
            "role": role,
            "parts": [{"text": msg.content}],
        })

    contents.append({
        "role": "user",
        "parts": [{"text": message}],
    })

    payload = {
        "contents": contents,
        "systemInstruction": {
            "parts": [{"text": SYSTEM_INSTRUCTION}],
        },
        "generationConfig": {
            "temperature": 0.7,
            "topP": 0.95,
            "maxOutputTokens": 2048,
        },
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                GEMINI_URL,
                json=payload,
                headers={"Content-Type": "application/json"},
            )
            response.raise_for_status()
            data = response.json()

            candidates = data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                if parts:
                    return parts[0].get("text", "I couldn't generate a response.")

            return "I couldn't generate a response. Please try again."

    except httpx.TimeoutException:
        return "Sorry, the request timed out. Please try again."
    except httpx.HTTPStatusError as e:
        error_msg = f"Gemini API error: {e.response.status_code} - {e.response.text}"
        print(error_msg)
        return error_msg
    except Exception as e:
        print(f"Unexpected error: {e}")
        return "Sorry, something went wrong. Please try again."
