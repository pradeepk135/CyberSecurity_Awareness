// =====================================================
// Module screen — video + transcript + knowledge check
// =====================================================

function ModuleScreen({ moduleIndex, progress, onComplete, onBack }) {
  const m = MODULES[moduleIndex];
  const [phase, setPhase] = useState(progress === 100 ? "review" : "watch"); // watch | check | done | review
  const [watchProgress, setWatchProgress] = useState(progress === 100 ? 100 : Math.min(progress, 95));
  const [playing, setPlaying] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeTab, setActiveTab] = useState("transcript");
  const [videoError, setVideoError] = useState(false);

  // Knowledge check state
  const [checkAnswers, setCheckAnswers] = useState({});
  const [checkSubmitted, setCheckSubmitted] = useState(false);

  // Reset video error when chapter changes
  useEffect(() => { setVideoError(false); }, [activeChapter]);

  // Simulated playback — only runs when the active chapter has no real video (or video failed to load)
  useEffect(() => {
    const hasRealVideo = !videoError && m.chapters[activeChapter] && m.chapters[activeChapter].videoUrl;
    if (hasRealVideo || !playing) return;
    const id = setInterval(() => {
      setWatchProgress(p => {
        const next = Math.min(100, p + 0.6);
        if (next >= 100) setPlaying(false);
        const cIdx = Math.min(m.chapters.length - 1, Math.floor((next / 100) * m.chapters.length));
        setActiveChapter(cIdx);
        return next;
      });
    }, 80);
    return () => clearInterval(id);
  }, [playing, activeChapter, m.chapters, videoError]);

  const allAnswered = m.knowledgeCheck.every((_, i) => checkAnswers[i] !== undefined);
  const correctCount = m.knowledgeCheck.filter((q, i) => checkAnswers[i] === q.answer).length;
  const passed = checkSubmitted && correctCount === m.knowledgeCheck.length;

  function submitCheck() {
    setCheckSubmitted(true);
  }
  function continueAfterCheck() {
    if (passed) {
      onComplete(moduleIndex);
    } else {
      // retry
      setCheckSubmitted(false);
      setCheckAnswers({});
    }
  }

  return (
    <div className="fade-in" style={{ maxWidth: 1240, margin: "0 auto", padding: "28px 32px 64px" }}>
      {/* Breadcrumb */}
      <button
        onClick={onBack}
        style={{
          background: "transparent", border: "none",
          fontSize: 12.5, color: "var(--ink-500)", padding: 0,
          display: "inline-flex", alignItems: "center", gap: 6,
          fontWeight: 500, marginBottom: 14, whiteSpace: "nowrap",
        }}
      >
        <Icon.ArrowLeft size={14} /> Back to training
      </button>

      <div style={{
        display: "grid",
        gridTemplateColumns: phase === "check" ? "1fr" : "1fr 320px",
        gap: 24,
      }}>
        {/* MAIN COLUMN */}
        <div>
          {/* Header */}
          <div style={{ marginBottom: 18 }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11, letterSpacing: "0.16em", color: "var(--ink-400)",
              fontWeight: 500, textTransform: "uppercase",
              marginBottom: 6,
            }}>
              MODULE {m.code} · {m.duration} min
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>{m.title}</h1>
            <p style={{ fontSize: 14, color: "var(--ink-500)", margin: "8px 0 0", maxWidth: 720, lineHeight: 1.55 }}>
              {m.summary}
            </p>
          </div>

          {phase !== "check" && (
            <>
              {/* Video */}
              <VideoPlayer
                module={m}
                progress={watchProgress}
                playing={playing}
                onPlayPause={() => setPlaying(p => !p)}
                onSeek={p => { setWatchProgress(p); setPlaying(false); }}
                activeChapter={activeChapter}
                videoUrl={m.chapters[activeChapter] ? m.chapters[activeChapter].videoUrl : null}
                onProgress={pct => setWatchProgress(pct)}
                onVideoEnded={() => { setWatchProgress(100); setPlaying(false); }}
                onVideoError={() => setVideoError(true)}
              />

              {/* Tabs: transcript / resources */}
              <div style={{
                marginTop: 22,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                overflow: "hidden",
              }}>
                <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
                  {[
                    { id: "transcript", label: "Transcript" },
                    { id: "resources",  label: "Resources" },
                    { id: "notes",      label: "My notes" },
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      style={{
                        background: "transparent", border: "none",
                        padding: "14px 20px", fontSize: 13, fontWeight: 600,
                        color: activeTab === t.id ? "var(--ink-900)" : "var(--ink-500)",
                        borderBottom: activeTab === t.id ? "2px solid var(--accent)" : "2px solid transparent",
                        marginBottom: -1,
                      }}
                    >{t.label}</button>
                  ))}
                </div>
                <div style={{ padding: "22px 24px", maxHeight: 320, overflow: "auto" }}>
                  {activeTab === "transcript" && (
                    <div>
                      {(m.transcript || defaultTranscript(m)).map((line, i) => (
                        <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 16, padding: "8px 0", fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-700)" }}>
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11.5, color: "var(--ink-400)", paddingTop: 2 }}>{line.t}</span>
                          <span>{line.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === "resources" && (
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
                      {[
                        "Acceptable Use Policy (PDF, 14 pages)",
                        "Data Classification Quick Reference (PDF, 2 pages)",
                        "Incident reporting one-pager",
                      ].map((r, i) => (
                        <li key={i} style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "12px 14px", border: "1px solid var(--border)",
                          borderRadius: 8, fontSize: 13.5, color: "var(--ink-700)",
                        }}>
                          <Icon.Document size={16} color="var(--ink-500)" />
                          <span style={{ flex: 1 }}>{r}</span>
                          <a href="#" style={{ color: "var(--navy-700)", fontWeight: 600, fontSize: 12.5, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                            Download <Icon.Download size={12} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  {activeTab === "notes" && (
                    <textarea
                      placeholder="Type personal notes here. Notes are private to your account and saved automatically."
                      style={{
                        width: "100%", minHeight: 120,
                        border: "1px solid var(--border)", borderRadius: 8,
                        padding: "12px 14px", fontSize: 13.5, color: "var(--ink-700)",
                        resize: "vertical", outline: "none", lineHeight: 1.55,
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Bottom action */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, alignItems: "center" }}>
                <div style={{ fontSize: 13, color: "var(--ink-500)" }}>
                  {watchProgress >= 95
                    ? "Video complete. Continue to the knowledge check."
                    : `Watch at least 95% of the video to unlock the knowledge check (${Math.round(watchProgress)}% watched).`}
                </div>
                <PrimaryButton
                  disabled={watchProgress < 95}
                  onClick={() => setPhase("check")}
                >
                  Knowledge check <Icon.ArrowRight size={14} />
                </PrimaryButton>
              </div>
            </>
          )}

          {phase === "check" && (
            <KnowledgeCheck
              module={m}
              answers={checkAnswers}
              setAnswers={setCheckAnswers}
              submitted={checkSubmitted}
              correctCount={correctCount}
              passed={passed}
              allAnswered={allAnswered}
              onSubmit={submitCheck}
              onContinue={continueAfterCheck}
              onBackToVideo={() => setPhase("watch")}
            />
          )}
        </div>

        {/* SIDEBAR */}
        {phase !== "check" && (
          <aside>
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "18px 18px 6px",
              position: "sticky",
              top: 88,
            }}>
              <div style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.14em", color: "var(--ink-400)", fontWeight: 500, textTransform: "uppercase", marginBottom: 10 }}>
                Chapters
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {m.chapters.map((c, i) => {
                  const reached = (watchProgress / 100) * m.chapters.length > i;
                  const active = i === activeChapter && playing;
                  return (
                    <li key={c.id} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 0",
                      borderBottom: i < m.chapters.length - 1 ? "1px solid var(--border)" : "none",
                    }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%",
                        background: reached ? "var(--success-soft)" : "var(--surface-3)",
                        color: reached ? "var(--success)" : "var(--ink-400)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 600, flexShrink: 0,
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}>
                        {reached ? <Icon.Check size={12} /> : i + 1}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: active ? 600 : 500, color: active ? "var(--accent-strong)" : "var(--ink-900)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {c.title}
                        </div>
                        <div style={{ fontSize: 11.5, color: "var(--ink-400)", fontFamily: "'IBM Plex Mono', monospace" }}>{c.duration}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div style={{
              background: "var(--navy-900)",
              color: "#fff",
              borderRadius: 12,
              padding: "16px 18px",
              marginTop: 14,
              fontSize: 12.5,
              lineHeight: 1.55,
            }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 6, color: "var(--accent)", fontWeight: 600, fontSize: 11.5, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                <Icon.Info size={13} /> Compliance note
              </div>
              <div style={{ color: "rgba(255,255,255,0.78)" }}>
                Module completion is logged to your training record. Your manager can see status, but not your individual answers.
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

// ----- Video player -----
function VideoPlayer({ module: m, progress, playing, onPlayPause, onSeek, activeChapter, videoUrl, onProgress, onVideoEnded, onVideoError }) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);

  // Reset internal failed state when chapter/URL changes
  useEffect(() => { setVideoFailed(false); setDuration(0); }, [videoUrl]);

  const effectiveUrl = videoFailed ? null : videoUrl;

  const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s) % 60).padStart(2, "0")}`;
  const currentSec = duration ? duration * (progress / 100) : m.duration * 60 * (progress / 100);
  const totalSec   = duration || m.duration * 60;

  // Sync play/pause state with the <video> element
  useEffect(() => {
    if (!videoRef.current || !effectiveUrl) return;
    if (playing) videoRef.current.play().catch(() => {});
    else videoRef.current.pause();
  }, [playing, effectiveUrl]);

  function handleVideoError() {
    setVideoFailed(true);
    if (onVideoError) onVideoError();
  }

  function handleProgressBarClick(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    if (effectiveUrl && videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (pct / 100) * videoRef.current.duration;
      onProgress(pct);
    } else {
      onSeek(pct);
    }
  }

  return (
    <div style={{ background: "#0b1c33", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>

      {/* Stage */}
      <div
        onClick={onPlayPause}
        style={{
          aspectRatio: "16 / 9", position: "relative",
          background: effectiveUrl ? "#000" : "radial-gradient(ellipse at 30% 30%, #173a66 0%, #0b1c33 60%, #061021 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", overflow: "hidden",
        }}
      >
        {effectiveUrl ? (
          <video
            key={effectiveUrl}
            ref={videoRef}
            src={effectiveUrl}
            preload="auto"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            onLoadedMetadata={e => setDuration(e.target.duration)}
            onTimeUpdate={e => {
              if (e.target.duration) onProgress((e.target.currentTime / e.target.duration) * 100);
            }}
            onEnded={onVideoEnded}
            onError={handleVideoError}
          />
        ) : (
          <>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }} />
            <div style={{ position: "relative", textAlign: "center", color: "rgba(255,255,255,0.92)" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.18em", color: "var(--accent)", marginBottom: 14, textTransform: "uppercase" }}>
                Chapter {activeChapter + 1} of {m.chapters.length}
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", maxWidth: 520 }}>
                {m.chapters[activeChapter].title}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 12, fontFamily: "'IBM Plex Mono', monospace" }}>
                [ training video placeholder · {m.chapters[activeChapter].duration} ]
              </div>
            </div>
          </>
        )}

        {/* Play overlay — visible when paused */}
        <div style={{
          position: "absolute",
          width: 72, height: 72, borderRadius: "50%",
          background: "rgba(255,255,255,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: playing ? 0 : 1,
          transition: "opacity .2s ease",
          pointerEvents: "none",
        }}>
          <Icon.Play size={28} color="var(--navy-900)" />
        </div>
      </div>

      {/* Controls bar */}
      <div style={{ padding: "12px 16px", background: "#0b1c33", color: "#fff" }}>
        {/* Seek bar */}
        <div
          onClick={handleProgressBarClick}
          style={{ height: 6, background: "rgba(255,255,255,0.15)", borderRadius: 3, position: "relative", cursor: "pointer", marginBottom: 10 }}
        >
          <div style={{ width: `${progress}%`, height: "100%", background: "var(--accent)", borderRadius: 3 }} />
          <div style={{ position: "absolute", left: `${progress}%`, top: "50%", transform: "translate(-50%,-50%)", width: 12, height: 12, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={onPlayPause} style={{ background: "var(--accent)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            {playing
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
              : <Icon.Play size={14} color="#fff" />
            }
          </button>
          <div style={{ fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", color: "rgba(255,255,255,0.7)" }}>
            {fmt(currentSec)} / {fmt(totalSec)}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", gap: 8, fontSize: 11.5, color: "rgba(255,255,255,0.55)", fontFamily: "'IBM Plex Mono', monospace" }}>
            <span>1.0x</span><span>·</span><span>CC</span><span>·</span><span>HD</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----- Knowledge check -----
function KnowledgeCheck({ module: m, answers, setAnswers, submitted, correctCount, passed, allAnswered, onSubmit, onContinue, onBackToVideo }) {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      padding: "32px 36px",
      maxWidth: 820,
      margin: "0 auto",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
            letterSpacing: "0.16em", color: "var(--ink-400)", fontWeight: 500, textTransform: "uppercase",
            marginBottom: 6,
          }}>
            Knowledge check · Module {m.code}
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
            Confirm your understanding
          </h2>
          <p style={{ color: "var(--ink-500)", fontSize: 13.5, marginTop: 6 }}>
            Answer all questions correctly to mark this module as complete. You can retake the check as many times as needed.
          </p>
        </div>
        <button onClick={onBackToVideo} style={{
          background: "transparent", border: "1px solid var(--border)",
          padding: "8px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500,
          color: "var(--ink-500)", display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          <Icon.ArrowLeft size={12} /> Back to video
        </button>
      </div>

      {m.knowledgeCheck.map((q, qi) => (
        <div key={qi} style={{
          padding: "20px 0",
          borderTop: qi === 0 ? "1px solid var(--border)" : "1px solid var(--border)",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 12,
              color: "var(--ink-400)", fontWeight: 500,
            }}>Q{qi + 1}.</span>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: "var(--ink-900)" }}>{q.q}</h3>
          </div>

          <div style={{ display: "grid", gap: 8, marginLeft: 28 }}>
            {q.choices.map((c, ci) => {
              const selected = answers[qi] === ci;
              const isCorrect = ci === q.answer;
              const showCorrect = submitted && isCorrect;
              const showWrong   = submitted && selected && !isCorrect;
              return (
                <button
                  key={ci}
                  onClick={() => !submitted && setAnswers(a => ({ ...a, [qi]: ci }))}
                  disabled={submitted}
                  style={{
                    background:
                      showCorrect ? "var(--success-soft)" :
                      showWrong   ? "var(--danger-soft)"  :
                      selected    ? "var(--accent-soft)"  : "var(--surface)",
                    border: `1px solid ${
                      showCorrect ? "var(--success)" :
                      showWrong   ? "var(--danger)"  :
                      selected    ? "var(--accent)"  : "var(--border)"
                    }`,
                    color:
                      showCorrect ? "var(--success)" :
                      showWrong   ? "var(--danger)"  :
                      selected    ? "var(--accent-strong)" : "var(--ink-700)",
                    borderRadius: 8,
                    padding: "12px 14px",
                    textAlign: "left",
                    fontSize: 13.5,
                    fontWeight: 500,
                    cursor: submitted ? "default" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%",
                    border: `2px solid ${selected || showCorrect || showWrong ? "currentColor" : "var(--border-strong)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {(selected || showCorrect) && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "currentColor" }}></div>}
                  </div>
                  <span style={{ flex: 1 }}>{c}</span>
                </button>
              );
            })}
          </div>

          {submitted && q.explain && (
            <div style={{
              marginLeft: 28, marginTop: 12, padding: "10px 14px",
              background: "var(--surface-3)", borderRadius: 8,
              fontSize: 12.5, color: "var(--ink-700)", lineHeight: 1.55,
              borderLeft: `3px solid ${answers[qi] === q.answer ? "var(--success)" : "var(--accent)"}`,
            }}>
              <strong>{answers[qi] === q.answer ? "Correct." : "Not quite."}</strong> {q.explain}
            </div>
          )}
        </div>
      ))}

      <div style={{
        marginTop: 24,
        paddingTop: 22,
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        {!submitted ? (
          <>
            <div style={{ fontSize: 13, color: "var(--ink-500)" }}>
              {Object.keys(answers).length} of {m.knowledgeCheck.length} answered
            </div>
            <PrimaryButton disabled={!allAnswered} onClick={onSubmit}>
              Submit answers <Icon.ArrowRight size={14} />
            </PrimaryButton>
          </>
        ) : (
          <>
            <div style={{ fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 12 }}>
              <Pill tone={passed ? "success" : "warn"} icon={passed ? <Icon.Check size={12} /> : null}>
                {correctCount} of {m.knowledgeCheck.length} correct
              </Pill>
              <span style={{ color: "var(--ink-500)", fontSize: 13 }}>
                {passed ? "Module marked complete." : "Review the answers and try again."}
              </span>
            </div>
            <PrimaryButton onClick={onContinue}>
              {passed ? "Continue" : "Retake check"} <Icon.ArrowRight size={14} />
            </PrimaryButton>
          </>
        )}
      </div>
    </div>
  );
}

function defaultTranscript(m) {
  return [
    { t: "0:00", text: `Welcome to ${m.title}. This module is part of the Synersys Security Awareness Training Program.` },
    { t: "0:22", text: `By the end of this module you'll be able to apply ${m.title.toLowerCase()} principles to your day-to-day work, and recognise when to escalate to the security team.` },
    { t: "0:54", text: `We'll cover ${m.chapters.map(c => c.title.toLowerCase()).join(", ")}. The full module runs approximately ${m.duration} minutes.` },
    { t: "1:18", text: "Let's begin." },
  ];
}

window.ModuleScreen = ModuleScreen;
