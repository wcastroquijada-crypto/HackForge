import { useState } from "react";
import { C } from "../../data/labs";
import { CalculadoraIP, PlanificadorRedes } from "./CalculadoraIP";

const COLOR = "#00ff88"; // verde HackForge, distinto del cian del Simulador de Subnetting

function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === "correct") {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(); osc.stop(ctx.currentTime + 0.5);
    } else if (type === "wrong") {
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.setValueAtTime(150, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(); osc.stop(ctx.currentTime + 0.4);
    } else if (type === "click") {
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start(); osc.stop(ctx.currentTime + 0.08);
    }
  } catch {}
}

/* ---------- utilidades de red ---------- */
function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function choice(arr) { return arr[randInt(0, arr.length - 1)]; }
function decToBin8(n) { return n.toString(2).padStart(8, "0"); }
function binToDec(s) { return parseInt(s, 2); }
function cidrToMaskOctets(cidr) {
  const bits = "1".repeat(cidr) + "0".repeat(32 - cidr);
  const o = [];
  for (let i = 0; i < 4; i++) o.push(binToDec(bits.substr(i * 8, 8)));
  return o;
}
function wildcardFromMask(o) { return o.map(v => 255 - v); }
function octetsToStr(o) { return o.join("."); }

/* ---------- generadores de ejercicios ---------- */
function genBinQuestion() {
  const direction = choice(["toBin", "toDec"]);
  if (direction === "toBin") {
    const n = randInt(0, 255);
    return { modo: "toBin", enunciado: `${n}`, respuesta: decToBin8(n), placeholder: "ej: 00000000" };
  }
  const n = randInt(0, 255);
  return { modo: "toDec", enunciado: decToBin8(n), respuesta: String(n), placeholder: "ej: 192" };
}

function genMaskQuestion() {
  const cidr = choice([8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]);
  const direction = choice(["fromCidr", "fromMask"]);
  const maskO = cidrToMaskOctets(cidr);
  const wildO = wildcardFromMask(maskO);
  const hosts = cidr >= 31 ? 0 : Math.pow(2, 32 - cidr) - 2;
  if (direction === "fromCidr") {
    return {
      modo: "fromCidr",
      enunciado: `/${cidr}`,
      pideMascara: true,
      respuestas: { mascara: octetsToStr(maskO), wildcard: octetsToStr(wildO), hosts: String(hosts) },
    };
  }
  return {
    modo: "fromMask",
    enunciado: octetsToStr(maskO),
    pideMascara: false,
    respuestas: { cidr: String(cidr), wildcard: octetsToStr(wildO), hosts: String(hosts) },
  };
}

/* ---------- vista: binario ---------- */
function BinarioView({ onBack }) {
  const [ej, setEj] = useState(genBinQuestion);
  const [valor, setValor] = useState("");
  const [verificado, setVerificado] = useState(false);
  const [correcto, setCorrecto] = useState(false);
  const [racha, setRacha] = useState([]);

  const verificar = () => {
    const ok = valor.trim() === ej.respuesta;
    setCorrecto(ok);
    setVerificado(true);
    setRacha(r => [...r.slice(-9), ok]);
    playSound(ok ? "correct" : "wrong");
  };

  const siguiente = () => {
    setEj(genBinQuestion());
    setValor("");
    setVerificado(false);
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <button className="ccna-btn" onClick={() => { onBack(); playSound("click"); }} style={{ background: C.dim, color: C.muted, padding: "8px 16px", fontSize: 12, marginBottom: 20 }}>← Binario &amp; Máscaras</button>
      <div style={{ color: COLOR, fontSize: 11, letterSpacing: 3, marginBottom: 8 }}>
        {ej.modo === "toBin" ? "CONVIERTE A BINARIO (8 BITS)" : "CONVIERTE A DECIMAL"}
      </div>
      <div style={{ background: `${COLOR}11`, border: `2px solid ${COLOR}33`, borderRadius: 12, padding: 24, textAlign: "center", marginBottom: 20 }}>
        <div style={{ color: "#fff", fontSize: 30, fontWeight: "bold", fontFamily: "'Courier New',monospace", letterSpacing: 1 }}>
          {ej.enunciado}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
        <input className="ccna-input" value={valor} onChange={e => setValor(e.target.value)}
          placeholder={ej.placeholder} disabled={verificado}
          style={{ borderColor: verificado ? (correcto ? "#22c55e" : "#ff3b3b") : "#1e2a3a", fontFamily: "'Courier New',monospace" }} />
        {verificado && <span style={{ fontSize: 20 }}>{correcto ? "✅" : "❌"}</span>}
      </div>
      {verificado && !correcto && (
        <div style={{ color: "#22c55e", fontSize: 13, marginBottom: 16, fontFamily: "monospace" }}>Correcto: {ej.respuesta}</div>
      )}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {!verificado
          ? <button className="ccna-btn" onClick={verificar} style={{ background: COLOR, color: "#000", padding: "12px", fontSize: 14, flex: 1 }}>Verificar</button>
          : <button className="ccna-btn" onClick={siguiente} style={{ background: "#22c55e", color: "#000", padding: "12px", fontSize: 14, flex: 1 }}>Siguiente ejercicio →</button>
        }
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {racha.map((ok, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: ok ? "#22c55e" : "#ff3b3b" }} />
        ))}
      </div>
    </div>
  );
}

/* ---------- vista: máscaras / CIDR ---------- */
function MascarasView({ onBack }) {
  const [ej, setEj] = useState(genMaskQuestion);
  const [respuestas, setRespuestas] = useState({ mascara: "", cidr: "", wildcard: "", hosts: "" });
  const [verificado, setVerificado] = useState(false);
  const [resultados, setResultados] = useState({});
  const [racha, setRacha] = useState([]);

  const campos = ej.pideMascara
    ? [
        { key: "mascara", label: "Máscara de subred", placeholder: "255.255.255.0" },
        { key: "wildcard", label: "Máscara wildcard", placeholder: "0.0.0.255" },
        { key: "hosts", label: "Hosts utilizables", placeholder: "254" },
      ]
    : [
        { key: "cidr", label: "Prefijo CIDR (solo número)", placeholder: "24" },
        { key: "wildcard", label: "Máscara wildcard", placeholder: "0.0.0.255" },
        { key: "hosts", label: "Hosts utilizables", placeholder: "254" },
      ];

  const verificar = () => {
    const r = {};
    campos.forEach(({ key }) => { r[key] = respuestas[key].trim() === ej.respuestas[key]; });
    const todoOk = Object.values(r).every(Boolean);
    setResultados(r);
    setVerificado(true);
    setRacha(x => [...x.slice(-9), todoOk]);
    playSound(todoOk ? "correct" : "wrong");
  };

  const siguiente = () => {
    setEj(genMaskQuestion());
    setRespuestas({ mascara: "", cidr: "", wildcard: "", hosts: "" });
    setVerificado(false);
    setResultados({});
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <button className="ccna-btn" onClick={() => { onBack(); playSound("click"); }} style={{ background: C.dim, color: C.muted, padding: "8px 16px", fontSize: 12, marginBottom: 20 }}>← Binario &amp; Máscaras</button>
      <div style={{ color: COLOR, fontSize: 11, letterSpacing: 3, marginBottom: 8 }}>
        {ej.pideMascara ? "DADO EL PREFIJO CIDR" : "DADA LA MÁSCARA"}
      </div>
      <div style={{ background: `${COLOR}11`, border: `2px solid ${COLOR}33`, borderRadius: 12, padding: 24, textAlign: "center", marginBottom: 20 }}>
        <div style={{ color: "#fff", fontSize: 28, fontWeight: "bold", fontFamily: "'Courier New',monospace" }}>{ej.enunciado}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
        {campos.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label style={{ color: C.muted, fontSize: 11, letterSpacing: 2, display: "block", marginBottom: 6 }}>{label.toUpperCase()}</label>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input className="ccna-input" value={respuestas[key]} onChange={e => setRespuestas(p => ({ ...p, [key]: e.target.value }))}
                placeholder={placeholder} disabled={verificado}
                style={{ borderColor: verificado ? (resultados[key] ? "#22c55e" : "#ff3b3b") : "#1e2a3a" }} />
              {verificado && <span style={{ fontSize: 18 }}>{resultados[key] ? "✅" : "❌"}</span>}
            </div>
            {verificado && !resultados[key] && (
              <div style={{ color: "#22c55e", fontSize: 12, marginTop: 4, fontFamily: "monospace" }}>Correcto: {ej.respuestas[key]}</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {!verificado
          ? <button className="ccna-btn" onClick={verificar} style={{ background: COLOR, color: "#000", padding: "12px", fontSize: 14, flex: 1 }}>Verificar respuestas</button>
          : <button className="ccna-btn" onClick={siguiente} style={{ background: "#22c55e", color: "#000", padding: "12px", fontSize: 14, flex: 1 }}>Siguiente ejercicio →</button>
        }
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {racha.map((ok, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: ok ? "#22c55e" : "#ff3b3b" }} />
        ))}
      </div>
    </div>
  );
}

/* ---------- menú del módulo ---------- */
export default function BinarioMascaras({ onBack }) {
  const [vista, setVista] = useState("menu");

  if (vista === "binario") return <BinarioView onBack={() => setVista("menu")} />;
  if (vista === "mascaras") return <MascarasView onBack={() => setVista("menu")} />;
  if (vista === "calculadora") return <CalculadoraIP onBack={() => setVista("menu")} />;
  if (vista === "planificador") return <PlanificadorRedes onBack={() => setVista("menu")} />;

  const OPCIONES = [
    { id: "binario", icon: "01", titulo: "Binario", desc: "Convierte octetos entre decimal y binario (8 bits), al azar. Modo práctica.", color: "#00ff88" },
    { id: "mascaras", icon: "/24", titulo: "Máscaras & CIDR", desc: "Dado el CIDR o la máscara, calcula lo que falta: máscara/CIDR, wildcard y hosts. Modo práctica.", color: "#ffd700" },
    { id: "calculadora", icon: "🧮", titulo: "Calculadora IP", desc: "Ingresa cualquier IP y máscara/CIDR y obtén el desglose completo al instante. Sin quiz.", color: "#3b82f6" },
    { id: "planificador", icon: "🗂️", titulo: "Planificador de Redes", desc: "Dile cuántas subredes necesitas (o cuántos hosts cada una) y te entrega el reparto listo.", color: "#a855f7" },
  ];

  return (
    <div>
      <button className="ccna-btn" onClick={() => { onBack(); playSound("click"); }} style={{ background: C.dim, color: C.muted, padding: "8px 16px", fontSize: 12, marginBottom: 20 }}>← CCNA Prep</button>
      <div style={{ color: COLOR, fontSize: 11, letterSpacing: 3, marginBottom: 8 }}>BINARIO &amp; MÁSCARAS</div>
      <h3 style={{ color: "#fff", fontSize: 18, marginBottom: 16 }}>Elige qué practicar</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
        {OPCIONES.map(o => (
          <div key={o.id} className="fade-in ccna-btn"
            onClick={() => { setVista(o.id); playSound("click"); }}
            style={{ background: C.panel, border: `1px solid ${o.color}33`, borderRadius: 10, padding: 20, cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = o.color + "66"}
            onMouseLeave={e => e.currentTarget.style.borderColor = o.color + "33"}>
            <div style={{ fontSize: 22, fontFamily: "'Courier New',monospace", color: o.color, marginBottom: 10 }}>{o.icon}</div>
            <div style={{ color: "#fff", fontWeight: "bold", fontSize: 15, marginBottom: 6 }}>{o.titulo}</div>
            <div style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.5 }}>{o.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
