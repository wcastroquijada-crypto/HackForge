import { C } from '../../data/labs';

const OP = {
  name: "W4LD0_SEC",
  rank: "CYBER ANALYST",
  rankLevel: 3,
  xp: 1240,
  xpNext: 2000,
  streak: 7,
  joinDate: "ENE 2025",
  stats: {
    modulesCompleted: 4, lessonsCompleted: 11, quizzesPassed: 9,
    codeQuestWins: 3, hoursStudied: 18, accuracy: 84,
    flagsCaptured: 2, rank: 142, totalUsers: 8420,
  },
  badges: [
    { id:1, icon:"🛡️", name:"Primer Escudo",  desc:"Completaste tu primer módulo",   earned:true,  color:C.cyan   },
    { id:2, icon:"🔥", name:"Racha x7",        desc:"7 días consecutivos estudiando", earned:true,  color:C.orange },
    { id:3, icon:"⚡", name:"Velocista",        desc:"Quiz en menos de 60s",           earned:true,  color:C.yellow },
    { id:4, icon:"🎯", name:"Precisión 100%",  desc:"Quiz perfecto sin errores",      earned:true,  color:C.green  },
    { id:5, icon:"🕵️", name:"Analista",         desc:"Completa 10 lecciones",         earned:false, color:C.cyan   },
    { id:6, icon:"💀", name:"Red Team",         desc:"Desbloquea módulo Pentesting",   earned:false, color:C.red    },
    { id:7, icon:"🧠", name:"Arquitecto",       desc:"Completa la Ruta completa",      earned:false, color:C.purple },
    { id:8, icon:"👑", name:"Elite Operator",  desc:"Alcanza rango 5",                earned:false, color:C.yellow },
  ],
  activity: [
    { day:"LUN", val:3 }, { day:"MAR", val:5 }, { day:"MIÉ", val:2 },
    { day:"JUE", val:4 }, { day:"VIE", val:6 }, { day:"SÁB", val:1 }, { day:"DOM", val:4 },
  ],
  recentActivity: [
    { icon:"🎯", text:"Completaste el quiz de SQL Injection",  xp:"+50 XP",  time:"Hace 2h", color:C.green  },
    { icon:"🔬", text:"Completaste el Lab: BancoSeguro",        xp:"+150 XP", time:"Hace 3h", color:C.cyan   },
    { icon:"📖", text:"Leíste 3 lecciones de Fundamentos",      xp:"+30 XP",  time:"Ayer",    color:C.yellow },
    { icon:"🏆", text:"Desbloqueaste badge: Racha x7",          xp:"Badge",   time:"Ayer",    color:C.orange },
    { icon:"🎯", text:"Quiz de Redes y Protocolos: 92%",        xp:"+45 XP",  time:"Hace 2d", color:C.green  },
  ],
  modules: [
    { id:1, icon:"🛡️", name:"Fundamentos",       tag:"FREE", progress:75, lessons:8,  done:6, color:C.cyan   },
    { id:2, icon:"🌐", name:"Redes & Protocolos", tag:"FREE", progress:30, lessons:10, done:3, color:C.green  },
    { id:3, icon:"🔍", name:"Reconocimiento",     tag:"FREE", progress:0,  lessons:8,  done:0, color:C.yellow },
    { id:4, icon:"⚔️",  name:"Pentesting Web",    tag:"PRO",  progress:0,  lessons:12, done:0, color:C.orange },
    { id:5, icon:"🔐", name:"Criptografía",       tag:"PRO",  progress:0,  lessons:10, done:0, color:C.purple },
  ],
  nextMission: {
    icon:"🌐", title:"Redes y Protocolos", lesson:"Protocolos Esenciales",
    desc:"Continúa donde lo dejaste — DNS, HTTP y puertos clave",
    progress:30, color:C.green,
  },
};

const RANKS = ["RECRUIT","SPECIALIST","CYBER ANALYST","SENIOR ANALYST","RED OPERATOR","ELITE"];

export default function Dashboard({ totalXp, doneLabs, labsXp, streak, onNav, nombre }) {
  const xp = totalXp || OP.xp + labsXp;
  const xpPercent = Math.min(100, (xp / OP.xpNext) * 100);
  const maxActivity = Math.max(...OP.activity.map(a => a.val));

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", color:"#c9d1d9" }}>

      {/* HEADER */}
      <div style={{ marginBottom:24 }}>
        <div style={{ color:C.cyan, fontSize:11, letterSpacing:4, marginBottom:6 }}>HACKFORGE // DASHBOARD</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
          <div>
            <h1 style={{ color:"#fff", fontSize:24, margin:"0 0 4px" }}>
              Bienvenido, <span style={{ color:C.cyan }}>{nombre || OP.name}</span>
            </h1>
            <div style={{ color:C.muted, fontSize:13 }}>
              {OP.rank} · Nivel {OP.rankLevel} · Miembro desde {OP.joinDate}
            </div>
          </div>
          <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 16px", textAlign:"center" }}>
            <div style={{ color:C.yellow, fontSize:10, letterSpacing:2 }}>RANKING GLOBAL</div>
            <div style={{ color:"#fff", fontSize:20, fontWeight:"bold" }}>#{OP.stats.rank}</div>
            <div style={{ color:C.muted, fontSize:10 }}>de {OP.stats.totalUsers.toLocaleString()} usuarios</div>
          </div>
        </div>
      </div>

      {/* XP BAR */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:10, padding:20, marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <div>
            <div style={{ color:"#fff", fontWeight:"bold", fontSize:16 }}>Progreso de Nivel</div>
            <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>
              {RANKS[OP.rankLevel-1]} → {RANKS[OP.rankLevel]}
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ color:C.cyan, fontWeight:"bold", fontSize:22 }}>{xp.toLocaleString()} XP</div>
            <div style={{ color:C.muted, fontSize:11 }}>Meta: {OP.xpNext.toLocaleString()} XP</div>
          </div>
        </div>
        <div style={{ height:8, background:C.border, borderRadius:4, overflow:"hidden", marginBottom:8 }}>
          <div style={{ height:"100%", width:`${xpPercent}%`, background:`linear-gradient(to right,${C.cyan},${C.green})`, borderRadius:4, transition:"width 0.8s ease" }}/>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:C.muted }}>
          <span style={{ color:C.green }}>🔥 Racha: {streak || OP.streak} días consecutivos</span>
          <span>{Math.round(xpPercent)}% completado</span>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:12, marginBottom:20 }}>
        {[
          { label:"XP Total",        val:xp.toLocaleString(),       icon:"⚡", color:C.cyan,   sub:"puntos de experiencia" },
          { label:"Módulos",          val:OP.stats.modulesCompleted, icon:"📚", color:C.green,  sub:"de 5 completados"      },
          { label:"Labs completados", val:`${doneLabs.length}/28`,    icon:"⚗️",  color:C.purple, sub:"nivel básico"          },
          { label:"Flags capturadas", val:doneLabs.length,    icon:"🚩", color:C.red,    sub:"en labs"               },
          { label:"Racha",            val:`${OP.streak} días`,       icon:"🔥", color:C.orange, sub:"consecutivos"          },
          { label:"Precisión Quiz",   val:`${OP.stats.accuracy}%`,   icon:"🎯", color:C.yellow, sub:"promedio global"       },
          { label:"Lecciones",        val:OP.stats.lessonsCompleted, icon:"📖", color:C.cyan,   sub:"completadas"           },
          { label:"Horas estudiadas", val:OP.stats.hoursStudied,     icon:"⏱",  color:C.muted,  sub:"tiempo total"          },
        ].map(s=>(
          <div key={s.label} style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:14 }}>
            <div style={{ fontSize:20, marginBottom:6 }}>{s.icon}</div>
            <div style={{ color:s.color, fontSize:18, fontWeight:"bold" }}>{s.val}</div>
            <div style={{ color:"#fff", fontSize:11, marginTop:2 }}>{s.label}</div>
            <div style={{ color:C.muted, fontSize:10, marginTop:1 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ACTIVIDAD + PRÓXIMA MISIÓN */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
        <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:10, padding:18 }}>
          <div style={{ color:"#fff", fontWeight:"bold", fontSize:14, marginBottom:4 }}>Actividad Semanal</div>
          <div style={{ color:C.muted, fontSize:11, marginBottom:16 }}>Lecciones completadas por día</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:80 }}>
            {OP.activity.map((a,i)=>(
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <div style={{ fontSize:10, color:C.cyan, fontWeight:"bold" }}>{a.val}</div>
                <div style={{ width:"100%", height:`${(a.val/maxActivity)*60}px`, background:i===6?C.cyan:`${C.cyan}55`, borderRadius:"3px 3px 0 0", minHeight:4 }}/>
                <div style={{ fontSize:9, color:C.muted }}>{a.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:C.panel, border:`1px solid ${OP.nextMission.color}44`, borderRadius:10, padding:18 }}>
          <div style={{ color:"#fff", fontWeight:"bold", fontSize:14, marginBottom:4 }}>Continuar donde dejaste</div>
          <div style={{ color:C.muted, fontSize:11, marginBottom:16 }}>Próxima misión sugerida</div>
          <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:14 }}>
            <span style={{ fontSize:28 }}>{OP.nextMission.icon}</span>
            <div>
              <div style={{ color:OP.nextMission.color, fontSize:11, letterSpacing:2, marginBottom:3 }}>{OP.nextMission.title}</div>
              <div style={{ color:"#fff", fontWeight:"bold", fontSize:14 }}>{OP.nextMission.lesson}</div>
              <div style={{ color:C.muted, fontSize:12, marginTop:3 }}>{OP.nextMission.desc}</div>
            </div>
          </div>
          <div style={{ height:4, background:C.border, borderRadius:2, overflow:"hidden", marginBottom:12 }}>
            <div style={{ height:"100%", width:`${OP.nextMission.progress}%`, background:OP.nextMission.color, borderRadius:2 }}/>
          </div>
          <button onClick={()=>onNav("mods")} style={{ background:OP.nextMission.color, color:"#000", border:"none", padding:"9px 18px", borderRadius:5, fontSize:12, fontWeight:"bold", cursor:"pointer", width:"100%", fontFamily:"'Inter',sans-serif" }}>
            Continuar →
          </button>
        </div>
      </div>

      {/* MÓDULOS */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:10, padding:18, marginBottom:20 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div>
            <div style={{ color:"#fff", fontWeight:"bold", fontSize:14 }}>Ruta Ciberseguridad</div>
            <div style={{ color:C.muted, fontSize:11, marginTop:2 }}>Tu progreso en cada módulo</div>
          </div>
          <button onClick={()=>onNav("mods")} style={{ background:"transparent", border:`1px solid ${C.border}`, color:C.cyan, padding:"5px 12px", borderRadius:4, fontSize:11, cursor:"pointer", fontFamily:"'Inter',sans-serif" }}>Ver todos →</button>
        </div>
        {OP.modules.map(m=>(
          <div key={m.id} style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:18 }}>{m.icon}</span>
                <span style={{ color:"#fff", fontSize:13, fontWeight:"500" }}>{m.name}</span>
                <span style={{ background:m.tag==="PRO"?`${C.cyan}22`:`${C.green}22`, color:m.tag==="PRO"?C.cyan:C.green, fontSize:9, padding:"1px 6px", borderRadius:3, border:`1px solid ${m.tag==="PRO"?C.cyan+"44":C.green+"44"}` }}>{m.tag}</span>
              </div>
              <div>
                <span style={{ color:m.color, fontSize:12, fontWeight:"bold" }}>{m.done}/{m.lessons}</span>
                <span style={{ color:C.muted, fontSize:11 }}> lecciones</span>
              </div>
            </div>
            <div style={{ height:4, background:C.border, borderRadius:2, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${m.progress}%`, background:m.color, borderRadius:2 }}/>
            </div>
          </div>
        ))}
      </div>

      {/* ACTIVIDAD RECIENTE */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:10, padding:18, marginBottom:20 }}>
        <div style={{ color:"#fff", fontWeight:"bold", fontSize:14, marginBottom:4 }}>Actividad Reciente</div>
        <div style={{ color:C.muted, fontSize:11, marginBottom:16 }}>Tus últimas acciones en HACKFORGE</div>
        {OP.recentActivity.map((a,i)=>(
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:i<OP.recentActivity.length-1?`1px solid ${C.border}`:"none" }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:`${a.color}22`, border:`1px solid ${a.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{a.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ color:"#fff", fontSize:13 }}>{a.text}</div>
              <div style={{ color:C.muted, fontSize:11, marginTop:2 }}>{a.time}</div>
            </div>
            <div style={{ color:a.color, fontWeight:"bold", fontSize:12, whiteSpace:"nowrap" }}>{a.xp}</div>
          </div>
        ))}
      </div>

      {/* BADGES */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:10, padding:18, marginBottom:20 }}>
        <div style={{ color:"#fff", fontWeight:"bold", fontSize:14, marginBottom:4 }}>Badges</div>
        <div style={{ color:C.muted, fontSize:11, marginBottom:16 }}>{OP.badges.filter(b=>b.earned).length}/{OP.badges.length} desbloqueados</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:10 }}>
          {OP.badges.map(b=>(
            <div key={b.id} style={{ background:b.earned?`${b.color}11`:C.bg, border:`1px solid ${b.earned?b.color+"44":C.border}`, borderRadius:8, padding:12, opacity:b.earned?1:0.4, display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:22 }}>{b.icon}</span>
              <div>
                <div style={{ color:b.earned?"#fff":C.muted, fontSize:12, fontWeight:"bold" }}>{b.name}</div>
                <div style={{ color:C.muted, fontSize:10, marginTop:2 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RANKING */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:10, padding:18 }}>
        <div style={{ color:"#fff", fontWeight:"bold", fontSize:14, marginBottom:4 }}>Ranking Global</div>
        <div style={{ color:C.muted, fontSize:11, marginBottom:16 }}>Top operadores de HACKFORGE LATAM</div>
        {[
          { pos:1,   name:"r00t_mx",    xp:8420, rank:"ELITE",        color:C.yellow },
          { pos:2,   name:"n3t_hunter", xp:7190, rank:"RED OPERATOR", color:C.red    },
          { pos:3,   name:"cyb3r_cl",   xp:6830, rank:"RED OPERATOR", color:C.red    },
          { pos:"…", name:"",           xp:null, rank:"",             color:C.muted  },
          { pos:OP.stats.rank, name:OP.name, xp:xp, rank:OP.rank, color:C.cyan, isYou:true },
        ].map((u,i)=>(
          u.name===""?(
            <div key={i} style={{ textAlign:"center", color:C.muted, fontSize:12, padding:"6px 0" }}>• • •</div>
          ):(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", borderRadius:6, background:u.isYou?`${C.cyan}11`:"transparent", border:u.isYou?`1px solid ${C.cyan}33`:"1px solid transparent", marginBottom:4 }}>
              <div style={{ width:28, textAlign:"center", color:u.pos<=3?C.yellow:C.muted, fontWeight:"bold", fontSize:13 }}>
                {u.pos<=3?["🥇","🥈","🥉"][u.pos-1]:`#${u.pos}`}
              </div>
              <div style={{ flex:1 }}>
                <span style={{ color:u.isYou?C.cyan:"#fff", fontWeight:u.isYou?"bold":"normal", fontSize:13 }}>{u.name}</span>
                {u.isYou&&<span style={{ color:C.cyan, fontSize:10, marginLeft:8 }}>← tú</span>}
                <div style={{ color:C.muted, fontSize:10, marginTop:1 }}>{u.rank}</div>
              </div>
              {u.xp&&<div style={{ color:u.color, fontWeight:"bold", fontSize:12 }}>{u.xp.toLocaleString()} XP</div>}
            </div>
          )
        ))}
      </div>
    </div>
  );
}




