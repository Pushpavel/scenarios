#!/usr/bin/env node

const fs = require('fs');
const {execSync} = require('child_process')
const readline = require('readline');

main();

async function main() {

    const scenarioName = process.argv[2];

    if (!scenarioName) {
        console.error('Firebase Function name not provided !');
        process.exit(1);
    }

    const firebasePath = process.cwd() + '\\firebase.json';
    const clientPath = process.argv[1].slice(0, process.argv[1].length - 8) + 'client\\index.js';
    const scenariosFirebasePath = process.cwd() + '\\scenarios.temp.json';
    const generatedPath = process.cwd() + '\\scenarios\\generated\\' + scenarioName;

    let raw;

    try {
        raw = fs.readFileSync(firebasePath);
    } catch (e) {
        console.error(firebasePath + " not Found !");
        process.exit(1);
    }


    const json = JSON.parse(raw.toString());

    json.functions = json.functions ?? {};
    json.functions.source = 'scenarios';

    try {
        const dir = fs.readdirSync(generatedPath);
        if (dir.length) {
            const rl = readline.createInterface({
                input: process.stdin, //or fileStream
                output: process.stdout
            });

            const r = await new Promise(resolve =>
                rl.question(
                    'scenarios/generated/'
                    + scenarioName
                    + ' is not empty! Are you sure want to overwrite ? (Y/n) '
                    , resolve)
            );

            if (r !== 'Y' && r !== 'y')
                process.exit();
        }
    } catch (e) {
        // ignore
    }
    fs.rmdirSync(generatedPath, {recursive: true});
    fs.mkdirSync(generatedPath, {recursive: true});

    fs.writeFileSync(scenariosFirebasePath, JSON.stringify(json));


    try {
        execSync(
            `firebase emulators:exec "node \\"${clientPath}\\" ${scenarioName} ${json.emulators.functions.port}" --config=scenarios.temp.json --export-on-exit=${generatedPath}`,
            {stdio: [process.stdin, process.stdout, process.stderr]}
        );
    } catch (e) {
        // ignored
    } finally {
        fs.unlinkSync(scenariosFirebasePath);
    }
}
