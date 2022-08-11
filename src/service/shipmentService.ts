import { MaxSubSetCalculator } from '../util/maxSubsetCalculator'
import { Shipment, PackageList, VehicleList } from '../class'

export class ShipmentService {
  claculateDeliveryTime(
    noOfVehicles: number,
    maxSpeed: number,
    maxWeight: number,
    pkgList: PackageList
  ): PackageList {
    let shipmentList = new Shipment()
    shipmentList = this.createNewShipments(pkgList, maxWeight)
    console.log("shipmentlist", JSON.stringify(shipmentList.packageLists));
    if (shipmentList.packageLists.length > 0) {
      let shipments = shipmentList.sortByNoOfPkgs()
      let vehiclesList = new VehicleList(noOfVehicles, maxSpeed, maxWeight)
      let _orders = []
      for (let i in shipments) {
        let shipment = shipments[i]
        let maxTime = 0
        vehiclesList.vehicles = vehiclesList.sortByTime()
        for (let j in shipment.packages) {
          let order = shipment.packages[j]
          let timeToDeliver = order.calculateTimeToDeliver(maxSpeed)
          order.deliveryTime = vehiclesList.vehicles[0].time + timeToDeliver

          if (timeToDeliver > maxTime) {
            maxTime = timeToDeliver
          }
          _orders.push(order)
        }
        // since vehicle has to go back to pickup location, it traverses the way 2 times
        vehiclesList.vehicles[0].time += 2 * maxTime
      }
      pkgList = pkgList.sortById()
      return pkgList
    }
    pkgList = pkgList.sortById()
    return pkgList
  }

  createNewShipments(pkgList: PackageList, maxWeight: number): Shipment {
    let selectedPackageList = new PackageList();
    let shipment = new Shipment();
    while(this._isPackageAvailable(pkgList)){
      selectedPackageList = this._getPackagesToDispatch(pkgList, maxWeight);
      selectedPackageList.packages.forEach(function(pkg){
        let index = pkgList.packages.findIndex((val) => val.id === pkg.id)
        pkgList.packages[index].isDelivered = true;
      })
      shipment.packageLists.push(selectedPackageList);
    }
    return shipment;
  }

  _getPackagesToDispatch(pkgList: PackageList, maxWeight: number){
    let selectedPkgList = new PackageList();
    let weightsList = pkgList.packages.filter((val) => !val.isDelivered).map((pkg) => pkg.weight);
    let maxSubSetCalulator = new MaxSubSetCalculator();
    let selectedWeights = maxSubSetCalulator.getMaxSubsetLessThan(weightsList, maxWeight+1);
    for(let i =0; i < selectedWeights.length ; i++){
      let pkgsWithSameWeight = pkgList.packages.filter((pkg) => pkg.weight === selectedWeights[i] && pkg.isAvailable )
      if(pkgsWithSameWeight.length ===1){
        pkgsWithSameWeight[0].isAvailable = false;
        selectedPkgList.packages.push(pkgsWithSameWeight[0])
      } else {
        pkgsWithSameWeight = pkgsWithSameWeight.filter((pkg)=> pkg.isAvailable).sort((a,b)=> a.distance - b.distance);
        pkgsWithSameWeight[0].isAvailable = false;
        selectedPkgList.packages.push(pkgsWithSameWeight[0]);
      }
    }
    let sortedByDistance = selectedPkgList.sortByDistance();
    return sortedByDistance;
  }
  _isPackageAvailable(pkgList: PackageList){
    let pkgs = pkgList.packages.filter((pkg) => !pkg.isDelivered)
    if(pkgs.length > 0){
      return true;
    } else {
      return false
    }
  }
}
