import json

from llm.gemini import generate
from models.schemas import Plan, GeneratedAnswer
from utils.json_parser import parse_json_response


GENERATOR_PROMPT = """
You are the Generator Agent in VERITAS AI.

Your job is to answer the user's question using the
research evidence provided by the Researcher Agent.

IMPORTANT:

You are NOT allowed to blindly trust your own knowledge.

Use the provided evidence whenever possible.

Every important factual claim should be supported by
the supplied evidence.

If the evidence is insufficient or conflicting:
- Say that clearly.
- Do NOT invent information.
- Do NOT pretend uncertain information is verified.

Return ONLY valid JSON.

Required format:

{
    "answer": "draft answer",
    "claims": [
        "important claim 1",
        "important claim 2"
    ],
    "assumptions": [
        "assumption 1"
    ],
    "confidence": 0
}
"""


def generate_answer(
    user_query: str,
    plan: Plan,
    research: dict
) -> GeneratedAnswer:

    prompt = f"""
{GENERATOR_PROMPT}

USER QUERY:
{user_query}

PLANNER OBJECTIVE:
{plan.objective}

PLANNER TASKS:
{json.dumps(plan.tasks, indent=2)}

RESEARCH SUMMARY:
{research.get("summary", "")}

RESEARCH SOURCES:
{json.dumps(research.get("sources", []), indent=2)}

CLAIM → SOURCE MAPPINGS:
{json.dumps(research.get("supports", []), indent=2)}
"""

    response = generate(prompt)
     # Clean Gemini response
    response = response.strip()

    if response.startswith("```json"):
        response = response[7:]

    elif response.startswith("```"):
        response = response[3:]

    if response.endswith("```"):
        response = response[:-3]

    response = response.strip()
    try:
        data = parse_json_response(response)

        return GeneratedAnswer(**data)

    except Exception as e:

        raise ValueError(
            f"Generator returned invalid JSON: {response}"
        ) from e