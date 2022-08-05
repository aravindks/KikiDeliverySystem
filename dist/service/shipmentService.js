"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentService = void 0;
const class_1 = require("../class");
class ShipmentService {
    claculateDeliveryTime(noOfVehicles, maxSpeed, maxWeight, pkgList) {
        let shipment = new class_1.Shipment();
        let shipmentList = shipment.createNewShipments(pkgList, maxWeight);
        if (shipmentList.packageLists.length > 0) {
            let shipments = shipment.sortByNoOfPkgs();
            let vehiclesList = new class_1.VehicleList(noOfVehicles, maxSpeed, maxWeight);
            let _orders = [];
            for (let i in shipments) {
                let shipment = shipments[i];
                let maxTime = 0;
                vehiclesList.vehicles = vehiclesList.sortByTime();
                for (let j in shipment.packages) {
                    let order = shipment.packages[j];
                    let timeToDeliver = order.calculateTimeToDeliver(maxSpeed);
                    order.deliveryTime = vehiclesList.vehicles[0].time + timeToDeliver;
                    if (timeToDeliver > maxTime) {
                        maxTime = timeToDeliver;
                    }
                    _orders.push(order);
                }
                vehiclesList.vehicles[0].time += 2 * maxTime;
            }
            pkgList = pkgList.sortById();
            return pkgList;
        }
        pkgList = pkgList.sortById();
        return pkgList;
    }
}
exports.ShipmentService = ShipmentService;
