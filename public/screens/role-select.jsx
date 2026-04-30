// =====================================================
// Role Selection — shown after sign-in
// =====================================================

function RoleCard({ icon, title, description, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        background: "#fff",
        borderRadius: 16,
        padding: "36px 28px",
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.22)",
        border: hovered ? "2px solid var(--accent)" : "2px solid transparent",
      }}
    >
      <div style={{
        width: 56, height: 56, background: "var(--surface-3)",
        borderRadius: 14, display: "flex", alignItems: "center",
        justifyContent: "center", marginBottom: 20,
        border: "1px solid var(--border)",
      }}>
        {icon}
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--ink-900)", margin: "0 0 10px", letterSpacing: "-0.015em" }}>
        {title}
      </h2>
      <p style={{ fontSize: 13.5, color: "var(--ink-500)", lineHeight: 1.65, margin: "0 0 24px" }}>
        {description}
      </p>
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        color: hovered ? "var(--accent)" : "var(--navy-700)",
        fontWeight: 600, fontSize: 13,
        transition: "color 0.15s",
      }}>
        Continue as {title}
        <Icon.ArrowRight size={14} color={hovered ? "var(--accent)" : "var(--navy-700)"} />
      </div>
    </div>
  );
}

function RoleSelectScreen({ onSelectRole, userName }) {
  const firstName = userName ? userName.split(" ")[0] : "";

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0d2447 0%, #0f2138 50%, #0a1628 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      position: "relative",
    }}>
      {/* Background glow */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(circle at 75% 25%, rgba(63,115,179,0.18) 0%, transparent 50%),
                          radial-gradient(circle at 25% 80%, rgba(242,107,31,0.07) 0%, transparent 45%)`,
      }} />

      {/* Logo */}
      <div style={{ marginBottom: 48, position: "relative", zIndex: 1 }}>
        <div style={{
          background: "#fff", borderRadius: 10, padding: "8px 18px",
          display: "inline-flex", alignItems: "center",
        }}>
          <LogoMark height={30} />
        </div>
      </div>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 40, color: "#fff", position: "relative", zIndex: 1 }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
          letterSpacing: "0.18em", color: "var(--accent)",
          fontWeight: 500, marginBottom: 12, textTransform: "uppercase",
        }}>
          {firstName ? `Welcome, ${firstName}` : "Welcome"}
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.02em" }}>
          How are you accessing the portal?
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.58)", margin: 0 }}>
          Select your role to continue to the right view
        </p>
      </div>

      {/* Role cards */}
      <div style={{
        display: "flex", gap: 20, maxWidth: 660, width: "100%",
        position: "relative", zIndex: 1,
      }}>
        <RoleCard
          icon={<Icon.Book size={28} color="var(--navy-900)" />}
          title="Employee"
          description="Access your mandatory security awareness training, complete all modules, and earn your compliance certificate."
          onClick={() => onSelectRole("employee")}
        />
        <RoleCard
          icon={<Icon.Users size={28} color="var(--navy-900)" />}
          title="Administrator"
          description="Manage team members, monitor training completion, and ensure company-wide compliance requirements are met."
          onClick={() => onSelectRole("admin")}
        />
      </div>

      {/* Footer note */}
      <p style={{
        position: "relative", zIndex: 1,
        marginTop: 36, fontSize: 12, color: "rgba(255,255,255,0.35)",
        textAlign: "center",
      }}>
        Your role determines what you can access. Contact IT if you selected the wrong role.
      </p>
    </div>
  );
}

window.RoleSelectScreen = RoleSelectScreen;
