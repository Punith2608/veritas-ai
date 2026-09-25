import { useState } from "react";

import {
  ShieldCheck,
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BrainCircuit,
  FileCheck2,
  GitBranch,
  Calculator,
  ShieldAlert,
  History,
  Play,
  Database,
  BarChart3,
  Search,
  LockKeyhole,
} from "lucide-react";

import { transformResult } from "./api/veritas";

function App() {
  const [query, setQuery] = useState(
    "What is the capital of Australia?"
  );

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [selectedCase, setSelectedCase] =
    useState("normal");

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";

  /* =====================================================
     RUN VERIFICATION
     ===================================================== */

  const runVerification = async () => {
    if (!query.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(
        `${API_URL}/api/analyze`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            query: query.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Backend returned ${response.status}`
        );
      }

      const result = await response.json();

      console.log(
        "VERITAS BACKEND RESPONSE:",
        result
      );

      const transformed =
        transformResult(result);

      setData(transformed);

      // Automatically show result
      setTimeout(() => {
        document
          .getElementById("verification")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);

    } catch (err) {
      console.error(
        "VERITAS ERROR:",
        err
      );

      setError(
        "Unable to connect to VERITAS backend. Make sure FastAPI is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     DEMO QUESTIONS
     ===================================================== */

  const selectDemo = (type) => {
    setSelectedCase(type);
    setData(null);
    setError("");

    if (type === "normal") {
      setQuery(
        "What is the capital of Australia?"
      );
    }

    if (type === "hallucination") {
      setQuery(
        "What is the relationship between Narendra Modi and Giorgia Meloni? Explain their diplomatic relationship, major meetings, and areas of cooperation."
      );
    }

    if (type === "wrongCalculation") {
      setQuery(
        "What is 25 multiplied by 16?"
      );
    }

    if (type === "conflictingEvidence") {
      setQuery(
        "What are the major benefits and limitations of electric vehicles?"
      );
    }

    if (type === "insufficientEvidence") {
      setQuery(
        "What will be the exact price of Bitcoin 10 years from now?"
      );
    }
  };

  /* =====================================================
     HELPER VALUES
     ===================================================== */

  const displayData = data;

  const passedChecks = displayData
    ? displayData.checks.filter(
        (check) =>
          check.status === "PASS"
      ).length
    : 0;

  const getDecisionClass = () => {
    if (!displayData) return "";

    if (
      displayData.decision ===
      "VERIFIED"
    ) {
      return "verified";
    }

    if (
      displayData.decision ===
      "NEEDS CORRECTION"
    ) {
      return "correction";
    }

    return "rejected";
  };

  const getStatusIcon = (status) => {
    if (status === "PASS") {
      return <CheckCircle2 size={18} />;
    }

    return <XCircle size={18} />;
  };

  const getCheckIcon = (name) => {
    if (name.includes("Evidence")) {
      return <FileCheck2 />;
    }

    if (name.includes("Logic")) {
      return <BrainCircuit />;
    }

    if (name.includes("Calculation")) {
      return <Calculator />;
    }

    if (
      name.includes("Contradiction")
    ) {
      return <GitBranch />;
    }

    return <ShieldAlert />;
  };

  /* =====================================================
     NAVIGATION
     ===================================================== */

  const goTo = (id) => {
    const element =
      document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.warn(
        `Navigation target #${id} not found`
      );
    }
  };

  return (
    <div className="app">

      {/* =================================================
          BACKGROUND VIDEO
          ================================================= */}

      <video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="/background.mp4"
          type="video/mp4"
        />
      </video>

      <div className="video-overlay"></div>

      {/* =================================================
          HEADER
          ================================================= */}

      <header className="topbar">

        <div className="brand">

          <div className="brand-icon">
            <ShieldCheck size={27} />
          </div>

          <div>

            <div className="brand-name">
              VERITAS AI
            </div>

            <div className="brand-subtitle">
              AI ANSWER VERIFICATION ENGINE
            </div>

          </div>

        </div>

        <div className="system-status">

          <span className="status-dot"></span>

          <span>
            VERIFICATION ACTIVE
          </span>

        </div>

      </header>

      {/* =================================================
          NAVIGATION
          ================================================= */}

      <nav className="nav">

        <button
          type="button"
          className="nav-item active"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <BarChart3 size={17} />
          Dashboard
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() =>
            goTo("verification")
          }
        >
          <ShieldCheck size={17} />
          Verification
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() =>
            goTo("evidence")
          }
        >
          <Search size={17} />
          Evidence
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() =>
            goTo("audit")
          }
        >
          <History size={17} />
          Audit Trail
        </button>

        <button
          type="button"
          className="nav-item"
          onClick={() =>
            goTo("analytics")
          }
        >
          <Activity size={17} />
          Analytics
        </button>

      </nav>

      {/* =================================================
          MAIN
          ================================================= */}

      <main className="container">

        {/* =================================================
            HERO
            ================================================= */}

        <section className="hero">

          <div className="eyebrow">

            <Activity size={16} />

            MULTI-AGENT REASONING ENGINE

          </div>

          <h1>

            Verify every AI answer.

            <br />

            <span>
              Trust what survives verification.
            </span>

          </h1>

          <p>
            VERITAS separates generation from
            verification using independent agents,
            evidence grounding, contradiction
            detection and self-correction.
          </p>

          <div className="hero-stats">

            <div className="hero-stat">

              <ShieldCheck size={21} />

              <div>

                <strong>
                  LIVE
                </strong>

                <span>
                  VERIFICATION ENGINE
                </span>

              </div>

            </div>

            <div className="hero-stat">

              <Activity size={21} />

              <div>

                <strong>
                  6
                </strong>

                <span>
                  AI AGENTS
                </span>

              </div>

            </div>

            <div className="hero-stat">

              <LockKeyhole size={21} />

              <div>

                <strong>
                  SECURE
                </strong>

                <span>
                  VERIFICATION MODE
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            INPUT
            ================================================= */}

        <section className="panel input-panel">

          <div className="section-label">

            <span>01</span>

            INPUT

          </div>

          <div className="panel-heading">

            <div>

              <h2>
                Submit a task for verification
              </h2>

              <p>
                Give VERITAS a question to research,
                generate, verify and correct.
              </p>

            </div>

            <div className="secure-badge">

              <LockKeyhole size={15} />

              Secure Processing

            </div>

          </div>

          <div className="input-area">

            <textarea
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Enter a question..."
            />

            <button
              type="button"
              className="run-button"
              onClick={runVerification}
              disabled={loading}
            >

              <Play size={18} />

              {loading
                ? "Analyzing..."
                : "Run Verification"}

            </button>

          </div>

          {error && (

            <div
              style={{
                marginTop: "14px",
                padding: "10px 12px",
                border:
                  "1px solid rgba(239,68,68,.3)",
                borderRadius: "8px",
                color: "#fca5a5",
                background:
                  "rgba(239,68,68,.08)",
                fontSize: "11px",
              }}
            >

              {error}

            </div>

          )}

        </section>

        {/* =================================================
            DEMO SCENARIOS
            ================================================= */}

        <section className="demo-section">

          <div className="demo-title">
            DEMO SCENARIOS
          </div>

          <div className="demo-buttons">

            <button
              type="button"
              className={
                selectedCase === "normal"
                  ? "demo active"
                  : "demo"
              }
              onClick={() =>
                selectDemo("normal")
              }
            >

              <CheckCircle2 size={15} />

              Normal Question

            </button>

            <button
              type="button"
              className={
                selectedCase ===
                "hallucination"
                  ? "demo active"
                  : "demo"
              }
              onClick={() =>
                selectDemo(
                  "hallucination"
                )
              }
            >

              <AlertTriangle size={15} />

              Research Question

            </button>

            <button
              type="button"
              className={
                selectedCase ===
                "wrongCalculation"
                  ? "demo active"
                  : "demo"
              }
              onClick={() =>
                selectDemo(
                  "wrongCalculation"
                )
              }
            >

              <Calculator size={15} />

              Calculation

            </button>

            <button
              type="button"
              className={
                selectedCase ===
                "conflictingEvidence"
                  ? "demo active"
                  : "demo"
              }
              onClick={() =>
                selectDemo(
                  "conflictingEvidence"
                )
              }
            >

              <GitBranch size={15} />

              Conflicting Evidence

            </button>

            <button
              type="button"
              className={
                selectedCase ===
                "insufficientEvidence"
                  ? "demo active"
                  : "demo"
              }
              onClick={() =>
                selectDemo(
                  "insufficientEvidence"
                )
              }
            >

              <XCircle size={15} />

              Insufficient Evidence

            </button>

          </div>

        </section>

        {/* =================================================
            LOADING
            ================================================= */}

        {loading && (

          <section className="panel">

            <div
              style={{
                textAlign: "center",
                padding: "55px 20px",
              }}
            >

              <Activity size={35} />

              <h2>
                VERITAS is analyzing...
              </h2>

              <p>
                Planner → Researcher →
                Generator → Verifier →
                Critic → Corrector
              </p>

            </div>

          </section>

        )}

        {/* =================================================
            RESULTS
            ================================================= */}

        {displayData && !loading && (

          <>

            {/* =================================================
                GENERATED ANSWER
                ================================================= */}

            <section className="panel answer-panel">

              <div className="section-label">

                <span>02</span>

                GENERATED ANSWER

              </div>

              <div className="answer-header">

                <div>

                  <h2>
                    AI Generated Answer
                  </h2>

                  <p>
                    {displayData.question}
                  </p>

                </div>

                <div
                  className={`decision-badge ${getDecisionClass()}`}
                >
                  {displayData.decision}
                </div>

              </div>

              <div className="answer-box">

                <div className="answer-icon">

                  <BrainCircuit size={23} />

                </div>

                <div>

                  <div className="answer-label">
                    GENERATED RESPONSE
                  </div>

                  <p>
                    {displayData.answer}
                  </p>

                </div>

              </div>

            </section>

            {/* =================================================
                VERIFICATION
                ================================================= */}

            <section
              id="verification"
              className="verification-layout"
            >

              <div className="panel">

                <div className="section-label">

                  <span>03</span>

                  INDEPENDENT CHECKS

                </div>

                <div className="verification-header">

                  <div>

                    <h2>
                      Verification Results
                    </h2>

                    <p>
                      {passedChecks} /{" "}
                      {displayData.checks.length}{" "}
                      checks passed
                    </p>

                  </div>

                  <div className="agents">

                    <Activity size={16} />

                    Agents Completed

                    <strong>
                      {
                        displayData.checks.length
                      }
                      /
                      {
                        displayData.checks.length
                      }
                    </strong>

                  </div>

                </div>

                <div className="checks">

                  {displayData.checks.map(
                    (check, index) => (

                      <div
                        className="check-card"
                        key={index}
                      >

                        <div className="check-icon">

                          {getCheckIcon(
                            check.name
                          )}

                        </div>

                        <div className="check-content">

                          <div className="check-top">

                            <h3>
                              {check.name}
                            </h3>

                            <div
                              className={`check-status ${
                                check.status ===
                                "PASS"
                                  ? "pass"
                                  : "fail"
                              }`}
                            >

                              {getStatusIcon(
                                check.status
                              )}

                              {check.status}

                            </div>

                          </div>

                          <p>
                            {
                              check.explanation
                            }
                          </p>

                          <div className="check-bottom">

                            <div className="score-bar">

                              <div
                                className="score-fill"
                                style={{
                                  width: `${Math.min(
                                    Math.max(
                                      Number(
                                        check.score
                                      ) || 0,
                                      0
                                    ),
                                    100
                                  )}%`,
                                }}
                              />

                            </div>

                            <strong>
                              {check.score}%
                            </strong>

                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* =================================================
                  SIDE COLUMN
                  ================================================= */}

              <aside className="side-column">

                {/* CONFIDENCE */}

                <div className="panel confidence-panel">

                  <div className="section-label">
                    CONFIDENCE
                  </div>

                  <div className="confidence-circle">

                    <div className="confidence-inner">

                      <strong>
                        {
                          displayData
                            .confidence
                            .overall
                        }%
                      </strong>

                      <span>
                        CONFIDENCE
                      </span>

                    </div>

                  </div>

                  <div className="confidence-items">

                    <div>

                      <span>
                        Evidence
                      </span>

                      <strong>
                        {
                          displayData
                            .confidence
                            .evidence
                        }%
                      </strong>

                    </div>

                    <div>

                      <span>
                        Logic
                      </span>

                      <strong>
                        {
                          displayData
                            .confidence
                            .logic
                        }%
                      </strong>

                    </div>

                    <div>

                      <span>
                        Calculation
                      </span>

                      <strong>
                        {
                          displayData
                            .confidence
                            .calculation
                        }%
                      </strong>

                    </div>

                    <div>

                      <span>
                        Source Quality
                      </span>

                      <strong>
                        {
                          displayData
                            .confidence
                            .sourceQuality
                        }%
                      </strong>

                    </div>

                    <div>

                      <span>
                        Risk
                      </span>

                      <strong>
                        {
                          displayData
                            .confidence
                            .risk
                        }%
                      </strong>

                    </div>

                  </div>

                </div>

                {/* DECISION */}

                <div className="panel decision-panel">

                  <div className="section-label">
                    FINAL DECISION
                  </div>

                  <div
                    className={`decision-large ${getDecisionClass()}`}
                  >

                    {displayData.decision ===
                      "VERIFIED" && (
                      <CheckCircle2
                        size={34}
                      />
                    )}

                    {displayData.decision ===
                      "NEEDS CORRECTION" && (
                      <AlertTriangle
                        size={34}
                      />
                    )}

                    {displayData.decision ===
                      "REJECTED" && (
                      <XCircle
                        size={34}
                      />
                    )}

                    <strong>
                      {displayData.decision}
                    </strong>

                  </div>

                  <p className="decision-reason">

                    {displayData.reason}

                  </p>

                </div>

              </aside>

            </section>

            {/* =================================================
                EVIDENCE
                ================================================= */}

            <section
              id="evidence"
              className="panel"
            >

              <div className="section-label">

                <span>04</span>

                EVIDENCE

              </div>

              <div className="panel-heading">

                <div>

                  <h2>
                    Evidence Sources
                  </h2>

                  <p>
                    Independent sources used by
                    VERITAS during verification.
                  </p>

                </div>

                <Database size={22} />

              </div>

              <div className="evidence-grid">

                {displayData.evidence.length ===
                0 ? (

                  <p>
                    No external evidence sources
                    were returned.
                  </p>

                ) : (

                  displayData.evidence.map(
                    (item) => (

                      <div
                        className="evidence-card"
                        key={item.id}
                      >

                        <div className="evidence-icon">

                          <FileCheck2
                            size={21}
                          />

                        </div>

                        <div className="evidence-content">

                          <h3>
                            {item.source}
                          </h3>

                          <span>
                            {item.type}
                          </span>

                          <div className="evidence-bottom">

                            <span>
                              Relevance
                            </span>

                            <strong>
                              {
                                item.relevance
                              }%
                            </strong>

                          </div>

                          {item.url && (

                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View Source
                            </a>

                          )}

                        </div>

                        <div
                          className={
                            item.supported
                              ? "evidence-status supported"
                              : "evidence-status unsupported"
                          }
                        >

                          {item.supported
                            ? "SUPPORTED"
                            : "CHECK"}

                        </div>

                      </div>

                    )
                  )

                )}

              </div>

            </section>

            {/* =================================================
                CONTRADICTION
                ================================================= */}

            {displayData.contradiction && (

              <section className="panel contradiction-panel">

                <div className="section-label">

                  <span>05</span>

                  CONTRADICTION DETECTION

                </div>

                <div className="contradiction-title">

                  <AlertTriangle size={24} />

                  <div>

                    <h2>
                      Contradiction Detected
                    </h2>

                    <p>
                      Generated claim conflicts
                      with independent evidence.
                    </p>

                  </div>

                </div>

                <div className="comparison">

                  <div className="claim generated">

                    <span>
                      GENERATED CLAIM
                    </span>

                    <p>
                      {
                        displayData
                          .contradiction
                          .generated
                      }
                    </p>

                  </div>

                  <div className="claim evidence">

                    <span>
                      EVIDENCE A
                    </span>

                    <p>
                      {
                        displayData
                          .contradiction
                          .evidenceA
                      }
                    </p>

                  </div>

                  <div className="claim evidence">

                    <span>
                      EVIDENCE B
                    </span>

                    <p>
                      {
                        displayData
                          .contradiction
                          .evidenceB
                      }
                    </p>

                  </div>

                </div>

              </section>

            )}

            {/* =================================================
                AUDIT TRAIL
                ================================================= */}

            <section
              id="audit"
              className="panel"
            >

              <div className="section-label">

                <span>06</span>

                AUDIT TRAIL

              </div>

              <div className="history">

                {displayData.history.map(
                  (item, index) => (

                    <div
                      className="history-item"
                      key={`${item.attempt}-${index}`}
                    >

                      <div className="history-number">

                        {item.attempt}

                      </div>

                      <div className="history-content">

                        <div>

                          <strong>
                            Verification Attempt{" "}
                            {item.attempt}
                          </strong>

                          <span
                            className={
                              item.status ===
                              "PASS"
                                ? "history-pass"
                                : "history-fail"
                            }
                          >

                            {item.status}

                          </span>

                        </div>

                        <p>
                          {item.message}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </section>

          </>

        )}

        {/* =================================================
            ANALYTICS
            ================================================= */}

        <section
          id="analytics"
          className="panel"
        >

          <div className="section-label">

            <span>07</span>

            ANALYTICS

          </div>

          <div className="panel-heading">

            <div>

              <h2>
                Verification Analytics
              </h2>

              <p>
                Overview of the current VERITAS
                verification run.
              </p>

            </div>

            <BarChart3 size={22} />

          </div>

          <div className="hero-stats">

            <div className="hero-stat">

              <ShieldCheck size={21} />

              <div>

                <strong>
                  {displayData
                    ? `${displayData.confidence.overall}%`
                    : "--"}
                </strong>

                <span>
                  OVERALL CONFIDENCE
                </span>

              </div>

            </div>

            <div className="hero-stat">

              <CheckCircle2 size={21} />

              <div>

                <strong>
                  {displayData
                    ? `${passedChecks}/${displayData.checks.length}`
                    : "--"}
                </strong>

                <span>
                  CHECKS PASSED
                </span>

              </div>

            </div>

            <div className="hero-stat">

              <Activity size={21} />

              <div>

                <strong>
                  {displayData
                    ? displayData.history.length
                    : "--"}
                </strong>

                <span>
                  VERIFICATION ATTEMPTS
                </span>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* =================================================
          FOOTER
          ================================================= */}

      <footer>

        <div>

          <ShieldCheck size={17} />

          VERITAS AI · Independent AI Answer
          Verification

        </div>

        <span>
          System Operational
        </span>

      </footer>

    </div>
  );
}

export default App;