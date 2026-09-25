import json

from llm.gemini import generate
from utils.json_parser import parse_json_response



LOGIC_PROMPT = """
You are an independent verification agent.

You are NOT the original answer generator.

Your job is to critically inspect an AI-generated answer.

Check:

1. Are the claims logically consistent?
2. Does the answer actually answer the question?
3. Are there obvious unsupported conclusions?
4. Does the answer contain contradictions?
5. Is the confidence level reasonable?

Do NOT simply agree with the generated answer.

Return ONLY valid JSON.
Do not use markdown.
Do not use ```json.
Do not include any explanation outside the JSON.

{
    "status": "PASS",
    "score": 90,
    "reason": "Short explanation",
    "issues": []
}

Possible status values:

PASS
FAIL
UNCERTAIN
"""


def verify_logic(
    user_query: str,
    answer: str,
    claims: list[str]
):

    prompt = f"""
{LOGIC_PROMPT}

USER QUESTION:
{user_query}

GENERATED ANSWER:
{answer}

CLAIMS:
{json.dumps(claims, indent=2)}
"""

    response = generate(prompt)

    # Remove markdown code fences if Gemini adds them
    response = response.strip()

    if response.startswith("```"):
        response = response.replace("```json", "")
        response = response.replace("```", "")
        response = response.strip()

    try:
        return parse_json_response(response)

    except Exception :

        return {
            "status": "UNCERTAIN",
            "score": 50,
            "reason": "Verifier returned invalid structured output",
            "issues": ["Invalid verifier response"]
        }