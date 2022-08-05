"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageList = void 0;
class PackageList {
    constructor() {
        this.packages = [];
    }
    sortByWeight() {
        this.packages.sort((a, b) => b.weight - a.weight);
        return this;
    }
    sortById() {
        this.packages.sort((a, b) => a.id.localeCompare(b.id));
        return this;
    }
    printWithDeliveryTime() {
        this.packages.forEach(function (pkg) {
            console.log(pkg.id, pkg.discount.toFixed(2), pkg.totalCost.toFixed(2), pkg.deliveryTime.toFixed(2));
        });
    }
    printWithoutDeliveryTime() {
        this.packages.forEach(function (pkg) {
            console.log(pkg.id, pkg.discount.toFixed(2), pkg.totalCost.toFixed(2));
        });
    }
}
exports.PackageList = PackageList;