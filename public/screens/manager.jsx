// =====================================================
// Manager view — team compliance dashboard
// =====================================================

function ManagerScreen({ team, adminEmails, onAddMember, onRemoveMember, onPromote, onDemote }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "" });
  const [confirmRemove, setConfirmRemove] = useState(null); // name to confirm

  function exportCSV() {
    const headers = ["Name", "Role", "Progress (%)", "Modules Completed", "Status", "Score (%)", "Started", "Due Date"];
    const rows = team.map(t => [
      t.name, t.role, t.progress, t.modulesCompleted, t.status,
      t.score != null ? t.score : "",
      t.started || "—", t.due,
    ]);
    const csv = [headers, ...rows]
      .map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "synersys_team_compliance_2026.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const counts = {
    All: team.length,
    Complete: team.filter(t => t.status === "Complete").length,
    "In progress": team.filter(t => t.status === "In progress" || t.status === "Started").length,
    "Not started": team.filter(t => t.status === "Not started").length,
  };

  const filtered = (filter === "All" ? team
    : filter === "Complete" ? team.filter(t => t.status === "Complete")
    : filter === "In progress" ? team.filter(t => t.status === "In progress" || t.status === "Started")
    : team.filter(t => t.status === "Not started")
  ).filter(t => !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.role.toLowerCase().includes(search.toLowerCase()));

  const completion = Math.round(team.reduce((a, t) => a + t.progress, 0) / team.length);
  const avgScore = (() => {
    const scored = team.filter(t => t.score != null);
    return scored.length ? Math.round(scored.reduce((a, t) => a + t.score, 0) / scored.length) : null;
  })();
  const daysLeft = 14;

  function initials(name) {
    return name.split(" ").map(n => n[0]).join("").slice(0, 2);
  }

  const avatarColors = ["#3f73b3","#1f8a55","#b67c0a","#c0392b","#8e44ad","#16a085","#d35400","#2c3e50","#c0392b","#6d28d9","#0369a1","#15803d"];

  function handleAddSubmit() {
    if (!newMember.name.trim() || !newMember.email.trim()) return;
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    onAddMember({
      name: newMember.name.trim(),
      email: newMember.email.trim(),
      role: newMember.role.trim() || "Employee",
      progress: 0,
      status: "Not started",
      score: null,
      started: null,
      due: "May 14",
      modulesCompleted: 0,
    });
    setNewMember({ name: "", email: "", role: "" });
    setShowAddForm(false);
  }

  return (
    <div className="fade-in" style={{ padding: "28px 32px 48px", maxWidth: 1280, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "var(--ink-400)", textTransform: "uppercase", marginBottom: 4 }}>
            Operations Team · 2026 Annual Compliance
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "var(--ink-900)", letterSpacing: "-0.02em" }}>
            Team Compliance
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <SecondaryButton onClick={exportCSV}>
            <Icon.Download size={13} /> Export CSV
          </SecondaryButton>
          <PrimaryButton onClick={() => setShowAddForm(v => !v)}>
            <Icon.Plus size={13} /> Add Member
          </PrimaryButton>
        </div>
      </div>

      {/* Add member form */}
      {showAddForm && (
        <div className="scale-in" style={{
          background: "#fff", border: "1px solid var(--border)", borderRadius: 12,
          padding: "20px 24px", marginBottom: 20,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-900)", marginBottom: 14 }}>
            Add new team member
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto auto", gap: 10, alignItems: "flex-end" }}>
            {[
              { label: "Full name *", key: "name", placeholder: "e.g. Jagadeesh Kumar" },
              { label: "Work email *", key: "email", placeholder: "e.g. j.kumar@zentiti.com" },
              { label: "Job title", key: "role", placeholder: "e.g. Software Engineer" },
            ].map(f => (
              <div key={f.key}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-400)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                  {f.label}
                </div>
                <input
                  value={newMember[f.key]}
                  onChange={e => setNewMember(prev => ({ ...prev, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  onKeyDown={e => e.key === "Enter" && handleAddSubmit()}
                  style={{
                    width: "100%", padding: "9px 12px", borderRadius: 8,
                    border: "1px solid var(--border)", fontSize: 13,
                    outline: "none", color: "var(--ink-900)",
                  }}
                />
              </div>
            ))}
            <button
              onClick={handleAddSubmit}
              disabled={!newMember.name.trim() || !newMember.email.trim()}
              style={{
                padding: "9px 20px", borderRadius: 8, border: "none",
                background: (!newMember.name.trim() || !newMember.email.trim()) ? "var(--border-2)" : "var(--navy-900)",
                color: (!newMember.name.trim() || !newMember.email.trim()) ? "var(--ink-400)" : "#fff",
                fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              Add
            </button>
            <button
              onClick={() => { setShowAddForm(false); setNewMember({ name: "", email: "", role: "" }); }}
              style={{
                padding: "9px 14px", borderRadius: 8,
                border: "1px solid var(--border)", background: "var(--surface-2)",
                fontSize: 13, color: "var(--ink-600)", cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <MgrKPI
          label="Team size"
          value={team.length}
          sub="members enrolled"
          icon={<Icon.Users size={16} color="var(--navy-700)" />}
          iconBg="var(--surface-3)"
        />
        <MgrKPI
          label="Completion rate"
          value={`${completion}%`}
          sub={<ProgressBar value={completion} height={4} />}
          icon={<Icon.Book size={16} color="var(--accent-strong)" />}
          iconBg="var(--accent-soft)"
          isBar
        />
        <MgrKPI
          label="Avg. assessment score"
          value={avgScore != null ? `${avgScore}%` : "—"}
          sub={avgScore != null ? "From completed members" : "No completions yet"}
          icon={<Icon.Award size={16} color="#1f8a55" />}
          iconBg="#e3f4eb"
        />
        <MgrKPI
          label="Days to deadline"
          value={daysLeft}
          sub="Deadline: May 14, 2026"
          icon={<Icon.Clock size={16} color="var(--accent-strong)" />}
          iconBg="var(--accent-soft)"
          tone="accent"
        />
      </div>

      {/* Progress rings summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Complete", count: counts.Complete, color: "#1f8a55", bg: "#e3f4eb" },
          { label: "In progress", count: counts["In progress"], color: "var(--accent)", bg: "var(--accent-soft)" },
          { label: "Not started", count: counts["Not started"], color: "var(--ink-400)", bg: "var(--surface-3)" },
        ].map(s => (
          <div key={s.label} style={{
            background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10,
            padding: "14px 18px", display: "flex", alignItems: "center", gap: 14,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%", background: s.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 17, fontWeight: 700, color: s.color,
            }}>
              {s.count}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-900)", whiteSpace: "nowrap" }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 1 }}>
                {Math.round(s.count / team.length * 100)}% of team
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <ProgressBar value={s.count / team.length * 100} height={3} color={s.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
        {/* Table toolbar */}
        <div style={{
          padding: "14px 18px",
          borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          {/* Filter pills */}
          <div style={{ display: "flex", gap: 6 }}>
            {["All", "Complete", "In progress", "Not started"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600,
                border: "1px solid " + (filter === f ? "var(--navy-900)" : "var(--border)"),
                background: filter === f ? "var(--navy-900)" : "var(--surface)",
                color: filter === f ? "#fff" : "var(--ink-600)",
                cursor: "pointer", whiteSpace: "nowrap",
                display: "inline-flex", alignItems: "center", gap: 6,
              }}>
                {f}
                <span style={{
                  background: filter === f ? "rgba(255,255,255,0.2)" : "var(--surface-3)",
                  color: filter === f ? "#fff" : "var(--ink-500)",
                  borderRadius: 999, padding: "1px 6px", fontSize: 10,
                }}>{counts[f] ?? team.length}</span>
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            border: "1px solid var(--border)", borderRadius: 8,
            padding: "7px 12px", background: "var(--surface-2)",
            width: 220,
          }}>
            <Icon.Search size={13} color="var(--ink-400)" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search members..."
              style={{
                background: "transparent", border: "none", outline: "none",
                fontSize: 13, color: "var(--ink-900)", width: "100%",
              }}
            />
          </div>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--surface-2)" }}>
              {["Member", "Role", "Progress", "Modules", "Status", "Score", "Started", "Deadline", ""].map(h => (
                <th key={h} style={{
                  padding: "10px 16px", textAlign: "left",
                  fontSize: 11, fontWeight: 600, color: "var(--ink-400)",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  borderBottom: "1px solid var(--border)",
                  whiteSpace: "nowrap",
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => {
              const isComplete = t.status === "Complete";
              const isNotStarted = t.status === "Not started";
              const statusTone = isComplete ? "success" : isNotStarted ? "neutral" : "accent";
              const avatarColor = avatarColors[i % avatarColors.length];
              const isConfirming = confirmRemove === t.name;
              const memberIsAdmin = t.email && (adminEmails || []).includes(t.email);
              const isOwner = t.email === "pradeep.k@zentiti.com";
              return (
                <tr key={t.name} style={{
                  borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background .1s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--surface-2)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {/* Member */}
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: "50%",
                        background: avatarColor, color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 600, flexShrink: 0,
                      }}>{initials(t.name)}</div>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-900)", whiteSpace: "nowrap" }}>{t.name}</div>
                        {t.email && <div style={{ fontSize: 11.5, color: "var(--ink-400)", marginTop: 1 }}>{t.email}</div>}
                      </div>
                    </div>
                  </td>
                  {/* Role — owner can toggle Employee ↔ Administrator via inline dropdown */}
                  <td style={{ padding: "14px 16px" }}>
                    {t.email && !isOwner ? (
                      <div style={{ position: "relative", display: "inline-block" }}>
                        <select
                          value={memberIsAdmin ? "Administrator" : "Employee"}
                          onChange={e => e.target.value === "Administrator" ? onPromote(t.email) : onDemote(t.email)}
                          style={{
                            appearance: "none",
                            WebkitAppearance: "none",
                            fontSize: 12, fontWeight: 600,
                            padding: "4px 24px 4px 10px",
                            borderRadius: 999,
                            border: `1.5px solid ${memberIsAdmin ? "rgba(99,102,241,0.35)" : "var(--border)"}`,
                            background: memberIsAdmin ? "rgba(99,102,241,0.08)" : "var(--surface-2)",
                            color: memberIsAdmin ? "#4338ca" : "var(--ink-600)",
                            cursor: "pointer",
                            outline: "none",
                          }}
                        >
                          <option value="Employee">Employee</option>
                          <option value="Administrator">Administrator</option>
                        </select>
                        <span style={{
                          position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)",
                          pointerEvents: "none", color: memberIsAdmin ? "#4338ca" : "var(--ink-400)",
                        }}>
                          <Icon.ChevronDown size={11} />
                        </span>
                      </div>
                    ) : (
                      <span style={{
                        fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999,
                        background: isOwner ? "rgba(15,33,56,0.08)" : "var(--surface-2)",
                        color: isOwner ? "var(--navy-900)" : "var(--ink-500)",
                        border: `1.5px solid ${isOwner ? "rgba(15,33,56,0.15)" : "var(--border)"}`,
                      }}>
                        {isOwner ? "Owner" : t.role}
                      </span>
                    )}
                  </td>
                  {/* Progress */}
                  <td style={{ padding: "14px 16px", minWidth: 140 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <ProgressBar
                          value={t.progress}
                          height={5}
                          color={isComplete ? "#1f8a55" : t.progress > 0 ? "var(--accent)" : "var(--ink-300)"}
                        />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-600)", width: 32, textAlign: "right" }}>
                        {t.progress}%
                      </span>
                    </div>
                  </td>
                  {/* Modules Completed */}
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: t.modulesCompleted === 8 ? "#1f8a55" : t.modulesCompleted > 0 ? "var(--accent)" : "var(--ink-300)" }}>
                        {t.modulesCompleted}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--ink-400)", fontWeight: 500 }}>/8</span>
                    </div>
                  </td>
                  {/* Status */}
                  <td style={{ padding: "14px 16px" }}>
                    <Pill tone={statusTone}>{t.status}</Pill>
                  </td>
                  {/* Score */}
                  <td style={{ padding: "14px 16px", textAlign: "center" }}>
                    {t.score != null
                      ? <span style={{ fontSize: 14, fontWeight: 700, color: t.score >= 80 ? "#1f8a55" : "var(--accent-strong)" }}>{t.score}%</span>
                      : <span style={{ fontSize: 13, color: "var(--ink-300)" }}>—</span>}
                  </td>
                  {/* Started */}
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontSize: 13, color: t.started ? "var(--ink-600)" : "var(--ink-300)" }}>
                      {t.started || "—"}
                    </span>
                  </td>
                  {/* Deadline */}
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontSize: 13, color: "var(--ink-600)", fontWeight: 500 }}>{t.due}</span>
                  </td>
                  {/* Action */}
                  <td style={{ padding: "14px 16px", textAlign: "right" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
                      {isComplete
                        ? <SecondaryButton size="sm" style={{ fontSize: 12, padding: "5px 12px", whiteSpace: "nowrap" }}>View record</SecondaryButton>
                        : <button style={{
                            fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 6,
                            background: "var(--accent-soft)", color: "var(--accent-strong)",
                            border: "1px solid rgba(242,107,31,0.2)", cursor: "pointer",
                          }}>Nudge</button>
                      }
                      {/* Remove button */}
                      {isConfirming ? (
                        <>
                          <button
                            onClick={() => { onRemoveMember(t.name); setConfirmRemove(null); }}
                            style={{
                              fontSize: 12, fontWeight: 600, padding: "5px 10px", borderRadius: 6,
                              background: "var(--red-soft)", color: "var(--red)",
                              border: "1px solid rgba(220,38,38,0.2)", cursor: "pointer", whiteSpace: "nowrap",
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmRemove(null)}
                            style={{
                              fontSize: 12, padding: "5px 8px", borderRadius: 6,
                              background: "var(--surface-3)", color: "var(--ink-500)",
                              border: "1px solid var(--border)", cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setConfirmRemove(t.name)}
                          title="Remove member"
                          style={{
                            width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border)",
                            background: "var(--surface-2)", color: "var(--ink-400)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <Icon.Trash size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} style={{ padding: "40px 20px", textAlign: "center", color: "var(--ink-400)", fontSize: 13 }}>
                  No members match your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MgrKPI({ label, value, sub, icon, iconBg, tone, isBar }) {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12,
      padding: "18px 20px", display: "flex", flexDirection: "column", gap: 4,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-500)", letterSpacing: "0.01em" }}>{label}</div>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: tone === "accent" ? "var(--accent)" : "var(--ink-900)", letterSpacing: "-0.02em", lineHeight: 1, marginTop: 4 }}>
        {value}
      </div>
      {isBar
        ? <div style={{ marginTop: 6 }}>{sub}</div>
        : <div style={{ fontSize: 12, color: "var(--ink-500)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

window.ManagerScreen = ManagerScreen;
