from agents.critic import critique


class FakeGenerated:

    answer = """
    Electric vehicles are always cheaper than petrol cars
    and have zero environmental impact.
    """

    claims = [
        "Electric vehicles are always cheaper than petrol cars",
        "Electric vehicles have zero environmental impact"
    ]


class FakeVerification:

    def model_dump(self):
        return {
            "status": "FAIL",
            "confidence": 30,
            "issues": [
                "Unsupported claim",
                "Environmental claim is too absolute"
            ]
        }


result = critique(
    "Are electric vehicles better than petrol cars?",
    FakeGenerated(),
    FakeVerification()
)

print("\n========== CRITIC RESULT ==========\n")
print(result)