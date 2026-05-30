import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import LabMap from "./components/Labs/LabMap";
import LabDetail from "./components/Labs/LabDetail";
import { C, FINAL } from "./data/labs";
import Modulos from "./components/Modulos/Modulos";
import RedTeam from "./components/RedTeam/RedTeam";
import CCNAPrep from "./components/CCNAPrep/CCNAPrep";
import Pentesting from "./components/Pentesting/Pentesting";
import CodeQuestComp from "./components/CodeQuest/CodeQuest";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch { return initialValue; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
}

function Login({ onLogin }) {
  const [modo, setModo]     = useState("login");
  const [email, setEmail]   = useState("");
  const [pass, setPass]     = useState("");
  const [nombre, setNombre] = useState("");
  const [error, setError]   = useState("");

  const getUsers = () => {
    try { return JSON.parse(localStorage.getItem("hf_users") || "{}"); } catch { return {}; }
  };

  const handleLogin = () => {
    setError("");
    if (!email || !pass) { setError("Completa todos los campos."); return; }
    const users = getUsers();
    const user = users[email.toLowerCase()];
    if (!user) { setError("No existe una cuenta con ese email."); return; }
    if (user.pass !== pass) { setError("Contrasena incorrecta."); return; }
    localStorage.setItem("hf_session", JSON.stringify({ email: email.toLowerCase(), nombre: user.nombre }));
    onLogin({ email: email.toLowerCase(), nombre: user.nombre });
  };

  const handleRegister = () => {
    setError("");
    if (!nombre || !email || !pass) { setError("Completa todos los campos."); return; }
    if (!email.includes("@")) { setError("Email invalido."); return; }
    if (pass.length < 6) { setError("La contrasena debe tener al menos 6 caracteres."); return; }
    const users = getUsers();
    if (users[email.toLowerCase()]) { setError("Ya existe una cuenta con ese email."); return; }
    users[email.toLowerCase()] = { nombre, pass };
    localStorage.setItem("hf_users", JSON.stringify(users));
    localStorage.setItem("hf_session", JSON.stringify({ email: email.toLowerCase(), nombre }));
    onLogin({ email: email.toLowerCase(), nombre });
  };

  return (
    <div style={{ minHeight:"100vh", background:"#07090f", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif", padding:16 }}>
      <div style={{ width:"100%", maxWidth:400 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ color:"#00d4ff", fontSize:11, letterSpacing:6, marginBottom:8 }}>HACKFORGE</div>
          <h1 style={{ color:"#fff", fontSize:26, fontWeight:"bold", margin:"0 0 6px" }}>
            {modo === "login" ? "Iniciar sesion" : "Crear cuenta"}
          </h1>
          <p style={{ color:"#8b949e", fontSize:13 }}>
            {modo === "login" ? "Bienvenido de vuelta, hacker." : "Unete a la plataforma."}
          </p>
        </div>
        <div style={{ background:"#0d1117", border:"1px solid #1e2a3a", borderRadius:12, padding:28 }}>
          {modo === "register" && (
            <div style={{ marginBottom:16 }}>
              <label style={{ color:"#8b949e", fontSize:11, letterSpacing:2, display:"block", marginBottom:6 }}>NOMBRE</label>
              <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre"
                style={{ width:"100%", background:"#050810", border:"1px solid #1e2a3a", color:"#c9d1d9", padding:"11px 14px", borderRadius:6, fontSize:13, outline:"none" }}/>
            </div>
          )}
          <div style={{ marginBottom:16 }}>
            <label style={{ color:"#8b949e", fontSize:11, letterSpacing:2, display:"block", marginBottom:6 }}>EMAIL</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" type="email"
              onKeyDown={e => e.key === "Enter" && (modo === "login" ? handleLogin() : handleRegister())}
              style={{ width:"100%", background:"#050810", border:"1px solid #1e2a3a", color:"#c9d1d9", padding:"11px 14px", borderRadius:6, fontSize:13, outline:"none" }}/>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={{ color:"#8b949e", fontSize:11, letterSpacing:2, display:"block", marginBottom:6 }}>CONTRASENA</label>
            <input value={pass} onChange={e => setPass(e.target.value)}
              placeholder={modo === "register" ? "Minimo 6 caracteres" : "..."} type="password"
              onKeyDown={e => e.key === "Enter" && (modo === "login" ? handleLogin() : handleRegister())}
              style={{ width:"100%", background:"#050810", border:"1px solid #1e2a3a", color:"#c9d1d9", padding:"11px 14px", borderRadius:6, fontSize:13, outline:"none" }}/>
          </div>
          {error && (
            <div style={{ background:"#1a0505", border:"1px solid #ff3b3b44", borderRadius:6, padding:"10px 14px", marginBottom:16, color:"#ff6b6b", fontSize:12 }}>
              {error}
            </div>
          )}
          <button onClick={modo === "login" ? handleLogin : handleRegister}
            style={{ width:"100%", background:"#00d4ff", color:"#000", border:"none", padding:"12px", borderRadius:6, fontSize:14, fontWeight:"bold", cursor:"pointer" }}>
            {modo === "login" ? "Entrar" : "Crear cuenta"}
          </button>
          <div style={{ textAlign:"center", marginTop:18, color:"#8b949e", fontSize:12 }}>
            {modo === "login" ? "No tienes cuenta? " : "Ya tienes cuenta? "}
            <span onClick={() => { setModo(modo === "login" ? "register" : "login"); setError(""); }}
              style={{ color:"#00d4ff", cursor:"pointer", textDecoration:"underline" }}>
              {modo === "login" ? "Registrate" : "Inicia sesion"}
            </span>
          </div>
        </div>
        <p style={{ color:"#8b949e", fontSize:11, textAlign:"center", marginTop:16 }}>
          Datos guardados localmente en tu navegador
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem("hf_session") || "null"); } catch { return null; }
  });
  const [nav, setNav]               = useState("dash");
  const [labView, setLabView]       = useState("map");
  const [activeLab, setActiveLab]   = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userKey = session ? session.email.replace(/[^a-z0-9]/g, "_") : "guest";

  const [doneLabs,  setDoneLabs]  = useLocalStorage(`hf_doneLabs_${userKey}`,  []);
  const [labsXp,    setLabsXp]    = useLocalStorage(`hf_labsXp_${userKey}`,    0);
  const [flStep,    setFlStep]    = useLocalStorage(`hf_flStep_${userKey}`,     0);
  const [flInputs,  setFlInputs]  = useLocalStorage(`hf_flInputs_${userKey}`,  {});
  const [flResults, setFlResults] = useLocalStorage(`hf_flResults_${userKey}`, {});
  const [flDone,    setFlDone]    = useLocalStorage(`hf_flDone_${userKey}`,    false);
  const [streak,    setStreak]    = useLocalStorage(`hf_streak_${userKey}`,    0);
  const [lastVisit, setLastVisit] = useLocalStorage(`hf_lastVisit_${userKey}`, null);
  const [progresoMods, setProgresoMods]         = useLocalStorage(`hf_progresoMods_${userKey}`, {});
  const [progresoMisiones, setProgresoMisiones] = useLocalStorage(`hf_progresoMisiones_${userKey}`, {});

  const totalXp = 1240 + labsXp;

  useEffect(() => {
    const today = new Date().toDateString();
    if (lastVisit !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      setStreak(s => lastVisit === yesterday ? s + 1 : 1);
      setLastVisit(today);
    }
  }, []);

  const openLab   = (lab) => { setActiveLab(lab); setLabView("detail"); };
  const backToMap = ()    => { setActiveLab(null); setLabView("map"); };

  const completeLab = (id, xp) => {
    if (!doneLabs.includes(id)) { setDoneLabs(p => [...p, id]); setLabsXp(p => p + xp); }
  };

  const submitFinal = (i) => {
    const ok = FINAL.objectives[i].ok(flInputs[i] || "");
    setFlResults(p => ({ ...p, [i]: ok ? "ok" : "fail" }));
    if (ok) {
      if (i === 3) setTimeout(() => { setFlDone(true); setLabsXp(p => p + FINAL.xp); }, 500);
      else setTimeout(() => setFlStep(i + 1), 400);
    }
  };

  const completarLeccion = (modId, lecId, xp) => {
    setProgresoMods(p => {
      const mod = p[modId] || { completadas:0, leccionesId:[] };
      if (mod.leccionesId.includes(lecId)) return p;
      return { ...p, [modId]: { completadas: mod.completadas+1, leccionesId:[...mod.leccionesId, lecId] }};
    });
    setLabsXp(prev => prev + xp);
  };

  const completarMision = (id, xp) => {
    if (progresoMisiones[id]) return;
    setProgresoMisiones(p => ({ ...p, [id]: true }));
    setLabsXp(prev => prev + xp);
  };

  const resetProgress = () => {
    if (window.confirm("Resetear todo el progreso?")) {
      setDoneLabs([]); setLabsXp(0); setFlStep(0);
      setFlInputs({}); setFlResults({}); setFlDone(false); setStreak(0);
      setProgresoMods({}); setProgresoMisiones({});
    }
  };

  const handleLogout = () => { localStorage.removeItem("hf_session"); setSession(null); };

  const handleNav = (id) => { setNav(id); if (id === "labs") setLabView("map"); setSidebarOpen(false); };

  if (!session) return <Login onLogin={setSession} />;

  const NAV_ITEMS = [
    { id:"dash", label:"Dashboard"  },
    { id:"labs", label:"Labs"       },
    { id:"mods", label:"Modulos"    },
    { id:"rt",   label:"Red Team"   },
    { id:"pt",   label:"Pentesting" },
    { id:"cq",   label:"CodeQuest"  },
    { id:"ccna", label:"CCNA Prep"  },
  ];

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", background:C.bg, color:"#c9d1d9" }}>
      <style>{CSS}</style>

      <button className="hamburger" onClick={() => setSidebarOpen(o => !o)}>
        {sidebarOpen ? "X" : "="}
      </button>

      <div className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}
        style={{ width:210, background:C.panel, borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column", padding:"16px 12px", flexShrink:0, overflowY:"auto" }}>
        <div style={{ marginBottom:20, paddingBottom:16, borderBottom:`1px solid ${C.border}` }}>
          <div style={{ color:C.cyan, fontSize:10, letterSpacing:4 }}>HACKFORGE</div>
          <div style={{ color:"#fff", fontSize:15, fontWeight:"bold", marginTop:4 }}>Base Operaciones</div>
          <div style={{ color:C.muted, fontSize:10, marginTop:2 }}>{session.nombre} Â· Lv.3</div>
        </div>

        <div style={{ marginBottom:18, padding:"10px 12px", background:C.bg, borderRadius:6, border:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:C.muted, marginBottom:5 }}>
            <span style={{ color:C.cyan }}>{totalXp} XP</span><span>2000 XP</span>
          </div>
          <div style={{ height:4, background:C.border, borderRadius:2, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${Math.min(100,(totalXp/2000)*100)}%`, background:`linear-gradient(to right,${C.cyan},${C.green})`, borderRadius:2, transition:"width 0.5s" }}/>
          </div>
          <div style={{ color:C.muted, fontSize:10, marginTop:4 }}>Racha: {streak} dias</div>
        </div>

        {NAV_ITEMS.map(n => (
          <div key={n.id} className="nav-item" onClick={() => handleNav(n.id)}
            style={{ color:nav===n.id?"#fff":C.muted, background:nav===n.id?`${C.cyan}18`:"transparent", borderColor:nav===n.id?`${C.cyan}44`:"transparent" }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background: nav===n.id?C.cyan:C.border, display:"inline-block", flexShrink:0 }}/>
            <span>{n.label}</span>
            {n.id==="labs"&&doneLabs.length>0&&<span style={{ marginLeft:"auto", color:C.green, fontSize:10 }}>{doneLabs.length}ok</span>}
          </div>
        ))}

        <div style={{ marginTop:"auto" }}>
          <button onClick={resetProgress} style={{ width:"100%", background:"transparent", border:`1px solid ${C.border}`, color:C.muted, padding:"6px", borderRadius:4, fontSize:10, cursor:"pointer", marginBottom:8 }}>
            Resetear progreso
          </button>
          <button onClick={handleLogout} style={{ width:"100%", background:"transparent", border:`1px solid #ff3b3b44`, color:"#ff6b6b", padding:"6px", borderRadius:4, fontSize:10, cursor:"pointer", marginBottom:10 }}>
            Cerrar sesion
          </button>
          <div style={{ padding:"10px 12px", background:`${C.cyan}11`, border:`1px solid ${C.cyan}33`, borderRadius:6, fontSize:11 }}>
            <div style={{ color:C.cyan, fontWeight:"bold" }}>PLAN PRO</div>
            <div style={{ color:C.muted, fontSize:10, marginTop:2 }}>Acceso completo</div>
          </div>
        </div>
      </aside>

      <main className="main-content" style={{ flex:1, overflowY:"auto", padding:"24px" }}>

        {nav==="dash" && <Dashboard totalXp={totalXp} doneLabs={doneLabs} labsXp={labsXp} streak={streak} onNav={setNav}/>}

        {nav==="labs" && labView==="map" && <LabMap doneLabs={doneLabs} labsXp={labsXp} onOpenLab={openLab} onOpenFinal={()=>setLabView("final")} flDone={flDone}/>}
        {nav==="labs" && labView==="detail" && activeLab && <LabDetail lab={activeLab} onBack={backToMap} onComplete={completeLab}/>}

        {nav==="labs" && labView==="final" && (
          <div style={{ maxWidth:720, margin:"0 auto" }}>
            <button className="btn" onClick={backToMap} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:20 }}>Volver al mapa</button>
            <div style={{ textAlign:"center", marginBottom:28 }}>
              <div style={{ fontSize:44, marginBottom:10 }}>NEXUS</div>
              <div style={{ color:C.yellow, fontSize:11, letterSpacing:4 }}>OPERACION FINAL</div>
              <h2 style={{ color:"#fff", fontSize:20, margin:"8px 0" }}>OPERACION: NEXUS BANK</h2>
              <p style={{ color:C.muted, fontSize:12 }}>Compromete NexusBank usando las 4 tecnicas en secuencia.</p>
            </div>
            {FINAL.objectives.map((obj,i)=>{
              const unlocked=i<=flStep; const ok=flResults[i]==="ok";
              return (
                <div key={i} style={{ marginBottom:12, background:C.panel, border:`1px solid ${ok?C.green:unlocked?C.yellow:C.border}`, borderRadius:8, padding:20, opacity:unlocked?1:0.35 }}>
                  <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:ok?0:14 }}>
                    <span style={{ fontSize:22 }}>{obj.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ color:ok?C.green:C.yellow, fontSize:10, letterSpacing:2 }}>OBJETIVO {i+1} â€” {obj.tech}</div>
                      <div style={{ color:"#fff", fontWeight:"bold", fontSize:15 }}>{obj.title}</div>
                      <div style={{ color:C.muted, fontSize:12 }}>{obj.desc}</div>
                    </div>
                    {ok&&<span style={{ color:C.green, fontSize:20 }}>OK</span>}
                  </div>
                  {unlocked&&!ok&&(
                    <div style={{ display:"flex", gap:8 }}>
                      <input value={flInputs[i]||""} onChange={e=>setFlInputs(p=>({...p,[i]:e.target.value}))} placeholder={obj.ph} onKeyDown={e=>e.key==="Enter"&&submitFinal(i)}
                        style={{ flex:1, background:"#050810", border:`1px solid ${C.border}`, color:C.cyan, padding:"10px 12px", borderRadius:5, fontFamily:"monospace", fontSize:12, outline:"none" }}/>
                      <button className="btn" onClick={()=>submitFinal(i)} style={{ background:C.yellow, color:"#000", padding:"10px 16px", fontSize:12 }}>Ejecutar</button>
                    </div>
                  )}
                  {flResults[i]==="fail"&&<div style={{ color:C.red, fontSize:11, marginTop:8 }}>Incorrecto. Revisa el lab correspondiente.</div>}
                </div>
              );
            })}
            {flDone&&(
              <div style={{ background:"#051a0a", border:`2px solid ${C.green}`, borderRadius:10, padding:28, textAlign:"center", marginTop:20 }}>
                <div style={{ color:C.green, fontSize:14, letterSpacing:3, marginBottom:8 }}>OPERACION COMPLETADA!</div>
                <div style={{ color:"#fff", fontSize:18, fontWeight:"bold", marginBottom:14 }}>Nivel Basico Superado</div>
                <div style={{ background:"#050810", border:`1px solid ${C.green}44`, padding:10, borderRadius:5, marginBottom:14 }}>
                  <div style={{ color:C.muted, fontSize:10, marginBottom:3 }}>FLAG FINAL</div>
                  <div style={{ color:C.green, fontSize:12, wordBreak:"break-all" }}>{FINAL.flag}</div>
                </div>
                <div style={{ color:C.yellow, fontSize:13 }}>+{FINAL.xp} XP Â· {FINAL.badge}</div>
                <button className="btn" onClick={backToMap} style={{ background:C.green, color:"#000", padding:"11px 22px", fontSize:13, marginTop:14 }}>Volver al mapa</button>
              </div>
            )}
          </div>
        )}

        {nav==="mods" && <Modulos progresoMods={progresoMods} onCompletarLeccion={completarLeccion}/>}
        {nav==="rt"   && <RedTeam progresoRT={progresoMods} onCompletarRT={completarLeccion}/>}
        {nav==="pt"   && <Pentesting progresoMods={progresoMods} onCompletarLeccion={completarLeccion}/>}
        {nav==="cq" && <CodeQuestComp onCompletarCQ={completarMision}/>}
        {nav==="ccna" && <CCNAPrep />}

      </main>
    </div>
  );
}





