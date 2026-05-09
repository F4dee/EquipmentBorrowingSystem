const fs = require('fs');
const path = require('path');

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.jsx')) {
            let content = fs.readFileSync(full, 'utf8');
            let changed = false;
            
            // replace `import '../styles/styles.css'` and similar
            if (content.match(/import\s+['"]\.+[\/\\]styles[\/\\]styles\.css['"]/)) {
                content = content.replace(/import\s+['"]\.+[\/\\]styles[\/\\]styles\.css['"]/g, "import '@/styles/styles.css'");
                changed = true;
            }
            if (content.match(/import\s+['"]\.\/App\.css['"]/)) {
                content = content.replace(/import\s+['"]\.\/App\.css['"]/g, "import '@/App.css'");
                changed = true;
            }
            if (content.match(/import\s+['"]\.\.\/App\.css['"]/)) {
                content = content.replace(/import\s+['"]\.\.\/App\.css['"]/g, "import '@/App.css'");
                changed = true;
            }
            
            if (changed) {
                console.log('Fixed styles import in', full);
                fs.writeFileSync(full, content);
            }
        }
    }
}
walk('react-app/src');
