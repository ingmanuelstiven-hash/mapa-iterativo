const fs = require('fs');
const content = fs.readFileSync('public/mapa_procesos.svg', 'utf8');
const matches = content.match(/id="G_[^"]+"/g);
console.log(matches ? matches.map(m => m.split('"')[1]).join('\n') : 'No IDs');
