const e = require('express');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

function createFolderAndFiles(name) {
    console.log(`Creating new controller and router for: ${name}`);

    const dirPath = path.join(process.cwd(), 'src', 'app', name);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const upName = name.charAt(0).toUpperCase() + name.slice(1);
    const subName = name.toLowerCase();

    const scriptPath = path.dirname(fs.realpathSync(__filename));
    const controllerTemplatePath = path.join(scriptPath, 'templates', 'controller.js');
    let controllerContent = fs.readFileSync(controllerTemplatePath, 'utf8');
    controllerContent = controllerContent.replace(/\[upName\]/g, upName).replace(/\[subName\]/g, subName);

    const routerTemplatePath = path.join(scriptPath, 'templates', 'router.js');
    let routerContent = fs.readFileSync(routerTemplatePath, 'utf8');
    routerContent = routerContent.replace(/\[upName\]/g, upName).replace(/\[subName\]/g, subName);

    fs.writeFileSync(path.join(dirPath, `${subName}.controller.ts`), controllerContent);
    fs.writeFileSync(path.join(dirPath, `${subName}.router.ts`), routerContent);

    console.log(`Controller and router for ${name} created successfully.`);
}

function askToAddToRouter(name) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Do you want to add this to ./src/router.ts automatically? (yes/no) ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            addToRouter(name);
        }
        else {
            console.log('Skipped. Please add the router to ./src/router.ts manually.');
        }
        rl.close();
    });
}

function addToRouter(name) {
    const routerPath = path.join(process.cwd(), 'src', 'router.ts');
    const importLine = `import ${name}Router from './app/${name}/${name}.router';\n`;
    const useLine = `    router.use('/${name}', ${name}Router),\n`;

    let routerContent = fs.readFileSync(routerPath, 'utf8');
    const lastImportIndex = routerContent.lastIndexOf('import');
    const endOfLastImportIndex = routerContent.indexOf('\n', lastImportIndex);
    routerContent = routerContent.slice(0, endOfLastImportIndex) + '\n' + importLine + routerContent.slice(endOfLastImportIndex);

    const arrayEndIndex = routerContent.lastIndexOf('])');
    routerContent = routerContent.slice(0, arrayEndIndex) + useLine + routerContent.slice(arrayEndIndex);

    fs.writeFileSync(routerPath, routerContent);
    console.log(`Added ${name}Router to ./src/router.ts successfully.`);
}

const folderName = process.argv[2];
createFolderAndFiles(folderName);
askToAddToRouter(folderName);