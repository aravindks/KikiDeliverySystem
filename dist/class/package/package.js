"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const offer_1 = require("../offer");
const constants_1 = require("../../util/constants");
const coupon_1 = require("../../util/coupon");
class Package {
    constructor(id, weight, distance, couponValue = coupon_1.Coupon.NODISCOUNT.text, basecost) {
        this.COST_PER_WEIGHT = constants_1.CONSTANT.TEN;
        this.COST_PER_DISTANCE = constants_1.CONSTANT.FIVE;
        this.id = id;
        this.distance = distance;
        this.weight = weight;
        this.deliveryCost = this.getDeliveryCost(basecost);
        let offer = new offer_1.Offer(couponValue, distance, weight);
        this.discountFactor = offer.discountFactor;
        this.discount = Math.abs(this.deliveryCost * this.discountFactor);
        this.totalCost = this.deliveryCost - this.discount;
        this.deliveryTime = constants_1.CONSTANT.ZERO;
    }
    getDeliveryCost(basecost) {
        return basecost + this.weight * this.COST_PER_WEIGHT + this.distance * this.COST_PER_DISTANCE;
    }
    calculateTimeToDeliver(maxSpeed) {
        return (this.distance / maxSpeed);
    }
}
exports.Package = Package;
