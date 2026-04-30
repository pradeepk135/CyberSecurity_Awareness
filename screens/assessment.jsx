// =====================================================
// Final Assessment — 10 Q multi-choice with score + retry
// =====================================================

function AssessmentScreen({ onPass, onBack, completed }) {
  const [phase, setPhase] = useState(completed ? "results" : "intro"); // intro | quiz | results
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [attempts, setAttempts] = useState(0);

  const total = ASSESSMENT_QUESTIONS.length;
  const correct = ASSESSMENT_QUESTIONS.filter((q, i) => answers[i] === q.answer).length;
  const scorePct = Math.round((correct / total) * 100);
  const passed = scorePct >= 80;

  function start() {
    setPhase("quiz");
    setCurrent(0);
    setAnswers({});
  }

  function submit() {
    setAttempts(a => a + 1);
    setPhase("results");
    if (scorePct >= 80) onPass();
  }

  function retry() {
    setAnswers({});
    setCurrent(0);
    setPhase("quiz");
  }

  // ----- INTRO -----
  if (phase === "intro") {
    return (
      <div className="fade-in" style={{ maxWidth: 720, margin: "60px auto", padding: "0 32px" }}>
        <button onClick={onBack} style={{
          background: "transparent", border: "none", padding: 0,
          color: "var(--ink-500)", fontSize: 12.5, fontWeight: 500,
          display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16, whiteSpace: "nowrap",
        }}>
          <Icon.ArrowLeft size={14} /> Back to training
        </button>

        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "40px 44px",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
            letterSpacing: "0.18em", color: "var(--accent)", fontWeight: 500, textTransform: "uppercase",
            marginBottom: 12,
          }}>
            Final Assessment
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
            Demonstrate your understanding
          </h1>
          <p style={{ fontSize: 15, color: "var(--ink-500)", lineHeight: 1.6, marginTop: 12, marginBottom: 28 }}>
            You're about to begin the final assessment for the 2026 Security Awareness Training Program. This is the last step before issuing your certificate.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
            <Fact label="Questions" value="10 multiple choice" />
            <Fact label="Time limit" value="None" />
            <Fact label="Passing score" value="80% (8 of 10)" />
            <Fact label="Attempts" value="Unlimited" />
          </div>

          <div style={{
            background: "var(--surface-3)", borderRadius: 10, padding: "14px 16px",
            display: "flex", gap: 10, fontSize: 13, color: "var(--ink-700)",
            lineHeight: 1.55, alignItems: "flex-start", marginBottom: 28,
          }}>
            <Icon.Info size={16} color="var(--navy-700)" />
            <div>
              By starting this assessment, you confirm that you've completed all eight training modules and that the answers you submit are your own work.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <PrimaryButton size="lg" onClick={start}>
              Begin assessment <Icon.ArrowRight size={15} />
            </PrimaryButton>
            <SecondaryButton size="lg" onClick={onBack}>Cancel</SecondaryButton>
          </div>
        </div>
      </div>
    );
  }

  // ----- QUIZ -----
  if (phase === "quiz") {
    const q = ASSESSMENT_QUESTIONS[current];
    const answeredCount = Object.keys(answers).length;
    const isLast = current === total - 1;

    return (
      <div className="fade-in" style={{ maxWidth: 760, margin: "32px auto", padding: "0 32px 40px" }}>
        {/* Top bar */}
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: "12px 16px",
          marginBottom: 18,
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <Pill tone="accent">Final Assessment</Pill>
          <div style={{ flex: 1 }}>
            <ProgressBar value={((current + 1) / total) * 100} height={4} color="var(--navy-900)" />
          </div>
          <div style={{ fontSize: 12.5, color: "var(--ink-500)", fontFamily: "'IBM Plex Mono', monospace", whiteSpace: "nowrap" }}>
            {current + 1} / {total}
          </div>
        </div>

        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "32px 36px",
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5,
            letterSpacing: "0.14em", color: "var(--ink-400)", fontWeight: 500, textTransform: "uppercase",
            marginBottom: 10,
          }}>
            Question {current + 1}
          </div>
          <h2 style={{ fontSize: 19, fontWeight: 600, margin: 0, lineHeight: 1.4, letterSpacing: "-0.01em" }}>
            {q.q}
          </h2>

          <div style={{ display: "grid", gap: 10, marginTop: 22 }}>
            {q.choices.map((c, ci) => {
              const selected = answers[current] === ci;
              return (
                <button
                  key={ci}
                  onClick={() => setAnswers(a => ({ ...a, [current]: ci }))}
                  style={{
                    background: selected ? "var(--accent-soft)" : "var(--surface)",
                    border: `1px solid ${selected ? "var(--accent)" : "var(--border)"}`,
                    color: selected ? "var(--accent-strong)" : "var(--ink-700)",
                    borderRadius: 10,
                    padding: "14px 16px",
                    textAlign: "left",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 14,
                    transition: "background .12s ease, border-color .12s ease",
                  }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: selected ? "var(--accent)" : "var(--surface-3)",
                    color: selected ? "#fff" : "var(--ink-400)",
                    fontSize: 12, fontWeight: 600,
                    fontFamily: "'IBM Plex Mono', monospace",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {String.fromCharCode(65 + ci)}
                  </div>
                  <span style={{ flex: 1 }}>{c}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nav */}
        <div style={{
          display: "flex", justifyContent: "space-between", marginTop: 20, alignItems: "center",
        }}>
          <SecondaryButton onClick={() => setCurrent(c => Math.max(0, c - 1))}>
            <Icon.ArrowLeft size={14} /> Previous
          </SecondaryButton>

          <div style={{ fontSize: 12.5, color: "var(--ink-500)" }}>
            {answeredCount} of {total} answered
          </div>

          {isLast ? (
            <PrimaryButton disabled={answeredCount !== total} onClick={submit}>
              Submit assessment <Icon.ArrowRight size={14} />
            </PrimaryButton>
          ) : (
            <PrimaryButton disabled={answers[current] === undefined} onClick={() => setCurrent(c => Math.min(total - 1, c + 1))}>
              Next question <Icon.ArrowRight size={14} />
            </PrimaryButton>
          )}
        </div>

        {/* Question grid */}
        <div style={{
          marginTop: 28, padding: 16,
          background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ fontSize: 11, color: "var(--ink-400)", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginRight: 4 }}>Jump to</span>
          {ASSESSMENT_QUESTIONS.map((_, i) => {
            const ans = answers[i] !== undefined;
            const cur = i === current;
            return (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: cur ? "var(--navy-900)" : ans ? "var(--accent-soft)" : "var(--surface-3)",
                  color: cur ? "#fff" : ans ? "var(--accent-strong)" : "var(--ink-500)",
                  border: "none",
                  fontSize: 12, fontWeight: 600,
                  fontFamily: "'IBM Plex Mono', monospace",
                  cursor: "pointer",
                }}
              >{i + 1}</button>
            );
          })}
        </div>
      </div>
    );
  }

  // ----- RESULTS -----
  return (
    <div className="fade-in" style={{ maxWidth: 760, margin: "40px auto", padding: "0 32px 60px" }}>
      <div style={{
        background: passed
          ? "linear-gradient(135deg, var(--navy-900), var(--navy-700))"
          : "var(--surface)",
        color: passed ? "#fff" : "var(--ink-900)",
        border: passed ? "none" : "1px solid var(--border)",
        borderRadius: 16,
        padding: "44px 48px",
        marginBottom: 18,
        position: "relative",
        overflow: "hidden",
      }}>
        {passed && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `radial-gradient(circle at 90% 20%, rgba(242,107,31,0.18) 0%, transparent 50%)`,
            pointerEvents: "none",
          }}></div>
        )}
        <div style={{ position: "relative" }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
            letterSpacing: "0.18em", color: passed ? "var(--accent)" : "var(--ink-400)",
            fontWeight: 500, textTransform: "uppercase", marginBottom: 12,
          }}>
            Result · Attempt {attempts || 1}
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
            {passed ? "Assessment passed." : "Not quite there yet."}
          </h1>
          <p style={{
            fontSize: 15,
            color: passed ? "rgba(255,255,255,0.78)" : "var(--ink-500)",
            lineHeight: 1.6, marginTop: 10, marginBottom: 28, maxWidth: 540,
          }}>
            {passed
              ? "Your training record has been updated and your certificate is ready to issue."
              : "You need 80% to pass. Review the questions below, then take the assessment again — there's no penalty for retrying."}
          </p>

          <div style={{ display: "flex", gap: 32, alignItems: "flex-end", marginBottom: 30 }}>
            <div>
              <div style={{ fontSize: 11, color: passed ? "rgba(255,255,255,0.55)" : "var(--ink-400)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                Score
              </div>
              <div style={{
                fontSize: 56, fontWeight: 700,
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: "-0.03em", lineHeight: 1,
                color: passed ? "#fff" : (scorePct >= 80 ? "var(--success)" : "var(--accent)"),
                marginTop: 4,
              }}>
                {scorePct}<span style={{ fontSize: 24, opacity: 0.6 }}>%</span>
              </div>
            </div>
            <div style={{ paddingBottom: 6 }}>
              <div style={{ fontSize: 13, color: passed ? "rgba(255,255,255,0.7)" : "var(--ink-500)" }}>
                {correct} of {total} correct
              </div>
              <div style={{ fontSize: 13, color: passed ? "rgba(255,255,255,0.7)" : "var(--ink-500)" }}>
                Passing score: 80%
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {passed ? (
              <>
                <PrimaryButton size="lg" onClick={onBack} style={{ background: "var(--accent)" }}>
                  View certificate <Icon.ArrowRight size={15} />
                </PrimaryButton>
                <SecondaryButton size="lg" onClick={retry} style={{ background: "transparent", borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>
                  Retake for practice
                </SecondaryButton>
              </>
            ) : (
              <>
                <PrimaryButton size="lg" onClick={retry}>
                  Retake assessment <Icon.ArrowRight size={15} />
                </PrimaryButton>
                <SecondaryButton size="lg" onClick={onBack}>Back to training</SecondaryButton>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Per-question review */}
      <div style={{
        background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12,
        overflow: "hidden",
      }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border)", fontSize: 13, fontWeight: 600 }}>
          Question review
        </div>
        {ASSESSMENT_QUESTIONS.map((q, i) => {
          const ans = answers[i];
          const ok = ans === q.answer;
          return (
            <div key={i} style={{
              padding: "16px 24px",
              borderBottom: i < total - 1 ? "1px solid var(--border)" : "none",
              display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, alignItems: "flex-start",
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                background: ok ? "var(--success-soft)" : "var(--danger-soft)",
                color: ok ? "var(--success)" : "var(--danger)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginTop: 2,
              }}>
                {ok ? <Icon.Check size={13} /> : <Icon.X size={13} />}
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink-900)", lineHeight: 1.4 }}>
                  Q{i + 1}. {q.q}
                </div>
                {!ok && ans !== undefined && (
                  <div style={{ fontSize: 12.5, color: "var(--ink-500)", marginTop: 4 }}>
                    Your answer: <span style={{ color: "var(--danger)", fontWeight: 500 }}>{q.choices[ans]}</span>
                    <span style={{ margin: "0 8px", color: "var(--ink-300)" }}>·</span>
                    Correct: <span style={{ color: "var(--success)", fontWeight: 500 }}>{q.choices[q.answer]}</span>
                  </div>
                )}
              </div>
              <Pill tone={ok ? "success" : "danger"}>{ok ? "Correct" : "Incorrect"}</Pill>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div style={{
      background: "var(--surface-2)",
      borderRadius: 10,
      padding: "12px 14px",
      border: "1px solid var(--border)",
    }}>
      <div style={{ fontSize: 11, color: "var(--ink-400)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, marginTop: 3, color: "var(--ink-900)" }}>{value}</div>
    </div>
  );
}

window.AssessmentScreen = AssessmentScreen;
