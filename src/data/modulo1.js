// src/data/modulo1.js
// HACKFORGE — Módulo 1: Internet 101
// Contenido original reescrito con estilo propio

export const MODULO1 = {
  id: 1,
  nombre: "Internet 101",
  descripcion: "Antes de hackear algo, tienes que entender cómo funciona. Este módulo cubre la infraestructura real de internet — lo que nadie te explica.",
  icon: "🌐",
  color: "#00d4ff",
  xp: 300,
  tag: "FREE",
  lecciones: [

    // ─── LECCIÓN 1 ────────────────────────────────────────────
    {
      id: "1-1",
      titulo: "El Navegador y la Red",
      slides: [
        {
          tag: "CONCEPTO BASE",
          titulo: "¿Qué hace realmente tu navegador?",
          contenido: `Chrome, Firefox, Edge, Safari — todos hacen lo mismo: son mensajeros.

Cuando abres una URL, el navegador no tiene esa información guardada. Sale a buscarla a otro computador en algún lugar del mundo, la recibe y la dibuja en tu pantalla.

Ese "otro computador" se llama servidor. Tu navegador es el cliente que hace peticiones. El servidor es el que responde.

Desde el punto de vista de seguridad, esa comunicación cliente-servidor es donde ocurre la mayoría de los ataques web.`
        },
        {
          tag: "INFRAESTRUCTURA",
          titulo: "Internet no es una nube",
          contenido: `Internet es infraestructura física. Cables enterrados bajo tierra y bajo el océano, antenas, routers y centros de datos con servidores encendidos 24/7.

Cuando subes una foto, esos datos viajan por cables de fibra óptica que transmiten luz en lugar de electricidad — algunos cruzando océanos.

¿Por qué importa esto en ciberseguridad? Porque todo ataque físico a esa infraestructura puede derribar servicios enteros. En 2022, el corte de un cable submarino en Tonga dejó al país casi sin internet por semanas.

Tu red local (wifi de casa) es solo el primer eslabón de esa cadena.`
        },
        {
          tag: "PAQUETES",
          titulo: "Cómo viajan los datos",
          contenido: `Los datos no viajan como archivos completos. Se fragmentan en paquetes — trozos pequeños que contienen:

- Datos en sí (parte del video, imagen, texto)
- IP de origen (de dónde viene)
- IP de destino (hacia dónde va)
- Número de secuencia (para reensamblarlos en orden)

Un video de YouTube llega en miles de paquetes que viajan por diferentes rutas y se reensamblan en tu dispositivo.

Si un paquete se pierde, tu dispositivo lo pide de nuevo. Ese mecanismo se llama TCP y lo veremos en profundidad más adelante.

Dato de seguridad: herramientas como Wireshark capturan esos paquetes en tiempo real — es una de las técnicas básicas de análisis de red.`
        },
      ],
      quiz: [
        {
          q: "Un atacante usa Wireshark para capturar tráfico de red. ¿Qué está capturando exactamente?",
          opts: ["Archivos completos que viajan por la red", "Paquetes de datos — fragmentos con origen, destino y contenido", "Solo las contraseñas que viajan en la red", "El historial del navegador de otros usuarios"],
          c: 1,
          e: "Wireshark captura paquetes — los fragmentos en que se dividen todos los datos que viajan por la red. Puede capturar cualquier tipo de tráfico, no solo contraseñas."
        },
        {
          q: "¿Cuál es el rol del navegador en la arquitectura cliente-servidor?",
          opts: ["Es el servidor que almacena las páginas web", "Es el cliente que hace peticiones a servidores remotos y dibuja las respuestas", "Es un intermediario que guarda copias de todos los sitios", "Es el sistema operativo que gestiona las conexiones"],
          c: 1,
          e: "El navegador es el cliente. Hace peticiones HTTP/HTTPS a servidores remotos y renderiza la respuesta en tu pantalla."
        },
        {
          q: "Un paquete se pierde en tránsito. ¿Qué protocolo se encarga de pedirlo de nuevo?",
          opts: ["UDP", "DNS", "TCP", "HTTP"],
          c: 2,
          e: "TCP (Transmission Control Protocol) garantiza la entrega de todos los paquetes. Si uno se pierde, solicita la retransmisión automáticamente."
        },
        {
          q: "¿Por qué internet usa múltiples rutas para enviar paquetes?",
          opts: ["Para hacer los datos más difíciles de interceptar", "Para mayor velocidad y tolerancia a fallos — si una ruta cae, los paquetes toman otra", "Para cumplir regulaciones internacionales de privacidad", "Para que el ISP pueda cobrar según el uso"],
          c: 1,
          e: "El enrutamiento dinámico permite que los paquetes tomen rutas alternativas si algún nodo falla. Esto hace internet resistente pero también significa que dos paquetes del mismo archivo pueden llegar por caminos distintos."
        },
        {
          q: "¿Qué contiene la cabecera (header) de un paquete de red?",
          opts: ["Solo los datos del archivo que se está transfiriendo", "Metadatos: IP origen, IP destino, número de secuencia y otros campos de control", "El nombre del usuario que envió los datos", "El tipo de navegador que generó la petición"],
          c: 1,
          e: "La cabecera del paquete contiene los metadatos necesarios para enrutar y reensamblar los datos: IP origen, IP destino, protocolo, número de secuencia, etc."
        },
      ]
    },

    // ─── LECCIÓN 2 ────────────────────────────────────────────
    {
      id: "1-2",
      titulo: "URLs y HTTP",
      slides: [
        {
          tag: "ANATOMÍA",
          titulo: "Diseccionando una URL",
          contenido: `Una URL tiene partes bien definidas. Ignorarlas es un error de seguridad.

https://app.victima.com:8443/admin/panel?user=1&debug=true#config

Desglose:
- https:// → esquema/protocolo (cifrado)
- app → subdominio
- victima.com → dominio
- :8443 → puerto no estándar (señal de alerta)
- /admin/panel → ruta (¿panel admin expuesto?)
- ?user=1&debug=true → parámetros (¡inyección potencial!)
- #config → fragmento (client-side only)

Los parámetros en la URL son el punto de entrada más común para SQL Injection, XSS y manipulación de lógica de negocio. Siempre analiza los parámetros primero.`
        },
        {
          tag: "PROTOCOLO",
          titulo: "HTTP vs HTTPS",
          contenido: `HTTP (HyperText Transfer Protocol) — texto plano. Todo lo que envías viaja legible por la red.

HTTPS — HTTP + TLS/SSL. El tráfico viaja cifrado. Un atacante que intercepte la conexión solo ve datos ilegibles.

El cifrado en HTTPS usa criptografía asimétrica para el handshake inicial (intercambio de claves) y criptografía simétrica para el tráfico continuo.

Señales de alerta en seguridad:
- Formularios de login en sitios HTTP → credenciales viajan en texto plano
- Certificados expirados o autofirmados → posible MITM
- HTTP en redes públicas → cualquiera con Wireshark puede leer tu tráfico

Dato: los ataques Man-in-the-Middle (MITM) en redes wifi públicas explotan exactamente la falta de HTTPS o certificados inválidos.`
        },
        {
          tag: "PETICIONES",
          titulo: "Métodos HTTP",
          contenido: `HTTP define métodos que indican qué quieres hacer:

GET → pedir datos (parámetros van en la URL — visibles en logs)
POST → enviar datos (van en el body — más discreto, pero no más seguro)
PUT → reemplazar un recurso completo
PATCH → modificar parte de un recurso
DELETE → eliminar un recurso
HEAD → como GET pero solo devuelve cabeceras

En seguridad, esto importa porque:
- Los parámetros GET quedan en logs del servidor, historial del navegador y caché
- Muchas APIs mal diseñadas usan GET para operaciones que deberían ser POST (idempotencia)
- Algunos firewalls solo filtran POST y dejan pasar GET libremente
- Verbos no esperados (PUT, DELETE) a endpoints sensibles pueden revelar funciones ocultas`
        },
      ],
      quiz: [
        {
          q: "Encuentras esta URL en una app: https://api.banco.com/transfer?from=1001&to=1002&amount=500. ¿Cuál es el riesgo principal?",
          opts: ["Ninguno, HTTPS cifra los parámetros completamente", "Los parámetros en la URL quedan en logs del servidor, historial y caché — información sensible expuesta", "El dominio .com no es seguro para operaciones bancarias", "El endpoint /transfer debería llamarse /send"],
          c: 1,
          e: "Aunque HTTPS cifra el tráfico en tránsito, los parámetros en la URL quedan registrados en logs del servidor, historial del navegador y proxies intermedios. Datos sensibles deben ir en el body de un POST."
        },
        {
          q: "¿Qué diferencia de seguridad existe entre un formulario de login en HTTP vs HTTPS?",
          opts: ["Ninguna, los formularios cifran los datos automáticamente", "En HTTP las credenciales viajan en texto plano — cualquier atacante en la red puede leerlas; en HTTPS viajan cifradas", "HTTPS solo protege la contraseña, no el usuario", "HTTP es más rápido pero HTTPS es más compatible con navegadores modernos"],
          c: 1,
          e: "En HTTP, todos los datos viajan en texto plano. Un atacante con Wireshark en la misma red puede capturar el usuario y contraseña. HTTPS cifra el tráfico, pero no protege contra contraseñas débiles o servidores comprometidos."
        },
        {
          q: "Un auditor hace una petición DELETE a https://api.empresa.com/users/admin. El servidor responde 200 OK. ¿Qué descubrió?",
          opts: ["Que el servidor tiene un bug de configuración sin importancia", "Que el endpoint permite eliminar usuarios sin autenticación — vulnerabilidad crítica de control de acceso", "Que DELETE no está implementado y el servidor lo ignora", "Que el usuario admin tiene privilegios elevados"],
          c: 1,
          e: "Un endpoint que permite DELETE sin verificar autenticación o autorización es una vulnerabilidad crítica. Corresponde a Broken Access Control, el #1 de OWASP Top 10."
        },
        {
          q: "¿En qué parte de la URL irían datos de inyección SQL básica como ' OR 1=1--?",
          opts: ["Solo en el fragmento (#)", "En los parámetros (?param=valor) — el punto de entrada más común para SQLi", "En el esquema (https://)", "En el subdominio"],
          c: 1,
          e: "Los parámetros de la URL son el punto de entrada clásico para SQL Injection. Un parámetro como ?id=' OR 1=1-- puede manipular la query SQL del servidor si no está sanitizado."
        },
        {
          q: "¿Qué es un ataque Man-in-the-Middle (MITM)?",
          opts: ["Un ataque donde el atacante se hace pasar por el administrador del sistema", "Un ataque donde el atacante se interpone entre cliente y servidor interceptando y posiblemente modificando el tráfico", "Un ataque de fuerza bruta contra el middleware de la aplicación", "Un ataque donde dos atacantes coordinan simultáneamente"],
          c: 1,
          e: "En un MITM, el atacante se posiciona entre el cliente y el servidor. En redes HTTP, puede leer y modificar el tráfico. HTTPS dificulta esto, pero no lo hace imposible si el usuario acepta certificados inválidos."
        },
      ]
    },

    // ─── LECCIÓN 3 ────────────────────────────────────────────
    {
      id: "1-3",
      titulo: "Direcciones IP",
      slides: [
        {
          tag: "FUNDAMENTO",
          titulo: "IP Pública vs IP Privada",
          contenido: `Todo dispositivo en una red tiene una dirección IP — su identificador único.

IP Privada: solo existe dentro de tu red local.
- 192.168.x.x → redes domésticas
- 10.x.x.x → redes empresariales
- 172.16.x.x a 172.31.x.x → otro rango privado

IP Pública: visible en internet. Tu router tiene una, asignada por tu ISP.

Cuando navegas, los servidores ven la IP pública de tu router, no la IP privada de tu dispositivo. Eso lo hace NAT (Network Address Translation).

En pentesting, identificar si una IP es pública o privada determina si el objetivo es accesible desde internet o solo desde dentro de la red.`
        },
        {
          tag: "ESPECIAL",
          titulo: "localhost y 127.0.0.1",
          contenido: `127.0.0.1 es la dirección de loopback — tu propio equipo.

Cuando tu navegador va a http://localhost, no sale a ninguna red. El tráfico se queda dentro del mismo sistema operativo.

¿Por qué importa en seguridad?

Muchos servicios internos escuchan en localhost asumiendo que nadie externo puede llegar ahí — bases de datos, paneles de administración, APIs de debug.

Un atacante con acceso al sistema puede explotar esos servicios locales. SSRF (Server-Side Request Forgery) es una vulnerabilidad que fuerza al servidor a hacer peticiones a http://localhost/admin — accediendo a servicios que no deberían ser accesibles desde internet.`
        },
        {
          tag: "VERSIONES",
          titulo: "IPv4, IPv6 y el agotamiento",
          contenido: `IPv4: cuatro números de 0 a 255. Ejemplo: 192.168.1.100
Total de direcciones: ~4.300 millones. Agotadas desde 2011.

IPv6: formato hexadecimal con dos puntos. Ejemplo: 2001:db8::8a2e:370:7334
Total: 340 undecillones de direcciones. Prácticamente inagotables.

Hoy internet usa ambos en paralelo (dual stack).

En seguridad: muchos firewalls y herramientas están configurados para IPv4 pero ignoran IPv6. Un atacante puede usar IPv6 para bypassear controles que solo filtran IPv4. Es un vector de evasión real.`
        },
      ],
      quiz: [
        {
          q: "Encuentras el servicio Redis escuchando en 127.0.0.1:6379 sin contraseña. ¿Representa un riesgo?",
          opts: ["No, porque 127.0.0.1 solo es accesible localmente", "Sí — si el atacante logra SSRF o acceso al sistema, puede interactuar con Redis y leer/escribir datos sin autenticación", "No, Redis siempre cifra las conexiones automáticamente", "Sí, pero solo si Redis está en Windows"],
          c: 1,
          e: "Servicios en localhost sin autenticación son peligrosos si el atacante consigue SSRF, acceso remoto o hay otro servicio comprometido en el mismo host. Redis sin contraseña en localhost es un hallazgo clásico de pentesting."
        },
        {
          q: "Un servidor web tiene su panel de administración escuchando en http://10.0.0.1/admin. ¿Desde dónde es accesible?",
          opts: ["Desde cualquier lugar de internet", "Solo desde dentro de la red privada (10.x.x.x es rango privado)", "Solo desde el mismo servidor", "Desde internet si se conoce la IP"],
          c: 1,
          e: "10.x.x.x es un rango de IP privado. Solo es accesible desde dentro de esa red local o mediante VPN. Un atacante externo necesitaría primero comprometer un sistema dentro de la red para llegar ahí."
        },
        {
          q: "¿Qué es NAT y por qué existe?",
          opts: ["Network Attack Tool — herramienta para escanear redes", "Network Address Translation — permite que múltiples dispositivos con IPs privadas compartan una sola IP pública", "Network Authentication Token — sistema de autenticación de red", "Un protocolo para asignar IPs automáticamente"],
          c: 1,
          e: "NAT traduce las IPs privadas de tu red local a la IP pública del router cuando los datos salen a internet, y viceversa. Surgió para conservar el limitado espacio de IPv4."
        },
        {
          q: "Un pentester descubre que el firewall filtra IPv4 pero no IPv6. ¿Qué puede hacer?",
          opts: ["Nada, IPv6 no está implementado en la mayoría de sistemas", "Intentar acceder a servicios usando su dirección IPv6 para bypassear las reglas del firewall", "Convertir su tráfico IPv6 a IPv4 para que el firewall lo procese", "Reportarlo como falso positivo"],
          c: 1,
          e: "Es un vector de evasión real. Si un servidor tiene dual stack (IPv4 e IPv6) y el firewall solo filtra IPv4, los servicios pueden ser accesibles por IPv6 sin pasar por los controles de seguridad."
        },
        {
          q: "¿Cuál de estas IPs es válida en IPv4?",
          opts: ["300.168.1.1", "192.168.256.1", "10.0.0.254", "172.32.300.5"],
          c: 2,
          e: "En IPv4 cada octeto va de 0 a 255. 10.0.0.254 es válida (rango privado empresarial). Las demás tienen valores superiores a 255 (300, 256, 300) que no son válidos en IPv4."
        },
      ]
    },

    // ─── LECCIÓN 4 ────────────────────────────────────────────
    {
      id: "1-4",
      titulo: "Puertos y Servicios",
      slides: [
        {
          tag: "CONCEPTO CLAVE",
          titulo: "¿Qué es un puerto?",
          contenido: `La IP lleva el dato al equipo correcto. El puerto lleva el dato al programa correcto dentro de ese equipo.

Un servidor puede tener decenas de servicios corriendo simultáneamente. El puerto diferencia a cuál va cada conexión.

Notación estándar: IP:puerto → 192.168.1.100:443

Desde el punto de vista del atacante, un puerto abierto es una puerta. Lo que hay detrás (el servicio) puede tener vulnerabilidades.

Por eso el escaneo de puertos con nmap es uno de los primeros pasos en cualquier reconocimiento:
nmap -sV 192.168.1.100
Detecta puertos abiertos y versiones de servicios.`
        },
        {
          tag: "REFERENCIA",
          titulo: "Puertos críticos que debes conocer",
          contenido: `Puertos de ataque frecuente:

21 → FTP (credenciales en texto plano, anonymous login)
22 → SSH (fuerza bruta, claves débiles)
23 → Telnet (texto plano, obsoleto — señal de alerta)
25 → SMTP (relay abierto, spam, phishing)
53 → DNS (zone transfer, DNS poisoning)
80 → HTTP (sin cifrado, XSS, SQLi)
443 → HTTPS (XSS, SQLi, pero cifrado)
445 → SMB (EternalBlue, ransomware WannaCry)
3306 → MySQL (acceso directo a DB)
3389 → RDP Windows (BlueKeep, fuerza bruta)
8080/8443 → servidores de desarrollo expuestos

Ver el puerto 23 (Telnet) abierto en 2025 es una señal grave de mala configuración.`
        },
        {
          tag: "TÉCNICA",
          titulo: "Puertos efímeros y análisis de conexiones",
          contenido: `Cuando tu navegador se conecta a un servidor, tu sistema operativo le asigna un puerto temporal (efímero) en el rango 49152–65535.

La conexión completa se ve así:
Tu equipo: 192.168.1.14:52847 ↔ Servidor: 93.184.216.34:443

Comando para ver conexiones activas en tu sistema:
Linux/Mac: ss -tnp o netstat -tnp
Windows: netstat -ano

Esto es útil para detectar conexiones sospechosas — si tu equipo tiene una conexión establecida a una IP desconocida en un puerto raro, puede ser malware comunicándose con un C2 (Command and Control).`
        },
      ],
      quiz: [
        {
          q: "Durante un escaneo, encuentras los puertos 22, 80, 443 y 3306 abiertos. ¿Cuál representa el mayor riesgo inmediato?",
          opts: ["Puerto 22 (SSH)", "Puerto 80 (HTTP)", "Puerto 443 (HTTPS)", "Puerto 3306 (MySQL) — expuesto directamente a internet"],
          c: 3,
          e: "El puerto 3306 (MySQL) expuesto a internet es crítico. La base de datos no debería ser accesible desde el exterior. Un atacante puede intentar autenticarse directamente, sin pasar por la aplicación web."
        },
        {
          q: "Un servidor tiene el puerto 23 abierto. ¿Qué significa?",
          opts: ["El servidor usa un protocolo de transferencia moderno", "El servidor tiene Telnet activo — comunicación en texto plano, protocolo obsoleto y riesgo de seguridad grave", "Es el puerto de administración seguro de Linux", "El servidor está en mantenimiento"],
          c: 1,
          e: "Telnet (puerto 23) transmite todo en texto plano incluyendo contraseñas. Fue reemplazado por SSH (puerto 22) hace décadas. Verlo abierto indica mala configuración o sistema muy antiguo."
        },
        {
          q: "Ejecutas netstat -tnp y ves una conexión ESTABLISHED desde tu PC a 185.220.101.45:4444. ¿Qué podría indicar?",
          opts: ["Una conexión normal a un servidor de actualizaciones", "Posible malware con un C2 (Command and Control) — el puerto 4444 es típico de Metasploit y el destino es desconocido", "Una conexión VPN estándar", "El navegador conectado a un sitio HTTPS"],
          c: 1,
          e: "El puerto 4444 es el puerto por defecto del listener de Metasploit. Una conexión establecida a una IP desconocida en ese puerto es señal de alerta de posible malware o backdoor activo."
        },
        {
          q: "¿Cuál es el comando nmap para detectar versiones de servicios en los puertos abiertos?",
          opts: ["nmap -p 0-65535", "nmap -sV (service version detection)", "nmap -O (OS detection)", "nmap -sn (ping sweep)"],
          c: 1,
          e: "nmap -sV activa la detección de versiones. Saber que el puerto 22 corre OpenSSH 7.4 es más útil que solo saber que está abierto — permite buscar CVEs específicos para esa versión."
        },
        {
          q: "El exploit EternalBlue (usado por WannaCry) ataca el puerto 445. ¿Qué servicio corre ahí?",
          opts: ["FTP — File Transfer Protocol", "RDP — Remote Desktop Protocol", "SMB — Server Message Block (compartición de archivos Windows)", "SMTP — Simple Mail Transfer Protocol"],
          c: 2,
          e: "SMB (puerto 445) es el protocolo de compartición de archivos de Windows. EternalBlue explotó una vulnerabilidad crítica en SMBv1, lo que permitió a WannaCry propagarse automáticamente por redes enteras en 2017."
        },
      ]
    },

    // ─── LECCIÓN 5 ────────────────────────────────────────────
    {
      id: "1-5",
      titulo: "DNS — El Directorio de Internet",
      slides: [
        {
          tag: "FUNCIONAMIENTO",
          titulo: "Cómo resuelve el DNS",
          contenido: `DNS (Domain Name System) convierte nombres legibles en IPs numéricas.

hackforge.lat → 104.21.48.123

El proceso de resolución:
1. Tu equipo consulta al resolver DNS local (generalmente tu router)
2. El resolver pregunta a un servidor raíz (hay 13 en el mundo)
3. El servidor raíz refiere al servidor TLD (.lat, .com, .org)
4. El servidor TLD refiere al servidor autoritativo del dominio
5. El servidor autoritativo responde con la IP
6. Tu equipo cachea el resultado por el tiempo TTL

Todo esto ocurre en milisegundos. Si el DNS falla, no puedes acceder a nada por nombre — aunque internet siga funcionando.`
        },
        {
          tag: "ATAQUES",
          titulo: "DNS como vector de ataque",
          contenido: `El DNS es un objetivo frecuente porque es fundamental y a veces mal protegido.

DNS Spoofing / Cache Poisoning:
El atacante envía respuestas DNS falsas. Tu equipo cachea que hackforge.lat = IP del atacante. Te conectas pensando que estás en el sitio real.

DNS Zone Transfer:
Si un servidor DNS está mal configurado, permite listar TODOS los subdominios del dominio — reconnaissance gratis para el atacante.
Comando: dig axfr @ns1.victima.com victima.com

DNS Tunneling:
Exfiltrar datos o establecer C2 codificando información en consultas DNS. Difícil de detectar porque el DNS rara vez está bloqueado.

DNS Hijacking:
Comprometer el registro del dominio para redirigir todo el tráfico. Ocurrió con grandes empresas.`
        },
        {
          tag: "REGISTROS",
          titulo: "Tipos de registros DNS",
          contenido: `Cada dominio tiene registros DNS que definen cómo funciona:

A → IPv4 del dominio (hackforge.lat → 104.21.48.123)
AAAA → IPv6 del dominio
CNAME → Alias (www → hackforge.lat)
MX → Servidor de correo del dominio
TXT → Texto libre (SPF, DKIM, verificación de dominio)
NS → Servidores de nombres autoritativos
SOA → Información de zona (usado en zone transfer)

En reconnaissance, los registros MX revelan el proveedor de email (Google Workspace, Microsoft 365, etc.), los TXT revelan herramientas usadas, y los NS revelan el registrar.

Herramienta: dig hackforge.lat ANY`
        },
      ],
      quiz: [
        {
          q: "Ejecutas: dig axfr @ns1.empresa.com empresa.com y recibes una lista completa de subdominios. ¿Qué encontraste?",
          opts: ["Una configuración normal de DNS", "Una vulnerabilidad de Zone Transfer — el servidor permite listar todos los subdominios, facilitando el reconocimiento del atacante", "Un ataque de DNS Spoofing en curso", "El servidor de correo del dominio"],
          c: 1,
          e: "Zone Transfer (AXFR) debería estar restringido solo a servidores DNS secundarios. Si está abierto públicamente, el atacante obtiene gratis todos los subdominios — dev.empresa.com, admin.empresa.com, vpn.empresa.com, etc."
        },
        {
          q: "¿Qué registro DNS debes consultar para encontrar el servidor de correo de un dominio?",
          opts: ["Registro A", "Registro MX (Mail Exchanger)", "Registro CNAME", "Registro TXT"],
          c: 1,
          e: "El registro MX define qué servidor gestiona el correo del dominio. Conocer el proveedor de email (Google, Microsoft, etc.) ayuda a planificar ataques de phishing o entender la infraestructura."
        },
        {
          q: "Tu equipo tiene cacheado que banco.cl = 200.1.2.3. Un atacante poisoneó el caché y cambió la respuesta a 192.0.2.1. ¿Qué ocurre cuando ingresas a banco.cl?",
          opts: ["El navegador detecta el ataque y bloquea la conexión", "Te conectas a la IP del atacante (192.0.2.1) creyendo que estás en el banco real — DNS Spoofing exitoso", "El DNS corrige el error automáticamente", "La página del banco no carga porque la IP cambió"],
          c: 1,
          e: "Con DNS Cache Poisoning, el atacante redirige el tráfico a su servidor. Si no hay validación adicional (HSTS, certificados correctos), el usuario puede ingresar credenciales en un sitio falso."
        },
        {
          q: "¿Qué es DNS Tunneling y por qué es difícil de detectar?",
          opts: ["Un ataque que bloquea el acceso al DNS para derribar servicios", "Una técnica para exfiltrar datos o establecer C2 codificando información en consultas DNS — el tráfico DNS rara vez está bloqueado", "Un método para acelerar la resolución DNS", "Un protocolo para cifrar las consultas DNS"],
          c: 1,
          e: "El DNS Tunneling codifica datos en nombres de dominio (ej: datos-exfiltrados.atacante.com). Como el DNS raramente está bloqueado por firewalls y el tráfico se mezcla con consultas legítimas, es difícil de detectar sin análisis específico."
        },
        {
          q: "¿Qué información útil para reconnaissance revela el registro TXT de un dominio?",
          opts: ["La IP del servidor web principal", "Herramientas y servicios usados: SPF revela proveedores de email, registros de verificación revelan plataformas (Google, HubSpot, etc.)", "El nombre del administrador del dominio", "El tiempo de expiración del dominio"],
          c: 1,
          e: "Los registros TXT revelan mucho sobre la infraestructura: SPF muestra servidores de correo autorizados, DKIM muestra el selector de firma, y registros de verificación (google-site-verification, ms=XXXX) revelan plataformas usadas."
        },
      ]
    },
    // Lecciones 6-10 del Módulo 1 — para agregar al array lecciones en modulo1.js

    // ─── LECCIÓN 6 ────────────────────────────────────────────
    {
      id: "1-6",
      titulo: "DHCP y NAT",
      slides: [
        {
          tag: "PROTOCOLO",
          titulo: "DHCP — Quién reparte las IPs",
          contenido: `Cada vez que conectas un dispositivo al wifi, recibe una IP automáticamente. Eso no es magia — es DHCP.

DHCP (Dynamic Host Configuration Protocol) es el protocolo que asigna IPs privadas a los dispositivos de una red. Tu router actúa como servidor DHCP.

El proceso completo:
1. Tu celular se conecta y grita a la red: "¡Necesito una IP!" (DHCP Discover)
2. El router responde: "Toma la 192.168.1.15" (DHCP Offer)
3. Tu celular acepta (DHCP Request)
4. El router confirma y registra la asignación (DHCP Acknowledge)

La IP asignada tiene un lease (tiempo de préstamo). Si el dispositivo se desconecta y vuelve, puede obtener la misma IP o una diferente.

Perspectiva de seguridad: un atacante puede lanzar un DHCP Starvation — solicitar todas las IPs disponibles agotando el pool. Los nuevos dispositivos no pueden conectarse. Luego instala un servidor DHCP falso (Rogue DHCP) que asigna IPs con su propia puerta de enlace → MITM.`
        },
        {
          tag: "MECANISMO",
          titulo: "NAT — Compartiendo una IP pública",
          contenido: `Tienes 5 dispositivos en casa, pero tu ISP te da solo una IP pública. ¿Cómo funciona?

NAT (Network Address Translation) — tu router traduce entre IPs privadas e IPs públicas.

Ejemplo real paso a paso:
Tu celular (192.168.1.15) pide hackforge.lat

1. Petición sale del celular: origen 192.168.1.15:54321
2. El router reemplaza el origen: 181.43.20.5:54321 (IP pública)
3. El servidor responde a 181.43.20.5:54321
4. El router consulta su tabla NAT y reenvía a 192.168.1.15:54321

La tabla NAT del router registra qué dispositivo interno hizo cada petición externa.

Implicaciones en seguridad:
- Los servidores solo ven la IP pública de tu router, no la de tu dispositivo
- NAT actúa como firewall básico: bloquea conexiones entrantes no solicitadas
- Para exponer un servicio interno necesitas Port Forwarding — abrir un agujero en el NAT`
        },
        {
          tag: "ATAQUE",
          titulo: "DHCP Starvation y Rogue DHCP",
          contenido: `Estos dos ataques combinados son clásicos en redes internas:

DHCP Starvation:
El atacante envía miles de solicitudes DHCP con MAC addresses falsas. El servidor DHCP asigna todas las IPs disponibles. El pool se agota. Ningún dispositivo nuevo puede obtener IP.

Herramienta: yersinia -G (interfaz gráfica) o dhcpstarv

Rogue DHCP (el más peligroso):
Con el DHCP legítimo caído o en paralelo, el atacante instala su propio servidor DHCP. Los nuevos dispositivos reciben:
- IP válida (para no levantar sospechas)
- Gateway: IP del atacante (todo el tráfico pasa por él)
- DNS: IP del atacante (puede redirigir cualquier dominio)

Resultado: MITM completo sin que la víctima note nada.

Defensa: DHCP Snooping — los switches modernos solo permiten respuestas DHCP desde puertos autorizados.`
        },
      ],
      quiz: [
        {
          q: "¿Qué es un lease en el contexto de DHCP?",
          opts: ["El proceso de cifrado de la IP asignada", "El tiempo durante el cual un dispositivo puede usar la IP asignada antes de renovarla", "El rango de IPs disponibles en el servidor DHCP", "El protocolo que usa el router para comunicarse con el ISP"],
          c: 1,
          e: "El lease es el tiempo de 'préstamo' de la IP. Pasado ese tiempo, el dispositivo debe renovar la asignación o liberar la IP para que otro dispositivo pueda usarla."
        },
        {
          q: "Un atacante realiza DHCP Starvation. ¿Cuál es el objetivo del ataque?",
          opts: ["Robar las contraseñas WiFi de los usuarios conectados", "Agotar todas las IPs disponibles en el pool DHCP para bloquear nuevas conexiones", "Aumentar la velocidad de su propia conexión", "Descifrar el tráfico HTTPS de la red"],
          c: 1,
          e: "DHCP Starvation agota el pool de IPs enviando miles de solicitudes con MACs falsas. Es el primer paso para un ataque Rogue DHCP que permite MITM."
        },
        {
          q: "¿Qué ve el servidor de hackforge.lat cuando recibes una petición desde tu celular con IP privada 192.168.1.15?",
          opts: ["La IP privada 192.168.1.15 de tu celular", "La IP pública de tu router, por ejemplo 181.43.20.5", "La dirección MAC de tu celular", "El nombre del dispositivo (hostname)"],
          c: 1,
          e: "NAT reemplaza la IP privada con la IP pública del router. El servidor destino solo ve la IP pública — no sabe cuántos dispositivos hay detrás del router."
        },
        {
          q: "¿Qué es un Rogue DHCP y por qué es peligroso?",
          opts: ["Un servidor DHCP demasiado lento que causa timeouts", "Un servidor DHCP falso instalado por el atacante que asigna su propia IP como gateway, redirigiendo todo el tráfico", "Un error de configuración que asigna IPs duplicadas", "Un ataque de fuerza bruta contra el servidor DHCP"],
          c: 1,
          e: "Un Rogue DHCP asigna al atacante como puerta de enlace predeterminada. Todo el tráfico de los clientes pasa por el atacante antes de llegar a internet — MITM perfecto."
        },
        {
          q: "¿Qué es DHCP Snooping y qué protege?",
          opts: ["Una técnica para acelerar la asignación de IPs", "Una función de switches que solo permite respuestas DHCP desde puertos autorizados, bloqueando Rogue DHCP", "Un protocolo para cifrar el tráfico DHCP", "Un método para ampliar el pool de IPs disponibles"],
          c: 1,
          e: "DHCP Snooping configura puertos 'confiables' (donde está el servidor DHCP real) y 'no confiables' (clientes). Las respuestas DHCP de puertos no confiables se descartan, bloqueando servidores DHCP falsos."
        },
      ]
    },

    // ─── LECCIÓN 7 ────────────────────────────────────────────
    {
      id: "1-7",
      titulo: "Dominios en Profundidad",
      slides: [
        {
          tag: "ESTRUCTURA",
          titulo: "Anatomía de un dominio",
          contenido: `Un dominio tiene una jerarquía que se lee de derecha a izquierda:

sub.dominio.tld.

Ejemplo: vpn.empresa.com.

Partes:
. (punto final) → raíz DNS (oculta, siempre está)
com → TLD (Top-Level Domain)
empresa → SLD (Second-Level Domain) — lo que registras
vpn → subdominio — lo define el propietario del dominio

TLDs comunes y su origen:
.com → comercial (hoy uso general)
.org → organizaciones sin fines de lucro
.gov → gobierno (solo EE.UU.)
.edu → instituciones educativas
.io → originalmente Territorio Británico del Océano Índico, popular en startups tech
.cl .ar .mx .es → ccTLD (country code) — cada país
.onion → red Tor (no accesible desde DNS normal)

En reconocimiento: el TLD y SLD revelan el tipo de organización. .gov = gobierno, .edu = universidad, .mil = militar.`
        },
        {
          tag: "RECONOCIMIENTO",
          titulo: "WHOIS y registros públicos",
          contenido: `WHOIS es la base de datos pública de registro de dominios. Revela quién registró un dominio, cuándo y con qué datos.

Comando:
whois hackforge.lat

Información que puede revelar:
- Nombre del registrante (persona u organización)
- Email de contacto (objetivo para phishing/spear phishing)
- Fecha de creación (dominio viejo = más confiable, dominio recién creado = sospechoso)
- Servidor de nombres (NS) — revela el proveedor de DNS
- Fecha de expiración — dominio a punto de expirar puede ser registrado por atacante

Privacy Shield: muchos dominios usan servicios de privacidad que ocultan los datos reales. Ves datos del intermediario, no del propietario real.

Herramientas online: whois.domaintools.com, lookup.icann.org

En pentesting: siempre empieza con WHOIS — es información pública y legal.`
        },
        {
          tag: "SUBDOMINIOS",
          titulo: "Enumeración de subdominios",
          contenido: `Una empresa puede tener docenas de subdominios, cada uno potencialmente un vector de ataque:

empresa.com → web principal (bien protegida)
dev.empresa.com → entorno de desarrollo (¡sin seguridad!)
staging.empresa.com → versión de prueba (datos reales a veces)
admin.empresa.com → panel de administración
vpn.empresa.com → acceso remoto
mail.empresa.com → servidor de correo
api.empresa.com → API (sin WAF frecuentemente)
old.empresa.com → versión antigua con vulnerabilidades sin parchear

Técnicas de enumeración:
1. Fuerza bruta con wordlist:
gobuster dns -d empresa.com -w /usr/share/wordlists/subdomains.txt

2. Búsqueda en Certificate Transparency:
crt.sh/?q=%.empresa.com

3. Búsqueda pasiva:
subfinder -d empresa.com
amass enum -d empresa.com

Los subdominios son el campo de batalla real del hacking web — la superficie de ataque siempre es más grande de lo que parece.`
        },
      ],
      quiz: [
        {
          q: "En el dominio api.hackforge.lat, ¿cuál es el subdominio?",
          opts: [".lat", "hackforge", "api", "hackforge.lat"],
          c: 2,
          e: "El subdominio es 'api'. La jerarquía es: lat (TLD) → hackforge (SLD) → api (subdominio). Los subdominios los define el propietario del dominio."
        },
        {
          q: "¿Qué información útil para un atacante puede revelar WHOIS?",
          opts: ["Las contraseñas del administrador del dominio", "Email del registrante (spear phishing), fecha de creación, servidores DNS y fecha de expiración", "El contenido de la base de datos del sitio", "Las IPs de todos los empleados de la empresa"],
          c: 1,
          e: "WHOIS es información pública. El email del registrante es útil para phishing dirigido. La fecha de creación ayuda a evaluar la legitimidad. Los servidores NS revelan el proveedor de DNS."
        },
        {
          q: "Encuentras el subdominio dev.empresa.com. ¿Por qué es especialmente interesante para un pentester?",
          opts: ["Porque tiene más velocidad de respuesta que el sitio principal", "Porque los entornos de desarrollo frecuentemente tienen menos seguridad, pueden contener datos reales y versiones sin parchear", "Porque es el servidor más potente de la empresa", "Porque siempre tiene acceso a la base de datos de producción"],
          c: 1,
          e: "Los entornos de desarrollo raramente tienen el mismo nivel de seguridad que producción. Es común encontrar credenciales hardcodeadas, versiones sin parchear, debug habilitado y a veces datos reales."
        },
        {
          q: "¿Qué es Certificate Transparency (crt.sh) y cómo ayuda en reconocimiento?",
          opts: ["Un sistema para verificar la identidad de hackers", "Un registro público de certificados SSL emitidos — permite descubrir subdominios que el objetivo no publicó", "Una herramienta para crear certificados falsos", "Un protocolo de cifrado alternativo a HTTPS"],
          c: 1,
          e: "Los certificados SSL son públicos por ley. crt.sh registra todos los certificados emitidos, incluyendo los subdominios en los Subject Alternative Names. Es reconocimiento pasivo — no tocas el objetivo."
        },
        {
          q: "Un dominio fue registrado hace 2 días y se hace pasar por tu banco. ¿Qué indica la fecha de creación?",
          opts: ["Que es un banco nuevo y legítimo", "Señal de alerta de phishing — los dominios de phishing se registran justo antes del ataque", "Que el banco actualizó su sitio web", "Que el dominio tiene mejor seguridad por ser más nuevo"],
          c: 1,
          e: "Los dominios de phishing se registran días antes del ataque. La fecha de creación reciente combinada con un nombre que imita a una marca conocida es una señal clara de phishing."
        },
      ]
    },

    // ─── LECCIÓN 8 ────────────────────────────────────────────
    {
      id: "1-8",
      titulo: "HTTP a Fondo",
      slides: [
        {
          tag: "CABECERAS",
          titulo: "Cabeceras HTTP — La información oculta",
          contenido: `Las cabeceras HTTP son metadatos que viajan con cada petición y respuesta. Son invisibles en el navegador pero cruciales en seguridad.

Cabeceras de petición importantes:
Host: hackforge.lat → dominio que se pide (ataques de Host Header Injection)
User-Agent: Mozilla/5.0... → identifica el cliente (puede falsificarse)
Cookie: session=abc123 → sesión del usuario (objetivo de XSS y robo de cookies)
Authorization: Bearer eyJ... → token de autenticación JWT
Referer: https://google.com → de dónde viene el usuario (puede revelar URLs internas)
X-Forwarded-For: 1.2.3.4 → IP real detrás de un proxy (puede manipularse)

Cabeceras de respuesta importantes:
Server: Apache/2.4.41 → ¡revela versión del servidor! Vector para CVEs
X-Powered-By: PHP/7.2.0 → ¡revela tecnología y versión!
Set-Cookie: session=abc; HttpOnly; Secure → configuración de cookies
Content-Security-Policy → política de seguridad de contenido
Strict-Transport-Security → fuerza HTTPS

Primer paso al auditar una web: revisar cabeceras de respuesta con curl -I https://objetivo.com`
        },
        {
          tag: "CÓDIGOS",
          titulo: "Códigos de respuesta HTTP",
          contenido: `Los códigos HTTP revelan mucho sobre la infraestructura del objetivo:

2xx — Éxito:
200 OK → recurso existe y se entregó
201 Created → recurso creado (respuesta a POST exitoso)
204 No Content → éxito pero sin contenido

3xx — Redirecciones:
301 Moved Permanently → URL cambió para siempre
302 Found → redirección temporal
304 Not Modified → usa la versión en caché

4xx — Error del cliente:
400 Bad Request → petición malformada (útil para detectar WAFs)
401 Unauthorized → requiere autenticación
403 Forbidden → autenticado pero sin permiso (recurso existe)
404 Not Found → recurso no existe
429 Too Many Requests → rate limiting activo

5xx — Error del servidor:
500 Internal Server Error → error en el servidor (puede revelar stack traces)
502 Bad Gateway → proxy no puede conectar al backend
503 Service Unavailable → servidor caído o sobrecargado

En pentesting: 403 es más interesante que 404. El recurso existe, solo no tienes permiso. Técnicas de bypass de 403 son todo un tema.`
        },
        {
          tag: "COOKIES Y SESIONES",
          titulo: "Cookies y gestión de sesiones",
          contenido: `HTTP es stateless — no recuerda nada entre peticiones. Las cookies resuelven eso.

Cuando haces login:
1. Servidor verifica credenciales
2. Servidor crea un session ID único (ej: abc123xyz)
3. Servidor envía: Set-Cookie: session=abc123xyz; HttpOnly; Secure; SameSite=Strict
4. Tu navegador guarda la cookie
5. En cada petición siguiente envía: Cookie: session=abc123xyz
6. El servidor busca abc123xyz en su base de datos y sabe quién eres

Atributos de seguridad de cookies:
HttpOnly → JavaScript no puede leer la cookie (protege de XSS)
Secure → solo se envía por HTTPS
SameSite=Strict → no se envía en peticiones cross-site (protege de CSRF)
SameSite=Lax → se envía en navegación directa pero no en peticiones de terceros

Si una cookie de sesión no tiene HttpOnly, un XSS puede robarla:
document.cookie → devuelve todas las cookies accesibles por JS

En pentesting: analizar las cookies es fundamental. Una cookie sin HttpOnly + un XSS = Account Takeover.`
        },
      ],
      quiz: [
        {
          q: "Una respuesta HTTP incluye la cabecera: Server: Apache/2.4.41. ¿Qué puede hacer un atacante con esto?",
          opts: ["Nada, es solo información informativa", "Buscar CVEs conocidos para Apache 2.4.41 y explotar vulnerabilidades específicas de esa versión", "Usar esa información para crear un certificado SSL falso", "Determinar la ubicación física del servidor"],
          c: 1,
          e: "Revelar la versión del servidor es un fallo de seguridad. El atacante puede buscar en bases de datos de CVEs (NVD, Exploit-DB) vulnerabilidades específicas para Apache 2.4.41 y lanzar exploits dirigidos."
        },
        {
          q: "Encuentras un endpoint que devuelve 403 Forbidden. ¿Qué significa para un pentester?",
          opts: ["El recurso no existe, continuar buscando", "El recurso existe pero el acceso está restringido — vale la pena intentar técnicas de bypass", "El servidor está caído", "La petición tiene un error de sintaxis"],
          c: 1,
          e: "403 confirma que el recurso existe. Técnicas de bypass incluyen: cambiar el método HTTP (GET → POST), manipular cabeceras (X-Original-URL, X-Rewrite-URL), añadir // o /. a la ruta, o usar diferentes codificaciones URL."
        },
        {
          q: "Una cookie de sesión no tiene el atributo HttpOnly. ¿Cuál es el riesgo?",
          opts: ["La cookie expira más rápido de lo normal", "JavaScript puede leer la cookie — un XSS puede robarla y dar acceso completo a la cuenta", "La cookie no se envía por HTTPS", "El servidor no puede verificar la autenticación"],
          c: 1,
          e: "Sin HttpOnly, document.cookie en JavaScript devuelve el valor de la cookie. Un XSS puede exfiltrar el session ID al servidor del atacante, quien lo usa para tomar la sesión sin necesitar contraseña."
        },
        {
          q: "¿Qué protege el atributo SameSite=Strict en una cookie?",
          opts: ["Evita que la cookie sea leída por JavaScript", "Evita que la cookie se envíe en peticiones originadas desde otros sitios, protegiendo de CSRF", "Cifra el contenido de la cookie", "Limita la cookie a conexiones HTTPS únicamente"],
          c: 1,
          e: "SameSite=Strict previene CSRF (Cross-Site Request Forgery). Con este atributo, si el usuario hace click en un enlace de otro sitio, la cookie de sesión no se incluye en la petición al sitio protegido."
        },
        {
          q: "Una respuesta devuelve código 500 con un stack trace de PHP visible. ¿Por qué es un problema de seguridad?",
          opts: ["Los errores 500 siempre son peligrosos independientemente del contenido", "El stack trace revela rutas del sistema, versiones de librerías y lógica interna — información valiosa para el atacante", "El servidor está enviando demasiados datos", "El código 500 indica que el servidor fue comprometido"],
          c: 1,
          e: "Un stack trace expone: rutas absolutas del servidor (/var/www/html/app/...), versiones de frameworks y librerías, nombres de funciones y clases internas. Todo esto facilita ataques dirigidos."
        },
      ]
    },

    // ─── LECCIÓN 9 ────────────────────────────────────────────
    {
      id: "1-9",
      titulo: "TCP y UDP",
      slides: [
        {
          tag: "PROTOCOLO",
          titulo: "TCP — La conexión confiable",
          contenido: `TCP (Transmission Control Protocol) garantiza que los datos lleguen completos y en orden.

El Three-Way Handshake (inicio de conexión TCP):
1. SYN → cliente envía "quiero conectarme"
2. SYN-ACK → servidor responde "acepto, listo"
3. ACK → cliente confirma "conectado"

Solo después del handshake se envían datos.

Para cerrar la conexión:
FIN → "quiero terminar"
FIN-ACK → "de acuerdo"
ACK → "confirmado"

Características de TCP:
✓ Garantía de entrega (retransmite paquetes perdidos)
✓ Orden garantizado (reensambla en secuencia correcta)
✓ Control de flujo (no satura al receptor)
✗ Más lento por la sobrecarga del handshake
✗ Más cabeceras = más datos por paquete

Usado en: HTTP/HTTPS, SSH, FTP, SMTP, bases de datos`
        },
        {
          tag: "PROTOCOLO",
          titulo: "UDP — La velocidad sin garantías",
          contenido: `UDP (User Datagram Protocol) — dispara y olvida. Envía datos sin verificar si llegaron.

Sin handshake. Sin confirmación de entrega. Sin reordenamiento.

¿Por qué existe si no garantiza nada?
Porque la velocidad importa más que la perfección en muchos casos:

DNS → una pregunta, una respuesta — no necesita conexión
VoIP/videollamadas → un paquete perdido = pixelación, no silencio total
Gaming online → latencia importa más que perfección
Streaming → mejor perder un frame que pausar
DHCP → discovery inicial de red

Comparación directa:
TCP: "¿Llegó? ¿Llegó? ¿Llegó?" — confiable pero lento
UDP: "Toma, toma, toma, no me preguntes" — rápido pero sin garantías

En seguridad: UDP es interesante porque muchos firewalls lo filtran menos. DNS tunneling usa UDP/53 para exfiltrar datos.`
        },
        {
          tag: "ATAQUES",
          titulo: "Ataques sobre TCP y UDP",
          contenido: `Conocer los protocolos permite entender los ataques:

SYN Flood (DoS sobre TCP):
El atacante envía miles de paquetes SYN sin completar el handshake.
El servidor reserva recursos para cada SYN esperando el ACK final.
Los recursos se agotan → el servidor no puede atender conexiones legítimas.
Mitigación: SYN Cookies — el servidor no reserva recursos hasta el ACK.

TCP RST Attack:
El atacante envía un paquete RST (reset) falsificando la IP de origen.
La conexión TCP se termina abruptamente.
Usado para interrumpir conexiones establecidas.

UDP Flood:
Envío masivo de paquetes UDP a puertos aleatorios.
El servidor procesa cada paquete intentando encontrar un servicio → CPU al máximo.
Más fácil de lanzar que SYN Flood porque UDP no necesita handshake.

UDP Amplification (DDoS):
El atacante envía peticiones pequeñas con IP origen falsificada (la víctima).
Los servidores responden con respuestas mucho más grandes a la víctima.
Factor de amplificación DNS: hasta 70x. NTP: hasta 556x.`
        },
      ],
      quiz: [
        {
          q: "¿En qué orden correcto ocurre el Three-Way Handshake de TCP?",
          opts: ["ACK → SYN → SYN-ACK", "SYN → SYN-ACK → ACK", "SYN-ACK → SYN → ACK", "ACK → ACK → SYN"],
          c: 1,
          e: "El Three-Way Handshake es SYN (cliente) → SYN-ACK (servidor) → ACK (cliente). Solo después de estos 3 pasos la conexión TCP está establecida y pueden transferirse datos."
        },
        {
          q: "¿Por qué DNS usa UDP en vez de TCP?",
          opts: ["Porque UDP es más seguro que TCP", "Porque una consulta DNS es pequeña — una pregunta y una respuesta rápida. La sobrecarga del handshake TCP no vale la pena", "Porque DNS no puede usar TCP por limitaciones técnicas", "Porque UDP cifra el tráfico automáticamente"],
          c: 1,
          e: "DNS usa UDP/53 para consultas normales porque son rápidas y pequeñas. TCP/53 se usa para Zone Transfers (respuestas grandes) y en DNS sobre TLS (DoT) para seguridad."
        },
        {
          q: "Un atacante lanza un SYN Flood contra un servidor web. ¿Cuál es el efecto?",
          opts: ["El servidor se reinicia automáticamente", "El servidor agota sus recursos esperando handshakes incompletos y no puede atender conexiones legítimas", "El atacante obtiene acceso al servidor", "El servidor empieza a enviar datos maliciosos"],
          c: 1,
          e: "En SYN Flood, el servidor reserva recursos por cada SYN recibido esperando el ACK que nunca llega. Cuando los recursos (memoria, conexiones) se agotan, el servidor deja de responder a usuarios legítimos — Denial of Service."
        },
        {
          q: "¿Qué es UDP Amplification y por qué es tan efectivo?",
          opts: ["Un ataque que amplifica la señal WiFi para alcanzar más víctimas", "El atacante envía peticiones pequeñas con IP falsificada y los servidores responden con respuestas mucho más grandes a la víctima, multiplicando el tráfico", "Un método para ampliar el ancho de banda disponible", "Un protocolo para mejorar la velocidad de UDP"],
          c: 1,
          e: "En amplificación, el atacante usa poco ancho de banda propio pero genera un tsunami de tráfico hacia la víctima. Con NTP, una petición de 8 bytes puede generar respuestas de ~4.460 bytes — factor de amplificación de 556x."
        },
        {
          q: "¿Cuál es la principal ventaja de UDP sobre TCP en aplicaciones de tiempo real como videollamadas?",
          opts: ["UDP cifra los datos automáticamente a diferencia de TCP", "UDP no requiere handshake ni retransmisiones — menor latencia. Un paquete perdido causa una pixelación momentánea, no un congelamiento", "UDP garantiza entrega en menos de 1ms", "UDP usa menos ancho de banda siempre"],
          c: 1,
          e: "En videollamadas, la latencia importa más que la perfección. Si TCP retransmite un paquete, causa un retraso visible. Con UDP, un paquete perdido se manifiesta como un pequeño artefacto visual — imperceptible en la práctica."
        },
      ]
    },

    // ─── LECCIÓN 10 ───────────────────────────────────────────
    {
      id: "1-10",
      titulo: "Herramientas Básicas de Red",
      slides: [
        {
          tag: "TOOLKIT",
          titulo: "ping, traceroute y nmap",
          contenido: `Las herramientas que todo pentester usa desde el día uno:

ping — ¿está vivo el objetivo?
ping hackforge.lat
Envía paquetes ICMP Echo Request. Si responde, el host está activo.
Nota: muchos servidores bloquean ping en producción. Silencio ≠ caído.

traceroute/tracert — el camino hasta el objetivo
traceroute hackforge.lat (Linux/Mac)
tracert hackforge.lat (Windows)
Muestra cada salto (router) entre tú y el destino. Útil para detectar firewalls intermedios.

nmap — el escáner esencial
nmap -sn 192.168.1.0/24  → descubrir hosts activos (ping sweep)
nmap -sV 192.168.1.1      → detectar versiones de servicios
nmap -sC 192.168.1.1      → ejecutar scripts básicos de detección
nmap -A 192.168.1.1       → escaneo agresivo (OS + versiones + scripts)
nmap -p 1-65535 192.168.1.1 → todos los puertos
nmap -sS 192.168.1.1      → SYN scan (stealth, requiere root)

Importante: nunca usar nmap contra objetivos sin autorización. Es ilegal.`
        },
        {
          tag: "TOOLKIT",
          titulo: "curl, dig y netstat",
          contenido: `curl — hacer peticiones HTTP desde la terminal
curl https://hackforge.lat                    → GET básico
curl -I https://hackforge.lat                  → solo cabeceras (HEAD)
curl -X POST -d "user=admin&pass=1234" URL    → POST con datos
curl -H "Authorization: Bearer TOKEN" URL     → con cabecera personalizada
curl -k https://sitio-con-cert-invalido.com   → ignorar certificado SSL

dig — consultas DNS avanzadas
dig hackforge.lat             → registro A (IP)
dig hackforge.lat MX          → servidor de correo
dig hackforge.lat TXT         → registros de texto
dig @8.8.8.8 hackforge.lat    → consultar DNS específico (Google)
dig axfr @ns1.victima.com victima.com → Zone Transfer (si está permitido)

netstat/ss — conexiones activas en tu sistema
netstat -tnp    → conexiones TCP con PID del proceso
ss -tnp         → versión moderna de netstat (más rápida)
netstat -ano    → Windows: todas las conexiones con PID

Útil para detectar: ¿qué programas tienen conexiones abiertas? ¿Hay algo sospechoso conectando a IPs externas?`
        },
        {
          tag: "WORKFLOW",
          titulo: "Flujo de reconocimiento básico",
          contenido: `Juntando todo — así empieza un reconocimiento real:

1. WHOIS del dominio objetivo:
whois empresa.com

2. Registros DNS:
dig empresa.com ANY
dig empresa.com MX
dig empresa.com TXT

3. Enumeración de subdominios:
subfinder -d empresa.com
curl "https://crt.sh/?q=%.empresa.com&output=json"

4. ¿Qué IPs tienen los subdominios?
dig dev.empresa.com
dig admin.empresa.com

5. Escaneo de puertos en IPs encontradas:
nmap -sV -sC IP_objetivo

6. Análisis de cabeceras HTTP:
curl -I https://empresa.com

7. Tecnologías del sitio:
whatweb https://empresa.com
wappalyzer (extensión de navegador)

Todo esto es OSINT y reconocimiento pasivo/activo. La ley varía por país — asegúrate de tener autorización antes de escanear activamente.`
        },
      ],
      quiz: [
        {
          q: "Ejecutas: nmap -sV 192.168.1.100 y obtienes '22/tcp open ssh OpenSSH 7.2p2'. ¿Para qué sirve esa información?",
          opts: ["Solo confirma que el puerto está abierto", "Permite buscar CVEs específicos para OpenSSH 7.2p2 y exploits públicos para esa versión exacta", "Indica que el servidor es de Apple porque usa OpenSSH", "Solo sirve para documentación del inventario de red"],
          c: 1,
          e: "OpenSSH 7.2p2 tiene CVEs conocidos, incluyendo CVE-2016-6210 (enumeración de usuarios). Conocer la versión exacta permite búsquedas en Exploit-DB, NVD y GitHub para exploits disponibles."
        },
        {
          q: "¿Para qué usas curl -I https://objetivo.com?",
          opts: ["Para descargar el código fuente de la página", "Para ver solo las cabeceras de respuesta HTTP sin descargar el contenido — revela versiones del servidor, tecnologías y configuraciones de seguridad", "Para iniciar sesión automáticamente en el sitio", "Para medir la velocidad de carga de la página"],
          c: 1,
          e: "curl -I hace una petición HEAD que devuelve solo las cabeceras. En segundos puedes ver: versión del servidor, tecnologías usadas (X-Powered-By), configuración de cookies, CSP, HSTS, etc."
        },
        {
          q: "Ejecutas dig axfr @ns1.empresa.com empresa.com y recibes todos los registros DNS. ¿Qué encontraste?",
          opts: ["Una configuración DNS normal y esperada", "Una Zone Transfer mal configurada que expone todos los subdominios, IPs y registros del dominio — información crítica para el reconocimiento", "Un ataque de DNS Spoofing en curso", "El servidor de correo del dominio"],
          c: 1,
          e: "Zone Transfer (AXFR) debería estar restringido a servidores DNS secundarios. Si está abierto, el atacante obtiene un mapa completo de la infraestructura: todos los subdominios, IPs, servidores de correo, etc."
        },
        {
          q: "Ves en netstat una conexión ESTABLISHED a 195.22.26.248:4444 desde un proceso llamado 'svchost.exe'. ¿Qué podría indicar?",
          opts: ["Una actualización normal de Windows", "Posible malware o backdoor — el puerto 4444 es el listener por defecto de Metasploit y svchost.exe no debería conectar a IPs externas en ese puerto", "Una conexión VPN estándar", "El navegador conectado a un sitio HTTPS"],
          c: 1,
          e: "El puerto 4444 es el listener por defecto de Meterpreter/Metasploit. svchost.exe es un proceso de Windows que malware suele suplantar. Una conexión establecida a una IP externa en ese puerto es señal de compromiso."
        },
        {
          q: "¿Cuál es la diferencia entre nmap -sS y nmap -sT?",
          opts: ["No hay diferencia, hacen lo mismo", "sS (SYN scan) no completa el handshake TCP — más sigiloso y requiere root. sT (Connect scan) completa la conexión — más detectable pero no requiere privilegios", "sT es más rápido que sS en todos los casos", "sS escanea TCP y sT escanea UDP"],
          c: 1,
          e: "SYN scan (-sS) envía SYN y si recibe SYN-ACK confirma el puerto abierto, luego envía RST sin completar la conexión. Es más sigiloso porque muchos logs solo registran conexiones completas. Requiere permisos de root/admin."
        },
      ]
    },

  ]
};