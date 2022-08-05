"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require('readline');
const class_1 = require("./class");
const shipmentService_1 = require("./service/shipmentService");
const general_1 = require("./error/general");
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
async function init() {
    try {
        let pkgList = new class_1.PackageList();
        let data = (await prompt()).split(' ');
        const deliveryInfo = new class_1.DeliveryParams(data);
        for (let i = 0; i < deliveryInfo.noOfPkgs; i++) {
            let info = (await prompt()).split(' ');
            const packageInfo = new class_1.PackageParams(info);
            const pkg = new class_1.Package(packageInfo.id, packageInfo.weight, packageInfo.distance, packageInfo.coupon, deliveryInfo.baseCost);
            pkgList.packages.push(pkg);
        }
        let vehicleinfo = (await prompt()).split(' ');
        if (!vehicleinfo[0]) {
            pkgList.printWithoutDeliveryTime();
        }
        else {
            let shipmentInfo = new class_1.VehicleParams(vehicleinfo);
            let shipmentService = new shipmentService_1.ShipmentService();
            let etaEstimatedPkgs = shipmentService.claculateDeliveryTime(shipmentInfo.noOfVehicles, shipmentInfo.maxSpeed, shipmentInfo.maxWeight, pkgList);
            etaEstimatedPkgs.printWithDeliveryTime();
        }
    }
    catch (e) {
        (0, general_1.reportError)({ message: (0, general_1.getErrorMessage)(e) });
    }
}
init().then(() => lineReader.close());
