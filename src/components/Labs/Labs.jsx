import { useState } from "react";

const RETOS = [
  // ─── FÁCIL ───────────────────────────────────────────────
  {
    id: "f01",
    titulo: "El mensaje oculto",
    categoria: "Criptografía",
    dificultad: "Fácil",
    tiempo: "10 min",
    xp: 50,
    descripcion: "Interceptaste un mensaje sospechoso. Parece estar codificado en Base64. Decodifícalo para obtener la flag.",
    emoji: "🔐",
    pistas: [
      "Base64 usa los caracteres A-Z, a-z, 0-9, +, /",
      "Puedes usar el comando: echo 'texto' | base64 -d",
      "O busca un decoder online en base64decode.org",
    ],
    pasos: [
      "Copia el texto codificado: SGFja0Zvcmdle2I0c2U2NF9pc19ub3RfZW5jcnlwdGlvbn0=",
      "Abre tu terminal y ejecuta: echo 'SGFja0Zvcmdle2I0c2U2NF9pc19ub3RfZW5jcnlwdGlvbn0=' | base64 -d",
      "El resultado contiene la flag en formato HackForge{...}",
    ],
    flag: "HackForge{b4se64_is_not_encryption}",
    badge: "🏅 Decodificador",
  },
  {
    id: "f02",
    titulo: "Puerto abierto",
    categoria: "Reconocimiento",
    dificultad: "Fácil",
    tiempo: "10 min",
    xp: 50,
    descripcion: "Tienes una IP objetivo. Encuentra qué servicio corre en el puerto 22 y construye la flag con esa información.",
    emoji: "🔍",
    pistas: [
      "El puerto 22 es muy conocido en Linux",
      "Nmap te muestra el nombre del servicio con -sV",
      "La flag es el nombre del protocolo en minúsculas",
    ],
    pasos: [
      "Ejecuta: nmap -sV -p 22 <IP_objetivo>",
      "Busca en la columna SERVICE el nombre del protocolo",
      "El puerto 22 siempre corre el mismo servicio — ¿cuál es?",
      "Construye la flag: HackForge{nombre_del_servicio}",
    ],
    flag: "HackForge{ssh}",
    badge: "🏅 Escáner",
  },
  {
    id: "f03",
    titulo: "Archivo fantasma",
    categoria: "Linux",
    dificultad: "Fácil",
    tiempo: "15 min",
    xp: 75,
    descripcion: "En un servidor Linux hay un archivo oculto en el directorio home del usuario. Los archivos ocultos en Linux empiezan con un punto.",
    emoji: "👻",
    pistas: [
      "ls normal no muestra archivos ocultos",
      "Prueba con ls -la para ver TODOS los archivos",
      "Los archivos ocultos empiezan con . (punto)",
    ],
    pasos: [
      "Conéctate al servidor y ve al directorio home: cd ~",
      "Lista todos los archivos incluyendo ocultos: ls -la",
      "Busca un archivo que empiece con punto (.secreto, .flag, etc.)",
      "Lee su contenido: cat .nombre_del_archivo",
    ],
    flag: "HackForge{arch1v0s_0cul70s_linux}",
    badge: "🏅 Explorador",
  },
  {
    id: "f04",
    titulo: "Hash simple",
    categoria: "Cracking",
    dificultad: "Fácil",
    tiempo: "10 min",
    xp: 50,
    descripcion: "Encontraste este hash MD5: 5f4dcc3b5aa765d61d8327deb882cf99. Crackéalo para obtener la contraseña original.",
    emoji: "🔓",
    pistas: [
      "MD5 es un hash de 32 caracteres hexadecimales",
      "Puedes buscar este hash directamente en Google o crackstation.net",
      "La contraseña original es una palabra muy común",
    ],
    pasos: [
      "Copia el hash: 5f4dcc3b5aa765d61d8327deb882cf99",
      "Ve a crackstation.net y pégalo",
      "O usa john: echo '5f4dcc3b5aa765d61d8327deb882cf99' > hash.txt && john hash.txt --wordlist=rockyou.txt --format=raw-md5",
      "La contraseña crackeada ES la flag: HackForge{contraseña}",
    ],
    flag: "HackForge{password}",
    badge: "🏅 Cracker",
  },

  // ─── MEDIO ───────────────────────────────────────────────
  {
    id: "m01",
    titulo: "Login roto",
    categoria: "Web",
    dificultad: "Medio",
    tiempo: "30 min",
    xp: 150,
    descripcion: "Una aplicación web tiene un panel de login vulnerable a SQL Injection. Entra sin saber la contraseña.",
    emoji: "💉",
    pistas: [
      "Intenta poner una comilla simple ' en el campo usuario",
      "Si hay error de SQL, el login es vulnerable",
      "El payload clásico es: ' OR 1=1--",
    ],
    pasos: [
      "Abre el login de la aplicación objetivo",
      "En el campo usuario escribe: admin' OR 1=1--",
      "En contraseña escribe cualquier cosa: password",
      "Si funciona, habrás bypasseado la autenticación",
      "Busca la flag en el panel de administración",
    ],
    flag: "HackForge{sql1_byp4ss_4dm1n}",
    badge: "🥈 Inyector",
  },
  {
    id: "m02",
    titulo: "Directorio secreto",
    categoria: "Web",
    dificultad: "Medio",
    tiempo: "25 min",
    xp: 125,
    descripcion: "Un servidor web tiene directorios ocultos. Usa fuerza bruta para encontrar el directorio que contiene la flag.",
    emoji: "📁",
    pistas: [
      "Gobuster o ffuf pueden descubrir directorios automáticamente",
      "Usa la wordlist common.txt como punto de partida",
      "Busca directorios como /admin, /backup, /secret",
    ],
    pasos: [
      "Ejecuta gobuster: gobuster dir -u http://IP -w /usr/share/wordlists/dirb/common.txt",
      "Espera los resultados — busca códigos 200 o 301",
      "Visita los directorios encontrados en el navegador",
      "Dentro del directorio secreto encontrarás un archivo con la flag",
    ],
    flag: "HackForge{d1r_bru7ef0rc3_ftw}",
    badge: "🥈 Explorador Web",
  },
  {
    id: "m03",
    titulo: "Contraseña SSH",
    categoria: "Explotación",
    dificultad: "Medio",
    tiempo: "40 min",
    xp: 175,
    descripcion: "Tienes un usuario 'john' en un servidor SSH. La contraseña es débil y está en rockyou.txt. Entra al servidor.",
    emoji: "🔑",
    pistas: [
      "Hydra puede hacer fuerza bruta a SSH",
      "Rockyou.txt tiene millones de contraseñas comunes",
      "Usa -t 4 para no saturar el servidor",
    ],
    pasos: [
      "Ejecuta hydra: hydra -l john -P /usr/share/wordlists/rockyou.txt ssh://IP -t 4",
      "Espera que Hydra encuentre la contraseña (puede tardar varios minutos)",
      "Cuando la encuentre, conéctate: ssh john@IP",
      "Dentro del servidor busca la flag: find / -name flag.txt 2>/dev/null",
      "Lee la flag: cat /ruta/flag.txt",
    ],
    flag: "HackForge{hydr4_br4k3s_w34k_p4ss}",
    badge: "🥈 Fuerza Bruta",
  },
  {
    id: "m04",
    titulo: "Tráfico sospechoso",
    categoria: "Red",
    dificultad: "Medio",
    tiempo: "30 min",
    xp: 150,
    descripcion: "Te dieron un archivo .pcap capturado en la red. Analízalo con Wireshark para encontrar credenciales transmitidas en texto plano.",
    emoji: "📡",
    pistas: [
      "FTP y HTTP transmiten credenciales sin cifrar",
      "Usa el filtro: ftp en Wireshark",
      "Follow TCP Stream te muestra la conversación completa",
    ],
    pasos: [
      "Abre el archivo .pcap en Wireshark",
      "En el filtro escribe: ftp",
      "Busca paquetes con USER y PASS",
      "Click derecho → Follow TCP Stream para ver la conversación",
      "Las credenciales encontradas forman la flag: HackForge{usuario_contraseña}",
    ],
    flag: "HackForge{ftp_cr3ds_1n_pl41n_t3xt}",
    badge: "🥈 Analista de Red",
  },

  // ─── DURO ─────────────────────────────────────────────────
  {
    id: "d01",
    titulo: "Cadena completa",
    categoria: "Pentesting",
    dificultad: "Duro",
    tiempo: "90 min",
    xp: 400,
    descripcion: "Máquina completa: Reconocimiento → Explotación web → Reverse shell → Escalada de privilegios. Obtén root y lee /root/flag.txt.",
    emoji: "💀",
    pistas: [
      "Empieza siempre con nmap -sC -sV",
      "Si hay web, busca directorios con gobuster",
      "Para la reverse shell: nc -lvnp 4444 en tu máquina",
      "Para escalar: sudo -l o busca binarios SUID",
    ],
    pasos: [
      "RECONOCIMIENTO: nmap -sC -sV -p- IP",
      "ENUM WEB: gobuster dir -u http://IP -w common.txt -x php,html",
      "EXPLOTACIÓN: Identifica la vulnerabilidad (upload, SQLi, RCE)",
      "SHELL: Sube una reverse shell PHP o usa un exploit",
      "LISTENER: nc -lvnp 4444 (en tu máquina)",
      "PRIVESC: sudo -l → busca en GTFOBins",
      "ROOT: cat /root/flag.txt",
    ],
    flag: "HackForge{full_ch41n_r00t_0wn3d}",
    badge: "🥇 Root Master",
  },
  {
    id: "d02",
    titulo: "Forense digital",
    categoria: "Forense",
    dificultad: "Duro",
    tiempo: "60 min",
    xp: 300,
    descripcion: "Analiza una imagen de disco. Encuentra: usuario administrador, último login, herramientas de hacking instaladas y la flag oculta.",
    emoji: "🔬",
    pistas: [
      "Autopsy o FTK Imager para analizar la imagen",
      "En Windows: net user muestra usuarios",
      "Los logs de eventos guardan el historial de logins",
      "Busca en C:\\Users\\ y C:\\Windows\\Temp\\",
    ],
    pasos: [
      "Monta la imagen con: sudo mount -o loop imagen.img /mnt/disco",
      "Lista usuarios: cat /mnt/disco/etc/passwd (Linux) o analiza SAM (Windows)",
      "Revisa logs: /mnt/disco/var/log/auth.log",
      "Busca herramientas sospechosas: find /mnt/disco -name '*.exe' 2>/dev/null",
      "Busca la flag: grep -r 'HackForge{' /mnt/disco/ 2>/dev/null",
    ],
    flag: "HackForge{d1g1t4l_f0r3ns1cs_pr0}",
    badge: "🥇 Investigador",
  },
  {
    id: "d03",
    titulo: "Crypto avanzado",
    categoria: "Criptografía",
    dificultad: "Duro",
    tiempo: "75 min",
    xp: 350,
    descripcion: "Mensaje cifrado con múltiples capas: ROT13 → Base64 → Hex. Decodifica cada capa en orden para revelar la flag.",
    emoji: "🧩",
    pistas: [
      "Identifica el tipo de encoding antes de decodificar",
      "Hex usa solo caracteres 0-9 y a-f",
      "Base64 termina con = o ==",
      "ROT13 es solo letras rotadas 13 posiciones",
    ],
    pasos: [
      "Texto inicial (Hex): 486163 6b466f 726765 7b6d756c 74695f6c 617965725f 63727970 746f7d",
      "CAPA 1 - Decodifica Hex: echo '48616...' | xxd -r -p",
      "CAPA 2 - El resultado en Base64: decodifica con: echo 'resultado' | base64 -d",
      "CAPA 3 - El resultado en ROT13: usa tr 'A-Za-z' 'N-ZA-Mn-za-m'",
      "La flag final tiene formato HackForge{...}",
    ],
    flag: "HackForge{mult1_l4y3r_crypt0}",
    badge: "🥇 Crypto Expert",
  },
];

const DIFICULTAD_COLOR = {
  Fácil: { bg: "#052e16", border: "#16a34a", text: "#4ade80" },
  Medio: { bg: "#1c1401", border: "#d97706", text: "#fbbf24" },
  Duro:  { bg: "#1a0505", border: "#dc2626", text: "#f87171" },
};

const CAT_EMOJI = {
  Criptografía: "🔐", Reconocimiento: "🔍", Linux: "🐧",
  Cracking: "🔓", Web: "🌐", Explotación: "💥",
  Red: "📡", Pentesting: "💀", Forense: "🔬",
};

function RetoCard({ reto, completado, onAbrir }) {
  const col = DIFICULTAD_COLOR[reto.dificultad];
  return (
    <div style={{
      background: "#0a0a14",
      border: `1px solid ${completado ? "#16a34a" : "#1e1e2e"}`,
      borderRadius: "12px",
      padding: "20px",
      cursor: "pointer",
      transition: "all 0.2s",
      position: "relative",
      opacity: 1,
    }}
    onClick={onAbrir}
    onMouseEnter={e => e.currentTarget.style.borderColor = completado ? "#16a34a" : col.border}
    onMouseLeave={e => e.currentTarget.style.borderColor = completado ? "#16a34a" : "#1e1e2e"}
    >
      {completado && (
        <div style={{ position: "absolute", top: 12, right: 12, color: "#4ade80", fontSize: 20 }}>✓</div>
      )}
      <div style={{ fontSize: 32, marginBottom: 10 }}>{reto.emoji}</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{ background: col.bg, border: `1px solid ${col.border}`, color: col.text, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
          {reto.dificultad}
        </span>
        <span style={{ background: "#0f0f1a", border: "1px solid #1e1e2e", color: "#888", borderRadius: 20, padding: "2px 10px", fontSize: 11 }}>
          {CAT_EMOJI[reto.categoria]} {reto.categoria}
        </span>
      </div>
      <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{reto.titulo}</h3>
      <p style={{ color: "#666", fontSize: 12, lineHeight: 1.6, marginBottom: 14 }}>{reto.descripcion}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#555", fontSize: 11 }}>⏱ {reto.tiempo}</span>
        <span style={{ color: "#f59e0b", fontSize: 11, fontWeight: 700 }}>+{reto.xp} XP</span>
      </div>
    </div>
  );
}

function RetoDetalle({ reto, completado, onVolver, onCompletar }) {
  const [flagInput, setFlagInput] = useState("");
  const [mostrarPistas, setMostrarPistas] = useState(false);
  const [pistaIdx, setPistaIdx] = useState(0);
  const [resultado, setResultado] = useState(null);
  const [mostrarSolucion, setMostrarSolucion] = useState(false);
  const col = DIFICULTAD_COLOR[reto.dificultad];

  const verificar = () => {
    const ok = flagInput.trim().toLowerCase() === reto.flag.toLowerCase();
    setResultado(ok ? "ok" : "fail");
    if (ok && !completado) onCompletar(reto.id, reto.xp);
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 32px" }}>
      <button onClick={onVolver} style={{ background: "transparent", border: "1px solid #1e1e2e", color: "#888", borderRadius: 6, padding: "7px 14px", fontSize: 12, cursor: "pointer", marginBottom: 24 }}>
        ← Volver a Labs
      </button>

      {/* Header */}
      <div style={{ background: "#0a0a14", border: `1px solid ${col.border}`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>{reto.emoji}</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ background: col.bg, border: `1px solid ${col.border}`, color: col.text, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{reto.dificultad}</span>
          <span style={{ background: "#0f0f1a", border: "1px solid #1e1e2e", color: "#888", borderRadius: 20, padding: "2px 10px", fontSize: 11 }}>{CAT_EMOJI[reto.categoria]} {reto.categoria}</span>
          <span style={{ background: "#0f0f1a", border: "1px solid #1e1e2e", color: "#888", borderRadius: 20, padding: "2px 10px", fontSize: 11 }}>⏱ {reto.tiempo}</span>
          <span style={{ background: "#1c1401", border: "1px solid #d97706", color: "#fbbf24", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>+{reto.xp} XP</span>
        </div>
        <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{reto.titulo}</h2>
        <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.7 }}>{reto.descripcion}</p>
      </div>

      {/* Pasos */}
      <div style={{ background: "#0a0a14", border: "1px solid #1e1e2e", borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 16 }}>📋 Pasos a seguir</h3>
        {reto.pasos.map((paso, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
            <div style={{ minWidth: 24, height: 24, borderRadius: "50%", background: col.bg, border: `1px solid ${col.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: col.text, fontWeight: 700 }}>
              {i + 1}
            </div>
            <p style={{ color: "#bbb", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{paso}</p>
          </div>
        ))}
      </div>

      {/* Pistas */}
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => { setMostrarPistas(true); setPistaIdx(p => Math.min(p + 1, reto.pistas.length - 1)); }}
          style={{ background: "#0f0f1a", border: "1px solid #1e2a3a", color: "#3b82f6", borderRadius: 8, padding: "9px 18px", fontSize: 12, cursor: "pointer", width: "100%" }}>
          💡 {mostrarPistas ? `Ver pista ${Math.min(pistaIdx + 1, reto.pistas.length)} de ${reto.pistas.length}` : "Ver una pista"}
        </button>
        {mostrarPistas && (
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
            {reto.pistas.slice(0, pistaIdx + 1).map((p, i) => (
              <div key={i} style={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 8, padding: "10px 14px", color: "#93c5fd", fontSize: 12 }}>
                💡 {p}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit flag */}
      {!completado ? (
        <div style={{ background: "#0a0a14", border: "1px solid #1e1e2e", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 14 }}>🚩 Enviar Flag</h3>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="text"
              placeholder="HackForge{...}"
              value={flagInput}
              onChange={e => { setFlagInput(e.target.value); setResultado(null); }}
              onKeyDown={e => e.key === "Enter" && verificar()}
              style={{ flex: 1, background: "#050508", border: `1px solid ${resultado === "ok" ? "#16a34a" : resultado === "fail" ? "#dc2626" : "#1e1e2e"}`, borderRadius: 8, padding: "11px 14px", color: "#00ff9d", fontFamily: "monospace", fontSize: 13, outline: "none" }}
            />
            <button onClick={verificar} style={{ background: "#00ff9d", color: "#080810", border: "none", borderRadius: 8, padding: "11px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              Verificar
            </button>
          </div>
          {resultado === "ok" && (
            <div style={{ marginTop: 12, background: "#052e16", border: "1px solid #16a34a", borderRadius: 8, padding: "12px 16px", color: "#4ade80", fontSize: 13 }}>
              🎉 ¡Correcto! +{reto.xp} XP — {reto.badge}
            </div>
          )}
          {resultado === "fail" && (
            <div style={{ marginTop: 12, background: "#1a0505", border: "1px solid #dc2626", borderRadius: 8, padding: "12px 16px", color: "#f87171", fontSize: 13 }}>
              ❌ Flag incorrecta. Revisa los pasos o pide una pista.
            </div>
          )}
        </div>
      ) : (
        <div style={{ background: "#052e16", border: "1px solid #16a34a", borderRadius: 12, padding: 20, marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
          <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 15 }}>¡Reto completado! {reto.badge}</div>
          <div style={{ color: "#166534", fontSize: 12, marginTop: 4 }}>+{reto.xp} XP ganados</div>
        </div>
      )}

      {/* Ver solución */}
      <button onClick={() => setMostrarSolucion(p => !p)}
        style={{ background: "transparent", border: "1px solid #1e1e2e", color: "#555", borderRadius: 8, padding: "9px 18px", fontSize: 12, cursor: "pointer", width: "100%" }}>
        {mostrarSolucion ? "🙈 Ocultar solución" : "👁 Ver solución (spoiler)"}
      </button>
      {mostrarSolucion && (
        <div style={{ marginTop: 10, background: "#0f0005", border: "1px solid #3b0d0d", borderRadius: 8, padding: "14px 16px" }}>
          <div style={{ color: "#888", fontSize: 11, marginBottom: 6 }}>FLAG:</div>
          <code style={{ color: "#f87171", fontFamily: "monospace", fontSize: 13 }}>{reto.flag}</code>
        </div>
      )}
    </div>
  );
}

export default function Labs({ doneLabs = [], onComplete }) {
  const [vista, setVista] = useState("lista");
  const [retoActivo, setRetoActivo] = useState(null);
  const [filtro, setFiltro] = useState("Todos");
  const [completados, setCompletados] = useState(doneLabs);

  const dificultades = ["Todos", "Fácil", "Medio", "Duro"];
  const filtrados = filtro === "Todos" ? RETOS : RETOS.filter(r => r.dificultad === filtro);
  const totalXP = completados.reduce((acc, id) => {
    const r = RETOS.find(r => r.id === id);
    return acc + (r ? r.xp : 0);
  }, 0);

  const handleCompletar = (id, xp) => {
    if (!completados.includes(id)) {
      setCompletados(p => [...p, id]);
      if (onComplete) onComplete(id, xp);
    }
  };

  if (vista === "detalle" && retoActivo) {
    return (
      <div style={{ minHeight: "100vh", background: "#080810", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ borderBottom: "1px solid #1e1e2e", padding: "16px 32px", background: "#0a0a14" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>⚗️</span>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>HACKFORGE Labs</span>
          </div>
        </div>
        <RetoDetalle
          reto={retoActivo}
          completado={completados.includes(retoActivo.id)}
          onVolver={() => { setVista("lista"); setRetoActivo(null); }}
          onCompletar={handleCompletar}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #1e1e2e", padding: "28px 32px 20px", background: "linear-gradient(180deg, #0d0d1f 0%, #080810 100%)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 24 }}>⚗️</span>
                <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0, background: "linear-gradient(90deg,#fff,#888)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Labs CTF
                </h1>
              </div>
              <p style={{ color: "#444", fontSize: 12, margin: 0 }}>Retos propios de HACKFORGE — Fácil, Medio y Duro</p>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#4ade80", fontSize: 18, fontWeight: 800 }}>{completados.length}/{RETOS.length}</div>
                <div style={{ color: "#555", fontSize: 10 }}>Completados</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#fbbf24", fontSize: 18, fontWeight: 800 }}>{totalXP}</div>
                <div style={{ color: "#555", fontSize: 10 }}>XP ganados</div>
              </div>
            </div>
          </div>

          {/* Barra de progreso */}
          <div style={{ marginTop: 16 }}>
            <div style={{ height: 4, background: "#1e1e2e", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(completados.length / RETOS.length) * 100}%`, background: "linear-gradient(to right, #00ff9d, #3b82f6)", borderRadius: 2, transition: "width 0.5s" }} />
            </div>
          </div>

          {/* Filtros */}
          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            {dificultades.map(d => {
              const col = d === "Todos" ? { text: "#888", border: "#1e1e2e", bg: "#0f0f1a" } : DIFICULTAD_COLOR[d];
              return (
                <button key={d} onClick={() => setFiltro(d)} style={{
                  background: filtro === d ? (d === "Todos" ? "#fff" : col.bg) : "#0f0f1a",
                  border: `1px solid ${filtro === d ? (d === "Todos" ? "#fff" : col.border) : "#1e1e2e"}`,
                  color: filtro === d ? (d === "Todos" ? "#080810" : col.text) : "#666",
                  borderRadius: 20, padding: "5px 14px", fontSize: 12,
                  cursor: "pointer", fontWeight: filtro === d ? 700 : 400, transition: "all 0.2s",
                }}>
                  {d === "Fácil" ? "🟢" : d === "Medio" ? "🟡" : d === "Duro" ? "🔴" : "⚡"} {d}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid de retos */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 32px" }}>
        <div style={{ color: "#555", fontSize: 12, marginBottom: 16 }}>
          {filtrados.length} reto{filtrados.length !== 1 ? "s" : ""}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {filtrados.map(r => (
            <RetoCard
              key={r.id}
              reto={r}
              completado={completados.includes(r.id)}
              onAbrir={() => { setRetoActivo(r); setVista("detalle"); }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
