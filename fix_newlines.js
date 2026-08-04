const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'products.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// The file currently has literal \n and \r in some places where it shouldn't
// wait, let's just replace all literal \n that appear before `description:`
content = content.replace(/\\n\s*description:/g, '\n    description:');
content = content.replace(/,\\n\s*image:/g, ',\n    image:');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed newlines');
