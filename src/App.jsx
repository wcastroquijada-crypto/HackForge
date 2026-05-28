import { useState, useEffect } from "react";

/* ─── PALETA ─────────────────────────────────────────────────── */
const C = {
  bg:     "#040c18",
  panel:  "#071628",
  border: "#0a2540",
  cyan:   "#00d4ff",
  green:  "#00ff88",
  red:    "#ff3366",
  muted:  "#4a7a9b",
  text:   "#cdd9e5",
};

/* ─── DATOS: MÓDULOS / RUTA CIBERSEGURIDAD ───────────────────── */
const MODULOS = [
  {
    id: "m1", icon: "🌐", titulo: "Fundamentos de Redes",
    lecciones: [
      { id:"l1", titulo:"Internet 101",          xp:50 },
      { id:"l2", titulo:"HTTP y HTTPS",           xp:50 },
      { id:"l3", titulo:"DNS",                    xp:50 },
      { id:"l4", titulo:"TCP y UDP",              xp:50 },
      { id:"l5", titulo:"Modelo OSI",             xp:60 },
      { id:"l6", titulo:"Puertos y Servicios",    xp:60 },
    ],
  },
  {
    id: "m2", icon: "🐧", titulo: "Linux para Seguridad",
    lecciones: [
      { id:"l7",  titulo:"Terminal básica",       xp:60 },
      { id:"l8",  titulo:"Permisos y usuarios",   xp:70 },
      { id:"l9",  titulo:"Procesos y servicios",  xp:70 },
      { id:"l10", titulo:"Redes en Linux",        xp:80 },
    ],
  },
  {
    id: "m3", icon: "🕵️", titulo: "Reconocimiento",
    bloqueado: true,
    lecciones: [
      { id:"l11", titulo:"OSINT básico",          xp:80 },
      { id:"l12", titulo:"Nmap",                  xp:90 },
      { id:"l13", titulo:"Whois y Shodan",        xp:90 },
    ],
  },
  {
    id: "m4", icon: "🔓", titulo: "Vulnerabilidades Web",
    bloqueado: true,
    lecciones: [
      { id:"l14", titulo:"SQL Injection",         xp:100 },
      { id:"l15", titulo:"XSS",                   xp:100 },
      { id:"l16", titulo:"CSRF",                  xp:100 },
    ],
  },
];

/* ─── DATOS: CODEQUEST MISIONES ──────────────────────────────── */
const CQ_MISIONES = [
  {
    id:"cq1", icono:"🔍", titulo:"Escáner de Puertos",
    dificultad:"Fácil", xp:80, lenguaje:"Python",
    descripcion:"Escribe un script que escanee los puertos 1-1024 de una IP y liste los que están abiertos.",
    pistas:["Usa el módulo socket", "Prueba socket.connect_ex()", "Un timeout de 0.5s evita esperas largas"],
    solucion:`import socket\ndef escanear(ip):\n    abiertos = []\n    for p in range(1, 1025):\n        s = socket.socket()\n        s.settimeout(0.5)\n        if s.connect_ex((ip, p)) == 0:\n            abiertos.append(p)\n        s.close()\n    return abiertos\nprint(escanear("127.0.0.1"))`,
  },
  {
    id:"cq2", icono:"🔐", titulo:"Cifrado César",
    dificultad:"Fácil", xp:60, lenguaje:"Python",
    descripcion:"Implementa el cifrado César: desplaza cada letra del mensaje N posiciones en el alfabeto.",
    pistas:["Usa ord() y chr()", "Recuerda manejar mayúsculas y minúsculas", "El módulo 26 te ayuda a hacer el ciclo"],
    solucion:`def cesar(msg, n):\n    r = ""\n    for c in msg:\n        if c.isalpha():\n            b = ord('A') if c.isupper() else ord('a')\n            r += chr((ord(c) - b + n) % 26 + b)\n        else:\n            r += c\n    return r\nprint(cesar("Hola Mundo", 3))`,
  },
  {
    id:"cq3", icono:"🌐", titulo:"Analizador de Headers HTTP",
    dificultad:"Medio", xp:100, lenguaje:"Python",
    descripcion:"Haz un GET a una URL y muestra todos los headers de seguridad que contiene la respuesta (X-Frame-Options, CSP, HSTS, etc.).",
    pistas:["Usa el módulo requests", "response.headers es un dict", "Filtra por nombres que incluyan 'security', 'x-', 'strict'"],
    solucion:`import requests\ndef analizar(url):\n    r = requests.get(url, timeout=5)\n    seg = ["content-security-policy","strict-transport-security",\n           "x-frame-options","x-content-type-options","x-xss-protection"]\n    for h in seg:\n        val = r.headers.get(h, "❌ No encontrado")\n        print(f"{h}: {val}")\nanalizar("https://example.com")`,
  },
  {
    id:"cq4", icono:"💾", titulo:"Generador de Hashes",
    dificultad:"Fácil", xp:70, lenguaje:"Python",
    descripcion:"Dado un texto, genera su hash en MD5, SHA-1 y SHA-256 e imprímelos.",
    pistas:["Usa hashlib", "Necesitas .encode() antes de hashear", "hashlib.md5(), hashlib.sha1(), hashlib.sha256()"],
    solucion:`import hashlib\ndef hashes(txt):\n    b = txt.encode()\n    print("MD5:   ", hashlib.md5(b).hexdigest())\n    print("SHA1:  ", hashlib.sha1(b).hexdigest())\n    print("SHA256:", hashlib.sha256(b).hexdigest())\nhashes("hackforge")`,
  },
  {
    id:"cq5", icono:"🛡️", titulo:"Detector de SQL Injection",
    dificultad:"Medio", xp:120, lenguaje:"Python",
    descripcion:"Escribe una función que reciba un string y detecte si contiene patrones típicos de SQL Injection.",
    pistas:["Busca palabras clave: OR, UNION, SELECT, DROP", "Las comillas simples son sospechosas", "Usa expresiones regulares o comparaciones simples"],
    solucion:`import re\ndef detectar_sqli(inp):\n    patrones = [r"(\\bOR\\b|\\bUNION\\b|\\bSELECT\\b|\\bDROP\\b)",\n                r"['\"]\\s*(--|#|/\\*)", r"1\\s*=\\s*1"]\n    for p in patrones:\n        if re.search(p, inp, re.IGNORECASE):\n            return "⚠️ Posible SQLi detectado"\n    return "✅ Input limpio"\nprint(detectar_sqli("' OR 1=1 --"))`,
  },
];

/* ─── COMPONENTE: SIDEBAR ────────────────────────────────────── */
function Sidebar({ nav, setNav, plan, xp, sidebarOpen, setSidebarOpen }) {
  const items = [
    { id:"dash",  icon:"⬡",  label:"Base Ops"         },
    { id:"mods",  icon:"🗺️", label:"Ruta Ciber"        },
    { id:"cq",    icon:"🎮", label:"CodeQuest"         },
    { id:"ccna",  icon:"📡", label:"CCNA Prep"         },
  ];
  const go = (id) => { setNav(id); setSidebarOpen(false); };
  return (
    <>
      {/* Overlay móvil */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position:"fixed", inset:0, background:"rgba(0,0,0,0.6)",
            zIndex:99, display:"none",
          }}
          className="mob-overlay"
        />
      )}
      <nav style={{
        width:220, minHeight:"100vh", background:C.panel,
        borderRight:`1px solid ${C.border}`, display:"flex",
        flexDirection:"column", padding:"24px 0", position:"fixed",
        top:0, left:0, zIndex:100,
        transition:"transform 0.28s ease",
      }} className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* Logo */}
        <div style={{ padding:"0 20px 24px", borderBottom:`1px solid ${C.border}` }}>
          <div style={{ color:C.cyan, fontFamily:"'Orbitron',sans-serif",
            fontSize:15, fontWeight:700, letterSpacing:3 }}>HACK<span style={{color:"#fff"}}>FORGE</span></div>
          <div style={{ color:C.muted, fontSize:10, marginTop:4, letterSpacing:2 }}>
            {plan === "pro" ? "⚡ PRO" : "FREE"} · {xp} XP
          </div>
        </div>
        {/* Nav items */}
        <div style={{ flex:1, paddingTop:16 }}>
          {items.map(it => (
            <button key={it.id} onClick={() => go(it.id)} style={{
              display:"flex", alignItems:"center", gap:12,
              width:"100%", padding:"11px 20px", background:"none", border:"none",
              cursor:"pointer", color: nav===it.id ? C.cyan : C.text,
              borderLeft: nav===it.id ? `3px solid ${C.cyan}` : "3px solid transparent",
              fontSize:13, textAlign:"left", transition:"all 0.15s",
            }}>
              <span style={{fontSize:16}}>{it.icon}</span>
              <span style={{fontFamily:"'Share Tech Mono',monospace"}}>{it.label}</span>
            </button>
          ))}
        </div>
        {/* Footer */}
        <div style={{ padding:"16px 20px", borderTop:`1px solid ${C.border}`,
          color:C.muted, fontSize:10, fontFamily:"monospace" }}>
          v1.0 · HACKFORGE LATAM
        </div>
      </nav>
      {/* Estilos responsive inline */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Share+Tech+Mono&display=swap');
        .sidebar { transform: translateX(0); }
        .mob-overlay { display: none !important; }
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.sidebar-open { transform: translateX(0) !important; }
          .mob-overlay { display: block !important; }
        }
      `}</style>
    </>
  );
}

/* ─── COMPONENTE: HEADER MÓVIL ───────────────────────────────── */
function MobileHeader({ sidebarOpen, setSidebarOpen }) {
  return (
    <div style={{
      display:"none", position:"fixed", top:0, left:0, right:0, zIndex:98,
      background:C.panel, borderBottom:`1px solid ${C.border}`,
      padding:"12px 16px", alignItems:"center", gap:12,
    }} className="mob-header">
      <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
        background:"none", border:`1px solid ${C.border}`, color:C.cyan,
        borderRadius:6, padding:"6px 10px", cursor:"pointer", fontSize:18,
      }}>☰</button>
      <span style={{ color:C.cyan, fontFamily:"'Orbitron',sans-serif",
        fontSize:13, fontWeight:700, letterSpacing:3 }}>
        HACK<span style={{color:"#fff"}}>FORGE</span>
      </span>
      <style>{`
        @media (max-width: 768px) { .mob-header { display: flex !important; } }
      `}</style>
    </div>
  );
}

/* ─── COMPONENTE: DASHBOARD ──────────────────────────────────── */
function Dashboard({ xp, plan, modulos, progreso }) {
  const totalLec = modulos.reduce((a,m) => a + m.lecciones.length, 0);
  const completadas = Object.values(progreso).filter(Boolean).length;
  const stats = [
    { label:"XP Total", val: xp },
    { label:"Lecciones", val: `${completadas}/${totalLec}` },
    { label:"Plan", val: plan === "pro" ? "PRO ⚡" : "FREE" },
    { label:"Racha", val: "3 días 🔥" },
  ];
  return (
    <div>
      <div style={{ color:C.cyan, fontSize:10, letterSpacing:4,
        fontFamily:"monospace", marginBottom:8 }}>HACKFORGE // BASE DE OPERACIONES</div>
      <h1 style={{ color:"#fff", fontSize:22, marginBottom:24,
        fontFamily:"'Orbitron',sans-serif" }}>Base de Operaciones</h1>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",
        gap:12, marginBottom:28 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:C.panel, border:`1px solid ${C.border}`,
            borderRadius:8, padding:"16px", textAlign:"center" }}>
            <div style={{ color:C.cyan, fontSize:20, fontFamily:"'Orbitron',sans-serif",
              fontWeight:700 }}>{s.val}</div>
            <div style={{ color:C.muted, fontSize:11, marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* Módulos rápidos */}
      <div style={{ color:C.muted, fontSize:11, letterSpacing:2,
        marginBottom:12, fontFamily:"monospace" }}>MÓDULOS DISPONIBLES</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12 }}>
        {modulos.map(m => (
          <div key={m.id} style={{
            background:C.panel, border:`1px solid ${m.bloqueado ? C.border : C.cyan+"33"}`,
            borderRadius:8, padding:"16px", opacity: m.bloqueado ? 0.5 : 1,
          }}>
            <div style={{ fontSize:24, marginBottom:8 }}>{m.icon}</div>
            <div style={{ color:"#fff", fontSize:13, fontWeight:600 }}>{m.titulo}</div>
            <div style={{ color:C.muted, fontSize:11, marginTop:4 }}>
              {m.bloqueado ? "🔒 Bloqueado" : `${m.lecciones.length} lecciones`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── COMPONENTE: MÓDULOS / RUTA ─────────────────────────────── */
function Modulos({ modulos, progreso, onCompletar }) {
  const [activo, setActivo] = useState(null);
  return (
    <div>
      <div style={{ color:C.cyan, fontSize:10, letterSpacing:4,
        fontFamily:"monospace", marginBottom:8 }}>HACKFORGE // RUTA CIBERSEGURIDAD</div>
      <h2 style={{ color:"#fff", fontSize:20, marginBottom:20,
        fontFamily:"'Orbitron',sans-serif" }}>Ruta Ciberseguridad</h2>
      {modulos.map(m => (
        <div key={m.id} style={{ marginBottom:16 }}>
          <div style={{ background:C.panel, border:`1px solid ${C.border}`,
            borderRadius:8, padding:"16px", opacity: m.bloqueado ? 0.5 : 1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <span style={{fontSize:24}}>{m.icon}</span>
              <div>
                <div style={{ color:"#fff", fontWeight:600 }}>{m.titulo}</div>
                <div style={{ color:C.muted, fontSize:11 }}>
                  {m.bloqueado ? "🔒 Completa el módulo anterior" :
                    `${m.lecciones.filter(l => progreso[l.id]).length}/${m.lecciones.length} completadas`}
                </div>
              </div>
            </div>
            {!m.bloqueado && m.lecciones.map(l => (
              <div key={l.id} onClick={() => !progreso[l.id] && onCompletar(l.id, l.xp)}
                style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"8px 12px", borderRadius:6, marginBottom:6, cursor:"pointer",
                  background: progreso[l.id] ? `${C.green}11` : `${C.cyan}08`,
                  border:`1px solid ${progreso[l.id] ? C.green+"33" : C.border}`,
                }}>
                <span style={{ color: progreso[l.id] ? C.green : C.text, fontSize:13 }}>
                  {progreso[l.id] ? "✓" : "○"} {l.titulo}
                </span>
                <span style={{ color:C.muted, fontSize:11 }}>+{l.xp} XP</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── COMPONENTE: CODEQUEST ──────────────────────────────────── */
function CodeQuest({ misiones, progresoMisiones, onCompletar }) {
  const [seleccionada, setSeleccionada] = useState(null);
  const [mostrarSol, setMostrarSol] = useState(false);
  const [mostrarPistas, setMostrarPistas] = useState(false);

  if (seleccionada) {
    const m = misiones.find(x => x.id === seleccionada);
    const completada = progresoMisiones[m.id];
    return (
      <div>
        <button onClick={() => { setSeleccionada(null); setMostrarSol(false); setMostrarPistas(false); }}
          style={{ background:"none", border:`1px solid ${C.border}`, color:C.cyan,
            borderRadius:6, padding:"6px 14px", cursor:"pointer", fontSize:12, marginBottom:20 }}>
          ← Volver
        </button>
        <div style={{ color:C.cyan, fontSize:10, letterSpacing:4, fontFamily:"monospace",
          marginBottom:8 }}>CODEQUEST // {m.lenguaje}</div>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
          <span style={{fontSize:32}}>{m.icono}</span>
          <div>
            <h2 style={{ color:"#fff", fontSize:18, fontFamily:"'Orbitron',sans-serif" }}>{m.titulo}</h2>
            <div style={{ display:"flex", gap:8, marginTop:4 }}>
              <span style={{ background:`${C.cyan}22`, color:C.cyan, fontSize:11,
                padding:"2px 8px", borderRadius:4 }}>{m.dificultad}</span>
              <span style={{ background:`${C.green}22`, color:C.green, fontSize:11,
                padding:"2px 8px", borderRadius:4 }}>+{m.xp} XP</span>
            </div>
          </div>
        </div>
        <div style={{ background:C.panel, border:`1px solid ${C.border}`,
          borderRadius:8, padding:20, marginBottom:16 }}>
          <div style={{ color:C.muted, fontSize:11, marginBottom:8, fontFamily:"monospace",
            letterSpacing:2 }}>MISIÓN</div>
          <p style={{ color:C.text, fontSize:14, lineHeight:1.7 }}>{m.descripcion}</p>
        </div>
        {/* Pistas */}
        <button onClick={() => setMostrarPistas(!mostrarPistas)}
          style={{ background:mostrarPistas ? `${C.cyan}22` : "none",
            border:`1px solid ${C.cyan}44`, color:C.cyan,
            borderRadius:6, padding:"8px 16px", cursor:"pointer",
            fontSize:12, marginBottom:12, width:"100%" }}>
          💡 {mostrarPistas ? "Ocultar pistas" : "Ver pistas"}
        </button>
        {mostrarPistas && (
          <div style={{ background:C.panel, border:`1px solid ${C.cyan}33`,
            borderRadius:8, padding:16, marginBottom:12 }}>
            {m.pistas.map((p,i) => (
              <div key={i} style={{ color:C.text, fontSize:13, padding:"6px 0",
                borderBottom: i < m.pistas.length-1 ? `1px solid ${C.border}` : "none" }}>
                <span style={{color:C.cyan}}>▸</span> {p}
              </div>
            ))}
          </div>
        )}
        {/* Solución */}
        <button onClick={() => setMostrarSol(!mostrarSol)}
          style={{ background:mostrarSol ? `${C.red}22` : "none",
            border:`1px solid ${C.red}44`, color:C.red,
            borderRadius:6, padding:"8px 16px", cursor:"pointer",
            fontSize:12, marginBottom:12, width:"100%" }}>
          👁 {mostrarSol ? "Ocultar solución" : "Ver solución (spoiler)"}
        </button>
        {mostrarSol && (
          <div style={{ background:"#010810", border:`1px solid ${C.border}`,
            borderRadius:8, padding:16, marginBottom:16 }}>
            <div style={{ display:"flex", gap:6, marginBottom:12 }}>
              {["#ff5f57","#ffbd2e","#28c940"].map(col => (
                <div key={col} style={{ width:10, height:10, borderRadius:"50%", background:col }}/>
              ))}
            </div>
            <pre style={{ color:C.green, fontFamily:"'Share Tech Mono',monospace",
              fontSize:12, margin:0, whiteSpace:"pre-wrap", lineHeight:1.7 }}>
              {m.solucion}
            </pre>
          </div>
        )}
        {!completada && (
          <button onClick={() => onCompletar(m.id, m.xp)}
            style={{ background:C.cyan, color:"#000", border:"none",
              borderRadius:8, padding:"12px 24px", cursor:"pointer",
              fontWeight:700, fontSize:14, width:"100%" }}>
            ✓ Marcar como completada (+{m.xp} XP)
          </button>
        )}
        {completada && (
          <div style={{ background:`${C.green}22`, border:`1px solid ${C.green}44`,
            borderRadius:8, padding:"12px 24px", textAlign:"center",
            color:C.green, fontSize:14, fontWeight:600 }}>
            ✅ ¡Misión completada!
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ color:C.cyan, fontSize:10, letterSpacing:4,
        fontFamily:"monospace", marginBottom:8 }}>HACKFORGE // CODEQUEST</div>
      <h2 style={{ color:"#fff", fontSize:20, fontFamily:"'Orbitron',sans-serif",
        marginBottom:8 }}>CodeQuest</h2>
      <p style={{ color:C.muted, fontSize:13, marginBottom:24 }}>
        Misiones de código con enfoque en ciberseguridad. Cada misión sube tu XP y habilidad real.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14 }}>
        {misiones.map(m => {
          const comp = progresoMisiones[m.id];
          return (
            <div key={m.id} onClick={() => setSeleccionada(m.id)}
              style={{ background:C.panel, border:`1px solid ${comp ? C.green+"44" : C.border}`,
                borderRadius:10, padding:18, cursor:"pointer", transition:"border-color 0.2s",
              }}>
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"flex-start", marginBottom:10 }}>
                <span style={{fontSize:28}}>{m.icono}</span>
                {comp && <span style={{color:C.green, fontSize:18}}>✅</span>}
              </div>
              <div style={{ color:"#fff", fontWeight:600, fontSize:14, marginBottom:6 }}>
                {m.titulo}
              </div>
              <div style={{ color:C.muted, fontSize:12, marginBottom:10, lineHeight:1.5 }}>
                {m.descripcion.slice(0,80)}...
              </div>
              <div style={{ display:"flex", gap:6 }}>
                <span style={{ background:`${C.cyan}22`, color:C.cyan,
                  fontSize:11, padding:"2px 8px", borderRadius:4 }}>{m.dificultad}</span>
                <span style={{ background:`${C.green}22`, color:C.green,
                  fontSize:11, padding:"2px 8px", borderRadius:4 }}>+{m.xp} XP</span>
                <span style={{ background:`${C.border}`, color:C.muted,
                  fontSize:11, padding:"2px 8px", borderRadius:4 }}>{m.lenguaje}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── APP PRINCIPAL ──────────────────────────────────────────── */
export default function App() {
  const [logueado, setLogueado] = useState(false);
  const [usuario,  setUsuario]  = useState("");
  const [plan,     setPlan]     = useState("free");
  const [inputU,   setInputU]   = useState("");
  const [inputP,   setInputP]   = useState("");
  const [nav,      setNav]      = useState("dash");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // XP y progreso
  const [xp, setXp] = useState(0);
  const [progresoLec, setProgresoLec] = useState({});
  const [progresoMisiones, setProgresoMisiones] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("hf_user");
    if (saved) {
      const d = JSON.parse(saved);
      setLogueado(true);
      setUsuario(d.usuario);
      setPlan(d.plan || "free");
      setXp(d.xp || 0);
      setProgresoLec(d.progresoLec || {});
      setProgresoMisiones(d.progresoMisiones || {});
    }
  }, []);

  const guardar = (data) => localStorage.setItem("hf_user", JSON.stringify(data));

  const login = () => {
    if (!inputU || !inputP) return;
    const data = { usuario: inputU, plan, xp:0, progresoLec:{}, progresoMisiones:{} };
    guardar(data);
    setUsuario(inputU); setXp(0); setProgresoLec({}); setProgresoMisiones({});
    setLogueado(true);
  };

  const completarLeccion = (id, pts) => {
    if (progresoLec[id]) return;
    const nl = { ...progresoLec, [id]: true };
    const nx = xp + pts;
    setProgresoLec(nl); setXp(nx);
    guardar({ usuario, plan, xp: nx, progresoLec: nl, progresoMisiones });
  };

  const completarMision = (id, pts) => {
    if (progresoMisiones[id]) return;
    const nm = { ...progresoMisiones, [id]: true };
    const nx = xp + pts;
    setProgresoMisiones(nm); setXp(nx);
    guardar({ usuario, plan, xp: nx, progresoLec, progresoMisiones: nm });
  };

  /* ─ PANTALLA LOGIN ─ */
  if (!logueado) return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex",
      alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:C.panel, border:`1px solid ${C.border}`,
        borderRadius:12, padding:"36px 32px", width:"100%", maxWidth:380 }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ color:C.cyan, fontFamily:"'Orbitron',sans-serif",
            fontSize:22, fontWeight:700, letterSpacing:4 }}>
            HACK<span style={{color:"#fff"}}>FORGE</span>
          </div>
          <div style={{ color:C.muted, fontSize:12, marginTop:6, letterSpacing:2 }}>
            PLATAFORMA CIBER · LATAM
          </div>
        </div>
        {[
          { label:"Usuario", val:inputU, set:setInputU, type:"text" },
          { label:"Contraseña", val:inputP, set:setInputP, type:"password" },
        ].map(f => (
          <div key={f.label} style={{ marginBottom:14 }}>
            <div style={{ color:C.muted, fontSize:11, marginBottom:6,
              fontFamily:"monospace" }}>{f.label}</div>
            <input type={f.type} value={f.val}
              onChange={e => f.set(e.target.value)}
              style={{ width:"100%", background:C.bg, border:`1px solid ${C.border}`,
                borderRadius:6, padding:"10px 12px", color:"#fff",
                fontSize:13, outline:"none", boxSizing:"border-box",
                fontFamily:"'Share Tech Mono',monospace" }}/>
          </div>
        ))}
        <div style={{ marginBottom:20 }}>
          <div style={{ color:C.muted, fontSize:11, marginBottom:8,
            fontFamily:"monospace" }}>Plan</div>
          <div style={{ display:"flex", gap:8 }}>
            {["free","pro"].map(p => (
              <button key={p} onClick={() => setPlan(p)} style={{
                flex:1, padding:"9px", borderRadius:6, cursor:"pointer",
                background: plan===p ? C.cyan : "none",
                border: `1px solid ${plan===p ? C.cyan : C.border}`,
                color: plan===p ? "#000" : C.text,
                fontWeight: plan===p ? 700 : 400, fontSize:13,
              }}>
                {p === "pro" ? "⚡ PRO" : "FREE"}
              </button>
            ))}
          </div>
        </div>
        <button onClick={login} style={{
          width:"100%", background:C.cyan, color:"#000", border:"none",
          borderRadius:8, padding:"12px", cursor:"pointer",
          fontWeight:700, fontSize:14, fontFamily:"'Orbitron',sans-serif",
          letterSpacing:2,
        }}>ENTRAR</button>
      </div>
    </div>
  );

  /* ─ PANTALLA PRINCIPAL ─ */
  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text }}>
      <MobileHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar nav={nav} setNav={setNav} plan={plan} xp={xp}
        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main style={{ marginLeft:220, padding:"32px 28px", minHeight:"100vh" }}
        className="main-content">
        <style>{`
          @media (max-width: 768px) {
            .main-content { margin-left: 0 !important; padding: 80px 16px 24px !important; }
          }
        `}</style>

        {nav === "dash" && (
          <Dashboard xp={xp} plan={plan} modulos={MODULOS} progreso={progresoLec} />
        )}
        {nav === "mods" && (
          <Modulos modulos={MODULOS} progreso={progresoLec} onCompletar={completarLeccion} />
        )}
        {nav === "cq" && (
          <CodeQuest misiones={CQ_MISIONES} progresoMisiones={progresoMisiones}
            onCompletar={completarMision} />
        )}
        {nav === "ccna" && (
          <div style={{ textAlign:"center", paddingTop:60 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>📡</div>
            <div style={{ color:C.cyan, fontSize:11, letterSpacing:4,
              marginBottom:8, fontFamily:"monospace" }}>HACKFORGE // CCNA PREP</div>
            <h2 style={{ color:"#fff", fontSize:20, marginBottom:12,
              fontFamily:"'Orbitron',sans-serif" }}>CCNA Prep Zone</h2>
            <p style={{ color:C.muted, fontSize:13, maxWidth:400, margin:"0 auto 24px" }}>
              Próximamente: Preguntas CCNA 200-301, simulador Packet Tracer y flashcards.
            </p>
            <div style={{ display:"inline-block", background:`${C.cyan}11`,
              border:`1px solid ${C.cyan}33`, borderRadius:8,
              padding:"12px 24px", color:C.cyan, fontSize:12 }}>🚧 En desarrollo</div>
          </div>
        )}
      </main>
    </div>
  );
}
