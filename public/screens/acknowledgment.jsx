// =====================================================
// Acknowledgment Form — gates the final assessment
// =====================================================

function AcknowledgmentScreen({ user, onAcknowledge, onBack }) {
  const [checks, setChecks] = React.useState([false, false, false, false]);
  const allChecked = checks.every(Boolean);

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  const statements = [
    "I confirm that I have personally completed all eight (8) modules of the Synersys Security Awareness Training Program and have not completed them on behalf of another person.",
    "I have watched the video content and reviewed the training material in each module with due care and attention.",
    "I commit to applying the security principles and best practices covered in this training in my day-to-day professional responsibilities at Synersys.",
    "I understand that this acknowledgment is formally recorded against my employee profile and may be referenced for compliance and audit purposes.",
  ];

  function toggle(i) {
    setChecks(prev => prev.map((v, idx) => idx === i ? !v : v));
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "48px 24px 64px",
    }}>
      <div className="fade-in" style={{ width: "100%", maxWidth: 700 }}>

        {/* Back link */}
        <button onClick={onBack} style={{
          background: "transparent", border: "none", padding: 0,
          color: "var(--ink-500)", fontSize: 13, fontWeight: 500,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          marginBottom: 28,
        }}>
          <Icon.ArrowLeft size={14} /> Back to Dashboard
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 54, height: 54, background: "var(--navy-900)",
            borderRadius: 14, display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 18px",
          }}>
            <Icon.Document size={26} color="#fff" />
          </div>
          <h1 style={{
            fontSize: 26, fontWeight: 700, color: "var(--ink-900)",
            margin: "0 0 8px", letterSpacing: "-0.02em",
          }}>
            Training Acknowledgment
          </h1>
          <p style={{ fontSize: 14, color: "var(--ink-500)", margin: 0, lineHeight: 1.6 }}>
            Please review and confirm each statement below before proceeding to the Final Assessment.
          </p>
        </div>

        {/* Main card */}
        <div style={{
          background: "#fff", borderRadius: 16,
          border: "1px solid var(--border)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}>
          {/* Formal declaration banner */}
          <div style={{
            background: "var(--navy-900)",
            padding: "20px 28px",
          }}>
            <div style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
              marginBottom: 8,
            }}>
              Formal Declaration
            </div>
            <p style={{
              fontSize: 14, color: "rgba(255,255,255,0.88)",
              lineHeight: 1.7, margin: 0,
            }}>
              I, <strong style={{ color: "#fff" }}>{user.name}</strong>, hereby declare that I have duly completed
              the mandatory Synersys Security Awareness Training Program for the period 2026.
              I make this acknowledgment in good faith and commit to upholding the information
              security standards outlined in this training.
            </p>
          </div>

          <div style={{ padding: "28px" }}>
            {/* Checkboxes */}
            <div style={{ marginBottom: 6 }}>
              <div style={{
                fontSize: 11, fontWeight: 600, color: "var(--ink-400)",
                textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: 14,
              }}>
                I confirm the following statements ({checks.filter(Boolean).length} of {statements.length} confirmed)
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {statements.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => toggle(i)}
                    style={{
                      display: "flex", gap: 14, cursor: "pointer",
                      padding: "14px 16px", borderRadius: 10,
                      background: checks[i] ? "rgba(22,163,74,0.05)" : "var(--surface-2)",
                      border: `1.5px solid ${checks[i] ? "rgba(22,163,74,0.3)" : "var(--border)"}`,
                      transition: "all 0.15s ease",
                      userSelect: "none",
                    }}
                  >
                    <div style={{
                      width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                      border: `2px solid ${checks[i] ? "var(--green)" : "var(--border-2)"}`,
                      background: checks[i] ? "var(--green)" : "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s ease", marginTop: 2,
                    }}>
                      {checks[i] && <Icon.Check size={11} color="#fff" />}
                    </div>
                    <span style={{ fontSize: 13.5, color: "var(--ink-700)", lineHeight: 1.65 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature line */}
            <div style={{
              borderTop: "1px solid var(--border)",
              marginTop: 24, paddingTop: 22,
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
            }}>
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: "var(--ink-400)",
                  textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7,
                }}>
                  Employee Name
                </div>
                <div style={{
                  fontSize: 14, fontWeight: 600, color: "var(--ink-900)",
                  padding: "10px 14px", background: "var(--surface-3)",
                  borderRadius: 8, border: "1px solid var(--border)",
                }}>
                  {user.name}
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: "var(--ink-400)",
                  textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7,
                }}>
                  Date of Acknowledgment
                </div>
                <div style={{
                  fontSize: 14, color: "var(--ink-700)",
                  padding: "10px 14px", background: "var(--surface-3)",
                  borderRadius: 8, border: "1px solid var(--border)",
                }}>
                  {today}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
          <div style={{ textAlign: "right" }}>
            {!allChecked && (
              <p style={{ fontSize: 12, color: "var(--ink-400)", marginBottom: 10 }}>
                Confirm all {statements.length} statements above to proceed.
              </p>
            )}
            <button
              onClick={allChecked ? onAcknowledge : undefined}
              disabled={!allChecked}
              style={{
                padding: "13px 32px", borderRadius: 10, border: "none",
                background: allChecked ? "var(--navy-900)" : "var(--border-2)",
                color: allChecked ? "#fff" : "var(--ink-400)",
                fontSize: 14, fontWeight: 600,
                cursor: allChecked ? "pointer" : "not-allowed",
                transition: "all 0.15s ease",
                display: "inline-flex", alignItems: "center", gap: 10,
                boxShadow: allChecked ? "0 4px 16px rgba(15,33,56,0.3)" : "none",
              }}
            >
              I Acknowledge — Proceed to Assessment
              <Icon.ArrowRight size={15} color={allChecked ? "#fff" : "var(--ink-400)"} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

window.AcknowledgmentScreen = AcknowledgmentScreen;
