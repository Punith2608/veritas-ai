from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

response = client.models.generate_content(
    model="gemini-3.8-flash",
    contents="""
    Research this question using reliable web sources:

    What are the current advantages of electric vehicles?

    Give a concise answer and use web sources.
    """,
    config=types.GenerateContentConfig(
        tools=[
            types.Tool(
                google_search=types.GoogleSearch()
            )
        ]
    )
)

print("========== ANSWER ==========")
print(response.text)

print("\n========== GROUNDING METADATA ==========")

if response.candidates:
    candidate = response.candidates[0]

    if candidate.grounding_metadata:
        print(candidate.grounding_metadata)

    else:
        print("No grounding metadata found.")