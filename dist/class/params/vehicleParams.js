"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleParams = void 0;
const errorMessages_1 = require("../../util/errorMessages");
class VehicleParams {
    constructor(param) {
        this.noOfVehicles = parseInt(param[0]);
        this.maxSpeed = parseInt(param[1]);
        this.maxWeight = parseInt(param[1]);
        if (isNaN(this.noOfVehicles) || isNaN(this.maxSpeed) || isNaN(this.maxWeight)) {
            throw new Error(errorMessages_1.ErrorMessages.INVALIDPARAM);
        }
    }
}
exports.VehicleParams = VehicleParams;
