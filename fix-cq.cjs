const fs = require('fs');
let c = fs.readFileSync('src/App.jsx', 'utf8');

// Fix duplicate import
const imp = 'import CodeQuestComp from "./components/CodeQuest/CodeQuest";';
while (c.indexOf(imp + '\n' + imp) !== -1) {
  c = c.replace(imp + '\n' + imp, imp);
}
console.log('OK - Import duplicado eliminado');

fs.writeFileSync('src/App.jsx', c, 'utf8');
console.log('LISTO - Ahora haz: git add . && git commit -m "fix: CodeQuest import duplicado" && git push');
