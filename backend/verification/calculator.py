import re


def calculate_expression(expression: str):
    """
    Safely evaluate simple arithmetic expressions.
    """

    if not re.fullmatch(r"[0-9+\-*/().\s]+", expression):
        raise ValueError("Unsupported expression")

    return eval(expression, {"__builtins__": {}}, {})


def verify_calculation(answer: str):

    # Basic demo detection.
    # Later we'll replace this with a proper calculation parser.

    patterns = [
        r"(\d+)\s*(?:multiplied by|x|\*)\s*(\d+)",
        r"(\d+)\s*\+\s*(\d+)",
        r"(\d+)\s*-\s*(\d+)",
    ]

    for pattern in patterns:

        match = re.search(pattern, answer.lower())

        if not match:
            continue

        a = int(match.group(1))
        b = int(match.group(2))

        if "multiplied" in pattern or "*" in pattern or "x" in pattern:
            expected = a * b
        elif "+" in pattern:
            expected = a + b
        else:
            expected = a - b

        numbers = re.findall(r"\b\d+\b", answer)

        if not numbers:
            continue

        generated = int(numbers[-1])

        if generated == expected:

            return {
                "status": "PASS",
                "score": 100,
                "reason": f"Calculation independently verified: {a} × {b} = {expected}"
            }

        return {
            "status": "FAIL",
            "score": 0,
            "reason": f"Expected {expected}, but generated answer contains {generated}"
        }

    return {
        "status": "SKIPPED",
        "score": 100,
        "reason": "No simple arithmetic expression detected"
    }