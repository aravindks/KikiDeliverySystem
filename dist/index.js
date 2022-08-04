"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require('readline');
const package_1 = require("./class/package");
const general_1 = require("./error/general");
const deliveryParams_1 = require("./class/params/deliveryParams");
const packageParams_1 = require("./class/params/packageParams");
const shipmentService_1 = require("./service/shipmentService");
const vehicleParams_1 = require("./class/params/vehicleParams");
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
function output(pkgList) {
    pkgList.forEach(function (pkg) {
        console.log(pkg.id, pkg.discount, pkg.totalCost);
    });
}
async function init() {
    try {
        let pkgList = [];
        let data = (await prompt()).split(" ");
        const deliveryInfo = new deliveryParams_1.DeliveryParams(data);
        for (let i = 0; i < deliveryInfo.noOfPkgs; i++) {
            let info = (await prompt()).split(" ");
            const packageInfo = new packageParams_1.PackageParams(info);
            const pkg = new package_1.Package(packageInfo.id, packageInfo.weight, packageInfo.distance, packageInfo.coupon, deliveryInfo.baseCost);
            pkgList.push(pkg);
        }
        let vehicleinfo = (await prompt()).split(" ");
        if (!vehicleinfo[0]) {
            output(pkgList);
        }
        else {
            let shipmentInfo = new vehicleParams_1.VehicleParams(vehicleinfo);
            let shipmentService = new shipmentService_1.ShipmentService();
            let estimated = shipmentService.estimate(shipmentInfo.noOfVehicles, shipmentInfo.maxSpeed, shipmentInfo.maxWeight, pkgList);
            output(estimated);
        }
    }
    catch (e) {
        (0, general_1.reportError)({ message: (0, general_1.getErrorMessage)(e) });
    }
}
init().then(() => lineReader.close());
