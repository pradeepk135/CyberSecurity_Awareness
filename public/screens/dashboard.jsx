// =====================================================
// Dashboard — matches Resume Generator visual system
// =====================================================

function Dashboard({ user, progress, completedAssessment, certIssued, onOpenModule, onOpenAssessment, onOpenCertificate }) {
  const completedCount = progress.filter(p => p === 100).length;
  const inProgressIdx = progress.findIndex(p => p > 0 && p < 100);
  const overall = Math.round(progress.reduce((a, b) => a + b, 0) / (MODULES.length * 100) * 100);
  const allModulesDone = completedCount === MODULES.length;
  const firstName = user.name.split(" ")[0];

  return (
    <div className="fade-in" style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 32px 48px" }}>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        subtitle="Your 2026 annual compliance training."
      />

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 18 }}>
        <KPICard
          label="Modules Completed"
          value={`${completedCount} / ${MODULES.length}`}
          icon={<Icon.Book size={18} color="var(--navy-700)" />}
          iconBg="var(--surface-3)"
        />
        <KPICard
          label="Overall Progress"
          value={`${overall}%`}
          icon={<Icon.Clock size={18} color="var(--accent-strong)" />}
          iconBg="var(--accent-soft)"
        />
        <ActionCard
          label="Quick Action"
          title={
            allModulesDone && !completedAssessment ? "Take Final Assessment"
            : allModulesDone && completedAssessment ? "View Certificate"
            : inProgressIdx >= 0 ? "Continue Module" : "Start Training"
          }
          onClick={() => {
            if (allModulesDone && !completedAssessment) onOpenAssessment();
            else if (allModulesDone && completedAssessment) onOpenCertificate();
            else onOpenModule(inProgressIdx >= 0 ? inProgressIdx : 0);
          }}
        />
      </div>

      {/* Two-column body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
        {/* LEFT — modules list */}
        <Card>
          <CardHeader title="Training Modules" right={<span style={{ fontSize: 12, color: "var(--ink-500)" }}>Complete in order</span>} />
          <div>
            {MODULES.map((m, i) => {
              const p = progress[i];
              const prevDone = i === 0 || progress[i - 1] === 100;
              const locked = !prevDone;
              const status = p === 100 ? "complete" : p > 0 ? "in-progress" : locked ? "locked" : "available";
              return (
                <ModuleRow
                  key={m.id}
                  module={m}
                  progress={p}
                  status={status}
                  isLast={i === MODULES.length - 1}
                  onClick={() => !locked && onOpenModule(i)}
                />
              );
            })}
          </div>
        </Card>

        {/* RIGHT — sidebar widgets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <CardHeader title="Final Assessment" />
            <div style={{ padding: "4px 18px 18px" }}>
              <div style={{ fontSize: 12.5, color: "var(--ink-500)", lineHeight: 1.55, marginBottom: 12 }}>
                10 multiple-choice questions. 80% to pass. Unlocks once all modules are complete.
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                {completedAssessment
                  ? <Pill tone="success" icon={<Icon.Check size={11} />}>Passed</Pill>
                  : allModulesDone
                  ? <Pill tone="accent">Ready</Pill>
                  : <Pill tone="neutral" icon={<Icon.Lock size={11} />}>Locked</Pill>}
                <span style={{ fontSize: 11.5, color: "var(--ink-400)" }}>~15 min</span>
              </div>
              <PrimaryButton full disabled={!allModulesDone} onClick={onOpenAssessment}>
                {completedAssessment ? "Review attempt" : "Start assessment"}
              </PrimaryButton>
            </div>
          </Card>

          <Card>
            <CardHeader title="Certificate" />
            <div style={{ padding: "4px 18px 18px" }}>
              <div style={{ fontSize: 12.5, color: "var(--ink-500)", lineHeight: 1.55, marginBottom: 12 }}>
                Issued automatically once you pass the final assessment. Valid for 12 months.
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                {certIssued
                  ? <Pill tone="success" icon={<Icon.Check size={11} />}>Issued</Pill>
                  : completedAssessment
                  ? <Pill tone="accent">Ready to issue</Pill>
                  : <Pill tone="neutral" icon={<Icon.Lock size={11} />}>Locked</Pill>}
                <span style={{ fontSize: 11.5, color: "var(--ink-400)" }}>PDF</span>
              </div>
              <SecondaryButton full onClick={onOpenCertificate}>
                {certIssued ? "View certificate" : "Issue certificate"}
              </SecondaryButton>
            </div>
          </Card>

          <div style={{
            background: "var(--navy-900)",
            color: "#fff",
            borderRadius: 12,
            padding: "14px 16px",
            fontSize: 12.5, lineHeight: 1.55,
          }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 6, color: "var(--accent)", fontWeight: 600, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              <Icon.Info size={13} /> Deadline
            </div>
            <div style={{ color: "rgba(255,255,255,0.78)" }}>
              Complete all required training by <strong style={{ color: "#fff" }}>May 14, 2026</strong>. Your manager has visibility on completion status only.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----- Card primitives -----
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      ...style,
    }}>{children}</div>
  );
}

function CardHeader({ title, right }) {
  return (
    <div style={{
      padding: "16px 18px",
      borderBottom: "1px solid var(--border)",
      display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
    }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: "var(--ink-900)", letterSpacing: "-0.005em", whiteSpace: "nowrap" }}>{title}</h3>
      <div style={{ whiteSpace: "nowrap" }}>{right}</div>
    </div>
  );
}

function KPICard({ label, value, icon, iconBg }) {
  return (
    <Card style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, minWidth: 0 }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 12.5, color: "var(--ink-500)", fontWeight: 500, marginBottom: 8, whiteSpace: "nowrap" }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: "var(--ink-900)", letterSpacing: "-0.02em", lineHeight: 1, whiteSpace: "nowrap" }}>{value}</div>
      </div>
      <div style={{
        width: 40, height: 40, borderRadius: 8,
        background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        {icon}
      </div>
    </Card>
  );
}

function ActionCard({ label, title, onClick }) {
  return (
    <Card style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, minWidth: 0 }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 12.5, color: "var(--ink-500)", fontWeight: 500, marginBottom: 8, whiteSpace: "nowrap" }}>{label}</div>
        <div style={{
          fontSize: 15, fontWeight: 700, color: "var(--ink-900)", letterSpacing: "-0.01em", lineHeight: 1.25,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{title}</div>
      </div>
      <button onClick={onClick} style={{
        width: 40, height: 40, borderRadius: 8,
        background: "var(--navy-900)", color: "#fff",
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, fontWeight: 300, lineHeight: 1,
      }}>+</button>
    </Card>
  );
}

function ModuleRow({ module: m, progress, status, isLast, onClick }) {
  const statusMap = {
    complete:    { pill: <Pill tone="success" icon={<Icon.Check size={11} />}>Complete</Pill>,    cta: "Review",   barColor: "#1f8a55" },
    "in-progress":{pill: <Pill tone="accent">In progress</Pill>,                                   cta: "Continue", barColor: "var(--accent)" },
    available:   { pill: <Pill tone="neutral">Not started</Pill>,                                  cta: "Start",    barColor: "var(--navy-900)" },
    locked:      { pill: <Pill tone="neutral" icon={<Icon.Lock size={11} />}>Locked</Pill>,        cta: "Locked",   barColor: "var(--ink-300)" },
  };
  const s = statusMap[status];
  const locked = status === "locked";

  return (
    <div
      onClick={onClick}
      style={{
        padding: "14px 18px",
        borderBottom: isLast ? "none" : "1px solid var(--border)",
        display: "grid",
        gridTemplateColumns: "auto 1fr 200px auto",
        gap: 16,
        alignItems: "center",
        cursor: locked ? "not-allowed" : "pointer",
        opacity: locked ? 0.55 : 1,
        transition: "background .12s ease",
      }}
      onMouseEnter={e => { if (!locked) e.currentTarget.style.background = "var(--surface-2)"; }}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: status === "complete" ? "#e3f4eb" : "var(--surface-3)",
        color: status === "complete" ? "#1f8a55" : "var(--ink-500)",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {status === "complete" ? <Icon.Check size={16} /> : m.code}
      </div>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-900)" }}>{m.title}</div>
        <div style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 2, display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
          <Icon.Clock size={12} /> {m.duration} min · {m.chapters.length} chapters
        </div>
      </div>
      <div>
        <ProgressBar value={progress} height={4} color={s.barColor} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {s.pill}
        {!locked && (
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--navy-700)", display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
            {s.cta} <Icon.ArrowRight size={12} />
          </span>
        )}
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
window.Card = Card;
window.CardHeader = CardHeader;
