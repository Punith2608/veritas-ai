import json
import re


def parse_json_response(response: str):

    response = response.strip()

    # Remove markdown code fences
    response = re.sub(
        r"^```(?:json)?\s*",
        "",
        response,
        flags=re.IGNORECASE
    )

    response = re.sub(
        r"\s*```$",
        "",
        response
    )

    response = response.strip()

    # Try normal JSON first
    try:
        return json.loads(response)

    except json.JSONDecodeError:
        pass

    # Try extracting the JSON object
    start = response.find("{")
    end = response.rfind("}")

    if start != -1 and end != -1:
        json_text = response[start:end + 1]

        try:
            return json.loads(json_text)

        except json.JSONDecodeError:
            pass

    raise ValueError(
        f"Could not parse JSON response: {response[:500]}"
    )