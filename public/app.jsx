// =====================================================
// App root — routing + tweaks-driven state seeding
// =====================================================

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "startScreen": "signin",
  "userState": "modulesDone",
  "userName": "Pradeep K",
  "userEmail": "pradeep.k@zentiti.com"
}/*EDITMODE-END*/;

const STATE_PRESETS = {
  fresh:       { progress: [0,0,0,0,0,0,0,0],          completedAssessment: false, certIssued: false },
  midway:      { progress: [100,100,100,40,0,0,0,0],   completedAssessment: false, certIssued: false },
  modulesDone: { progress: [100,100,100,100,100,100,100,100], completedAssessment: false, certIssued: false },
  done:        { progress: [100,100,100,100,100,100,100,100], completedAssessment: true,  certIssued: true  },
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const initialState = STATE_PRESETS[tweaks.userState] || STATE_PRESETS.fresh;

  const [page, setPage]                           = useState(tweaks.startScreen || "signin");
  const [progress, setProgress]                   = useState(initialState.progress);
  const [completedAssessment, setCompletedAssessment] = useState(initialState.completedAssessment);
  const [certIssued, setCertIssued]               = useState(initialState.certIssued);
  const [activeModule, setActiveModule]           = useState(null);
  const [acknowledgedTraining, setAcknowledgedTraining] = useState(false);
  const [role, setRole]                           = useState(null); // "employee" | "admin"
  const [team, setTeam]                           = useState(TEAM);
  const [adminEmails, setAdminEmails]             = useState(["pradeep.k@zentiti.com"]);

  const user = { name: tweaks.userName, email: tweaks.userEmail };

  // Reset state when preset changes via tweaks panel
  useEffect(() => {
    const s = STATE_PRESETS[tweaks.userState] || STATE_PRESETS.fresh;
    setProgress(s.progress);
    setCompletedAssessment(s.completedAssessment);
    setCertIssued(s.certIssued);
  }, [tweaks.userState]);

  const allModulesDone = progress.every(p => p === 100);

  function navigate(target) {
    if (target === "assessment") {
      if (!allModulesDone) { setPage("dashboard"); window.scrollTo({ top: 0 }); return; }
      if (!acknowledgedTraining) { setPage("acknowledgment"); window.scrollTo({ top: 0 }); return; }
    }
    if (target === "certificate" && !completedAssessment) {
      setPage("dashboard"); window.scrollTo({ top: 0 }); return;
    }
    setPage(target);
    window.scrollTo({ top: 0 });
  }

  function handleSignIn({ email, isAdmin }) {
    setRole(isAdmin ? "admin" : "employee");
    setTweak("userEmail", email);

    if (isAdmin) {
      setPage("manager");
    } else {
      // Auto-register employee in team if not already present
      const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
      setTeam(prev => {
        const exists = prev.some(m =>
          (m.email && m.email === email) ||
          m.name.toLowerCase() === (tweaks.userName || "").toLowerCase()
        );
        if (exists) return prev;
        const displayName = tweaks.userName ||
          email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
        return [...prev, {
          name: displayName,
          email,
          role: "Employee",
          progress: 0,
          status: "Not started",
          score: null,
          started: today,
          due: "May 14",
          modulesCompleted: 0,
        }];
      });
      setProgress([0, 0, 0, 0, 0, 0, 0, 0]);
      setCompletedAssessment(false);
      setCertIssued(false);
      setAcknowledgedTraining(false);
      setPage("dashboard");
    }
    window.scrollTo({ top: 0 });
  }

  function handleAcknowledge() {
    setAcknowledgedTraining(true);
    setPage("assessment");
    window.scrollTo({ top: 0 });
  }

  function openModule(idx) {
    setActiveModule(idx);
    setPage("module");
    window.scrollTo({ top: 0 });
  }

  function completeModule(idx) {
    setProgress(p => {
      const next = [...p];
      next[idx] = 100;
      return next;
    });
    setPage("dashboard");
    window.scrollTo({ top: 0 });
  }

  function passAssessment() {
    setCompletedAssessment(true);
  }

  function signOut() {
    setRole(null);
    setAcknowledgedTraining(false);
    setPage("signin");
  }

  function addTeamMember(member) {
    setTeam(prev => [...prev, member]);
  }

  function removeTeamMember(nameOrEmail) {
    setTeam(prev => prev.filter(m => m.name !== nameOrEmail && m.email !== nameOrEmail));
  }

  function promoteToAdmin(email) {
    if (!email) return;
    setAdminEmails(prev => prev.includes(email) ? prev : [...prev, email]);
    // Also update their role label in the team list
    setTeam(prev => prev.map(m => m.email === email ? { ...m, role: "Administrator" } : m));
  }

  function demoteFromAdmin(email) {
    if (email === "pradeep.k@zentiti.com") return; // owner cannot be demoted
    setAdminEmails(prev => prev.filter(e => e !== email));
    setTeam(prev => prev.map(m => m.email === email ? { ...m, role: m._origRole || "Employee" } : m));
  }

  let screen;
  if (page === "signin") {
    screen = <SignInScreen onSignIn={handleSignIn} userEmail={user.email} adminEmails={adminEmails} />;

  } else if (page === "acknowledgment") {
    screen = <AcknowledgmentScreen user={user} onAcknowledge={handleAcknowledge} onBack={() => { setPage("dashboard"); window.scrollTo({ top: 0 }); }} />;

  } else if (page === "module" && activeModule !== null) {
    screen = (
      <AppShell user={user} page="dashboard" role={role} onNav={navigate} onSignOut={signOut} allModulesDone={allModulesDone} completedAssessment={completedAssessment}>
        <ModuleScreen moduleIndex={activeModule} progress={progress[activeModule]} onComplete={completeModule} onBack={() => navigate("dashboard")} />
      </AppShell>
    );

  } else if (page === "assessment") {
    screen = (
      <AppShell user={user} page="dashboard" role={role} onNav={navigate} onSignOut={signOut} allModulesDone={allModulesDone} completedAssessment={completedAssessment}>
        <AssessmentScreen completed={completedAssessment} onPass={passAssessment} onBack={() => navigate("dashboard")} />
      </AppShell>
    );

  } else if (page === "certificate") {
    if (!certIssued) setCertIssued(true);
    screen = (
      <AppShell user={user} page="dashboard" role={role} onNav={navigate} onSignOut={signOut} allModulesDone={allModulesDone} completedAssessment={completedAssessment}>
        <CertificateScreen user={user} onBack={() => navigate("dashboard")} />
      </AppShell>
    );

  } else if (page === "manager") {
    screen = (
      <AppShell user={user} page="manager" role={role} onNav={navigate} onSignOut={signOut} allModulesDone={allModulesDone} completedAssessment={completedAssessment}>
        <ManagerScreen team={team} adminEmails={adminEmails} onAddMember={addTeamMember} onRemoveMember={removeTeamMember} onPromote={promoteToAdmin} onDemote={demoteFromAdmin} />
      </AppShell>
    );

  } else {
    screen = (
      <AppShell user={user} page="dashboard" role={role} onNav={navigate} onSignOut={signOut} allModulesDone={allModulesDone} completedAssessment={completedAssessment}>
        <Dashboard
          user={user}
          progress={progress}
          completedAssessment={completedAssessment}
          certIssued={certIssued}
          onOpenModule={openModule}
          onOpenAssessment={() => navigate("assessment")}
          onOpenCertificate={() => { setCertIssued(true); navigate("certificate"); }}
        />
      </AppShell>
    );
  }

  return (
    <>
      {screen}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Navigation">
          <TweakSelect
            label="Jump to screen"
            value={page}
            onChange={v => {
              if (v === "module") setActiveModule(activeModule ?? 0);
              if (v === "assessment" || v === "certificate") {
                navigate(v);
              } else {
                setPage(v);
                window.scrollTo({ top: 0 });
              }
            }}
            options={[
              { value: "signin",         label: "Sign in" },
              { value: "dashboard",      label: "Dashboard" },
              { value: "acknowledgment", label: "Acknowledgment" },
              { value: "module",         label: "Module (current)" },
              { value: "assessment",     label: "Final assessment" },
              { value: "certificate",    label: "Certificate" },
              { value: "manager",        label: "Manager view" },
            ]}
          />
          <TweakSelect
            label="Active module"
            value={String(activeModule ?? 0)}
            onChange={v => setActiveModule(Number(v))}
            options={MODULES.map((m, i) => ({ value: String(i), label: `${m.code} · ${m.title}` }))}
          />
        </TweakSection>

        <TweakSection label="User state">
          <TweakRadio
            label="Progress preset"
            value={tweaks.userState}
            onChange={v => setTweak("userState", v)}
            options={[
              { value: "fresh",       label: "Fresh" },
              { value: "midway",      label: "Midway" },
              { value: "modulesDone", label: "All modules" },
              { value: "done",        label: "Complete" },
            ]}
          />
          <TweakText label="User name" value={tweaks.userName} onChange={v => setTweak("userName", v)} />
          <TweakText label="User email" value={tweaks.userEmail} onChange={v => setTweak("userEmail", v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
