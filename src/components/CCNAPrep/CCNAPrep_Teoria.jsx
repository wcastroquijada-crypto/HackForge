import { useState } from "react";

// ─── IDIOMA ────────────────────────────────────────────────
const T = {
  es: {
    titulo: "CCNA Prep Zone",
    subtitulo: "Teoría + Práctica para el examen CCNA 200-301",
    elegirIdioma: "Elige tu idioma de estudio",
    modulos: "Módulos disponibles",
    teoria: "Teoría",
    teoriaDesc: "Conceptos explicados con ejemplos reales antes de practicar.",
    banco: "Banco de Preguntas",
    bancoDesc: "60 preguntas organizadas por tema. Practica a tu ritmo.",
    flash: "Flashcards",
    flashDesc: "35 tarjetas con comandos, protocolos y conceptos clave.",
    subnet: "Subnetting",
    subnetDesc: "Practica cálculos de subredes con ejercicios aleatorios.",
    simulacro: "Simulacro de Examen",
    simulacroDesc: "50 preguntas en 60 minutos. Resultado por tema.",
    volver: "← Volver",
    temas: "Temas",
    leer: "Estudiar este tema →",
    conceptoClave: "Concepto clave",
    ejemplo: "Ejemplo",
    recuerda: "💡 Recuerda",
    proximamente: "🚧 Próximamente",
    cambiarIdioma: "Cambiar idioma",
  },
  en: {
    titulo: "CCNA Prep Zone",
    subtitulo: "Theory + Practice for the CCNA 200-301 exam",
    elegirIdioma: "Choose your study language",
    modulos: "Available modules",
    teoria: "Theory",
    teoriaDesc: "Concepts explained with real examples before practicing.",
    banco: "Question Bank",
    bancoDesc: "60 questions organized by topic. Practice at your own pace.",
    flash: "Flashcards",
    flashDesc: "35 cards with commands, protocols and key concepts.",
    subnet: "Subnetting",
    subnetDesc: "Practice subnet calculations with random exercises.",
    simulacro: "Exam Simulator",
    simulacroDesc: "50 questions in 60 minutes. Results by topic.",
    volver: "← Back",
    temas: "Topics",
    leer: "Study this topic →",
    conceptoClave: "Key concept",
    ejemplo: "Example",
    recuerda: "💡 Remember",
    proximamente: "🚧 Coming soon",
    cambiarIdioma: "Change language",
  }
};

// ─── CONTENIDO DE TEORÍA ────────────────────────────────────
const TEORIA = {
  es: [
    {
      id: "osi",
      titulo: "Modelo OSI — 7 Capas",
      emoji: "📚",
      color: "#3b82f6",
      resumen: "El modelo OSI divide la comunicación de red en 7 capas, cada una con una función específica.",
      capas: [
        { num: 7, nombre: "Aplicación", que: "Interfaz con el usuario", ejemplo: "HTTP, FTP, DNS, SMTP" },
        { num: 6, nombre: "Presentación", que: "Formato y cifrado de datos", ejemplo: "SSL/TLS, JPEG, ASCII" },
        { num: 5, nombre: "Sesión", que: "Gestiona sesiones entre apps", ejemplo: "NetBIOS, RPC" },
        { num: 4, nombre: "Transporte", que: "Entrega confiable de datos", ejemplo: "TCP, UDP" },
        { num: 3, nombre: "Red", que: "Enrutamiento entre redes", ejemplo: "IP, ICMP, routers" },
        { num: 2, nombre: "Enlace de datos", que: "Comunicación entre dispositivos locales", ejemplo: "Ethernet, MAC, switches" },
        { num: 1, nombre: "Física", que: "Transmisión de bits por el medio", ejemplo: "Cables, Wi-Fi, señales" },
      ],
      recuerda: "Memoriza las capas de arriba a abajo: Aplicación, Presentación, Sesión, Transporte, Red, Enlace, Física. Truco: 'All People Seem To Need Data Processing'",
    },
    {
      id: "tcpip",
      titulo: "Modelo TCP/IP — 4 Capas",
      emoji: "🌐",
      color: "#8b5cf6",
      resumen: "El modelo TCP/IP es el modelo real usado en Internet. Tiene 4 capas que agrupan las 7 del OSI.",
      capas: [
        { num: 4, nombre: "Aplicación", que: "Equivale a capas 5,6,7 del OSI", ejemplo: "HTTP, DNS, FTP, SMTP" },
        { num: 3, nombre: "Transporte", que: "Entrega de datos entre hosts", ejemplo: "TCP (confiable), UDP (rápido)" },
        { num: 2, nombre: "Internet", que: "Enrutamiento entre redes", ejemplo: "IPv4, IPv6, ICMP" },
        { num: 1, nombre: "Acceso a red", que: "Equivale a capas 1,2 del OSI", ejemplo: "Ethernet, Wi-Fi, ARP" },
      ],
      recuerda: "TCP garantiza entrega (con confirmación). UDP es más rápido pero sin garantía. En streaming usas UDP; en descarga de archivos usas TCP.",
    },
    {
      id: "ipv4",
      titulo: "Direccionamiento IPv4",
      emoji: "🔢",
      color: "#f59e0b",
      resumen: "IPv4 usa direcciones de 32 bits divididas en 4 octetos. Existen clases y rangos privados que debes conocer.",
      capas: [
        { num: null, nombre: "Clase A", que: "Redes grandes (1-126)", ejemplo: "10.0.0.0 — 10.255.255.255 (privada)" },
        { num: null, nombre: "Clase B", que: "Redes medianas (128-191)", ejemplo: "172.16.0.0 — 172.31.255.255 (privada)" },
        { num: null, nombre: "Clase C", que: "Redes pequeñas (192-223)", ejemplo: "192.168.0.0 — 192.168.255.255 (privada)" },
        { num: null, nombre: "Loopback", que: "Dirección local del host", ejemplo: "127.0.0.1 — siempre tu propia máquina" },
        { num: null, nombre: "APIPA", que: "Auto-asignada sin DHCP", ejemplo: "169.254.0.0/16" },
      ],
      recuerda: "Las IPs privadas NO se enrutan en Internet. Para salir a Internet se usa NAT (Network Address Translation) que convierte IP privada → IP pública.",
    },
    {
      id: "subnetting",
      titulo: "Subnetting — VLSM",
      emoji: "🧮",
      color: "#22c55e",
      resumen: "El subnetting divide una red en subredes más pequeñas. VLSM permite usar máscaras de longitud variable para no desperdiciar IPs.",
      capas: [
        { num: null, nombre: "/24 → 254 hosts", que: "Máscara: 255.255.255.0", ejemplo: "192.168.1.0/24" },
        { num: null, nombre: "/25 → 126 hosts", que: "Máscara: 255.255.255.128", ejemplo: "192.168.1.0/25 y 192.168.1.128/25" },
        { num: null, nombre: "/26 → 62 hosts", que: "Máscara: 255.255.255.192", ejemplo: "4 subredes de 64 IPs" },
        { num: null, nombre: "/30 → 2 hosts", que: "Máscara: 255.255.255.252", ejemplo: "Ideal para enlaces punto a punto" },
      ],
      recuerda: "Fórmula hosts: 2^n - 2 (donde n = bits de host). Fórmula subredes: 2^s (donde s = bits prestados). El -2 es por la dirección de red y broadcast.",
    },
    {
      id: "routing",
      titulo: "Enrutamiento — Protocolos",
      emoji: "🔀",
      color: "#ef4444",
      resumen: "Los protocolos de enrutamiento permiten a los routers aprender rutas automáticamente y elegir el mejor camino.",
      capas: [
        { num: null, nombre: "Ruta estática", que: "Configurada manualmente", ejemplo: "ip route 192.168.2.0 255.255.255.0 10.0.0.2" },
        { num: null, nombre: "RIP v2", que: "Distance vector, métrica = saltos", ejemplo: "Máximo 15 saltos, convergencia lenta" },
        { num: null, nombre: "OSPF", que: "Link state, métrica = costo", ejemplo: "Costo = 100Mbps / ancho de banda" },
        { num: null, nombre: "EIGRP", que: "Híbrido Cisco, métrica compuesta", ejemplo: "Ancho de banda + delay + confiabilidad" },
        { num: null, nombre: "BGP", que: "Enrutamiento entre ISPs (Internet)", ejemplo: "Protocolo de Internet global" },
      ],
      recuerda: "AD (Administrative Distance): Estática=1, OSPF=110, RIP=120, EIGRP=90. Menor AD = más confiable. El router siempre elige la ruta con menor AD.",
    },
    {
      id: "vlans",
      titulo: "VLANs y Switching",
      emoji: "🔌",
      color: "#06b6d4",
      resumen: "Las VLANs segmentan una red física en múltiples redes lógicas. Los switches administrables permiten crear y gestionar VLANs.",
      capas: [
        { num: null, nombre: "Puerto Access", que: "Pertenece a una sola VLAN", ejemplo: "switchport mode access / switchport access vlan 10" },
        { num: null, nombre: "Puerto Trunk", que: "Transporta múltiples VLANs", ejemplo: "switchport mode trunk / encapsulation dot1q" },
        { num: null, nombre: "VLAN nativa", que: "Tráfico sin etiquetar en trunk", ejemplo: "Por defecto VLAN 1 (cambiar por seguridad)" },
        { num: null, nombre: "Inter-VLAN routing", que: "Router-on-a-stick", ejemplo: "Subinterfaces: int g0/0.10 / encapsulation dot1Q 10" },
        { num: null, nombre: "STP", que: "Evita bucles en capa 2", ejemplo: "Spanning Tree Protocol — elige root bridge" },
      ],
      recuerda: "Router-on-a-Stick: Un router con subinterfaces puede enrutar entre VLANs. Cada subinterfaz = una VLAN. El trunk va del switch al router.",
    },
    {
      id: "acl",
      titulo: "ACLs — Listas de Control de Acceso",
      emoji: "🛡️",
      color: "#f97316",
      resumen: "Las ACLs filtran tráfico en routers. Pueden permitir o denegar paquetes según IP origen, destino, protocolo o puerto.",
      capas: [
        { num: null, nombre: "ACL Estándar (1-99)", que: "Filtra solo por IP origen", ejemplo: "access-list 10 permit 192.168.1.0 0.0.0.255" },
        { num: null, nombre: "ACL Extendida (100-199)", que: "Filtra por IP, protocolo, puerto", ejemplo: "access-list 110 permit tcp 192.168.1.0 0.0.0.255 any eq 80" },
        { num: null, nombre: "Aplicar en interfaz", que: "IN = entrante, OUT = saliente", ejemplo: "ip access-group 10 in" },
        { num: null, nombre: "Wildcard mask", que: "Inverso de la máscara de subred", ejemplo: "/24 → 0.0.0.255 / /25 → 0.0.0.127" },
      ],
      recuerda: "ACL estándar: ponla cerca del DESTINO. ACL extendida: ponla cerca del ORIGEN. Al final de toda ACL hay un 'deny any' implícito — si no permites nada, bloqueas todo.",
    },
    {
      id: "dhcp_dns",
      titulo: "DHCP y DNS",
      emoji: "📡",
      color: "#84cc16",
      resumen: "DHCP asigna IPs automáticamente. DNS resuelve nombres de dominio a IPs. Ambos son esenciales en cualquier red.",
      capas: [
        { num: null, nombre: "DHCP proceso DORA", que: "Discover → Offer → Request → ACK", ejemplo: "El cliente pide IP, el servidor ofrece, cliente acepta, servidor confirma" },
        { num: null, nombre: "DHCP en Cisco", que: "Configurar pool de IPs", ejemplo: "ip dhcp pool LAN / network 192.168.1.0 255.255.255.0 / default-router 192.168.1.1" },
        { num: null, nombre: "DNS resolución", que: "Nombre → IP", ejemplo: "google.com → 142.250.80.46" },
        { num: null, nombre: "Puertos clave", que: "DHCP: UDP 67/68, DNS: UDP 53", ejemplo: "DNS también usa TCP 53 para transferencias de zona" },
      ],
      recuerda: "DHCP usa broadcast para descubrir el servidor. Por eso si el servidor está en otra red, necesitas un 'DHCP relay agent' (ip helper-address) en el router.",
    },
  ],
  en: [
    {
      id: "osi",
      titulo: "OSI Model — 7 Layers",
      emoji: "📚",
      color: "#3b82f6",
      resumen: "The OSI model divides network communication into 7 layers, each with a specific function.",
      capas: [
        { num: 7, nombre: "Application", que: "User interface", ejemplo: "HTTP, FTP, DNS, SMTP" },
        { num: 6, nombre: "Presentation", que: "Data format and encryption", ejemplo: "SSL/TLS, JPEG, ASCII" },
        { num: 5, nombre: "Session", que: "Manages sessions between apps", ejemplo: "NetBIOS, RPC" },
        { num: 4, nombre: "Transport", que: "Reliable data delivery", ejemplo: "TCP, UDP" },
        { num: 3, nombre: "Network", que: "Routing between networks", ejemplo: "IP, ICMP, routers" },
        { num: 2, nombre: "Data Link", que: "Communication between local devices", ejemplo: "Ethernet, MAC, switches" },
        { num: 1, nombre: "Physical", que: "Bit transmission over the medium", ejemplo: "Cables, Wi-Fi, signals" },
      ],
      recuerda: "Memorize layers top to bottom: Application, Presentation, Session, Transport, Network, Data Link, Physical. Trick: 'All People Seem To Need Data Processing'",
    },
    {
      id: "tcpip",
      titulo: "TCP/IP Model — 4 Layers",
      emoji: "🌐",
      color: "#8b5cf6",
      resumen: "The TCP/IP model is the real model used on the Internet. It has 4 layers that group the 7 OSI layers.",
      capas: [
        { num: 4, nombre: "Application", que: "Equivalent to OSI layers 5,6,7", ejemplo: "HTTP, DNS, FTP, SMTP" },
        { num: 3, nombre: "Transport", que: "Data delivery between hosts", ejemplo: "TCP (reliable), UDP (fast)" },
        { num: 2, nombre: "Internet", que: "Routing between networks", ejemplo: "IPv4, IPv6, ICMP" },
        { num: 1, nombre: "Network Access", que: "Equivalent to OSI layers 1,2", ejemplo: "Ethernet, Wi-Fi, ARP" },
      ],
      recuerda: "TCP guarantees delivery (with acknowledgment). UDP is faster but without guarantee. Streaming uses UDP; file downloads use TCP.",
    },
    {
      id: "ipv4",
      titulo: "IPv4 Addressing",
      emoji: "🔢",
      color: "#f59e0b",
      resumen: "IPv4 uses 32-bit addresses divided into 4 octets. There are classes and private ranges you must know.",
      capas: [
        { num: null, nombre: "Class A", que: "Large networks (1-126)", ejemplo: "10.0.0.0 — 10.255.255.255 (private)" },
        { num: null, nombre: "Class B", que: "Medium networks (128-191)", ejemplo: "172.16.0.0 — 172.31.255.255 (private)" },
        { num: null, nombre: "Class C", que: "Small networks (192-223)", ejemplo: "192.168.0.0 — 192.168.255.255 (private)" },
        { num: null, nombre: "Loopback", que: "Local host address", ejemplo: "127.0.0.1 — always your own machine" },
        { num: null, nombre: "APIPA", que: "Auto-assigned without DHCP", ejemplo: "169.254.0.0/16" },
      ],
      recuerda: "Private IPs are NOT routed on the Internet. NAT (Network Address Translation) converts private IP → public IP to access the Internet.",
    },
    {
      id: "subnetting",
      titulo: "Subnetting — VLSM",
      emoji: "🧮",
      color: "#22c55e",
      resumen: "Subnetting divides a network into smaller subnets. VLSM allows variable length subnet masks to avoid wasting IPs.",
      capas: [
        { num: null, nombre: "/24 → 254 hosts", que: "Mask: 255.255.255.0", ejemplo: "192.168.1.0/24" },
        { num: null, nombre: "/25 → 126 hosts", que: "Mask: 255.255.255.128", ejemplo: "192.168.1.0/25 and 192.168.1.128/25" },
        { num: null, nombre: "/26 → 62 hosts", que: "Mask: 255.255.255.192", ejemplo: "4 subnets of 64 IPs" },
        { num: null, nombre: "/30 → 2 hosts", que: "Mask: 255.255.255.252", ejemplo: "Ideal for point-to-point links" },
      ],
      recuerda: "Host formula: 2^n - 2 (where n = host bits). Subnet formula: 2^s (where s = borrowed bits). The -2 accounts for network address and broadcast.",
    },
    {
      id: "routing",
      titulo: "Routing — Protocols",
      emoji: "🔀",
      color: "#ef4444",
      resumen: "Routing protocols allow routers to automatically learn routes and choose the best path.",
      capas: [
        { num: null, nombre: "Static route", que: "Manually configured", ejemplo: "ip route 192.168.2.0 255.255.255.0 10.0.0.2" },
        { num: null, nombre: "RIP v2", que: "Distance vector, metric = hops", ejemplo: "Max 15 hops, slow convergence" },
        { num: null, nombre: "OSPF", que: "Link state, metric = cost", ejemplo: "Cost = 100Mbps / bandwidth" },
        { num: null, nombre: "EIGRP", que: "Cisco hybrid, composite metric", ejemplo: "Bandwidth + delay + reliability" },
        { num: null, nombre: "BGP", que: "Routing between ISPs (Internet)", ejemplo: "Global Internet protocol" },
      ],
      recuerda: "AD (Administrative Distance): Static=1, OSPF=110, RIP=120, EIGRP=90. Lower AD = more trusted. The router always chooses the route with lower AD.",
    },
    {
      id: "vlans",
      titulo: "VLANs and Switching",
      emoji: "🔌",
      color: "#06b6d4",
      resumen: "VLANs segment a physical network into multiple logical networks. Managed switches allow creating and managing VLANs.",
      capas: [
        { num: null, nombre: "Access port", que: "Belongs to one VLAN only", ejemplo: "switchport mode access / switchport access vlan 10" },
        { num: null, nombre: "Trunk port", que: "Carries multiple VLANs", ejemplo: "switchport mode trunk / encapsulation dot1q" },
        { num: null, nombre: "Native VLAN", que: "Untagged traffic on trunk", ejemplo: "Default is VLAN 1 (change for security)" },
        { num: null, nombre: "Inter-VLAN routing", que: "Router-on-a-stick", ejemplo: "Subinterfaces: int g0/0.10 / encapsulation dot1Q 10" },
        { num: null, nombre: "STP", que: "Prevents Layer 2 loops", ejemplo: "Spanning Tree Protocol — elects root bridge" },
      ],
      recuerda: "Router-on-a-Stick: One router with subinterfaces can route between VLANs. Each subinterface = one VLAN. The trunk goes from switch to router.",
    },
    {
      id: "acl",
      titulo: "ACLs — Access Control Lists",
      emoji: "🛡️",
      color: "#f97316",
      resumen: "ACLs filter traffic on routers. They can permit or deny packets based on source IP, destination, protocol or port.",
      capas: [
        { num: null, nombre: "Standard ACL (1-99)", que: "Filters by source IP only", ejemplo: "access-list 10 permit 192.168.1.0 0.0.0.255" },
        { num: null, nombre: "Extended ACL (100-199)", que: "Filters by IP, protocol, port", ejemplo: "access-list 110 permit tcp 192.168.1.0 0.0.0.255 any eq 80" },
        { num: null, nombre: "Apply on interface", que: "IN = inbound, OUT = outbound", ejemplo: "ip access-group 10 in" },
        { num: null, nombre: "Wildcard mask", que: "Inverse of subnet mask", ejemplo: "/24 → 0.0.0.255 / /25 → 0.0.0.127" },
      ],
      recuerda: "Standard ACL: place it near the DESTINATION. Extended ACL: place it near the SOURCE. Every ACL has an implicit 'deny any' at the end.",
    },
    {
      id: "dhcp_dns",
      titulo: "DHCP and DNS",
      emoji: "📡",
      color: "#84cc16",
      resumen: "DHCP assigns IPs automatically. DNS resolves domain names to IPs. Both are essential in any network.",
      capas: [
        { num: null, nombre: "DHCP DORA process", que: "Discover → Offer → Request → ACK", ejemplo: "Client requests IP, server offers, client accepts, server confirms" },
        { num: null, nombre: "DHCP on Cisco", que: "Configure IP pool", ejemplo: "ip dhcp pool LAN / network 192.168.1.0 255.255.255.0 / default-router 192.168.1.1" },
        { num: null, nombre: "DNS resolution", que: "Name → IP", ejemplo: "google.com → 142.250.80.46" },
        { num: null, nombre: "Key ports", que: "DHCP: UDP 67/68, DNS: UDP 53", ejemplo: "DNS also uses TCP 53 for zone transfers" },
      ],
      recuerda: "DHCP uses broadcast to discover the server. If the server is on another network, you need a 'DHCP relay agent' (ip helper-address) on the router.",
    },
  ]
};

// ─── Componente Teoría ──────────────────────────────────────
function Teoria({ lang, onBack }) {
  const t = T[lang];
  const temas = TEORIA[lang];
  const [temaActivo, setTemaActivo] = useState(null);

  if (temaActivo) {
    const tema = temas.find(t => t.id === temaActivo);
    return (
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 0 40px" }}>
        <button onClick={() => setTemaActivo(null)} style={{ background: "transparent", border: "1px solid #1e1e2e", color: "#888", borderRadius: 6, padding: "7px 14px", fontSize: 12, cursor: "pointer", marginBottom: 24 }}>
          ← {t.temas}
        </button>
        <div style={{ background: "#0a0a14", border: `2px solid ${tema.color}44`, borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>{tema.emoji}</div>
          <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{tema.titulo}</h2>
          <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.7 }}>{tema.resumen}</p>
        </div>

        <div style={{ background: "#0a0a14", border: "1px solid #1e1e2e", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ padding: "12px 20px", borderBottom: "1px solid #1e1e2e", background: "#080810" }}>
            <span style={{ color: "#888", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {t.conceptoClave}
            </span>
          </div>
          {tema.capas.map((capa, i) => (
            <div key={i} style={{ padding: "14px 20px", borderBottom: i < tema.capas.length - 1 ? "1px solid #0f0f1a" : "none", display: "flex", gap: 16, alignItems: "flex-start" }}>
              {capa.num !== null && (
                <div style={{ minWidth: 28, height: 28, borderRadius: "50%", background: tema.color + "22", border: `1px solid ${tema.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: tema.color, fontWeight: 700 }}>
                  {capa.num}
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{capa.nombre}</div>
                <div style={{ color: "#888", fontSize: 12, marginBottom: 4 }}>{capa.que}</div>
                <code style={{ background: "#050508", border: "1px solid #1e1e2e", color: tema.color, padding: "3px 8px", borderRadius: 4, fontSize: 11, fontFamily: "monospace" }}>
                  {capa.ejemplo}
                </code>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0a1628", border: "1px solid #1e3a5f", borderRadius: 12, padding: 18 }}>
          <div style={{ color: "#3b82f6", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>{t.recuerda}</div>
          <p style={{ color: "#93c5fd", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{tema.recuerda}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 0 40px" }}>
      <button onClick={onBack} style={{ background: "transparent", border: "1px solid #1e1e2e", color: "#888", borderRadius: 6, padding: "7px 14px", fontSize: 12, cursor: "pointer", marginBottom: 24 }}>
        {t.volver}
      </button>
      <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 800, marginBottom: 6 }}>📚 {t.teoria}</h2>
      <p style={{ color: "#555", fontSize: 13, marginBottom: 24 }}>{t.teoriaDesc}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {temas.map(tema => (
          <div key={tema.id} onClick={() => setTemaActivo(tema.id)}
            style={{ background: "#0a0a14", border: `1px solid #1e1e2e`, borderRadius: 10, padding: 18, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = tema.color; e.currentTarget.style.background = tema.color + "0a"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; e.currentTarget.style.background = "#0a0a14"; }}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>{tema.emoji}</div>
            <h3 style={{ color: "#fff", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{tema.titulo}</h3>
            <p style={{ color: "#666", fontSize: 11, lineHeight: 1.5, marginBottom: 12 }}>{tema.resumen.slice(0, 80)}...</p>
            <span style={{ color: tema.color, fontSize: 11, fontWeight: 600 }}>{t.leer}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Selector de idioma ─────────────────────────────────────
function SelectorIdioma({ onSelect }) {
  return (
    <div style={{ minHeight: "100vh", background: "#080810", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ textAlign: "center", maxWidth: 400, padding: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📡</div>
        <div style={{ color: "#00d4ff", fontSize: 11, letterSpacing: 6, marginBottom: 8 }}>◈ HACKFORGE</div>
        <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>CCNA Prep Zone</h1>
        <p style={{ color: "#555", fontSize: 13, marginBottom: 32 }}>Choose your study language / Elige tu idioma</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          {[
            { code: "es", flag: "🇨🇱", label: "Español", sub: "Contenido en español" },
            { code: "en", flag: "🇺🇸", label: "English", sub: "Content in English" },
          ].map(l => (
            <button key={l.code} onClick={() => onSelect(l.code)}
              style={{ background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: 12, padding: "20px 28px", cursor: "pointer", transition: "all 0.2s", textAlign: "center" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00d4ff"; e.currentTarget.style.background = "#00d4ff11"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; e.currentTarget.style.background = "#0f0f1a"; }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{l.flag}</div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{l.label}</div>
              <div style={{ color: "#555", fontSize: 11 }}>{l.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ────────────────────────────────────────────
export default function CCNAPrepWrapper() {
  const [lang, setLang] = useState(null);
  const [vista, setVista] = useState("menu");

  if (!lang) return <SelectorIdioma onSelect={setLang} />;

  const t = T[lang];

  const SECCIONES = [
    { id: "teoria", icon: "📚", titulo: t.teoria, desc: t.teoriaDesc, color: "#3b82f6" },
    { id: "banco", icon: "📝", titulo: t.banco, desc: t.bancoDesc, color: "#8b5cf6" },
    { id: "flash", icon: "🃏", titulo: t.flash, desc: t.flashDesc, color: "#f59e0b" },
    { id: "subnet", icon: "🧮", titulo: t.subnet, desc: t.subnetDesc, color: "#22c55e" },
    { id: "simulacro", icon: "📊", titulo: t.simulacro, desc: t.simulacroDesc, color: "#ef4444" },
  ];

  if (vista === "teoria") return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "#fff", fontFamily: "'Inter', sans-serif", padding: "24px 32px" }}>
      <Teoria lang={lang} onBack={() => setVista("menu")} />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ borderBottom: "1px solid #1e1e2e", padding: "24px 32px 20px", background: "linear-gradient(180deg, #0d0d1f 0%, #080810 100%)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 22 }}>📡</span>
              <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, background: "linear-gradient(90deg,#fff,#888)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {t.titulo}
              </h1>
            </div>
            <p style={{ color: "#444", fontSize: 12, margin: 0 }}>{t.subtitulo}</p>
          </div>
          <button onClick={() => setLang(null)}
            style={{ background: "#0f0f1a", border: "1px solid #1e1e2e", color: "#888", borderRadius: 8, padding: "7px 14px", fontSize: 11, cursor: "pointer" }}>
            🌐 {t.cambiarIdioma}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 32px" }}>
        <p style={{ color: "#555", fontSize: 12, marginBottom: 20 }}>{t.modulos}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
          {SECCIONES.map(s => (
            <div key={s.id} onClick={() => setVista(s.id)}
              style={{ background: "#0a0a14", border: "1px solid #1e1e2e", borderRadius: 12, padding: 22, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.background = s.color + "0a"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e2e"; e.currentTarget.style.background = "#0a0a14"; }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.titulo}</h3>
              <p style={{ color: "#666", fontSize: 12, lineHeight: 1.6, marginBottom: 14 }}>{s.desc}</p>
              <span style={{ color: s.color, fontSize: 11, fontWeight: 600 }}>{t.leer}</span>
            </div>
          ))}
        </div>

        {(vista === "banco" || vista === "flash" || vista === "subnet" || vista === "simulacro") && (
          <div style={{ marginTop: 24, background: "#0a0a14", border: "1px solid #1e1e2e", borderRadius: 12, padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🚧</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{t.proximamente}</div>
            <p style={{ color: "#555", fontSize: 13 }}>Este módulo usa el CCNAPrep original — intégralo aquí.</p>
            <button onClick={() => setVista("menu")} style={{ marginTop: 16, background: "#0f0f1a", border: "1px solid #1e1e2e", color: "#888", borderRadius: 8, padding: "9px 18px", fontSize: 12, cursor: "pointer" }}>
              {t.volver}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
