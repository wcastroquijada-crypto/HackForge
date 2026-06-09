import { useState, useEffect } from "react";
import { C } from "../../data/labs";
import { PREGUNTAS_CCNA, FLASHCARDS, EJERCICIOS_SUBNET } from "../../data/ccna_data";

// ─── SONIDOS ────────────────────────────────────────────────
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    if (type === "correct") {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(); osc.stop(ctx.currentTime + 0.5);
    } else if (type === "wrong") {
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.setValueAtTime(150, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(); osc.stop(ctx.currentTime + 0.4);
    } else if (type === "click") {
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start(); osc.stop(ctx.currentTime + 0.08);
    } else if (type === "flip") {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(); osc.stop(ctx.currentTime + 0.2);
    }
  } catch {}
}

const CSS = `
  .ccna-btn{cursor:pointer;border:none;font-family:'Inter',sans-serif;font-weight:bold;transition:all .15s;border-radius:6px}
  .ccna-btn:hover:not(:disabled){filter:brightness(1.15);transform:translateY(-1px)}
  .ccna-btn:disabled{opacity:.45;cursor:not-allowed}
  .ccna-opt{width:100%;text-align:left;padding:12px 16px;margin:6px 0;border-radius:6px;cursor:pointer;font-family:'Inter',sans-serif;font-size:13px;border:1px solid #1e2a3a;background:#0d1117;color:#8b949e;transition:all .13s}
  .ccna-opt:hover:not(:disabled){border-color:#00d4ff44;background:#111827;color:#c9d1d9}
  .ccna-input{background:#050810;border:1px solid #1e2a3a;color:#c9d1d9;padding:10px 14px;border-radius:6px;font-family:'Inter',sans-serif;font-size:13px;outline:none;width:100%}
  .ccna-input:focus{border-color:#00d4ff44}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  .fade-in{animation:fadeUp 0.3s ease forwards}
`;

const TEMAS = [...new Set(PREGUNTAS_CCNA.map(p => p.tema))];
const COLOR = "#00d4ff";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── IDIOMAS ────────────────────────────────────────────────
const T = {
  es: {
    titulo: "CCNA Prep Zone", subtitulo: "Teoría + Práctica para el examen CCNA 200-301",
    elegirIdioma: "Elige tu idioma de estudio", modulos: "Módulos disponibles",
    teoria: "Teoría", teoriaDesc: "Conceptos explicados con ejemplos reales antes de practicar.",
    banco: "Banco de Preguntas", bancoDesc: "60 preguntas organizadas por tema. Practica a tu ritmo.",
    flash: "Flashcards", flashDesc: "35 tarjetas con comandos, protocolos y conceptos clave.",
    subnet: "Subnetting", subnetDesc: "Practica cálculos de subredes con ejercicios aleatorios.",
    simulacro: "Simulacro de Examen", simulacroDesc: "50 preguntas en 60 minutos. Resultado por tema.",
    volver: "← Volver", temas: "Temas", leer: "Estudiar →",
    conceptoClave: "Concepto clave", recuerda: "💡 Recuerda", cambiarIdioma: "Cambiar idioma",
  },
  en: {
    titulo: "CCNA Prep Zone", subtitulo: "Theory + Practice for the CCNA 200-301 exam",
    elegirIdioma: "Choose your study language", modulos: "Available modules",
    teoria: "Theory", teoriaDesc: "Concepts explained with real examples before practicing.",
    banco: "Question Bank", bancoDesc: "60 questions organized by topic. Practice at your own pace.",
    flash: "Flashcards", flashDesc: "35 cards with commands, protocols and key concepts.",
    subnet: "Subnetting", subnetDesc: "Practice subnet calculations with random exercises.",
    simulacro: "Exam Simulator", simulacroDesc: "50 questions in 60 minutes. Results by topic.",
    volver: "← Back", temas: "Topics", leer: "Study →",
    conceptoClave: "Key concept", recuerda: "💡 Remember", cambiarIdioma: "Change language",
  }
};

// ─── CONTENIDO TEORÍA ───────────────────────────────────────
const TEORIA = {
  es: [
    { id:"osi", titulo:"Modelo OSI — 7 Capas", emoji:"📚", color:"#3b82f6",
      resumen:"El modelo OSI divide la comunicación de red en 7 capas, cada una con una función específica.",
      capas:[
        {num:7,nombre:"Aplicación",que:"Interfaz con el usuario",ejemplo:"HTTP, FTP, DNS, SMTP"},
        {num:6,nombre:"Presentación",que:"Formato y cifrado de datos",ejemplo:"SSL/TLS, JPEG, ASCII"},
        {num:5,nombre:"Sesión",que:"Gestiona sesiones entre apps",ejemplo:"NetBIOS, RPC"},
        {num:4,nombre:"Transporte",que:"Entrega confiable de datos",ejemplo:"TCP, UDP"},
        {num:3,nombre:"Red",que:"Enrutamiento entre redes",ejemplo:"IP, ICMP, routers"},
        {num:2,nombre:"Enlace de datos",que:"Comunicación entre dispositivos locales",ejemplo:"Ethernet, MAC, switches"},
        {num:1,nombre:"Física",que:"Transmisión de bits por el medio",ejemplo:"Cables, Wi-Fi, señales"},
      ],
      recuerda:"Truco para memorizar: 'All People Seem To Need Data Processing' (Application, Presentation, Session, Transport, Network, Data Link, Physical)"
    },
    { id:"tcpip", titulo:"Modelo TCP/IP — 4 Capas", emoji:"🌐", color:"#8b5cf6",
      resumen:"El modelo TCP/IP es el modelo real usado en Internet. 4 capas que agrupan las 7 del OSI.",
      capas:[
        {num:4,nombre:"Aplicación",que:"Equivale a capas 5,6,7 del OSI",ejemplo:"HTTP, DNS, FTP, SMTP"},
        {num:3,nombre:"Transporte",que:"Entrega de datos entre hosts",ejemplo:"TCP (confiable), UDP (rápido)"},
        {num:2,nombre:"Internet",que:"Enrutamiento entre redes",ejemplo:"IPv4, IPv6, ICMP"},
        {num:1,nombre:"Acceso a red",que:"Equivale a capas 1,2 del OSI",ejemplo:"Ethernet, Wi-Fi, ARP"},
      ],
      recuerda:"TCP garantiza entrega (con confirmación ACK). UDP es más rápido pero sin garantía. Streaming=UDP, descarga de archivos=TCP."
    },
    { id:"ipv4", titulo:"Direccionamiento IPv4", emoji:"🔢", color:"#f59e0b",
      resumen:"IPv4 usa direcciones de 32 bits. Existen clases y rangos privados que debes conocer de memoria.",
      capas:[
        {num:null,nombre:"Clase A (1-126)",que:"Redes muy grandes",ejemplo:"10.0.0.0/8 — privada"},
        {num:null,nombre:"Clase B (128-191)",que:"Redes medianas",ejemplo:"172.16.0.0/12 — privada"},
        {num:null,nombre:"Clase C (192-223)",que:"Redes pequeñas",ejemplo:"192.168.0.0/16 — privada"},
        {num:null,nombre:"Loopback",que:"Dirección local del host",ejemplo:"127.0.0.1 — tu propia máquina"},
        {num:null,nombre:"APIPA",que:"Auto-asignada sin DHCP",ejemplo:"169.254.x.x — indica problema de red"},
      ],
      recuerda:"IPs privadas NO se enrutan en Internet. NAT convierte IP privada → pública. Si ves 169.254.x.x, el equipo no encontró servidor DHCP."
    },
    { id:"subnetting", titulo:"Subnetting y VLSM", emoji:"🧮", color:"#22c55e",
      resumen:"Subnetting divide redes en subredes. VLSM usa máscaras variables para optimizar el uso de IPs.",
      capas:[
        {num:null,nombre:"/24 → 254 hosts",que:"Máscara: 255.255.255.0",ejemplo:"192.168.1.0/24"},
        {num:null,nombre:"/25 → 126 hosts",que:"Máscara: 255.255.255.128",ejemplo:"2 subredes de /24"},
        {num:null,nombre:"/26 → 62 hosts",que:"Máscara: 255.255.255.192",ejemplo:"4 subredes de /24"},
        {num:null,nombre:"/30 → 2 hosts",que:"Máscara: 255.255.255.252",ejemplo:"Ideal para enlaces WAN punto a punto"},
      ],
      recuerda:"Hosts = 2^n - 2. Subredes = 2^s. Siempre resta 2 (dirección de red + broadcast). /30 da solo 2 hosts → perfecto para enlaces entre routers."
    },
    { id:"routing", titulo:"Protocolos de Enrutamiento", emoji:"🔀", color:"#ef4444",
      resumen:"Los protocolos de enrutamiento permiten a los routers aprender rutas automáticamente.",
      capas:[
        {num:null,nombre:"Ruta estática",que:"Configurada manualmente, AD=1",ejemplo:"ip route 192.168.2.0 255.255.255.0 10.0.0.2"},
        {num:null,nombre:"RIP v2",que:"Distance vector, métrica=saltos, AD=120",ejemplo:"Máx 15 saltos, convergencia lenta"},
        {num:null,nombre:"OSPF",que:"Link state, métrica=costo, AD=110",ejemplo:"Costo = 100Mbps / ancho de banda"},
        {num:null,nombre:"EIGRP",que:"Híbrido Cisco, AD=90",ejemplo:"Ancho de banda + delay"},
        {num:null,nombre:"BGP",que:"Entre ISPs, AD=20 (externo)",ejemplo:"Protocolo de enrutamiento de Internet"},
      ],
      recuerda:"AD menor = más confiable. Orden: Estática(1) > EIGRP(90) > OSPF(110) > RIP(120). El router siempre elige la ruta de menor AD."
    },
    { id:"vlans", titulo:"VLANs y Switching", emoji:"🔌", color:"#06b6d4",
      resumen:"VLANs segmentan redes físicas en lógicas. Los switches administrables gestionan VLANs.",
      capas:[
        {num:null,nombre:"Puerto Access",que:"Una sola VLAN",ejemplo:"switchport mode access / switchport access vlan 10"},
        {num:null,nombre:"Puerto Trunk",que:"Múltiples VLANs",ejemplo:"switchport mode trunk / encapsulation dot1q"},
        {num:null,nombre:"VLAN nativa",que:"Tráfico sin etiquetar",ejemplo:"VLAN 1 por defecto (cambiar por seguridad)"},
        {num:null,nombre:"Router-on-a-Stick",que:"Inter-VLAN routing",ejemplo:"interface g0/0.10 / encapsulation dot1Q 10"},
        {num:null,nombre:"STP",que:"Evita bucles capa 2",ejemplo:"Elige root bridge por menor Bridge ID"},
      ],
      recuerda:"Router-on-a-Stick: un router con subinterfaces enruta entre VLANs. Cada subinterfaz = una VLAN. El puerto del switch hacia el router debe ser TRUNK."
    },
    { id:"acl", titulo:"ACLs — Listas de Acceso", emoji:"🛡️", color:"#f97316",
      resumen:"ACLs filtran tráfico en routers. Permiten o deniegan paquetes según criterios definidos.",
      capas:[
        {num:null,nombre:"ACL Estándar (1-99)",que:"Solo filtra por IP origen",ejemplo:"access-list 10 permit 192.168.1.0 0.0.0.255"},
        {num:null,nombre:"ACL Extendida (100-199)",que:"IP, protocolo y puerto",ejemplo:"access-list 110 permit tcp 192.168.1.0 0.0.0.255 any eq 80"},
        {num:null,nombre:"Aplicar en interfaz",que:"IN=entrante, OUT=saliente",ejemplo:"ip access-group 10 in"},
        {num:null,nombre:"Wildcard mask",que:"Inverso de la máscara",ejemplo:"/24 → 0.0.0.255 / /25 → 0.0.0.127"},
      ],
      recuerda:"Estándar → cerca del DESTINO. Extendida → cerca del ORIGEN. Hay un 'deny any' implícito al final. Si no permites nada, bloqueas todo."
    },
    { id:"dhcp", titulo:"DHCP y DNS", emoji:"📡", color:"#84cc16",
      resumen:"DHCP asigna IPs automáticamente. DNS resuelve nombres a IPs. Ambos son críticos en redes.",
      capas:[
        {num:null,nombre:"DORA",que:"Discover→Offer→Request→ACK",ejemplo:"Cliente pide IP, servidor ofrece, cliente acepta, servidor confirma"},
        {num:null,nombre:"DHCP Cisco",que:"Configurar pool",ejemplo:"ip dhcp pool LAN / network 192.168.1.0 255.255.255.0 / default-router 192.168.1.1"},
        {num:null,nombre:"DHCP Relay",que:"DHCP en otra red",ejemplo:"ip helper-address 10.0.0.1 (en el router)"},
        {num:null,nombre:"DNS",que:"Nombre → IP, puerto UDP 53",ejemplo:"google.com → 142.250.80.46"},
      ],
      recuerda:"DHCP usa broadcast. Si el servidor está en otra red necesitas ip helper-address en el router. Sin DHCP el equipo toma IP 169.254.x.x (APIPA)."
    },
  ],
  en: [
    { id:"osi", titulo:"OSI Model — 7 Layers", emoji:"📚", color:"#3b82f6",
      resumen:"The OSI model divides network communication into 7 layers, each with a specific function.",
      capas:[
        {num:7,nombre:"Application",que:"User interface",ejemplo:"HTTP, FTP, DNS, SMTP"},
        {num:6,nombre:"Presentation",que:"Data format and encryption",ejemplo:"SSL/TLS, JPEG, ASCII"},
        {num:5,nombre:"Session",que:"Manages sessions between apps",ejemplo:"NetBIOS, RPC"},
        {num:4,nombre:"Transport",que:"Reliable data delivery",ejemplo:"TCP, UDP"},
        {num:3,nombre:"Network",que:"Routing between networks",ejemplo:"IP, ICMP, routers"},
        {num:2,nombre:"Data Link",que:"Local device communication",ejemplo:"Ethernet, MAC, switches"},
        {num:1,nombre:"Physical",que:"Bit transmission over medium",ejemplo:"Cables, Wi-Fi, signals"},
      ],
      recuerda:"Memory trick: 'All People Seem To Need Data Processing' (Application, Presentation, Session, Transport, Network, Data Link, Physical)"
    },
    { id:"tcpip", titulo:"TCP/IP Model — 4 Layers", emoji:"🌐", color:"#8b5cf6",
      resumen:"The TCP/IP model is the real model used on the Internet, with 4 layers grouping the 7 OSI layers.",
      capas:[
        {num:4,nombre:"Application",que:"Equivalent to OSI layers 5,6,7",ejemplo:"HTTP, DNS, FTP, SMTP"},
        {num:3,nombre:"Transport",que:"Data delivery between hosts",ejemplo:"TCP (reliable), UDP (fast)"},
        {num:2,nombre:"Internet",que:"Routing between networks",ejemplo:"IPv4, IPv6, ICMP"},
        {num:1,nombre:"Network Access",que:"Equivalent to OSI layers 1,2",ejemplo:"Ethernet, Wi-Fi, ARP"},
      ],
      recuerda:"TCP guarantees delivery (ACK). UDP is faster but unreliable. Streaming=UDP, file downloads=TCP."
    },
    { id:"ipv4", titulo:"IPv4 Addressing", emoji:"🔢", color:"#f59e0b",
      resumen:"IPv4 uses 32-bit addresses. Know the classes and private ranges by heart.",
      capas:[
        {num:null,nombre:"Class A (1-126)",que:"Very large networks",ejemplo:"10.0.0.0/8 — private"},
        {num:null,nombre:"Class B (128-191)",que:"Medium networks",ejemplo:"172.16.0.0/12 — private"},
        {num:null,nombre:"Class C (192-223)",que:"Small networks",ejemplo:"192.168.0.0/16 — private"},
        {num:null,nombre:"Loopback",que:"Local host address",ejemplo:"127.0.0.1 — your own machine"},
        {num:null,nombre:"APIPA",que:"Auto-assigned without DHCP",ejemplo:"169.254.x.x — indicates network issue"},
      ],
      recuerda:"Private IPs are NOT routed on the Internet. NAT converts private → public IP. 169.254.x.x means the device couldn't find a DHCP server."
    },
    { id:"subnetting", titulo:"Subnetting and VLSM", emoji:"🧮", color:"#22c55e",
      resumen:"Subnetting divides networks into subnets. VLSM uses variable masks to optimize IP usage.",
      capas:[
        {num:null,nombre:"/24 → 254 hosts",que:"Mask: 255.255.255.0",ejemplo:"192.168.1.0/24"},
        {num:null,nombre:"/25 → 126 hosts",que:"Mask: 255.255.255.128",ejemplo:"2 subnets from /24"},
        {num:null,nombre:"/26 → 62 hosts",que:"Mask: 255.255.255.192",ejemplo:"4 subnets from /24"},
        {num:null,nombre:"/30 → 2 hosts",que:"Mask: 255.255.255.252",ejemplo:"Ideal for WAN point-to-point links"},
      ],
      recuerda:"Hosts = 2^n - 2. Subnets = 2^s. Always subtract 2 (network + broadcast). /30 gives only 2 hosts → perfect for router-to-router links."
    },
    { id:"routing", titulo:"Routing Protocols", emoji:"🔀", color:"#ef4444",
      resumen:"Routing protocols allow routers to automatically learn routes and choose the best path.",
      capas:[
        {num:null,nombre:"Static route",que:"Manually configured, AD=1",ejemplo:"ip route 192.168.2.0 255.255.255.0 10.0.0.2"},
        {num:null,nombre:"RIP v2",que:"Distance vector, metric=hops, AD=120",ejemplo:"Max 15 hops, slow convergence"},
        {num:null,nombre:"OSPF",que:"Link state, metric=cost, AD=110",ejemplo:"Cost = 100Mbps / bandwidth"},
        {num:null,nombre:"EIGRP",que:"Cisco hybrid, AD=90",ejemplo:"Bandwidth + delay"},
        {num:null,nombre:"BGP",que:"Between ISPs, AD=20 (external)",ejemplo:"Global Internet routing protocol"},
      ],
      recuerda:"Lower AD = more trusted. Order: Static(1) > EIGRP(90) > OSPF(110) > RIP(120). Router always picks the route with lowest AD."
    },
    { id:"vlans", titulo:"VLANs and Switching", emoji:"🔌", color:"#06b6d4",
      resumen:"VLANs segment physical networks into logical ones. Managed switches handle VLANs.",
      capas:[
        {num:null,nombre:"Access port",que:"Single VLAN only",ejemplo:"switchport mode access / switchport access vlan 10"},
        {num:null,nombre:"Trunk port",que:"Multiple VLANs",ejemplo:"switchport mode trunk / encapsulation dot1q"},
        {num:null,nombre:"Native VLAN",que:"Untagged traffic",ejemplo:"VLAN 1 by default (change for security)"},
        {num:null,nombre:"Router-on-a-Stick",que:"Inter-VLAN routing",ejemplo:"interface g0/0.10 / encapsulation dot1Q 10"},
        {num:null,nombre:"STP",que:"Prevents Layer 2 loops",ejemplo:"Elects root bridge by lowest Bridge ID"},
      ],
      recuerda:"Router-on-a-Stick: one router with subinterfaces routes between VLANs. Each subinterface = one VLAN. Switch port toward router must be TRUNK."
    },
    { id:"acl", titulo:"ACLs — Access Control Lists", emoji:"🛡️", color:"#f97316",
      resumen:"ACLs filter traffic on routers, permitting or denying packets based on defined criteria.",
      capas:[
        {num:null,nombre:"Standard ACL (1-99)",que:"Filters by source IP only",ejemplo:"access-list 10 permit 192.168.1.0 0.0.0.255"},
        {num:null,nombre:"Extended ACL (100-199)",que:"IP, protocol and port",ejemplo:"access-list 110 permit tcp 192.168.1.0 0.0.0.255 any eq 80"},
        {num:null,nombre:"Apply on interface",que:"IN=inbound, OUT=outbound",ejemplo:"ip access-group 10 in"},
        {num:null,nombre:"Wildcard mask",que:"Inverse of subnet mask",ejemplo:"/24 → 0.0.0.255 / /25 → 0.0.0.127"},
      ],
      recuerda:"Standard → place near DESTINATION. Extended → place near SOURCE. Implicit 'deny any' at end of every ACL. If you don't permit it, it's blocked."
    },
    { id:"dhcp", titulo:"DHCP and DNS", emoji:"📡", color:"#84cc16",
      resumen:"DHCP assigns IPs automatically. DNS resolves names to IPs. Both are critical in networks.",
      capas:[
        {num:null,nombre:"DORA",que:"Discover→Offer→Request→ACK",ejemplo:"Client requests IP, server offers, client accepts, server confirms"},
        {num:null,nombre:"Cisco DHCP",que:"Configure pool",ejemplo:"ip dhcp pool LAN / network 192.168.1.0 255.255.255.0 / default-router 192.168.1.1"},
        {num:null,nombre:"DHCP Relay",que:"DHCP on another network",ejemplo:"ip helper-address 10.0.0.1 (on the router)"},
        {num:null,nombre:"DNS",que:"Name → IP, UDP port 53",ejemplo:"google.com → 142.250.80.46"},
      ],
      recuerda:"DHCP uses broadcast. If the server is on another network, use ip helper-address on the router. Without DHCP the device gets 169.254.x.x (APIPA)."
    },
  ]
};

// ─── TEORÍA COMPONENT ───────────────────────────────────────
function TeoriaView({ lang, onBack }) {
  const t = T[lang];
  const temas = TEORIA[lang];
  const [temaActivo, setTemaActivo] = useState(null);

  if (temaActivo) {
    const tema = temas.find(x => x.id === temaActivo);
    return (
      <div style={{maxWidth:760,margin:"0 auto",paddingBottom:40}}>
        <button onClick={() => setTemaActivo(null)} style={{background:"transparent",border:"1px solid #1e2a3a",color:"#8b949e",borderRadius:6,padding:"8px 16px",fontSize:12,cursor:"pointer",marginBottom:24,fontFamily:"'Inter',sans-serif"}}>
          ← {t.temas}
        </button>
        <div style={{background:C.panel,border:`2px solid ${tema.color}44`,borderRadius:12,padding:24,marginBottom:20}}>
          <div style={{fontSize:36,marginBottom:10}}>{tema.emoji}</div>
          <h2 style={{color:"#fff",fontSize:20,fontWeight:800,marginBottom:8}}>{tema.titulo}</h2>
          <p style={{color:"#8b949e",fontSize:13,lineHeight:1.7}}>{tema.resumen}</p>
        </div>
        <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",marginBottom:16}}>
          <div style={{padding:"12px 20px",borderBottom:`1px solid ${C.border}`,background:C.bg}}>
            <span style={{color:"#8b949e",fontSize:11,textTransform:"uppercase",letterSpacing:"0.1em"}}>{t.conceptoClave}</span>
          </div>
          {tema.capas.map((capa, i) => (
            <div key={i} style={{padding:"14px 20px",borderBottom:i<tema.capas.length-1?`1px solid ${C.bg}`:"none",display:"flex",gap:16,alignItems:"flex-start"}}>
              {capa.num !== null && (
                <div style={{minWidth:28,height:28,borderRadius:"50%",background:tema.color+"22",border:`1px solid ${tema.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:tema.color,fontWeight:700}}>
                  {capa.num}
                </div>
              )}
              <div style={{flex:1}}>
                <div style={{color:"#fff",fontWeight:700,fontSize:13,marginBottom:3}}>{capa.nombre}</div>
                <div style={{color:"#8b949e",fontSize:12,marginBottom:4}}>{capa.que}</div>
                <code style={{background:C.bg,border:`1px solid ${C.border}`,color:tema.color,padding:"3px 8px",borderRadius:4,fontSize:11,fontFamily:"monospace"}}>
                  {capa.ejemplo}
                </code>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"#0a1628",border:"1px solid #1e3a5f",borderRadius:12,padding:18}}>
          <div style={{color:"#3b82f6",fontSize:12,fontWeight:700,marginBottom:8}}>{t.recuerda}</div>
          <p style={{color:"#93c5fd",fontSize:13,lineHeight:1.7,margin:0}}>{tema.recuerda}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{maxWidth:760,margin:"0 auto",paddingBottom:40}}>
      <button onClick={onBack} style={{background:"transparent",border:"1px solid #1e2a3a",color:"#8b949e",borderRadius:6,padding:"8px 16px",fontSize:12,cursor:"pointer",marginBottom:24,fontFamily:"'Inter',sans-serif"}}>
        {t.volver}
      </button>
      <h2 style={{color:"#fff",fontSize:18,fontWeight:800,marginBottom:6}}>📚 {t.teoria}</h2>
      <p style={{color:"#555",fontSize:13,marginBottom:24}}>{t.teoriaDesc}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12}}>
        {temas.map(tema => (
          <div key={tema.id} onClick={() => setTemaActivo(tema.id)}
            style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,padding:18,cursor:"pointer",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=tema.color;e.currentTarget.style.background=tema.color+"0a";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.panel;}}>
            <div style={{fontSize:28,marginBottom:10}}>{tema.emoji}</div>
            <h3 style={{color:"#fff",fontSize:13,fontWeight:700,marginBottom:6}}>{tema.titulo}</h3>
            <p style={{color:"#555",fontSize:11,lineHeight:1.5,marginBottom:12}}>{tema.resumen.slice(0,80)}...</p>
            <span style={{color:tema.color,fontSize:11,fontWeight:600}}>{t.leer}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BANCO DE PREGUNTAS ─────────────────────────────────────
function BancoPregunta({ onBack }) {
  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [pregIdx, setPregIdx] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [correctas, setCorrectas] = useState(0);
  const preg = preguntas[pregIdx];

  const responder = (idx) => {
    if (enviado) return;
    setRespuesta(idx);
    setEnviado(true);
    if (idx === preg.correcta) { setCorrectas(c => c+1); playSound("correct"); } else { playSound("wrong"); }
  };

  const siguiente = () => {
    if (pregIdx < preguntas.length - 1) { setPregIdx(i => i+1); setRespuesta(null); setEnviado(false); }
    else setTemaSeleccionado("resultado");
  };

  if (temaSeleccionado === "resultado") return (
    <div style={{maxWidth:740,margin:"0 auto"}}>
      <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,padding:28,textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:48,marginBottom:12}}>{correctas/preguntas.length>=0.8?"🏆":"📚"}</div>
        <div style={{color:COLOR,fontSize:11,letterSpacing:3,marginBottom:8}}>RESULTADO</div>
        <div style={{color:correctas/preguntas.length>=0.8?"#22c55e":"#f59e0b",fontSize:40,fontWeight:"bold"}}>{Math.round((correctas/preguntas.length)*100)}%</div>
        <div style={{color:"#8b949e",fontSize:14,marginTop:8}}>{correctas}/{preguntas.length} correctas</div>
      </div>
      <button className="ccna-btn" onClick={() => {setTemaSeleccionado(null);setPregIdx(0);setCorrectas(0);setRespuesta(null);setEnviado(false);}}
        style={{background:COLOR,color:"#000",padding:"12px",fontSize:14,width:"100%"}}>🔄 Nuevo tema</button>
    </div>
  );

  if (!temaSeleccionado) return (
    <div>
      <button className="ccna-btn" onClick={() => { onBack(); playSound("click"); }} style={{background:C.dim,color:"#8b949e",padding:"8px 16px",fontSize:12,marginBottom:20}}>← CCNA Prep</button>
      <div style={{color:COLOR,fontSize:11,letterSpacing:3,marginBottom:8}}>BANCO DE PREGUNTAS</div>
      <h3 style={{color:"#fff",fontSize:18,marginBottom:16}}>Elige un tema</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:10}}>
        {TEMAS.map(tema => {
          const count = PREGUNTAS_CCNA.filter(p => p.tema === tema).length;
          return (
            <div key={tema} className="fade-in ccna-btn"
              onClick={() => {
                const filtered = shuffle(PREGUNTAS_CCNA.filter(p => p.tema === tema));
                setPreguntas(filtered); setTemaSeleccionado(tema);
                setPregIdx(0); setCorrectas(0); setRespuesta(null); setEnviado(false);
              }}
              style={{background:C.panel,border:`1px solid ${COLOR}33`,borderRadius:8,padding:16,cursor:"pointer",textAlign:"left"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=COLOR+"66"}
              onMouseLeave={e=>e.currentTarget.style.borderColor=COLOR+"33"}>
              <div style={{color:"#fff",fontWeight:"bold",fontSize:14,marginBottom:4}}>{tema}</div>
              <div style={{color:"#8b949e",fontSize:12}}>{count} preguntas</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (!preg) return null;
  return (
    <div style={{maxWidth:740,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <button className="ccna-btn" onClick={() => setTemaSeleccionado(null)} style={{background:C.dim,color:"#8b949e",padding:"8px 16px",fontSize:12}}>← Temas</button>
        <div style={{color:"#8b949e",fontSize:12}}>✅ {correctas}/{pregIdx+(enviado?1:0)} correctas</div>
      </div>
      <div style={{marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#8b949e",marginBottom:6}}>
          <span style={{color:COLOR}}>{temaSeleccionado}</span><span>{pregIdx+1}/{preguntas.length}</span>
        </div>
        <div style={{height:3,background:C.border,borderRadius:2,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${(pregIdx/preguntas.length)*100}%`,background:COLOR,transition:"width 0.3s"}}/>
        </div>
      </div>
      <div className="fade-in" key={pregIdx} style={{background:C.panel,border:`1px solid ${COLOR}22`,borderRadius:10,padding:24,marginBottom:16,opacity:0}}>
        <div style={{color:"#8b949e",fontSize:10,marginBottom:8}}>PREGUNTA {pregIdx+1}</div>
        <div style={{color:"#fff",fontSize:15,fontWeight:"600",lineHeight:1.5,marginBottom:16}}>{preg.pregunta}</div>
        {preg.opciones.map((opt, i) => {
          let bg=C.panel,border=C.border,color="#8b949e";
          if (enviado) {
            if (i===preg.correcta){bg="#002200";border="#22c55e";color="#22c55e";}
            else if(i===respuesta&&i!==preg.correcta){bg="#1a0505";border="#ff3b3b";color="#ff6b6b";}
          } else if(respuesta===i){border=COLOR;color="#fff";}
          return (
            <button key={i} className="ccna-opt" disabled={enviado} onClick={() => responder(i)}
              style={{background:bg,border:`1px solid ${border}`,color}}>
              <span style={{color:COLOR,marginRight:10,fontWeight:"bold"}}>{["A","B","C","D"][i]}.</span>{opt}
            </button>
          );
        })}
      </div>
      {enviado && (
        <div className="fade-in" style={{opacity:0}}>
          <div style={{background:respuesta===preg.correcta?"#002200":"#0d1117",border:`1px solid ${respuesta===preg.correcta?"#22c55e44":"#ff3b3b44"}`,borderRadius:8,padding:"12px 16px",marginBottom:12,fontSize:13}}>
            <div style={{color:respuesta===preg.correcta?"#22c55e":"#ff6b35",fontWeight:"bold",marginBottom:6}}>{respuesta===preg.correcta?"✅ ¡Correcto!":"❌ Incorrecto"}</div>
            <div style={{color:"#c9d1d9",lineHeight:1.6}}>💡 {preg.explicacion}</div>
          </div>
          <button className="ccna-btn" onClick={siguiente} style={{background:COLOR,color:"#000",padding:"12px",fontSize:14,width:"100%"}}>
            {pregIdx<preguntas.length-1?"Siguiente →":"🎯 Ver resultado"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── FLASHCARDS ─────────────────────────────────────────────
function FlashcardsView({ onBack }) {
  const [catSeleccionada, setCatSeleccionada] = useState(null);
  const [idx, setIdx] = useState(0);
  const [volteada, setVolteada] = useState(false);
  const cards = catSeleccionada ? shuffle(FLASHCARDS.filter(f => f.categoria === catSeleccionada)) : [];
  const card = cards[idx];
  const CATS = [...new Set(FLASHCARDS.map(f => f.categoria))];

  if (!catSeleccionada) return (
    <div>
      <button className="ccna-btn" onClick={() => { onBack(); playSound("click"); }} style={{background:C.dim,color:"#8b949e",padding:"8px 16px",fontSize:12,marginBottom:20}}>← CCNA Prep</button>
      <div style={{color:COLOR,fontSize:11,letterSpacing:3,marginBottom:8}}>FLASHCARDS</div>
      <h3 style={{color:"#fff",fontSize:18,marginBottom:16}}>Elige una categoría</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
        {CATS.map(cat => {
          const count = FLASHCARDS.filter(f => f.categoria === cat).length;
          return (
            <div key={cat} className="fade-in"
              onClick={() => { setCatSeleccionada(cat); setIdx(0); setVolteada(false); }}
              style={{background:C.panel,border:`1px solid ${COLOR}33`,borderRadius:8,padding:16,cursor:"pointer"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=COLOR+"66"}
              onMouseLeave={e=>e.currentTarget.style.borderColor=COLOR+"33"}>
              <div style={{color:"#fff",fontWeight:"bold",fontSize:14,marginBottom:4}}>{cat}</div>
              <div style={{color:"#8b949e",fontSize:12}}>{count} tarjetas</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (!card) return null;
  return (
    <div style={{maxWidth:600,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <button className="ccna-btn" onClick={() => setCatSeleccionada(null)} style={{background:C.dim,color:"#8b949e",padding:"8px 16px",fontSize:12}}>← Categorías</button>
        <span style={{color:"#8b949e",fontSize:12}}>{idx+1}/{cards.length}</span>
      </div>
      <div onClick={() => { setVolteada(v => !v); playSound("flip"); }}
        style={{background:C.panel,border:`2px solid ${volteada?"#22c55e44":COLOR+"44"}`,borderRadius:12,padding:40,textAlign:"center",cursor:"pointer",minHeight:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"all 0.3s",marginBottom:20}}>
        <div style={{color:volteada?"#22c55e":COLOR,fontSize:11,letterSpacing:3,marginBottom:12}}>{volteada?"RESPUESTA":"PREGUNTA"}</div>
        <div style={{color:"#fff",fontSize:16,fontWeight:volteada?"400":"600",lineHeight:1.6}}>{volteada?card.respuesta:card.pregunta}</div>
        <div style={{color:"#555",fontSize:11,marginTop:16}}>Click para {volteada?"ver pregunta":"ver respuesta"}</div>
      </div>
      <div style={{display:"flex",gap:10}}>
        <button className="ccna-btn" onClick={() => {setIdx(i=>Math.max(0,i-1));setVolteada(false);}} disabled={idx===0}
          style={{background:C.dim,color:"#8b949e",padding:"10px 20px",fontSize:13,flex:1}}>← Anterior</button>
        <button className="ccna-btn" onClick={() => {setIdx(i=>Math.min(cards.length-1,i+1));setVolteada(false);}} disabled={idx===cards.length-1}
          style={{background:COLOR,color:"#000",padding:"10px 20px",fontSize:13,flex:1}}>Siguiente →</button>
      </div>
    </div>
  );
}

// ─── SUBNETTING ─────────────────────────────────────────────
function SubnetSim({ onBack }) {
  const [ejercicio, setEjercicio] = useState(() => EJERCICIOS_SUBNET[Math.floor(Math.random()*EJERCICIOS_SUBNET.length)]);
  const [respuestas, setRespuestas] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [score, setScore] = useState(0);

  const verificar = () => {
    let c = 0;
    ejercicio.preguntas.forEach((p,i) => {
      if ((respuestas[i]||"").trim().toLowerCase() === p.respuesta.toLowerCase()) c++;
    });
    setScore(c);
    setEnviado(true);
    playSound(c === ejercicio.preguntas.length ? "correct" : c > 0 ? "click" : "wrong");
  };

  const nuevo = () => {
    setEjercicio(EJERCICIOS_SUBNET[Math.floor(Math.random()*EJERCICIOS_SUBNET.length)]);
    setRespuestas({}); setEnviado(false); setScore(0);
  };

  return (
    <div style={{maxWidth:740,margin:"0 auto"}}>
      <button className="ccna-btn" onClick={onBack} style={{background:C.dim,color:"#8b949e",padding:"8px 16px",fontSize:12,marginBottom:20}}>← CCNA Prep</button>
      <div style={{background:C.panel,border:`1px solid ${COLOR}33`,borderRadius:10,padding:24,marginBottom:20}}>
        <div style={{color:COLOR,fontSize:11,letterSpacing:3,marginBottom:8}}>EJERCICIO DE SUBNETTING</div>
        <div style={{color:"#fff",fontSize:16,fontWeight:"600",marginBottom:8}}>{ejercicio.enunciado}</div>
        {ejercicio.datos && <div style={{color:"#8b949e",fontSize:13,fontFamily:"monospace",background:C.bg,padding:"10px 14px",borderRadius:6,marginTop:8}}>{ejercicio.datos}</div>}
      </div>
      {ejercicio.preguntas.map((p, i) => {
        const ok = enviado && (respuestas[i]||"").trim().toLowerCase() === p.respuesta.toLowerCase();
        const fail = enviado && !ok;
        return (
          <div key={i} style={{background:C.panel,border:`1px solid ${enviado?(ok?"#22c55e44":"#ff3b3b44"):C.border}`,borderRadius:8,padding:16,marginBottom:10}}>
            <div style={{color:"#fff",fontSize:13,marginBottom:10}}>{p.pregunta}</div>
            <input className="ccna-input" value={respuestas[i]||""} disabled={enviado}
              onChange={e=>setRespuestas(r=>({...r,[i]:e.target.value}))}
              onKeyDown={e=>e.key==="Enter"&&!enviado&&verificar()}
              placeholder="Tu respuesta..." />
            {enviado && (
              <div style={{marginTop:8,fontSize:12,color:ok?"#22c55e":"#ff6b6b"}}>
                {ok?"✅ Correcto":`❌ Respuesta: ${p.respuesta}`}
              </div>
            )}
          </div>
        );
      })}
      {!enviado
        ? <button className="ccna-btn" onClick={verificar} style={{background:COLOR,color:"#000",padding:"12px",fontSize:14,width:"100%"}}>Verificar respuestas</button>
        : (
          <div>
            <div style={{background:score===ejercicio.preguntas.length?"#002200":"#0d1117",border:`1px solid ${score===ejercicio.preguntas.length?"#22c55e44":"#f59e0b44"}`,borderRadius:8,padding:16,textAlign:"center",marginBottom:12}}>
              <div style={{color:score===ejercicio.preguntas.length?"#22c55e":"#f59e0b",fontSize:24,fontWeight:"bold"}}>{score}/{ejercicio.preguntas.length}</div>
              <div style={{color:"#8b949e",fontSize:13}}>respuestas correctas</div>
            </div>
            <button className="ccna-btn" onClick={nuevo} style={{background:COLOR,color:"#000",padding:"12px",fontSize:14,width:"100%"}}>🔄 Nuevo ejercicio</button>
          </div>
        )
      }
    </div>
  );
}

// ─── SIMULACRO ──────────────────────────────────────────────
const TOTAL = 50;
const TIEMPO = 60 * 60;

function Simulacro({ onBack }) {
  const [iniciado, setIniciado] = useState(false);
  const [terminado, setTerminado] = useState(false);
  const [preguntas] = useState(() => shuffle(PREGUNTAS_CCNA).slice(0, TOTAL));
  const [idx, setIdx] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [tiempo, setTiempo] = useState(TIEMPO);

  useEffect(() => {
    if (!iniciado || terminado) return;
    const t = setInterval(() => setTiempo(s => { if (s <= 1) { clearInterval(t); setTerminado(true); return 0; } return s-1; }), 1000);
    return () => clearInterval(t);
  }, [iniciado, terminado]);

  const responder = (i) => { if (!respuestas[idx]) setRespuestas(r => ({...r,[idx]:i})); };
  const finalizar = () => setTerminado(true);

  const mins = Math.floor(tiempo/60), segs = tiempo%60;
  const tiempoColor = tiempo < 300 ? "#ff3b3b" : tiempo < 600 ? "#f59e0b" : COLOR;

  if (!iniciado) return (
    <div style={{maxWidth:600,margin:"0 auto",textAlign:"center"}}>
      <button className="ccna-btn" onClick={onBack} style={{background:C.dim,color:"#8b949e",padding:"8px 16px",fontSize:12,marginBottom:20,display:"block"}}>← CCNA Prep</button>
      <div style={{background:C.panel,border:`1px solid ${COLOR}33`,borderRadius:12,padding:32}}>
        <div style={{fontSize:48,marginBottom:16}}>📊</div>
        <div style={{color:COLOR,fontSize:11,letterSpacing:4,marginBottom:8}}>SIMULACRO DE EXAMEN</div>
        <h2 style={{color:"#fff",fontSize:20,marginBottom:12}}>CCNA 200-301</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:24}}>
          {[["📝",`${TOTAL}`,"Preguntas"],["⏱️","60","Minutos"],["✅","70%","Para aprobar"]].map(([ico,val,lab],i)=>(
            <div key={i} style={{background:C.bg,borderRadius:8,padding:12}}>
              <div style={{fontSize:20}}>{ico}</div>
              <div style={{color:COLOR,fontSize:18,fontWeight:"bold"}}>{val}</div>
              <div style={{color:"#8b949e",fontSize:11}}>{lab}</div>
            </div>
          ))}
        </div>
        <button className="ccna-btn" onClick={() => setIniciado(true)} style={{background:COLOR,color:"#000",padding:"14px 32px",fontSize:15,width:"100%"}}>
          🚀 Comenzar simulacro
        </button>
      </div>
    </div>
  );

  if (terminado) {
    const correctas = Object.entries(respuestas).filter(([i,r]) => preguntas[i]?.correcta === r).length;
    const pct = Math.round((correctas/TOTAL)*100);
    const aprobado = pct >= 70;
    const porTema = {};
    preguntas.forEach((p,i) => {
      if (!porTema[p.tema]) porTema[p.tema] = {correctas:0,total:0};
      porTema[p.tema].total++;
      if (respuestas[i]===p.correcta) porTema[p.tema].correctas++;
    });
    return (
      <div style={{maxWidth:740,margin:"0 auto"}}>
        <div style={{background:C.panel,border:`1px solid ${aprobado?"#22c55e44":"#ff3b3b44"}`,borderRadius:12,padding:28,textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:48,marginBottom:12}}>{aprobado?"🏆":"📚"}</div>
          <div style={{color:aprobado?"#22c55e":"#ff3b3b",fontSize:11,letterSpacing:4,marginBottom:8}}>{aprobado?"¡APROBADO!":"REPASA Y VUELVE A INTENTAR"}</div>
          <div style={{color:aprobado?"#22c55e":"#ff3b3b",fontSize:40,fontWeight:"bold"}}>{pct}%</div>
          <div style={{color:"#8b949e",fontSize:14,marginTop:8}}>{correctas}/{TOTAL} correctas</div>
        </div>
        <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,padding:20,marginBottom:20}}>
          <div style={{color:COLOR,fontSize:11,letterSpacing:3,marginBottom:12}}>RESULTADOS POR TEMA</div>
          {Object.entries(porTema).map(([tema,{correctas:c,total:t}]) => {
            const pct = Math.round((c/t)*100);
            return (
              <div key={tema} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span style={{color:"#fff"}}>{tema}</span>
                  <span style={{color:pct>=80?"#22c55e":pct>=60?"#f59e0b":"#ff3b3b"}}>{c}/{t} ({pct}%)</span>
                </div>
                <div style={{height:4,background:C.border,borderRadius:2,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${pct}%`,background:pct>=80?"#22c55e":pct>=60?"#f59e0b":"#ff3b3b",borderRadius:2}}/>
                </div>
              </div>
            );
          })}
        </div>
        <button className="ccna-btn" onClick={() => { setIniciado(false); setTerminado(false); setIdx(0); setRespuestas({}); setTiempo(TIEMPO); }}
          style={{background:COLOR,color:"#000",padding:"12px",fontSize:14,width:"100%"}}>🔄 Nuevo simulacro</button>
      </div>
    );
  }

  const preg = preguntas[idx];
  return (
    <div style={{maxWidth:740,margin:"0 auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <span style={{color:"#8b949e",fontSize:12}}>{idx+1}/{TOTAL}</span>
        <span style={{color:tiempoColor,fontWeight:"bold",fontFamily:"monospace",fontSize:16}}>⏱️ {String(mins).padStart(2,"0")}:{String(segs).padStart(2,"0")}</span>
        <button className="ccna-btn" onClick={finalizar} style={{background:"#ff3b3b22",color:"#ff6b6b",padding:"6px 14px",fontSize:11,border:"1px solid #ff3b3b44"}}>Finalizar</button>
      </div>
      <div style={{height:3,background:C.border,borderRadius:2,overflow:"hidden",marginBottom:20}}>
        <div style={{height:"100%",width:`${(idx/TOTAL)*100}%`,background:COLOR,transition:"width 0.3s"}}/>
      </div>
      <div className="fade-in" key={idx} style={{background:C.panel,border:`1px solid ${COLOR}22`,borderRadius:10,padding:24,marginBottom:16,opacity:0}}>
        <div style={{color:"#8b949e",fontSize:10,marginBottom:8}}>{preg.tema}</div>
        <div style={{color:"#fff",fontSize:15,fontWeight:"600",lineHeight:1.5,marginBottom:16}}>{preg.pregunta}</div>
        {preg.opciones.map((opt, i) => (
          <button key={i} className="ccna-opt" onClick={() => responder(i)}
            style={{border:`1px solid ${respuestas[idx]===i?COLOR:C.border}`,color:respuestas[idx]===i?"#fff":"#8b949e",background:respuestas[idx]===i?`${COLOR}11`:C.panel}}>
            <span style={{color:COLOR,marginRight:10,fontWeight:"bold"}}>{["A","B","C","D"][i]}.</span>{opt}
          </button>
        ))}
      </div>
      <div style={{display:"flex",gap:10}}>
        <button className="ccna-btn" onClick={() => setIdx(i=>Math.max(0,i-1))} disabled={idx===0} style={{background:C.dim,color:"#8b949e",padding:"10px 20px",fontSize:13}}>← Anterior</button>
        {idx<TOTAL-1
          ? <button className="ccna-btn" onClick={() => setIdx(i=>i+1)} style={{background:COLOR,color:"#000",padding:"10px 20px",fontSize:13,flex:1}}>Siguiente →</button>
          : <button className="ccna-btn" onClick={finalizar} style={{background:"#22c55e",color:"#000",padding:"10px 20px",fontSize:13,flex:1}}>✅ Finalizar examen</button>
        }
      </div>
    </div>
  );
}

// ─── SELECTOR DE IDIOMA ─────────────────────────────────────
function SelectorIdioma({ onSelect }) {
  return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Inter',sans-serif"}}>
      <div style={{textAlign:"center",maxWidth:420,padding:32}}>
        <div style={{fontSize:52,marginBottom:16}}>📡</div>
        <div style={{color:COLOR,fontSize:11,letterSpacing:6,marginBottom:8}}>◈ HACKFORGE</div>
        <h1 style={{color:"#fff",fontSize:22,fontWeight:800,marginBottom:8}}>CCNA Prep Zone</h1>
        <p style={{color:"#555",fontSize:13,marginBottom:32}}>Choose your study language / Elige tu idioma</p>
        <div style={{display:"flex",gap:16,justifyContent:"center"}}>
          {[
            {code:"es",flag:"🇨🇱",label:"Español",sub:"Contenido en español"},
            {code:"en",flag:"🇺🇸",label:"English",sub:"Content in English"},
          ].map(l => (
            <button key={l.code} onClick={() => onSelect(l.code)}
              style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,padding:"20px 28px",cursor:"pointer",transition:"all 0.2s",textAlign:"center",fontFamily:"'Inter',sans-serif"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=COLOR;e.currentTarget.style.background=COLOR+"11";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.panel;}}>
              <div style={{fontSize:32,marginBottom:8}}>{l.flag}</div>
              <div style={{color:"#fff",fontWeight:700,fontSize:15,marginBottom:4}}>{l.label}</div>
              <div style={{color:"#555",fontSize:11}}>{l.sub}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ────────────────────────────────────────────
export default function CCNAPrep() {
  const [lang, setLang] = useState(null);
  const [vista, setVista] = useState("menu");

  if (!lang) return <SelectorIdioma onSelect={setLang} />;

  const t = T[lang];

  const SECCIONES = [
    {id:"teoria", icon:"📚", titulo:t.teoria, desc:t.teoriaDesc, color:"#3b82f6"},
    {id:"banco",  icon:"📝", titulo:t.banco,  desc:t.bancoDesc,  color:"#8b5cf6"},
    {id:"flash",  icon:"🃏", titulo:t.flash,  desc:t.flashDesc,  color:"#f59e0b"},
    {id:"subnet", icon:"🧮", titulo:t.subnet, desc:t.subnetDesc, color:"#22c55e"},
    {id:"simulacro",icon:"📊",titulo:t.simulacro,desc:t.simulacroDesc,color:"#ef4444"},
  ];

  if (vista === "teoria")    return <div style={{minHeight:"100vh",background:C.bg,color:"#fff",fontFamily:"'Inter',sans-serif",padding:"24px 32px"}}><style>{CSS}</style><TeoriaView lang={lang} onBack={() => setVista("menu")} /></div>;
  if (vista === "banco")     return <div style={{minHeight:"100vh",background:C.bg,color:"#fff",fontFamily:"'Inter',sans-serif",padding:"24px 32px"}}><style>{CSS}</style><BancoPregunta onBack={() => setVista("menu")} /></div>;
  if (vista === "flash")     return <div style={{minHeight:"100vh",background:C.bg,color:"#fff",fontFamily:"'Inter',sans-serif",padding:"24px 32px"}}><style>{CSS}</style><FlashcardsView onBack={() => setVista("menu")} /></div>;
  if (vista === "subnet")    return <div style={{minHeight:"100vh",background:C.bg,color:"#fff",fontFamily:"'Inter',sans-serif",padding:"24px 32px"}}><style>{CSS}</style><SubnetSim onBack={() => setVista("menu")} /></div>;
  if (vista === "simulacro") return <div style={{minHeight:"100vh",background:C.bg,color:"#fff",fontFamily:"'Inter',sans-serif",padding:"24px 32px"}}><style>{CSS}</style><Simulacro onBack={() => setVista("menu")} /></div>;

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:"#fff",fontFamily:"'Inter',sans-serif"}}>
      <style>{CSS}</style>
      <div style={{borderBottom:`1px solid ${C.border}`,padding:"24px 32px 20px",background:"linear-gradient(180deg,#0d0d1f 0%,#07090f 100%)"}}>
        <div style={{maxWidth:860,margin:"0 auto",display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
              <span style={{fontSize:22}}>📡</span>
              <h1 style={{fontSize:22,fontWeight:800,margin:0,background:"linear-gradient(90deg,#fff,#888)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t.titulo}</h1>
            </div>
            <p style={{color:"#444",fontSize:12,margin:0}}>{t.subtitulo}</p>
          </div>
          <button onClick={() => setLang(null)}
            style={{background:C.panel,border:`1px solid ${C.border}`,color:"#8b949e",borderRadius:8,padding:"7px 14px",fontSize:11,cursor:"pointer",fontFamily:"'Inter',sans-serif"}}>
            🌐 {t.cambiarIdioma}
          </button>
        </div>
      </div>
      <div style={{maxWidth:860,margin:"0 auto",padding:"28px 32px"}}>
        <p style={{color:"#444",fontSize:12,marginBottom:20}}>{t.modulos}</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:14}}>
          {SECCIONES.map(s => (
            <div key={s.id} onClick={() => setVista(s.id)}
              style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,padding:22,cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color;e.currentTarget.style.background=s.color+"0a";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.panel;}}>
              <div style={{fontSize:32,marginBottom:12}}>{s.icon}</div>
              <h3 style={{color:"#fff",fontWeight:700,fontSize:15,marginBottom:6}}>{s.titulo}</h3>
              <p style={{color:"#555",fontSize:12,lineHeight:1.6,marginBottom:14}}>{s.desc}</p>
              <span style={{color:s.color,fontSize:11,fontWeight:600}}>{t.leer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
