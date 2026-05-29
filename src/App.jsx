import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import LabMap from "./components/Labs/LabMap";
import LabDetail from "./components/Labs/LabDetail";
import { C, FINAL } from "./data/labs";
import Modulos from "./components/Modulos/Modulos";
import RedTeam from "./components/RedTeam/RedTeam";
import CCNAPrep from "./components/CCNAPrep/CCNAPrep";
import Pentesting from "./components/Pentesting/Pentesting";

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

const CQ_MISIONES = [
  { id:"cq1", icono:"[S]", titulo:"Escaner de Puertos", dificultad:"Facil", xp:80, lenguaje:"Python",
    descripcion:"Escribe un script que escanee los puertos 1-1024 de una IP y liste los que estan abiertos.",
    pistas:["Usa el modulo socket","Prueba socket.connect_ex() — retorna 0 si el puerto esta abierto","Un timeout de 0.5s evita esperas largas"],
    solucion:"import socket\ndef escanear(ip):\n    abiertos = []\n    for p in range(1, 1025):\n        s = socket.socket()\n        s.settimeout(0.5)\n        if s.connect_ex((ip, p)) == 0:\n            abiertos.append(p)\n        s.close()\n    return abiertos\nprint(escanear('127.0.0.1'))" },
  { id:"cq2", icono:"[C]", titulo:"Cifrado Cesar", dificultad:"Facil", xp:60, lenguaje:"Python",
    descripcion:"Implementa el cifrado Cesar: desplaza cada letra del mensaje N posiciones en el alfabeto.",
    pistas:["Usa ord() y chr()","Maneja mayusculas y minusculas por separado","El modulo 26 hace el ciclo"],
    solucion:"def cesar(msg, n):\n    r = ''\n    for c in msg:\n        if c.isalpha():\n            b = ord('A') if c.isupper() else ord('a')\n            r += chr((ord(c) - b + n) % 26 + b)\n        else:\n            r += c\n    return r\nprint(cesar('Hola Mundo', 3))" },
  { id:"cq3", icono:"[W]", titulo:"Analizador de Headers HTTP", dificultad:"Medio", xp:100, lenguaje:"Python",
    descripcion:"Haz un GET a una URL y muestra los headers de seguridad presentes en la respuesta.",
    pistas:["Usa el modulo requests","response.headers es un diccionario","Busca: content-security-policy, strict-transport-security, x-frame-options"],
    solucion:"import requests\ndef analizar(url):\n    r = requests.get(url, timeout=5)\n    seg = ['content-security-policy','strict-transport-security','x-frame-options','x-content-type-options']\n    for h in seg:\n        print(f'{h}: {r.headers.get(h, \"No encontrado\")}')\nanalizar('https://example.com')" },
  { id:"cq4", icono:"[H]", titulo:"Generador de Hashes", dificultad:"Facil", xp:70, lenguaje:"Python",
    descripcion:"Dado un texto, genera su hash en MD5, SHA-1 y SHA-256 e imprimelos.",
    pistas:["Usa hashlib","Necesitas .encode() antes de hashear","hashlib.md5(), hashlib.sha1(), hashlib.sha256()"],
    solucion:"import hashlib\ndef hashes(txt):\n    b = txt.encode()\n    print('MD5:   ', hashlib.md5(b).hexdigest())\n    print('SHA1:  ', hashlib.sha1(b).hexdigest())\n    print('SHA256:', hashlib.sha256(b).hexdigest())\nhashes('hackforge')" },
  { id:"cq5", icono:"[D]", titulo:"Detector de SQL Injection", dificultad:"Medio", xp:120, lenguaje:"Python",
    descripcion:"Escribe una funcion que detecte si un string contiene patrones tipicos de SQL Injection.",
    pistas:["Busca palabras clave: OR, UNION, SELECT, DROP","Las comillas simples son sospechosas","Usa expresiones regulares"],
    solucion:"import re\ndef detectar_sqli(inp):\n    patrones = [r'(\\bOR\\b|\\bUNION\\b|\\bSELECT\\b|\\bDROP\\b)', r\"['\\\"]\", r'1\\s*=\\s*1']\n    for p in patrones:\n        if re.search(p, inp, re.IGNORECASE):\n            return 'Posible SQLi detectado'\n    return 'Input limpio'\nprint(detectar_sqli(\"' OR 1=1 --\"))" },
];

function CodeQuest({ progresoMisiones, onCompletar }) {
  const [sel, setSel]           = useState(null);
  const [verSol, setVerSol]     = useState(false);
  const [verPistas, setVerPistas] = useState(false);
  const cyan="#00d4ff",green="#00ff88",red="#ff3366",panel="#0d1117",border="#1e2a3a",muted="#8b949e",text="#c9d1d9";

  if (sel) {
    const m = CQ_MISIONES.find(x => x.id === sel);
    const comp = progresoMisiones[m.id];
    return (
      <div style={{ maxWidth:720, margin:"0 auto" }}>
        <button onClick={() => { setSel(null); setVerSol(false); setVerPistas(false); }}
          style={{ background:"none", border:`1px solid ${border}`, color:cyan, borderRadius:6, padding:"6px 14px", cursor:"pointer", fontSize:12, marginBottom:20 }}>
          Volver
        </button>
        <div style={{ color:cyan, fontSize:10, letterSpacing:4, fontFamily:"monospace", marginBottom:8 }}>CODEQUEST // {m.lenguaje}</div>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
          <span style={{ fontSize:28, fontFamily:"monospace", color:cyan }}>{m.icono}</span>
          <div>
            <h2 style={{ color:"#fff", fontSize:20, fontWeight:"bold", margin:"0 0 8px" }}>{m.titulo}</h2>
            <div style={{ display:"flex", gap:8 }}>
              <span style={{ background:`${cyan}22`, color:cyan, fontSize:11, padding:"3px 10px", borderRadius:4 }}>{m.dificultad}</span>
              <span style={{ background:`${green}22`, color:green, fontSize:11, padding:"3px 10px", borderRadius:4 }}>+{m.xp} XP</span>
              <span style={{ background:border, color:muted, fontSize:11, padding:"3px 10px", borderRadius:4 }}>{m.lenguaje}</span>
            </div>
          </div>
        </div>
        <div style={{ background:panel, border:`1px solid ${border}`, borderRadius:8, padding:20, marginBottom:14 }}>
          <div style={{ color:muted, fontSize:10, letterSpacing:2, fontFamily:"monospace", marginBottom:8 }}>MISION</div>
          <p style={{ color:text, fontSize:14, lineHeight:1.75, margin:0 }}>{m.descripcion}</p>
        </div>
        <button onClick={() => setVerPistas(!verPistas)}
          style={{ width:"100%", background:verPistas?`${cyan}18`:"none", border:`1px solid ${cyan}44`, color:cyan, borderRadius:6, padding:"9px 16px", cursor:"pointer", fontSize:13, marginBottom:10 }}>
          {verPistas ? "Ocultar pistas" : "Ver pistas"}
        </button>
        {verPistas && (
          <div style={{ background:panel, border:`1px solid ${cyan}33`, borderRadius:8, padding:16, marginBottom:10 }}>
            {m.pistas.map((p, i) => (
              <div key={i} style={{ color:text, fontSize:13, padding:"8px 0", borderBottom: i<m.pistas.length-1?`1px solid ${border}`:"none" }}>
                <span style={{ color:cyan, marginRight:8 }}>></span>{p}
              </div>
            ))}
          </div>
        )}
        <button onClick={() => setVerSol(!verSol)}
          style={{ width:"100%", background:verSol?`${red}18`:"none", border:`1px solid ${red}44`, color:red, borderRadius:6, padding:"9px 16px", cursor:"pointer", fontSize:13, marginBottom:10 }}>
          {verSol ? "Ocultar solucion" : "Ver solucion (spoiler)"}
        </button>
        {verSol && (
          <div style={{ background:"#010810", border:`1px solid ${border}`, borderRadius:8, padding:20, marginBottom:14 }}>
            <pre style={{ color:green, fontFamily:"monospace", fontSize:12, margin:0, whiteSpace:"pre-wrap", lineHeight:1.75 }}>{m.solucion}</pre>
          </div>
        )}
        {!comp ? (
          <button onClick={() => onCompletar(m.id, m.xp)}
            style={{ width:"100%", background:cyan, color:"#000", border:"none", borderRadius:8, padding:"13px", cursor:"pointer", fontWeight:"bold", fontSize:14 }}>
            Marcar como completada (+{m.xp} XP)
          </button>
        ) : (
          <div style={{ background:`${green}15`, border:`1px solid ${green}44`, borderRadius:8, padding:"13px", textAlign:"center", color:green, fontWeight:"bold" }}>
            Mision completada!
          </div>
        )}
      </div>
    );
  }

  const totalXP = CQ_MISIONES.reduce((a,m) => a+(progresoMisiones[m.id]?m.xp:0),0);
  const completadas = CQ_MISIONES.filter(m => progresoMisiones[m.id]).length;
  return (
    <div>
      <div style={{ color:cyan, fontSize:10, letterSpacing:4, fontFamily:"monospace", marginBottom:8 }}>HACKFORGE // CODEQUEST</div>
      <h2 style={{ color:"#fff", fontSize:22, fontWeight:"bold", marginBottom:6 }}>CodeQuest</h2>
      <p style={{ color:muted, fontSize:13, marginBottom:20 }}>Misiones de codigo con enfoque en ciberseguridad. Resuelve cada reto para ganar XP.</p>
      <div style={{ display:"flex", gap:12, marginBottom:24 }}>
        <div style={{ background:panel, border:`1px solid ${border}`, borderRadius:8, padding:"12px 20px" }}>
          <div style={{ color:cyan, fontSize:18, fontWeight:"bold" }}>{completadas}/{CQ_MISIONES.length}</div>
          <div style={{ color:muted, fontSize:11 }}>Completadas</div>
        </div>
        <div style={{ background:panel, border:`1px solid ${border}`, borderRadius:8, padding:"12px 20px" }}>
          <div style={{ color:green, fontSize:18, fontWeight:"bold" }}>{totalXP} XP</div>
          <div style={{ color:muted, fontSize:11 }}>Ganados</div>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14 }}>
        {CQ_MISIONES.map(m => {
          const comp = progresoMisiones[m.id];
          return (
            <div key={m.id} onClick={() => setSel(m.id)}
              style={{ background:panel, border:`1px solid ${comp?green+"55":border}`, borderRadius:10, padding:18, cursor:"pointer" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <span style={{ fontFamily:"monospace", color:cyan, fontSize:18 }}>{m.icono}</span>
                {comp && <span style={{ color:green }}>OK</span>}
              </div>
              <div style={{ color:"#fff", fontWeight:"bold", fontSize:14, marginBottom:6 }}>{m.titulo}</div>
              <div style={{ color:muted, fontSize:12, marginBottom:12, lineHeight:1.55 }}>{m.descripcion.slice(0,80)}...</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                <span style={{ background:`${cyan}22`, color:cyan, fontSize:11, padding:"2px 8px", borderRadius:4 }}>{m.dificultad}</span>
                <span style={{ background:`${green}22`, color:green, fontSize:11, padding:"2px 8px", borderRadius:4 }}>+{m.xp} XP</span>
                <span style={{ background:border, color:muted, fontSize:11, padding:"2px 8px", borderRadius:4 }}>{m.lenguaje}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #07090f; font-family: 'Inter', sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #1e2a3a; border-radius: 2px; }
  .nav-item { cursor: pointer; padding: 10px 14px; border-radius: 6px; display: flex; align-items: center; gap: 10px; font-size: 13px; transition: all .18s; border: 1px solid transparent; }
  .nav-item:hover { background: #111827; border-color: #1e2a3a; }
  .btn { cursor: pointer; border: none; font-family: 'Inter', sans-serif; font-weight: bold; transition: all .15s; border-radius: 5px; }
  .btn:hover:not(:disabled) { filter: brightness(1.15); transform: translateY(-1px); }
  .btn:disabled { opacity: .45; cursor: not-allowed; }
  .hamburger { display: none; position: fixed; top: 12px; left: 12px; z-index: 1000; background: #0d1117; border: 1px solid #1e2a3a; color: #8b949e; padding: 8px 10px; border-radius: 6px; cursor: pointer; font-size: 18px; line-height: 1; }
  .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 998; }
  @media (max-width: 768px) {
    .hamburger { display: block; }
    .sidebar { position: fixed !important; top: 0; left: 0; height: 100vh; z-index: 999; transform: translateX(-100%); transition: transform 0.25s ease; }
    .sidebar.open { transform: translateX(0); }
    .sidebar-overlay.open { display: block; }
    .main-content { padding: 16px !important; padding-top: 52px !important; }
  }
`;

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
          <div style={{ color:C.muted, fontSize:10, marginTop:2 }}>{session.nombre} · Lv.3</div>
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
                      <div style={{ color:ok?C.green:C.yellow, fontSize:10, letterSpacing:2 }}>OBJETIVO {i+1} — {obj.tech}</div>
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
                <div style={{ color:C.yellow, fontSize:13 }}>+{FINAL.xp} XP · {FINAL.badge}</div>
                <button className="btn" onClick={backToMap} style={{ background:C.green, color:"#000", padding:"11px 22px", fontSize:13, marginTop:14 }}>Volver al mapa</button>
              </div>
            )}
          </div>
        )}

        {nav==="mods" && <Modulos progresoMods={progresoMods} onCompletarLeccion={completarLeccion}/>}
        {nav==="rt"   && <RedTeam progresoRT={progresoMods} onCompletarRT={completarLeccion}/>}
        {nav==="pt"   && <Pentesting progresoMods={progresoMods} onCompletarLeccion={completarLeccion}/>}
        {nav==="cq"   && <CodeQuest progresoMisiones={progresoMisiones} onCompletar={completarMision}/>}
        {nav==="ccna" && <CCNAPrep />}

      </main>
    </div>
  );
}
