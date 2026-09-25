from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from agents.verifier import verify_answer
from agents.planner import create_plan
from agents.generator import generate_answer
from agents.researcher import research
from agents.critic import critique
from agents.corrector import correct_answer
# Create FastAPI app FIRST
app = FastAPI(title="VERITAS AI")
app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origin_regex=r"https://.*\.vercel\.app"
=======
     allow_origin_regex=r"https://.*\.vercel\.app",
>>>>>>> 37cbc19 (Fix Vercel CORS for production)
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class QueryRequest(BaseModel):
    query: str


# Home
@app.get("/")
def home():
    return {
        "message": "VERITAS AI Backend is running"
    }


# Plan endpoint
@app.post("/api/plan")
def plan(request: QueryRequest):

    result = create_plan(request.query)

    return {
        "success": True,
        "plan": result.model_dump()
    }


# Generate endpoint
@app.post("/api/generate")
def generate(request: QueryRequest):

    plan = create_plan(request.query)

    research_result = research(
        request.query
    )

    answer = generate_answer(
        request.query,
        plan,
        research_result
    )

    return {
        "success": True,

        "plan": plan.model_dump(),

        "research": research_result,

        "generation": answer.model_dump()
    }


# Verify endpoint
@app.post("/api/verify")
def verify(request: QueryRequest):

    # 1. Create plan
    plan = create_plan(request.query)

    # 2. Research
    research_result = research(request.query)

    # 3. Generate answer using research
    generated = generate_answer(
        request.query,
        plan,
        research_result
    )

    # 4. Verify generated answer
    verification = verify_answer(
    request.query,
    generated,
    research_result
    )

    return {
        "success": True,
        "query": request.query,
        "plan": plan.model_dump(),
        "research": research_result,
        "generation": generated.model_dump(),
        "verification": verification.model_dump()
    }

# Complete VERITAS AI pipeline
@app.post("/api/analyze")
def analyze(request: QueryRequest):

    # 1. Create plan
    plan = create_plan(request.query)

    # 2. Research
    research_result = research(request.query)

    # 3. Generate initial answer
    generated = generate_answer(
        request.query,
        plan,
        research_result
    )

    revisions = []

    # Maximum 2 verification attempts
    for attempt in range(2):

        # 4. Verify
        verification = verify_answer(
            request.query,
            generated,
            research_result
        )

        # 5. If verified, finish
        if verification.status == "PASS":

            return {
                "success": True,
                "decision": "PASS",
                "attempts": attempt + 1,

                "query": request.query,

                "plan": plan.model_dump(),

                "research": research_result,

                "generation": generated.model_dump(),

                "verification": verification.model_dump(),

                "revisions": revisions
            }

        # 6. If failed → Critic
        critic_result = critique(
            request.query,
            generated,
            verification
        )

        revisions.append({
            "attempt": attempt + 1,

            "verification": verification.model_dump(),

            "critic": critic_result
        })

        # 7. Correct the answer
        generated = correct_answer(
            request.query,
            generated,
            verification,
            critic_result,
            research_result
        )

    # 8. Final verification
    final_verification = verify_answer(
        request.query,
        generated,
        research_result
    )

    if final_verification.status == "PASS":
        decision = "PASS"
    else:
        decision = "REJECT"

    return {
        "success": True,

        "decision": decision,

        "attempts": 2,

        "query": request.query,

        "plan": plan.model_dump(),

        "research": research_result,

        "generation": generated.model_dump(),

        "verification": final_verification.model_dump(),

        "revisions": revisions
    }

@app.post("/api/demo")
def demo(request: QueryRequest):

    # 1. Create plan
    plan = create_plan(request.query)

    # 2. Research
    research_result = research(request.query)

    # 3. Generate normal answer
    generated = generate_answer(
        request.query,
        plan,
        research_result
    )

    # ------------------------------------------------
    # DEMO: Intentionally introduce a bad claim
    # ------------------------------------------------

    generated.answer = (
        "Electric vehicles are always cheaper than "
        "petrol cars and have zero environmental impact."
    )

    generated.claims = [
        "Electric vehicles are always cheaper than petrol cars.",
        "Electric vehicles have zero environmental impact."
    ]

    generated.confidence = 95

    # ------------------------------------------------
    # VERIFY BAD ANSWER
    # ------------------------------------------------

    first_verification = verify_answer(
        request.query,
        generated,
        research_result
    )

    # ------------------------------------------------
    # CRITIC
    # ------------------------------------------------

    critic_result = critique(
        request.query,
        generated,
        first_verification
    )

    # ------------------------------------------------
    # CORRECTOR
    # ------------------------------------------------

    corrected = correct_answer(
        request.query,
        generated,
        first_verification,
        critic_result,
        research_result
    )

    # ------------------------------------------------
    # VERIFY CORRECTED ANSWER
    # ------------------------------------------------

    final_verification = verify_answer(
        request.query,
        corrected,
        research_result
    )

    return {
        "success": True,

        "demo": True,

        "query": request.query,

        "plan": plan.model_dump(),

        "research": research_result,

        "initial_generation": generated.model_dump(),

        "initial_verification":
            first_verification.model_dump(),

        "critic": critic_result,

        "corrected_generation":
            corrected.model_dump(),

        "final_verification":
            final_verification.model_dump()
    }
