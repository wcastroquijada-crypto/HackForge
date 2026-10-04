import { useState } from "react";
import { C } from "../../data/labs";

const COLOR = "#00ff88";

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
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(); osc.stop(ctx.currentTime + 0.35);
    } else if (type === "wrong") {
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(); osc.stop(ctx.currentTime + 0.3);
    } else if (type === "click") {
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start(); osc.stop(ctx.currentTime + 0.08);
    }
  } catch {}
}

/* ---------- utilidades de red (independientes, sin dependencias externas) ---------- */
function decToBin8(n) { return n.toString(2).padStart(8, "0"); }
function binToDec(s) { return parseInt(s, 2); }
function cidrToMaskOctets(cidr) {
  const bits = "1".repeat(cidr) + "0".repeat(32 - cidr);
  const o = [];
  for (let i = 0; i < 4; i++) o.push(binToDec(bits.substr(i * 8, 8)));
  return o;
}
function maskOctetsToCidr(o) {
  const bits = o.map(decToBin8).join("");
  return (bits.match(/1/g) || []).length;
}
function wildcardFromMask(o) { return o.map(v => 255 - v); }
function octetsToStr(o) { return o.join("."); }
function ipToInt(o) { return ((o[0] << 24) >>> 0) + (o[1] << 16) + (o[2] << 8) + o[3]; }
function intToOctets(n) { return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255]; }
function parseIp(str) {
  const parts = String(str).trim().split(".");
  if (parts.length !== 4) return null;
  const o = parts.map(p => parseInt(p, 10));
  if (o.some(v => isNaN(v) || v < 0 || v > 255)) return null;
  return o;
}
function parseMaskOrCidr(str) {
  let s = String(str).trim();
  if (s.startsWith("/")) s = s.slice(1);
  if (s.includes(".")) {
    const o = parseIp(s);
    if (!o) return null;
    return maskOctetsToCidr(o);
  }
  const n = parseInt(s, 10);
  if (isNaN(n) || n < 0 || n > 32) return null;
  return n;
}
function claseDe(primerOcteto) {
  if (primerOcteto === 127) return "Loopback";
  if (primerOcteto < 128) return "A";
  if (primerOcteto < 192) return "B";
  if (primerOcteto < 224) return "C";
  if (primerOcteto < 240) return "D (Multicast)";
  return "E (Experimental)";
}
function esPrivada(o) {
  if (o[0] === 10) return true;
  if (o[0] === 172 && o[1] >= 16 && o[1] <= 31) return true;
  if (o[0] === 192 && o[1] === 168) return true;
  return false;
}
function calcularSubred(ipOctets, cidr) {
  const maskO = cidrToMaskOctets(cidr);
  const wildO = wildcardFromMask(maskO);
  const ipInt = ipToInt(ipOctets);
  const maskInt = ipToInt(maskO);
  const netInt = (ipInt & maskInt) >>> 0;
  const wildInt = (~maskInt) >>> 0;
  const bcastInt = (netInt | wildInt) >>> 0;
  const totalHosts = cidr >= 31 ? 0 : Math.pow(2, 32 - cidr) - 2;
  return {
    mask: maskO, wildcard: wildO,
    network: intToOctets(netInt),
    broadcast: intToOctets(bcastInt),
    firstHost: cidr >= 31 ? intToOctets(netInt) : intToOctets(netInt + 1),
    lastHost: cidr >= 31 ? intToOctets(bcastInt) : intToOctets(bcastInt - 1),
    totalHosts,
  };
}

/* ---------- fila de resultado ---------- */
function Fila({ label, value, mono = true }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}`, gap: 12 }}>
      <span style={{ color: C.muted, fontSize: 12.5 }}>{label}</span>
      <span style={{ color: "#fff", fontSize: 13.5, fontWeight: 600, fontFamily: mono ? "'Courier New',monospace" : "inherit", textAlign: "right" }}>{value}</span>
    </div>
  );
}

/* ---------- vista 1: calculadora libre ---------- */
export function CalculadoraIP({ onBack }) {
  const [ip, setIp] = useState("");
  const [masc, setMasc] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const calcular = () => {
    const ipO = parseIp(ip);
    const cidr = parseMaskOrCidr(masc);
    if (!ipO) { setError("IP inválida. Usa formato: 192.168.1.10"); setResultado(null); playSound("wrong"); return; }
    if (cidr === null) { setError("Máscara/CIDR inválido. Usa /24, 24, o 255.255.255.0"); setResultado(null); playSound("wrong"); return; }
    setError("");
    const r = calcularSubred(ipO, cidr);
    setResultado({ ...r, ip: ipO, cidr });
    playSound("correct");
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <button className="ccna-btn" onClick={() => { onBack(); playSound("click"); }} style={{ background: C.dim, color: C.muted, padding: "8px 16px", fontSize: 12, marginBottom: 20 }}>← Binario &amp; Máscaras</button>
      <div style={{ color: COLOR, fontSize: 11, letterSpacing: 3, marginBottom: 8 }}>CALCULADORA DE IP</div>
      <p style={{ color: C.muted, fontSize: 12.5, marginBottom: 18, lineHeight: 1.5 }}>Ingresa cualquier IP y máscara/CIDR y te entrega el desglose completo. Sin quiz, solo la respuesta.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ color: C.muted, fontSize: 11, letterSpacing: 2, display: "block", marginBottom: 6 }}>DIRECCIÓN IP</label>
          <input className="ccna-input" value={ip} onChange={e => setIp(e.target.value)} placeholder="ej: 192.168.1.10" style={{ fontFamily: "'Courier New',monospace" }} />
        </div>
        <div>
          <label style={{ color: C.muted, fontSize: 11, letterSpacing: 2, display: "block", marginBottom: 6 }}>MÁSCARA O CIDR</label>
          <input className="ccna-input" value={masc} onChange={e => setMasc(e.target.value)} placeholder="ej: /24, 24, o 255.255.255.0" style={{ fontFamily: "'Courier New',monospace" }} />
        </div>
      </div>

      {error && <div style={{ color: "#ff6b6b", fontSize: 12.5, marginBottom: 14 }}>{error}</div>}

      <button className="ccna-btn" onClick={calcular} style={{ background: COLOR, color: "#000", padding: "12px", fontSize: 14, width: "100%", marginBottom: 20 }}>Calcular</button>

      {resultado && (
        <div className="fade-in" style={{ background: C.panel, border: `1px solid ${COLOR}33`, borderRadius: 10, padding: "4px 18px" }}>
          <Fila label="IP binaria" value={resultado.ip.map(decToBin8).join(".")} />
          <Fila label="Máscara" value={octetsToStr(resultado.mask)} />
          <Fila label="Máscara binaria" value={resultado.mask.map(decToBin8).join(".")} />
          <Fila label="CIDR" value={`/${resultado.cidr}`} />
          <Fila label="Wildcard" value={octetsToStr(resultado.wildcard)} />
          <Fila label="Dirección de red" value={octetsToStr(resultado.network)} />
          <Fila label="Dirección de broadcast" value={octetsToStr(resultado.broadcast)} />
          <Fila label="Primer host útil" value={octetsToStr(resultado.firstHost)} />
          <Fila label="Último host útil" value={octetsToStr(resultado.lastHost)} />
          <Fila label="Hosts utilizables" value={resultado.totalHosts.toLocaleString("es-CL")} />
          <Fila label="Clase" value={claseDe(resultado.ip[0])} mono={false} />
          <Fila label="Tipo" value={esPrivada(resultado.ip) ? "Privada" : "Pública"} mono={false} />
        </div>
      )}
    </div>
  );
}

/* ---------- vista 2: planificador de subredes ---------- */
export function PlanificadorRedes({ onBack }) {
  const [modo, setModo] = useState("igual"); // "igual" | "vlsm"
  const [red, setRed] = useState("");
  const [cidrBase, setCidrBase] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [hostsList, setHostsList] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const generarIgual = () => {
    const ipO = parseIp(red);
    const cidr = parseMaskOrCidr(cidrBase);
    const n = parseInt(cantidad, 10);
    if (!ipO) return setError("Red base inválida. Ej: 192.168.1.0"), setResultado(null);
    if (cidr === null) return setError("CIDR/máscara base inválido."), setResultado(null);
    if (!n || n < 1) return setError("Ingresa cuántas subredes necesitas (número mayor a 0)."), setResultado(null);

    let bitsNecesarios = 0;
    while (Math.pow(2, bitsNecesarios) < n) bitsNecesarios++;
    const nuevoCidr = cidr + bitsNecesarios;
    if (nuevoCidr > 30) return setError(`No caben ${n} subredes en una /${cidr}. El nuevo prefijo sería /${nuevoCidr}, y el máximo utilizable es /30.`), setResultado(null);

    setError("");
    const baseInt = ipToInt(ipO) & ipToInt(cidrToMaskOctets(cidr));
    const tamañoBloque = Math.pow(2, 32 - nuevoCidr);
    const subredes = [];
    for (let i = 0; i < n; i++) {
      const netInt = (baseInt + i * tamañoBloque) >>> 0;
      const r = calcularSubred(intToOctets(netInt), nuevoCidr);
      subredes.push({ ...r, cidr: nuevoCidr, nombre: `Subred ${i + 1}` });
    }
    setResultado(subredes);
    playSound("correct");
  };

  const generarVLSM = () => {
    const ipO = parseIp(red);
    const cidr = parseMaskOrCidr(cidrBase);
    if (!ipO) return setError("Red base inválida. Ej: 192.168.1.0"), setResultado(null);
    if (cidr === null) return setError("CIDR/máscara base inválido."), setResultado(null);

    const requerimientos = hostsList.split(/[\n,]+/).map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n > 0);
    if (requerimientos.length === 0) return setError("Ingresa al menos un requerimiento de hosts (uno por línea, ej: 50)."), setResultado(null);

    const conIndice = requerimientos.map((h, i) => ({ h, i })).sort((a, b) => b.h - a.h);
    const espacioBase = Math.pow(2, 32 - cidr);
    let cursor = ipToInt(ipO) & ipToInt(cidrToMaskOctets(cidr));
    const inicioBase = cursor;
    const resultados = [];
    let errorEspacio = null;

    conIndice.forEach(({ h, i }) => {
      let bitsHost = 1;
      while (Math.pow(2, bitsHost) - 2 < h) bitsHost++;
      const nuevoCidr = 32 - bitsHost;
      const tamañoBloque = Math.pow(2, bitsHost);
      if (nuevoCidr <= cidr) { errorEspacio = `La subred que pediste (${h} hosts) necesita un bloque más grande que la red base /${cidr}.`; return; }
      if (cursor + tamañoBloque > inicioBase + espacioBase) { errorEspacio = `No alcanza el espacio de la red base para asignar todos los requerimientos. Prueba con una red base más grande.`; return; }
      const r = calcularSubred(intToOctets(cursor), nuevoCidr);
      resultados.push({ ...r, cidr: nuevoCidr, nombre: `Requerimiento #${i + 1} (${h} hosts pedidos)` });
      cursor += tamañoBloque;
    });

    if (errorEspacio) return setError(errorEspacio), setResultado(null);
    setError("");
    setResultado(resultados);
    playSound("correct");
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <button className="ccna-btn" onClick={() => { onBack(); playSound("click"); }} style={{ background: C.dim, color: C.muted, padding: "8px 16px", fontSize: 12, marginBottom: 20 }}>← Binario &amp; Máscaras</button>
      <div style={{ color: COLOR, fontSize: 11, letterSpacing: 3, marginBottom: 8 }}>PLANIFICADOR DE SUBREDES</div>
      <p style={{ color: C.muted, fontSize: 12.5, marginBottom: 16, lineHeight: 1.5 }}>Dile cuántas redes necesitas (o cuántos hosts necesita cada una) y te entrega el reparto completo.</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
        <button className="ccna-btn" onClick={() => { setModo("igual"); setResultado(null); setError(""); }}
          style={{ flex: 1, padding: "10px", fontSize: 12.5, background: modo === "igual" ? COLOR : C.dim, color: modo === "igual" ? "#000" : C.muted }}>
          N subredes iguales
        </button>
        <button className="ccna-btn" onClick={() => { setModo("vlsm"); setResultado(null); setError(""); }}
          style={{ flex: 1, padding: "10px", fontSize: 12.5, background: modo === "vlsm" ? COLOR : C.dim, color: modo === "vlsm" ? "#000" : C.muted }}>
          VLSM (distinto tamaño c/u)
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 2 }}>
            <label style={{ color: C.muted, fontSize: 11, letterSpacing: 2, display: "block", marginBottom: 6 }}>RED BASE</label>
            <input className="ccna-input" value={red} onChange={e => setRed(e.target.value)} placeholder="ej: 192.168.1.0" style={{ fontFamily: "'Courier New',monospace" }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ color: C.muted, fontSize: 11, letterSpacing: 2, display: "block", marginBottom: 6 }}>CIDR</label>
            <input className="ccna-input" value={cidrBase} onChange={e => setCidrBase(e.target.value)} placeholder="ej: 24" style={{ fontFamily: "'Courier New',monospace" }} />
          </div>
        </div>

        {modo === "igual" ? (
          <div>
            <label style={{ color: C.muted, fontSize: 11, letterSpacing: 2, display: "block", marginBottom: 6 }}>¿CUÁNTAS SUBREDES NECESITAS?</label>
            <input className="ccna-input" value={cantidad} onChange={e => setCantidad(e.target.value)} placeholder="ej: 4" style={{ fontFamily: "'Courier New',monospace" }} />
          </div>
        ) : (
          <div>
            <label style={{ color: C.muted, fontSize: 11, letterSpacing: 2, display: "block", marginBottom: 6 }}>HOSTS NECESARIOS POR SUBRED (uno por línea)</label>
            <textarea className="ccna-input" value={hostsList} onChange={e => setHostsList(e.target.value)} placeholder={"ej:\n50\n20\n10\n2"} rows={4} style={{ fontFamily: "'Courier New',monospace", resize: "vertical" }} />
          </div>
        )}
      </div>

      {error && <div style={{ color: "#ff6b6b", fontSize: 12.5, marginBottom: 14 }}>{error}</div>}

      <button className="ccna-btn" onClick={modo === "igual" ? generarIgual : generarVLSM} style={{ background: COLOR, color: "#000", padding: "12px", fontSize: 14, width: "100%", marginBottom: 20 }}>
        Generar plan
      </button>

      {resultado && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {resultado.map((s, i) => (
            <div key={i} className="fade-in" style={{ background: C.panel, border: `1px solid ${COLOR}33`, borderRadius: 10, padding: "14px 18px" }}>
              <div style={{ color: COLOR, fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>{s.nombre.toUpperCase()}</div>
              <div style={{ color: "#fff", fontSize: 16, fontWeight: "bold", fontFamily: "'Courier New',monospace", marginBottom: 10 }}>
                {octetsToStr(s.network)}/{s.cidr}
              </div>
              <Fila label="Máscara" value={octetsToStr(s.mask)} />
              <Fila label="Broadcast" value={octetsToStr(s.broadcast)} />
              <Fila label="Rango de hosts" value={`${octetsToStr(s.firstHost)} – ${octetsToStr(s.lastHost)}`} />
              <Fila label="Hosts utilizables" value={s.totalHosts} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
