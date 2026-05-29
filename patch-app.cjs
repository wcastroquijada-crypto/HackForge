const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src", "App.jsx");
let code = fs.readFileSync(filePath, "utf8");

// 1. Add imports after last existing import
if (!code.includes("CodeQuestComp") && !code.includes("Pentesting")) {
  code = code.replace(
    'import Modulos from "./components/Modulos/Modulos";',
    'import Modulos from "./components/Modulos/Modulos";\nimport CodeQuestComp from "./components/CodeQuest/CodeQuest";\nimport Pentesting from "./components/Pentesting/Pentesting";'
  );
  console.log("OK - Imports agregados");
} else {
  console.log("INFO - Imports ya existen");
}

// 2. Add Pentesting to nav array (after Red Team)
if (!code.includes('"pt"')) {
  code = code.replace(
    '{ id:"cq",   icon:"🎮", label:"CodeQuest"  },',
    '{ id:"pt",   icon:"🔴", label:"Pentesting"  },\n          { id:"cq",   icon:"🎮", label:"CodeQuest"  },'
  );
  console.log("OK - Nav item Pentesting agregado");
} else {
  console.log("INFO - Nav Pentesting ya existe");
}

// 3. Fix CodeQuest render - replace placeholder with real component
const cqPlaceholder = `{nav==="cq"&&(
          <div style={{ textAlign:"center", paddingTop:60 }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🎮</div>
            <div style={{ color:C.cyan, fontSize:11, letterSpacing:4, marginBottom:8 }}>HACKFORGE // CODEQUEST</div>
            <h2 style={{ color:"#fff", fontSize:20, marginBottom:12 }}>CodeQuest</h2>
            <p style={{ color:C.muted, fontSize:13, maxWidth:400, margin:"0 auto 24px" }}>Próximamente: Misiones de hacking en código con XP, teoría y retos progresivos.</p>
            <div style={{ display:"inline-block", background:\`\${C.cyan}11\`, border:\`1px solid \${C.cyan}33\`, borderRadius:8, padding:"12px 24px", color:C.cyan, fontSize:12 }}>🚧 Próximamente</div>
          </div>
        )}`;

if (code.includes('{nav==="cq"&&(') && !code.includes('<CodeQuestComp')) {
  // Find and replace the entire cq block
  const startIdx = code.indexOf('{nav==="cq"&&(');
  const endStr = ')}\n\n        {nav==="ccna"';
  const endIdx = code.indexOf(endStr, startIdx);
  if (startIdx !== -1 && endIdx !== -1) {
    code = code.slice(0, startIdx) + '{nav==="cq" && <CodeQuestComp onCompletarCQ={completarLeccion.bind(null, "cq")}/>}' + '\n\n        ' + code.slice(endIdx + 3);
    console.log("OK - CodeQuest render reemplazado");
  }
} else if (code.includes('<CodeQuestComp')) {
  console.log("INFO - CodeQuestComp ya esta en render");
}

// 4. Add Pentesting render before CodeQuest
if (!code.includes('<Pentesting') && code.includes('<CodeQuestComp')) {
  code = code.replace(
    '{nav==="cq" && <CodeQuestComp',
    '{nav==="pt" && <Pentesting progresoMods={progresoMods} onCompletarLeccion={completarLeccion}/> }\n\n        {nav==="cq" && <CodeQuestComp'
  );
  console.log("OK - Pentesting render agregado");
} else if (code.includes('<Pentesting')) {
  console.log("INFO - Pentesting render ya existe");
}

// 5. Fix CCNAPrep render
if (code.includes('{nav==="ccna"&&(') && !code.includes('<CCNAPrep />')) {
  const startIdx = code.indexOf('{nav==="ccna"&&(');
  const endStr = '\n      </main>';
  const endIdx = code.indexOf(endStr, startIdx);
  if (startIdx !== -1 && endIdx !== -1) {
    code = code.slice(0, startIdx) + '{nav==="ccna" && <CCNAPrep />}' + code.slice(endIdx);
    console.log("OK - CCNAPrep render reemplazado");
  }
} else {
  console.log("INFO - CCNAPrep ya esta correcto o no encontrado");
}

fs.writeFileSync(filePath, code, "utf8");
console.log("\nPATCH COMPLETADO - App.jsx actualizado");
console.log("Ahora ejecuta: git add . && git commit -m 'feat: plataforma completa - Pentesting + CodeQuest + CCNAPrep' && git push");
