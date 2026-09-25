from agents.critic import critique
from agents.corrector import correct_answer


class FakeGenerated:

    answer = """
    Electric vehicles are always cheaper than petrol cars
    and have zero environmental impact.
    """

    claims = [
        "Electric vehicles are always cheaper than petrol cars",
        "Electric vehicles have zero environmental impact"
    ]

    assumptions = []


class FakeVerification:

    def model_dump(self):
        return {
            "status": "FAIL",
            "confidence": 30,
            "issues": [
                "Unsupported cost claim",
                "Incorrect environmental claim"
            ]
        }


fake_generated = FakeGenerated()
fake_verification = FakeVerification()


critique_result = critique(
    "Are electric vehicles better than petrol cars?",
    fake_generated,
    fake_verification
)


print("\n========== CRITIC ==========\n")
print(critique_result)


research = {
    "summary": """
    EVs can have lower operating costs, but upfront
    purchase prices may be higher. EVs have zero direct
    tailpipe emissions but still have lifecycle impacts.
    """,
    "supports": [
        {
            "text": "EVs have zero direct tailpipe emissions.",
            "source_indices": [0]
        },
        {
            "text": "EVs can have lower operating costs.",
            "source_indices": [1]
        }
    ]
}


corrected = correct_answer(
    "Are electric vehicles better than petrol cars?",
    fake_generated,
    fake_verification,
    critique_result,
    research
)


print("\n========== CORRECTED ANSWER ==========\n")
print(corrected.model_dump())