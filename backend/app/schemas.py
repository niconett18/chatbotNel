"""
Pydantic models for request / response validation.

Compatible with both Pydantic v1 and v2.
"""

from typing import List, Optional
from pydantic import BaseModel


class HistoryMessage(BaseModel):
    """A single message in the conversation history."""
    role: str          
    content: str


class ChatRequest(BaseModel):
    """Payload received from the frontend."""
    message: str
    history: Optional[List[HistoryMessage]] = []


class ChatResponse(BaseModel):
    """Payload returned to the frontend."""
    reply: str
