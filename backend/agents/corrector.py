import json
from llm.gemini import generate
from models.schemas import GeneratedAnswer


CORRECTOR_PROMPT = """
You are the Corrector Agent in VERITAS AI.

Your job is to correct an AI-generated answer after it
has failed independent verification.

You must use:

1. The original answer
2. The original claims
3. The verification result
4. The Critic's correction instructions
5. The research evidence

Do NOT ignore verification failures.

Do NOT invent evidence.

Remove unsupported claims.

Replace incorrect claims with claims supported by
the research evidence.

Return ONLY valid JSON.

Required format:

{
    "answer": "corrected answer",
    "claims": [
        "corrected claim 1",
        "corrected claim 2"
    ],
    "assumptions": [
        "assumption 1"
    ],
    "confidence": 0
}
"""


def correct_answer(
    user_query: str,
    generated: GeneratedAnswer,
    verification,
    critique_result: dict,
    research: dict
):

    prompt = f"""
{CORRECTOR_PROMPT}

USER QUESTION:
{user_query}

ORIGINAL ANSWER:
{generated.answer}

ORIGINAL CLAIMS:
{json.dumps(generated.claims, indent=2)}

VERIFICATION RESULT:
{json.dumps(
    verification.model_dump(),
    indent=2
)}

CRITIC ANALYSIS:
{json.dumps(
    critique_result,
    indent=2
)}

RESEARCH SUMMARY:
{research.get("summary", "")}

RESEARCH EVIDENCE:
{json.dumps(
    research.get("supports", []),
    indent=2
)}
"""

    response = generate(prompt)

    response = response.strip()

    if response.startswith("```"):
        response = response.replace("```json", "")
        response = response.replace("```", "")
        response = response.strip()

    try:

        data = json.loads(response)

        return GeneratedAnswer(**data)

    except Exception as e:

        raise ValueError(
            f"Corrector returned invalid JSON: {response}"
        ) from e