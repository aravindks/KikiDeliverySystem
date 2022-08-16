import { MaxSubSetCalculator } from '../util/maxSubsetCalculator'
import { PackageList, VehicleList } from '../class'

export class ShipmentService {
  public claculateDeliveryTime(
    noOfVehicles: number,
    maxSpeed: number,
    maxWeight: number,
    pkgList: PackageList
  ): PackageList {
    let vehicles = new VehicleList(noOfVehicles, maxSpeed, maxWeight)
    while (this._anyPackageLeftForDelivery(pkgList)) {
      let freeVehicle = vehicles.getFreeVehicle()
      let packagesToDispatch = this._getShipmentToDispatch(pkgList, maxWeight)
      let maxDistance = 0
      if (freeVehicle) {
        for (let i in packagesToDispatch.packages) {
          let order = packagesToDispatch.packages[i]
          maxDistance = Math.max(maxDistance, order.distance)
          let pkgIndex = pkgList.packages.findIndex(
            (val) => val.id === order.id
          )
          pkgList.packages[pkgIndex].deliveryTime =
            freeVehicle.timeTravelled + order.calculateTimeToDeliver(maxSpeed)
          pkgList.packages[pkgIndex].isDelivered = true
        }
        // since vehicle has to go back to pickup location, it traverses the way 2 times
        freeVehicle.timeTobeFree = (maxDistance * 2) / maxSpeed
      }
    }
    return pkgList
  }

  private _getShipmentToDispatch(
    pkgList: PackageList,
    maxWeight: number
  ): PackageList {
    let selectedPkgList = new PackageList()
    let weightsList = pkgList.packages
      .filter((val) => !val.isDelivered)
      .map((pkg) => pkg.weight)
    let maxSubSetCalulator = new MaxSubSetCalculator()
    let selectedWeights = maxSubSetCalulator.getMaxSubsetLessThan(
      weightsList,
      maxWeight
    )
    for (let i = 0; i < selectedWeights.length; i++) {
      let pkgsWithSameWeight = pkgList.packages.filter(
        (pkg) => pkg.weight === selectedWeights[i] && pkg.isAvailable
      )
      if (pkgsWithSameWeight.length === 1) {
        pkgsWithSameWeight[0].isAvailable = false
        selectedPkgList.packages.push(pkgsWithSameWeight[0])
      } else {
        pkgsWithSameWeight = pkgsWithSameWeight
          .filter((pkg) => pkg.isAvailable)
          .sort((a, b) => a.distance - b.distance)
        pkgsWithSameWeight[0].isAvailable = false
        selectedPkgList.packages.push(pkgsWithSameWeight[0])
      }
    }
    let sortedByDistance = selectedPkgList.sortByDistance()
    return sortedByDistance
  }

  private _anyPackageLeftForDelivery(pkgList: PackageList): boolean {
    let pkgs = pkgList.packages.filter((pkg) => !pkg.isDelivered)
    if (pkgs.length > 0) {
      return true
    } else {
      return false
    }
  }
}
