import { Package } from './package'

export class PackageList {
  packages: Package[]

  constructor() {
    this.packages = []
  }

  sortByWeight(): PackageList {
    this.packages.sort((a, b) => a.weight - b.weight)
    return this
  }

  sortByDistance(): PackageList {
    this.packages.sort((a, b) => b.distance - a.distance)
    return this
  }

  sortById(): PackageList {
    this.packages.sort((a, b) => a.id.localeCompare(b.id))
    return this
  }

  printWithDeliveryTime(): void {
    this.packages.forEach(function (pkg) {
      console.log(
        pkg.id,
        pkg.discount.toFixed(2),
        pkg.totalCost.toFixed(2),
        pkg.deliveryTime.toFixed(2)
      )
    })
  }

  printWithoutDeliveryTime(): void {
    this.packages.forEach(function (pkg) {
      console.log(pkg.id, pkg.discount.toFixed(2), pkg.totalCost.toFixed(2))
    })
  }
}
