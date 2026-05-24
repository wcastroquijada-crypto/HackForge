import { LABS, FINAL, C } from '../../data/labs';

export default function LabMap({ doneLabs, labsXp, onOpenLab, onOpenFinal, flDone }) {
  const allDone = doneLabs.length === LABS.length;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter',sans-serif", color: "#c9d1d9", padding: 20 }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: C.cyan, fontSize: 11, letterSpacing: 4 }}>HACKFORGE // LABS</div>
        <h2 style={{ color: "#fff", fontSize: 22, margin: "6px 0" }}>⚗️ Laboratorio de Hacking</h2>
        <p style={{ color: C.muted, fontSize: 12 }}>Entornos vulnerables controlados · Aprende hackeando</p>
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          {[["XP Labs", labsXp, C.cyan], ["Completados", `${doneLabs.length}/4`, C.green]].map(([k, v, col]) => (
            <div key={k} style={{ background: C.panel, border: `1px solid ${C.border}`, padding: "7px 14px", borderRadius: 6, fontSize: 12 }}>
              <span style={{ color: col }}>{k}: </span>
              <span style={{ color: "#fff", fontWeight: "bold" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nivel Básico */}
      <Divider label="🟢 BÁSICO" color={C.green} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12, marginBottom: 24 }}>
        {LABS.map(lab => {
          const isDone = doneLabs.includes(lab.id);
          return (
            <div key={lab.id} onClick={() => onOpenLab(lab)}
              style={{ background: C.panel, border: `1px solid ${isDone ? lab.color : C.border}`, borderRadius: 8, padding: 16, cursor: "pointer", position: "relative", transition: "transform .15s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              {isDone && <span style={{ position: "absolute", top: 10, right: 12, color: lab.color }}>✓</span>}
              <div style={{ fontSize: 26, marginBottom: 8 }}>{lab.icon}</div>
              <div style={{ color: lab.color, fontSize: 10, letterSpacing: 2, marginBottom: 3 }}>BÁSICO</div>
              <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14, marginBottom: 2 }}>{lab.title}</div>
              <div style={{ color: C.muted, fontSize: 11, marginBottom: 10 }}>{lab.subtitle}</div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
                {lab.tags.map(t => (
                  <span key={t} style={{ background: `${lab.color}18`, border: `1px solid ${lab.color}33`, color: lab.color, fontSize: 9, padding: "2px 6px", borderRadius: 3 }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.muted }}>
                <span>⏱ {lab.time}</span>
                <span style={{ color: lab.color, fontWeight: "bold" }}>+{lab.xp} XP</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Niveles bloqueados */}
      {[["🟡 INTERMEDIO", C.yellow, ["OTP Bypass", "JWT Manipulation", "IDOR"]],
        ["🔴 AVANZADO", C.red, ["SSRF", "RCE"]]].map(([label, col, items]) => (
        <div key={label} style={{ marginBottom: 20 }}>
          <Divider label={label} color={col} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
            {items.map(t => (
              <div key={t} style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, opacity: 0.4 }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>🔒</div>
                <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{t}</div>
                <div style={{ color: C.muted, fontSize: 11 }}>Próximamente</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Lab Final */}
      <Divider label="🏆 LAB FINAL" color={C.yellow} />
      <div onClick={() => allDone && onOpenFinal()}
        style={{ background: C.panel, border: `2px solid ${allDone ? C.yellow : C.border}`, borderRadius: 10, padding: 24, textAlign: "center", opacity: allDone ? 1 : 0.4, cursor: allDone ? "pointer" : "not-allowed" }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏦</div>
        <div style={{ color: C.yellow, fontSize: 11, letterSpacing: 3, marginBottom: 4 }}>OPERACIÓN FINAL</div>
        <div style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 6 }}>OPERACIÓN: NEXUS BANK</div>
        <div style={{ color: C.muted, fontSize: 12, marginBottom: 10 }}>Combina las 4 técnicas del nivel básico</div>
        {!allDone && <div style={{ color: C.muted, fontSize: 11 }}>🔒 Completa los 4 labs básicos para desbloquear</div>}
        {allDone && !flDone && <div style={{ color: C.yellow, fontWeight: "bold" }}>+{FINAL.xp} XP · {FINAL.badge} · DISPONIBLE →</div>}
        {flDone && <div style={{ color: C.green, fontWeight: "bold" }}>✅ OPERACIÓN COMPLETADA</div>}
      </div>
    </div>
  );
}

function Divider({ label, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <div style={{ height: 1, flex: 1, background: `linear-gradient(to right,${color}44,transparent)` }} />
      <span style={{ color, fontSize: 11, letterSpacing: 3 }}>{label}</span>
      <div style={{ height: 1, flex: 1, background: `linear-gradient(to left,${color}44,transparent)` }} />
    </div>
  );
}