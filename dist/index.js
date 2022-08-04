"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require('readline');
const package_1 = require("./class/package");
const general_1 = require("./error/general");
const deliveryParams_1 = require("./class/params/deliveryParams");
const packageParams_1 = require("./class/params/packageParams");
const lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function prompt() {
    return new Promise((resolve) => {
        lineReader.on('line', (line) => {
            resolve(line);
        });
    });
}
async function init() {
    try {
        let data = (await prompt()).split(" ");
        const deliveryInfo = new deliveryParams_1.DeliveryParams(data);
        let pkgList = [];
        for (let i = 0; i < deliveryInfo.noOfPkgs; i++) {
            let info = (await prompt()).split(" ");
            const packageInfo = new packageParams_1.PackageParams(info);
            const pkg = new package_1.Package(packageInfo.id, packageInfo.weight, packageInfo.distance, packageInfo.coupon, deliveryInfo.baseCost);
            pkgList.push(pkg);
        }
        let vehicleinfo = (await prompt()).split(" ");
        if (!vehicleinfo[0]) {
            pkgList.forEach(function (pkg) {
                console.log(pkg.id, pkg.discount, pkg.totalCost);
            });
        }
    }
    catch (e) {
        (0, general_1.reportError)({ message: (0, general_1.getErrorMessage)(e) });
    }
}
init().then(() => lineReader.close());
