import { useState, useEffect } from "react";
import { C } from "../../data/labs";

// ── Hook: Typing effect con skip ──
function useTypingEffect(text, speed = 40, skip = false) {
  const [displayed, setDisplayed] = useState(skip ? text : "");
  const [done, setDone] = useState(skip);
  useEffect(() => {
    if (skip) { setDisplayed(text); setDone(true); return; }
    setDisplayed(""); setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, skip]);
  return { displayed, done };
}

// ── Simulación SQL Injection ──
function SQLiSim({ color }) {
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [result, setResult] = useState(null);
  const query = `SELECT * FROM users\nWHERE email='${email}'\nAND password='${pass}'`;
  const isSqli = email.includes("'") && (email.toLowerCase().includes("or") || email.includes("--"));

  const tryLogin = () => {
    if (isSqli) setResult("bypass");
    else if (email === "admin" && pass === "1234") setResult("success");
    else setResult("fail");
  };

  return (
    <div style={{ background:"#050810", border:`1px solid ${color}33`, borderRadius:8, padding:16, marginTop:16 }}>
      <div style={{ color:color, fontSize:10, letterSpacing:3, marginBottom:10 }}>🔬 SIMULACIÓN INTERACTIVA — BancoSeguro Login</div>
      <div style={{ color:"#4a5568", fontSize:10, marginBottom:4 }}>Email:</div>
      <input value={email} onChange={e=>{setEmail(e.target.value);setResult(null);}}
        placeholder="' OR '1'='1  ← prueba esto"
        style={{ width:"100%", background:"#0d1117", border:`1px solid #1e2a3a`, color:color, padding:"8px 10px", borderRadius:4, fontFamily:"monospace", fontSize:12, outline:"none", marginBottom:8, boxSizing:"border-box" }}/>
      <div style={{ color:"#4a5568", fontSize:10, marginBottom:4 }}>Password:</div>
      <input value={pass} onChange={e=>{setPass(e.target.value);setResult(null);}} type="password"
        placeholder="cualquier cosa"
        style={{ width:"100%", background:"#0d1117", border:`1px solid #1e2a3a`, color:color, padding:"8px 10px", borderRadius:4, fontFamily:"monospace", fontSize:12, outline:"none", marginBottom:10, boxSizing:"border-box" }}/>
      <div style={{ background:"#020408", border:`1px solid ${isSqli?"#ff3b3b":"#1e2a3a"}`, borderRadius:4, padding:10, marginBottom:10, fontSize:11, fontFamily:"monospace", lineHeight:1.7 }}>
        <span style={{ color:"#4a5568" }}>Query → </span>
        <span style={{ color:isSqli?"#ff6b6b":color, whiteSpace:"pre-wrap" }}>{query}</span>
        {isSqli && <div style={{ color:"#ff3b3b", marginTop:6 }}>⚠️ Condición siempre verdadera — WHERE bypasseado</div>}
      </div>
      <button onClick={tryLogin} style={{ background:color, color:"#000", border:"none", padding:"8px 18px", borderRadius:4, fontWeight:"bold", cursor:"pointer", fontSize:12 }}>
        Intentar Login →
      </button>
      {result==="bypass" && <div style={{ background:"#051a05", border:`1px solid #00ff88`, borderRadius:6, padding:10, marginTop:10 }}>
        <div style={{ color:"#00ff88", fontSize:12, fontWeight:"bold" }}>✅ BYPASS — Acceso concedido como ADMIN</div>
        <div style={{ color:"#4a5568", fontSize:11, marginTop:4 }}>OR '1'='1' es siempre true → la query retorna todos los usuarios</div>
      </div>}
      {result==="fail" && <div style={{ background:"#150505", border:`1px solid #ff3b3b44`, borderRadius:6, padding:10, marginTop:10 }}>
        <div style={{ color:"#ff3b3b", fontSize:12 }}>❌ Credenciales incorrectas — prueba con ' OR '1'='1 en email</div>
      </div>}
      {result==="success" && <div style={{ background:"#051a05", border:`1px solid #00ff88`, borderRadius:6, padding:10, marginTop:10 }}>
        <div style={{ color:"#00ff88", fontSize:12 }}>✅ Login correcto (credenciales válidas)</div>
      </div>}
    </div>
  );
}

// ── Simulación XSS ──
function XSSSim({ color }) {
  const [input, setInput]     = useState("");
  const [comments, setComments] = useState([]);
  const [alert_, setAlert]    = useState(null);

  const post = () => {
    if (!input.trim()) return;
    const lo = input.toLowerCase();
    const isXss = lo.includes("<script>") || lo.includes("onerror") || lo.includes("onload");
    if (isXss) {
      const cookieMatch = lo.includes("cookie");
      const alertMatch  = input.match(/alert\(([^)]*)\)/);
      setAlert(cookieMatch ? "session=abc123; token=xyz789; user=admin" : alertMatch ? (alertMatch[1].replace(/['"]/g,"") || "XSS!") : "Script ejecutado!");
    }
    setComments(c => [...c, { text:input, xss:isXss, time:new Date().toLocaleTimeString() }]);
    setInput("");
  };

  return (
    <div style={{ background:"#050810", border:`1px solid ${color}33`, borderRadius:8, padding:16, marginTop:16 }}>
      <div style={{ color:color, fontSize:10, letterSpacing:3, marginBottom:10 }}>🔬 SIMULACIÓN — ForoHack (innerHTML sin sanitizar)</div>
      {alert_ && (
        <div style={{ background:"#1a1a00", border:`2px solid ${color}`, borderRadius:6, padding:14, marginBottom:12, textAlign:"center" }}>
          <div style={{ color:"#aaa", fontSize:10, marginBottom:6 }}>🪟 ForoHack.com dice:</div>
          <div style={{ color:color, fontSize:15, fontWeight:"bold", fontFamily:"monospace", wordBreak:"break-all" }}>{alert_}</div>
          <button onClick={()=>setAlert(null)} style={{ background:"#333", color:"#fff", border:"none", padding:"4px 18px", borderRadius:3, marginTop:8, cursor:"pointer", fontSize:11 }}>OK</button>
        </div>
      )}
      <div style={{ background:"#0d1117", borderRadius:6, padding:12, marginBottom:10, minHeight:80, maxHeight:160, overflowY:"auto" }}>
        {comments.length===0
          ? <div style={{ color:"#4a5568", fontSize:11, textAlign:"center", paddingTop:20 }}>Sin comentarios aún...</div>
          : comments.map((c,i)=>(
            <div key={i} style={{ marginBottom:8, padding:8, background:c.xss?"#1a0505":"#111827", borderRadius:4, border:`1px solid ${c.xss?"#ff3b3b44":"#1e2a3a"}` }}>
              <div style={{ color:"#4a5568", fontSize:9, marginBottom:3 }}>Usuario#{i+1} · {c.time}</div>
              <div style={{ color:c.xss?"#ff6b6b":"#8b949e", fontSize:12, fontFamily:"monospace", wordBreak:"break-all" }}>{c.text}</div>
              {c.xss && <div style={{ color:"#ff3b3b", fontSize:10, marginTop:3 }}>⚠️ Este script se ejecuta en el navegador de CADA visitante</div>}
            </div>
          ))
        }
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&post()}
          placeholder='<script>alert(document.cookie)</script>'
          style={{ flex:1, background:"#0d1117", border:`1px solid #1e2a3a`, color:color, padding:"8px 10px", borderRadius:4, fontFamily:"monospace", fontSize:11, outline:"none" }}/>
        <button onClick={post} style={{ background:color, color:"#000", border:"none", padding:"8px 14px", borderRadius:4, fontWeight:"bold", cursor:"pointer", fontSize:12 }}>Enviar</button>
      </div>
    </div>
  );
}

// ── Simulación Path Traversal ──
function TraversalSim({ color }) {
  const [path, setPath]   = useState("");
  const [result, setResult] = useState(null);

  const FILES = {
    "images/logo.png":        { content:"PNG image data 1920x1080", danger:false },
    "docs/manual.pdf":        { content:"PDF document — Manual de usuario v2.1", danger:false },
    "../../../etc/passwd":    { content:"root:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33::/var/www:/bin/sh\nwaldo:x:1000:1000::/home/waldo:/bin/bash", danger:true },
    "../../../etc/shadow":    { content:"root:$6$salt$9cJhash...:19000:0:99999:7:::\nwaldo:$6$salt$hash2...:19000:0:99999:7:::", danger:true },
    "../../../proc/self/environ": { content:"DB_HOST=localhost\nDB_PASS=Sup3rS3cr3t!\nAPI_KEY=sk-prod-abc123xyz\nSECRET=hackforge_prod_key", danger:true },
    "../../.env":             { content:"DATABASE_URL=mysql://root:password@localhost/app\nSECRET_KEY=prod_secret_123\nAWS_KEY=AKIA...", danger:true },
  };

  const tryAccess = () => {
    const norm = path.replace(/\\/g,"/").toLowerCase();
    const match = Object.keys(FILES).find(k => norm.includes(k.toLowerCase()) || norm.endsWith(k.split("/").pop().toLowerCase()));
    if (match) setResult({ found:true, ...FILES[match] });
    else if (norm.includes("../")) setResult({ found:false, msg:"Archivo no encontrado — prueba: ../../../etc/passwd" });
    else setResult({ found:false, msg:"Ruta normal dentro del web root" });
  };

  return (
    <div style={{ background:"#050810", border:`1px solid ${color}33`, borderRadius:8, padding:16, marginTop:16 }}>
      <div style={{ color:color, fontSize:10, letterSpacing:3, marginBottom:10 }}>🔬 SIMULACIÓN — FileServer Pro ?file=</div>
      <div style={{ color:"#4a5568", fontSize:11, marginBottom:8 }}>
        https://fileserver.com/download?file=<span style={{ color:color }}>{path||"..."}</span>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:10 }}>
        <input value={path} onChange={e=>{setPath(e.target.value);setResult(null);}}
          placeholder="../../../etc/passwd"
          style={{ flex:1, background:"#0d1117", border:`1px solid #1e2a3a`, color:color, padding:"8px 10px", borderRadius:4, fontFamily:"monospace", fontSize:12, outline:"none" }}/>
        <button onClick={tryAccess} style={{ background:color, color:"#000", border:"none", padding:"8px 14px", borderRadius:4, fontWeight:"bold", cursor:"pointer", fontSize:12 }}>Acceder</button>
      </div>
      {result?.found && (
        <div style={{ background:"#020408", border:`1px solid ${result.danger?"#ff3b3b":color}`, borderRadius:6, padding:12 }}>
          {result.danger && <div style={{ color:"#ff3b3b", fontSize:11, marginBottom:6 }}>⚠️ ARCHIVO SENSIBLE EXPUESTO — Path Traversal exitoso</div>}
          <pre style={{ color:result.danger?"#ff6b6b":color, fontSize:11, fontFamily:"monospace", whiteSpace:"pre-wrap", margin:0 }}>{result.content}</pre>
        </div>
      )}
      {result && !result.found && <div style={{ color:"#4a5568", fontSize:11, padding:8, background:"#0d1117", borderRadius:4 }}>{result.msg}</div>}
    </div>
  );
}

// ── Simulación Default Creds ──
function DefaultCredsSim({ color }) {
  const [user, setUser]       = useState("");
  const [pass, setPass]       = useState("");
  const [attempts, setAttempts] = useState([]);
  const [access, setAccess]   = useState(false);
  const VALID = [["admin","admin"],["admin","1234"],["admin","12345"],["admin","password"],["root","root"],["root","12345"]];

  const tryLogin = () => {
    if (!user || !pass) return;
    const ok = VALID.some(([u,p])=>u===user.toLowerCase()&&p===pass.toLowerCase());
    setAttempts(a=>[...a,{ user, pass, ok, time:new Date().toLocaleTimeString() }]);
    if (ok) setAccess(true);
    setUser(""); setPass("");
  };

  return (
    <div style={{ background:"#050810", border:`1px solid ${color}33`, borderRadius:8, padding:16, marginTop:16 }}>
      <div style={{ color:color, fontSize:10, letterSpacing:3, marginBottom:10 }}>🔬 SIMULACIÓN — Hikvision DVR Admin Panel</div>
      {access ? (
        <div style={{ background:"#051a05", border:`2px solid ${color}`, borderRadius:8, padding:20, textAlign:"center" }}>
          <div style={{ fontSize:28, marginBottom:8 }}>📹</div>
          <div style={{ color:color, fontSize:13, fontWeight:"bold" }}>ACCESO CONCEDIDO</div>
          <div style={{ color:"#4a5568", fontSize:11, marginTop:6 }}>50 cámaras disponibles · Live feed · Grabaciones · Config</div>
          <button onClick={()=>{setAccess(false);setAttempts([]);}} style={{ background:"#1e2a3a", color:"#8b949e", border:"none", padding:"6px 14px", borderRadius:4, cursor:"pointer", fontSize:11, marginTop:12 }}>Reset</button>
        </div>
      ) : (
        <>
          <div style={{ display:"flex", gap:8, marginBottom:8 }}>
            <input value={user} onChange={e=>setUser(e.target.value)} placeholder="usuario"
              style={{ flex:1, background:"#0d1117", border:`1px solid #1e2a3a`, color:color, padding:"8px 10px", borderRadius:4, fontFamily:"monospace", fontSize:12, outline:"none" }}/>
            <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="password" type="password"
              onKeyDown={e=>e.key==="Enter"&&tryLogin()}
              style={{ flex:1, background:"#0d1117", border:`1px solid #1e2a3a`, color:color, padding:"8px 10px", borderRadius:4, fontFamily:"monospace", fontSize:12, outline:"none" }}/>
            <button onClick={tryLogin} style={{ background:color, color:"#000", border:"none", padding:"8px 16px", borderRadius:4, fontWeight:"bold", cursor:"pointer", fontSize:14 }}>→</button>
          </div>
          {attempts.length>0 && (
            <div style={{ background:"#0d1117", borderRadius:6, padding:10, maxHeight:120, overflowY:"auto", marginBottom:8 }}>
              {attempts.map((a,i)=>(
                <div key={i} style={{ color:a.ok?"#00ff88":"#ff3b3b", fontSize:11, fontFamily:"monospace", marginBottom:2 }}>
                  [{a.time}] {a.user}:{a.pass} → {a.ok?"✅ ACCESO":"❌ DENEGADO"}
                </div>
              ))}
            </div>
          )}
          <div style={{ color:"#4a5568", fontSize:10 }}>Prueba: admin/admin · admin/1234 · admin/12345 · root/root</div>
        </>
      )}
    </div>
  );
}

// ── CSS ──
const css = `
  .btn{cursor:pointer;border:none;font-family:'Inter',sans-serif;font-weight:bold;transition:all .15s;border-radius:5px}
  .btn:hover:not(:disabled){filter:brightness(1.15);transform:translateY(-1px)}
  .btn:disabled{opacity:.45;cursor:not-allowed}
  .opt{width:100%;text-align:left;padding:10px 14px;margin:5px 0;border-radius:5px;cursor:pointer;font-family:'Courier New',monospace;font-size:13px;border:1px solid #1e2a3a;background:#0d1117;color:#8b949e;transition:all .13s}
  .opt:hover:not(:disabled){border-color:#2d3a4a;background:#111827;color:#c9d1d9}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  .fade-up{animation:fadeUp 0.5s ease forwards}
  .cursor::after{content:'▋';animation:blink 0.7s step-end infinite}
  .skip-hint{position:fixed;bottom:18px;right:18px;background:#0d1117;border:1px solid #1e2a3a;color:#4a5568;font-size:10px;padding:6px 12px;border-radius:20px;pointer-events:none;font-family:'Inter',sans-serif;letter-spacing:1px}
`;

const SIMS = { sqli:SQLiSim, xss:XSSSim, traversal:TraversalSim, defaultcreds:DefaultCredsSim };

export default function LabDetail({ lab, onBack, onComplete }) {
  const [phase, setPhase]     = useState("theory");
  const [tp, setTp]           = useState(0);
  const [ans, setAns]         = useState({});
  const [sub, setSub]         = useState(false);
  const [inp, setInp]         = useState("");
  const [res, setRes]         = useState(null);
  const [flag, setFlag]       = useState(null);
  const [skip, setSkip]       = useState(false);

  // Reset skip cuando cambia slide o fase
  useEffect(()=>{ setSkip(false); }, [tp, phase]);

  const title = lab.theory[tp]?.t || "";
  const { displayed:typedTitle, done:titleDone } = useTypingEffect(title, 38, skip);

  const score = () => {
    let c=0;
    lab.quiz.forEach((q,i)=>{ if(ans[i]===q.c) c++; });
    return Math.round((c/lab.quiz.length)*100);
  };

  const submitExploit = () => {
    if (lab.lab.ok(inp)) { setRes("ok"); setFlag(lab.lab.flag); onComplete(lab.id, lab.xp); }
    else setRes("fail");
  };

  const SimComp = SIMS[lab.id];

  return (
    <div onClick={()=>{ if(!skip && phase==="theory") setSkip(true); }}
      style={{ background:C.bg, minHeight:"100vh", fontFamily:"'Courier New',monospace", color:"#c9d1d9" }}>
      <style>{css}</style>

      {/* Skip hint */}
      {!skip && phase==="theory" && <div className="skip-hint">TOCA PARA SALTAR →</div>}

      {/* Nav */}
      <div onClick={e=>e.stopPropagation()}
        style={{ background:C.panel, borderBottom:`1px solid ${C.border}`, padding:"10px 16px", display:"flex", alignItems:"center", gap:10, position:"sticky", top:0, zIndex:10, flexWrap:"wrap" }}>
        <button className="btn" onClick={onBack} style={{ background:C.dim, color:C.muted, padding:"7px 14px", fontSize:12 }}>← Labs</button>
        <span style={{ fontSize:18 }}>{lab.icon}</span>
        <span style={{ color:"#fff", fontWeight:"bold", fontSize:14, flex:1 }}>{lab.title}</span>
        <div style={{ display:"flex", gap:5 }}>
          {[["theory","📖 Teoría"],["quiz","❓ Quiz"],["lab","🔬 Lab"]].map(([p,label])=>(
            <button key={p} className="btn"
              onClick={e=>{ e.stopPropagation(); if(p==="lab"&&score()<60&&sub) return; setPhase(p); }}
              style={{ padding:"6px 12px", fontSize:11, background:phase===p?lab.color:C.dim, color:phase===p?"#000":C.muted }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding:20, maxWidth:700, margin:"0 auto" }} onClick={e=>e.stopPropagation()}>

        {/* ── TEORÍA ── */}
        {phase==="theory" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div>
                <div style={{ color:lab.color, fontSize:10, letterSpacing:3 }}>LECCIÓN {tp+1}/{lab.theory.length}</div>
                <h3 className={titleDone||skip?"":"cursor"}
                  style={{ color:"#fff", margin:"5px 0 0", fontSize:17, minHeight:26, color:lab.color }}>
                  {typedTitle}
                </h3>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {lab.theory.map((_,i)=>(
                  <div key={i} onClick={()=>setTp(i)}
                    style={{ width:9, height:9, borderRadius:"50%", cursor:"pointer", background:i===tp?lab.color:i<tp?`${lab.color}55`:C.border }} />
                ))}
              </div>
            </div>

            <div className="fade-up" key={`slide-${tp}`}
              style={{ background:C.panel, border:`1px solid ${lab.color}33`, borderRadius:8, padding:20, marginBottom:16, opacity:0, animationDelay:skip?"0ms":"200ms" }}>
              <div style={{ borderLeft:`3px solid ${lab.color}`, paddingLeft:16, lineHeight:1.9 }}>
                {lab.theory[tp].b.split("\n").map((line,i)=>{
                  const trimmed = line.trim();
                  const isCodeBlock = /^(SELECT|query\s*=|db\.|<|\.\.\/|https?:\/\/|document\.|DB_|API_|SECRET|ssh|root:|nmap|sqlmap|\$6\$)/.test(trimmed);
                  const isHighlight = /^(✅|💀|🔹|😴|🏃|🤷|📦|🔍|📚|🔨|📋|🤖|💥|🍪|📷|🎭|🖥️)/.test(trimmed);
                  if (line==="") return <br key={i}/>;
                  return (
                    <p key={i} style={{
                      margin:"4px 0",
                      color: isCodeBlock ? lab.color : isHighlight ? "#c9d1d9" : "#8b949e",
                      fontFamily:"'Courier New',monospace",
                      background: isCodeBlock ? "#050810" : "transparent",
                      padding: isCodeBlock ? "3px 10px" : "0",
                      borderRadius: isCodeBlock ? 3 : 0,
                      fontSize:12
                    }}>{line}</p>
                  );
                })}
              </div>
            </div>

            {/* Simulación en última lección */}
            {tp===lab.theory.length-1 && SimComp && (
              <div className="fade-up" key={`sim-${tp}`} style={{ opacity:0, animationDelay:skip?"0ms":"400ms" }}>
                <SimComp color={lab.color}/>
              </div>
            )}

            <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
              <button className="btn" onClick={()=>setTp(p=>Math.max(0,p-1))} disabled={tp===0}
                style={{ background:C.dim, color:C.muted, padding:"10px 18px", fontSize:12 }}>← Anterior</button>
              {tp<lab.theory.length-1
                ? <button className="btn" onClick={()=>setTp(p=>p+1)} style={{ background:lab.color, color:"#000", padding:"10px 18px", fontSize:12 }}>Siguiente →</button>
                : <button className="btn" onClick={()=>setPhase("quiz")} style={{ background:lab.color, color:"#000", padding:"10px 18px", fontSize:12 }}>Ir al Quiz →</button>
              }
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {phase==="quiz" && (
          <div className="fade-up" style={{ opacity:0 }}>
            <div style={{ marginBottom:16 }}>
              <div style={{ color:lab.color, fontSize:10, letterSpacing:3 }}>EVALUACIÓN</div>
              <h3 style={{ color:"#fff", margin:"5px 0 0", fontSize:17 }}>Quiz — {lab.title}</h3>
              <p style={{ color:C.muted, fontSize:12 }}>12 preguntas · Mínimo 60% para acceder al Lab</p>
            </div>

            {lab.quiz.map((q,qi)=>(
              <div key={qi} className="fade-up"
                style={{ background:C.panel, border:`1px solid ${sub?(ans[qi]===q.c?"#00ff8833":"#ff3b3b33"):C.border}`, borderRadius:8, padding:16, marginBottom:10, opacity:0, animationDelay:`${qi*50}ms` }}>
                <div style={{ color:C.muted, fontSize:10, marginBottom:5 }}>P{qi+1}/12</div>
                <div style={{ color:"#fff", fontSize:13, fontWeight:"bold", marginBottom:10 }}>{q.q}</div>
                {q.opts.map((opt,oi)=>{
                  let bg=C.panel, border=C.border, color="#8b949e";
                  if(ans[qi]===oi){ border=lab.color; color="#fff"; }
                  if(sub){
                    if(oi===q.c){ bg="#002200"; border=C.green; color=C.green; }
                    else if(ans[qi]===oi&&oi!==q.c){ bg="#1a0505"; border=C.red; color=C.red; }
                  }
                  return (
                    <button key={oi} className="opt" disabled={sub}
                      onClick={()=>setAns(p=>({...p,[qi]:oi}))}
                      style={{ background:bg, border:`1px solid ${border}`, color }}>
                      <span style={{ color:lab.color, marginRight:8 }}>{["A","B","C","D"][oi]}.</span>{opt}
                    </button>
                  );
                })}
                {sub && <div style={{ color:C.muted, fontSize:11, marginTop:7, paddingLeft:8, borderLeft:`2px solid ${C.border}` }}>💡 {q.e}</div>}
              </div>
            ))}

            {!sub
              ? <button className="btn" onClick={()=>setSub(true)} disabled={Object.keys(ans).length<12}
                  style={{ background:lab.color, color:"#000", padding:"12px 24px", fontSize:13, width:"100%", marginTop:6 }}>
                  Enviar ({Object.keys(ans).length}/12)
                </button>
              : <div className="fade-up" style={{ background:C.panel, border:`1px solid ${score()>=60?C.green:C.red}`, borderRadius:8, padding:22, textAlign:"center", marginTop:10, opacity:0 }}>
                  <div style={{ fontSize:36, marginBottom:8 }}>{score()>=60?"🎯":"📚"}</div>
                  <div style={{ color:score()>=60?C.green:C.red, fontSize:32, fontWeight:"bold" }}>{score()}%</div>
                  <div style={{ color:C.muted, fontSize:12, marginTop:6 }}>
                    {score()>=60?"¡Aprobado! El Lab está desbloqueado.":"Necesitas 60% para continuar. Revisa la teoría."}
                  </div>
                  <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:14 }}>
                    <button className="btn" onClick={()=>{setAns({});setSub(false);}}
                      style={{ background:C.dim, color:C.muted, padding:"10px 18px", fontSize:12 }}>Reintentar</button>
                    {score()>=60 &&
                      <button className="btn" onClick={()=>setPhase("lab")}
                        style={{ background:lab.color, color:"#000", padding:"10px 18px", fontSize:12 }}>Ir al Lab →</button>
                    }
                  </div>
                </div>
            }
          </div>
        )}

        {/* ── LAB ── */}
        {phase==="lab" && (
          <div className="fade-up" style={{ opacity:0 }}>
            <div style={{ marginBottom:16 }}>
              <div style={{ color:lab.color, fontSize:10, letterSpacing:3 }}>LABORATORIO PRÁCTICO</div>
              <h3 style={{ color:"#fff", margin:"5px 0 0", fontSize:17 }}>{lab.lab.target}</h3>
              <p style={{ color:C.muted, fontSize:12, marginTop:4 }}>{lab.lab.scene}</p>
            </div>

            <div style={{ background:"#050810", border:`1px solid ${lab.color}22`, borderRadius:8, padding:14, marginBottom:14 }}>
              <div style={{ display:"flex", gap:5, marginBottom:10 }}>
                {["#ff5f56","#ffbd2e","#27c93f"].map(col=><div key={col} style={{ width:9, height:9, borderRadius:"50%", background:col }}/>)}
                <span style={{ color:C.muted, fontSize:11, marginLeft:6 }}>terminal — {lab.id}</span>
              </div>
              <div style={{ color:C.green, fontSize:12 }}>[✓] Entorno iniciado · {lab.lab.obj}</div>
              <div style={{ color:C.yellow, fontSize:12, marginTop:2 }}>[!] Solo en entornos controlados y con autorización</div>
            </div>

            <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:16, marginBottom:14 }}>
              <div style={{ color:C.muted, fontSize:10, letterSpacing:3, marginBottom:10 }}>PASOS</div>
              {lab.lab.steps.map((s,i)=>(
                <div key={i} className="fade-up" style={{ display:"flex", gap:10, marginBottom:8, alignItems:"flex-start", animationDelay:`${i*100}ms`, opacity:0 }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:`${lab.color}22`, border:`1px solid ${lab.color}`, display:"flex", alignItems:"center", justifyContent:"center", color:lab.color, fontSize:11, fontWeight:"bold", flexShrink:0 }}>{i+1}</div>
                  <div style={{ color:"#8b949e", fontSize:12, lineHeight:1.6, paddingTop:3 }}>{s}</div>
                </div>
              ))}
            </div>

            <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:16, marginBottom:12 }}>
              <div style={{ color:C.muted, fontSize:10, letterSpacing:3, marginBottom:8 }}>EJECUTAR PAYLOAD</div>
              <div style={{ display:"flex", gap:8 }}>
                <input value={inp} onChange={e=>setInp(e.target.value)}
                  placeholder={lab.lab.ph}
                  onKeyDown={e=>e.key==="Enter"&&!res&&submitExploit()}
                  style={{ flex:1, background:"#050810", border:`1px solid ${lab.color}33`, color:lab.color, padding:"11px 12px", borderRadius:5, fontFamily:"'Courier New',monospace", fontSize:13, outline:"none" }}/>
                <button className="btn" onClick={submitExploit} disabled={!!res}
                  style={{ background:lab.color, color:"#000", padding:"11px 18px", fontSize:13 }}>Ejecutar</button>
              </div>
              <div style={{ color:`${lab.color}66`, fontSize:11, marginTop:6 }}>💡 Pista: {lab.lab.hint}</div>
            </div>

            {res==="fail" && (
              <div className="fade-up" style={{ background:"#150505", border:`1px solid ${C.red}44`, borderRadius:8, padding:14, marginBottom:12, opacity:0 }}>
                <div style={{ color:C.red, fontSize:13, fontWeight:"bold" }}>❌ Payload incorrecto</div>
                <div style={{ color:C.muted, fontSize:12, marginTop:4 }}>Revisa la teoría y practica en la simulación interactiva de la última lección.</div>
              </div>
            )}

            {res==="ok" && flag && (
              <div className="fade-up" style={{ background:"#051a05", border:`2px solid ${C.green}`, borderRadius:10, padding:26, textAlign:"center", opacity:0 }}>
                <div style={{ fontSize:34, marginBottom:10 }}>🎯</div>
                <div style={{ color:C.green, fontSize:13, letterSpacing:3, marginBottom:6 }}>¡LAB COMPLETADO!</div>
                <div style={{ color:"#8b949e", fontSize:12, marginBottom:6 }}>{lab.lab.msg}</div>
                <div style={{ background:"#050810", border:`1px solid ${C.green}44`, padding:10, borderRadius:5, margin:"12px 0" }}>
                  <div style={{ color:C.muted, fontSize:10, marginBottom:3 }}>🚩 FLAG</div>
                  <div style={{ color:C.green, fontSize:12, wordBreak:"break-all" }}>{flag}</div>
                </div>
                <div style={{ color:C.yellow, fontSize:13, marginBottom:12 }}>+{lab.xp} XP · {lab.badge}</div>
                <button className="btn" onClick={onBack}
                  style={{ background:C.green, color:"#000", padding:"10px 22px", fontSize:13 }}>← Volver al mapa</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}