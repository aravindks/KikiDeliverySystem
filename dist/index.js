"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require('readline');
const Package_1 = require("./class/Package");
const lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
let lines = [];
lineReader.on('line', function (line) {
    let lineStr = line.toString().trim();
    if (lineStr.length) {
        lines.push(lineStr);
    }
    else {
        lineReader.close();
    }
}).on('close', function () {
    init(lines);
});
function init(lines) {
    let temp = lines[0].split(" ");
    let baseCost = parseInt(temp[0]);
    let noOfPkgs = parseInt(temp[1]);
    let pkgList = [];
    for (let i = 1; i < noOfPkgs + 1; i++) {
        const temp = lines[i].split(" ");
        const pkg = new Package_1.Package(temp[0], parseInt(temp[2]), parseInt(temp[1]), temp[3], baseCost);
        pkgList.push(pkg);
    }
    pkgList.forEach(function (pkg) {
        console.log(pkg.id, pkg.discount, pkg.totalCost);
    });
}
