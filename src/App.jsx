import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import LabMap from "./components/Labs/LabMap";
import LabDetail from "./components/Labs/LabDetail";
import { C, FINAL } from "./data/labs";
import Modulos from "./components/Modulos/Modulos";
// Hook: estado que persiste en localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
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
`;

export default function App() {
  const [nav, setNav]           = useState("dash");
  const [labView, setLabView]   = useState("map");
  const [activeLab, setActiveLab] = useState(null);

  // Estado persistente
  const [doneLabs,  setDoneLabs]  = useLocalStorage("hf_doneLabs",  []);
  const [labsXp,    setLabsXp]    = useLocalStorage("hf_labsXp",    0);
  const [flStep,    setFlStep]    = useLocalStorage("hf_flStep",     0);
  const [flInputs,  setFlInputs]  = useLocalStorage("hf_flInputs",  {});
  const [flResults, setFlResults] = useLocalStorage("hf_flResults", {});
  const [flDone,    setFlDone]    = useLocalStorage("hf_flDone",    false);
  const [streak,    setStreak]    = useLocalStorage("hf_streak",    0);
  const [lastVisit, setLastVisit] = useLocalStorage("hf_lastVisit", null);
const [progresoMods, setProgresoMods] = useLocalStorage("hf_progresoMods", {});
  const totalXp = 1240 + labsXp;

  // Actualizar racha
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
    if (!doneLabs.includes(id)) {
      setDoneLabs(p => [...p, id]);
      setLabsXp(p => p + xp);
    }
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
  const resetProgress = () => {
    if (window.confirm("¿Resetear todo el progreso?")) {
      setDoneLabs([]); setLabsXp(0); setFlStep(0);
      setFlInputs({}); setFlResults({}); setFlDone(false); setStreak(0);
    }
  };

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", background:C.bg, color:"#c9d1d9" }}>
      <style>{CSS}</style>

      {/* SIDEBAR */}
      <aside style={{ width:210, background:C.panel, borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column", padding:"16px 12px", flexShrink:0, overflowY:"auto" }}>
        <div style={{ marginBottom:20, paddingBottom:16, borderBottom:`1px solid ${C.border}` }}>
          <div style={{ color:C.cyan, fontSize:10, letterSpacing:4 }}>◈ HACKFORGE</div>
          <div style={{ color:"#fff", fontSize:15, fontWeight:"bold", marginTop:4 }}>Base Operaciones</div>
          <div style={{ color:C.muted, fontSize:10, marginTop:2 }}>CYBER ANALYST · Lv.3</div>
        </div>

        <div style={{ marginBottom:18, padding:"10px 12px", background:C.bg, borderRadius:6, border:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:C.muted, marginBottom:5 }}>
            <span style={{ color:C.cyan }}>{totalXp} XP</span><span>2000 XP</span>
          </div>
          <div style={{ height:4, background:C.border, borderRadius:2, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${Math.min(100,(totalXp/2000)*100)}%`, background:`linear-gradient(to right,${C.cyan},${C.green})`, borderRadius:2, transition:"width 0.5s" }}/>
          </div>
          <div style={{ color:C.muted, fontSize:10, marginTop:4 }}>🔥 Racha: {streak} días</div>
        </div>

        {[
          { id:"dash", icon:"🏠", label:"Dashboard" },
          { id:"labs", icon:"⚗️",  label:"Labs"      },
          { id:"mods", icon:"📚", label:"Módulos"   },
          { id:"cq",   icon:"🎮", label:"CodeQuest" },
          { id:"ccna", icon:"📡", label:"CCNA Prep" },
        ].map(n=>(
          <div key={n.id} className="nav-item"
            onClick={()=>{ setNav(n.id); if(n.id==="labs") setLabView("map"); }}
            style={{ color:nav===n.id?"#fff":C.muted, background:nav===n.id?`${C.cyan}18`:"transparent", borderColor:nav===n.id?`${C.cyan}44`:"transparent" }}>
            <span style={{ fontSize:16 }}>{n.icon}</span>
            <span>{n.label}</span>
            {n.id==="labs"&&doneLabs.length>0&&<span style={{ marginLeft:"auto", color:C.green, fontSize:10 }}>{doneLabs.length}✓</span>}
          </div>
        ))}

        <div style={{ marginTop:"auto" }}>
          <button onClick={resetProgress} style={{ width:"100%", background:"transparent", border:`1px solid ${C.border}`, color:C.muted, padding:"6px", borderRadius:4, fontSize:10, cursor:"pointer", marginBottom:10 }}>
            🔄 Resetear progreso
          </button>
          <div style={{ padding:"10px 12px", background:`${C.cyan}11`, border:`1px solid ${C.cyan}33`, borderRadius:6, fontSize:11 }}>
            <div style={{ color:C.cyan, fontWeight:"bold" }}>⚡ PLAN PRO</div>
            <div style={{ color:C.muted, fontSize:10, marginTop:2 }}>Acceso completo</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{ flex:1, overflowY:"auto", padding:"24px" }}>

        {nav==="dash" && <Dashboard totalXp={totalXp} doneLabs={doneLabs} labsXp={labsXp} streak={streak} onNav={setNav}/>}

        {nav==="labs" && labView==="map" && <LabMap doneLabs={doneLabs} labsXp={labsXp} onOpenLab={openLab} onOpenFinal={()=>setLabView("final")} flDone={flDone}/>}

        {nav==="labs" && labView==="detail" && activeLab && <LabDetail lab={activeLab} onBack={backToMap} onComplete={completeLab}/>}

        {nav==="labs" && labView==="final" && (
          <div style={{ maxWidth:720, margin:"0 auto" }}>
            <button className="btn" onClick={backToMap} style={{ background:C.dim, color:C.muted, padding:"8px 16px", fontSize:12, marginBottom:20 }}>← Volver al mapa</button>
            <div style={{ textAlign:"center", marginBottom:28 }}>
              <div style={{ fontSize:44, marginBottom:10 }}>🏦</div>
              <div style={{ color:C.yellow, fontSize:11, letterSpacing:4 }}>OPERACIÓN FINAL</div>
              <h2 style={{ color:"#fff", fontSize:20, margin:"8px 0" }}>OPERACIÓN: NEXUS BANK</h2>
              <p style={{ color:C.muted, fontSize:12 }}>Compromete NexusBank usando las 4 técnicas en secuencia.</p>
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
                    {ok&&<span style={{ color:C.green, fontSize:20 }}>✓</span>}
                  </div>
                  {unlocked&&!ok&&(
                    <div style={{ display:"flex", gap:8 }}>
                      <input value={flInputs[i]||""} onChange={e=>setFlInputs(p=>({...p,[i]:e.target.value}))} placeholder={obj.ph} onKeyDown={e=>e.key==="Enter"&&submitFinal(i)}
                        style={{ flex:1, background:"#050810", border:`1px solid ${C.border}`, color:C.cyan, padding:"10px 12px", borderRadius:5, fontFamily:"'Courier New',monospace", fontSize:12, outline:"none" }}/>
                      <button className="btn" onClick={()=>submitFinal(i)} style={{ background:C.yellow, color:"#000", padding:"10px 16px", fontSize:12 }}>Ejecutar</button>
                    </div>
                  )}
                  {flResults[i]==="fail"&&<div style={{ color:C.red, fontSize:11, marginTop:8 }}>❌ Incorrecto. Revisa el lab correspondiente.</div>}
                </div>
              );
            })}
            {flDone&&(
              <div style={{ background:"#051a0a", border:`2px solid ${C.green}`, borderRadius:10, padding:28, textAlign:"center", marginTop:20 }}>
                <div style={{ fontSize:40, marginBottom:10 }}>🏆</div>
                <div style={{ color:C.green, fontSize:14, letterSpacing:3, marginBottom:8 }}>¡OPERACIÓN COMPLETADA!</div>
                <div style={{ color:"#fff", fontSize:18, fontWeight:"bold", marginBottom:14 }}>Nivel Básico Superado</div>
                <div style={{ background:"#050810", border:`1px solid ${C.green}44`, padding:10, borderRadius:5, marginBottom:14 }}>
                  <div style={{ color:C.muted, fontSize:10, marginBottom:3 }}>🚩 FLAG FINAL</div>
                  <div style={{ color:C.green, fontSize:12, wordBreak:"break-all" }}>{FINAL.flag}</div>
                </div>
                <div style={{ color:C.yellow, fontSize:13 }}>+{FINAL.xp} XP · {FINAL.badge}</div>
                <button className="btn" onClick={backToMap} style={{ background:C.green, color:"#000", padding:"11px 22px", fontSize:13, marginTop:14 }}>← Volver al mapa</button>
              </div>
            )}
          </div>
        )}

{nav==="mods" && (
  <Modulos progresoMods={progresoMods} onCompletarLeccion={completarLeccion}/>
)}

        {nav==="cq"&&(
          <div style={{ textAlign:"center", paddingTop:60 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🎮</div>
            <div style={{ color:C.cyan, fontSize:11, letterSpacing:4, marginBottom:8 }}>HACKFORGE // CODEQUEST</div>
            <h2 style={{ color:"#fff", fontSize:20, marginBottom:12 }}>CodeQuest</h2>
            <p style={{ color:C.muted, fontSize:13, maxWidth:400, margin:"0 auto 24px" }}>Próximamente: Misiones de hacking en código con XP, teoría y retos progresivos.</p>
            <div style={{ display:"inline-block", background:`${C.cyan}11`, border:`1px solid ${C.cyan}33`, borderRadius:8, padding:"12px 24px", color:C.cyan, fontSize:12 }}>🚧 Próximamente</div>
          </div>
        )}

        {nav==="ccna"&&(
          <div style={{ textAlign:"center", paddingTop:60 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>📡</div>
            <div style={{ color:C.cyan, fontSize:11, letterSpacing:4, marginBottom:8 }}>HACKFORGE // CCNA PREP</div>
            <h2 style={{ color:"#fff", fontSize:20, marginBottom:12 }}>CCNA Prep Zone</h2>
            <p style={{ color:C.muted, fontSize:13, maxWidth:400, margin:"0 auto 24px" }}>Próximamente: Preguntas CCNA 200-301, simulador Packet Tracer y flashcards.</p>
            <div style={{ display:"inline-block", background:`${C.cyan}11`, border:`1px solid ${C.cyan}33`, borderRadius:8, padding:"12px 24px", color:C.cyan, fontSize:12 }}>🚧 Próximamente</div>
          </div>
        )}
      </main>
    </div>
  );
}