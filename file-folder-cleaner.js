const fs = require('fs-extra');
const prompt = require('prompt-sync')({
    fake_val: 'OPTIONAL CONFIG VALUES HERE',
});
const { execSync } = require('child_process');

const rootFolder = (() => {
    const SEARCH_PATH = require('dotenv').config().parsed.SEARCH_PATH;
    if (!!SEARCH_PATH) return SEARCH_PATH;
    else throw new Error('SEARCH_PATH not found in .env file');
})();

const paths = [];
const fileExtensions2Delete = './2delete.txt';
const fileExtensions2Keep = './2keep.txt';
const extensions2Delete = (() => {
    try {
        return fs.readFileSync(fileExtensions2Delete).toString().split('\n');
    } catch (error) {
        return [];
    }
})().sort();
const extensions2Keep = (() => {
    try {
        return fs.readFileSync(fileExtensions2Keep).toString().split('\n');
    } catch (error) {
        return [];
    }
})().sort();

let count = 0;

function save2file(filename, extension) {
    if (!fs.existsSync(filename)) {
        console.log(`creating ${filename}...`);
        fs.writeFileSync(filename, '');
        console.log(`created ${filename}`);
    }

    console.log(`saving ${extension} to ${filename}...`);

    fs.writeFileSync(
        filename,
        `${fs.readFileSync(filename).toString().trim()}\n${extension}`,
    );
    console.log(`saved ${extension} to ${filename}`);
}

function work(parentFolder) {
    count++;

    fs.readdirSync(parentFolder).forEach((folder) => {
        const filePath = `${parentFolder}/${folder}`;
        const isDirectory = fs.statSync(filePath).isDirectory();
        console.log(`(${isDirectory ? 'D' : 'F'}) checking ${filePath}`);

        if (isDirectory) {
            handleDirectory(filePath);
        } else {
            handleFile(filePath);
        }
    });

    console.log(`count: ${count}`);

    while (paths.length > 0) work(paths.shift());
}

function handleDirectory(directoryPath) {
    paths.push(directoryPath);
    console.log(`paths: ${paths.length}`);
}

function handleFile(filePath) {
    const extension = filePath.split('.').pop();
    console.log(`extension: ${extension}`);

    if (shouldDeleteExtension(extension)) {
        const mustDeleteExtension = prompt(
            `\n\nDelete extension ${extension}? (y/n)?\n`,
        );

        if (mustDeleteExtension === 'y') {
            deleteExtension(extension);
        } else {
            keepExtension(extension);
        }
    }

    if (extensions2Delete.includes(extension)) {
        deleteFile(filePath);
    }
}

function shouldDeleteExtension(extension) {
    return (
        extensions2Delete.indexOf(extension) === -1 &&
        extensions2Keep.indexOf(extension) === -1
    );
}

function deleteExtension(extension) {
    extensions2Delete.push(extension);
    console.log(`extensions2Delete: ${extensions2Delete}`);
    save2file(fileExtensions2Delete, extension);
}

function keepExtension(extension) {
    extensions2Keep.push(extension);
    console.log(`extensions2Keep: ${extensions2Keep}`);
    save2file(fileExtensions2Keep, extension);
}

function deleteFile(filePath) {
    console.log(`XXX deleting ${filePath}`);
    fs.rmSync(filePath);
    console.log(`XXX deleted ${filePath}`);
}

console.log('deleting empty folders...');
execSync(`find ${rootFolder} -type d -empty -delete`);
console.log('deleted empty folders');

work(rootFolder);

console.log('deleting empty folders...');
execSync(`find ${rootFolder} -type d -empty -delete`);
console.log('deleted empty folders');
