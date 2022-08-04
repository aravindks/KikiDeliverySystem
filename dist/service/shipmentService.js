"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentService = void 0;
class ShipmentService {
    estimate(noOfVehicles, maxSpeed, maxWeight, pkgs) {
        console.log(1);
        pkgs = pkgs.sort((a, b) => b.weight - a.weight);
        let shipments = [];
        let counter = 0;
        while (counter < pkgs.length) {
            let containerWeight = 0;
            let container = [];
            console.log(2);
            for (let i = counter; i < pkgs.length; i++) {
                if (containerWeight + pkgs[i].weight > maxWeight) {
                    break;
                }
                counter++;
                containerWeight += pkgs[i].weight;
                container.push(pkgs[i]);
            }
            shipments.push(container);
        }
        console.log(3);
        shipments = shipments.sort((a, b) => b.length - a.length);
        let vehicles = new Array(noOfVehicles);
        vehicles.fill(0);
        let _orders = [];
        for (var i in shipments) {
            let shipment = shipments[i];
            vehicles = vehicles.sort((a, b) => a - b);
            let maxTime = 0;
            for (let j in shipment) {
                let order = shipment[j];
                let timeForOrder = (order.distance / maxSpeed);
                order.deliveryTime = vehicles[0] + (timeForOrder);
                if (timeForOrder > maxTime) {
                    maxTime = timeForOrder;
                }
                _orders.push(order);
            }
            vehicles[0] += 2 * maxTime;
        }
        return pkgs;
    }
}
exports.ShipmentService = ShipmentService;
