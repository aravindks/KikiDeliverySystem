"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
class Package {
    constructor(id, distance, weight, offer, basecost) {
        this.id = id;
        this.distance = distance;
        this.weight = weight;
        this.cost = this.getTotalCost(distance, weight, offer, basecost);
    }
    getTotalCost(distance, weight, offer, basecost) {
        return 10;
    }
}
exports.Package = Package;
