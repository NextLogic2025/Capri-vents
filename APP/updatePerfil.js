const fs=require('fs');
const path='frontend/Cliente/screens/PerfilScreen.js';
let text=fs.readFileSync(path,'utf8');
const idx=text.indexOf('icon= card-outline');
