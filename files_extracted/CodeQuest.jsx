import { useState, useEffect, useRef } from "react";
import { C } from "../../data/labs";
import { PYTHON_PATH } from "../../data/codequest_python";
import { TERMINAL_PATH } from "../../data/codequest_terminal";

const LENGUAJES = [
  { id: "python", nombre: "Python", icon: "🐍", color: "#f7c948", disponible: true, descripcion: "El lenguaje más popular para aprender a programar." },
  { id: "javascript", nombre: "JavaScript", icon: "⚡", color: "#f0db4f", disponible: false, descripcion: "El lenguaje de la web. Próximamente." },
  { id: "bash", nombre: "Bash", icon: "💻", color: "#4ade80", disponible: true, descripcion: "Automatización y scripting en Linux. Próximamente." },
  { id: "go", nombre: "Go", icon: "🐹", color: "#00add8", disponible: false, descripcion: "El lenguaje de Google. Próximamente." },
  { id: "rust", nombre: "Rust", icon: "🦀", color: "#f75208", disponible: false, descripcion: "El lenguaje más seguro. Próximamente." },
  { id: "powershell", nombre: "PowerShell", icon: "🔷", color: "#5391fe", disponible: false, descripcion: "Automatización en Windows. Próximamente." },
];

const CSS = `
  .cq-btn{cursor:pointer;border:none;font-family:'Inter',sans-serif;font-weight:bold;transition:all .15s;border-radius:6px}
  .cq-btn:hover:not(:disabled){filter:brightness(1.15);transform:translateY(-1px)}
  .cq-btn:disabled{opacity:.45;cursor:not-allowed}
  .cq-opt{width:100%;text-align:left;padding:12px 16px;margin:6px 0;border-radius:6px;cursor:pointer;font-family:'Inter',sans-serif;font-size:13px;border:1px solid #1e2a3a;background:#0d1117;color:#8b949e;transition:all .13s}
  .cq-opt:hover:not(:disabled){border-color:#2d3a4a;background:#111827;color:#c9d1d9}
  .cq-editor{width:100%;min-height:200px;background:#050810;border:1px solid #1e2a3a;color:#c9d1d9;padding:14px;border-radius:8px;font-family:'Courier New',monospace;font-size:13px;line-height:1.7;resize:vertical;outline:none;tab-size:4}
  .cq-editor:focus{border-color:#00d4ff44}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  .fade-in{animation:fadeUp 0.3s ease forwards}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
  .pulse{animation:pulse 2s infinite}
`;

export default function CodeQuest({ progresoCQ, onCompletarCQ }) {
  const [vista, setVista]           = useState("menu");
  const [lenguaje, setLenguaje]     = useState(null);
  const [mundoActivo, setMundoActivo] = useState(null);
  const [nivelIdx, setNivelIdx]     = useState(0);
  const [fase, setFase]             = useState("teoria"); // teoria | quiz | desafio | resultado
  const [respuesta, setRespuesta]   = useState(null);
  const [enviado, setEnviado]       = useState(false);
  const [vidas, setVidas]           = useState(3);
  const [codigo, setCodigo]         = useState("");
  const [intentos, setIntentos]     = useState(0);
  const [mostrarSolucion, setMostrarSolucion] = useState(false);
  const [esperandoReescritura, setEsperandoReescritura] = useState(false);
  const [outputDesafio, setOutputDesafio] = useState("");
  const [desafioOk, setDesafioOk]   = useState(false);
  const editorRef = useRef(null);

const PATH = lenguaje === "bash" ? TERMINAL_PATH : PYTHON_PATH;
  const nivel = mundoActivo?.niveles[nivelIdx];
  const totalNiveles = mundoActivo?.niveles.length || 0;

  const progreso = progresoCQ || {};
  const mundoProgreso = (mundo) => progreso[`python_mundo_${mundo.id}`] || { completados: 0, desafioOk: false };

  const resetNivel = () => {
    setRespuesta(null);
    setEnviado(false);
    setFase("teoria");
  };

  const entrarMundo = (mundo) => {
    setMundoActivo(mundo);
    setNivelIdx(0);
    resetNivel();
    setVidas(3);
    setCodigo("");
    setIntentos(0);
    setMostrarSolucion(false);
    setEsperandoReescritura(false);
    setDesafioOk(false);
    setOutputDesafio("");
    setVista("mundo");
  };

  const siguienteNivel = () => {
    if (nivelIdx < totalNiveles - 1) {
      setNivelIdx(p => p + 1);
      resetNivel();
    } else {
      setFase("desafio");
      setCodigo("");
      setIntentos(0);
      setMostrarSolucion(false);
      setEsperandoReescritura(false);
    }
  };

  const responderQuiz = (idx) => {
    if (enviado) return;
    setRespuesta(idx);
    setEnviado(true);
    const correcto = idx === nivel.correcta;
    if (!correcto) {
      setVidas(v => Math.max(0, v - 1));
    }
  };

  const handleTab = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newVal = codigo.substring(0, start) + "    " + codigo.substring(end);
      setCodigo(newVal);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  const ejecutarDesafio = () => {
    if (!mundoActivo?.desafio) return;
    if (esperandoReescritura) {
      setOutputDesafio("❌ Debes borrar el código y reescribir la solución para continuar.");
      return;
    }

    const ok = mundoActivo.desafio.test(codigo);
    const nuevoIntento = intentos + 1;
    setIntentos(nuevoIntento);

    if (ok) {
      setDesafioOk(true);
      setOutputDesafio("✅ ¡Correcto! Tu código cumple con los requisitos del desafío.");
      if (onCompletarCQ) onCompletarCQ(`python_mundo_${mundoActivo.id}`, true, 500);
    } else {
      if (nuevoIntento >= 3) {
        setMostrarSolucion(true);
        setEsperandoReescritura(true);
        setCodigo("");
        setOutputDesafio("❌ 3 intentos fallidos. Estudia la solución y reescríbela desde cero.");
      } else {
        setOutputDesafio(`❌ Incorrecto. Intento ${nuevoIntento}/3. Revisa las instrucciones.`);
      }
    }
  };

  const codigoLimpio = () => {
    if (esperandoReescritura && codigo.trim() === "") {
      setEsperandoReescritura(false);
      setOutputDesafio("✍️ Ahora reescribe la solución desde cero.");
    }
  };

  useEffect(() => { codigoLimpio(); }, [codigo]);

  // ── MENÚ PRINCIPAL ──
  if (vista === "menu") return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9" }}>
      <style>{CSS}</style>

      <div style={{ marginBottom:28 }}>
        <div style={{ color:"#f7c948", fontSize:11, letterSpacing:4, marginBottom:6 }}>◈ HACKFORGE // CODEQUEST</div>
        <h2 style={{ color:"#fff", fontSize:22, margin:"0 0 6px" }}>Elige tu camino</h2>
        <p style={{ color:C.muted, fontSize:13, maxWidth:600 }}>
          Aprende a programar desde cero hasta nivel profesional. Sin tutoriales aburridos — misiones, desafíos y código real.
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
        {LENGUAJES.map((lang, i) => (
          <div key={lang.id}
            className="fade-in"
            onClick={() => lang.disponible && setVista("path")}
            style={{
              background: lang.disponible ? C.panel : "#090c13",
              border:`1px solid ${lang.disponible ? lang.color+"33" : C.border}`,
              borderRadius:10, padding:20,
              cursor: lang.disponible ? "pointer" : "not-allowed",
              opacity: lang.disponible ? 1 : 0.5,
              animationDelay:`${i*50}ms`,
              transition:"all .2s",
            }}
            onMouseEnter={e => lang.disponible && (e.currentTarget.style.borderColor = lang.color+"66")}
            onMouseLeave={e => lang.disponible && (e.currentTarget.style.borderColor = lang.color+"33")}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontSize:32 }}>{lang.icon}</span>
              {!lang.disponible && <span style={{ background:"#1e2a3a", color:C.muted, fontSize:10, padding:"3px 8px", borderRadius:4 }}>Próximamente</span>}
              {lang.disponible && <span style={{ background:`${lang.color}22`, color:lang.color, fontSize:10, padding:"3px 8px", borderRadius:4, border:`1px solid ${lang.color}44` }}>DISPONIBLE</span>}
            </div>
            <div style={{ color: lang.disponible ? "#fff" : C.muted, fontWeight:"bold", fontSize:16, marginBottom:4 }}>{lang.nombre}</div>
            <div style={{ color:C.muted, fontSize:12, lineHeight:1.5 }}>{lang.descripcion}</div>
            {lang.disponible && (
              <div style={{ marginTop:12, color:lang.color, fontSize:12, fontWeight:"bold" }}>
                5 mundos · 100 niveles →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // ── PATH DE PYTHON ──
  if (vista === "path") return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9" }}>
      <style>{CSS}</style>
      <button className="cq-btn" onClick={() => setVista("menu")} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:24 }}>← Lenguajes</button>

      <div style={{ marginBottom:28 }}>
        <div style={{ color:PATH.color, fontSize:11, letterSpacing:4, marginBottom:6 }}>🐍 PYTHON PATH</div>
        <h2 style={{ color:"#fff", fontSize:22, margin:"0 0 6px" }}>{PATH.nombre}</h2>
        <p style={{ color:C.muted, fontSize:13 }}>{PATH.descripcion}</p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {PATH.mundos.map((mundo, i) => {
          const mp = mundoProgreso(mundo);
          const desbloqueado = i === 0 || mundoProgreso(PATH.mundos[i-1]).desafioOk;
          const completado = mp.desafioOk;
          const porcentaje = mundo.niveles.length > 0 ? Math.round((mp.completados / mundo.niveles.length) * 100) : 0;

          return (
            <div key={mundo.id}
              className="fade-in"
              onClick={() => desbloqueado && !mundo.bloqueado && entrarMundo(mundo)}
              style={{
                background: completado ? `${mundo.color}11` : C.panel,
                border:`1px solid ${completado ? mundo.color+"66" : desbloqueado && !mundo.bloqueado ? C.border : C.border}`,
                borderRadius:10, padding:20,
                cursor: desbloqueado && !mundo.bloqueado ? "pointer" : "not-allowed",
                opacity: desbloqueado && !mundo.bloqueado ? 1 : 0.4,
                animationDelay:`${i*60}ms`,
                display:"flex", alignItems:"center", gap:20,
                transition:"all .2s",
              }}
              onMouseEnter={e => desbloqueado && !mundo.bloqueado && (e.currentTarget.style.borderColor = mundo.color+"55")}
              onMouseLeave={e => desbloqueado && !mundo.bloqueado && (e.currentTarget.style.borderColor = completado ? mundo.color+"66" : C.border)}>

              <div style={{ width:56, height:56, borderRadius:"50%", background: completado ? `${mundo.color}22` : C.bg, border:`2px solid ${completado ? mundo.color : C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>
                {completado ? "✅" : mundo.bloqueado ? "🔒" : mundo.icon}
              </div>

              <div style={{ flex:1 }}>
                <div style={{ color:C.muted, fontSize:10, letterSpacing:2, marginBottom:2 }}>MUNDO {mundo.id}</div>
                <div style={{ color:"#fff", fontWeight:"bold", fontSize:15, marginBottom:4 }}>{mundo.nombre}</div>
                <div style={{ color:C.muted, fontSize:12, marginBottom:8 }}>{mundo.descripcion}</div>
                {!mundo.bloqueado && mundo.niveles.length > 0 && (
                  <>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:C.muted, marginBottom:4 }}>
                      <span>{mp.completados}/{mundo.niveles.length} niveles</span>
                      <span style={{ color:mundo.color }}>{porcentaje}%</span>
                    </div>
                    <div style={{ height:3, background:C.border, borderRadius:2, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${porcentaje}%`, background:mundo.color, borderRadius:2, transition:"width 0.5s" }}/>
                    </div>
                  </>
                )}
                {mundo.bloqueado && <div style={{ color:C.muted, fontSize:11 }}>Completa el mundo anterior para desbloquear</div>}
              </div>

              {!mundo.bloqueado && desbloqueado && (
                <div style={{ color:mundo.color, fontSize:20 }}>→</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── MUNDO (NIVELES + DESAFÍO) ──
  if (vista === "mundo" && mundoActivo) {

    // ── DESAFÍO FINAL ──
    if (fase === "desafio") return (
      <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9", maxWidth:760, margin:"0 auto" }}>
        <style>{CSS}</style>
        <button className="cq-btn" onClick={() => setVista("path")} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:20 }}>← Mundos</button>

        <div style={{ marginBottom:20 }}>
          <div style={{ color:mundoActivo.color, fontSize:11, letterSpacing:3, marginBottom:4 }}>🏆 DESAFÍO FINAL · MUNDO {mundoActivo.id}</div>
          <h3 style={{ color:"#fff", fontSize:20, margin:"0 0 8px" }}>{mundoActivo.desafio?.titulo}</h3>
          <p style={{ color:C.muted, fontSize:13 }}>{mundoActivo.desafio?.descripcion}</p>
        </div>

        {/* Instrucciones */}
        <div style={{ background:C.panel, border:`1px solid ${mundoActivo.color}33`, borderRadius:8, padding:18, marginBottom:16 }}>
          <div style={{ color:mundoActivo.color, fontSize:11, letterSpacing:2, marginBottom:10 }}>INSTRUCCIONES</div>
          {mundoActivo.desafio?.instrucciones.map((inst, i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:6, fontSize:13, color:"#c9d1d9" }}>
              <span style={{ color:mundoActivo.color, fontWeight:"bold", minWidth:20 }}>{i+1}.</span>
              <span>{inst}</span>
            </div>
          ))}
        </div>

        {/* Solución (solo si falló 3 veces) */}
        {mostrarSolucion && (
          <div style={{ background:"#050810", border:`1px solid #ff6b3544`, borderRadius:8, padding:18, marginBottom:16 }}>
            <div style={{ color:"#ff6b35", fontSize:11, letterSpacing:2, marginBottom:10 }}>📖 SOLUCIÓN — Estudia y luego reescríbela</div>
            <pre style={{ color:"#00d4ff", fontFamily:"'Courier New',monospace", fontSize:12, lineHeight:1.7, margin:0, whiteSpace:"pre-wrap" }}>{mundoActivo.desafio?.solucion}</pre>
          </div>
        )}

        {/* Editor */}
        <div style={{ marginBottom:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <div style={{ color:C.muted, fontSize:11, letterSpacing:2 }}>
              {esperandoReescritura ? "✍️ REESCRIBE LA SOLUCIÓN DESDE CERO" : "💻 TU CÓDIGO"}
            </div>
            <div style={{ display:"flex", gap:8, fontSize:11, color:C.muted }}>
              <span>Intentos: {intentos}/3</span>
              {desafioOk && <span style={{ color:"#22c55e" }}>✅ COMPLETADO</span>}
            </div>
          </div>
          <textarea
            ref={editorRef}
            className="cq-editor"
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
            onKeyDown={handleTab}
            placeholder={esperandoReescritura ? "Borra todo y escribe la solución desde cero..." : "# Escribe tu código Python aquí\n# Usa Tab para indentar\n\n"}
            disabled={desafioOk}
            spellCheck={false}
          />
        </div>

        {/* Output */}
        {outputDesafio && (
          <div style={{ background:"#050810", border:`1px solid ${desafioOk ? "#22c55e44" : "#ff3b3b44"}`, borderRadius:6, padding:"12px 16px", marginBottom:16, fontSize:13, color: desafioOk ? "#22c55e" : "#ff6b6b", fontFamily:"'Courier New',monospace" }}>
            {outputDesafio}
          </div>
        )}

        <div style={{ display:"flex", gap:10 }}>
          {!desafioOk && (
            <button className="cq-btn" onClick={ejecutarDesafio}
              style={{ background:mundoActivo.color, color:"#000", padding:"12px 24px", fontSize:14, flex:1 }}>
              ▶ Ejecutar y verificar
            </button>
          )}
          {desafioOk && (
            <button className="cq-btn" onClick={() => setVista("path")}
              style={{ background:"#22c55e", color:"#000", padding:"12px 24px", fontSize:14, flex:1 }}>
              🎉 ¡Completado! Volver a mundos →
            </button>
          )}
        </div>
      </div>
    );

    // ── NIVELES (TEORÍA + QUIZ) ──
    if (!nivel) return null;

    return (
      <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9", maxWidth:740, margin:"0 auto" }}>
        <style>{CSS}</style>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <button className="cq-btn" onClick={() => setVista("path")} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12 }}>← Mundos</button>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            {[...Array(3)].map((_, i) => (
              <span key={i} style={{ fontSize:16 }}>{i < vidas ? "❤️" : "🖤"}</span>
            ))}
          </div>
        </div>

        {/* Progreso */}
        <div style={{ marginBottom:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:C.muted, marginBottom:6 }}>
            <span style={{ color:mundoActivo.color }}>MUNDO {mundoActivo.id}: {mundoActivo.nombre}</span>
            <span>Nivel {nivelIdx + 1}/{totalNiveles}</span>
          </div>
          <div style={{ height:4, background:C.border, borderRadius:2, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${((nivelIdx) / totalNiveles) * 100}%`, background:mundoActivo.color, borderRadius:2, transition:"width 0.3s" }}/>
          </div>
        </div>

        {/* Dots de niveles */}
        <div style={{ display:"flex", gap:4, marginBottom:24, flexWrap:"wrap" }}>
          {mundoActivo.niveles.map((_, i) => (
            <div key={i} style={{ width:8, height:8, borderRadius:"50%", background: i < nivelIdx ? mundoActivo.color : i === nivelIdx ? mundoActivo.color : C.border, opacity: i === nivelIdx ? 1 : i < nivelIdx ? 0.7 : 0.3 }}/>
          ))}
        </div>

        {/* TEORÍA */}
        {fase === "teoria" && (
          <div className="fade-in" style={{ opacity:0 }}>
            <div style={{ color:mundoActivo.color, fontSize:10, letterSpacing:3, marginBottom:4 }}>NIVEL {nivelIdx + 1} · TEORÍA</div>
            <h3 style={{ color:"#fff", fontSize:20, margin:"0 0 16px" }}>{nivel.titulo}</h3>

            <div style={{ background:C.panel, border:`1px solid ${mundoActivo.color}33`, borderRadius:10, padding:24, marginBottom:16 }}>
              <div style={{ borderLeft:`3px solid ${mundoActivo.color}`, paddingLeft:18 }}>
                {nivel.teoria.split("\n").map((line, i) => {
                  const isBullet = line.trim().startsWith("•");
                  const isBlank = line.trim() === "";
                  return isBlank ? <br key={i}/> : (
                    <p key={i} style={{ margin:"5px 0", fontSize:14, lineHeight:1.8, color: isBullet ? "#c9d1d9" : "#8b949e" }}>{line}</p>
                  );
                })}
              </div>
            </div>

            {/* Ejemplo de código */}
            {nivel.ejemplo && (
              <div style={{ marginBottom:20 }}>
                <div style={{ color:C.muted, fontSize:11, letterSpacing:2, marginBottom:8 }}>💻 EJEMPLO</div>
                <div style={{ background:"#050810", border:`1px solid #1e2a3a`, borderRadius:8, overflow:"hidden" }}>
                  <div style={{ background:"#0d1117", padding:"8px 14px", borderBottom:"1px solid #1e2a3a", display:"flex", gap:6 }}>
                    {["#ff5f57","#ffbd2e","#28ca41"].map((c,i) => <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c }}/>)}
                    <span style={{ color:C.muted, fontSize:11, marginLeft:6 }}>python</span>
                  </div>
                  <pre style={{ margin:0, padding:"14px 16px", fontFamily:"'Courier New',monospace", fontSize:12, lineHeight:1.7, color:"#00d4ff", overflowX:"auto", whiteSpace:"pre-wrap" }}>{nivel.ejemplo.codigo}</pre>
                  {nivel.ejemplo.output && (
                    <>
                      <div style={{ background:"#0d1117", padding:"6px 14px", borderTop:"1px solid #1e2a3a", borderBottom:"1px solid #1e2a3a" }}>
                        <span style={{ color:C.muted, fontSize:10, letterSpacing:2 }}>OUTPUT</span>
                      </div>
                      <pre style={{ margin:0, padding:"10px 16px", fontFamily:"'Courier New',monospace", fontSize:12, lineHeight:1.6, color:"#22c55e", whiteSpace:"pre-wrap" }}>{nivel.ejemplo.output}</pre>
                    </>
                  )}
                </div>
              </div>
            )}

            <button className="cq-btn" onClick={() => setFase("quiz")}
              style={{ background:mundoActivo.color, color:"#000", padding:"12px 28px", fontSize:14, width:"100%" }}>
              Entendido → Ir al Quiz
            </button>
          </div>
        )}

        {/* QUIZ */}
        {fase === "quiz" && (
          <div className="fade-in" style={{ opacity:0 }}>
            <div style={{ color:mundoActivo.color, fontSize:10, letterSpacing:3, marginBottom:4 }}>NIVEL {nivelIdx + 1} · QUIZ</div>
            <h3 style={{ color:"#fff", fontSize:18, margin:"0 0 20px", lineHeight:1.4 }}>{nivel.pregunta}</h3>

            <div style={{ marginBottom:20 }}>
              {nivel.opciones.map((opt, i) => {
                let bg = C.panel, border = C.border, color = "#8b949e";
                if (enviado) {
                  if (i === nivel.correcta) { bg="#002200"; border="#22c55e"; color="#22c55e"; }
                  else if (i === respuesta && i !== nivel.correcta) { bg="#1a0505"; border="#ff3b3b"; color="#ff6b6b"; }
                } else if (respuesta === i) {
                  border = mundoActivo.color; color = "#fff";
                }
                return (
                  <button key={i} className="cq-opt" disabled={enviado}
                    onClick={() => responderQuiz(i)}
                    style={{ background:bg, border:`1px solid ${border}`, color }}>
                    <span style={{ color:mundoActivo.color, marginRight:10, fontWeight:"bold" }}>{["A","B","C","D"][i]}.</span>{opt}
                  </button>
                );
              })}
            </div>

            {enviado && (
              <div className="fade-in" style={{ opacity:0 }}>
                <div style={{ background: respuesta === nivel.correcta ? "#002200" : "#0d1117", border:`1px solid ${respuesta === nivel.correcta ? "#22c55e44" : "#ff3b3b44"}`, borderRadius:8, padding:"12px 16px", marginBottom:16 }}>
                  <div style={{ color: respuesta === nivel.correcta ? "#22c55e" : "#ff6b35", fontWeight:"bold", fontSize:12, marginBottom:6 }}>
                    {respuesta === nivel.correcta ? "✅ ¡Correcto!" : "❌ Incorrecto"}
                  </div>
                  <div style={{ color:"#c9d1d9", fontSize:13, lineHeight:1.6 }}>💡 {nivel.explicacion}</div>
                </div>

                <button className="cq-btn" onClick={siguienteNivel}
                  style={{ background:mundoActivo.color, color:"#000", padding:"12px 28px", fontSize:14, width:"100%" }}>
                  {nivelIdx < totalNiveles - 1 ? `Siguiente nivel →` : "🏆 Ir al Desafío Final →"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
}
