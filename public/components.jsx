// =====================================================
// Shared components — Resume-Generator-style chrome
// =====================================================
const { useState, useEffect, useRef, useMemo } = React;

// ---------- Logo (used inside white card on sidebar) ----------
function LogoMark({ height = 32 }) {
  return (
    <img
      src="assets/synersys-logo.png"
      alt="synersys"
      style={{ height, width: "auto", display: "block" }}
    />
  );
}

function LogoInverted({ height = 32 }) {
  // Logo is navy blue — put on white bg chip so it reads on dark backgrounds
  return (
    <div style={{
      background: "#fff", borderRadius: 8, padding: "6px 12px",
      display: "inline-flex", alignItems: "center",
    }}>
      <img src="assets/synersys-logo.png" alt="synersys" style={{ height, width: "auto", display: "block" }} />
    </div>
  );
}

// ---------- Icons ----------
const Icon = {
  Shield:  ({ size = 18, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 4.5-3.2 8.5-8 9-4.8-.5-8-4.5-8-9V6l8-3z"/></svg>),
  Check:   ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>),
  Play:    ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M7 5v14l12-7z"/></svg>),
  Lock:    ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>),
  ArrowRight: ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  ArrowLeft:  ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>),
  Info:    ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>),
  Clock:   ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>),
  Document:({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h8l4 4v14H7z"/><path d="M14 3v5h5"/></svg>),
  Users:   ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="3"/><path d="M3 19a6 6 0 0112 0"/><circle cx="17" cy="10" r="2.5"/><path d="M15 19a6 6 0 016-6"/></svg>),
  Award:   ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg>),
  Download:({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12M7 11l5 5 5-5"/><path d="M5 20h14"/></svg>),
  Logout:  ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2"/><path d="M21 12H10M17 8l4 4-4 4"/></svg>),
  Search:  ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4-4"/></svg>),
  X:       ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>),
  ChevronDown:({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>),
  ChevronUp:({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 15l6-6 6 6"/></svg>),
  Grid:    ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>),
  Book:    ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h11a3 3 0 013 3v13H7a3 3 0 01-3-3V4z"/><path d="M4 17a3 3 0 013-3h11"/></svg>),
  Sidebar: ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg>),
  ListCheck:({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/></svg>),
  Calendar:({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>),
  Trash:   ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>),
  Plus:    ({ size = 16, color = "currentColor" }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>),
};

// ---------- App shell (sidebar + content) ----------
function AppShell({ user, page, role, onNav, onSignOut, allModulesDone, completedAssessment, children }) {
  const [profileOpen, setProfileOpen] = useState(false);

  const navSections = [
    {
      title: "My Training",
      items: [
        { id: "dashboard",   label: "Dashboard",          icon: <Icon.Grid size={18} /> },
        { id: "assessment",  label: "Final Assessment",   icon: <Icon.ListCheck size={18} />, locked: !allModulesDone },
        { id: "certificate", label: "My Certificate",     icon: <Icon.Award size={18} />,     locked: !completedAssessment },
      ],
    },
    ...(role === "admin" ? [{
      title: "Admin",
      items: [
        { id: "manager", label: "Team Compliance", icon: <Icon.Users size={18} />, admin: true },
      ],
    }] : []),
  ];

  const navAlias = { modules: "dashboard", reports: "manager" };
  const activeMatch = id => (navAlias[page] || page) === id;

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "280px 1fr", background: "var(--bg)" }}>
      {/* SIDEBAR */}
      <aside style={{
        background: "var(--side-bg)",
        color: "var(--side-fg)",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid rgba(0,0,0,0.2)",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}>
        {/* Brand card */}
        <div style={{ padding: "16px 14px 14px" }}>
          <div style={{
            background: "#fff",
            borderRadius: 10,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
          }}>
            <LogoMark height={28} />
          </div>
          <div style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            marginTop: 12,
            letterSpacing: "-0.01em",
            lineHeight: 1.25,
            paddingLeft: 4,
          }}>
            Security Awareness<br />Portal
          </div>
        </div>

        {/* Sections */}
        <nav style={{ flex: 1, overflow: "auto", padding: "12px 12px 20px" }}>
          {navSections.map(section => (
            <div key={section.title} style={{ marginBottom: 14 }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px 8px",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--side-section)",
                letterSpacing: "0.04em",
              }}>
                <span style={{ whiteSpace: "nowrap" }}>{section.title}</span>
                <Icon.ChevronUp size={14} color="var(--side-section)" />
              </div>
              {section.items.map(item => {
                const active = activeMatch(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => onNav(item.id)}
                    disabled={item.locked}
                    style={{
                      width: "100%",
                      background: active ? "var(--side-item-active)" : "transparent",
                      border: "none",
                      color: active ? "#fff" : item.locked ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.78)",
                      textAlign: "left",
                      padding: "12px 14px",
                      fontSize: 14,
                      fontWeight: active ? 600 : 500,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      cursor: item.locked ? "not-allowed" : "pointer",
                      marginBottom: 2,
                      transition: "background .12s ease",
                    }}
                    onMouseEnter={e => { if (!active && !item.locked) e.currentTarget.style.background = "var(--side-item-hover)"; }}
                    onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                  >
                    <span style={{ color: active ? "var(--accent)" : item.locked ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.55)", display: "inline-flex" }}>
                      {item.icon}
                    </span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.locked && <Icon.Lock size={12} color="rgba(255,255,255,0.3)" />}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User card */}
        <div style={{
          margin: 10,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 10,
          padding: "10px 12px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }} onClick={() => setProfileOpen(o => !o)}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "var(--accent)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600,
          }}>
            {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.name}
            </div>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {user.email}
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onSignOut(); }} title="Sign out" style={{
            background: "transparent", border: "none", color: "rgba(255,255,255,0.5)",
            cursor: "pointer", padding: 4, display: "flex",
          }}>
            <Icon.Logout size={14} />
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Top utility bar */}
        <div style={{
          height: 48,
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 14,
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}>
          <div style={{ flex: 1 }}></div>
          <Pill tone="accent">2026 Annual Compliance</Pill>
        </div>

        <main style={{ flex: 1 }}>{children}</main>
      </div>
    </div>
  );
}

// ---------- Buttons ----------
function PrimaryButton({ children, onClick, disabled, full, size = "md", style = {} }) {
  const padY = size === "lg" ? 13 : 9;
  const padX = size === "lg" ? 22 : 16;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "var(--ink-300)" : "var(--navy-900)",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: `${padY}px ${padX}px`,
        fontSize: size === "lg" ? 14 : 13,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        width: full ? "100%" : "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        transition: "background .15s ease",
        ...style,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = "var(--navy-800)"; }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.background = "var(--navy-900)"; }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, full, size = "md", style = {} }) {
  const padY = size === "lg" ? 12 : 8;
  const padX = size === "lg" ? 20 : 14;
  return (
    <button
      onClick={onClick}
      style={{
        background: "var(--surface)",
        color: "var(--ink-700)",
        border: "1px solid var(--border-strong)",
        borderRadius: 8,
        padding: `${padY}px ${padX}px`,
        fontSize: size === "lg" ? 14 : 13,
        fontWeight: 600,
        width: full ? "100%" : "auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        cursor: "pointer",
        transition: "background .15s ease",
        ...style,
      }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--surface-2)"}
      onMouseLeave={e => e.currentTarget.style.background = "var(--surface)"}
    >
      {children}
    </button>
  );
}

// ---------- Progress bar ----------
function ProgressBar({ value, height = 6, color = "var(--navy-900)", track = "var(--surface-3)" }) {
  return (
    <div style={{ width: "100%", height, background: track, borderRadius: height, overflow: "hidden" }}>
      <div style={{ width: `${Math.max(0, Math.min(100, value))}%`, height: "100%", background: color, borderRadius: height, transition: "width .4s ease" }}></div>
    </div>
  );
}

// ---------- Pill ----------
function Pill({ tone = "neutral", children, icon }) {
  const tones = {
    neutral: { bg: "var(--surface-3)", fg: "var(--ink-700)" },
    success: { bg: "#e3f4eb", fg: "#1f8a55" },
    warn:    { bg: "#fbf1d9", fg: "#b67c0a" },
    danger:  { bg: "#fbe9e6", fg: "#c0392b" },
    accent:  { bg: "var(--accent-soft)", fg: "var(--accent-strong)" },
    navy:    { bg: "rgba(15,33,56,0.08)", fg: "var(--navy-900)" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: t.bg, color: t.fg,
      fontSize: 11, fontWeight: 600,
      padding: "4px 10px", borderRadius: 999,
      letterSpacing: "0.01em",
      whiteSpace: "nowrap",
    }}>{icon}{children}</span>
  );
}

// ---------- Page header (matches "Welcome back, Pradeep") ----------
function PageHeader({ title, subtitle, right }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--ink-900)", letterSpacing: "-0.01em" }}>
          {title}
        </h1>
        {subtitle && <p style={{ fontSize: 13.5, color: "var(--ink-500)", margin: "4px 0 0" }}>{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

Object.assign(window, {
  LogoMark, LogoInverted, Icon,
  AppShell, PrimaryButton, SecondaryButton,
  ProgressBar, Pill, PageHeader,
});
