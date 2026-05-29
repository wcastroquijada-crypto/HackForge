const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src", "App.jsx");
let code = fs.readFileSync(filePath, "utf8");

// ── DATOS DE MISIONES ──────────────────────────────────────────
const MISIONES_DATA = `
const CQ_MISIONES = [
  {
    id:"cq1", icono:"🔍", titulo:"Escáner de Puertos",
    dificultad:"Fácil", xp:80, lenguaje:"Python",
    descripcion:"Escribe un script que escanee los puertos 1-1024 de una IP y liste los que están abiertos.",
    pistas:["Usa el módulo socket","Prueba socket.connect_ex()","Un timeout de 0.5s evita esperas largas"],
    solucion:\`import socket
def escanear(ip):
    abiertos = []
    for p in range(1, 1025):
        s = socket.socket()
        s.settimeout(0.5)
        if s.connect_ex((ip, p)) == 0:
            abiertos.append(p)
        s.close()
    return abiertos
print(escanear("127.0.0.1"))\`,
  },
  {
    id:"cq2", icono:"🔐", titulo:"Cifrado César",
    dificultad:"Fácil", xp:60, lenguaje:"Python",
    descripcion:"Implementa el cifrado César: desplaza cada letra del mensaje N posiciones en el alfabeto.",
    pistas:["Usa ord() y chr()","Recuerda manejar mayúsculas y minúsculas","El módulo 26 hace el ciclo"],
    solucion:\`def cesar(msg, n):
    r = ""
    for c in msg:
        if c.isalpha():
            b = ord('A') if c.isupper() else ord('a')
            r += chr((ord(c) - b + n) % 26 + b)
        else:
            r += c
    return r
print(cesar("Hola Mundo", 3))\`,
  },
  {
    id:"cq3", icono:"🌐", titulo:"Analizador de Headers HTTP",
    dificultad:"Medio", xp:100, lenguaje:"Python",
    descripcion:"Haz un GET a una URL y muestra los headers de seguridad que contiene la respuesta.",
    pistas:["Usa el módulo requests","response.headers es un dict","Busca: content-security-policy, strict-transport-security, x-frame-options"],
    solucion:\`import requests
def analizar(url):
    r = requests.get(url, timeout=5)
    seg = ["content-security-policy","strict-transport-security",
           "x-frame-options","x-content-type-options","x-xss-protection"]
    for h in seg:
        val = r.headers.get(h, "No encontrado")
        print(f"{h}: {val}")
analizar("https://example.com")\`,
  },
  {
    id:"cq4", icono:"💾", titulo:"Generador de Hashes",
    dificultad:"Fácil", xp:70, lenguaje:"Python",
    descripcion:"Dado un texto, genera su hash en MD5, SHA-1 y SHA-256 e imprímelos.",
    pistas:["Usa hashlib","Necesitas .encode() antes de hashear","hashlib.md5(), hashlib.sha1(), hashlib.sha256()"],
    solucion:\`import hashlib
def hashes(txt):
    b = txt.encode()
    print("MD5:   ", hashlib.md5(b).hexdigest())
    print("SHA1:  ", hashlib.sha1(b).hexdigest())
    print("SHA256:", hashlib.sha256(b).hexdigest())
hashes("hackforge")\`,
  },
  {
    id:"cq5", icono:"🛡️", titulo:"Detector de SQL Injection",
    dificultad:"Medio", xp:120, lenguaje:"Python",
    descripcion:"Escribe una función que detecte si un string contiene patrones típicos de SQL Injection.",
    pistas:["Busca palabras clave: OR, UNION, SELECT, DROP","Las comillas simples son sospechosas","Usa expresiones regulares"],
    solucion:\`import re
def detectar_sqli(inp):
    patrones = [r"(\\\\bOR\\\\b|\\\\bUNION\\\\b|\\\\bSELECT\\\\b|\\\\bDROP\\\\b)",
                r"['\\"]\\\\s*(--|#)", r"1\\\\s*=\\\\s*1"]
    for p in patrones:
        if re.search(p, inp, re.IGNORECASE):
            return "Posible SQLi detectado"
    return "Input limpio"
print(detectar_sqli("' OR 1=1 --"))\`,
  },
];
`;

// ── COMPONENTE CODEQUEST ───────────────────────────────────────
const CQ_COMPONENT = `
function CodeQuestView({ progresoMisiones, onCompletar }) {
  const [sel, setSel] = React.useState(null);
  const [verSol, setVerSol] = React.useState(false);
  const [verPistas, setVerPistas] = React.useState(false);
  const C2 = { bg:"#040c18", panel:"#071628", border:"#0a2540", cyan:"#00d4ff", green:"#00ff88", red:"#ff3366", muted:"#4a7a9b", text:"#cdd9e5" };

  if (sel) {
    const m = CQ_MISIONES.find(x => x.id === sel);
    const comp = progresoMisiones && progresoMisiones[m.id];
    return (
      <div>
        <button onClick={() => { setSel(null); setVerSol(false); setVerPistas(false); }}
          style={{ background:"none", border:"1px solid "+C2.border, color:C2.cyan, borderRadius:6, padding:"6px 14px", cursor:"pointer", fontSize:12, marginBottom:20 }}>
          ← Volver
        </button>
        <div style={{ color:C2.cyan, fontSize:10, letterSpacing:4, fontFamily:"monospace", marginBottom:8 }}>CODEQUEST // {m.lenguaje}</div>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
          <span style={{fontSize:32}}>{m.icono}</span>
          <div>
            <h2 style={{ color:"#fff", fontSize:18, margin:0 }}>{m.titulo}</h2>
            <div style={{ display:"flex", gap:8, marginTop:6 }}>
              <span style={{ background:C2.cyan+"22", color:C2.cyan, fontSize:11, padding:"2px 8px", borderRadius:4 }}>{m.dificultad}</span>
              <span style={{ background:C2.green+"22", color:C2.green, fontSize:11, padding:"2px 8px", borderRadius:4 }}>+{m.xp} XP</span>
            </div>
          </div>
        </div>
        <div style={{ background:C2.panel, border:"1px solid "+C2.border, borderRadius:8, padding:20, marginBottom:16 }}>
          <div style={{ color:C2.muted, fontSize:11, marginBottom:8, fontFamily:"monospace", letterSpacing:2 }}>MISIÓN</div>
          <p style={{ color:C2.text, fontSize:14, lineHeight:1.7, margin:0 }}>{m.descripcion}</p>
        </div>
        <button onClick={() => setVerPistas(!verPistas)}
          style={{ width:"100%", background:verPistas ? C2.cyan+"22":"none", border:"1px solid "+C2.cyan+"44", color:C2.cyan, borderRadius:6, padding:"8px 16px", cursor:"pointer", fontSize:12, marginBottom:10 }}>
          💡 {verPistas ? "Ocultar pistas" : "Ver pistas"}
        </button>
        {verPistas && (
          <div style={{ background:C2.panel, border:"1px solid "+C2.cyan+"33", borderRadius:8, padding:16, marginBottom:10 }}>
            {m.pistas.map((p,i) => (
              <div key={i} style={{ color:C2.text, fontSize:13, padding:"6px 0", borderBottom: i<m.pistas.length-1?"1px solid "+C2.border:"none" }}>
                <span style={{color:C2.cyan}}>▸</span> {p}
              </div>
            ))}
          </div>
        )}
        <button onClick={() => setVerSol(!verSol)}
          style={{ width:"100%", background:verSol ? C2.red+"22":"none", border:"1px solid "+C2.red+"44", color:C2.red, borderRadius:6, padding:"8px 16px", cursor:"pointer", fontSize:12, marginBottom:10 }}>
          👁 {verSol ? "Ocultar solución" : "Ver solución (spoiler)"}
        </button>
        {verSol && (
          <div style={{ background:"#010810", border:"1px solid "+C2.border, borderRadius:8, padding:16, marginBottom:16 }}>
            <div style={{ display:"flex", gap:6, marginBottom:10 }}>
              {["#ff5f57","#ffbd2e","#28c940"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }}/>)}
            </div>
            <pre style={{ color:C2.green, fontFamily:"monospace", fontSize:12, margin:0, whiteSpace:"pre-wrap", lineHeight:1.7 }}>{m.solucion}</pre>
          </div>
        )}
        {!comp ? (
          <button onClick={() => onCompletar(m.id, m.xp)}
            style={{ width:"100%", background:C2.cyan, color:"#000", border:"none", borderRadius:8, padding:"12px", cursor:"pointer", fontWeight:700, fontSize:14 }}>
            ✓ Marcar completada (+{m.xp} XP)
          </button>
        ) : (
          <div style={{ background:C2.green+"22", border:"1px solid "+C2.green+"44", borderRadius:8, padding:"12px", textAlign:"center", color:C2.green, fontWeight:600 }}>
            ✅ ¡Misión completada!
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ color:C2.cyan, fontSize:10, letterSpacing:4, fontFamily:"monospace", marginBottom:8 }}>HACKFORGE // CODEQUEST</div>
      <h2 style={{ color:"#fff", fontSize:20, marginBottom:8 }}>CodeQuest</h2>
      <p style={{ color:C2.muted, fontSize:13, marginBottom:24 }}>Misiones de código con enfoque en ciberseguridad. Completa cada una para ganar XP.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:14 }}>
        {CQ_MISIONES.map(m => {
          const comp = progresoMisiones && progresoMisiones[m.id];
          return (
            <div key={m.id} onClick={() => setSel(m.id)}
              style={{ background:C2.panel, border:"1px solid "+(comp ? C2.green+"44":C2.border), borderRadius:10, padding:18, cursor:"pointer" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <span style={{fontSize:28}}>{m.icono}</span>
                {comp && <span style={{color:C2.green}}>✅</span>}
              </div>
              <div style={{ color:"#fff", fontWeight:600, fontSize:14, marginBottom:6 }}>{m.titulo}</div>
              <div style={{ color:C2.muted, fontSize:12, marginBottom:10, lineHeight:1.5 }}>{m.descripcion.slice(0,75)}...</div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                <span style={{ background:C2.cyan+"22", color:C2.cyan, fontSize:11, padding:"2px 8px", borderRadius:4 }}>{m.dificultad}</span>
                <span style={{ background:C2.green+"22", color:C2.green, fontSize:11, padding:"2px 8px", borderRadius:4 }}>+{m.xp} XP</span>
                <span style={{ background:C2.border, color:C2.muted, fontSize:11, padding:"2px 8px", borderRadius:4 }}>{m.lenguaje}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`;

// ── HACER EL PATCH ─────────────────────────────────────────────

// 1. Insertar datos y componente antes del export default
const exportLine = "export default function App(";
if (!code.includes(exportLine)) {
  console.error("❌ No se encontró 'export default function App(' — verifica el archivo.");
  process.exit(1);
}

// Solo insertar si no está ya parcheado
if (!code.includes("CQ_MISIONES")) {
  code = code.replace(exportLine, MISIONES_DATA + "\n" + CQ_COMPONENT + "\n" + exportLine);
  console.log("✅ Datos y componente CodeQuest insertados.");
} else {
  console.log("ℹ️  CQ_MISIONES ya existe, saltando inserción de datos.");
}

// 2. Reemplazar el bloque placeholder de CodeQuest
const placeholder = `{nav==="cq"&&(`;
const endPlaceholder = `)}

        {nav==="ccna"`;

const newCQBlock = `{nav==="cq"&&(
          <CodeQuestView
            progresoMisiones={progresoMisiones}
            onCompletar={completarMision}
          />
        )}

        {nav==="ccna"`;

if (code.includes(placeholder) && !code.includes("CodeQuestView")) {
  // Encuentra y reemplaza el bloque placeholder completo
  const startIdx = code.indexOf(placeholder);
  const endIdx = code.indexOf(`)}

        {nav==="ccna"`, startIdx);
  
  if (startIdx !== -1 && endIdx !== -1) {
    code = code.slice(0, startIdx) + newCQBlock + code.slice(endIdx + `)}

        {nav==="ccna"`.length);
    console.log("✅ Placeholder de CodeQuest reemplazado.");
  }
} else if (code.includes("CodeQuestView")) {
  console.log("ℹ️  CodeQuestView ya existe en el archivo.");
} else {
  console.log("⚠️  No se encontró el placeholder exacto. Revisa manualmente.");
}

// 3. Agregar estado progresoMisiones si no existe
if (!code.includes("progresoMisiones")) {
  code = code.replace(
    "const [progresoLec,",
    "const [progresoMisiones, setProgresoMisiones] = useState({});\n  const [progresoLec,"
  );
  console.log("✅ Estado progresoMisiones agregado.");
}

// 4. Agregar función completarMision si no existe
if (!code.includes("completarMision")) {
  const completarLeccionFn = "const completarLeccion =";
  code = code.replace(
    completarLeccionFn,
    `const completarMision = (id, pts) => {
    if (!progresoMisiones || progresoMisiones[id]) return;
    const nm = { ...progresoMisiones, [id]: true };
    setProgresoMisiones(nm);
  };
  ` + completarLeccionFn
  );
  console.log("✅ Función completarMision agregada.");
}

fs.writeFileSync(filePath, code, "utf8");
console.log("\n🔥 PATCH COMPLETADO — App.jsx actualizado con CodeQuest real.");
console.log("Ahora ejecuta: git add . && git commit -m 'feat: CodeQuest misiones reales' && git push");
