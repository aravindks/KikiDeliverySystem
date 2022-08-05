"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const coupon_1 = require("../util/coupon");
class Offer {
    constructor(offer, distance, weight) {
        this.value = coupon_1.Coupon.hasOwnProperty(offer.toUpperCase())
            ? offer.toUpperCase()
            : coupon_1.Coupon.NODISCOUNT.text;
        this.discountFactor = this.getDiscountedFactor(distance, weight);
    }
    getDiscountedFactor(distance, weight) {
        let applicableOffer = coupon_1.Coupon[this.value];
        if (this.isDiscountApplicable(applicableOffer, distance, weight)) {
            return applicableOffer.value;
        }
        return 0;
    }
    isDiscountApplicable(applicableOffer, distance, weight) {
        return (weight <= applicableOffer.maxWeight &&
            weight >= applicableOffer.minWeight &&
            distance <= applicableOffer.maxDistance &&
            distance >= applicableOffer.minDistance);
    }
}
exports.Offer = Offer;
