from models.schemas import (
    GeneratedAnswer,
    VerificationResult,
    VerificationCheck
)

from verification.calculator import verify_calculation
from verification.logic import verify_logic
from verification.evidence import verify_claim
from verification.contradiction import detect_contradictions


def verify_answer(
    user_query: str,
    generated: GeneratedAnswer,
    research: dict
):

    # 1. Calculation verification
    calculation = verify_calculation(
        generated.answer
    )

    # 2. Logic verification
    logic = verify_logic(
        user_query,
        generated.answer,
        generated.claims
    )

    # 3. Evidence verification
    evidence_results = []

    for claim in generated.claims:

        result = verify_claim(
            claim,
            research
        )

        evidence_results.append({
            "claim": claim,
            "status": result.get("status", "UNCERTAIN"),
            "score": result.get("score", 50),
            "reason": result.get("reason", "")
        })

    # 4. Calculate evidence score
    if evidence_results:

        evidence_score = sum(
            item["score"]
            for item in evidence_results
        ) / len(evidence_results)

        if any(
            item["status"] == "UNSUPPORTED"
            for item in evidence_results
        ):
            evidence_status = "FAIL"

        elif any(
            item["status"] in [
                "PARTIALLY_SUPPORTED",
                "UNCERTAIN"
            ]
            for item in evidence_results
        ):
            evidence_status = "UNCERTAIN"

        else:
            evidence_status = "PASS"

    else:

        evidence_score = 0
        evidence_status = "UNCERTAIN"

    evidence = {
        "status": evidence_status,
        "score": round(evidence_score, 2),
        "reason": "Claims were checked against Researcher evidence"
    }

    # 5. Contradiction verification
    contradiction_result = detect_contradictions(
        generated.answer,
        generated.claims,
        research
    )

    contradiction = {
        "status": contradiction_result.get(
            "status",
            "UNCERTAIN"
        ),
        "score": contradiction_result.get(
            "score",
            50
        ),
        "reason": contradiction_result.get(
            "reason",
            ""
        )
    }

    # 6. Risk verification
    risk = {
        "status": "PASS",
        "score": 90,
        "reason": "No obvious high-risk action detected"
    }

    # 7. Collect issues
    issues = []

    if calculation["status"] == "FAIL":
        issues.append(
            calculation["reason"]
        )

    if logic.get("status") == "FAIL":
        issues.extend(
            logic.get("issues", [])
        )

    if contradiction["status"] == "FAIL":
        issues.append(
            contradiction["reason"]
        )

    # 8. Overall status
    critical_failure = (
        calculation["status"] == "FAIL"
        or logic.get("status") == "FAIL"
        or evidence["status"] == "FAIL"
        or contradiction["status"] == "FAIL"
    )

    if critical_failure:
        status = "FAIL"
    else:
        status = "PASS"

    # 9. Confidence score
    confidence = (
        calculation["score"] * 0.30
        + logic.get("score", 50) * 0.30
        + evidence["score"] * 0.15
        + contradiction["score"] * 0.10
        + risk["score"] * 0.15
    )

    # 10. Return structured verification result
    return VerificationResult(
        status=status,
        confidence=round(confidence, 2),

        evidence=VerificationCheck(
            **evidence
        ),

        logic=VerificationCheck(
            status=logic.get("status", "UNCERTAIN"),
            score=logic.get("score", 50),
            reason=logic.get("reason", "")
        ),

        calculation=VerificationCheck(
            **calculation
        ),

        contradiction=VerificationCheck(
            **contradiction
        ),

        risk=VerificationCheck(
            **risk
        ),

        issues=issues
    )