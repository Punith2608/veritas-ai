# VERITAS AI — Generate. Verify. Correct. Trust.

> **Multi-Agent AI Reasoning & Verification Engine**

VERITAS AI is a multi-agent AI reasoning and verification system designed to improve the reliability of AI-generated answers.

Instead of directly trusting a single AI-generated response, VERITAS AI creates an answer and then independently verifies it using multiple verification mechanisms such as evidence validation, logical consistency, calculation verification, contradiction detection, and risk analysis.

If an answer fails verification, VERITAS AI identifies the problem, corrects the answer, and verifies it again before presenting the final result.

---

## 🚀 Problem Statement

Large Language Models can generate convincing answers that may contain:

- Hallucinated facts
- Incorrect calculations
- Unsupported claims
- Logical inconsistencies
- Contradictory information
- Overconfident answers
- Missing or insufficient evidence

Traditional AI applications generally follow a simple flow:

text
User Question
      ↓
      AI
      ↓
   Answer

This approach can make it difficult to determine whether an AI-generated answer is actually reliable.

### The Challenge

How can we build an AI system that does not simply generate answers, but also **checks, challenges, corrects, and verifies its own output before accepting it?**

---

# 💡 Our Solution

VERITAS AI introduces a multi-agent verification pipeline.

Instead of relying on one AI response, the system separates reasoning into multiple logical agents.

text
                    USER QUERY
                        │
                        ▼
                  ┌───────────┐
                  │  PLANNER  │
                  └─────┬─────┘
                        │
                        ▼
                ┌──────────────┐
                │  RESEARCHER  │
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │  GENERATOR   │
                └──────┬───────┘
                       │
                       ▼
              ┌──────────────────┐
              │    VERIFICATION  │
              │       HUB        │
              └────────┬─────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   Evidence         Logic        Calculation
     Check           Check           Check
        │              │              │
        └──────────────┼──────────────┘
                       │
                Contradiction Check
                       │
                       ▼
                ┌──────────────┐
                │ PASS / FAIL  │
                └──────┬───────┘
                       │
              ┌────────┴────────┐
              │                 │
             PASS              FAIL
              │                 │
              ▼                 ▼
        Final Answer        ┌─────────┐
                            │ CRITIC  │
                            └────┬────┘
                                 │
                                 ▼
                           ┌──────────┐
                           │CORRECTOR │
                           └────┬─────┘
                                │
                                ▼
                          VERIFY AGAIN
                                │
                                ▼
                         FINAL / REJECT

The core idea is:

> **Generate → Verify → Critique → Correct → Verify Again → Accept or Reject**

---

# ✨ Key Features

## 1. Multi-Agent Reasoning

VERITAS AI separates the AI workflow into specialized logical agents.

### Planner Agent

Analyzes the user query and determines:

* What needs to be done
* Whether research is required
* Whether calculations are required
* Whether verification is required

---

### Researcher Agent

Searches for supporting information and evidence.

The researcher prioritizes:

* Government sources
* Universities
* Official organizations
* Primary sources
* Recent information

Google Search grounding is used to provide evidence for the generated response.

---

### Generator Agent

Generates an initial answer using the research evidence.

The generator also identifies:

* Important claims
* Assumptions
* Confidence level

---

### Verifier Agent

Independently evaluates the generated answer.

It checks:

* Evidence
* Logic
* Calculations
* Contradictions
* Risk

---

### Critic Agent

If verification fails, the Critic Agent analyzes the failure and identifies:

* Unsupported claims
* Logical problems
* Contradictions
* Incorrect calculations
* Missing evidence

The Critic does not directly rewrite the answer.

---

### Corrector Agent

Uses the original answer, verification results, critic instructions, and research evidence to create a corrected answer.

The corrected answer is then verified again.

---

# Verification Engine

VERITAS AI uses multiple verification mechanisms.

### Evidence Verification

Checks whether important claims are actually supported by the collected evidence.

Possible results:

text
SUPPORTED
PARTIALLY_SUPPORTED
UNSUPPORTED
UNCERTAIN


### Logic Verification

Checks whether:

* The answer addresses the original question
* Claims are logically consistent
* Conclusions are supported
* Confidence is reasonable

---

### Calculation Verification

Mathematical expressions are independently checked using deterministic Python calculations rather than relying only on an LLM.

Example:

text
25 × 16

Expected Result:
400

Generated Result:
400

Status:
PASS


### Contradiction Detection

Checks whether:

* The answer contradicts research evidence
* Sources disagree
* Absolute claims are made from conditional evidence
* Numerical values conflict

---

### Risk Check

Checks for potentially problematic or high-risk outputs.

---

# 🔄 Self-Correction Loop

If an answer fails verification, VERITAS AI does not immediately return it to the user.

Instead:

text
Generated Answer
       ↓
Verification
       ↓
     FAIL
       ↓
    Critic
       ↓
   Corrector
       ↓
Corrected Answer
       ↓
Verification Again
       ↓
   PASS → Final Answer
       │
       └── FAIL → REJECT

This creates a closed-loop AI quality-control system.

---

# 🎯 Example

### User Query

text
What is 25 multiplied by 16?

### Planner

Identifies:

text
Operation: Multiplication
Calculation required: Yes
Verification required: Yes
Research required: No


### Generator

Produces:

text
25 × 16 = 400


### Calculation Verifier

Independently calculates:

text
25 × 16 = 400


### Result

text
Calculation Check: PASS
Logic Check: PASS
Evidence Check: PASS
Contradiction Check: PASS

Decision: PASS

# 🧪 Failure Detection Example

VERITAS AI can also demonstrate how an AI-generated answer can be challenged.

An intentionally incorrect answer can be introduced:

text
Electric vehicles are always cheaper than
petrol cars and have zero environmental impact.


The verification system identifies problematic claims and sends the answer through:

text
FAIL
 ↓
CRITIC
 ↓
CORRECTOR
 ↓
VERIFY AGAIN


The corrected response can then qualify the original claims based on available evidence.



# Dashboard

The VERITAS AI interface provides a visual representation of the reasoning and verification process.

The dashboard includes:

* AI query interface
* Agent pipeline
* Generated answer
* Verification status
* Confidence breakdown
* Evidence sources
* Contradiction analysis
* Revision history
* Verification analytics
* Demo test cases

---

# 🏗️ System Architecture

text
┌─────────────────────────────────────┐
│            React Frontend            │
│             Vercel                  │
└─────────────────┬───────────────────┘
                  │
                  │ HTTPS
                  ▼
┌─────────────────────────────────────┐
│          FastAPI Backend             │
│             Render                  │
├─────────────────────────────────────┤
│                                     │
│  Planner → Researcher → Generator   │
│                       ↓             │
│                  Verification       │
│                       ↓             │
│               Critic → Corrector    │
│                                     │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│             Gemini API              │
│       Google Search Grounding       │
└─────────────────────────────────────┘


# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* JavaScript
* Lucide Icons

## Backend

* Python
* FastAPI
* Pydantic
* Uvicorn

## AI

* Google Gemini API
* Gemini Flash
* Google Search Grounding

## Verification

* Python deterministic calculation engine
* LLM-based logic verification
* Evidence verification
* Contradiction detection
* Risk analysis

## Deployment

* GitHub
* Vercel — Frontend
* Render — Backend

---

# 📁 Project Structure

text
veritas-ai/
│
├── backend/
│   │
│   ├── agents/
│   │   ├── planner.py
│   │   ├── researcher.py
│   │   ├── generator.py
│   │   ├── verifier.py
│   │   ├── critic.py
│   │   └── corrector.py
│   │
│   ├── verification/
│   │   ├── calculator.py
│   │   ├── logic.py
│   │   ├── evidence.py
│   │   └── contradiction.py
│   │
│   ├── models/
│   │   └── schemas.py
│   │
│   ├── llm/
│   │   └── gemini.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   ├── .env
│   └── .python-version
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── api/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md



# ⚙️ Local Setup

## Prerequisites

Make sure the following are installed:

* Python 3.11+
* Node.js 18+
* npm
* Git
* Gemini API key

---

# 🔑 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
```

Activate it:

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# 🔐 Configure Gemini API

Create:

```text
backend/.env
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit `.env` or expose the API key publicly.

---

# ▶️ Run Backend

From the `backend` directory:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 🌐 Frontend Setup

Open another terminal.

Navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the frontend:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

# 🔗 API Endpoints

## Health Check

```http
GET /
```

Returns:

```json
{
  "message": "VERITAS AI Backend is running"
}
```

---

## Create Plan

```http
POST /api/plan
```

Example:

```json
{
  "query": "What is 25 multiplied by 16?"
}
```

---

## Generate Answer

```http
POST /api/generate
```

Generates an answer using the planner, researcher, and generator agents.

---

## Verify Answer

```http
POST /api/verify
```

Runs the generated answer through the verification system.

---

## Full VERITAS Analysis

```http
POST /api/analyze
```

Runs the complete pipeline:

text
Planner
   ↓
Researcher
   ↓
Generator
   ↓
Verifier
   ↓
Critic
   ↓
Corrector
   ↓
Verifier Again
   ↓
PASS / REJECT


---

# 🚀 Deployment

## Frontend

The React frontend can be deployed using:

text
Vercel


Set the production environment variable:

env
VITE_API_URL=https://YOUR-RENDER-BACKEND.onrender.com


---

## Backend

The FastAPI backend can be deployed using:

text
Render


### Root Directory

text
backend


### Build Command

```bash
pip install -r requirements.txt
```

### Start Command

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Environment Variable

```text
GEMINI_API_KEY=your_gemini_api_key
```

---

# 👥 Team Members

| S.No | Team Member                 | Student ID     |
| ---- | --------------------------- | -------------- |
| 1    | **K. Punith**               | `24102a040522` |
| 2    | **B. Sathwik**              | `24102a040495` |
| 3    | **Z. Shashi Vaedhan Reddy** | `24102a040490` |
| 4    | **R. Koteshwar Reddy**      | `24102a040540` |

---

# 🎯 Hackathon Objective

VERITAS AI focuses on making AI systems more trustworthy by introducing an independent verification layer between AI generation and the final response.

Instead of asking:

> **"Can AI generate an answer?"**

VERITAS AI asks:

> **"Can AI generate an answer, verify it, identify its weaknesses, correct it, and prove why the final answer should be trusted?"**

---

# 🔮 Future Scope

Potential future improvements include:

* More specialized verification agents
* Advanced source credibility scoring
* Multi-model cross-verification
* Automated fact-checking
* Long-term verification memory
* Domain-specific verification agents
* Code execution verification
* Advanced mathematical theorem verification
* Document and PDF verification
* Multi-language verification
* Human-in-the-loop review
* Verification APIs for external AI applications

---

# 🏆 Why VERITAS AI?

Modern AI systems are becoming increasingly capable of generating information.

However, generation alone does not guarantee reliability.

VERITAS AI adds a quality-control layer that continuously asks:

text
Is the answer supported?
        ↓
Is the reasoning valid?
        ↓
Is the calculation correct?
        ↓
Are there contradictions?
        ↓
Is the confidence justified?
        ↓
If not → Can it be corrected?
        ↓
Verify again


### Generate.

### Verify.

### Correct.

### Trust.

---

## 📜 License

This project was developed as a hackathon project by the VERITAS AI team.

```
```
