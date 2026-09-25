from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def research(query: str):

    prompt = f"""
You are the Researcher Agent in VERITAS AI.

Research the following question using Google Search:

{query}

Your job is NOT to produce the final answer.

Find reliable evidence that can be used by another AI
agent to answer the question.

Prefer:
- Government sources
- Universities
- Official organizations
- Primary sources
- Recent information

Be skeptical of unsupported claims.
"""

    response = client.models.generate_content(
        model="gemini-3.8-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            tools=[
                types.Tool(
                    google_search=types.GoogleSearch()
                )
            ]
        )
    )

    sources = []
    supports = []

    if response.candidates:

        metadata = response.candidates[0].grounding_metadata

        if metadata:

            # Extract sources
            for chunk in metadata.grounding_chunks:

                if chunk.web:

                    sources.append({
                        "title": chunk.web.title,
                        "url": chunk.web.uri
                    })

            # Extract claim-to-source mappings
            for support in metadata.grounding_supports:

                if support.segment:

                    supports.append({
                        "text": support.segment.text,
                        "source_indices":
                            support.grounding_chunk_indices
                    })

    return {
        "summary": response.text,
        "sources": sources,
        "supports": supports,
        "search_queries": (
            metadata.web_search_queries
            if response.candidates
            and metadata
            and metadata.web_search_queries
            else []
        )
    }