const fs = require('fs');
const path = require('path');

const srcDir = 'react-app/src';

const fileMap = {
    // Pages
    'pages/Admin.jsx': 'features/admin',
    'pages/AdminInventory.jsx': 'features/admin',
    'pages/Report.jsx': 'features/admin',
    
    'pages/Cart.jsx': 'features/borrowing',
    'pages/Requests.jsx': 'features/borrowing',
    
    'pages/Catalog.jsx': 'features/equipment',
    'pages/ItemDetail.jsx': 'features/equipment',
    
    'pages/Login.jsx': 'features/auth',
    'pages/Register.jsx': 'features/auth',
    
    'pages/Tickets.jsx': 'features/maintenance',
    
    'pages/Profile.jsx': 'features/user',
    'pages/Settings.jsx': 'features/user',
    
    'pages/Home.jsx': 'core/pages',

    // Components
    'components/Sidebar.jsx': 'core/components',
    'components/TopNav.jsx': 'core/components',

    // Context
    'context/AppContext.jsx': 'core/context',

    // Services
    'services/api.js': 'core/services',
};

// Create dirs
for (const dest of Object.values(fileMap)) {
    const d = path.join(srcDir, dest);
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

// Function to replace relative imports with absolute alias imports
function convertImportsToAlias(content, currentFileRelativePath) {
    // Regex for import statements: import ... from '...'
    const importRegex = /from\s+['"]([^'"]+)['"]/g;
    
    return content.replace(importRegex, (match, importPath) => {
        if (!importPath.startsWith('.')) return match; // Not a relative import (e.g. 'react')
        
        // Compute absolute path relative to srcDir
        const dirOfCurrentFile = path.dirname(currentFileRelativePath);
        const resolvedPath = path.resolve(path.join(srcDir, dirOfCurrentFile), importPath);
        
        // Find relative path from srcDir
        const relToSrc = path.relative(path.resolve(srcDir), resolvedPath).replace(/\\/g, '/');
        
        // For old structure paths, map to new structure
        let finalPath = relToSrc;
        
        // Check if the resolved file is in fileMap
        // Try appending extensions if missing
        let matched = false;
        for (const ext of ['', '.js', '.jsx', '.css']) {
            if (fileMap[relToSrc + ext]) {
                finalPath = fileMap[relToSrc + ext] + '/' + path.basename(relToSrc);
                matched = true;
                break;
            }
        }
        
        // What if it's css or assets?
        if (!matched) {
           // just use the relative path directly with @/
           // If it's an asset or css that didn't move
        }
        
        return `from '@/${finalPath}'`;
    });
}

function processFile(filePath) {
    const relPath = path.relative(srcDir, filePath).replace(/\\/g, '/');
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We update imports first
    content = convertImportsToAlias(content, relPath);
    
    // Save to new location if moved
    let newRelPath = relPath;
    let mappedDest = null;
    
    for (const [key, value] of Object.entries(fileMap)) {
        if (relPath === key) {
            mappedDest = value;
            break;
        }
    }
    
    if (mappedDest) {
        newRelPath = mappedDest + '/' + path.basename(relPath);
    }
    
    const destFullPath = path.join(srcDir, newRelPath);
    if (!fs.existsSync(path.dirname(destFullPath))) {
        fs.mkdirSync(path.dirname(destFullPath), { recursive: true });
    }
    
    fs.writeFileSync(destFullPath, content);
    
    // If moved, delete old
    if (destFullPath !== filePath) {
        fs.unlinkSync(filePath);
    }
}

// Traverse all files
function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            // we process it if it's not node_modules
            if (!fullPath.includes('node_modules')) {
                processFile(fullPath);
            }
        }
    }
}

// We process old directories explicitly, plus App.jsx and main.jsx
const targets = [
    'pages', 'components', 'context', 'services', 'App.jsx', 'main.jsx'
];

for (const t of targets) {
    const full = path.join(srcDir, t);
    if (fs.existsSync(full)) {
        if (fs.statSync(full).isDirectory()) walk(full);
        else processFile(full);
    }
}

console.log("Frontend refactoring script completed.");
