from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os

# Add parent directory to path to allow importing from backend folder
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.comic import generate_comic_outline
from backend.doc import generate_dialogue
from backend.export import create_pdf

app = FastAPI(title="ComicCraft API")

# Setup CORS so the frontend can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ComicGenerationRequest(BaseModel):
    story_prompt: str
    character_name: str
    setting: str
    tone: str
    art_style: str
    panel_count: int

@app.post("/api/generate")
async def generate_comic(request: ComicGenerationRequest):
    """
    Endpoint to process a comic generation request.
    This integrates the backend logic while remaining separate from the static frontend.
    """
    # 1. Outline Generation
    outline = generate_comic_outline(request.story_prompt, request.panel_count)
    
    # 2. Dialogue Generation
    dialogue = generate_dialogue(outline, request.character_name, request.tone)
    
    # 3. Export formatting (e.g. PDF)
    pdf_url = create_pdf(dialogue, request.art_style)
    
    return {
        "status": "success",
        "data": {
            "outline": outline,
            "dialogue": dialogue,
            "pdf_url": pdf_url
        }
    }

# To run this server, you would typically use:
# pip install fastapi uvicorn pydantic
# uvicorn api.main:app --reload
