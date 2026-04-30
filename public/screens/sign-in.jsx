// =====================================================
// Sign-in screen — split layout, navy hero + white card
// =====================================================

const ALLOWED_DOMAINS = ["zentiti.com", "synersystech.com"];

function SignInScreen({ onSignIn, userEmail, adminEmails }) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  function handleGoogle() {
    setError("");
    setLoading(true);

    // Simulate Google returning the signed-in account email
    setTimeout(() => {
      const email  = (userEmail || "").trim().toLowerCase();
      const domain = email.split("@")[1] || "";

      if (!ALLOWED_DOMAINS.includes(domain)) {
        setLoading(false);
        setError(
          `Access denied. Only @zentiti.com and @synersystech.com accounts are permitted. This account (${email || "unknown"}) is not authorised.`
        );
        return;
      }

      const isAdmin = (adminEmails || ["pradeep.k@zentiti.com"]).includes(email);
      onSignIn({ email, isAdmin });
    }, 700);
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr",
      background: "var(--side-bg)",
    }}>
      {/* LEFT — Hero */}
      <div style={{
        position: "relative",
        padding: "56px 72px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#fff",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0d2447 0%, #0f2138 50%, #0a1628 100%)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle at 80% 20%, rgba(63,115,179,0.18) 0%, transparent 50%),
                            radial-gradient(circle at 20% 90%, rgba(242,107,31,0.06) 0%, transparent 45%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 30% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 30% 50%, black 30%, transparent 80%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{
            display: "inline-flex", background: "#fff",
            borderRadius: 10, padding: "8px 16px", alignItems: "center",
          }}>
            <LogoMark height={32} />
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 460 }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
            letterSpacing: "0.18em", color: "var(--accent)",
            fontWeight: 500, marginBottom: 18, textTransform: "uppercase",
          }}>
            2026 Annual Compliance
          </div>
          <h1 style={{ fontSize: 40, lineHeight: 1.1, fontWeight: 700, margin: 0, letterSpacing: "-0.025em" }}>
            Security Awareness<br />Training Program
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(255,255,255,0.72)", marginTop: 16, marginBottom: 26, maxWidth: 420 }}>
            Complete your mandatory annual cybersecurity training. Eight modules, a final assessment, and your completion certificate.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["8 Training Modules", "Video-based Learning", "Completion Certificate", "Policy Acknowledgment"].map(t => (
              <span key={t} style={{
                fontSize: 12, fontWeight: 500, padding: "7px 14px", borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.85)",
              }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 28, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
          <span>ISO 27001 · SOC 2 Type II</span>
          <span>Estimated 90 minutes</span>
          <span>Due May 14, 2026</span>
        </div>
      </div>

      {/* RIGHT — Sign in card */}
      <div style={{
        background: "rgba(10,22,40,0.55)",
        borderLeft: "1px solid rgba(255,255,255,0.06)",
        padding: "56px",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div className="fade-in" style={{
          background: "#fff", borderRadius: 14, padding: 32,
          width: "100%", maxWidth: 380,
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          border: "1px solid var(--border)",
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: "var(--navy-900)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 22,
          }}>
            <Icon.Shield size={22} color="#fff" />
          </div>

          <h2 style={{ fontSize: 20, margin: 0, color: "var(--ink-900)", fontWeight: 700, letterSpacing: "-0.015em" }}>
            Sign in to continue
          </h2>
          <p style={{ fontSize: 13, color: "var(--ink-500)", marginTop: 6, marginBottom: 22, lineHeight: 1.5 }}>
            Use your Zentiti or Synersys work account to access the training portal.
          </p>

          {/* Error message */}
          {error && (
            <div style={{
              marginBottom: 16, padding: "12px 14px", borderRadius: 8,
              background: "var(--red-soft)", border: "1px solid rgba(220,38,38,0.2)",
              display: "flex", gap: 9, alignItems: "flex-start",
            }}>
              <div style={{ flexShrink: 0, marginTop: 1 }}>
                <Icon.X size={14} color="var(--red)" />
              </div>
              <span style={{ fontSize: 12.5, color: "var(--red)", lineHeight: 1.55 }}>{error}</span>
            </div>
          )}

          <button
            onClick={handleGoogle}
            disabled={loading}
            style={{
              width: "100%", padding: "11px 16px", borderRadius: 8,
              border: "1px solid var(--border-strong, #c8cdd8)", background: "#fff",
              fontSize: 13.5, fontWeight: 600, color: "var(--ink-900)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
              cursor: loading ? "wait" : "pointer",
              transition: "background .15s ease",
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "var(--surface-2)"; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#fff"; }}
          >
            {loading ? (
              "Signing in…"
            ) : (
              <>
                <svg width="17" height="17" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92a8.78 8.78 0 002.68-6.63z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 009 18z"/>
                  <path fill="#FBBC05" d="M3.97 10.71A5.41 5.41 0 013.68 9c0-.59.1-1.17.29-1.71V4.96H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.04l3.01-2.33z"/>
                  <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 009 0a9 9 0 00-8.04 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
                </svg>
                Sign in with Google
              </>
            )}
          </button>

          <div style={{
            marginTop: 16, padding: "12px 14px", borderRadius: 8,
            background: "var(--surface-3)",
            display: "flex", gap: 10, alignItems: "flex-start",
          }}>
            <div style={{ marginTop: 1, color: "var(--navy-700)", flexShrink: 0 }}>
              <Icon.Info size={15} />
            </div>
            <div style={{ fontSize: 12.5, color: "var(--ink-700)", lineHeight: 1.5 }}>
              Only <strong>@zentiti.com</strong> and <strong>@synersystech.com</strong> accounts are permitted. Personal accounts will be rejected.
            </div>
          </div>

          <div style={{
            marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--border)",
            fontSize: 11.5, color: "var(--ink-400)",
            display: "flex", justifyContent: "space-between",
          }}>
            <span>Need help? <a href="#" style={{ color: "var(--navy-700)", fontWeight: 500, textDecoration: "none" }}>Contact IT</a></span>
            <span>v4.2.1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

window.SignInScreen = SignInScreen;
