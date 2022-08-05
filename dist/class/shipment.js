"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shipment = void 0;
const packageList_1 = require("./package/packageList");
class Shipment {
    constructor() {
        this.packageLists = [];
    }
    sortByNoOfPkgs() {
        return this.packageLists.sort((a, b) => b.packages.length - a.packages.length);
    }
    createNewShipments(pkgList, maxWeight) {
        pkgList = pkgList.sortByWeight();
        this.packageLists = [];
        let counter = 0;
        while (counter < pkgList.packages.length) {
            let containerWeight = 0;
            let container = new packageList_1.PackageList();
            for (let i = counter; i < pkgList.packages.length; i++) {
                if (pkgList.packages[i].weight > maxWeight) {
                    counter++;
                    break;
                }
                if (containerWeight + pkgList.packages[i].weight > maxWeight) {
                    break;
                }
                counter++;
                containerWeight += pkgList.packages[i].weight;
                container.packages.push(pkgList.packages[i]);
            }
            if (container.packages.length > 0) {
                this.packageLists.push(container);
            }
        }
        return this;
    }
}
exports.Shipment = Shipment;
