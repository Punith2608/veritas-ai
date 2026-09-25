import json
from llm.gemini import generate
from utils.json_parser import parse_json_response

EVIDENCE_PROMPT = """
You are the Evidence Verification Agent in VERITAS AI.

Your job is to independently verify whether a generated
claim is supported by the research evidence.

DO NOT assume that the claim is correct.

Compare the CLAIM against the supplied evidence.

Return ONLY valid JSON:

{
    "status": "SUPPORTED",
    "score": 95,
    "reason": "The evidence directly supports the claim"
}

Allowed status values:

SUPPORTED
PARTIALLY_SUPPORTED
UNSUPPORTED
UNCERTAIN

Rules:

SUPPORTED:
The evidence directly supports the claim.

PARTIALLY_SUPPORTED:
The evidence supports part of the claim but not all of it.

UNSUPPORTED:
The evidence does not support the claim.

UNCERTAIN:
There is insufficient or conflicting evidence.
"""


def verify_claim(claim: str, research: dict):

    supports = research.get("supports", [])
    sources = research.get("sources", [])

    relevant_evidence = []

    for support in supports:

        text = support.get("text", "")

        if not text:
            continue

        # Give the verifier evidence that may relate
        # to the claim.
        relevant_evidence.append({
            "text": text,
            "source_indices": support.get(
                "source_indices", []
            )
        })

    prompt = f"""
{EVIDENCE_PROMPT}

CLAIM:
{claim}

RESEARCH EVIDENCE:
{json.dumps(relevant_evidence, indent=2)}

SOURCES:
{json.dumps(sources, indent=2)}
"""

    response = generate(prompt)

    try:
        return parse_json_response(response)

    except Exception:

        return {
            "status": "UNCERTAIN",
            "score": 50,
            "reason": "Evidence verifier returned invalid JSON"
        }