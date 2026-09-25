export const testCases = {
  normal: {
    title: "Normal Question",

    question: "How long does Earth take to orbit the Sun?",

    answer:
      "The Earth completes one revolution around the Sun in approximately 365.25 days.",

    decision: "VERIFIED",

    reason:
      "The generated answer is supported by reliable evidence and passes all verification checks.",

    checks: [
      {
        name: "Evidence Check",
        status: "PASS",
        score: 96,
        explanation: "The claim is supported by reliable sources."
      },
      {
        name: "Logic Check",
        status: "PASS",
        score: 94,
        explanation: "The reasoning is logically consistent."
      },
      {
        name: "Calculation Check",
        status: "PASS",
        score: 100,
        explanation: "The numerical value is correct."
      },
      {
        name: "Contradiction Check",
        status: "PASS",
        score: 97,
        explanation: "No conflicting evidence was detected."
      },
      {
        name: "Risk Check",
        status: "PASS",
        score: 95,
        explanation: "No significant verification risk was detected."
      }
    ],

    evidence: [
      {
        id: 1,
        source: "Official Scientific Document",
        type: "Official Source",
        supported: true,
        relevance: 96
      },
      {
        id: 2,
        source: "Astronomy Research Article",
        type: "Research Article",
        supported: true,
        relevance: 91
      }
    ],

    confidence: {
      evidence: 96,
      logic: 94,
      calculation: 100,
      sourceQuality: 95,
      risk: 95,
      overall: 96
    },

    contradiction: null,

    history: [
      {
        attempt: 1,
        status: "PASS",
        message: "Answer generated and verified."
      }
    ]
  },

  hallucination: {
    title: "Hallucination",

    question: "Does the Moon have a permanent city?",

    answer:
      "The Moon has a permanent artificial city containing 2 million people.",

    decision: "REJECTED",

    reason:
      "The generated claim is not supported by reliable evidence.",

    checks: [
      {
        name: "Evidence Check",
        status: "FAIL",
        score: 18,
        explanation: "No reliable source supports the claim."
      },
      {
        name: "Logic Check",
        status: "FAIL",
        score: 32,
        explanation: "The claim contains unsupported assumptions."
      },
      {
        name: "Calculation Check",
        status: "PASS",
        score: 100,
        explanation: "No calculation error was detected."
      },
      {
        name: "Contradiction Check",
        status: "FAIL",
        score: 20,
        explanation: "Available evidence conflicts with the claim."
      },
      {
        name: "Risk Check",
        status: "FAIL",
        score: 25,
        explanation: "High hallucination risk detected."
      }
    ],

    evidence: [
      {
        id: 1,
        source: "Scientific Reference",
        type: "Research Article",
        supported: false,
        relevance: 82
      },
      {
        id: 2,
        source: "Space Agency Information",
        type: "Official Source",
        supported: false,
        relevance: 89
      }
    ],

    confidence: {
      evidence: 18,
      logic: 32,
      calculation: 100,
      sourceQuality: 90,
      risk: 25,
      overall: 24
    },

    contradiction: {
      generated:
        "Moon contains a permanent city with 2 million people.",
      evidenceA:
        "No permanent human settlement exists on the Moon.",
      evidenceB:
        "Current lunar missions do not establish a permanent city."
    },

    history: [
      {
        attempt: 1,
        status: "FAIL",
        message: "Unsupported claim"
      },
      {
        attempt: 2,
        status: "FAIL",
        message: "Evidence conflict"
      },
      {
        attempt: 3,
        status: "FAIL",
        message: "Rejected after verification"
      }
    ]
  },

  wrongCalculation: {
    title: "Wrong Calculation",

    question: "What is 25 × 4?",

    answer: "25 × 4 = 120",

    decision: "NEEDS CORRECTION",

    reason:
      "The calculation is incorrect. Independent verification gives 100.",

    checks: [
      {
        name: "Evidence Check",
        status: "PASS",
        score: 90,
        explanation: "The mathematical operation is clearly identified."
      },
      {
        name: "Logic Check",
        status: "PASS",
        score: 91,
        explanation: "The intended operation is understandable."
      },
      {
        name: "Calculation Check",
        status: "FAIL",
        score: 5,
        explanation: "25 × 4 equals 100, not 120."
      },
      {
        name: "Contradiction Check",
        status: "FAIL",
        score: 15,
        explanation: "The calculated result conflicts with the verified result."
      },
      {
        name: "Risk Check",
        status: "FAIL",
        score: 35,
        explanation: "Incorrect numerical output detected."
      }
    ],

    evidence: [
      {
        id: 1,
        source: "Arithmetic Verification",
        type: "Calculation Engine",
        supported: false,
        relevance: 100
      },
      {
        id: 2,
        source: "Independent Calculation",
        type: "Verification Source",
        supported: false,
        relevance: 98
      }
    ],

    confidence: {
      evidence: 90,
      logic: 91,
      calculation: 5,
      sourceQuality: 95,
      risk: 35,
      overall: 44
    },

    contradiction: {
      generated: "25 × 4 = 120",
      evidenceA: "25 × 4 = 100",
      evidenceB: "Independent calculation gives 100."
    },

    history: [
      {
        attempt: 1,
        status: "FAIL",
        message: "Incorrect calculation"
      },
      {
        attempt: 2,
        status: "FAIL",
        message: "Calculation conflict"
      }
    ]
  },

  conflictingEvidence: {
    title: "Conflicting Evidence",

    question: "What is the population according to the available sources?",

    answer: "Population = 12 million",

    decision: "NEEDS CORRECTION",

    reason:
      "Multiple evidence sources provide values that conflict with the generated claim.",

    checks: [
      {
        name: "Evidence Check",
        status: "FAIL",
        score: 62,
        explanation: "Sources provide conflicting population values."
      },
      {
        name: "Logic Check",
        status: "PASS",
        score: 88,
        explanation: "The generated statement is logically structured."
      },
      {
        name: "Calculation Check",
        status: "PASS",
        score: 100,
        explanation: "No arithmetic error detected."
      },
      {
        name: "Contradiction Check",
        status: "FAIL",
        score: 20,
        explanation: "Evidence values contradict the generated value."
      },
      {
        name: "Risk Check",
        status: "FAIL",
        score: 45,
        explanation: "Conflicting evidence increases uncertainty."
      }
    ],

    evidence: [
      {
        id: 1,
        source: "Official Population Report",
        type: "Official Source",
        supported: false,
        relevance: 94
      },
      {
        id: 2,
        source: "Research Article",
        type: "Research Article",
        supported: false,
        relevance: 87
      }
    ],

    confidence: {
      evidence: 62,
      logic: 88,
      calculation: 100,
      sourceQuality: 91,
      risk: 45,
      overall: 67
    },

    contradiction: {
      generated: "Population = 12 million",
      evidenceA: "Population = 10 million",
      evidenceB: "Population = 10.5 million"
    },

    history: [
      {
        attempt: 1,
        status: "FAIL",
        message: "Evidence conflict detected"
      },
      {
        attempt: 2,
        status: "FAIL",
        message: "Multiple sources disagree"
      }
    ]
  },

  insufficientEvidence: {
    title: "Insufficient Evidence",

    question: "Will a specific company launch a product next month?",

    answer:
      "The company will definitely launch the product next month.",

    decision: "REJECTED",

    reason:
      "There is not enough reliable evidence to verify this prediction.",

    checks: [
      {
        name: "Evidence Check",
        status: "FAIL",
        score: 30,
        explanation: "Insufficient reliable evidence was found."
      },
      {
        name: "Logic Check",
        status: "FAIL",
        score: 45,
        explanation: "The answer presents an uncertain prediction as fact."
      },
      {
        name: "Calculation Check",
        status: "PASS",
        score: 100,
        explanation: "No calculation was required."
      },
      {
        name: "Contradiction Check",
        status: "PASS",
        score: 80,
        explanation: "No direct contradiction was detected."
      },
      {
        name: "Risk Check",
        status: "FAIL",
        score: 30,
        explanation: "High uncertainty detected."
      }
    ],

    evidence: [
      {
        id: 1,
        source: "General News Article",
        type: "News",
        supported: false,
        relevance: 55
      },
      {
        id: 2,
        source: "Public Information",
        type: "General Source",
        supported: false,
        relevance: 48
      }
    ],

    confidence: {
      evidence: 30,
      logic: 45,
      calculation: 100,
      sourceQuality: 60,
      risk: 30,
      overall: 41
    },

    contradiction: null,

    history: [
      {
        attempt: 1,
        status: "FAIL",
        message: "Insufficient evidence"
      },
      {
        attempt: 2,
        status: "FAIL",
        message: "Unable to independently verify"
      }
    ]
  }
};