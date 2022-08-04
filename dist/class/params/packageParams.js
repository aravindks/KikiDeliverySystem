"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageParams = void 0;
const errorMessages_1 = require("../../util/errorMessages");
class PackageParams {
    constructor(params) {
        this.id = params[0];
        this.weight = parseInt(params[1]);
        this.distance = parseInt(params[2]);
        this.coupon = params[3];
        if (isNaN(this.weight) || isNaN(this.distance)) {
            throw new Error(errorMessages_1.ErrorMessages.INVALIDPARAM);
        }
    }
}
exports.PackageParams = PackageParams;
