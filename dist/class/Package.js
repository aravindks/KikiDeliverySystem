"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const Offer_1 = require("./Offer");
class Package {
    constructor(id, distance, weight, couponValue = 'NODISCOUNT', basecost) {
        this.id = id;
        this.distance = distance;
        this.weight = weight;
        this.deliveryCost = this.getDeliveryCost(distance, weight, basecost);
        let offer = new Offer_1.Offer(couponValue, distance, weight);
        this.discountFactor = offer.discountFactor;
        this.discount = Math.abs(this.deliveryCost * this.discountFactor);
        this.totalCost = this.deliveryCost - this.discount;
    }
    getDeliveryCost(distance, weight, basecost) {
        return (basecost + (weight * 10) + (distance * 5));
    }
}
exports.Package = Package;
