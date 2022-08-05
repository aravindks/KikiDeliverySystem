"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleList = void 0;
const vehicle_1 = require("./vehicle");
class VehicleList {
    constructor(numberOfVehicles, speed, maxWeight) {
        let vehicles = [];
        for (let i = 0; i < numberOfVehicles; i++) {
            vehicles[i] = new vehicle_1.Vehicle(speed, maxWeight);
        }
        this.vehicles = vehicles;
    }
    sortByTime() {
        return this.vehicles.sort((a, b) => a.time - b.time);
    }
}
exports.VehicleList = VehicleList;
