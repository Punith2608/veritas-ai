import json
from llm.gemini import generate
from utils.json_parser import parse_json_response

CONTRADICTION_PROMPT = """
You are the Contradiction Detection Agent in VERITAS AI.

Your job is to determine whether the generated answer
contains claims that contradict the supplied research evidence.

Check:

1. Does the answer contradict any research evidence?
2. Do different evidence sources disagree with each other?
3. Does the answer make an absolute claim when the evidence
   is conditional or limited?
4. Are there conflicting numerical values?

Return ONLY valid JSON.

Required format:

{
    "status": "PASS",
    "score": 95,
    "reason": "No meaningful contradiction detected",
    "issues": []
}

Allowed status values:

PASS
FAIL
UNCERTAIN
"""


def detect_contradictions(
    answer: str,
    claims: list[str],
    research: dict
):

    supports = research.get("supports", [])

    prompt = f"""
{CONTRADICTION_PROMPT}

GENERATED ANSWER:
{answer}

GENERATED CLAIMS:
{json.dumps(claims, indent=2)}

RESEARCH EVIDENCE:
{json.dumps(supports, indent=2)}
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

    except Exception:

        return {
            "status": "UNCERTAIN",
            "score": 50,
            "reason": "Contradiction verifier returned invalid JSON",
            "issues": [
                "Invalid structured verifier response"
            ]
        }