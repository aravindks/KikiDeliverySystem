"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require('readline');
const package_1 = require("./class/package");
const general_1 = require("./error/general");
const deliveryParams_1 = require("./class/params/deliveryParams");
const packageParams_1 = require("./class/params/packageParams");
const shipmentService_1 = require("./service/shipmentService");
const vehicleParams_1 = require("./class/params/vehicleParams");
const packageList_1 = require("./class/packageList");
const lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function prompt() {
    return new Promise((resolve) => {
        lineReader.on('line', (line) => {
            resolve(line);
        });
    });
}
function output(pkgList, displayDeliveryTime) {
    pkgList.forEach(function (pkg) {
        displayDeliveryTime ? console.log(pkg.id, pkg.discount.toFixed(2), pkg.totalCost.toFixed(2), pkg.deliveryTime.toFixed(2)) : console.log(pkg.id, pkg.discount.toFixed(2), pkg.totalCost.toFixed(2));
    });
}
async function init() {
    try {
        let pkgList = new packageList_1.PackageList();
        let displayDeliveryTime = false;
        let data = (await prompt()).split(' ');
        const deliveryInfo = new deliveryParams_1.DeliveryParams(data);
        for (let i = 0; i < deliveryInfo.noOfPkgs; i++) {
            let info = (await prompt()).split(' ');
            const packageInfo = new packageParams_1.PackageParams(info);
            const pkg = new package_1.Package(packageInfo.id, packageInfo.weight, packageInfo.distance, packageInfo.coupon, deliveryInfo.baseCost);
            pkgList.packages.push(pkg);
        }
        let vehicleinfo = (await prompt()).split(' ');
        if (!vehicleinfo[0]) {
            pkgList.printWithoutDeliveryTime();
        }
        else {
            let shipmentInfo = new vehicleParams_1.VehicleParams(vehicleinfo);
            let shipmentService = new shipmentService_1.ShipmentService();
            let estimated = shipmentService.claculateDeliveryTime(shipmentInfo.noOfVehicles, shipmentInfo.maxSpeed, shipmentInfo.maxWeight, pkgList.packages);
            displayDeliveryTime = true;
            output(estimated, displayDeliveryTime);
        }
    }
    catch (e) {
        (0, general_1.reportError)({ message: (0, general_1.getErrorMessage)(e) });
    }
}
init().then(() => lineReader.close());
