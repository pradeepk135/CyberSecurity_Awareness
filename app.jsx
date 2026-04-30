// =====================================================
// App root — routing + tweaks-driven state seeding
// =====================================================

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "startScreen": "dashboard",
  "userState": "midway",
  "userName": "Alex Mercer",
  "userEmail": "alex.mercer@synersys.com"
}/*EDITMODE-END*/;

const STATE_PRESETS = {
  fresh:    { progress: [0,0,0,0,0,0,0,0],          completedAssessment: false, certIssued: false },
  midway:   { progress: [100,100,100,40,0,0,0,0],   completedAssessment: false, certIssued: false },
  modulesDone: { progress: [100,100,100,100,100,100,100,100], completedAssessment: false, certIssued: false },
  done:     { progress: [100,100,100,100,100,100,100,100], completedAssessment: true,  certIssued: true  },
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const initialState = STATE_PRESETS[tweaks.userState] || STATE_PRESETS.fresh;

  const [page, setPage] = useState(tweaks.startScreen || "signin");
  const [progress, setProgress] = useState(initialState.progress);
  const [completedAssessment, setCompletedAssessment] = useState(initialState.completedAssessment);
  const [certIssued, setCertIssued] = useState(initialState.certIssued);
  const [activeModule, setActiveModule] = useState(null);

  const user = { name: tweaks.userName, email: tweaks.userEmail };

  // Reset state when preset changes via tweaks
  useEffect(() => {
    const s = STATE_PRESETS[tweaks.userState] || STATE_PRESETS.fresh;
    setProgress(s.progress);
    setCompletedAssessment(s.completedAssessment);
    setCertIssued(s.certIssued);
  }, [tweaks.userState]);

  const allModulesDone = progress.every(p => p === 100);

  function navigate(target) {
    // Guard locked screens
    if (target === "assessment" && !allModulesDone) {
      setPage("dashboard");
      window.scrollTo({ top: 0 });
      return;
    }
    if (target === "certificate" && !completedAssessment) {
      setPage("dashboard");
      window.scrollTo({ top: 0 });
      return;
    }
    setPage(target);
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
    setPage("signin");
  }

  let screen;
  if (page === "signin") {
    screen = <SignInScreen onSignIn={() => navigate("dashboard")} userName={user.name} userEmail={user.email} />;
  } else if (page === "module" && activeModule !== null) {
    screen = (
      <AppShell user={user} page="dashboard" onNav={navigate} onSignOut={signOut} allModulesDone={allModulesDone} completedAssessment={completedAssessment}>
        <ModuleScreen
          moduleIndex={activeModule}
          progress={progress[activeModule]}
          onComplete={completeModule}
          onBack={() => navigate("dashboard")}
        />
      </AppShell>
    );
  } else if (page === "assessment") {
    screen = (
      <AppShell user={user} page="dashboard" onNav={navigate} onSignOut={signOut} allModulesDone={allModulesDone} completedAssessment={completedAssessment}>
        <AssessmentScreen
          completed={completedAssessment}
          onPass={passAssessment}
          onBack={() => navigate("dashboard")}
        />
      </AppShell>
    );
  } else if (page === "certificate") {
    if (!certIssued) setCertIssued(true);
    screen = (
      <AppShell user={user} page="dashboard" onNav={navigate} onSignOut={signOut} allModulesDone={allModulesDone} completedAssessment={completedAssessment}>
        <CertificateScreen user={user} onBack={() => navigate("dashboard")} />
      </AppShell>
    );
  } else if (page === "manager") {
    screen = (
      <AppShell user={user} page="manager" onNav={navigate} onSignOut={signOut} allModulesDone={allModulesDone} completedAssessment={completedAssessment}>
        <ManagerScreen />
      </AppShell>
    );
  } else {
    screen = (
      <AppShell user={user} page="dashboard" onNav={navigate} onSignOut={signOut} allModulesDone={allModulesDone} completedAssessment={completedAssessment}>
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
              if (v === "module") {
                setActiveModule(activeModule ?? 0);
              }
              navigate(v);
            }}
            options={[
              { value: "signin",      label: "Sign in" },
              { value: "dashboard",   label: "Dashboard" },
              { value: "module",      label: "Module (current)" },
              { value: "assessment",  label: "Final assessment" },
              { value: "certificate", label: "Certificate" },
              { value: "manager",     label: "Manager view" },
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
          <TweakText
            label="User name"
            value={tweaks.userName}
            onChange={v => setTweak("userName", v)}
          />
          <TweakText
            label="User email"
            value={tweaks.userEmail}
            onChange={v => setTweak("userEmail", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
