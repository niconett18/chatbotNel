"""
FastAPI backend for the AI Chatbot.

This module sets up the FastAPI application with CORS middleware
and registers the chat API router.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import chat

app = FastAPI(
    title="AI Chatbot API",
    description="Backend API for the AI Chatbot application",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api")


@app.get("/")
async def root():
    """Health-check endpoint."""
    return {"status": "ok", "message": "AI Chatbot API is running"}
