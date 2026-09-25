 ##  VERITAS AI

### **Generate. Verify. Correct. Trust.**

> **A Multi-Agent AI Reasoning & Verification Engine**

[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react\&logoColor=black)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi\&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB?logo=python\&logoColor=white)](https://www.python.org/)
[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=google\&logoColor=white)](https://ai.google.dev/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel\&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render\&logoColor=black)](https://render.com/)

---

##  What is VERITAS AI?

Large Language Models can produce answers that **look correct but contain hallucinations, unsupported claims, calculation errors, logical inconsistencies, or contradictions**.

**VERITAS AI adds a dedicated verification layer between AI generation and the final response.**

Instead of simply generating an answer, VERITAS AI follows a multi-agent pipeline:

```text
User Query
    ↓
  Planner
    ↓
 Researcher
    ↓
 Generator
    ↓
Verification Hub
    ↓
 ┌──────────────┬──────────────┬────────────────┐
 │              │              │                │
Evidence      Logic       Calculation     Contradiction
 Check        Check          Check             Check
 │              │              │                │
 └──────────────┴──────────────┴────────────────┘
                       ↓
                  Risk Check
                       ↓
                 PASS / FAIL
                  │       │
                PASS     FAIL
                  │       ↓
                  │     Critic
                  │       ↓
                  │    Corrector
                  │       ↓
                  │  Verify Again
                  │       ↓
                  └── PASS / REJECT
```

###  Core Principle

**Generate → Verify → Critique → Correct → Verify Again → Accept or Reject**

VERITAS AI is designed to make AI responses **more evidence-aware, internally consistent, and trustworthy**.

---

#  Key Features

##  Multi-Agent AI Pipeline

Each agent has a dedicated responsibility instead of relying on a single AI response.

| Agent             | Responsibility                                               |
| ----------------- | ------------------------------------------------------------ |
|  **Planner**    | Breaks the user query into executable tasks                  |
| **Researcher** | Collects supporting evidence using Google Search grounding   |
| **Generator**  | Produces an evidence-aware answer and identifies key claims  |
| **Verifier**  | Independently evaluates the generated response               |
| **Critic**     | Identifies why a response failed verification                |
| **Corrector**  | Produces an improved response based on verification feedback |

---

#  Verification Engine

VERITAS AI doesn't blindly trust the generated answer.

It evaluates the response through multiple verification mechanisms:

###  Evidence Verification

Checks whether important claims are supported by available evidence.

###  Logic Verification

Checks consistency, relevance, and unsupported conclusions.

###  Calculation Verification

Independently validates arithmetic using deterministic Python logic.

###  Contradiction Detection

Identifies conflicts between claims and available evidence.

### Risk Check

Identifies potentially problematic output.

### Confidence Scoring

Combines verification signals into an overall confidence assessment.

---

#  Self-Correction

When verification fails, VERITAS AI doesn't immediately return the generated response.

Instead:

```text
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
  Verify Again
       ↓
 ┌─────┴─────┐
 ↓           ↓
PASS       REJECT
```

This creates a **closed-loop AI quality-control system**.

---

# System Architecture

```text
                         ┌───────────────┐
                         │     USER      │
                         └───────┬───────┘
                                 │
                                 ▼
                    ┌──────────────────────┐
                    │    React + Vite      │
                    │       Vercel         │
                    └──────────┬───────────┘
                               │
                              HTTPS
                               │
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI Backend   │
                    │        Render        │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
          ┌───────┐       ┌──────────┐     ┌───────────┐
          │Planner│       │Researcher│     │ Generator │
          └───┬───┘       └────┬─────┘     └─────┬─────┘
              │                │                  │
              └────────────────┼──────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │   Verification Hub   │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ▼                 ▼                 ▼
        Evidence            Logic           Calculation
          Check             Check              Check
             └─────────────────┼─────────────────┘
                               ▼
                    Contradiction Check
                               │
                               ▼
                         PASS / FAIL
                          │       │
                        PASS     FAIL
                          │       │
                          │       ▼
                          │     Critic
                          │       ↓
                          │    Corrector
                          │       ↓
                          │  Verify Again
                          │       ↓
                          └── PASS / REJECT
```

---

# Technology Stack

### Frontend

* ⚛️ React.js
* ⚡ Vite
* 🎨 Tailwind CSS
* 🟨 JavaScript
* 🔷 Lucide Icons

### Backend

* 🐍 Python 3.11+
* ⚡ FastAPI
* 📦 Pydantic
* 🚀 Uvicorn

### AI & Search

* ✨ Google Gemini API
* ⚡ Gemini Flash
* 🔎 Google Search Grounding

### Deployment

* 🐙 GitHub
* ▲ Vercel — Frontend
* 🚀 Render — Backend

---

#  Live Demo

###  Live Application

**[Open VERITAS AI](https://veritas-5jqgo76lv-punith2608s-projects.vercel.app/)**

###  Backend API

**[VERITAS AI Backend](https://veritas-ai-1-fkzp.onrender.com/)**

###  Interactive API Documentation

**[Swagger API Docs](https://veritas-ai-1-fkzp.onrender.com/docs)**

---

# API Overview

| Endpoint             | Purpose                                       |
| -------------------- | --------------------------------------------- |
| `GET /`              | Backend health check                          |
| `POST /api/plan`     | Creates an execution plan                     |
| `POST /api/generate` | Generates a research-backed answer            |
| `POST /api/verify`   | Independently verifies an answer              |
| `POST /api/analyze`  | Runs the complete VERITAS pipeline            |
| `POST /api/demo`     | Demonstrates verification and self-correction |

### Complete Pipeline

```text
POST /api/analyze
       ↓
    Planner
       ↓
   Researcher
       ↓
   Generator
       ↓
    Verifier
       ↓
   ┌───┴────┐
   ↓        ↓
 PASS      FAIL
   │        ↓
   │      Critic
   │        ↓
   │     Corrector
   │        ↓
   │   Verify Again
   │        ↓
   │    PASS / REJECT
   ↓
Final Response
```

---

#  Project Structure

```text
veritas-ai/
│
├── backend/
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
│   └── .python-version
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── data/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── architecture.md
│   └── API.md
│
├── .env.example
├── .gitignore
└── README.md
```

---

#  Getting Started

## Prerequisites

Install:

* Python 3.11+
* Node.js 18+
* npm
* Git
* Google Gemini API Key

---

##  Clone the Repository

```bash
git clone https://github.com/Punith2608/veritas-ai.git

cd veritas-ai
```

---

## Setup Backend

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create:

```text
backend/.env
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ Never commit your actual API key to GitHub.

---

##  Start Backend

```bash
uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

## Setup Frontend

Open another terminal:

```bash
cd frontend

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

Application:

```text
http://localhost:5173
```

---

#  Environment Variables

Create local `.env` files using the provided `.env.example`.

```env
GEMINI_API_KEY=your_gemini_api_key_here
VITE_API_URL=http://127.0.0.1:8000
```

### Production

```env
VITE_API_URL=https://veritas-ai-1-fkzp.onrender.com
```

Secrets should only be configured through the deployment environment.

---

#  Deployment

## Frontend — Vercel

Set:

```env
VITE_API_URL=https://veritas-ai-1-fkzp.onrender.com
```

Deploy the `frontend` application through Vercel.

## Backend — Render

### Root Directory

```text
backend
```

### Build Command

```bash
pip install -r requirements.txt
```

### Start Command

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Environment Variable

```env
GEMINI_API_KEY=your_gemini_api_key
```

---

#  Database

VERITAS AI currently **does not require a persistent database**.

The current hackathon implementation uses request-based processing through the multi-agent pipeline.

```text
No Database
     ↓
User Request
     ↓
Multi-Agent Pipeline
     ↓
Verification
     ↓
Final Response
```

---

# Security

Sensitive configuration is handled through environment variables.

The following files should **never** be committed:

```text
.env
backend/.env
frontend/.env
```

Only the safe template should be included:

```text
.env.example
```

---

#  Project Objective

The goal of VERITAS AI is to introduce a practical **quality-control layer for AI-generated information**.

Instead of treating an AI-generated response as automatically trustworthy, VERITAS AI separates:

```text
Generation
     ↓
Verification
     ↓
Critique
     ↓
Correction
     ↓
Re-Verification
     ↓
Acceptance / Rejection
```

This architecture is designed to address a fundamental challenge in generative AI:

> **An answer can sound convincing without actually being correct.**

---

#  Why VERITAS AI?

### Traditional AI Response

```text
User
 ↓
LLM
 ↓
Answer
```

### VERITAS AI

```text
User
 ↓
Planner
 ↓
Researcher
 ↓
Generator
 ↓
Verifier
 ↓
Critic / Corrector
 ↓
Re-Verification
 ↓
Trusted Output
```

The key difference is simple:

**VERITAS AI doesn't stop at generation. It adds a verification loop.**

---

#  Team

| Member                      | Student ID     |
| --------------------------- | -------------- |
| **K. Punith**               | `24102a040522` |
| **B. Sathwik**              | `24102a040495` |
| **Z. Shashi Vaedhan Reddy** | `24102a040490` |
| **R. Koteshwar Reddy**      | `24102a040540` |

---

#  Documentation

Detailed project documentation:

```text
docs/
├── architecture.md
└── API.md
```

---

#  Future Scope

Potential extensions include:

* More specialized verification agents
* Additional evidence sources
* Advanced claim-level verification
* More sophisticated confidence calibration
* Persistent verification history
* Expanded domain-specific verification
* Improved contradiction analysis
* Additional LLM providers

---

#  License

This project was developed as a **hackathon project by the VERITAS AI team**.

---

<div align="center">

##  VERITAS AI

### **Generate. Verify. Correct. Trust.**

**Making AI responses more reliable through multi-agent verification.**

</div>
