// HACKFORGE - CCNA Prep Data
// Banco de preguntas, flashcards y subnetting

// ── BANCO DE PREGUNTAS ───────────────────────────────────
export const PREGUNTAS_CCNA = [
  // REDES FUNDAMENTALES
  {
    id: 1, tema: "Fundamentos de Red",
    pregunta: "¿Cuál es el modelo de referencia de 7 capas usado para describir comunicaciones de red?",
    opciones: ["Modelo TCP/IP", "Modelo OSI", "Modelo IEEE", "Modelo IETF"],
    correcta: 1,
    explicacion: "El modelo OSI (Open Systems Interconnection) tiene 7 capas: Física, Enlace, Red, Transporte, Sesión, Presentación y Aplicación."
  },
  {
    id: 2, tema: "Fundamentos de Red",
    pregunta: "¿En qué capa del modelo OSI opera un switch?",
    opciones: ["Capa 1 - Física", "Capa 2 - Enlace de datos", "Capa 3 - Red", "Capa 4 - Transporte"],
    correcta: 1,
    explicacion: "Un switch opera en la Capa 2 (Enlace de datos) y toma decisiones basándose en direcciones MAC."
  },
  {
    id: 3, tema: "Fundamentos de Red",
    pregunta: "¿En qué capa del modelo OSI opera un router?",
    opciones: ["Capa 1", "Capa 2", "Capa 3", "Capa 4"],
    correcta: 2,
    explicacion: "Un router opera en la Capa 3 (Red) y toma decisiones basándose en direcciones IP."
  },
  {
    id: 4, tema: "Fundamentos de Red",
    pregunta: "¿Cuál es la función principal de la capa de Transporte?",
    opciones: ["Enrutamiento de paquetes", "Comunicación extremo a extremo y control de flujo", "Conversión de formatos de datos", "Control de acceso al medio"],
    correcta: 1,
    explicacion: "La capa de Transporte proporciona comunicación extremo a extremo, control de flujo y corrección de errores. TCP y UDP operan en esta capa."
  },
  {
    id: 5, tema: "Fundamentos de Red",
    pregunta: "¿Qué protocolo de la capa de Transporte garantiza entrega confiable?",
    opciones: ["UDP", "TCP", "ICMP", "ARP"],
    correcta: 1,
    explicacion: "TCP (Transmission Control Protocol) garantiza entrega confiable mediante confirmaciones (ACK), retransmisión y control de flujo."
  },
  {
    id: 6, tema: "Fundamentos de Red",
    pregunta: "¿Cuántas capas tiene el modelo TCP/IP?",
    opciones: ["3", "4", "5", "7"],
    correcta: 1,
    explicacion: "El modelo TCP/IP tiene 4 capas: Acceso a la red, Internet, Transporte y Aplicación."
  },
  {
    id: 7, tema: "Fundamentos de Red",
    pregunta: "¿Qué dispositivo opera en la Capa 1 del modelo OSI?",
    opciones: ["Switch", "Router", "Hub", "Firewall"],
    correcta: 2,
    explicacion: "Un hub opera en la Capa 1 (Física) y simplemente repite la señal eléctrica a todos los puertos sin analizar el contenido."
  },
  {
    id: 8, tema: "Fundamentos de Red",
    pregunta: "¿Qué significa PDU en el contexto de redes?",
    opciones: ["Protocol Data Unit", "Physical Data Unit", "Public Data Utility", "Packet Data Upload"],
    correcta: 0,
    explicacion: "PDU (Protocol Data Unit) es el nombre del dato en cada capa: bits (capa 1), tramas (capa 2), paquetes (capa 3), segmentos (capa 4)."
  },

  // IP Y SUBNETTING
  {
    id: 9, tema: "IP y Subnetting",
    pregunta: "¿Cuántos bits tiene una dirección IPv4?",
    opciones: ["16 bits", "32 bits", "64 bits", "128 bits"],
    correcta: 1,
    explicacion: "IPv4 usa 32 bits, representados como 4 octetos en notación decimal punteada (ej: 192.168.1.1)."
  },
  {
    id: 10, tema: "IP y Subnetting",
    pregunta: "¿Qué clase de dirección IP es 192.168.1.1?",
    opciones: ["Clase A", "Clase B", "Clase C", "Clase D"],
    correcta: 2,
    explicacion: "Las direcciones Clase C van de 192.0.0.0 a 223.255.255.255. 192.168.x.x es también una dirección privada RFC 1918."
  },
  {
    id: 11, tema: "IP y Subnetting",
    pregunta: "¿Cuántos hosts válidos hay en una subred /24?",
    opciones: ["254", "255", "256", "253"],
    correcta: 0,
    explicacion: "Una /24 tiene 256 direcciones (2^8). Se restan 2 (red y broadcast): 256 - 2 = 254 hosts válidos."
  },
  {
    id: 12, tema: "IP y Subnetting",
    pregunta: "¿Cuál es la máscara de subred de una red /26?",
    opciones: ["255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224"],
    correcta: 2,
    explicacion: "/26 significa 26 bits en 1. Los primeros 3 octetos son 255.255.255, el cuarto: 11000000 = 192. Máscara: 255.255.255.192."
  },
  {
    id: 13, tema: "IP y Subnetting",
    pregunta: "¿Cuántas subredes crea una máscara /28 a partir de una red /24?",
    opciones: ["8", "16", "32", "4"],
    correcta: 1,
    explicacion: "/28 usa 4 bits para subredes en el último octeto de una /24 (28-24=4). 2^4 = 16 subredes."
  },
  {
    id: 14, tema: "IP y Subnetting",
    pregunta: "¿Qué rango de IP es privado según RFC 1918?",
    opciones: ["172.16.0.0 - 172.31.255.255", "172.0.0.0 - 172.255.255.255", "170.0.0.0 - 172.255.255.255", "172.16.0.0 - 172.16.255.255"],
    correcta: 0,
    explicacion: "Los rangos privados RFC 1918 son: 10.0.0.0/8, 172.16.0.0/12 (172.16-172.31), y 192.168.0.0/16."
  },
  {
    id: 15, tema: "IP y Subnetting",
    pregunta: "¿Cuántos hosts válidos tiene una subred /30?",
    opciones: ["1", "2", "4", "6"],
    correcta: 1,
    explicacion: "/30 tiene 4 direcciones (2^2). Restando red y broadcast: 4-2=2 hosts. Se usa típicamente en enlaces punto a punto."
  },
  {
    id: 16, tema: "IP y Subnetting",
    pregunta: "¿Cuál es la dirección de broadcast de la red 192.168.1.0/25?",
    opciones: ["192.168.1.126", "192.168.1.127", "192.168.1.128", "192.168.1.255"],
    correcta: 1,
    explicacion: "/25 tiene 128 direcciones. La red es 192.168.1.0, el broadcast es 192.168.1.127, hosts válidos: .1 a .126."
  },
  {
    id: 17, tema: "IP y Subnetting",
    pregunta: "¿Qué dirección IP se usa para loopback en IPv4?",
    opciones: ["0.0.0.0", "127.0.0.1", "255.255.255.255", "169.254.0.1"],
    correcta: 1,
    explicacion: "127.0.0.1 es la dirección de loopback. El rango 127.0.0.0/8 está reservado para pruebas locales."
  },

  // ROUTING
  {
    id: 18, tema: "Routing",
    pregunta: "¿Qué métrica usa OSPF para calcular el mejor camino?",
    opciones: ["Hop count", "Costo (basado en ancho de banda)", "Delay", "Confiabilidad"],
    correcta: 1,
    explicacion: "OSPF usa el costo como métrica, calculado como 10^8 / ancho de banda. Una interfaz de 100 Mbps tiene costo 1."
  },
  {
    id: 19, tema: "Routing",
    pregunta: "¿Cuál es la distancia administrativa de OSPF?",
    opciones: ["90", "100", "110", "120"],
    correcta: 2,
    explicacion: "Las distancias administrativas: Connected=0, Static=1, EIGRP=90, OSPF=110, RIP=120. Menor valor = más confiable."
  },
  {
    id: 20, tema: "Routing",
    pregunta: "¿Qué tipo de protocolo de routing es RIP?",
    opciones: ["Link-state", "Distance-vector", "Path-vector", "Hybrid"],
    correcta: 1,
    explicacion: "RIP es un protocolo distance-vector. Envía su tabla de routing completa a los vecinos cada 30 segundos. Usa hop count como métrica (máximo 15)."
  },
  {
    id: 21, tema: "Routing",
    pregunta: "¿Cuántos hops máximos soporta RIPv2?",
    opciones: ["10", "15", "16", "255"],
    correcta: 1,
    explicacion: "RIP tiene un máximo de 15 hops. Un destino a 16 hops se considera inalcanzable (infinito). Esta limitación lo hace inadecuado para redes grandes."
  },
  {
    id: 22, tema: "Routing",
    pregunta: "¿Qué comando muestra la tabla de routing en un router Cisco?",
    opciones: ["show ip route", "show routing table", "display route", "show routes all"],
    correcta: 0,
    explicacion: "show ip route muestra la tabla de routing IP. Las rutas se identifican con letras: C=Connected, S=Static, O=OSPF, R=RIP, D=EIGRP."
  },
  {
    id: 23, tema: "Routing",
    pregunta: "¿Qué es una ruta estática por defecto?",
    opciones: ["0.0.0.0/32", "0.0.0.0/0", "255.255.255.255/0", "192.168.0.0/0"],
    correcta: 1,
    explicacion: "La ruta por defecto 0.0.0.0/0 coincide con cualquier destino. Se usa como 'gateway of last resort' para enviar tráfico sin ruta específica."
  },
  {
    id: 24, tema: "Routing",
    pregunta: "¿Qué protocolo de routing es link-state y usa el algoritmo SPF?",
    opciones: ["RIP", "EIGRP", "OSPF", "BGP"],
    correcta: 2,
    explicacion: "OSPF (Open Shortest Path First) es link-state y usa el algoritmo de Dijkstra (SPF) para calcular el árbol de caminos más cortos."
  },

  // SWITCHING Y VLANs
  {
    id: 25, tema: "Switching y VLANs",
    pregunta: "¿Qué es una VLAN?",
    opciones: ["Una red física separada", "Una red lógica que segmenta el tráfico dentro de un switch", "Un tipo de cable de red", "Un protocolo de routing"],
    correcta: 1,
    explicacion: "Una VLAN (Virtual LAN) es una segmentación lógica que permite dividir un switch en múltiples dominios de broadcast independientes."
  },
  {
    id: 26, tema: "Switching y VLANs",
    pregunta: "¿Qué tipo de puerto de switch puede transportar múltiples VLANs?",
    opciones: ["Puerto de acceso (Access)", "Puerto troncal (Trunk)", "Puerto de gestión", "Puerto espejo"],
    correcta: 1,
    explicacion: "Un puerto trunk transporta tráfico de múltiples VLANs usando etiquetas 802.1Q. Un puerto access pertenece a una sola VLAN."
  },
  {
    id: 27, tema: "Switching y VLANs",
    pregunta: "¿Qué protocolo de Cisco gestiona VLANs automáticamente entre switches?",
    opciones: ["STP", "VTP", "CDP", "DTP"],
    correcta: 1,
    explicacion: "VTP (VLAN Trunking Protocol) es un protocolo Cisco que propaga la información de VLANs entre switches en el mismo dominio VTP."
  },
  {
    id: 28, tema: "Switching y VLANs",
    pregunta: "¿Qué protocolo previene bucles en redes con switches redundantes?",
    opciones: ["VTP", "CDP", "STP", "LACP"],
    correcta: 2,
    explicacion: "STP (Spanning Tree Protocol) previene bucles en redes con enlaces redundantes bloqueando puertos seleccionados para crear una topología sin bucles."
  },
  {
    id: 29, tema: "Switching y VLANs",
    pregunta: "¿Cuál es la VLAN nativa por defecto en switches Cisco?",
    opciones: ["VLAN 0", "VLAN 1", "VLAN 100", "VLAN 1000"],
    correcta: 1,
    explicacion: "La VLAN 1 es la VLAN nativa por defecto en switches Cisco. El tráfico de la VLAN nativa no se etiqueta en los enlaces trunk."
  },
  {
    id: 30, tema: "Switching y VLANs",
    pregunta: "¿Qué comando asigna un puerto a la VLAN 10 en un switch Cisco?",
    opciones: ["switchport vlan 10", "switchport access vlan 10", "vlan access 10", "set vlan 10"],
    correcta: 1,
    explicacion: "El comando correcto es: interface fa0/1 → switchport mode access → switchport access vlan 10."
  },

  // PROTOCOLOS DE APLICACIÓN
  {
    id: 31, tema: "Protocolos de Aplicación",
    pregunta: "¿Qué puerto usa HTTPS?",
    opciones: ["80", "443", "8080", "8443"],
    correcta: 1,
    explicacion: "HTTPS usa el puerto 443. HTTP usa el 80. HTTPS cifra la comunicación con TLS/SSL."
  },
  {
    id: 32, tema: "Protocolos de Aplicación",
    pregunta: "¿Qué protocolo resuelve nombres de dominio a direcciones IP?",
    opciones: ["DHCP", "DNS", "ARP", "ICMP"],
    correcta: 1,
    explicacion: "DNS (Domain Name System) traduce nombres como 'google.com' a direcciones IP. Usa el puerto 53 (UDP para consultas, TCP para transferencias)."
  },
  {
    id: 33, tema: "Protocolos de Aplicación",
    pregunta: "¿Qué protocolo asigna direcciones IP automáticamente?",
    opciones: ["DNS", "ARP", "DHCP", "NAT"],
    correcta: 2,
    explicacion: "DHCP (Dynamic Host Configuration Protocol) asigna automáticamente IP, máscara, gateway y DNS. Usa puertos 67 (servidor) y 68 (cliente)."
  },
  {
    id: 34, tema: "Protocolos de Aplicación",
    pregunta: "¿Qué puerto usa SSH?",
    opciones: ["21", "22", "23", "25"],
    correcta: 1,
    explicacion: "SSH (Secure Shell) usa el puerto 22. Telnet usa el 23 pero no cifra. SSH reemplazó a Telnet por su cifrado."
  },
  {
    id: 35, tema: "Protocolos de Aplicación",
    pregunta: "¿Qué protocolo usa ping?",
    opciones: ["TCP", "UDP", "ICMP", "ARP"],
    correcta: 2,
    explicacion: "Ping usa ICMP (Internet Control Message Protocol) con mensajes Echo Request y Echo Reply para verificar conectividad."
  },
  {
    id: 36, tema: "Protocolos de Aplicación",
    pregunta: "¿Qué protocolo resuelve IPs a direcciones MAC?",
    opciones: ["DNS", "RARP", "ARP", "DHCP"],
    correcta: 2,
    explicacion: "ARP (Address Resolution Protocol) resuelve direcciones IP a direcciones MAC dentro de la misma red local."
  },

  // SEGURIDAD
  {
    id: 37, tema: "Seguridad de Red",
    pregunta: "¿Qué es una ACL en redes Cisco?",
    opciones: ["Un tipo de VLAN", "Una lista de control de acceso que filtra tráfico", "Un protocolo de routing", "Un tipo de switch"],
    correcta: 1,
    explicacion: "ACL (Access Control List) es un conjunto de reglas que permite o deniega tráfico basándose en IPs, puertos y protocolos."
  },
  {
    id: 38, tema: "Seguridad de Red",
    pregunta: "¿Cuál es la diferencia entre ACL estándar y extendida?",
    opciones: [
      "No hay diferencia",
      "Estándar filtra solo por IP origen; extendida filtra por IP origen/destino, puerto y protocolo",
      "Extendida filtra solo por IP destino",
      "Estándar es más nueva"
    ],
    correcta: 1,
    explicacion: "ACL estándar (1-99): solo IP origen. ACL extendida (100-199): IP origen, IP destino, protocolo y puerto. Las extendidas son más específicas."
  },
  {
    id: 39, tema: "Seguridad de Red",
    pregunta: "¿Qué ataque consiste en inundar un switch con MACs falsas?",
    opciones: ["ARP Spoofing", "MAC Flooding", "VLAN Hopping", "STP Attack"],
    correcta: 1,
    explicacion: "MAC Flooding inunda la tabla CAM del switch con miles de MACs falsas. Cuando la tabla se llena, el switch actúa como hub y envía todo a todos los puertos."
  },
  {
    id: 40, tema: "Seguridad de Red",
    pregunta: "¿Qué feature de Cisco limita el número de MACs por puerto?",
    opciones: ["Port Security", "DHCP Snooping", "Dynamic ARP Inspection", "802.1X"],
    correcta: 0,
    explicacion: "Port Security limita el número de MACs aprendidas por puerto y puede bloquear el puerto si se excede el límite o aparece una MAC no autorizada."
  },

  // IPv6
  {
    id: 41, tema: "IPv6",
    pregunta: "¿Cuántos bits tiene una dirección IPv6?",
    opciones: ["32 bits", "64 bits", "128 bits", "256 bits"],
    correcta: 2,
    explicacion: "IPv6 usa 128 bits, representados como 8 grupos de 4 dígitos hexadecimales separados por dos puntos (ej: 2001:0db8::1)."
  },
  {
    id: 42, tema: "IPv6",
    pregunta: "¿Cuál es el equivalente IPv6 de la dirección de loopback 127.0.0.1?",
    opciones: ["::0", "::1", "FE80::1", "FF02::1"],
    correcta: 1,
    explicacion: "::1 es la dirección de loopback en IPv6. Es el equivalente de 127.0.0.1 en IPv4."
  },
  {
    id: 43, tema: "IPv6",
    pregunta: "¿Qué tipo de dirección IPv6 comienza con FE80::/10?",
    opciones: ["Global Unicast", "Multicast", "Link-Local", "Loopback"],
    correcta: 2,
    explicacion: "Las direcciones Link-Local (FE80::/10) son equivalentes a las APIPA de IPv4. Solo son válidas en el segmento local y no son enrutables."
  },

  // WAN Y SERVICIOS
  {
    id: 44, tema: "WAN y Servicios",
    pregunta: "¿Qué es NAT y para qué se usa?",
    opciones: [
      "Un protocolo de routing dinámico",
      "Traduce direcciones IP privadas a públicas para acceder a internet",
      "Un tipo de VPN",
      "Un protocolo de gestión de red"
    ],
    correcta: 1,
    explicacion: "NAT (Network Address Translation) traduce IPs privadas a públicas. Permite que múltiples dispositivos con IPs privadas compartan una IP pública."
  },
  {
    id: 45, tema: "WAN y Servicios",
    pregunta: "¿Qué comando en Cisco IOS guarda la configuración en NVRAM?",
    opciones: ["save config", "write memory", "copy running-config startup-config", "B y C son correctas"],
    correcta: 3,
    explicacion: "Tanto 'write memory' como 'copy running-config startup-config' guardan la configuración. La NVRAM guarda la startup-config que persiste tras reinicio."
  },
  {
    id: 46, tema: "WAN y Servicios",
    pregunta: "¿Qué protocolo usa SNMP para gestión de red?",
    opciones: ["TCP puerto 161", "UDP puerto 161", "TCP puerto 162", "UDP puerto 25"],
    correcta: 1,
    explicacion: "SNMP usa UDP puerto 161 para queries y UDP puerto 162 para traps (alertas). UDP es más eficiente para polling de dispositivos."
  },
  {
    id: 47, tema: "WAN y Servicios",
    pregunta: "¿Qué significa QoS en networking?",
    opciones: ["Quality of Service — priorización del tráfico de red", "Quantity of Subnets", "Quality of Security", "Queue of Sessions"],
    correcta: 0,
    explicacion: "QoS (Quality of Service) permite priorizar ciertos tipos de tráfico (voz, video) sobre otros para garantizar rendimiento adecuado."
  },
  {
    id: 48, tema: "WAN y Servicios",
    pregunta: "¿Qué es HSRP?",
    opciones: [
      "Un protocolo de routing",
      "Hot Standby Router Protocol — gateway redundante de Cisco",
      "Un protocolo de VPN",
      "Un tipo de ACL"
    ],
    correcta: 1,
    explicacion: "HSRP (Hot Standby Router Protocol) es un protocolo Cisco que proporciona redundancia de gateway. Dos routers comparten una IP virtual; si falla el activo, el standby toma el control."
  },
  {
    id: 49, tema: "WAN y Servicios",
    pregunta: "¿Qué comando muestra las interfaces y sus IPs en un router Cisco?",
    opciones: ["show interfaces", "show ip interface brief", "display interfaces", "show ip config"],
    correcta: 1,
    explicacion: "show ip interface brief muestra un resumen de todas las interfaces: nombre, IP, estado de línea y protocolo en formato compacto."
  },
  {
    id: 50, tema: "WAN y Servicios",
    pregunta: "¿Cuál es el número de registro de la certificación CCNA actual?",
    opciones: ["CCNA 200-120", "CCNA 200-301", "CCNA 200-125", "CCNA 640-802"],
    correcta: 1,
    explicacion: "El examen actual es el CCNA 200-301, lanzado en febrero 2020. Cubre redes, seguridad, automatización y programabilidad en un solo examen."
  },

  // MÁS PREGUNTAS PARA VARIEDAD
  {
    id: 51, tema: "Fundamentos de Red",
    pregunta: "¿Qué capa del modelo OSI se encarga del cifrado y compresión de datos?",
    opciones: ["Capa 4 - Transporte", "Capa 5 - Sesión", "Capa 6 - Presentación", "Capa 7 - Aplicación"],
    correcta: 2,
    explicacion: "La Capa 6 (Presentación) se encarga de la traducción de formatos, cifrado/descifrado y compresión de datos."
  },
  {
    id: 52, tema: "IP y Subnetting",
    pregunta: "¿Cuántos bits de host tiene una subred /22?",
    opciones: ["8", "10", "12", "14"],
    correcta: 1,
    explicacion: "Una /22 tiene 32-22=10 bits de host. Eso da 2^10=1024 direcciones totales y 1022 hosts válidos."
  },
  {
    id: 53, tema: "Switching y VLANs",
    pregunta: "¿Qué versión mejorada de STP converge más rápido?",
    opciones: ["STP 802.1D", "RSTP 802.1W", "PVST+", "MST"],
    correcta: 1,
    explicacion: "RSTP (Rapid Spanning Tree Protocol) 802.1W converge en segundos vs los 30-50 segundos de STP original. Es el estándar moderno."
  },
  {
    id: 54, tema: "Routing",
    pregunta: "¿Qué es la distancia administrativa?",
    opciones: [
      "La distancia física entre routers",
      "Un valor que indica la confiabilidad de una fuente de routing",
      "El número de hops a un destino",
      "El ancho de banda de un enlace"
    ],
    correcta: 1,
    explicacion: "La distancia administrativa (AD) indica cuán confiable es una fuente de routing. Menor AD = más confiable. Connected=0, Static=1, OSPF=110, RIP=120."
  },
  {
    id: 55, tema: "Seguridad de Red",
    pregunta: "¿Qué es DHCP Snooping?",
    opciones: [
      "Un ataque de red",
      "Una feature que filtra mensajes DHCP no autorizados en switches",
      "Un protocolo de routing seguro",
      "Un tipo de firewall"
    ],
    correcta: 1,
    explicacion: "DHCP Snooping protege contra servidores DHCP falsos (rogue DHCP). Define puertos confiables (trusted) y no confiables, descartando mensajes DHCP de puertos no confiables."
  },
  {
    id: 56, tema: "Protocolos de Aplicación",
    pregunta: "¿Qué puerto usa FTP para transferencia de datos?",
    opciones: ["20", "21", "22", "23"],
    correcta: 0,
    explicacion: "FTP usa dos puertos: 21 para control (comandos) y 20 para transferencia de datos en modo activo. SFTP usa el puerto 22."
  },
  {
    id: 57, tema: "WAN y Servicios",
    pregunta: "¿Qué protocolo sincroniza el tiempo en dispositivos de red?",
    opciones: ["SNMP", "NTP", "Syslog", "TFTP"],
    correcta: 1,
    explicacion: "NTP (Network Time Protocol) sincroniza el reloj de los dispositivos. Es crítico para logs, autenticación y correlación de eventos de seguridad."
  },
  {
    id: 58, tema: "IPv6",
    pregunta: "¿Qué reemplaza al protocolo ARP en IPv6?",
    opciones: ["ARPv6", "NDP (Neighbor Discovery Protocol)", "DHCPv6", "ICMPv6 solamente"],
    correcta: 1,
    explicacion: "NDP (Neighbor Discovery Protocol) reemplaza a ARP en IPv6. Usa mensajes ICMPv6 para descubrir vecinos, routers y realizar autoconfiguración."
  },
  {
    id: 59, tema: "Switching y VLANs",
    pregunta: "¿Qué es Inter-VLAN routing?",
    opciones: [
      "Routing dentro de una misma VLAN",
      "Comunicación entre dispositivos en diferentes VLANs usando un router o switch L3",
      "Un protocolo de spanning tree",
      "La configuración de puertos trunk"
    ],
    correcta: 1,
    explicacion: "Inter-VLAN routing permite comunicación entre VLANs diferentes. Se implementa con Router-on-a-Stick (subinterfaces) o switch de capa 3 con SVIs."
  },
  {
    id: 60, tema: "Fundamentos de Red",
    pregunta: "¿Qué tipo de medio transmite datos usando luz?",
    opciones: ["Cable de par trenzado (UTP)", "Cable coaxial", "Fibra óptica", "Wireless"],
    correcta: 2,
    explicacion: "La fibra óptica transmite datos como pulsos de luz. Ofrece mayor velocidad, menor latencia y es inmune a interferencias electromagnéticas."
  }
];

// ── FLASHCARDS ───────────────────────────────────────────
export const FLASHCARDS = [
  { id: 1, categoria: "Comandos IOS", frente: "show ip route", reverso: "Muestra la tabla de routing IP completa del router" },
  { id: 2, categoria: "Comandos IOS", frente: "show ip interface brief", reverso: "Muestra resumen de interfaces: nombre, IP, estado de línea y protocolo" },
  { id: 3, categoria: "Comandos IOS", frente: "show vlan brief", reverso: "Muestra todas las VLANs configuradas y los puertos asignados" },
  { id: 4, categoria: "Comandos IOS", frente: "show interfaces trunk", reverso: "Muestra los puertos configurados como trunk y las VLANs permitidas" },
  { id: 5, categoria: "Comandos IOS", frente: "show spanning-tree", reverso: "Muestra el estado de STP: root bridge, puertos y roles" },
  { id: 6, categoria: "Comandos IOS", frente: "show mac address-table", reverso: "Muestra la tabla CAM del switch con MACs aprendidas por puerto" },
  { id: 7, categoria: "Comandos IOS", frente: "show cdp neighbors", reverso: "Muestra dispositivos Cisco vecinos conectados directamente" },
  { id: 8, categoria: "Comandos IOS", frente: "copy running-config startup-config", reverso: "Guarda la configuración activa en NVRAM (persiste tras reinicio)" },
  { id: 9, categoria: "Comandos IOS", frente: "show ip ospf neighbor", reverso: "Muestra los vecinos OSPF establecidos y su estado" },
  { id: 10, categoria: "Comandos IOS", frente: "debug ip ospf events", reverso: "Activa debug de eventos OSPF en tiempo real (usar con precaución)" },
  { id: 11, categoria: "Protocolos", frente: "OSPF", reverso: "Open Shortest Path First. Link-state, usa algoritmo Dijkstra (SPF), métrica = costo, AD = 110" },
  { id: 12, categoria: "Protocolos", frente: "RIP", reverso: "Routing Information Protocol. Distance-vector, métrica = hop count (max 15), AD = 120, actualiza cada 30s" },
  { id: 13, categoria: "Protocolos", frente: "EIGRP", reverso: "Enhanced IGRP (Cisco). Hybrid protocol, métrica compuesta (BW+delay), AD = 90 (interno) / 170 (externo)" },
  { id: 14, categoria: "Protocolos", frente: "STP 802.1D", reverso: "Spanning Tree Protocol. Previene bucles bloqueando puertos. Converge en 30-50 segundos" },
  { id: 15, categoria: "Protocolos", frente: "RSTP 802.1W", reverso: "Rapid STP. Versión mejorada de STP, converge en ~1-2 segundos" },
  { id: 16, categoria: "Protocolos", frente: "VTP", reverso: "VLAN Trunking Protocol (Cisco). Propaga info de VLANs entre switches. Modos: Server, Client, Transparent" },
  { id: 17, categoria: "Protocolos", frente: "HSRP", reverso: "Hot Standby Router Protocol (Cisco). Proporciona gateway redundante. El router activo maneja el tráfico" },
  { id: 18, categoria: "Protocolos", frente: "VRRP", reverso: "Virtual Router Redundancy Protocol. Estándar abierto (similar a HSRP). AD virtual compartida entre routers" },
  { id: 19, categoria: "Conceptos", frente: "Distancia Administrativa", reverso: "Valor que indica confiabilidad de ruta. Connected=0, Static=1, EIGRP=90, OSPF=110, RIP=120" },
  { id: 20, categoria: "Conceptos", frente: "VLSM", reverso: "Variable Length Subnet Masking. Permite usar máscaras de diferente longitud en una misma red para optimizar IPs" },
  { id: 21, categoria: "Conceptos", frente: "NAT", reverso: "Network Address Translation. Traduce IPs privadas a públicas. Tipos: Static, Dynamic, PAT (overload)" },
  { id: 22, categoria: "Conceptos", frente: "PAT", reverso: "Port Address Translation (NAT overload). Múltiples IPs privadas comparten una IP pública usando diferentes puertos" },
  { id: 23, categoria: "Conceptos", frente: "ACL Estándar", reverso: "Filtra tráfico solo por IP origen. Numeración 1-99 y 1300-1999. Debe aplicarse lo más cerca del destino" },
  { id: 24, categoria: "Conceptos", frente: "ACL Extendida", reverso: "Filtra por IP origen/destino, protocolo y puerto. Numeración 100-199 y 2000-2699. Aplicar cerca del origen" },
  { id: 25, categoria: "Conceptos", frente: "SVI", reverso: "Switch Virtual Interface. Interfaz lógica en un switch L3 que representa una VLAN y permite routing inter-VLAN" },
  { id: 26, categoria: "Puertos", frente: "HTTP", reverso: "Puerto TCP 80" },
  { id: 27, categoria: "Puertos", frente: "HTTPS", reverso: "Puerto TCP 443" },
  { id: 28, categoria: "Puertos", frente: "SSH", reverso: "Puerto TCP 22" },
  { id: 29, categoria: "Puertos", frente: "Telnet", reverso: "Puerto TCP 23 (no cifrado, no usar en producción)" },
  { id: 30, categoria: "Puertos", frente: "DNS", reverso: "Puerto UDP/TCP 53" },
  { id: 31, categoria: "Puertos", frente: "DHCP", reverso: "UDP 67 (servidor) y UDP 68 (cliente)" },
  { id: 32, categoria: "Puertos", frente: "FTP", reverso: "TCP 21 (control) y TCP 20 (datos en modo activo)" },
  { id: 33, categoria: "Puertos", frente: "SNMP", reverso: "UDP 161 (queries) y UDP 162 (traps)" },
  { id: 34, categoria: "Puertos", frente: "NTP", reverso: "UDP 123" },
  { id: 35, categoria: "Puertos", frente: "SMTP", reverso: "TCP 25 (envío de correo)" },
];

// ── EJERCICIOS DE SUBNETTING ─────────────────────────────
export const EJERCICIOS_SUBNET = [
  { red: "192.168.1.0", prefijo: 24, respuestas: { mascara: "255.255.255.0", hosts: 254, broadcast: "192.168.1.255", primera: "192.168.1.1", ultima: "192.168.1.254" } },
  { red: "192.168.1.0", prefijo: 25, respuestas: { mascara: "255.255.255.128", hosts: 126, broadcast: "192.168.1.127", primera: "192.168.1.1", ultima: "192.168.1.126" } },
  { red: "10.0.0.0", prefijo: 8, respuestas: { mascara: "255.0.0.0", hosts: 16777214, broadcast: "10.255.255.255", primera: "10.0.0.1", ultima: "10.255.255.254" } },
  { red: "172.16.0.0", prefijo: 16, respuestas: { mascara: "255.255.0.0", hosts: 65534, broadcast: "172.16.255.255", primera: "172.16.0.1", ultima: "172.16.255.254" } },
  { red: "192.168.10.0", prefijo: 26, respuestas: { mascara: "255.255.255.192", hosts: 62, broadcast: "192.168.10.63", primera: "192.168.10.1", ultima: "192.168.10.62" } },
  { red: "192.168.10.0", prefijo: 27, respuestas: { mascara: "255.255.255.224", hosts: 30, broadcast: "192.168.10.31", primera: "192.168.10.1", ultima: "192.168.10.30" } },
  { red: "192.168.10.0", prefijo: 28, respuestas: { mascara: "255.255.255.240", hosts: 14, broadcast: "192.168.10.15", primera: "192.168.10.1", ultima: "192.168.10.14" } },
  { red: "192.168.10.0", prefijo: 29, respuestas: { mascara: "255.255.255.248", hosts: 6, broadcast: "192.168.10.7", primera: "192.168.10.1", ultima: "192.168.10.6" } },
  { red: "192.168.10.0", prefijo: 30, respuestas: { mascara: "255.255.255.252", hosts: 2, broadcast: "192.168.10.3", primera: "192.168.10.1", ultima: "192.168.10.2" } },
  { red: "10.10.0.0", prefijo: 22, respuestas: { mascara: "255.255.252.0", hosts: 1022, broadcast: "10.10.3.255", primera: "10.10.0.1", ultima: "10.10.3.254" } },
];

export default { PREGUNTAS_CCNA, FLASHCARDS, EJERCICIOS_SUBNET };
