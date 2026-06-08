import { useState, useRef, useEffect } from "react";

// ============================================================
// COMPONENTE THM SALAS — Simulador de salas de TryHackMe
// ============================================================

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Rajdhani:wght@600;700&display=swap');
  .thm-btn{cursor:pointer;border:none;transition:all .15s;border-radius:6px;font-family:'Rajdhani',sans-serif;font-weight:700;letter-spacing:1px}
  .thm-btn:hover:not(:disabled){filter:brightness(1.2);transform:translateY(-1px)}
  .thm-btn:disabled{opacity:.4;cursor:not-allowed}
  .thm-input{background:#020810;border:1px solid #00d4ff33;color:#00d4ff;padding:10px 14px;border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:13px;outline:none;width:100%}
  .thm-input:focus{border-color:#00d4ff88;box-shadow:0 0 12px #00d4ff22}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  .fade-in{animation:fadeUp 0.25s ease forwards}
  .scrollbar::-webkit-scrollbar{width:4px}
  .scrollbar::-webkit-scrollbar-track{background:#020810}
  .scrollbar::-webkit-scrollbar-thumb{background:#00d4ff44;border-radius:2px}
`;

const BG = "#020810";
const PANEL = "#060d1a";
const BORDER = "#0d1f35";
const TEXT = "#8a9ab0";
const CYAN = "#00d4ff";

// Procesador de comandos para el simulador de las salas
function procesarCmdSala(cmd, estado, sala) {
  const partes = cmd.trim().split(/\s+/);
  const comando = partes[0];
  const args = partes.slice(1);
  const dir = estado.directorio;
  const sis = sala.sistema;

  if (!comando) return { output: "", nuevoEstado: estado };

  if (comando === "clear") return { output: "__CLEAR__", nuevoEstado: estado };

  if (comando === "whoami") return { output: sis.usuario, nuevoEstado: estado };

  if (comando === "id") {
    const uid = sis.usuario === "root" ? "0" : sis.usuario === "www-data" ? "33" : "1001";
    const gid = uid;
    return { output: `uid=${uid}(${sis.usuario}) gid=${gid}(${sis.usuario}) groups=${gid}(${sis.usuario})`, nuevoEstado: estado };
  }

  if (comando === "pwd") return { output: dir, nuevoEstado: estado };

  if (comando === "hostname") return { output: sis.hostname, nuevoEstado: estado };

  if (comando === "uname") {
    if (args.includes("-r")) return { output: "5.4.0-150-generic", nuevoEstado: estado };
    if (args.includes("-a")) return { output: `Linux ${sis.hostname} 5.4.0-150-generic #167-Ubuntu SMP Mon May 15 17:35:05 UTC 2023 x86_64 GNU/Linux`, nuevoEstado: estado };
    return { output: "Linux", nuevoEstado: estado };
  }

  if (comando === "ls") {
    const targetDir = args.find(a => !a.startsWith("-")) || dir;
    const ruta = targetDir.startsWith("/") ? targetDir : `${dir}/${targetDir}`;
    const archivosDir = sis.archivos[ruta] || sis.archivos[dir] || [];
    const mostrarOcultos = args.some(a => a.includes("a"));
    const detalle = args.some(a => a.includes("l"));
    let resultado = archivosDir.filter(f => mostrarOcultos || !f.startsWith("."));
    if (detalle) {
      return {
        output: `total ${resultado.length * 4}\n` + resultado.map(f => {
          const esDir = f.endsWith("/");
          const perms = esDir ? "drwxr-xr-x" : f.startsWith(".bash") ? "-rw-------" : "-rw-r--r--";
          return `${perms} 1 ${sis.usuario} ${sis.usuario} ${Math.floor(Math.random() * 4096) + 100} Jun  1 ${f}`;
        }).join("\n"),
        nuevoEstado: estado
      };
    }
    return { output: resultado.join("  ") || "(vacío)", nuevoEstado: estado };
  }

  if (comando === "cd") {
    const dest = args[0] || "/home/" + sis.usuario;
    let nuevaRuta;
    if (dest === "~") nuevaRuta = "/home/" + sis.usuario;
    else if (dest === "..") {
      const ps = dir.split("/").filter(Boolean);
      ps.pop();
      nuevaRuta = "/" + ps.join("/") || "/";
    } else if (dest.startsWith("/")) nuevaRuta = dest;
    else nuevaRuta = `${dir}/${dest}`;
    nuevaRuta = nuevaRuta.replace(/\/+/g, "/");
    if (nuevaRuta !== "/" && nuevaRuta.endsWith("/")) nuevaRuta = nuevaRuta.slice(0, -1);
    if (sis.archivos[nuevaRuta] !== undefined || nuevaRuta === "/") {
      return { output: "", nuevoEstado: { ...estado, directorio: nuevaRuta } };
    }
    return { output: `bash: cd: ${dest}: No such file or directory`, nuevoEstado: estado };
  }

  if (comando === "cat") {
    const archivo = args[0];
    if (!archivo) return { output: "cat: missing operand", nuevoEstado: estado };
    const nombre = archivo.includes("/") ? archivo.split("/").pop() : archivo;
    const contenido = sis.contenido[nombre];
    if (nombre === "shadow" && sis.usuario !== "root") return { output: "cat: /etc/shadow: Permission denied", nuevoEstado: estado };
    if (nombre === "root.txt" && sis.usuario !== "root" && estado.directorio !== "/root") {
      return { output: "cat: /root/root.txt: Permission denied", nuevoEstado: estado };
    }
    if (contenido) return { output: contenido, nuevoEstado: estado };
    return { output: `cat: ${archivo}: No such file or directory`, nuevoEstado: estado };
  }

  if (comando === "nmap") {
    if (sis.nmap_output) return { output: sis.nmap_output, nuevoEstado: estado };
    const ip = args.find(a => a.match(/^\d+\.\d+\.\d+\.\d+/)) || "10.10.x.x";
    return {
      output: `Starting Nmap 7.93\nNmap scan report for ${ip}\nHost is up.\n\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 7.6p1\n80/tcp open  http    Apache httpd 2.4.29`,
      nuevoEstado: estado
    };
  }

  if (comando === "gobuster") {
    if (sis.gobuster_output) return { output: sis.gobuster_output, nuevoEstado: estado };
    return { output: "/index.php   (Status: 200)\n/admin       (Status: 301)\n/login.php   (Status: 200)", nuevoEstado: estado };
  }

  if (comando === "curl") {
    const url = args.find(a => a.startsWith("http"));
    if (!url) return { output: "curl: no URL specified", nuevoEstado: estado };
    if (url.includes("robots.txt")) return { output: sis.contenido["robots.txt"] || "User-agent: *\nDisallow: /admin/", nuevoEstado: estado };
    if (url.includes("backup.zip")) return { output: sis.contenido["backup.zip"] || "[Archivo binario]", nuevoEstado: estado };
    return { output: `<html><head><title>Servidor Web</title></head><body><h1>Bienvenido</h1></body></html>`, nuevoEstado: estado };
  }

  if (comando === "ftp") {
    return {
      output: `Connected to ${args[0] || "10.10.x.x"}\n220 vsftpd 3.0.3\nName: anonymous\n331 Please specify the password.\nPassword: \n230 Login successful.\nftp> ls\n${(sis.archivos["/ftp"] || ["ForMitch.txt"]).join("\n")}\nftp> get ForMitch.txt\n226 Transfer complete.\nftp> bye`,
      nuevoEstado: estado
    };
  }

  if (comando === "sudo") {
    if (args[0] === "-l") {
      return {
        output: `Matching Defaults entries for ${sis.usuario}:\n    env_reset, mail_badpass\n\nUser ${sis.usuario} may run the following commands:\n    (ALL) NOPASSWD: ${sis.sudo_config}`,
        nuevoEstado: estado
      };
    }
    if (cmd.includes("python3") && (cmd.includes("os.system") || cmd.includes("os.execl"))) {
      return {
        output: `root@${sis.hostname}:/# id\nuid=0(root) gid=0(root) groups=0(root)\n\n🎉 ¡Escalada exitosa con sudo python3!\nAhora puedes leer /root/root.txt`,
        nuevoEstado: { ...estado, usuario: "root" }
      };
    }
    if (cmd.includes("vim") && (cmd.includes("!/bin/bash") || cmd.includes("!/bin/sh"))) {
      return {
        output: `root@${sis.hostname}:/# id\nuid=0(root) gid=0(root) groups=0(root)\n\n🎉 ¡Escalada exitosa con sudo vim!\nAhora puedes leer /root/root.txt`,
        nuevoEstado: { ...estado, usuario: "root" }
      };
    }
    if (cmd.includes("find") && cmd.includes("/bin/sh")) {
      return {
        output: `# id\nuid=0(root) gid=0(root) groups=0(root)\n\n🎉 ¡Escalada exitosa con sudo find!`,
        nuevoEstado: { ...estado, usuario: "root" }
      };
    }
    return { output: `sudo: ${args.join(" ")}: command not found`, nuevoEstado: estado };
  }

  if (comando === "find") {
    if (args.includes("-perm") && args.includes("-4000")) {
      return { output: sis.suid_binarios.join("\n"), nuevoEstado: estado };
    }
    if (cmd.includes("-exec") && cmd.includes("/bin/sh")) {
      return {
        output: `# id\nuid=0(root)\n\n🎉 ¡Escalada exitosa con SUID find!`,
        nuevoEstado: { ...estado, usuario: "root" }
      };
    }
    if (args.includes("-name")) {
      const nombre = args[args.indexOf("-name") + 1] || "";
      if (nombre.includes("txt")) return { output: Object.keys(sis.archivos).flatMap(d => (sis.archivos[d] || []).filter(f => f.includes(".txt")).map(f => `${d}/${f}`)).join("\n"), nuevoEstado: estado };
    }
    return { output: "", nuevoEstado: estado };
  }

  if (comando === "grep") {
    if (cmd.includes("/bin/bash") && cmd.includes("/etc/passwd")) {
      const lineas = (sis.contenido["passwd"] || "").split("\n").filter(l => l.includes("/bin/bash"));
      return { output: lineas.join("\n"), nuevoEstado: estado };
    }
    if (cmd.includes("wc -l")) return { output: "2", nuevoEstado: estado };
    return { output: "", nuevoEstado: estado };
  }

  if (comando === "ssh") {
    const userHost = args.find(a => a.includes("@"));
    if (userHost) {
      const [usuario] = userHost.split("@");
      return {
        output: `${usuario}@${sis.hostname}'s password:\nWelcome to Ubuntu 18.04.6 LTS\n\n${usuario}@${sis.hostname}:~$\n✅ Acceso SSH exitoso como ${usuario}`,
        nuevoEstado: { ...estado, usuario }
      };
    }
    return { output: "ssh: missing destination", nuevoEstado: estado };
  }

  if (comando === "john") {
    return {
      output: `Using default input encoding: UTF-8\nLoaded 1 password hash (md5crypt [MD5 256/256 AVX2 8x3])\nWill run 4 OpenMP threads\nPress 'q' or Ctrl-C to abort\nsecret           (mitch)\n\n1g 0:00:00:14 DONE — Session completed`,
      nuevoEstado: estado
    };
  }

  if (comando === "hashcat") {
    return {
      output: `hashcat (v6.2.6) starting\nDictionary cache hit\n0c01f4468bd75d7a84c7eb73846e8d96:secret\n\nSession..........: hashcat\nStatus...........: Cracked`,
      nuevoEstado: estado
    };
  }

  if (comando === "searchsploit") {
    if (cmd.toLowerCase().includes("cms made simple") || cmd.toLowerCase().includes("cms") ) {
      return {
        output: `--------------------------------------------------------
 Exploit Title                     |  Path
--------------------------------------------------------
CMS Made Simple < 2.2.10 - SQL Inj | php/webapps/46635.py
CMS Made Simple 2.2.8 - Auth Bypass | php/webapps/44976.txt
--------------------------------------------------------

Shellcodes: No Results`,
        nuevoEstado: estado
      };
    }
    return { output: "No results found", nuevoEstado: estado };
  }

  if (comando === "python3" && cmd.includes("exploit")) {
    return {
      output: `[+] Salt for password found: 1dac0d92e9fa6bb2
[+] Username found: admin
[+] Email found: admin@simple-ctf.thm
[+] Password found: 0c01f4468bd75d7a84c7eb73846e8d96\n\n[*] Usa john o hashcat para crackear el hash`,
      nuevoEstado: estado
    };
  }

  if (comando === "python3" && cmd.includes("pty.spawn")) {
    return { output: `${sis.usuario}@${sis.hostname}:${dir}$\n✅ Shell mejorada a TTY completa`, nuevoEstado: estado };
  }

  if (comando === "nc") {
    if (args.includes("-lnvp") || args.includes("-lvnp") || args.includes("-lp")) {
      return {
        output: `Listening on 0.0.0.0 ${args[args.length - 1]}\nConnection received on 10.10.x.x 44321\n\n${sis.usuario}@${sis.hostname}:/var/www/html$ \n✅ Reverse shell recibida!`,
        nuevoEstado: estado
      };
    }
  }

  if (comando === "history") {
    return { output: sis.contenido[".bash_history"] || "No hay historial disponible.", nuevoEstado: estado };
  }

  if (comando === "ss" || comando === "netstat") {
    return { output: `Netid  State   Local Address:Port\ntcp    LISTEN  0.0.0.0:22\ntcp    LISTEN  0.0.0.0:80\ntcp    LISTEN  127.0.0.1:3306`, nuevoEstado: estado };
  }

  if (comando === "ip" && args[0] === "a") {
    return { output: `1: lo: inet 127.0.0.1/8\n2: eth0: inet 10.10.x.x/24\n3: tun0: inet 10.8.0.2/17`, nuevoEstado: estado };
  }

  if (comando === "hint" || comando === "pista") {
    return {
      output: `💡 Pistas para esta sala:\n${sala.tareas.flatMap(t => t.preguntas.map((p, i) => `  ${t.id}.${i+1} — ${p.pista}`)).join("\n")}`,
      nuevoEstado: estado
    };
  }

  if (comando === "solucion") {
    return { output: sala.solucion_completa, nuevoEstado: estado };
  }

  if (comando === "help") {
    return {
      output: `Comandos disponibles en esta sala:
──────────────────────────────────────
Básicos:    ls, cd, pwd, cat, echo
Sistema:    whoami, id, uname, hostname
Red:        nmap, curl, ftp, ssh, nc
Hacking:    gobuster, searchsploit, john, hashcat
Privesc:    sudo -l, find / -perm -4000
Ayuda:      hint (pistas), solucion (solución completa)
──────────────────────────────────────`,
      nuevoEstado: estado
    };
  }

  return { output: `bash: ${comando}: command not found\nEscribe 'help' para ver comandos o 'hint' para pistas`, nuevoEstado: estado };
}

// ============================================================
// COMPONENTE PRINCIPAL THM SALAS
// ============================================================
export default function THMSalas({ salas, onVolver, onCompletarSala, xpTotal }) {
  const [vistaLocal, setVistaLocal] = useState("lista"); // lista | sala | completada
  const [salaActiva, setSalaActiva] = useState(null);
  const [tareaIdx, setTareaIdx] = useState(0);
  const [preguntaIdx, setPreguntaIdx] = useState(0);
  const [respuestaInput, setRespuestaInput] = useState("");
  const [respuestaEstado, setRespuestaEstado] = useState(null); // null | correcto | incorrecto
  const [preguntasCompletadas, setPreguntasCompletadas] = useState([]);
  const [salasCompletadas, setSalasCompletadas] = useState([]);
  const [mostrarPista, setMostrarPista] = useState(false);

  // Terminal de la sala
  const [historial, setHistorial] = useState([]);
  const [inputCmd, setInputCmd] = useState("");
  const [estadoShell, setEstadoShell] = useState({ usuario: "", directorio: "" });
  const [histCmds, setHistCmds] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const shellEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    shellEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historial]);

  const iniciarSala = (sala) => {
    setSalaActiva(sala);
    setTareaIdx(0);
    setPreguntaIdx(0);
    setRespuestaInput("");
    setRespuestaEstado(null);
    setMostrarPista(false);
    setPreguntasCompletadas([]);
    setEstadoShell({ usuario: sala.sistema.usuario, directorio: sala.sistema.directorio_inicial });
    setHistorial([
      { tipo: "sistema", texto: `╔══════════════════════════════════════╗` },
      { tipo: "sistema", texto: `  ${sala.nombre.toUpperCase()}` },
      { tipo: "sistema", texto: `  IP: ${sala.id === "basic-linux" ? "10.10.10.10" : sala.id === "web-enum" ? "10.10.20.20" : sala.id === "privesc" ? "10.10.40.40" : sala.id === "reverse-shell" ? "10.10.30.30" : "10.10.50.50"}` },
      { tipo: "sistema", texto: `  Usuario: ${sala.sistema.usuario}` },
      { tipo: "sistema", texto: `╚══════════════════════════════════════╝` },
      { tipo: "sistema", texto: sala.historia },
      { tipo: "sistema", texto: `─────────────────────────────────────────` },
      { tipo: "sistema", texto: `Escribe 'help' para comandos o 'hint' para pistas.` }
    ]);
    setInputCmd("");
    setHistCmds([]);
    setVistaLocal("sala");
  };

  const verificarRespuesta = () => {
    const sala = salaActiva;
    const tarea = sala.tareas[tareaIdx];
    const pregunta = tarea.preguntas[preguntaIdx];
    const correcta = respuestaInput.trim().toLowerCase() === pregunta.respuesta.toLowerCase();

    setRespuestaEstado(correcta ? "correcto" : "incorrecto");

    if (correcta) {
      const clave = `${sala.id}-${tareaIdx}-${preguntaIdx}`;
      setPreguntasCompletadas(p => [...p, clave]);

      setTimeout(() => {
        setRespuestaEstado(null);
        setRespuestaInput("");
        setMostrarPista(false);

        const totalPreguntas = sala.tareas.reduce((acc, t) => acc + t.preguntas.length, 0);
        const completadasNuevas = preguntasCompletadas.length + 1;

        // Siguiente pregunta
        const siguienteP = preguntaIdx + 1;
        if (siguienteP < tarea.preguntas.length) {
          setPreguntaIdx(siguienteP);
        } else {
          // Siguiente tarea
          const siguienteT = tareaIdx + 1;
          if (siguienteT < sala.tareas.length) {
            setTareaIdx(siguienteT);
            setPreguntaIdx(0);
            setHistorial(h => [...h, {
              tipo: "sistema",
              texto: `\n✅ TAREA ${tareaIdx + 1} COMPLETADA\n→ Siguiente: ${sala.tareas[siguienteT].titulo}\n`
            }]);
          } else {
            // Sala completada
            setSalasCompletadas(s => [...s, sala.id]);
            if (onCompletarSala) onCompletarSala(sala.id, sala.xp);
            setVistaLocal("completada");
          }
        }
      }, 1200);
    }
  };

  const ejecutarCmd = (cmd) => {
    if (!cmd.trim() || !salaActiva) return;
    setHistCmds(h => [cmd, ...h]);
    setHistIdx(-1);
    const prompt = `${estadoShell.usuario}@${salaActiva.sistema.hostname}:${estadoShell.directorio}${estadoShell.usuario === "root" ? "#" : "$"}`;
    const { output, nuevoEstado } = procesarCmdSala(cmd, estadoShell, salaActiva);
    setEstadoShell(nuevoEstado);
    if (output === "__CLEAR__") {
      setHistorial([{ tipo: "sistema", texto: "Pantalla limpiada." }]);
    } else {
      setHistorial(h => [
        ...h,
        { tipo: "input", texto: `${prompt} ${cmd}` },
        ...(output ? [{ tipo: "output", texto: output }] : [])
      ]);
    }
    setInputCmd("");
  };

  const handleKeyCmd = (e) => {
    if (e.key === "Enter") { ejecutarCmd(inputCmd); }
    else if (e.key === "ArrowUp") { e.preventDefault(); const ni = Math.min(histIdx + 1, histCmds.length - 1); setHistIdx(ni); setInputCmd(histCmds[ni] || ""); }
    else if (e.key === "ArrowDown") { e.preventDefault(); const ni = Math.max(histIdx - 1, -1); setHistIdx(ni); setInputCmd(ni === -1 ? "" : histCmds[ni]); }
  };

  // ── LISTA DE SALAS ──
  if (vistaLocal === "lista") return (
    <div style={{ fontFamily: "'Rajdhani',sans-serif", color: "#c9d1d9" }}>
      <style>{CSS}</style>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <button className="thm-btn" onClick={onVolver} style={{ background: PANEL, color: TEXT, padding: "8px 16px", fontSize: 11, border: `1px solid ${BORDER}` }}>← TERMINAL</button>
        <div style={{ color: CYAN, fontSize: 11, letterSpacing: 3 }}>◈ THM SALAS SIMULADAS</div>
        <div style={{ color: TEXT, fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }}>{salasCompletadas.length}/{salas.length} completadas</div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ color: "#fff", fontSize: 22, margin: "0 0 8px" }}>TryHackMe — Salas Simuladas</h2>
        <p style={{ color: TEXT, fontSize: 13, fontFamily: "'JetBrains Mono',monospace" }}>
          Escenarios que imitan salas reales de THM. Sin VPN, sin suscripción. Practica la metodología completa.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {salas.map((sala, i) => {
          const completada = salasCompletadas.includes(sala.id);
          return (
            <div key={sala.id}
              className="fade-in"
              onClick={() => iniciarSala(sala)}
              style={{
                background: completada ? `${sala.color}11` : PANEL,
                border: `1px solid ${completada ? sala.color + "66" : BORDER}`,
                borderRadius: 12, padding: 24, cursor: "pointer",
                transition: "all .2s", animationDelay: `${i * 60}ms`
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = sala.color + "55"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = completada ? sala.color + "66" : BORDER; }}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 28 }}>{completada ? "✅" : sala.icon}</span>
                  <div>
                    <div style={{ color: "#fff", fontWeight: "bold", fontSize: 17 }}>{sala.nombre}</div>
                    <div style={{ color: TEXT, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", marginTop: 2 }}>{sala.tiempo} · {sala.tareas.length} tareas</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <span style={{
                    background: sala.dificultad === "Fácil" ? "#22c55e22" : sala.dificultad === "Medio" ? "#f59e0b22" : "#f43f5e22",
                    color: sala.dificultad === "Fácil" ? "#22c55e" : sala.dificultad === "Medio" ? "#f59e0b" : "#f43f5e",
                    fontSize: 10, padding: "3px 10px", borderRadius: 4, letterSpacing: 1
                  }}>{sala.dificultad.toUpperCase()}</span>
                  <span style={{ background: "#a78bfa22", color: "#a78bfa", fontSize: 10, padding: "3px 10px", borderRadius: 4 }}>+{sala.xp} XP</span>
                </div>
              </div>

              <p style={{ color: TEXT, fontSize: 13, margin: "0 0 12px", fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.6 }}>{sala.descripcion}</p>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {sala.tags.map(tag => (
                  <span key={tag} style={{ background: BG, border: `1px solid ${sala.color}33`, color: sala.color, fontSize: 10, padding: "2px 8px", borderRadius: 12 }}>{tag}</span>
                ))}
              </div>

              <div style={{ marginTop: 16, color: sala.color, fontSize: 12, letterSpacing: 1 }}>
                {completada ? "✅ COMPLETADA — Volver a jugar →" : "▶ INICIAR SALA →"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── SALA ACTIVA ──
  if (vistaLocal === "sala" && salaActiva) {
    const tarea = salaActiva.tareas[tareaIdx];
    const pregunta = tarea.preguntas[preguntaIdx];
    const totalPreguntas = salaActiva.tareas.reduce((acc, t) => acc + t.preguntas.length, 0);
    const completadasCount = preguntasCompletadas.length;

    return (
      <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#c9d1d9" }}>
        <style>{CSS}</style>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <button className="thm-btn" onClick={() => setVistaLocal("lista")} style={{ background: PANEL, color: TEXT, padding: "8px 16px", fontSize: 11, border: `1px solid ${BORDER}` }}>← SALAS</button>
          <div style={{ color: salaActiva.color, fontSize: 11, letterSpacing: 2 }}>{salaActiva.icon} {salaActiva.nombre.toUpperCase()}</div>
          <div style={{ color: TEXT, fontSize: 11 }}>{completadasCount}/{totalPreguntas} ✓</div>
        </div>

        {/* Barra de progreso */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ height: 4, background: BORDER, borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(completadasCount / totalPreguntas) * 100}%`, background: salaActiva.color, borderRadius: 2, transition: "width 0.5s", boxShadow: `0 0 8px ${salaActiva.color}66` }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

          {/* Panel izquierdo — Preguntas */}
          <div>
            {/* Tarea actual */}
            <div style={{ background: PANEL, border: `1px solid ${salaActiva.color}33`, borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ color: salaActiva.color, fontSize: 10, letterSpacing: 2, marginBottom: 6 }}>TASK {tarea.id}</div>
              <div style={{ color: "#fff", fontWeight: "bold", fontSize: 14, marginBottom: 6 }}>{tarea.titulo}</div>
              <div style={{ color: TEXT, fontSize: 12, lineHeight: 1.6 }}>{tarea.descripcion}</div>
            </div>

            {/* Lista de tareas (progreso) */}
            <div style={{ marginBottom: 12 }}>
              {salaActiva.tareas.map((t, ti) => (
                <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, opacity: ti > tareaIdx ? 0.4 : 1 }}>
                  <span style={{ fontSize: 12 }}>{ti < tareaIdx ? "✅" : ti === tareaIdx ? "▶" : "○"}</span>
                  <span style={{ color: ti === tareaIdx ? "#fff" : TEXT, fontSize: 12 }}>{t.titulo}</span>
                </div>
              ))}
            </div>

            {/* Pregunta actual */}
            <div style={{ background: "#020810", border: `1px solid ${respuestaEstado === "correcto" ? "#22c55e44" : respuestaEstado === "incorrecto" ? "#f43f5e44" : CYAN + "33"}`, borderRadius: 8, padding: 16 }}>
              <div style={{ color: CYAN, fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>
                PREGUNTA {preguntaIdx + 1}/{tarea.preguntas.length}
              </div>
              <div style={{ color: "#fff", fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>{pregunta.pregunta}</div>

              {mostrarPista && (
                <div style={{ background: "#f59e0b11", border: "1px solid #f59e0b33", borderRadius: 6, padding: "8px 12px", marginBottom: 12, color: "#f59e0b", fontSize: 12 }}>
                  💡 {pregunta.pista}
                </div>
              )}

              <div style={{ display: "flex", gap: 8 }}>
                <input className="thm-input"
                  style={{ flex: 1, borderColor: respuestaEstado === "correcto" ? "#22c55e" : respuestaEstado === "incorrecto" ? "#f43f5e" : undefined }}
                  value={respuestaInput}
                  onChange={e => { setRespuestaInput(e.target.value); setRespuestaEstado(null); }}
                  onKeyDown={e => e.key === "Enter" && verificarRespuesta()}
                  placeholder="Tu respuesta..."
                  spellCheck={false}
                />
                <button className="thm-btn" onClick={verificarRespuesta}
                  style={{ background: salaActiva.color, color: "#000", padding: "10px 16px", fontSize: 12 }}>
                  ✓
                </button>
              </div>

              {respuestaEstado && (
                <div style={{ marginTop: 10, padding: "8px 12px", borderRadius: 6, background: respuestaEstado === "correcto" ? "#22c55e11" : "#f43f5e11", color: respuestaEstado === "correcto" ? "#22c55e" : "#f43f5e", fontSize: 12 }}>
                  {respuestaEstado === "correcto" ? "✅ ¡Correcto!" : "❌ Incorrecto. Intenta de nuevo."}
                </div>
              )}

              <button onClick={() => setMostrarPista(p => !p)}
                style={{ marginTop: 10, background: "transparent", border: `1px solid ${BORDER}`, color: TEXT, padding: "6px 12px", borderRadius: 4, fontSize: 11, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace" }}>
                {mostrarPista ? "Ocultar pista" : "💡 Mostrar pista"}
              </button>
            </div>
          </div>

          {/* Panel derecho — Terminal */}
          <div>
            <div style={{ color: CYAN, fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>TERMINAL — Practica aquí</div>
            <div style={{ background: "#020810", border: `1px solid ${CYAN}22`, borderRadius: 8, overflow: "hidden" }}>
              <div style={{ background: "#040c18", padding: "8px 14px", borderBottom: `1px solid ${BORDER}`, display: "flex", gap: 6, alignItems: "center" }}>
                {["#ff5f57", "#ffbd2e", "#28ca41"].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                <span style={{ color: TEXT, fontSize: 10, marginLeft: 6 }}>{estadoShell.usuario}@{salaActiva.sistema.hostname}</span>
              </div>
              <div className="scrollbar" style={{ height: 320, overflowY: "auto", padding: 12 }} onClick={() => inputRef.current?.focus()}>
                {historial.map((line, i) => (
                  <div key={i} style={{ fontSize: 11, lineHeight: 1.8, marginBottom: 1, whiteSpace: "pre-wrap", wordBreak: "break-all", color: line.tipo === "input" ? CYAN : line.tipo === "sistema" ? "#f59e0b" : "#4ade80" }}>
                    {line.texto}
                  </div>
                ))}
                <div ref={shellEndRef} />
              </div>
              <div style={{ background: "#040c18", borderTop: `1px solid ${BORDER}`, padding: "8px 12px", display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ color: estadoShell.usuario === "root" ? "#f43f5e" : CYAN, fontSize: 11, flexShrink: 0 }}>
                  {estadoShell.usuario}@{salaActiva.sistema.hostname}:{estadoShell.directorio}{estadoShell.usuario === "root" ? "#" : "$"}
                </span>
                <input ref={inputRef} style={{ background: "transparent", border: "none", flex: 1, color: "#fff", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, outline: "none" }}
                  value={inputCmd} onChange={e => setInputCmd(e.target.value)}
                  onKeyDown={handleKeyCmd} placeholder="comando..." autoFocus spellCheck={false} />
              </div>
            </div>

            {/* Comandos rápidos */}
            <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["whoami", "ls -la", "sudo -l", "find / -perm -4000 2>/dev/null", "hint", "solucion"].map(c => (
                <button key={c} onClick={() => { setInputCmd(c); inputRef.current?.focus(); }}
                  style={{ background: PANEL, border: `1px solid ${BORDER}`, color: TEXT, padding: "4px 8px", borderRadius: 4, fontSize: 10, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace" }}
                  onMouseEnter={e => { e.target.style.borderColor = CYAN + "44"; e.target.style.color = CYAN; }}
                  onMouseLeave={e => { e.target.style.borderColor = BORDER; e.target.style.color = TEXT; }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SALA COMPLETADA ──
  if (vistaLocal === "completada" && salaActiva) return (
    <div style={{ fontFamily: "'Rajdhani',sans-serif", color: "#c9d1d9", textAlign: "center", padding: "40px 20px" }}>
      <style>{CSS}</style>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <h2 style={{ color: salaActiva.color, fontSize: 28, marginBottom: 8 }}>¡SALA COMPLETADA!</h2>
      <div style={{ color: "#fff", fontSize: 18, marginBottom: 24 }}>{salaActiva.nombre}</div>

      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 32 }}>
        <div style={{ background: PANEL, border: `1px solid ${salaActiva.color}44`, borderRadius: 8, padding: "16px 24px" }}>
          <div style={{ color: salaActiva.color, fontSize: 24, fontFamily: "'JetBrains Mono',monospace" }}>+{salaActiva.xp}</div>
          <div style={{ color: TEXT, fontSize: 12 }}>XP ganados</div>
        </div>
        <div style={{ background: PANEL, border: "1px solid #22c55e44", borderRadius: 8, padding: "16px 24px" }}>
          <div style={{ color: "#22c55e", fontSize: 24, fontFamily: "'JetBrains Mono',monospace" }}>{salaActiva.tareas.length}/{salaActiva.tareas.length}</div>
          <div style={{ color: TEXT, fontSize: 12 }}>Tareas completadas</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button className="thm-btn" onClick={() => iniciarSala(salaActiva)}
          style={{ background: PANEL, color: TEXT, padding: "12px 24px", fontSize: 13, border: `1px solid ${BORDER}` }}>
          🔄 Repetir sala
        </button>
        <button className="thm-btn" onClick={() => setVistaLocal("lista")}
          style={{ background: salaActiva.color, color: "#000", padding: "12px 24px", fontSize: 13 }}>
          → Más salas
        </button>
      </div>
    </div>
  );

  return null;
}
