"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryParams = void 0;
const errorMessages_1 = require("../../util/errorMessages");
class DeliveryParams {
    constructor(param) {
        this.baseCost = parseInt(param[0]);
        this.noOfPkgs = parseInt(param[1]);
        if (isNaN(this.baseCost) || isNaN(this.noOfPkgs)) {
            throw new Error(errorMessages_1.ErrorMessages.INVALIDPARAM);
        }
    }
}
exports.DeliveryParams = DeliveryParams;
