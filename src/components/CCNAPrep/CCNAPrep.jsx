import { useState, useEffect } from "react";
import { C } from "../../data/labs";
import { PREGUNTAS_CCNA, FLASHCARDS, EJERCICIOS_SUBNET } from "../../data/ccna_data";

const CSS = `
  .ccna-btn{cursor:pointer;border:none;font-family:'Inter',sans-serif;font-weight:bold;transition:all .15s;border-radius:6px}
  .ccna-btn:hover:not(:disabled){filter:brightness(1.15);transform:translateY(-1px)}
  .ccna-btn:disabled{opacity:.45;cursor:not-allowed}
  .ccna-opt{width:100%;text-align:left;padding:12px 16px;margin:6px 0;border-radius:6px;cursor:pointer;font-family:'Inter',sans-serif;font-size:13px;border:1px solid #1e2a3a;background:#0d1117;color:#8b949e;transition:all .13s}
  .ccna-opt:hover:not(:disabled){border-color:#00d4ff44;background:#111827;color:#c9d1d9}
  .ccna-input{background:#050810;border:1px solid #1e2a3a;color:#c9d1d9;padding:10px 14px;border-radius:6px;font-family:'Inter',sans-serif;font-size:13px;outline:none;width:100%}
  .ccna-input:focus{border-color:#00d4ff44}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  .fade-in{animation:fadeUp 0.3s ease forwards}
  @keyframes flip{0%{transform:rotateY(0)}100%{transform:rotateY(180deg)}}
  .card-flip{transition:transform 0.5s;transform-style:preserve-3d}
`;

const TEMAS = [...new Set(PREGUNTAS_CCNA.map(p => p.tema))];
const COLOR = "#00d4ff";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── BANCO DE PREGUNTAS ──────────────────────────────────
function BancoPregunta({ onBack }) {
  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [pregIdx, setPregIdx] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [correctas, setCorrectas] = useState(0);

  const preguntas = temaSeleccionado
    ? shuffle(PREGUNTAS_CCNA.filter(p => p.tema === temaSeleccionado))
    : [];
  const preg = preguntas[pregIdx];

  const responder = (idx) => {
    if (enviado) return;
    setRespuesta(idx);
    setEnviado(true);
    if (idx === preg.correcta) setCorrectas(c => c + 1);
  };

  const siguiente = () => {
    if (pregIdx < preguntas.length - 1) {
      setPregIdx(p => p + 1);
      setRespuesta(null);
      setEnviado(false);
    } else {
      setTemaSeleccionado(null);
      setPregIdx(0);
      setRespuesta(null);
      setEnviado(false);
      setCorrectas(0);
    }
  };

  if (!temaSeleccionado) return (
    <div>
      <button className="ccna-btn" onClick={onBack} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:20 }}>← CCNA Prep</button>
      <div style={{ color:COLOR, fontSize:11, letterSpacing:3, marginBottom:8 }}>BANCO DE PREGUNTAS</div>
      <h3 style={{ color:"#fff", fontSize:18, marginBottom:16 }}>Elige un tema</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:10 }}>
        {TEMAS.map(tema => {
          const count = PREGUNTAS_CCNA.filter(p => p.tema === tema).length;
          return (
            <div key={tema} className="fade-in ccna-btn"
              onClick={() => { setTemaSeleccionado(tema); setPregIdx(0); setCorrectas(0); }}
              style={{ background:C.panel, border:`1px solid ${COLOR}33`, borderRadius:8, padding:16, cursor:"pointer", textAlign:"left" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = COLOR+"66"}
              onMouseLeave={e => e.currentTarget.style.borderColor = COLOR+"33"}>
              <div style={{ color:"#fff", fontWeight:"bold", fontSize:14, marginBottom:4 }}>{tema}</div>
              <div style={{ color:C.muted, fontSize:12 }}>{count} preguntas</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (!preg) return null;

  return (
    <div style={{ maxWidth:740, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <button className="ccna-btn" onClick={() => setTemaSeleccionado(null)} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12 }}>← Temas</button>
        <div style={{ color:C.muted, fontSize:12 }}>✅ {correctas}/{pregIdx + (enviado?1:0)} correctas</div>
      </div>
      <div style={{ marginBottom:12 }}>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:C.muted, marginBottom:6 }}>
          <span style={{ color:COLOR }}>{temaSeleccionado}</span>
          <span>{pregIdx+1}/{preguntas.length}</span>
        </div>
        <div style={{ height:3, background:C.border, borderRadius:2, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${((pregIdx)/(preguntas.length))*100}%`, background:COLOR, transition:"width 0.3s" }}/>
        </div>
      </div>
      <div className="fade-in" key={pregIdx} style={{ background:C.panel, border:`1px solid ${COLOR}22`, borderRadius:10, padding:24, marginBottom:16, opacity:0 }}>
        <div style={{ color:C.muted, fontSize:10, marginBottom:8 }}>PREGUNTA {pregIdx+1}</div>
        <div style={{ color:"#fff", fontSize:15, fontWeight:"600", lineHeight:1.5, marginBottom:16 }}>{preg.pregunta}</div>
        {preg.opciones.map((opt, i) => {
          let bg=C.panel, border=C.border, color="#8b949e";
          if (enviado) {
            if (i===preg.correcta){bg="#002200";border="#22c55e";color="#22c55e";}
            else if(i===respuesta&&i!==preg.correcta){bg="#1a0505";border="#ff3b3b";color="#ff6b6b";}
          } else if (respuesta===i){border=COLOR;color="#fff";}
          return (
            <button key={i} className="ccna-opt" disabled={enviado}
              onClick={() => responder(i)}
              style={{ background:bg, border:`1px solid ${border}`, color }}>
              <span style={{ color:COLOR, marginRight:10, fontWeight:"bold" }}>{["A","B","C","D"][i]}.</span>{opt}
            </button>
          );
        })}
      </div>
      {enviado && (
        <div className="fade-in" style={{ opacity:0 }}>
          <div style={{ background:respuesta===preg.correcta?"#002200":"#0d1117", border:`1px solid ${respuesta===preg.correcta?"#22c55e44":"#ff3b3b44"}`, borderRadius:8, padding:"12px 16px", marginBottom:12, fontSize:13 }}>
            <div style={{ color:respuesta===preg.correcta?"#22c55e":"#ff6b35", fontWeight:"bold", marginBottom:6 }}>{respuesta===preg.correcta?"✅ ¡Correcto!":"❌ Incorrecto"}</div>
            <div style={{ color:"#c9d1d9", lineHeight:1.6 }}>💡 {preg.explicacion}</div>
          </div>
          <button className="ccna-btn" onClick={siguiente} style={{ background:COLOR, color:"#000", padding:"12px", fontSize:14, width:"100%" }}>
            {pregIdx<preguntas.length-1?"Siguiente →":"🎯 Ver resultado"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── FLASHCARDS ───────────────────────────────────────────
function FlashcardsView({ onBack }) {
  const [catSeleccionada, setCatSeleccionada] = useState(null);
  const [idx, setIdx] = useState(0);
  const [volteada, setVolteada] = useState(false);
  const cards = catSeleccionada ? shuffle(FLASHCARDS.filter(f => f.categoria === catSeleccionada)) : [];
  const card = cards[idx];
  const CATS = [...new Set(FLASHCARDS.map(f => f.categoria))];

  if (!catSeleccionada) return (
    <div>
      <button className="ccna-btn" onClick={onBack} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:20 }}>← CCNA Prep</button>
      <div style={{ color:COLOR, fontSize:11, letterSpacing:3, marginBottom:8 }}>FLASHCARDS</div>
      <h3 style={{ color:"#fff", fontSize:18, marginBottom:16 }}>Elige una categoría</h3>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:10 }}>
        {CATS.map(cat => {
          const count = FLASHCARDS.filter(f => f.categoria === cat).length;
          return (
            <div key={cat} className="fade-in"
              onClick={() => { setCatSeleccionada(cat); setIdx(0); setVolteada(false); }}
              style={{ background:C.panel, border:`1px solid ${COLOR}33`, borderRadius:8, padding:16, cursor:"pointer" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = COLOR+"66"}
              onMouseLeave={e => e.currentTarget.style.borderColor = COLOR+"33"}>
              <div style={{ color:"#fff", fontWeight:"bold", marginBottom:4 }}>{cat}</div>
              <div style={{ color:C.muted, fontSize:12 }}>{count} tarjetas</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:600, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <button className="ccna-btn" onClick={() => setCatSeleccionada(null)} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12 }}>← Categorías</button>
        <span style={{ color:C.muted, fontSize:12 }}>{idx+1}/{cards.length}</span>
      </div>
      <div onClick={() => setVolteada(v => !v)}
        style={{ background:volteada?`${COLOR}11`:C.panel, border:`2px solid ${volteada?COLOR:C.border}`, borderRadius:16, padding:40, textAlign:"center", cursor:"pointer", minHeight:200, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", transition:"all 0.4s", marginBottom:20 }}>
        <div style={{ color:C.muted, fontSize:10, letterSpacing:3, marginBottom:12 }}>{volteada?"RESPUESTA":"TÉRMINO"}</div>
        <div style={{ color:volteada?COLOR:"#fff", fontSize:volteada?14:20, fontWeight:"bold", lineHeight:1.5, fontFamily:volteada?"'Inter',sans-serif":"'Courier New',monospace" }}>
          {volteada ? card?.reverso : card?.frente}
        </div>
        <div style={{ color:C.muted, fontSize:11, marginTop:16 }}>👆 Toca para {volteada?"ver término":"ver respuesta"}</div>
      </div>
      <div style={{ display:"flex", gap:10 }}>
        <button className="ccna-btn" onClick={() => { setIdx(i=>Math.max(0,i-1)); setVolteada(false); }} disabled={idx===0}
          style={{ background:C.dim, color:C.muted, padding:"10px 20px", fontSize:13, flex:1 }}>← Anterior</button>
        <button className="ccna-btn" onClick={() => { setIdx(i=>Math.min(cards.length-1,i+1)); setVolteada(false); }} disabled={idx===cards.length-1}
          style={{ background:COLOR, color:"#000", padding:"10px 20px", fontSize:13, flex:1 }}>Siguiente →</button>
      </div>
    </div>
  );
}

// ── SUBNETTING ───────────────────────────────────────────
function SubnettingView({ onBack }) {
  const [ejercicio, setEjercicio] = useState(() => EJERCICIOS_SUBNET[Math.floor(Math.random()*EJERCICIOS_SUBNET.length)]);
  const [respuestas, setRespuestas] = useState({ mascara:"", hosts:"", broadcast:"", primera:"", ultima:"" });
  const [verificado, setVerificado] = useState(false);
  const [resultados, setResultados] = useState({});

  const nuevoPregunta = () => {
    setEjercicio(EJERCICIOS_SUBNET[Math.floor(Math.random()*EJERCICIOS_SUBNET.length)]);
    setRespuestas({ mascara:"", hosts:"", broadcast:"", primera:"", ultima:"" });
    setVerificado(false);
    setResultados({});
  };

  const verificar = () => {
    const r = {};
    Object.keys(ejercicio.respuestas).forEach(k => {
      r[k] = String(respuestas[k]).trim() === String(ejercicio.respuestas[k]);
    });
    setResultados(r);
    setVerificado(true);
  };

  const campos = [
    { key:"mascara", label:"Máscara de subred", placeholder:"255.255.255.0" },
    { key:"hosts", label:"Hosts válidos", placeholder:"254" },
    { key:"broadcast", label:"Dirección de broadcast", placeholder:"192.168.1.255" },
    { key:"primera", label:"Primera IP válida", placeholder:"192.168.1.1" },
    { key:"ultima", label:"Última IP válida", placeholder:"192.168.1.254" },
  ];

  return (
    <div style={{ maxWidth:600, margin:"0 auto" }}>
      <button className="ccna-btn" onClick={onBack} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:20 }}>← CCNA Prep</button>
      <div style={{ color:COLOR, fontSize:11, letterSpacing:3, marginBottom:8 }}>CALCULADORA DE SUBNETTING</div>
      <div style={{ background:`${COLOR}11`, border:`2px solid ${COLOR}33`, borderRadius:12, padding:24, textAlign:"center", marginBottom:24 }}>
        <div style={{ color:C.muted, fontSize:12, marginBottom:8 }}>RED A SUBNETEAR:</div>
        <div style={{ color:"#fff", fontSize:28, fontWeight:"bold", fontFamily:"'Courier New',monospace" }}>
          {ejercicio.red}/{ejercicio.prefijo}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:20 }}>
        {campos.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label style={{ color:C.muted, fontSize:11, letterSpacing:2, display:"block", marginBottom:6 }}>{label.toUpperCase()}</label>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <input className="ccna-input" value={respuestas[key]} onChange={e => setRespuestas(p=>({...p,[key]:e.target.value}))}
                placeholder={placeholder} disabled={verificado}
                style={{ borderColor: verificado ? (resultados[key]?"#22c55e":"#ff3b3b") : "#1e2a3a" }}/>
              {verificado && <span style={{ fontSize:18 }}>{resultados[key]?"✅":"❌"}</span>}
            </div>
            {verificado && !resultados[key] && (
              <div style={{ color:"#22c55e", fontSize:12, marginTop:4, fontFamily:"monospace" }}>
                Correcto: {ejercicio.respuestas[key]}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:10 }}>
        {!verificado
          ? <button className="ccna-btn" onClick={verificar} style={{ background:COLOR, color:"#000", padding:"12px", fontSize:14, flex:1 }}>Verificar respuestas</button>
          : <button className="ccna-btn" onClick={nuevoPregunta} style={{ background:"#22c55e", color:"#000", padding:"12px", fontSize:14, flex:1 }}>Siguiente ejercicio →</button>
        }
      </div>
    </div>
  );
}

// ── SIMULACRO ────────────────────────────────────────────
function SimulacroView({ onBack }) {
  const TOTAL = 50;
  const TIEMPO = 60 * 60; // 60 minutos en segundos
  const [iniciado, setIniciado] = useState(false);
  const [preguntas] = useState(() => shuffle(PREGUNTAS_CCNA).slice(0, TOTAL));
  const [idx, setIdx] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [terminado, setTerminado] = useState(false);
  const [tiempo, setTiempo] = useState(TIEMPO);

  useEffect(() => {
    if (!iniciado || terminado) return;
    const iv = setInterval(() => {
      setTiempo(t => {
        if (t <= 1) { setTerminado(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [iniciado, terminado]);

  const mins = Math.floor(tiempo / 60);
  const segs = tiempo % 60;
  const tiempoColor = tiempo < 300 ? "#ff3b3b" : tiempo < 600 ? "#f59e0b" : "#22c55e";

  const responder = (idx_resp) => {
    setRespuestas(p => ({ ...p, [idx]: idx_resp }));
  };

  const finalizar = () => setTerminado(true);

  const calcularPuntaje = () => {
    let correctas = 0;
    preguntas.forEach((p, i) => { if (respuestas[i] === p.correcta) correctas++; });
    return { correctas, total: preguntas.length, pct: Math.round((correctas/preguntas.length)*100) };
  };

  if (!iniciado) return (
    <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center" }}>
      <button className="ccna-btn" onClick={onBack} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:24, display:"block", textAlign:"left" }}>← CCNA Prep</button>
      <div style={{ fontSize:48, marginBottom:16 }}>📊</div>
      <div style={{ color:COLOR, fontSize:11, letterSpacing:3, marginBottom:8 }}>SIMULACRO DE EXAMEN</div>
      <h2 style={{ color:"#fff", fontSize:22, marginBottom:16 }}>CCNA 200-301</h2>
      <div style={{ background:C.panel, border:`1px solid ${COLOR}33`, borderRadius:10, padding:20, marginBottom:24, textAlign:"left" }}>
        {[["📝 Preguntas", `${TOTAL} preguntas aleatorias`], ["⏱️ Tiempo", "60 minutos"], ["✅ Aprobación", "80% (40/50)"], ["🔀 Aleatoriedad", "Preguntas distintas cada vez"]].map(([k,v]) => (
          <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
            <span style={{ color:C.muted }}>{k}</span>
            <span style={{ color:"#fff" }}>{v}</span>
          </div>
        ))}
      </div>
      <button className="ccna-btn" onClick={() => setIniciado(true)} style={{ background:COLOR, color:"#000", padding:"14px 40px", fontSize:16 }}>
        🚀 Comenzar simulacro
      </button>
    </div>
  );

  if (terminado) {
    const { correctas, total, pct } = calcularPuntaje();
    const aprobado = pct >= 80;
    const porTema = {};
    TEMAS.forEach(t => {
      const del_tema = preguntas.filter((p,i) => p.tema===t);
      const correctas_tema = del_tema.filter((p,i) => {
        const idx_global = preguntas.indexOf(p);
        return respuestas[idx_global] === p.correcta;
      });
      if (del_tema.length > 0) porTema[t] = { correctas: correctas_tema.length, total: del_tema.length };
    });

    return (
      <div style={{ maxWidth:600, margin:"0 auto" }}>
        <div style={{ background:aprobado?"#051a0a":"#1a0505", border:`2px solid ${aprobado?"#22c55e":"#ff3b3b"}`, borderRadius:12, padding:28, textAlign:"center", marginBottom:24 }}>
          <div style={{ fontSize:48, marginBottom:10 }}>{aprobado?"🏆":"📚"}</div>
          <div style={{ color:aprobado?"#22c55e":"#ff6b35", fontSize:11, letterSpacing:3, marginBottom:8 }}>{aprobado?"¡APROBADO!":"NECESITAS REPASAR"}</div>
          <div style={{ color:aprobado?"#22c55e":"#ff3b3b", fontSize:40, fontWeight:"bold" }}>{pct}%</div>
          <div style={{ color:C.muted, fontSize:14, marginTop:8 }}>{correctas}/{total} correctas</div>
        </div>
        <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:10, padding:20, marginBottom:20 }}>
          <div style={{ color:COLOR, fontSize:11, letterSpacing:3, marginBottom:12 }}>RESULTADOS POR TEMA</div>
          {Object.entries(porTema).map(([tema, {correctas:c, total:t}]) => {
            const pct = Math.round((c/t)*100);
            return (
              <div key={tema} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                  <span style={{ color:"#fff" }}>{tema}</span>
                  <span style={{ color:pct>=80?"#22c55e":pct>=60?"#f59e0b":"#ff3b3b" }}>{c}/{t} ({pct}%)</span>
                </div>
                <div style={{ height:4, background:C.border, borderRadius:2, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${pct}%`, background:pct>=80?"#22c55e":pct>=60?"#f59e0b":"#ff3b3b", borderRadius:2 }}/>
                </div>
              </div>
            );
          })}
        </div>
        <button className="ccna-btn" onClick={() => { setIniciado(false); setTerminado(false); setIdx(0); setRespuestas({}); setTiempo(TIEMPO); }}
          style={{ background:COLOR, color:"#000", padding:"12px", fontSize:14, width:"100%" }}>
          🔄 Nuevo simulacro
        </button>
      </div>
    );
  }

  const preg = preguntas[idx];
  return (
    <div style={{ maxWidth:740, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <span style={{ color:C.muted, fontSize:12 }}>{idx+1}/{TOTAL}</span>
        <span style={{ color:tiempoColor, fontWeight:"bold", fontFamily:"monospace", fontSize:16 }}>
          ⏱️ {String(mins).padStart(2,"0")}:{String(segs).padStart(2,"0")}
        </span>
        <button className="ccna-btn" onClick={finalizar} style={{ background:"#ff3b3b22", color:"#ff6b6b", padding:"6px 14px", fontSize:11, border:"1px solid #ff3b3b44" }}>
          Finalizar
        </button>
      </div>
      <div style={{ height:3, background:C.border, borderRadius:2, overflow:"hidden", marginBottom:20 }}>
        <div style={{ height:"100%", width:`${(idx/TOTAL)*100}%`, background:COLOR, transition:"width 0.3s" }}/>
      </div>
      <div className="fade-in" key={idx} style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:10, padding:24, marginBottom:16, opacity:0 }}>
        <div style={{ color:C.muted, fontSize:10, marginBottom:8 }}>{preg.tema}</div>
        <div style={{ color:"#fff", fontSize:15, fontWeight:"600", lineHeight:1.5, marginBottom:16 }}>{preg.pregunta}</div>
        {preg.opciones.map((opt, i) => (
          <button key={i} className="ccna-opt"
            onClick={() => responder(i)}
            style={{ border:`1px solid ${respuestas[idx]===i?COLOR:C.border}`, color:respuestas[idx]===i?"#fff":"#8b949e", background:respuestas[idx]===i?`${COLOR}11`:C.panel }}>
            <span style={{ color:COLOR, marginRight:10, fontWeight:"bold" }}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        ))}
      </div>
      <div style={{ display:"flex", gap:10 }}>
        <button className="ccna-btn" onClick={() => setIdx(i=>Math.max(0,i-1))} disabled={idx===0} style={{ background:C.dim, color:C.muted, padding:"10px 20px", fontSize:13 }}>← Anterior</button>
        {idx < TOTAL-1
          ? <button className="ccna-btn" onClick={() => setIdx(i=>i+1)} style={{ background:COLOR, color:"#000", padding:"10px 20px", fontSize:13, flex:1 }}>Siguiente →</button>
          : <button className="ccna-btn" onClick={finalizar} style={{ background:"#22c55e", color:"#000", padding:"10px 20px", fontSize:13, flex:1 }}>✅ Finalizar examen</button>
        }
      </div>
    </div>
  );
}

// ── MAIN CCNA PREP ───────────────────────────────────────
export default function CCNAPrep() {
  const [vista, setVista] = useState("menu");

  const SECCIONES = [
    { id:"banco", icon:"📝", titulo:"Banco de Preguntas", desc:"60 preguntas organizadas por tema. Practica a tu ritmo.", color:"#3b82f6" },
    { id:"flash", icon:"🃏", titulo:"Flashcards", desc:"35 tarjetas con comandos, protocolos y conceptos clave.", color:"#8b5cf6" },
    { id:"subnet", icon:"🧮", titulo:"Simulador de Subnetting", desc:"Practica cálculos de subredes con ejercicios aleatorios.", color:"#f59e0b" },
    { id:"simulacro", icon:"📊", titulo:"Simulacro de Examen", desc:"50 preguntas en 60 minutos. Distintas cada vez. Resultado por tema.", color:"#22c55e" },
  ];

  if (vista === "banco") return <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9" }}><style>{CSS}</style><BancoPregunta onBack={() => setVista("menu")}/></div>;
  if (vista === "flash") return <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9" }}><style>{CSS}</style><FlashcardsView onBack={() => setVista("menu")}/></div>;
  if (vista === "subnet") return <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9" }}><style>{CSS}</style><SubnettingView onBack={() => setVista("menu")}/></div>;
  if (vista === "simulacro") return <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9" }}><style>{CSS}</style><SimulacroView onBack={() => setVista("menu")}/></div>;

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9" }}>
      <style>{CSS}</style>
      <div style={{ marginBottom:28 }}>
        <div style={{ color:COLOR, fontSize:11, letterSpacing:4, marginBottom:6 }}>◈ HACKFORGE // CCNA PREP</div>
        <h2 style={{ color:"#fff", fontSize:22, margin:"0 0 6px" }}>CCNA 200-301</h2>
        <p style={{ color:C.muted, fontSize:13, maxWidth:600 }}>Prepárate para la certificación CCNA de Cisco. Preguntas reales, flashcards y simulacros cronometrados.</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
        {SECCIONES.map((s, i) => (
          <div key={s.id} className="fade-in"
            onClick={() => setVista(s.id)}
            style={{ background:C.panel, border:`1px solid ${s.color}33`, borderRadius:10, padding:24, cursor:"pointer", animationDelay:`${i*60}ms`, transition:"all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=s.color+"66"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=s.color+"33"; e.currentTarget.style.transform="translateY(0)"; }}>
            <div style={{ fontSize:36, marginBottom:12 }}>{s.icon}</div>
            <div style={{ color:"#fff", fontWeight:"bold", fontSize:16, marginBottom:6 }}>{s.titulo}</div>
            <div style={{ color:C.muted, fontSize:13, lineHeight:1.5, marginBottom:12 }}>{s.desc}</div>
            <div style={{ color:s.color, fontSize:12, fontWeight:"bold" }}>Entrar →</div>
          </div>
        ))}
      </div>
    </div>
  );
}
