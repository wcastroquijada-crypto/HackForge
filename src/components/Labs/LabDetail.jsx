import { useState } from "react";
import { C } from "../../data/labs";

const css = `
  .btn{cursor:pointer;border:none;font-family:'Inter',sans-serif;font-weight:bold;transition:all .15s;border-radius:5px}
  .btn:hover:not(:disabled){filter:brightness(1.15);transform:translateY(-1px)}
  .btn:disabled{opacity:.45;cursor:not-allowed}
  .opt{width:100%;text-align:left;padding:10px 14px;margin:5px 0;border-radius:5px;cursor:pointer;font-family:'Courier New',monospace;font-size:13px;border:1px solid #1e2a3a;background:#0d1117;color:#8b949e;transition:all .13s}
  .opt:hover:not(:disabled){border-color:#2d3a4a;background:#111827;color:#c9d1d9}
`;

export default function LabDetail({ lab, onBack, onComplete }) {
  const [phase, setPhase]     = useState("theory");
  const [tp, setTp]           = useState(0);
  const [ans, setAns]         = useState({});
  const [sub, setSub]         = useState(false);
  const [inp, setInp]         = useState("");
  const [res, setRes]         = useState(null);
  const [flag, setFlag]       = useState(null);

  const score = () => {
    let c = 0;
    lab.quiz.forEach((q, i) => { if (ans[i] === q.c) c++; });
    return Math.round((c / lab.quiz.length) * 100);
  };

  const submitExploit = () => {
    if (lab.lab.ok(inp)) {
      setRes("ok");
      setFlag(lab.lab.flag);
      onComplete(lab.id, lab.xp);
    } else {
      setRes("fail");
    }
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Courier New',monospace", color: "#c9d1d9" }}>
      <style>{css}</style>

      {/* Nav */}
      <div style={{ background: C.panel, borderBottom: `1px solid ${C.border}`, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 10, flexWrap: "wrap" }}>
        <button className="btn" onClick={onBack} style={{ background: C.dim, color: C.muted, padding: "7px 14px", fontSize: 12 }}>← Labs</button>
        <span style={{ fontSize: 18 }}>{lab.icon}</span>
        <span style={{ color: "#fff", fontWeight: "bold", fontSize: 14, flex: 1 }}>{lab.title}</span>
        <div style={{ display: "flex", gap: 5 }}>
          {[["theory", "📖 Teoría"], ["quiz", "❓ Quiz"], ["lab", "🔬 Lab"]].map(([p, label]) => (
            <button key={p} className="btn"
              onClick={() => { if (p === "lab" && score() < 70 && sub) return; setPhase(p); }}
              style={{ padding: "6px 12px", fontSize: 11, background: phase === p ? lab.color : C.dim, color: phase === p ? "#000" : C.muted }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: 20, maxWidth: 700, margin: "0 auto" }}>

        {/* ── TEORÍA ── */}
        {phase === "theory" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ color: lab.color, fontSize: 10, letterSpacing: 3 }}>LECCIÓN {tp + 1}/{lab.theory.length}</div>
                <h3 style={{ color: "#fff", margin: "5px 0 0", fontSize: 17 }}>{lab.theory[tp].t}</h3>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {lab.theory.map((_, i) => (
                  <div key={i} onClick={() => setTp(i)}
                    style={{ width: 9, height: 9, borderRadius: "50%", cursor: "pointer", background: i === tp ? lab.color : i < tp ? `${lab.color}55` : C.border }} />
                ))}
              </div>
            </div>

            <div style={{ background: C.panel, border: `1px solid ${lab.color}33`, borderRadius: 8, padding: 20, marginBottom: 16 }}>
              <div style={{ borderLeft: `3px solid ${lab.color}`, paddingLeft: 16, lineHeight: 1.85 }}>
                {lab.theory[tp].b.split("\n").map((line, i) => {
                  const isCode = /^(SELECT|nmap|query|<|\.\.\/|http|admin|sqlmap|ssh|root:|document\.|\$)/i.test(line.trim());
                  return line === "" ? <br key={i} /> : (
                    <p key={i} style={{ margin: "3px 0", color: isCode ? lab.color : "#8b949e", fontFamily: "'Courier New',monospace", background: isCode ? "#050810" : "transparent", padding: isCode ? "2px 8px" : 0, borderRadius: isCode ? 3 : 0, fontSize: 12 }}>
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button className="btn" onClick={() => setTp(p => Math.max(0, p - 1))} disabled={tp === 0}
                style={{ background: C.dim, color: C.muted, padding: "10px 18px", fontSize: 12 }}>← Anterior</button>
              {tp < lab.theory.length - 1
                ? <button className="btn" onClick={() => setTp(p => p + 1)} style={{ background: lab.color, color: "#000", padding: "10px 18px", fontSize: 12 }}>Siguiente →</button>
                : <button className="btn" onClick={() => setPhase("quiz")} style={{ background: lab.color, color: "#000", padding: "10px 18px", fontSize: 12 }}>Ir al Quiz →</button>
              }
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {phase === "quiz" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: lab.color, fontSize: 10, letterSpacing: 3 }}>EVALUACIÓN</div>
              <h3 style={{ color: "#fff", margin: "5px 0 0", fontSize: 17 }}>Quiz — {lab.title}</h3>
              <p style={{ color: C.muted, fontSize: 12 }}>12 preguntas · Mínimo 70% para acceder al Lab</p>
            </div>

            {lab.quiz.map((q, qi) => (
              <div key={qi} style={{ background: C.panel, border: `1px solid ${sub ? (ans[qi] === q.c ? "#00ff8833" : "#ff3b3b33") : C.border}`, borderRadius: 8, padding: 16, marginBottom: 10 }}>
                <div style={{ color: C.muted, fontSize: 10, marginBottom: 5 }}>P{qi + 1}/12</div>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: "bold", marginBottom: 10 }}>{q.q}</div>
                {q.opts.map((opt, oi) => {
                  let bg = C.panel, border = C.border, color = "#8b949e";
                  if (ans[qi] === oi) { border = lab.color; color = "#fff"; }
                  if (sub) {
                    if (oi === q.c) { bg = "#002200"; border = C.green; color = C.green; }
                    else if (ans[qi] === oi && oi !== q.c) { bg = "#1a0505"; border = C.red; color = C.red; }
                  }
                  return (
                    <button key={oi} className="opt" disabled={sub}
                      onClick={() => setAns(p => ({ ...p, [qi]: oi }))}
                      style={{ background: bg, border: `1px solid ${border}`, color }}>
                      <span style={{ color: lab.color, marginRight: 8 }}>{["A", "B", "C", "D"][oi]}.</span>{opt}
                    </button>
                  );
                })}
                {sub && <div style={{ color: C.muted, fontSize: 11, marginTop: 7, paddingLeft: 8, borderLeft: `2px solid ${C.border}` }}>💡 {q.e}</div>}
              </div>
            ))}

            {!sub
              ? <button className="btn" onClick={() => setSub(true)}
                  disabled={Object.keys(ans).length < 12}
                  style={{ background: lab.color, color: "#000", padding: "12px 24px", fontSize: 13, width: "100%", marginTop: 6, opacity: Object.keys(ans).length < 12 ? 0.5 : 1 }}>
                  Enviar ({Object.keys(ans).length}/12)
                </button>
              : <div style={{ background: C.panel, border: `1px solid ${score() >= 70 ? C.green : C.red}`, borderRadius: 8, padding: 22, textAlign: "center", marginTop: 10 }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{score() >= 70 ? "🎯" : "📚"}</div>
                  <div style={{ color: score() >= 70 ? C.green : C.red, fontSize: 28, fontWeight: "bold" }}>{score()}%</div>
                  <div style={{ color: C.muted, fontSize: 12, marginTop: 5 }}>
                    {score() >= 70 ? "¡Aprobado! El Lab está desbloqueado." : "Necesitas 70% para continuar."}
                  </div>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14 }}>
                    <button className="btn" onClick={() => { setAns({}); setSub(false); }}
                      style={{ background: C.dim, color: C.muted, padding: "10px 18px", fontSize: 12 }}>Reintentar</button>
                    {score() >= 70 &&
                      <button className="btn" onClick={() => setPhase("lab")}
                        style={{ background: lab.color, color: "#000", padding: "10px 18px", fontSize: 12 }}>Ir al Lab →</button>
                    }
                  </div>
                </div>
            }
          </div>
        )}

        {/* ── LAB ── */}
        {phase === "lab" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: lab.color, fontSize: 10, letterSpacing: 3 }}>LABORATORIO PRÁCTICO</div>
              <h3 style={{ color: "#fff", margin: "5px 0 0", fontSize: 17 }}>{lab.lab.target}</h3>
              <p style={{ color: C.muted, fontSize: 12, marginTop: 4 }}>{lab.lab.scene}</p>
            </div>

            {/* Terminal */}
            <div style={{ background: "#050810", border: `1px solid ${lab.color}22`, borderRadius: 8, padding: 14, marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
                {["#ff5f56", "#ffbd2e", "#27c93f"].map(col => <div key={col} style={{ width: 9, height: 9, borderRadius: "50%", background: col }} />)}
                <span style={{ color: C.muted, fontSize: 11, marginLeft: 6 }}>terminal — {lab.id}</span>
              </div>
              <div style={{ color: C.green, fontSize: 12 }}>[✓] Entorno iniciado · {lab.lab.obj}</div>
              <div style={{ color: C.yellow, fontSize: 12, marginTop: 2 }}>[!] Solo en entornos controlados y con autorización</div>
            </div>

            {/* Pasos */}
            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 14 }}>
              <div style={{ color: C.muted, fontSize: 10, letterSpacing: 3, marginBottom: 10 }}>PASOS</div>
              {lab.lab.steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${lab.color}22`, border: `1px solid ${lab.color}`, display: "flex", alignItems: "center", justifyContent: "center", color: lab.color, fontSize: 11, fontWeight: "bold", flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ color: "#8b949e", fontSize: 12, lineHeight: 1.5, paddingTop: 3 }}>{s}</div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ color: C.muted, fontSize: 10, letterSpacing: 3, marginBottom: 8 }}>EJECUTAR PAYLOAD</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={inp} onChange={e => setInp(e.target.value)}
                  placeholder={lab.lab.ph}
                  onKeyDown={e => e.key === "Enter" && !res && submitExploit()}
                  style={{ flex: 1, background: "#050810", border: `1px solid ${lab.color}33`, color: lab.color, padding: "11px 12px", borderRadius: 5, fontFamily: "'Courier New',monospace", fontSize: 13, outline: "none" }} />
                <button className="btn" onClick={submitExploit} disabled={!!res}
                  style={{ background: lab.color, color: "#000", padding: "11px 18px", fontSize: 13 }}>Ejecutar</button>
              </div>
              <div style={{ color: "#1a2a1a", fontSize: 11, marginTop: 6 }}>Pista: {lab.lab.hint}</div>
            </div>

            {res === "fail" && (
              <div style={{ background: "#150505", border: `1px solid ${C.red}44`, borderRadius: 8, padding: 12, marginBottom: 12 }}>
                <div style={{ color: C.red, fontSize: 12 }}>❌ Payload incorrecto. Revisa la teoría e inténtalo de nuevo.</div>
              </div>
            )}

            {res === "ok" && flag && (
              <div style={{ background: "#051a05", border: `2px solid ${C.green}`, borderRadius: 10, padding: 26, textAlign: "center" }}>
                <div style={{ fontSize: 34, marginBottom: 10 }}>🎯</div>
                <div style={{ color: C.green, fontSize: 13, letterSpacing: 3, marginBottom: 6 }}>¡LAB COMPLETADO!</div>
                <div style={{ color: "#8b949e", fontSize: 12, marginBottom: 6 }}>{lab.lab.msg}</div>
                <div style={{ background: "#050810", border: `1px solid ${C.green}44`, padding: 10, borderRadius: 5, margin: "12px 0" }}>
                  <div style={{ color: C.muted, fontSize: 10, marginBottom: 3 }}>🚩 FLAG</div>
                  <div style={{ color: C.green, fontSize: 12, wordBreak: "break-all" }}>{flag}</div>
                </div>
                <div style={{ color: C.yellow, fontSize: 13, marginBottom: 12 }}>+{lab.xp} XP · {lab.badge}</div>
                <button className="btn" onClick={onBack}
                  style={{ background: C.green, color: "#000", padding: "10px 22px", fontSize: 13 }}>← Volver al mapa</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}