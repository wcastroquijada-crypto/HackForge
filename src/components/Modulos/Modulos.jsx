import { useState } from "react";
import { C } from "../../data/labs";
import { MODULO1 } from "../../data/modulo1";
import { MODULO2 } from "../../data/modulo2";
const MODULOS = [MODULO1, MODULO2];
const CSS = `
  .btn{cursor:pointer;border:none;font-family:'Inter',sans-serif;font-weight:bold;transition:all .15s;border-radius:5px}
  .btn:hover:not(:disabled){filter:brightness(1.15);transform:translateY(-1px)}
  .btn:disabled{opacity:.45;cursor:not-allowed}
  .opt{width:100%;text-align:left;padding:11px 15px;margin:5px 0;border-radius:5px;cursor:pointer;font-family:'Inter',sans-serif;font-size:13px;border:1px solid #1e2a3a;background:#0d1117;color:#8b949e;transition:all .13s}
  .opt:hover:not(:disabled){border-color:#2d3a4a;background:#111827;color:#c9d1d9}
  .slide-body p{margin:4px 0;font-size:13px;line-height:1.8;color:#8b949e}
  .slide-body code{background:#050810;color:#00d4ff;padding:1px 6px;border-radius:3px;font-family:'JetBrains Mono','Courier New',monospace;font-size:12px}
`;

export default function Modulos({ progresoMods, onCompletarLeccion }) {
  const [modActivo,     setModActivo]     = useState(null);
  const [leccionActiva, setLeccionActiva] = useState(null);
  const [fase,          setFase]          = useState("slides"); // slides | quiz
  const [slideIdx,      setSlideIdx]      = useState(0);
  const [respuestas,    setRespuestas]    = useState({});
  const [enviado,       setEnviado]       = useState(false);

  const puntaje = () => {
    if (!leccionActiva) return 0;
    let c = 0;
    leccionActiva.quiz.forEach((q, i) => { if (respuestas[i] === q.c) c++; });
    return Math.round((c / leccionActiva.quiz.length) * 100);
  };

  const abrirLeccion = (lec) => {
    setLeccionActiva(lec);
    setFase("slides");
    setSlideIdx(0);
    setRespuestas({});
    setEnviado(false);
  };

  const volverAMod = () => { setLeccionActiva(null); };
  const volverALista = () => { setModActivo(null); setLeccionActiva(null); };

  const completarLeccion = () => {
    if (onCompletarLeccion) onCompletarLeccion(modActivo.id, leccionActiva.id, 60);
    volverAMod();
  };

  // ── LISTA DE MÓDULOS ──────────────────────────────────────
  if (!modActivo) return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9" }}>
      <style>{CSS}</style>
      <div style={{ marginBottom:24 }}>
        <div style={{ color:C.cyan, fontSize:11, letterSpacing:4, marginBottom:6 }}>HACKFORGE // MÓDULOS</div>
        <h2 style={{ color:"#fff", fontSize:22, margin:"0 0 6px" }}>Ruta Ciberseguridad</h2>
        <p style={{ color:C.muted, fontSize:13 }}>Teoría, práctica y mindset de seguridad — desde cero hasta operador.</p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
        {[
          { id:1, icon:"🌐", nombre:"Internet 101",       tag:"FREE", color:C.cyan,   lecciones:5,  disponible:true  },
        { id:2, icon:"🛡️", nombre:"Fundamentos de Ciberseguridad",  tag:"FREE", color:C.green,  lecciones:6,  disponible:true },
          { id:3, icon:"🔍", nombre:"Reconocimiento",     tag:"FREE", color:C.yellow, lecciones:5,  disponible:false },
          { id:4, icon:"⚔️",  nombre:"Pentesting Web",   tag:"PRO",  color:C.orange, lecciones:8,  disponible:false },
          { id:5, icon:"🔐", nombre:"Criptografía",       tag:"PRO",  color:C.purple, lecciones:6,  disponible:false },
        ].map(m => {
          const prog = progresoMods?.[m.id] || { completadas:0 };
          const porcentaje = Math.round((prog.completadas / m.lecciones) * 100);
          return (
            <div key={m.id} onClick={() => m.disponible && setModActivo(MODULOS.find(x => x.id === m.id))}
              style={{ background:C.panel, border:`1px solid ${m.disponible ? C.border2 : C.border}`, borderRadius:10, padding:20, cursor:m.disponible?"pointer":"not-allowed", opacity:m.disponible?1:0.5, transition:"all .18s" }}
              onMouseEnter={e => m.disponible && (e.currentTarget.style.borderColor = m.color+"66")}
              onMouseLeave={e => m.disponible && (e.currentTarget.style.borderColor = C.border2)}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                <span style={{ fontSize:28 }}>{m.icon}</span>
                <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                  <span style={{ background:m.tag==="PRO"?`${C.cyan}22`:`${C.green}22`, color:m.tag==="PRO"?C.cyan:C.green, fontSize:9, padding:"2px 8px", borderRadius:3, border:`1px solid ${m.tag==="PRO"?C.cyan+"44":C.green+"44"}` }}>{m.tag}</span>
                  {!m.disponible && <span style={{ color:C.muted, fontSize:12 }}>🔒</span>}
                </div>
              </div>
              <div style={{ color:"#fff", fontWeight:"bold", fontSize:15, marginBottom:4 }}>{m.nombre}</div>
              <div style={{ color:C.muted, fontSize:12, marginBottom:12 }}>{m.lecciones} lecciones</div>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:C.muted, marginBottom:6 }}>
                <span>{prog.completadas}/{m.lecciones} completadas</span>
                <span style={{ color:m.color }}>{porcentaje}%</span>
              </div>
              <div style={{ height:4, background:C.border, borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${porcentaje}%`, background:m.color, borderRadius:2, transition:"width 0.5s" }}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── LISTA DE LECCIONES ────────────────────────────────────
  if (!leccionActiva) return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9" }}>
      <style>{CSS}</style>
      <button className="btn" onClick={volverALista} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:20 }}>← Módulos</button>

      <div style={{ marginBottom:24 }}>
        <div style={{ color:modActivo.color, fontSize:11, letterSpacing:3, marginBottom:4 }}>MÓDULO {modActivo.id}</div>
        <h2 style={{ color:"#fff", fontSize:22, margin:"0 0 6px" }}>{modActivo.icon} {modActivo.nombre}</h2>
        <p style={{ color:C.muted, fontSize:13 }}>{modActivo.descripcion}</p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {modActivo.lecciones.map((lec, i) => {
          const done = progresoMods?.[modActivo.id]?.leccionesId?.includes(lec.id);
          return (
            <div key={lec.id} onClick={() => abrirLeccion(lec)}
              style={{ background:C.panel, border:`1px solid ${done ? modActivo.color+"44" : C.border2}`, borderRadius:8, padding:18, cursor:"pointer", display:"flex", alignItems:"center", gap:16, transition:"all .15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = modActivo.color+"66"}
              onMouseLeave={e => e.currentTarget.style.borderColor = done ? modActivo.color+"44" : C.border2}>
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

  // ── SLIDES ────────────────────────────────────────────────
  if (fase === "slides") {
    const slide = leccionActiva.slides[slideIdx];
    return (
      <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9", maxWidth:740, margin:"0 auto" }}>
        <style>{CSS}</style>
        <button className="btn" onClick={volverAMod} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:20 }}>← Lecciones</button>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div>
            <div style={{ color:modActivo.color, fontSize:10, letterSpacing:3 }}>{slide.tag} · SLIDE {slideIdx+1}/{leccionActiva.slides.length}</div>
            <h3 style={{ color:"#fff", fontSize:19, margin:"6px 0 0" }}>{slide.titulo}</h3>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {leccionActiva.slides.map((_,i) => (
              <div key={i} onClick={() => setSlideIdx(i)}
                style={{ width:9, height:9, borderRadius:"50%", cursor:"pointer", background: i===slideIdx ? modActivo.color : i<slideIdx ? `${modActivo.color}55` : C.border }}/>
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div style={{ background:C.panel, border:`1px solid ${modActivo.color}33`, borderRadius:10, padding:28, marginBottom:20 }}>
          <div style={{ borderLeft:`3px solid ${modActivo.color}`, paddingLeft:20 }} className="slide-body">
            {slide.contenido.split("\n").map((line, i) => {
              if (line === "") return <br key={i}/>;
              const isCode = /^(nmap|dig|netstat|ss |curl|ping|http|https?:|GET |POST |PUT |DELETE |SELECT |192\.|10\.|127\.|2001:|ssh |ftp )/i.test(line.trim());
              return (
                <p key={i} style={{ margin:"4px 0", fontFamily: isCode ? "'JetBrains Mono','Courier New',monospace" : "'Inter',sans-serif", background: isCode ? "#050810" : "transparent", color: isCode ? modActivo.color : "#8b949e", padding: isCode ? "3px 10px" : "0", borderRadius: isCode ? 4 : 0, fontSize: isCode ? 12 : 13, lineHeight:1.8 }}>
                  {line}
                </p>
              );
            })}
          </div>
        </div>

        {/* Navegación */}
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <button className="btn" onClick={() => setSlideIdx(p => Math.max(0, p-1))} disabled={slideIdx===0}
            style={{ background:C.dim, color:C.muted, padding:"10px 20px", fontSize:13 }}>← Anterior</button>
          {slideIdx < leccionActiva.slides.length-1
            ? <button className="btn" onClick={() => setSlideIdx(p => p+1)} style={{ background:modActivo.color, color:"#000", padding:"10px 20px", fontSize:13 }}>Siguiente →</button>
            : <button className="btn" onClick={() => setFase("quiz")} style={{ background:modActivo.color, color:"#000", padding:"10px 20px", fontSize:13 }}>Ir al Quiz →</button>
          }
        </div>
      </div>
    );
  }

  // ── QUIZ ──────────────────────────────────────────────────
  return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9", maxWidth:740, margin:"0 auto" }}>
      <style>{CSS}</style>
      <button className="btn" onClick={() => setFase("slides")} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:20 }}>← Volver a slides</button>

      <div style={{ marginBottom:20 }}>
        <div style={{ color:modActivo.color, fontSize:10, letterSpacing:3 }}>QUIZ · {leccionActiva.titulo}</div>
        <h3 style={{ color:"#fff", fontSize:19, margin:"6px 0 0" }}>Evaluación de Conocimiento</h3>
        <p style={{ color:C.muted, fontSize:12, marginTop:4 }}>{leccionActiva.quiz.length} preguntas · Mínimo 70% para completar</p>
      </div>

      {leccionActiva.quiz.map((q, qi) => (
        <div key={qi} style={{ background:C.panel, border:`1px solid ${enviado ? (respuestas[qi]===q.c ? "#00ff8833" : "#ff3b3b33") : C.border}`, borderRadius:8, padding:18, marginBottom:12 }}>
          <div style={{ color:C.muted, fontSize:10, marginBottom:6 }}>P{qi+1}/{leccionActiva.quiz.length}</div>
          <div style={{ color:"#fff", fontSize:14, fontWeight:"600", marginBottom:12, lineHeight:1.5 }}>{q.q}</div>
          {q.opts.map((opt, oi) => {
            let bg=C.panel, border=C.border2, color="#8b949e";
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
          {enviado && <div style={{ color:C.muted, fontSize:12, marginTop:10, paddingLeft:10, borderLeft:`2px solid ${C.border2}`, lineHeight:1.6 }}>💡 {q.e}</div>}
        </div>
      ))}

      {!enviado
        ? <button className="btn" onClick={() => setEnviado(true)}
            disabled={Object.keys(respuestas).length < leccionActiva.quiz.length}
            style={{ background:modActivo.color, color:"#000", padding:"12px 24px", fontSize:14, width:"100%", opacity: Object.keys(respuestas).length < leccionActiva.quiz.length ? 0.5 : 1 }}>
            Enviar respuestas ({Object.keys(respuestas).length}/{leccionActiva.quiz.length})
          </button>
        : <div style={{ background:C.panel, border:`1px solid ${puntaje()>=70 ? C.green : C.red}`, borderRadius:10, padding:26, textAlign:"center", marginTop:10 }}>
            <div style={{ fontSize:36, marginBottom:10 }}>{puntaje()>=70 ? "🎯" : "📚"}</div>
            <div style={{ color: puntaje()>=70 ? C.green : C.red, fontSize:30, fontWeight:"bold" }}>{puntaje()}%</div>
            <div style={{ color:C.muted, fontSize:13, marginTop:6 }}>
              {puntaje()>=70 ? "¡Lección completada!" : "Necesitas 70% para completar. Repasa los slides."}
            </div>
            <div style={{ display:"flex", gap:10, justifyContent:"center", marginTop:16 }}>
              <button className="btn" onClick={() => { setRespuestas({}); setEnviado(false); }}
                style={{ background:C.dim, color:C.muted, padding:"10px 20px", fontSize:13 }}>
                Reintentar
              </button>
              {puntaje()>=70 &&
                <button className="btn" onClick={completarLeccion}
                  style={{ background:C.green, color:"#000", padding:"10px 20px", fontSize:13 }}>
                  ✓ Completar lección
                </button>
              }
            </div>
          </div>
      }
    </div>
  );
}