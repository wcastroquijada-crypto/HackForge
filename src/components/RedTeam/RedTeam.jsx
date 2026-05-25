import { useState, useEffect } from "react";
import { C } from "../../data/labs";
import { REDTEAM_MODULOS } from "../../data/redteam.js";

const CSS = `
  .btn{cursor:pointer;border:none;font-family:'Inter',sans-serif;font-weight:bold;transition:all .15s;border-radius:5px}
  .btn:hover:not(:disabled){filter:brightness(1.15);transform:translateY(-1px)}
  .btn:disabled{opacity:.45;cursor:not-allowed}
  .opt{width:100%;text-align:left;padding:11px 15px;margin:5px 0;border-radius:5px;cursor:pointer;font-family:'Inter',sans-serif;font-size:13px;border:1px solid #1e2a3a;background:#0d1117;color:#8b949e;transition:all .13s}
  .opt:hover:not(:disabled){border-color:#2d3a4a;background:#111827;color:#c9d1d9}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  .fade-in{animation:fadeUp 0.4s ease forwards}
  .cursor::after{content:'▋';animation:blink 0.7s step-end infinite}
  @keyframes scanline{0%{top:-10%}100%{top:110%}}
  .terminal-line{font-family:'Courier New',monospace;color:#00ff88;font-size:12px;line-height:1.8}
  .code-block{background:#050810;border:1px solid #1e2a3a;border-radius:6px;padding:12px 16px;margin:8px 0;font-family:'Courier New',monospace;font-size:12px;color:#00d4ff;line-height:1.8}
`;

// Hook typing effect
function useTyping(text, speed = 35, skip = false) {
  const [displayed, setDisplayed] = useState(skip ? text : "");
  const [done, setDone] = useState(skip);
  useEffect(() => {
    if (skip) { setDisplayed(text); setDone(true); return; }
    setDisplayed(""); setDone(false);
    let i = 0;
    const iv = setInterval(() => {
      i++; setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, speed);
    return () => clearInterval(iv);
  }, [text, skip]);
  return { displayed, done };
}

export default function RedTeam({ progresoRT, onCompletarRT }) {
  const [vista, setVista]           = useState("mapa");   // mapa | modulo | leccion | slides | quiz
  const [modActivo, setModActivo]   = useState(null);
  const [lecActiva, setLecActiva]   = useState(null);
  const [slideIdx, setSlideIdx]     = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [enviado, setEnviado]       = useState(false);
  const [skip, setSkip]             = useState(false);

  useEffect(() => { setSkip(false); }, [slideIdx, vista]);

  const slide = lecActiva?.slides[slideIdx];
  const { displayed: titulo, done: tituloDone } = useTyping(slide?.titulo || "", 40, skip);

  const puntaje = () => {
    if (!lecActiva) return 0;
    let c = 0;
    lecActiva.quiz.forEach((q, i) => { if (respuestas[i] === q.c) c++; });
    return Math.round((c / lecActiva.quiz.length) * 100);
  };

  const abrirLeccion = (lec) => {
    setLecActiva(lec); setSlideIdx(0);
    setRespuestas({}); setEnviado(false);
    setVista("slides");
  };

  const completarLeccion = () => {
    if (onCompletarRT) onCompletarRT(modActivo.id, lecActiva.id, 80);
    setVista("modulo");
  };

  // ── MAPA PRINCIPAL ──────────────────────────────────────
  if (vista === "mapa") return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9" }} onClick={() => {}}>
      <style>{CSS}</style>

      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <div style={{ color:"#ff6b35", fontSize:11, letterSpacing:4, marginBottom:6 }}>◈ HACKFORGE // RED TEAM</div>
        <h2 style={{ color:"#fff", fontSize:22, margin:"0 0 6px" }}>Operaciones Red Team</h2>
        <p style={{ color:C.muted, fontSize:13, maxWidth:600 }}>
          Aprende como trabaja un pentester profesional — desde el primer día con un cliente hasta el informe final.
          Mismo proyecto, mismo cliente, mismas reglas de principio a fin.
        </p>
      </div>

      {/* Banner proyecto */}
      <div style={{ background:"#050810", border:"1px solid #ff6b3533", borderRadius:10, padding:20, marginBottom:24 }}>
        <div style={{ color:"#ff6b35", fontSize:10, letterSpacing:3, marginBottom:8 }}>PROYECTO ACTIVO</div>
        <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
          <div>
            <div style={{ color:C.muted, fontSize:10 }}>CLIENTE</div>
            <div style={{ color:"#fff", fontSize:14, fontWeight:"bold" }}>Lumina Athletics</div>
          </div>
          <div>
            <div style={{ color:C.muted, fontSize:10 }}>SCOPE</div>
            <div style={{ color:"#00d4ff", fontSize:12, fontFamily:"monospace" }}>6 objetivos</div>
          </div>
          <div>
            <div style={{ color:C.muted, fontSize:10 }}>PERIODO</div>
            <div style={{ color:"#fff", fontSize:12 }}>Lun–Vie 09:00–18:00</div>
          </div>
          <div>
            <div style={{ color:C.muted, fontSize:10 }}>RESTRICCIÓN</div>
            <div style={{ color:"#ff3b3b", fontSize:12 }}>No invasivo · No destructivo</div>
          </div>
        </div>
      </div>

      {/* Grid de módulos */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
        {REDTEAM_MODULOS.map((mod, idx) => {
          const totalLecs = mod.lecciones.length;
          const completadas = (progresoRT?.[mod.id]?.completadas) || 0;
          const porcentaje = Math.round((completadas / totalLecs) * 100);
          const disponible = idx === 0 || (progresoRT?.[REDTEAM_MODULOS[idx-1].id]?.completadas || 0) > 0;

          return (
            <div key={mod.id}
              className="fade-in"
              onClick={() => { if (disponible) { setModActivo(mod); setVista("modulo"); }}}
              style={{
                background:C.panel, border:`1px solid ${disponible ? C.border : C.border}`,
                borderRadius:10, padding:20,
                cursor: disponible ? "pointer" : "not-allowed",
                opacity: disponible ? 1 : 0.45,
                animationDelay:`${idx * 80}ms`,
                transition:"all .2s"
              }}
              onMouseEnter={e => disponible && (e.currentTarget.style.borderColor = mod.color+"66")}
              onMouseLeave={e => disponible && (e.currentTarget.style.borderColor = C.border)}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                <span style={{ fontSize:28 }}>{mod.icon}</span>
                <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                  <span style={{ background:`${mod.color}22`, color:mod.color, fontSize:9, padding:"2px 8px", borderRadius:3, border:`1px solid ${mod.color}44` }}>{mod.tag}</span>
                  {!disponible && <span style={{ color:C.muted, fontSize:12 }}>🔒</span>}
                </div>
              </div>
              <div style={{ color:"#fff", fontWeight:"bold", fontSize:15, marginBottom:4 }}>{mod.nombre}</div>
              <div style={{ color:C.muted, fontSize:12, marginBottom:12, lineHeight:1.5 }}>{mod.descripcion}</div>
              <div style={{ color:C.muted, fontSize:11, marginBottom:6 }}>{mod.lecciones.length} lecciones</div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:C.muted, marginBottom:6 }}>
                <span>{completadas}/{totalLecs} completadas</span>
                <span style={{ color:mod.color }}>{porcentaje}%</span>
              </div>
              <div style={{ height:3, background:C.border, borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${porcentaje}%`, background:mod.color, borderRadius:2, transition:"width 0.5s" }}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── LISTA DE LECCIONES ──────────────────────────────────
  if (vista === "modulo" && modActivo) return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9" }}>
      <style>{CSS}</style>
      <button className="btn" onClick={() => setVista("mapa")} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:20 }}>← Red Team</button>

      <div style={{ marginBottom:24 }}>
        <div style={{ color:modActivo.color, fontSize:11, letterSpacing:3, marginBottom:4 }}>MÓDULO · RED TEAM</div>
        <h2 style={{ color:"#fff", fontSize:22, margin:"0 0 6px" }}>{modActivo.icon} {modActivo.nombre}</h2>
        <p style={{ color:C.muted, fontSize:13 }}>{modActivo.descripcion}</p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {modActivo.lecciones.map((lec, i) => {
          const done = progresoRT?.[modActivo.id]?.leccionesId?.includes(lec.id);
          return (
            <div key={lec.id}
              className="fade-in"
              onClick={() => abrirLeccion(lec)}
              style={{ background:C.panel, border:`1px solid ${done ? modActivo.color+"44" : C.border}`, borderRadius:8, padding:18, cursor:"pointer", display:"flex", alignItems:"center", gap:16, animationDelay:`${i*60}ms`, transition:"all .15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = modActivo.color+"66"}
              onMouseLeave={e => e.currentTarget.style.borderColor = done ? modActivo.color+"44" : C.border}>
              <div style={{ width:36, height:36, borderRadius:"50%", background:done?`${modActivo.color}22`:C.bg, border:`1px solid ${done?modActivo.color:C.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:done?modActivo.color:C.muted, fontWeight:"bold", fontSize:14 }}>
                {done ? "✓" : i+1}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ color:"#fff", fontWeight:"600", fontSize:14 }}>{lec.titulo}</div>
                <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>{lec.slides.length} slides · {lec.quiz.length} preguntas</div>
              </div>
              <div style={{ color:C.muted, fontSize:12 }}>→</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── SLIDES ──────────────────────────────────────────────
  if (vista === "slides" && lecActiva && slide) return (
    <div onClick={() => { if (!skip) setSkip(true); }}
      style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9", maxWidth:740, margin:"0 auto" }}>
      <style>{CSS}</style>

      {!skip && <div style={{ position:"fixed", bottom:18, right:18, background:C.panel, border:`1px solid ${C.border}`, color:C.muted, fontSize:10, padding:"6px 12px", borderRadius:20, pointerEvents:"none", zIndex:999, letterSpacing:1 }}>TOCA PARA SALTAR →</div>}

      <div onClick={e => e.stopPropagation()}>
        <button className="btn" onClick={() => setVista("modulo")} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:20 }}>← Lecciones</button>

        {/* Header slide */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div>
            <div style={{ color:modActivo.color, fontSize:10, letterSpacing:3 }}>{slide.tag} · {slideIdx+1}/{lecActiva.slides.length}</div>
            <h3 className={tituloDone||skip?"":"cursor"} style={{ color:modActivo.color, fontSize:19, margin:"6px 0 0", minHeight:28 }}>{titulo}</h3>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {lecActiva.slides.map((_, i) => (
              <div key={i} onClick={() => setSlideIdx(i)}
                style={{ width:9, height:9, borderRadius:"50%", cursor:"pointer", background: i===slideIdx ? modActivo.color : i<slideIdx ? `${modActivo.color}55` : C.border }}/>
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="fade-in" key={`slide-${slideIdx}`}
          style={{ background:C.panel, border:`1px solid ${modActivo.color}33`, borderRadius:10, padding:28, marginBottom:20, opacity:0, animationDelay:skip?"0ms":"150ms" }}>
          <div style={{ borderLeft:`3px solid ${modActivo.color}`, paddingLeft:20 }}>
            {slide.contenido.split("\n").map((line, i) => {
              if (line === "") return <br key={i}/>;
              const isCmd = /^(nmap|curl|nc |dig |ssh |find |cat |sudo |python|msfvenom|feroxbuster|ffuf|subfinder|amass|whois|gobuster|hashcat|john|hydra|sqlmap|linpeas|winpeas|impacket|netstat|ss |ping|traceroute|wget|bash |id$|uname|hostname|whoami|echo|export|stty)/.test(line.trim());
              const isBullet = /^(—|→|✓|✗|🔴|🟡|🟢|📌|⚠️|💀|✅)/.test(line.trim());
              return (
                <p key={i} style={{
                  margin:"4px 0",
                  fontFamily: isCmd ? "'Courier New',monospace" : "'Inter',sans-serif",
                  background: isCmd ? "#050810" : "transparent",
                  color: isCmd ? modActivo.color : isBullet ? "#c9d1d9" : "#8b949e",
                  padding: isCmd ? "3px 10px" : "0",
                  borderRadius: isCmd ? 4 : 0,
                  fontSize: isCmd ? 12 : 13,
                  lineHeight: 1.85,
                }}>
                  {line}
                </p>
              );
            })}
          </div>
        </div>

        {/* Nav */}
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <button className="btn" onClick={() => setSlideIdx(p => Math.max(0,p-1))} disabled={slideIdx===0}
            style={{ background:C.dim, color:C.muted, padding:"10px 20px", fontSize:13 }}>← Anterior</button>
          {slideIdx < lecActiva.slides.length-1
            ? <button className="btn" onClick={() => setSlideIdx(p => p+1)} style={{ background:modActivo.color, color:"#000", padding:"10px 20px", fontSize:13 }}>Siguiente →</button>
            : <button className="btn" onClick={() => setVista("quiz")} style={{ background:modActivo.color, color:"#000", padding:"10px 20px", fontSize:13 }}>Ir al Quiz →</button>
          }
        </div>
      </div>
    </div>
  );

  // ── QUIZ ────────────────────────────────────────────────
  if (vista === "quiz" && lecActiva) return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9", maxWidth:740, margin:"0 auto" }}>
      <style>{CSS}</style>
      <button className="btn" onClick={() => setVista("slides")} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:20 }}>← Volver a slides</button>

      <div style={{ marginBottom:20 }}>
        <div style={{ color:modActivo.color, fontSize:10, letterSpacing:3 }}>EVALUACIÓN · {lecActiva.titulo}</div>
        <h3 style={{ color:"#fff", fontSize:19, margin:"6px 0 4px" }}>Quiz de Conocimiento</h3>
        <p style={{ color:C.muted, fontSize:12 }}>{lecActiva.quiz.length} preguntas · Mínimo 70% para completar</p>
      </div>

      {lecActiva.quiz.map((q, qi) => (
        <div key={qi} className="fade-in"
          style={{ background:C.panel, border:`1px solid ${enviado ? (respuestas[qi]===q.c?"#00ff8833":"#ff3b3b33") : C.border}`, borderRadius:8, padding:18, marginBottom:12, opacity:0, animationDelay:`${qi*50}ms` }}>
          <div style={{ color:C.muted, fontSize:10, marginBottom:6 }}>P{qi+1}/{lecActiva.quiz.length}</div>
          <div style={{ color:"#fff", fontSize:14, fontWeight:"600", marginBottom:12, lineHeight:1.5 }}>{q.q}</div>
          {q.opts.map((opt, oi) => {
            let bg=C.panel, border=C.border, color="#8b949e";
            if (respuestas[qi]===oi) { border=modActivo.color; color="#fff"; }
            if (enviado) {
              if (oi===q.c) { bg="#002200"; border=C.green; color=C.green; }
              else if (respuestas[qi]===oi && oi!==q.c) { bg="#1a0505"; border=C.red; color=C.red; }
            }
            return (
              <button key={oi} className="opt" disabled={enviado}
                onClick={() => setRespuestas(p => ({ ...p, [qi]:oi }))}
                style={{ background:bg, border:`1px solid ${border}`, color }}>
                <span style={{ color:modActivo.color, marginRight:10, fontWeight:"bold" }}>{["A","B","C","D"][oi]}.</span>{opt}
              </button>
            );
          })}
          {enviado && <div style={{ color:C.muted, fontSize:12, marginTop:10, paddingLeft:10, borderLeft:`2px solid ${C.border}`, lineHeight:1.6 }}>💡 {q.e}</div>}
        </div>
      ))}

      {!enviado
        ? <button className="btn" onClick={() => setEnviado(true)}
            disabled={Object.keys(respuestas).length < lecActiva.quiz.length}
            style={{ background:modActivo.color, color:"#000", padding:"12px 24px", fontSize:14, width:"100%", opacity: Object.keys(respuestas).length < lecActiva.quiz.length ? 0.5 : 1 }}>
            Enviar ({Object.keys(respuestas).length}/{lecActiva.quiz.length})
          </button>
        : <div className="fade-in" style={{ background:C.panel, border:`1px solid ${puntaje()>=70 ? C.green : C.red}`, borderRadius:10, padding:26, textAlign:"center", marginTop:10, opacity:0 }}>
            <div style={{ fontSize:36, marginBottom:10 }}>{puntaje()>=70 ? "🎯" : "📚"}</div>
            <div style={{ color:puntaje()>=70?C.green:C.red, fontSize:30, fontWeight:"bold" }}>{puntaje()}%</div>
            <div style={{ color:C.muted, fontSize:13, marginTop:6 }}>
              {puntaje()>=70 ? "¡Lección completada!" : "Necesitas 70% para completar. Repasa los slides."}
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"center", marginTop:16 }}>
              <button className="btn" onClick={() => { setRespuestas({}); setEnviado(false); }}
                style={{ background:C.dim, color:C.muted, padding:"10px 20px", fontSize:13 }}>Reintentar</button>
              {puntaje()>=70 &&
                <button className="btn" onClick={completarLeccion}
                  style={{ background:C.green, color:"#000", padding:"10px 20px", fontSize:13 }}>✓ Completar</button>
              }
            </div>
          </div>
      }
    </div>
  );

  return null;
}