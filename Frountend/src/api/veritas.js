export function transformResult(result) {
  const verification = result.verification;
  const generation = result.generation;

  const checks = [
    {
      name: "Evidence Check",
      status:
        verification.evidence.status === "PASS"
          ? "PASS"
          : "FAIL",
      score: verification.evidence.score,
      explanation: verification.evidence.reason,
    },

    {
      name: "Logic Check",
      status:
        verification.logic.status === "PASS"
          ? "PASS"
          : "FAIL",
      score: verification.logic.score,
      explanation: verification.logic.reason,
    },

    {
      name: "Calculation Check",
      status:
        verification.calculation.status === "FAIL"
          ? "FAIL"
          : "PASS",
      score: verification.calculation.score,
      explanation: verification.calculation.reason,
    },

    {
      name: "Contradiction Check",
      status:
        verification.contradiction.status === "PASS"
          ? "PASS"
          : "FAIL",
      score: verification.contradiction.score,
      explanation: verification.contradiction.reason,
    },

    {
      name: "Risk Check",
      status:
        verification.risk.status === "PASS"
          ? "PASS"
          : "FAIL",
      score: verification.risk.score,
      explanation: verification.risk.reason,
    },
  ];

  const history = [];

  if (result.revisions) {
    result.revisions.forEach((revision) => {
      history.push({
        attempt: revision.attempt,
        status:
          revision.verification.status === "PASS"
            ? "PASS"
            : "FAIL",
        message:
          revision.verification.issues?.length
            ? revision.verification.issues.join(" ")
            : "Verification completed.",
      });
    });
  }

  history.push({
    attempt: result.attempts,
    status:
      result.decision === "PASS"
        ? "PASS"
        : "FAIL",

    message:
      result.decision === "PASS"
        ? "Answer passed final verification."
        : "Answer rejected after verification.",
  });

  return {
    question: result.query,

    answer: generation.answer,

    decision:
      result.decision === "PASS"
        ? "VERIFIED"
        : "REJECTED",

    reason:
      verification.status === "PASS"
        ? "Answer passed independent verification."
        : verification.issues?.join(" ") ||
          "Answer failed verification.",

    checks,

    confidence: {
      evidence: verification.evidence.score,
      logic: verification.logic.score,
      calculation: verification.calculation.score,
      sourceQuality: verification.evidence.score,
      risk: verification.risk.score,
      overall: verification.confidence,
    },

    evidence:
      (result.research?.sources || []).map(
        (source, index) => ({
          id: index + 1,
          source:
            source.title || "Research Source",
          type: "Google Search Grounding",
          supported:
            verification.evidence.status === "PASS",
          relevance: verification.evidence.score,
          url: source.url,
        })
      ),

    contradiction: null,

    history,
  };
}