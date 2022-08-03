"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const readline = require('readline');
const Package_1 = require("./class/Package");
const general_1 = require("./error/general");
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
        init(lines);
        lineReader.close();
    }
}).on('close', function () {
    lineReader.removeAllListeners();
    process.exit();
});
function init(lines) {
    try {
        const { baseCost, noOfPkgs } = parseDeliveryParams(lines[0]);
        let pkgList = [];
        for (let i = 1; i < noOfPkgs + 1; i++) {
            const { pkgId, pkgWeight, pkgDistance, pkgCoupon } = parsePackageParams(lines[i]);
            const pkg = new Package_1.Package(pkgId, pkgWeight, pkgDistance, pkgCoupon, baseCost);
            pkgList.push(pkg);
        }
        pkgList.forEach(function (pkg) {
            console.log(pkg.id, pkg.discount, pkg.totalCost);
        });
    }
    catch (e) {
        (0, general_1.reportError)({ message: (0, general_1.getErrorMessage)(e) });
    }
}
exports.init = init;
function parseDeliveryParams(param) {
    const deliveryInfo = param.split(" ");
    const baseCost = parseInt(deliveryInfo[0]);
    const noOfPkgs = parseInt(deliveryInfo[1]);
    if (isNaN(baseCost) || isNaN(noOfPkgs)) {
        throw new Error("Please Enter Valid Parameters");
    }
    return { baseCost, noOfPkgs };
}
function parsePackageParams(param) {
    const packageInfo = param.split(" ");
    const pkgId = packageInfo[0];
    const pkgWeight = parseInt(packageInfo[1]);
    const pkgDistance = parseInt(packageInfo[2]);
    const pkgCoupon = packageInfo[3];
    if (isNaN(pkgWeight) || isNaN(pkgDistance)) {
        throw new Error("Please Enter Valid Parameters");
    }
    return { pkgId, pkgWeight, pkgDistance, pkgCoupon };
}
