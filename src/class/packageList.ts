import { Package } from "./package";

export class PackageList {
  packages: Package[];

  constructor() {
    this.packages = [];
  }

  printWithDeliveryTime(){
    this.packages.forEach(function (pkg) {
      console.log(
        pkg.id,
        pkg.discount.toFixed(2),
        pkg.totalCost.toFixed(2),
        pkg.deliveryTime.toFixed(2)
      );
    })
  }

  printWithoutDeliveryTime(){
    this.packages.forEach(function (pkg) {
      console.log(
        pkg.id,
        pkg.discount.toFixed(2),
        pkg.totalCost.toFixed(2),
      );
    })
  }
}