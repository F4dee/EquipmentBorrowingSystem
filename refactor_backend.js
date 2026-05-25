const fs = require('fs');
const path = require('path');

const baseDir = 'equipmentborrowingsystem/src/main/java/edu/cit/lastname/equipmentborrowingsystem';
const basePkg = 'edu.cit.lastname.equipmentborrowingsystem';

const fileMap = {
    // Controllers
    'controller/AdminController.java': 'features/admin',
    'controller/AuthController.java': 'features/auth',
    'controller/CartController.java': 'features/cart',
    'controller/EquipmentController.java': 'features/equipment',
    'controller/RequestController.java': 'features/borrowing',
    'controller/TicketController.java': 'features/maintenance',

    // DTOs
    'dto/ApiError.java': 'core/dto',
    'dto/ApiResponse.java': 'core/dto',
    'dto/AuthRequest.java': 'features/auth',
    'dto/AuthResponse.java': 'features/auth',
    'dto/CreateRequestDTO.java': 'features/borrowing',

    // Entities
    'entity/BorrowingRequest.java': 'features/borrowing',
    'entity/Equipment.java': 'features/equipment',
    'entity/MaintenanceTicket.java': 'features/maintenance',
    'entity/User.java': 'features/user',

    // Repositories
    'repository/EquipmentRepository.java': 'features/equipment',
    'repository/RequestRepository.java': 'features/borrowing',
    'repository/TicketRepository.java': 'features/maintenance',
    'repository/UserRepository.java': 'features/user',

    // Security
    'security/JwtAuthenticationFilter.java': 'core/security',
    'security/JwtUtils.java': 'core/security',
    'security/SecurityConfig.java': 'core/config',
    'security/UserDetailsServiceImpl.java': 'core/security',

    // Exception
    'exception/GlobalExceptionHandler.java': 'core/exception', // Note: Need to check if exists, fallback to reading directory

    // Config
    'config/DatabaseSeeder.java': 'core/config',
    'config/WebConfig.java': 'core/config', // check if exists

    // Services
    'service/adapter/CsvExportAdapter.java': 'features/admin',
    'service/adapter/ExportAdapter.java': 'features/admin',
    'service/facade/BorrowingFacade.java': 'features/borrowing',
    'service/notification/BorrowingEventPublisher.java': 'features/borrowing',
    'service/notification/BorrowingObserver.java': 'features/borrowing',
    'service/notification/EmailNotificationObserver.java': 'features/borrowing',
    'service/penalty/FacultyPenaltyStrategy.java': 'features/admin',
    'service/penalty/PenaltyContext.java': 'features/admin',
    'service/penalty/PenaltyStrategy.java': 'features/admin',
    'service/penalty/StandardPenaltyStrategy.java': 'features/admin',
};

// Also scan all files in old directories and move them if they were missed.
const oldDirs = ['controller', 'dto', 'entity', 'repository', 'security', 'exception', 'config', 'service'];

const targetMap = {};

// Ensure directories exist
for (const [file, dest] of Object.entries(fileMap)) {
    const destDir = path.join(baseDir, dest);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
}

// Recursively find all java files
function getAllFiles(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, fileList);
        } else if (fullPath.endsWith('.java')) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

const allOldFiles = [];
for (const dir of oldDirs) {
    allOldFiles.push(...getAllFiles(path.join(baseDir, dir)));
}

const fileDestinations = {};
for (const oldFile of allOldFiles) {
    const relativePath = path.relative(baseDir, oldFile).replace(/\\/g, '/');
    let dest = fileMap[relativePath];
    if (!dest) {
        // Fallback generic mapping based on old folder
        if (relativePath.startsWith('exception')) dest = 'core/exception';
        else if (relativePath.startsWith('config')) dest = 'core/config';
        else if (relativePath.startsWith('dto')) dest = 'core/dto';
        else dest = 'core/shared'; // just in case
    }
    
    fileDestinations[oldFile] = {
        destRelativePath: path.join(dest, path.basename(oldFile)).replace(/\\/g, '/'),
        destPkg: `${basePkg}.${dest.replace(/\//g, '.')}`,
        oldPkg: `${basePkg}.${path.dirname(relativePath).replace(/\//g, '.')}`
    };
    
    // Create dir if needed
    const destDirPath = path.join(baseDir, dest);
    if (!fs.existsSync(destDirPath)) {
        fs.mkdirSync(destDirPath, { recursive: true });
    }
}

// We need a mapping from class name to its new package to rewrite imports
const classToNewPkg = {};
for (const [oldPath, info] of Object.entries(fileDestinations)) {
    const className = path.basename(oldPath, '.java');
    classToNewPkg[className] = info.destPkg;
}

// Move files and rewrite package/imports
for (const [oldPath, info] of Object.entries(fileDestinations)) {
    const newPath = path.join(baseDir, info.destRelativePath);
    let content = fs.readFileSync(oldPath, 'utf8');
    
    // Replace package
    content = content.replace(/^package\s+[\w.]+;/m, `package ${info.destPkg};`);
    
    // Replace imports
    // We want to replace any import that matched the old package structure.
    // Instead of regexing all possibilities, we'll find existing imports from our base package
    // and replace them if we moved the class.
    
    const importRegex = new RegExp(`^import\\s+${basePkg.replace(/\./g, '\\.')}\\.([\\w.]+)\\.([\\w]+);`, 'gm');
    content = content.replace(importRegex, (match, oldSubPkg, className) => {
        if (classToNewPkg[className]) {
            return `import ${classToNewPkg[className]}.${className};`;
        }
        return match; // Fallback
    });
    
    // Also, we might have references to classes that are now in different packages but were previously in the same package
    // so no import was needed! 
    // To fix this, we can just blindly add imports for any class that is in our project if it's used in this file and not in the same package.
    for (const [className, newPkg] of Object.entries(classToNewPkg)) {
        if (newPkg !== info.destPkg && content.includes(className)) {
            // Check if it's already imported
            const expectedImport = `import ${newPkg}.${className};`;
            if (!content.includes(expectedImport) && !content.includes(`import ${newPkg}.*;`)) {
                // Add import after package declaration
                content = content.replace(/^package\s+[\w.]+;/m, `$&\\nimport ${newPkg}.${className};`);
            }
        }
    }
    
    fs.writeFileSync(newPath, content);
}

// Delete old directories (if empty)
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
    // Check again
    if (fs.readdirSync(dir).length === 0) {
        fs.rmdirSync(dir);
    }
}

for (const dir of oldDirs) {
    const fullDir = path.join(baseDir, dir);
    if (fs.existsSync(fullDir)) {
        // delete all remaining java files just in case (we already copied them)
        // Actually, let's just delete the old files that we processed.
    }
}

for (const oldFile of Object.keys(fileDestinations)) {
    if (fs.existsSync(oldFile) && oldFile !== path.join(baseDir, fileDestinations[oldFile].destRelativePath)) {
         fs.unlinkSync(oldFile);
    }
}

for (const dir of oldDirs) {
    deleteEmpty(path.join(baseDir, dir));
}

console.log("Backend refactoring script completed.");
