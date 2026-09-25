import json
from llm.gemini import generate


CRITIC_PROMPT = """
You are the Critic Agent in VERITAS AI.

The generated answer failed verification.

Your job is to identify exactly what went wrong.

Analyze:

1. Unsupported claims
2. Contradictions
3. Logical problems
4. Incorrect calculations
5. Missing evidence

Then provide specific instructions for correcting the answer.

DO NOT write the corrected answer.

Return ONLY valid JSON.

Required format:

{
    "issues": [
        "issue 1",
        "issue 2"
    ],
    "corrections": [
        "correction 1",
        "correction 2"
    ],
    "priority": "HIGH"
}
"""


def critique(
    user_query: str,
    generated,
    verification
):

    prompt = f"""
{CRITIC_PROMPT}

USER QUESTION:
{user_query}

GENERATED ANSWER:
{generated.answer}

CLAIMS:
{json.dumps(generated.claims, indent=2)}

VERIFICATION RESULT:
{json.dumps(
    verification.model_dump(),
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

        return json.loads(response)

    except Exception:

        return {
            "issues": [
                "Critic returned invalid structured output"
            ],
            "corrections": [
                "Review all failed verification checks"
            ],
            "priority": "HIGH"
        }