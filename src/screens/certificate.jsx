// =====================================================
// Certificate screen
// =====================================================

function CertificateScreen({ user, onBack }) {
  const issued = "April 29, 2026";
  const expires = "April 29, 2027";
  const certId = "SAT-2026-Q2-A047XF";

  return (
    <div className="fade-in" style={{ maxWidth: 980, margin: "40px auto", padding: "0 32px 60px" }}>
      <button onClick={onBack} style={{
        background: "transparent", border: "none", padding: 0,
        color: "var(--ink-500)", fontSize: 12.5, fontWeight: 500,
        display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16, whiteSpace: "nowrap",
      }}>
        <Icon.ArrowLeft size={14} /> Back to training
      </button>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 280px", gap: 20,
      }}>
        {/* Certificate */}
        <div style={{
          background: "#fffefb",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "44px 52px",
          position: "relative",
          overflow: "hidden",
          aspectRatio: "1.45 / 1",
          boxShadow: "var(--shadow-md)",
        }}>
          {/* Decorative borders */}
          <div style={{
            position: "absolute", inset: 18,
            border: "1px solid var(--navy-900)",
            borderRadius: 8, pointerEvents: "none",
          }}></div>
          <div style={{
            position: "absolute", inset: 22,
            border: "1px solid rgba(11,28,51,0.18)",
            borderRadius: 5, pointerEvents: "none",
          }}></div>
          {/* Corner ornaments */}
          {[
            { top: 30, left: 30 },
            { top: 30, right: 30 },
            { bottom: 30, left: 30 },
            { bottom: 30, right: 30 },
          ].map((pos, i) => (
            <div key={i} style={{
              position: "absolute", ...pos,
              width: 8, height: 8, borderRadius: "50%",
              background: "var(--accent)",
            }}></div>
          ))}
          {/* Faint watermark shield */}
          <div style={{
            position: "absolute", right: -40, bottom: -40,
            opacity: 0.04, color: "var(--navy-900)",
          }}>
            <Icon.Shield size={320} />
          </div>

          <div style={{ position: "relative", textAlign: "center", paddingTop: 18, display: "flex", justifyContent: "center" }}>
            <LogoMark height={30} />
          </div>

          <div style={{ position: "relative", textAlign: "center", marginTop: 20 }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
              letterSpacing: "0.32em", color: "var(--accent)",
              fontWeight: 500, textTransform: "uppercase",
            }}>
              Certificate of Completion
            </div>
            <div style={{
              fontSize: 13, color: "var(--ink-500)", marginTop: 22, fontStyle: "italic",
            }}>
              This is to certify that
            </div>
            <div style={{
              fontSize: 38, fontWeight: 700, color: "var(--navy-900)",
              letterSpacing: "-0.02em", marginTop: 14, fontFamily: "'Inter Tight', sans-serif",
            }}>
              {user.name}
            </div>
            <div style={{
              fontSize: 13, color: "var(--ink-500)", marginTop: 14, fontStyle: "italic",
            }}>
              has successfully completed the
            </div>
            <div style={{
              fontSize: 22, fontWeight: 700, color: "var(--navy-900)",
              letterSpacing: "-0.015em", marginTop: 8,
            }}>
              2026 Security Awareness Training Program
            </div>
            <div style={{
              fontSize: 13, color: "var(--ink-500)", marginTop: 12, lineHeight: 1.6,
              maxWidth: 520, margin: "12px auto 0",
            }}>
              comprising eight modules covering company policy, account security, data protection,
              phishing, device safety, physical security, and incident reporting, with a final assessment
              score of <strong style={{ color: "var(--ink-900)" }}>92%</strong>.
            </div>
          </div>

          <div style={{
            position: "relative",
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            marginTop: 36, paddingTop: 22,
            gap: 12,
          }}>
            <CertField label="Issued" value={issued} />
            <CertField label="Expires" value={expires} />
            <CertField label="Certificate ID" value={certId} mono />
          </div>

          <div style={{
            position: "relative", display: "flex",
            justifyContent: "space-between", alignItems: "flex-end",
            marginTop: 30,
          }}>
            <div>
              <div style={{
                fontFamily: "'Caveat', 'Brush Script MT', cursive",
                fontSize: 28, color: "var(--navy-900)", lineHeight: 1,
                fontStyle: "italic", marginBottom: 4,
              }}>
                E. Lindgren
              </div>
              <div style={{ borderTop: "1px solid var(--ink-700)", paddingTop: 4, fontSize: 11, color: "var(--ink-500)" }}>
                Erik Lindgren · Chief Information Security Officer
              </div>
            </div>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              border: "2px solid var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--accent)", textAlign: "center",
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 9,
              letterSpacing: "0.05em", lineHeight: 1.2, fontWeight: 600,
              transform: "rotate(-8deg)",
            }}>
              SYNERSYS<br />SECURITY<br />CERTIFIED
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div>
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 12, padding: "20px 22px", marginBottom: 14,
          }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--success)", fontSize: 13, fontWeight: 600, marginBottom: 8, whiteSpace: "nowrap" }}>
              <Icon.Check size={14} /> Issued & active
            </div>
            <div style={{ fontSize: 12.5, color: "var(--ink-500)", lineHeight: 1.55 }}>
              Your training record was updated on {issued}. Your manager has been notified automatically.
            </div>
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            <PrimaryButton full>
              <Icon.Download size={14} /> Download PDF
            </PrimaryButton>
            <SecondaryButton full style={{ whiteSpace: "nowrap" }}>Add to LinkedIn</SecondaryButton>
            <SecondaryButton full style={{ whiteSpace: "nowrap" }}>Email a copy</SecondaryButton>
          </div>

          <div style={{
            marginTop: 16, padding: "14px 16px",
            background: "var(--surface-3)", borderRadius: 10,
            fontSize: 12, color: "var(--ink-500)", lineHeight: 1.55,
          }}>
            <div style={{ fontWeight: 600, color: "var(--ink-700)", marginBottom: 4 }}>Verification</div>
            Anyone can verify this certificate at <span style={{ color: "var(--navy-700)", fontFamily: "'IBM Plex Mono', monospace" }}>verify.synersys.com</span> using the certificate ID.
          </div>
        </div>
      </div>
    </div>
  );
}

function CertField({ label, value, mono }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 9, color: "var(--ink-400)", textTransform: "uppercase", letterSpacing: "0.16em", fontWeight: 600, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{
        fontSize: 12,
        fontWeight: 600,
        color: "var(--ink-900)",
        fontFamily: mono ? "'IBM Plex Mono', monospace" : "inherit",
        letterSpacing: mono ? "0.04em" : "0",
      }}>
        {value}
      </div>
    </div>
  );
}

window.CertificateScreen = CertificateScreen;
