// src/data/modulo2.js
// HACKFORGE — Módulo 2: Fundamentos de Ciberseguridad
// Reescrito con enfoque ofensivo/defensivo real

export const MODULO2 = {
  id: 2,
  nombre: "Fundamentos de Ciberseguridad",
  descripcion: "La base conceptual que separa a un script kiddie de un profesional. Entiende el terreno antes de atacarlo o defenderlo.",
  icon: "🛡️",
  color: "#00ff88",
  xp: 350,
  tag: "FREE",
  lecciones: [

    // ─── LECCIÓN 1 ─────────────────────────────────────────
    {
      id: "2-1",
      titulo: "La Tríada CIA",
      slides: [
        {
          tag: "FRAMEWORK CORE",
          titulo: "Confidencialidad, Integridad, Disponibilidad",
          contenido: `La Tríada CIA es el modelo fundamental de ciberseguridad. Todo ataque viola al menos uno de estos tres pilares.

CONFIDENCIALIDAD — Los datos solo son accesibles para quien está autorizado.
Violación: un atacante roba la base de datos de usuarios de una empresa. Emails y contraseñas expuestos.
Controles: cifrado, control de acceso, autenticación, VPN.

INTEGRIDAD — Los datos no han sido modificados sin autorización.
Violación: un atacante intercepta una transferencia bancaria y cambia el número de cuenta destino.
Controles: firmas digitales, hashes, checksums, registros de auditoría.

DISPONIBILIDAD — Los sistemas funcionan cuando se necesitan.
Violación: un ataque DDoS tumba el sitio de un banco durante horas. Pérdidas millonarias.
Controles: redundancia, balanceadores de carga, CDN, planes de continuidad.

Un ataque de ransomware viola las tres: cifra tus datos (confidencialidad), los altera (integridad) y los hace inaccesibles (disponibilidad).`
        },
        {
          tag: "APLICACIÓN REAL",
          titulo: "CIA en escenarios de ataque",
          contenido: `Cada tipo de ataque ataca un pilar específico. Aprende a identificarlos:

ATAQUE → PILAR VIOLADO:

Robo de base de datos → Confidencialidad
Phishing para robar contraseñas → Confidencialidad
Man-in-the-Middle (lectura) → Confidencialidad

SQL Injection para modificar datos → Integridad
DNS Spoofing (respuesta falsa) → Integridad
Man-in-the-Middle (modificación) → Integridad y Confidencialidad

DDoS → Disponibilidad
Ransomware → Disponibilidad (+ Confidencialidad + Integridad)
Explotar una vulnerabilidad para crashear un servicio → Disponibilidad

¿Por qué importa saber esto?
Porque el objetivo de un pentester es encontrar dónde puede violarse cada pilar antes que un atacante real. Y el objetivo de un defensor es implementar controles para cada uno.`
        },
        {
          tag: "EXTENSIONES",
          titulo: "Más allá de la tríada: AAA y No Repudio",
          contenido: `La tríada CIA es la base, pero hay más conceptos fundamentales:

AUTENTICACIÓN — Verificar que eres quien dices ser.
Contraseñas, biometría, tokens, certificados digitales, MFA.

AUTORIZACIÓN — Verificar que tienes permiso para hacer lo que intentas.
"Estás autenticado" ≠ "tienes permiso de todo".
Un empleado autenticado no puede acceder a nóminas de otros si no está autorizado.

ACCOUNTABILITY (Trazabilidad) — Saber quién hizo qué y cuándo.
Logs, auditorías, SIEM. Si algo malo pasa, ¿puedes rastrear qué ocurrió?

NO REPUDIO — Nadie puede negar haber realizado una acción.
Las firmas digitales crean evidencia criptográfica de quién firmó un documento.
Crítico en contratos digitales y transacciones financieras.

En pentesting, la falta de accountability es un hallazgo: si puedes actuar sin dejar rastro, el sistema tiene un problema grave.`
        },
      ],
      quiz: [
        {
          q: "Un ransomware cifra todos los archivos de una empresa y exige pago. ¿Qué pilares de la tríada CIA viola?",
          opts: ["Solo Disponibilidad", "Solo Confidencialidad e Integridad", "Los tres: Confidencialidad (datos cifrados inaccesibles), Integridad (datos alterados) y Disponibilidad (sistema inutilizable)", "Ninguno, es un problema legal no de seguridad"],
          c: 2,
          e: "El ransomware es un ataque perfecto contra la tríada CIA: cifra los datos (viola Confidencialidad), los modifica (viola Integridad) y hace el sistema inutilizable (viola Disponibilidad)."
        },
        {
          q: "Un atacante intercepta una transferencia bancaria y cambia el número de cuenta destino sin que nadie lo note. ¿Qué pilar viola principalmente?",
          opts: ["Disponibilidad — el banco no puede procesar transferencias", "Confidencialidad — accede a datos privados", "Integridad — modifica datos sin autorización", "Autenticación — suplanta la identidad del usuario"],
          c: 2,
          e: "Modificar datos en tránsito sin autorización es una violación de Integridad. El dato llegó, pero alterado. Es el objetivo clásico de un ataque Man-in-the-Middle activo."
        },
        {
          q: "¿Cuál es la diferencia entre Autenticación y Autorización?",
          opts: ["Son sinónimos en ciberseguridad", "Autenticación verifica quién eres; Autorización verifica qué tienes permiso de hacer", "Autenticación es para usuarios; Autorización es para administradores", "Autenticación usa contraseñas; Autorización usa tokens"],
          c: 1,
          e: "Autenticación = ¿Eres quien dices ser? Autorización = ¿Tienes permiso para hacer esto? Puedes estar autenticado (login exitoso) pero sin autorización para acceder a ciertos recursos. Confundirlos es un error de diseño común."
        },
        {
          q: "Un atacante realiza un DDoS contra el sitio web de un banco. ¿Qué pilar de la CIA ataca principalmente?",
          opts: ["Confidencialidad — roba datos de clientes", "Integridad — modifica transacciones", "Disponibilidad — el servicio deja de estar accesible", "No Repudio — borra los logs del servidor"],
          c: 2,
          e: "DDoS (Distributed Denial of Service) ataca la Disponibilidad. El objetivo es hacer el servicio inaccesible para usuarios legítimos, no robar ni modificar datos."
        },
        {
          q: "¿Por qué el No Repudio es importante en transacciones digitales?",
          opts: ["Porque garantiza que la transacción sea rápida", "Porque crea evidencia criptográfica de quién realizó la acción — nadie puede negar haber firmado o enviado algo", "Porque cifra las transacciones para que sean confidenciales", "Porque garantiza que los datos lleguen completos"],
          c: 1,
          e: "El No Repudio, implementado con firmas digitales, crea prueba matemáticamente verificable de quién realizó una acción. Es fundamental en contratos digitales, facturas electrónicas y cualquier transacción donde 'no fui yo' no puede ser una defensa válida."
        },
      ]
    },

    // ─── LECCIÓN 2 ─────────────────────────────────────────
    {
      id: "2-2",
      titulo: "Tipos de Amenazas y Actores",
      slides: [
        {
          tag: "CLASIFICACIÓN",
          titulo: "Quién ataca y por qué",
          contenido: `Conocer al adversario es el primer paso de cualquier estrategia de defensa.

ACTORES DE AMENAZA:

Script Kiddies — usan herramientas de otros sin entender cómo funcionan. Peligrosos por volumen, no por sofisticación.

Hacktivistas — motivados por ideología política o social. Anonymous es el ejemplo más conocido. Objetivos: gobiernos, corporaciones, instituciones.

Cibercriminales — motivación económica. Ransomware, fraude, robo de datos para vender. Operan en redes organizadas con divisiones de trabajo.

Insiders maliciosos — empleados o ex-empleados con acceso legítimo. Son los más peligrosos porque conocen los sistemas desde adentro. Motivados por dinero, venganza o coerción.

APT (Advanced Persistent Threat) — actores estatales o grupos altamente sofisticados. Objetivos estratégicos: infraestructura crítica, espionaje, robo de propiedad intelectual. Stuxnet, NotPetya.

Competidores — espionaje industrial. Robo de secretos comerciales, investigación y desarrollo.`
        },
        {
          tag: "VECTORES",
          titulo: "Cómo entran los atacantes",
          contenido: `Un vector de ataque es el camino que usa un atacante para comprometer un sistema.

Los vectores más comunes en 2024:

Phishing/Spear Phishing → sigue siendo #1. El 90% de los ataques empiezan aquí. Un email bien construido engaña incluso a profesionales.

Vulnerabilidades sin parchear → software desactualizado con CVEs conocidos y exploits públicos disponibles.

Credenciales robadas o débiles → contraseñas reutilizadas de otras brechas, fuerza bruta, credential stuffing.

Supply Chain → comprometer un proveedor de software para llegar a los clientes. SolarWinds (2020) afectó a agencias del gobierno de EE.UU.

Dispositivos IoT inseguros → cámaras, routers, impresoras con credenciales por defecto o firmware sin actualizar.

Remote Work Attack Surface → VPNs mal configuradas, RDP expuesto, herramientas de colaboración como vector de entrada.

Ingeniería Social → manipulación psicológica. Vishing (llamadas), smishing (SMS), impersonation.`
        },
        {
          tag: "MODELOS",
          titulo: "Kill Chain y MITRE ATT&CK",
          contenido: `Los profesionales usan frameworks para entender y modelar los ataques:

CYBER KILL CHAIN (Lockheed Martin):
1. Reconocimiento — recopilar información del objetivo
2. Armamento — preparar el exploit/payload
3. Entrega — enviar el payload (email, web, USB)
4. Explotación — ejecutar el exploit en el sistema víctima
5. Instalación — instalar malware persistente
6. C2 (Command & Control) — establecer comunicación con el atacante
7. Acciones sobre objetivos — robar datos, cifrar, destruir

Si un defensor interrumpe cualquier paso, el ataque falla.

MITRE ATT&CK:
Base de conocimiento de tácticas y técnicas reales usadas por atacantes, documentadas con ejemplos de grupos APT reales.
URL: attack.mitre.org — referencia obligatoria en ciberseguridad.

Como pentester, tu reporte debe mapear tus hallazgos a MITRE ATT&CK para que el cliente entienda el contexto real del riesgo.`
        },
      ],
      quiz: [
        {
          q: "Un ex-empleado descontento accede a los sistemas de su antigua empresa usando credenciales que no fueron revocadas. ¿Qué tipo de actor de amenaza es?",
          opts: ["Script Kiddie", "APT (Advanced Persistent Threat)", "Insider malicioso", "Hacktivista"],
          c: 2,
          e: "Los insiders maliciosos son especialmente peligrosos porque conocen la infraestructura, tienen (o tuvieron) acceso legítimo y saben qué datos son valiosos. La revocación inmediata de accesos al terminar el empleo es control básico."
        },
        {
          q: "¿Por qué el phishing sigue siendo el vector de ataque #1 a pesar de existir desde los años 90?",
          opts: ["Porque los firewalls no pueden detectarlo", "Porque ataca el eslabón más débil: las personas. La ingeniería social explota psicología humana, no vulnerabilidades técnicas", "Porque es el único vector que funciona contra HTTPS", "Porque los antivirus no lo pueden bloquear"],
          c: 1,
          e: "Puedes tener el sistema más seguro del mundo, pero si un empleado hace click en un enlace malicioso y entrega sus credenciales, el atacante entra. La seguridad técnica no protege contra decisiones humanas."
        },
        {
          q: "En la Cyber Kill Chain, un defensor detecta y bloquea la comunicación C2 (Command & Control). ¿Qué impacto tiene en el ataque?",
          opts: ["Ninguno, el atacante puede continuar sin C2", "El atacante pierde control sobre el malware instalado — no puede recibir comandos ni exfiltrar datos", "Solo retrasa el ataque unos minutos", "El malware se autoelimina"],
          c: 1,
          e: "Sin C2, el malware es como un soldado sin comunicación con el cuartel general. Puede estar instalado pero el atacante no puede controlarlo, recibir datos ni ejecutar acciones adicionales. Bloquear C2 es una estrategia defensiva efectiva."
        },
        {
          q: "El ataque a SolarWinds comprometió a miles de organizaciones incluyendo agencias del gobierno de EE.UU. ¿Qué tipo de vector de ataque usó?",
          opts: ["Phishing masivo contra empleados", "Supply Chain — comprometieron el software de SolarWinds que las víctimas actualizaban legítimamente", "Fuerza bruta contra VPNs", "Vulnerabilidad zero-day en Windows"],
          c: 1,
          e: "Supply Chain Attack: los atacantes (APT29/Cozy Bear) comprometieron el proceso de build de SolarWinds. Las actualizaciones legítimas de Orion incluían malware. Las víctimas instalaron el backdoor ellas mismas al actualizar software legítimo."
        },
        {
          q: "¿Para qué sirve MITRE ATT&CK en un pentest profesional?",
          opts: ["Es una herramienta automática de explotación", "Es un framework para mapear las técnicas usadas en el pentest a tácticas reales de atacantes, dando contexto al cliente sobre el riesgo real", "Es un sistema de detección de intrusos", "Es una base de datos de contraseñas"],
          c: 1,
          e: "MITRE ATT&CK documenta tácticas y técnicas reales de atacantes con ejemplos de APTs reales. En un reporte de pentest, mapear hallazgos a ATT&CK permite al cliente entender: 'Este grupo APT usa exactamente esta técnica que encontramos en tu red.'"
        },
      ]
    },

    // ─── LECCIÓN 3 ─────────────────────────────────────────
    {
      id: "2-3",
      titulo: "Malware — Tipos y Comportamientos",
      slides: [
        {
          tag: "CLASIFICACIÓN",
          titulo: "El ecosistema del malware",
          contenido: `Malware = software malicioso. Pero no todo malware funciona igual.

VIRUS — se adjunta a archivos legítimos y se propaga cuando se ejecutan. Requiere acción del usuario.

WORM (Gusano) — se propaga solo por la red sin necesidad de archivo huésped. WannaCry se propagó en horas infectando 200,000 sistemas en 150 países.

TROYANO — se disfraza de software legítimo. El usuario lo instala voluntariamente pensando que es otra cosa. Backdoor instalado.

RANSOMWARE — cifra los archivos de la víctima y exige pago para descifrarlos. El tipo de malware más rentable de la historia. LockBit, BlackCat, Conti.

SPYWARE — recopila información del sistema sin el conocimiento del usuario. Keyloggers, screen capturers, activity monitors.

ROOTKIT — se oculta profundo en el sistema operativo para que el malware que instala sea difícil de detectar. Opera a nivel kernel.

BOTNET — red de sistemas infectados ("bots") controlados remotamente por un C2. Usada para DDoS, spam, minería de criptomonedas.

KEYLOGGER — registra cada tecla pulsada. Captura contraseñas, mensajes, números de tarjeta.`
        },
        {
          tag: "TÉCNICAS",
          titulo: "Cómo el malware evade detección",
          contenido: `Los antivirus modernos usan múltiples métodos de detección. El malware moderno los evade:

DETECCIÓN POR FIRMA (Signature-based):
El AV compara el archivo contra una base de datos de firmas conocidas.
Evasión: polymorphic malware — cambia su firma con cada copia. Metamorphic malware — reescribe su propio código.

DETECCIÓN HEURÍSTICA:
El AV analiza el comportamiento esperado del código.
Evasión: time-based evasion — el malware duerme X minutos antes de actuar (evita sandboxes con timeout corto). Environment-aware — detecta si está en una VM y no ejecuta.

DETECCIÓN POR COMPORTAMIENTO:
El AV monitorea acciones sospechosas en tiempo real.
Evasión: process injection — inyectar código malicioso en procesos legítimos como explorer.exe o svchost.exe. Living Off the Land (LOLBins) — usar herramientas del sistema operativo (PowerShell, certutil, wmic) para ejecutar acciones maliciosas sin malware propio.

OFUSCACIÓN — código ilegible para el análisis estático:
Base64 encoding, XOR encryption, packing, string obfuscation.`
        },
        {
          tag: "ANÁLISIS",
          titulo: "Análisis de malware básico",
          contenido: `En ciberseguridad, entender el malware implica poder analizarlo. Hay dos enfoques:

ANÁLISIS ESTÁTICO — sin ejecutar el malware:
strings archivo.exe → extrae cadenas de texto (URLs, IPs, rutas, comandos)
file archivo.exe → tipo de archivo real
md5sum / sha256sum → calcular hash para buscar en VirusTotal
Herramientas: PEiD, Exeinfo PE, Ghidra (reversing)

ANÁLISIS DINÁMICO — ejecutándolo en entorno controlado (sandbox):
Observar qué procesos crea, qué archivos modifica, qué conexiones establece
Herramientas: Cuckoo Sandbox, any.run, Joe Sandbox

INDICADORES DE COMPROMISO (IOCs):
Evidencia de que un sistema fue comprometido:
- Hashes de archivos maliciosos (MD5, SHA256)
- IPs y dominios de C2
- Rutas de archivos y claves de registro creadas
- User-agents específicos en logs

Plataformas: VirusTotal, MalwareBazaar, Hybrid Analysis — puedes analizar archivos sospechosos gratis.`
        },
      ],
      quiz: [
        {
          q: "WannaCry infectó 200,000 sistemas en 150 países en pocas horas sin que los usuarios hicieran nada. ¿Qué tipo de malware es?",
          opts: ["Virus — necesita un archivo huésped para propagarse", "Worm — se propaga automáticamente por la red sin intervención del usuario", "Troyano — el usuario lo descargó voluntariamente", "Spyware — recopila información silenciosamente"],
          c: 1,
          e: "WannaCry es un worm (gusano) que exploró la vulnerabilidad EternalBlue en SMB para propagarse automáticamente entre sistemas. No necesitaba que nadie hiciera click — escaneaba la red buscando sistemas vulnerables."
        },
        {
          q: "Un malware cambia su firma criptográfica en cada copia que crea para evitar detección por antivirus. ¿Cómo se llama esta técnica?",
          opts: ["Rootkit — se esconde en el kernel", "Process Injection — inyecta código en procesos legítimos", "Polymorphic malware — muta su firma para evadir detección por firmas", "Living off the Land — usa herramientas del sistema"],
          c: 2,
          e: "El malware polimórfico cambia su firma (hash) con cada copia usando cifrado o transformaciones del código. Los AV basados en firmas no lo detectan porque nunca han visto esa firma específica antes."
        },
        {
          q: "¿Qué son los 'Living off the Land Binaries' (LOLBins) y por qué son difíciles de detectar?",
          opts: ["Son exploits que atacan software instalado en el sistema", "Son herramientas legítimas del sistema operativo (PowerShell, certutil, wmic) usadas por atacantes para ejecutar acciones maliciosas sin malware propio", "Son backdoors instalados en el BIOS", "Son herramientas de análisis forense"],
          c: 1,
          e: "PowerShell, certutil, wmic son herramientas legítimas de Windows. Cuando un atacante las usa para descargar payloads, ejecutar código o moverse lateralmente, el AV no las bloquea porque 'son herramientas del sistema'. Detectar el abuso requiere análisis de comportamiento."
        },
        {
          q: "¿Cuál es la diferencia entre análisis estático y dinámico de malware?",
          opts: ["No hay diferencia, son términos sinónimos", "Estático: analizar el código sin ejecutarlo (strings, hash, reversing). Dinámico: ejecutarlo en sandbox y observar su comportamiento real", "Estático: análisis manual. Dinámico: análisis automático", "Estático: para Windows. Dinámico: para Linux"],
          c: 1,
          e: "Análisis estático examina el archivo sin ejecutarlo (reversing, strings, imports). Análisis dinámico lo ejecuta en un entorno controlado y observa qué hace: qué procesos crea, qué archivos toca, a qué IPs conecta."
        },
        {
          q: "Subes un archivo sospechoso a VirusTotal y 45 de 72 motores antivirus lo detectan como malicioso. ¿Qué son esos hashes y detecciones?",
          opts: ["Son vulnerabilidades del archivo", "Son Indicadores de Compromiso (IOCs) — evidencia técnica de que el archivo es malicioso, útil para detectar infecciones en otros sistemas", "Son errores de los antivirus (falsos positivos)", "Son firmas de software legítimo"],
          c: 1,
          e: "Los IOCs incluyen hashes (MD5, SHA256), IPs, dominios y patrones de comportamiento. El hash del archivo malicioso es un IOC que los equipos de seguridad usan para buscar el mismo archivo en toda la red de la organización."
        },
      ]
    },

    // ─── LECCIÓN 4 ─────────────────────────────────────────
    {
      id: "2-4",
      titulo: "Ingeniería Social y Phishing",
      slides: [
        {
          tag: "PSICOLOGÍA",
          titulo: "Atacando la mente humana",
          contenido: `La ingeniería social explota psicología humana, no vulnerabilidades técnicas. Es el vector de ataque más efectivo porque no requiere código.

PRINCIPIOS PSICOLÓGICOS QUE EXPLOTAN:

Autoridad — "Soy el CEO, necesito que hagas esto ahora."
La gente obedece a figuras de autoridad sin cuestionar.

Urgencia/Miedo — "Tu cuenta será suspendida en 24 horas."
La presión de tiempo anula el pensamiento crítico.

Reciprocidad — "Te di algo, ahora tú dame algo."
Enviar algo útil (documento, herramienta) antes de pedir algo.

Escasez — "Solo quedan 2 plazas disponibles."
El miedo a perderse algo impulsa acción apresurada.

Confianza/Familiaridad — "Soy del soporte técnico de Microsoft."
Suplantar entidades conocidas y confiables.

Social Proof — "Tu colega Juan ya lo hizo."
Si otros lo hacen, debe estar bien.

Kevin Mitnick, el hacker más famoso de los años 90, dijo: "La ingeniería social evita el trabajo de hackear el sistema — hackea a las personas que lo controlan."`,
        },
        {
          tag: "TÉCNICAS",
          titulo: "Tipos de ataques de ingeniería social",
          contenido: `PHISHING — emails masivos que suplantan marcas conocidas (banco, Microsoft, correo). Objetivo: robar credenciales o instalar malware.

SPEAR PHISHING — phishing dirigido a una persona u organización específica. El atacante investiga a la víctima (LinkedIn, OSINT) y personaliza el mensaje. Tasa de éxito mucho mayor.

WHALING — spear phishing dirigido a ejecutivos (CEO, CFO). El email simula ser de socios, reguladores o boards. Los atacantes esperan hasta meses para el momento ideal.

VISHING (Voice Phishing) — llamadas telefónicas. "Soy del banco, detectamos actividad sospechosa, necesito verificar su tarjeta."

SMISHING (SMS Phishing) — mensajes de texto. "Su paquete está retenido en aduana. Ingrese aquí para librerarlo."

PRETEXTING — crear una historia falsa (pretext) elaborada. El atacante se hace pasar por alguien con razón legítima para pedir información.

BAITING — dejar un USB infectado en el estacionamiento de la empresa. La curiosidad hace que alguien lo conecte.

QUID PRO QUO — ofrecer algo a cambio de información o acceso. "Le damos soporte técnico gratis a cambio de sus credenciales temporales."`
        },
        {
          tag: "DEFENSA",
          titulo: "Cómo identificar y resistir ataques",
          contenido: `Señales de alerta en emails y mensajes:

Urgencia extrema — "¡Actúa AHORA o perderás tu cuenta!"
Dominio sospechoso — support@micros0ft.com (cero en lugar de O)
Errores gramaticales — aunque los ataques modernos están bien escritos
Adjuntos no solicitados — .exe, .zip, macro-enabled .docx
URLs que no coinciden — el texto dice "banco.com" pero el link va a banco-seguro.malicious.com
Solicitudes inusuales — "Necesito tu contraseña para arreglar el problema"

TÉCNICAS DE VERIFICACIÓN:
Hover sobre links antes de hacer click — ver la URL real
Verificar por canal alternativo — si el "CEO" pide algo urgente, llámalo directamente
DMARC/SPF/DKIM — protocolos que verifican que el email realmente viene del dominio que dice

SIMULACIONES DE PHISHING:
Las empresas contratan pentesters para enviar phishing a sus propios empleados. El objetivo es medir qué porcentaje hace click y entrenarlos. GoPhish es la herramienta estándar para esto.`
        },
      ],
      quiz: [
        {
          q: "Recibes un email que dice: 'URGENTE: Tu cuenta bancaria ha sido comprometida. Debes verificar tus datos en las próximas 2 horas o será suspendida.' ¿Qué técnicas psicológicas usa?",
          opts: ["Solo reciprocidad", "Urgencia y miedo — presionar para actuar rápido sin pensar críticamente", "Solo autoridad", "Social proof y escasez"],
          c: 1,
          e: "El mensaje combina urgencia ('2 horas') y miedo ('suspendida'). Estas dos técnicas juntas anulan el pensamiento crítico — la víctima actúa por pánico en lugar de verificar la legitimidad del mensaje."
        },
        {
          q: "¿Cuál es la diferencia entre phishing y spear phishing?",
          opts: ["No hay diferencia, son términos intercambiables", "Phishing es masivo y genérico; spear phishing es dirigido y personalizado usando información específica de la víctima", "Phishing usa email; spear phishing usa llamadas telefónicas", "Phishing ataca empresas; spear phishing ataca individuos"],
          c: 1,
          e: "El spear phishing investiga a la víctima (nombre, empresa, cargo, proyectos actuales, colegas) para crear un mensaje creíble y personalizado. La tasa de éxito es mucho mayor que el phishing genérico."
        },
        {
          q: "Un atacante deja 10 USB rotulados como 'Salarios 2024.xlsx' en el estacionamiento de una empresa. Tres empleados los conectan a sus computadoras. ¿Qué técnica usó?",
          opts: ["Vishing — ataque por voz", "Pretexting — historia falsa elaborada", "Baiting — usar la curiosidad humana como anzuelo con un objeto físico infectado", "Quid Pro Quo — intercambio de servicios"],
          c: 2,
          e: "Baiting explota la curiosidad. Un USB rotulado con algo atractivo (salarios, confidencial, proyecto secreto) hace que la víctima lo conecte voluntariamente. Es técnicamente simple pero efectivo — el malware se ejecuta automáticamente al conectar el USB."
        },
        {
          q: "¿Para qué sirve GoPhish en un pentest?",
          opts: ["Para escanear vulnerabilidades web", "Para simular campañas de phishing contra los empleados de un cliente y medir qué porcentaje hace click", "Para descifrar contraseñas capturadas", "Para interceptar tráfico de red"],
          c: 1,
          e: "GoPhish es un framework open source para campañas de phishing controladas. Permite crear emails de phishing convincentes, rastrear quién hace click, quién ingresa credenciales y generar reportes. Es la herramienta estándar para awareness training."
        },
        {
          q: "Recibes un email del 'soporte de Microsoft' desde la dirección micros0ft-support@hotmail.com. ¿Qué señales de alerta ves?",
          opts: ["Ninguna, Microsoft usa Hotmail para soporte", "Dos señales: el dominio hotmail.com (Microsoft no usa Hotmail para soporte corporativo) y micros0ft con un cero en lugar de la O — typosquatting", "Solo que usa Hotmail", "El email es legítimo si el contenido parece profesional"],
          c: 1,
          e: "Typosquatting: reemplazar letras por números similares (0 por O, 1 por l). Un dominio como micros0ft.com puede pasar desapercibido a primera vista. Además, Microsoft nunca usaría Hotmail para soporte oficial — verificar el dominio del remitente es el primer paso."
        },
      ]
    },

    // ─── LECCIÓN 5 ─────────────────────────────────────────
    {
      id: "2-5",
      titulo: "Criptografía Básica",
      slides: [
        {
          tag: "FUNDAMENTO",
          titulo: "Cifrado simétrico y asimétrico",
          contenido: `La criptografía es la base de toda comunicación segura en internet. Sin entenderla, no puedes entender HTTPS, VPNs, firmas digitales ni autenticación.

CIFRADO SIMÉTRICO — una sola clave para cifrar y descifrar:
AES-256 → estándar actual. Usado en discos cifrados, VPNs, archivos zip protegidos.
DES → obsoleto, roto en 1997.
Ventaja: muy rápido.
Problema: ¿cómo compartir la clave de forma segura? Si alguien intercepta la clave, todo está comprometido.

CIFRADO ASIMÉTRICO — par de claves pública/privada:
RSA, ECC (Elliptic Curve Cryptography)
Clave pública → se comparte libremente. Cualquiera puede cifrar con ella.
Clave privada → nunca se comparte. Solo el propietario puede descifrar.
Ventaja: resuelve el problema de distribución de claves.
Desventaja: mucho más lento que simétrico.

SOLUCIÓN REAL (TLS/HTTPS): usa ambos.
1. Asimétrico para el handshake inicial (intercambiar la clave simétrica de forma segura)
2. Simétrico para el tráfico continuo (más eficiente)
Lo mejor de cada mundo.`
        },
        {
          tag: "HASHING",
          titulo: "Funciones hash y contraseñas",
          contenido: `Un hash es una función unidireccional: dados los mismos datos de entrada, siempre produce la misma salida de longitud fija.

echo -n "hackforge" | sha256sum
→ siempre da el mismo hash

Propiedades críticas:
Determinista — mismo input = mismo output
Irreversible — no puedes recuperar el input desde el hash
Avalanche effect — cambiar un bit cambia completamente el hash
Collision resistant — dos inputs diferentes no deben dar el mismo hash

ALGORITMOS:
MD5 → ROTO. No usar para seguridad. Aún útil para verificación de integridad no crítica.
SHA-1 → DEPRECADO. Google demostró colisiones en 2017.
SHA-256 → Seguro. Usado en Bitcoin, certificados SSL.
SHA-3 → Más nuevo, diseño diferente a SHA-2.
bcrypt/Argon2 → Para contraseñas. Son lentos a propósito.

¿Por qué bcrypt para contraseñas y no SHA-256?
SHA-256 es extremadamente rápido → un atacante puede probar miles de millones de contraseñas por segundo (hashcat con GPU).
bcrypt es deliberadamente lento → hace la fuerza bruta económicamente inviable.`
        },
        {
          tag: "ATAQUES",
          titulo: "Ataques criptográficos",
          contenido: `Conocer los ataques te dice qué implementar bien:

FUERZA BRUTA — probar todas las combinaciones posibles.
Herramienta: hashcat, John the Ripper.
Mitigación: contraseñas largas + bcrypt/Argon2.

DICCIONARIO — probar contraseñas de una lista (rockyou.txt).
Mitigación: contraseñas únicas que no están en diccionarios.

RAINBOW TABLES — tablas precalculadas de hash→contraseña.
Mitigación: SALT. Un valor aleatorio único añadido a cada contraseña antes de hashear. Invalida las rainbow tables completamente.

MAN-IN-THE-MIDDLE (criptográfico) — interceptar el handshake TLS.
SSL Stripping → degradar HTTPS a HTTP.
Mitigación: HSTS (HTTP Strict Transport Security) — el navegador solo acepta HTTPS.

PADDING ORACLE — ataque que explota cómo un sistema maneja errores de cifrado.
Mitigación: usar modos de cifrado autenticados (AES-GCM en lugar de AES-CBC).

CERTIFICATE PINNING — la app solo acepta un certificado específico, no cualquier certificado válido.
Dificulta ataques MITM incluso con certificados firmados por CAs comprometidas.`
        },
      ],
      quiz: [
        {
          q: "HTTPS usa criptografía asimétrica para el handshake y simétrica para el tráfico. ¿Por qué esta combinación?",
          opts: ["Es el único método que funciona técnicamente", "El asimétrico resuelve el intercambio seguro de claves, el simétrico es más eficiente para el tráfico continuo — se obtiene seguridad y velocidad", "Para cumplir con estándares legales de cifrado", "Porque el asimétrico no puede cifrar datos grandes"],
          c: 1,
          e: "El cifrado asimétrico es ~1000x más lento que el simétrico. Usarlo para todo el tráfico sería inviable. TLS usa asimétrico solo para el handshake (intercambiar de forma segura la clave simétrica de sesión) y luego simétrico para el tráfico real."
        },
        {
          q: "Una base de datos fue comprometida y las contraseñas están hasheadas con MD5 sin salt. ¿Por qué es un problema grave?",
          opts: ["MD5 está cifrado y es imposible revertirlo", "MD5 es rápido (permite millones de intentos/seg) y sin salt las Rainbow Tables permiten encontrar contraseñas comunes en segundos", "Solo afecta a contraseñas de más de 8 caracteres", "Es un problema menor porque el atacante solo tiene hashes"],
          c: 1,
          e: "MD5 sin salt es devastador: 1) Las rainbow tables tienen precomputados millones de hashes MD5 comunes. 2) MD5 es muy rápido — hashcat puede calcular 50+ mil millones de hashes MD5 por segundo con una GPU moderna. Una contraseña débil cae en segundos."
        },
        {
          q: "¿Para qué sirve el SALT en el hashing de contraseñas?",
          opts: ["Para hacer el hash más largo y seguro", "Es un valor aleatorio único por contraseña que invalida las Rainbow Tables y fuerza a recalcular el ataque por cada contraseña individualmente", "Para cifrar el hash con una clave adicional", "Para acelerar el proceso de verificación"],
          c: 1,
          e: "Sin salt, el hash de 'password123' es siempre el mismo — una rainbow table lo encuentra al instante. Con salt, 'password123' + salt_aleatorio genera un hash único por usuario. El atacante debe hacer fuerza bruta separada para cada cuenta."
        },
        {
          q: "¿Qué es SSL Stripping y cómo se mitiga?",
          opts: ["Eliminar el certificado SSL expirado del servidor", "Un ataque MITM que degrada HTTPS a HTTP — el atacante habla HTTPS con el servidor pero HTTP con la víctima. Mitigación: HSTS", "Robar el certificado SSL del servidor", "Un proceso de optimización del protocolo TLS"],
          c: 1,
          e: "En SSL Stripping, el atacante (en posición MITM) intercepta la conexión y sirve HTTP al usuario mientras mantiene HTTPS con el servidor. El usuario ve la página pero sin cifrado. HSTS ordena al navegador que SOLO use HTTPS con ese dominio, bloqueando el downgrade."
        },
        {
          q: "¿Por qué bcrypt es mejor que SHA-256 para almacenar contraseñas?",
          opts: ["bcrypt produce hashes más largos y seguros", "bcrypt es deliberadamente lento, lo que hace que la fuerza bruta sea económicamente inviable. SHA-256 es tan rápido que permite miles de millones de intentos por segundo con GPU", "bcrypt cifra el hash con una clave adicional", "SHA-256 está roto criptográficamente"],
          c: 1,
          e: "SHA-256 en GPU: ~10 mil millones de hashes/segundo. bcrypt (cost factor 12): ~1,000 hashes/segundo. La misma GPU que crackea SHA-256 en segundos necesita años para bcrypt. La lentitud es la feature, no un bug."
        },
      ]
    },

    // ─── LECCIÓN 6 ─────────────────────────────────────────
    {
      id: "2-6",
      titulo: "Vulnerabilidades y CVEs",
      slides: [
        {
          tag: "CONCEPTOS",
          titulo: "Vulnerabilidades, Exploits y Parches",
          contenido: `Vocabulario fundamental que usarás todos los días:

VULNERABILIDAD — debilidad en un sistema que puede ser explotada.
Puede ser: error de código, mala configuración, diseño defectuoso, credencial débil.

EXPLOIT — código o técnica que aprovecha una vulnerabilidad específica.
Una vulnerabilidad sin exploit conocido sigue siendo un riesgo, pero menor.

PAYLOAD — el código malicioso que se ejecuta después de que el exploit funciona.
El exploit abre la puerta; el payload hace el daño (reverse shell, ransomware, robo de datos).

CVE (Common Vulnerabilities and Exposures) — sistema de identificación estándar de vulnerabilidades.
Formato: CVE-AÑO-NÚMERO → CVE-2021-44228 (Log4Shell)
Base de datos pública: nvd.nist.gov

CVSS (Common Vulnerability Scoring System) — puntuación de severidad (0-10):
0-3.9 → Baja
4-6.9 → Media
7-8.9 → Alta
9-10 → Crítica

CVE-2021-44228 (Log4Shell) tiene CVSS 10.0 — máximo posible. Afectó a millones de sistemas.

ZERO-DAY — vulnerabilidad desconocida para el proveedor. No hay parche disponible.
Los zero-days son los más valiosos en mercados de exploits. Precios desde $10,000 a millones de dólares.`
        },
        {
          tag: "GESTIÓN",
          titulo: "Gestión de vulnerabilidades",
          contenido: `Encontrar vulnerabilidades es solo el primer paso. Gestionarlas es el trabajo real.

EL CICLO:
1. Descubrimiento → escáneres (Nessus, OpenVAS), pentests, bug bounty
2. Evaluación → ¿cuál es el riesgo real? (CVSS + contexto del negocio)
3. Priorización → no todo puede parcharse al mismo tiempo
4. Remedación → parchar, mitigar, aceptar el riesgo
5. Verificación → confirmar que el parche funciona
6. Repetir

PRIORIZACIÓN REAL:
Una vulnerabilidad CVSS 9.0 en un sistema aislado puede ser menos urgente que una CVSS 6.5 en el servidor web principal expuesto a internet.
El contexto importa más que el número.

WINDOW OF EXPOSURE:
El tiempo entre que se publica un CVE y el sistema es parchado. Muchos ataques explotan CVEs días después de su publicación. Los actores de amenaza escanean internet buscando versiones vulnerables.

HERRAMIENTAS:
Nessus → escáner de vulnerabilidades estándar enterprise
OpenVAS/Greenbone → alternativa open source
Nuclei → escáner basado en templates, muy rápido
Metasploit → framework de explotación con módulos para CVEs conocidos`
        },
        {
          tag: "RESPONSABILIDAD",
          titulo: "Responsible Disclosure y Bug Bounty",
          contenido: `¿Qué haces cuando encuentras una vulnerabilidad en un sistema que no es tuyo?

RESPONSIBLE DISCLOSURE (Divulgación Responsable):
Contactas al proveedor de forma privada.
Les das tiempo razonable para parchear (generalmente 90 días).
Después publicas los detalles técnicos.

Google Project Zero → equipo dedicado a encontrar zero-days. Si el proveedor no parchea en 90 días, publican igual.
Esta presión de tiempo es deliberada — sin ella, muchos vendedores nunca parchearían.

BUG BOUNTY:
Programas donde empresas pagan por encontrar vulnerabilidades en sus sistemas.
HackerOne, Bugcrowd → plataformas principales.
Recompensas desde $100 hasta $1,000,000+ para bugs críticos.
Google paga hasta $150,000 por bugs en Chrome.
Microsoft hasta $250,000 por vulnerabilidades en Azure.

REGLAS BÁSICAS:
Solo atacar sistemas en scope (definidos en las reglas del programa)
No exfiltrar datos reales
No interrumpir servicios
Documentar todo meticulosamente

El bug bounty es una forma legítima y rentable de aplicar habilidades de hacking.`
        },
      ],
      quiz: [
        {
          q: "CVE-2021-44228 (Log4Shell) tiene CVSS 10.0. ¿Qué significa esta puntuación?",
          opts: ["Es una vulnerabilidad de severidad media que requiere parche eventual", "Es una vulnerabilidad de severidad crítica — puntuación máxima posible — que requiere parche inmediato", "Es una puntuación de rendimiento del sistema", "Indica que la vulnerabilidad es difícil de explotar"],
          c: 1,
          e: "CVSS 10.0 es la puntuación máxima — severidad crítica. Log4Shell permitía ejecución remota de código sin autenticación en millones de sistemas que usaban la librería Log4j de Java. Fue parcheada de emergencia en 72 horas por la mayoría de vendors."
        },
        {
          q: "¿Cuál es la diferencia entre una vulnerabilidad y un exploit?",
          opts: ["Son términos sinónimos en ciberseguridad", "Vulnerabilidad es la debilidad del sistema; exploit es el código o técnica específica que aprovecha esa debilidad para comprometer el sistema", "Vulnerabilidad afecta software; exploit afecta hardware", "Exploit es más peligroso que vulnerabilidad siempre"],
          c: 1,
          e: "Una vulnerabilidad existe en el software. Un exploit es la 'llave' que abre esa vulnerabilidad. Sin exploit conocido, una vulnerabilidad es más difícil de aprovechar (aunque no imposible). El exploit hace la vulnerabilidad prácticamente explotable."
        },
        {
          q: "Una empresa tiene una vulnerabilidad CVSS 9.5 en una base de datos interna sin acceso a internet, y una CVSS 6.0 en su servidor web público. ¿Cuál priorizar?",
          opts: ["Siempre la de mayor puntuación CVSS — 9.5 primero", "La CVSS 6.0 del servidor web público — está expuesta a internet y es el primer vector de ataque, el contexto supera la puntuación abstracta", "Parchear ambas simultáneamente", "Ninguna, CVSS 6.0 no requiere atención inmediata"],
          c: 1,
          e: "El CVSS es una guía, no una verdad absoluta. Una vulnerabilidad en el servidor web público (expuesta a millones de atacantes potenciales) puede ser más urgente que una de mayor CVSS en un sistema aislado. El riesgo real = probabilidad × impacto × contexto."
        },
        {
          q: "¿Qué es un Zero-Day?",
          opts: ["Una vulnerabilidad que fue parchada en el mismo día que se descubrió", "Una vulnerabilidad desconocida para el proveedor para la cual no existe parche disponible", "Una vulnerabilidad que solo existe el primer día del mes", "Un exploit que tarda cero segundos en ejecutarse"],
          c: 1,
          e: "Zero-day significa que el proveedor tiene 'cero días' para reaccionar porque no conoce la vulnerabilidad. Son extremadamente valiosos — sin parche disponible, todos los sistemas que usan ese software están potencialmente vulnerables."
        },
        {
          q: "¿Qué es el Responsible Disclosure y por qué Google Project Zero usa un plazo de 90 días?",
          opts: ["Es revelar vulnerabilidades al público inmediatamente para máxima transparencia", "Es notificar al proveedor privadamente y darle 90 días para parchear. El plazo crea presión — sin él, muchos vendors nunca parchearían", "Es vender vulnerabilidades a los proveedores afectados", "Es un proceso legal para certificar software seguro"],
          c: 1,
          e: "Sin una fecha límite, los vendedores pueden ignorar indefinidamente los reportes de seguridad. El plazo de 90 días (estándar de la industria) crea urgencia responsable. Si no parchean en 90 días, la publicación pública presiona aún más y advierte a los usuarios."
        },
      ]
    },

  ]
};