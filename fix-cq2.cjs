const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

// Find the inline CodeQuest function and remove it
// It starts with "function CodeQuest(" and ends before "const CSS = `"
const startMarker = 'function CodeQuest(';
const endMarker = 'export default function App()';

const startIdx = c.indexOf(startMarker);
const endIdx = c.indexOf(endMarker);

if (startIdx === -1) {
  console.log('ERROR: No se encontro la funcion CodeQuest inline');
  process.exit(1);
}
if (endIdx === -1) {
  console.log('ERROR: No se encontro export default function App()');
  process.exit(1);
}

console.log('Encontrada funcion inline en linea ~' + c.slice(0,startIdx).split('\n').length);
console.log('Eliminando hasta linea ~' + c.slice(0,endIdx).split('\n').length);

// Also remove CQ_MISIONES array that precedes CodeQuest function
const cqMisionesMarker = 'const CQ_MISIONES';
const cqIdx = c.indexOf(cqMisionesMarker);

let removeFrom = startIdx;
if (cqIdx !== -1 && cqIdx < startIdx) {
  removeFrom = cqIdx;
  console.log('Tambien eliminando CQ_MISIONES array');
}

c = c.slice(0, removeFrom) + c.slice(endIdx);

// Fix double import if still present
const imp = 'import CodeQuestComp from "./components/CodeQuest/CodeQuest";';
while (c.indexOf(imp + '\n' + imp) !== -1) {
  c = c.replace(imp + '\n' + imp, imp);
}

fs.writeFileSync('src/App.jsx', c, 'utf8');
console.log('LISTO - Funcion CodeQuest inline eliminada');
console.log('Ejecuta: git add . && git commit -m "fix: eliminar CodeQuest inline" && git push');
