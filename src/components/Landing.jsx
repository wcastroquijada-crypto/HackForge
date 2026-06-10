import { useState, useEffect } from "react";

const FEATURES = [
  { icon:"⚗️", titulo:"Labs CTF", desc:"28 retos de hacking 100% en el navegador. Sin VMs, desde cualquier dispositivo.", color:"#00ff41", tag:"28 retos" },
  { icon:"💻", titulo:"Terminal HQ", desc:"Simulador Linux interactivo con comandos reales, CTF labs y lecciones guiadas.", color:"#00d4ff", tag:"Interactivo" },
  { icon:"🛠️", titulo:"Herramientas", desc:"Cheatsheet de todas las herramientas + Asistente IA para resolver CTFs.", color:"#a78bfa", tag:"IA incluida" },
  { icon:"📡", titulo:"CCNA Prep", desc:"Teoría, banco de preguntas, flashcards y simulacro de examen. ES/EN.", color:"#ffd700", tag:"ES / EN" },
  { icon:"📚", titulo:"Módulos", desc:"Contenido de ciberseguridad organizado en módulos desde fundamentos hasta Red Team.", color:"#f97316", tag:"Progresivo" },
  { icon:"🎯", titulo:"Progreso real", desc:"XP, rachas, badges y ranking. Tu avance guardado y visible en el Dashboard.", color:"#ec4899", tag:"Gamificado" },
];

const STATS = [
  { val:"28+", label:"Retos CTF" },
  { val:"10", label:"Lecciones Terminal" },
  { val:"60+", label:"Preguntas CCNA" },
  { val:"100%", label:"Sin VMs" },
];

export default function Landing({ onEntrar }) {
  const [typed, setTyped] = useState("");
  const texto = "Aprende hacking. Practica en real. Conviértete en Purple Team.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(texto.slice(0, i));
      i++;
      if (i > texto.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:"#07090f", color:"#c9d1d9", fontFamily:"'Inter',sans-serif", overflowX:"hidden" }}>

      {/* NAV */}
      <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 32px", borderBottom:"1px solid #1e2a3a", position:"sticky", top:0, background:"#07090fee", backdropFilter:"blur(10px)", zIndex:100 }}>
        <div style={{ color:"#00d4ff", fontSize:13, letterSpacing:4, fontWeight:700 }}>◈ HACKFORGE</div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onEntrar} style={{ background:"transparent", border:"1px solid #1e2a3a", color:"#8b949e", borderRadius:6, padding:"8px 16px", fontSize:12, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>
            Iniciar sesión
          </button>
          <button onClick={onEntrar} style={{ background:"#00d4ff", border:"none", color:"#000", borderRadius:6, padding:"8px 16px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>
            Empezar gratis →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth:900, margin:"0 auto", padding:"80px 32px 60px", textAlign:"center" }}>
        <div style={{ display:"inline-block", background:"#00d4ff11", border:"1px solid #00d4ff33", borderRadius:20, padding:"4px 14px", fontSize:11, color:"#00d4ff", letterSpacing:2, marginBottom:24 }}>
          🚀 PLATAFORMA DE CIBERSEGURIDAD EN ESPAÑOL
        </div>
        <h1 style={{ fontSize:"clamp(28px,5vw,52px)", fontWeight:900, color:"#fff", lineHeight:1.15, marginBottom:20 }}>
          Tu camino hacia el{" "}
          <span style={{ color:"#00d4ff", display:"inline-block" }}>Purple Team</span>
          {" "}empieza aquí
        </h1>
        <p style={{ fontSize:16, color:"#8b949e", maxWidth:600, margin:"0 auto 32px", lineHeight:1.7, minHeight:48 }}>
          {typed}<span style={{ animation:"blink 1s infinite", color:"#00d4ff" }}>|</span>
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={onEntrar} style={{ background:"#00d4ff", border:"none", color:"#000", borderRadius:8, padding:"14px 28px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>
            Empezar gratis →
          </button>
          <button onClick={onEntrar} style={{ background:"transparent", border:"1px solid #1e2a3a", color:"#c9d1d9", borderRadius:8, padding:"14px 28px", fontSize:14, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>
            Ver demo
          </button>
        </div>

        {/* Stats */}
        <div style={{ display:"flex", gap:0, justifyContent:"center", marginTop:48, flexWrap:"wrap", borderTop:"1px solid #1e2a3a", paddingTop:32 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding:"0 28px", borderRight:i<STATS.length-1?"1px solid #1e2a3a":"none", textAlign:"center" }}>
              <div style={{ color:"#00d4ff", fontSize:24, fontWeight:900 }}>{s.val}</div>
              <div style={{ color:"#555", fontSize:11, marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TERMINAL DEMO */}
      <div style={{ maxWidth:700, margin:"0 auto 60px", padding:"0 32px" }}>
        <div style={{ background:"#0d1117", border:"1px solid #00ff4133", borderRadius:10, overflow:"hidden", boxShadow:"0 0 40px #00ff4108" }}>
          <div style={{ background:"#040c18", padding:"10px 16px", borderBottom:"1px solid #1e2a3a", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ display:"flex", gap:6 }}>
              {["#ff5f57","#ffbd2e","#28ca41"].map((c,i) => <div key={i} style={{ width:11, height:11, borderRadius:"50%", background:c }}/>)}
            </div>
            <span style={{ color:"#555", fontSize:11 }}>waldo@hackforge:~$</span>
            <span style={{ color:"#555", fontSize:10 }}>bash</span>
          </div>
          <div style={{ padding:20, fontFamily:"'JetBrains Mono',monospace", fontSize:12, lineHeight:1.8 }}>
            {[
              { prompt:"waldo@hackforge:~$", cmd:" nmap -sC -sV 10.10.10.50", color:"#00ff41" },
              { out:"PORT   STATE SERVICE VERSION", color:"#4a5568" },
              { out:"22/tcp open  ssh     OpenSSH 7.6p1", color:"#00d4ff" },
              { out:"80/tcp open  http    Apache httpd 2.4.29", color:"#00d4ff" },
              { prompt:"waldo@hackforge:~$", cmd:" sudo -l", color:"#00ff41" },
              { out:"(ALL) NOPASSWD: /usr/bin/find", color:"#ffd700" },
              { prompt:"waldo@hackforge:~$", cmd:" sudo find . -exec /bin/sh -p \\; -quit", color:"#00ff41" },
              { out:"# whoami", color:"#4a5568" },
              { out:"root", color:"#ff4757" },
              { out:"# cat /root/root.txt", color:"#4a5568" },
              { out:"THM{r00t_0wn3d_c0ngr4ts!}", color:"#00ff41" },
            ].map((l, i) => (
              <div key={i}>
                {l.prompt && <span style={{ color:l.color }}>{l.prompt}</span>}
                {l.cmd && <span style={{ color:"#fff" }}>{l.cmd}</span>}
                {l.out && <div style={{ color:l.color }}>{l.out}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth:900, margin:"0 auto 80px", padding:"0 32px" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ color:"#00d4ff", fontSize:11, letterSpacing:4, marginBottom:8 }}>MÓDULOS</div>
          <h2 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:0 }}>Todo lo que necesitas para aprender hacking</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{ background:"#0d1117", border:`1px solid ${f.color}22`, borderRadius:10, padding:22, transition:"all 0.2s", cursor:"default" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=f.color+"55"; e.currentTarget.style.background="#0a1628"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=f.color+"22"; e.currentTarget.style.background="#0d1117"; }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                <span style={{ fontSize:28 }}>{f.icon}</span>
                <span style={{ background:f.color+"22", border:`1px solid ${f.color}44`, color:f.color, borderRadius:20, padding:"2px 8px", fontSize:10, fontWeight:700 }}>{f.tag}</span>
              </div>
              <h3 style={{ color:"#fff", fontSize:15, fontWeight:700, marginBottom:6 }}>{f.titulo}</h3>
              <p style={{ color:"#555", fontSize:12, lineHeight:1.6, margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background:"linear-gradient(135deg, #0d1f35 0%, #07090f 100%)", borderTop:"1px solid #1e2a3a", borderBottom:"1px solid #1e2a3a", padding:"60px 32px", textAlign:"center", marginBottom:60 }}>
        <div style={{ maxWidth:600, margin:"0 auto" }}>
          <h2 style={{ color:"#fff", fontSize:28, fontWeight:800, marginBottom:12 }}>
            ¿Listo para hackear?
          </h2>
          <p style={{ color:"#555", fontSize:14, marginBottom:28, lineHeight:1.7 }}>
            Crea tu cuenta gratis y empieza hoy. Sin tarjeta de crédito, sin límites.
          </p>
          <button onClick={onEntrar} style={{ background:"#00d4ff", border:"none", color:"#000", borderRadius:8, padding:"16px 36px", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>
            Crear cuenta gratis →
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 32px 32px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ color:"#00d4ff", fontSize:12, letterSpacing:4 }}>◈ HACKFORGE</div>
        <div style={{ color:"#333", fontSize:11 }}>Plataforma de ciberseguridad en español para LATAM</div>
        <div style={{ color:"#333", fontSize:11 }}>© 2026 HACKFORGE</div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}
