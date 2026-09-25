import json
from llm.gemini import generate
from models.schemas import Plan
from utils.json_parser import parse_json_response

PLANNER_PROMPT = """
You are the Planner Agent in VERITAS AI.

Your job is to analyze the user's request and break it
into clear, executable tasks for other AI agents.

You MUST return valid JSON.

Required format:

{
    "objective": "short description",
    "tasks": [
        "task 1",
        "task 2",
        "task 3"
    ],
    "requires_research": true,
    "requires_calculation": false,
    "requires_verification": true
}

Rules:

1. Do not solve the problem.
2. Only identify what needs to be done.
3. Keep tasks specific and actionable.
4. Set requires_research to true if external information
   or evidence may be required.
5. Set requires_calculation to true if mathematical or
   computational work is required.
6. Verification should normally be true.
7. Return JSON only.
"""


def create_plan(user_query: str) -> Plan:

    prompt = f"""
{PLANNER_PROMPT}

USER QUERY:
{user_query}
"""

    response = generate(prompt)

    try:
        data = parse_json_response(response)
        return Plan(**data)

    except Exception as e:
        raise ValueError(
            f"Planner returned invalid JSON: {response}"
        ) from e