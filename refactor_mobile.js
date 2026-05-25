const fs = require('fs');
const path = require('path');

const baseDir = 'mobile/app/src/main/java/edu/cit/lastname/equipmentborrowingsystem';
const basePkg = 'edu.cit.lastname.equipmentborrowingsystem';

const fileMap = {
    // API
    'api/AuthService.kt': 'features/auth',
    'api/models/AuthResponse.kt': 'features/auth',
    'api/models/LoginRequest.kt': 'features/auth',
    'api/models/RegisterRequest.kt': 'features/auth',
    'api/RetrofitClient.kt': 'core/network',

    // UI
    'ui/login/LoginActivity.kt': 'features/auth',
    'ui/register/RegisterActivity.kt': 'features/auth',
    'ui/dashboard/DashboardActivity.kt': 'features/dashboard',
};

// Create dirs
for (const dest of Object.values(fileMap)) {
    const d = path.join(baseDir, dest);
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

const fileDestinations = {};
for (const [oldRelative, dest] of Object.entries(fileMap)) {
    const oldPath = path.join(baseDir, oldRelative);
    const destRelativePath = path.join(dest, path.basename(oldPath)).replace(/\\/g, '/');
    const destPkg = `${basePkg}.${dest.replace(/\//g, '.')}`;
    const oldPkg = `${basePkg}.${path.dirname(oldRelative).replace(/\//g, '.')}`;
    
    fileDestinations[oldPath] = { destRelativePath, destPkg, oldPkg };
}

// We need a mapping from class name to its new package to rewrite imports
const classToNewPkg = {};
for (const [oldPath, info] of Object.entries(fileDestinations)) {
    const className = path.basename(oldPath, '.kt');
    classToNewPkg[className] = info.destPkg;
}

// Move files and rewrite package/imports
for (const [oldPath, info] of Object.entries(fileDestinations)) {
    const newPath = path.join(baseDir, info.destRelativePath);
    if (!fs.existsSync(oldPath)) continue;
    let content = fs.readFileSync(oldPath, 'utf8');
    
    // Replace package
    content = content.replace(/^package\s+[\w.]+$/m, `package ${info.destPkg}`);
    
    // Kotlin imports don't end with ;
    const importRegex = new RegExp(`^import\\s+${basePkg.replace(/\./g, '\\.')}\\.([\\w.]+)\\.([\\w]+)$`, 'gm');
    content = content.replace(importRegex, (match, oldSubPkg, className) => {
        if (classToNewPkg[className]) {
            return `import ${classToNewPkg[className]}.${className}`;
        }
        return match; 
    });
    
    // Check if we need to add new imports for classes that moved out of the same package
    for (const [className, newPkg] of Object.entries(classToNewPkg)) {
        if (newPkg !== info.destPkg && content.includes(className)) {
            const expectedImport = `import ${newPkg}.${className}`;
            if (!content.includes(expectedImport) && !content.includes(`import ${newPkg}.*`)) {
                content = content.replace(/^package\s+[\w.]+$/m, `$&\nimport ${newPkg}.${className}`);
            }
        }
    }
    
    fs.writeFileSync(newPath, content);
}

// Delete old
for (const oldFile of Object.keys(fileDestinations)) {
    if (fs.existsSync(oldFile) && oldFile !== path.join(baseDir, fileDestinations[oldFile].destRelativePath)) {
         fs.unlinkSync(oldFile);
    }
}

// Delete empty old dirs
function deleteEmpty(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    if (files.length === 0) {
        fs.rmdirSync(dir);
        return;
    }
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            deleteEmpty(fullPath);
        }
    }
    if (fs.readdirSync(dir).length === 0) {
        fs.rmdirSync(dir);
    }
}

deleteEmpty(path.join(baseDir, 'api'));
deleteEmpty(path.join(baseDir, 'ui'));

console.log("Mobile refactoring script completed.");
