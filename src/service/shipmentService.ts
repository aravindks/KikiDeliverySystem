import { Shipment, PackageList, VehicleList } from '../class';

export class ShipmentService {
  claculateDeliveryTime(
    noOfVehicles: number,
    maxSpeed: number,
    maxWeight: number,
    pkgList: PackageList
  ): PackageList {
    let shipment = new Shipment();
    let shipmentList = shipment.createNewShipments(pkgList, maxWeight);

    if(shipmentList.packageLists.length > 0){
      let shipments = shipment.sortByNoOfPkgs();
      let vehiclesList = new VehicleList(noOfVehicles, maxSpeed, maxWeight);
      let _orders = [];
  
      for (let i in shipments) {
        let shipment = shipments[i];
        let maxTime = 0;
        vehiclesList.vehicles = vehiclesList.sortByTime();
        for (let j in shipment.packages) {
          let order = shipment.packages[j];
          let timeToDeliver = order.calculateTimeToDeliver(maxSpeed);
          order.deliveryTime = vehiclesList.vehicles[0].time + timeToDeliver;
  
          if (timeToDeliver > maxTime) {
            maxTime = timeToDeliver;
          }
          _orders.push(order);
        }
        // since vehicle has to go back to pickup location, it traverses the way 2 times
        vehiclesList.vehicles[0].time += 2 * maxTime;
      }
      pkgList = pkgList.sortById();
      return pkgList;
    }
    pkgList = pkgList.sortById();
    return pkgList;
  }
}
