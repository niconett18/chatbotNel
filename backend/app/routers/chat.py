"""
Chat router – handles the POST /api/chat endpoint.
"""

from fastapi import APIRouter
from app.schemas import ChatRequest, ChatResponse
from app.services.llm import get_ai_response

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Receive a user message (and optional history) and return an AI response.

    The actual AI logic lives in `app.services.llm.get_ai_response`,
    making it trivial to swap in a real LLM provider later.
    """
    reply = await get_ai_response(request.message, request.history)
    return ChatResponse(reply=reply)
