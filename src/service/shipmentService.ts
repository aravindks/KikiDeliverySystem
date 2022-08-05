import { PackageList } from '../class/packageList';
import { VehicleList } from '../class/vehicleList';

export class ShipmentService {
  claculateDeliveryTime(
    noOfVehicles: number,
    maxSpeed: number,
    maxWeight: number,
    pkgList: PackageList
  ): PackageList {
    pkgList = pkgList.sortByWeight();
    let shipments = [];
    let counter = 0;
    while (counter < pkgList.packages.length) {
      let containerWeight = 0;
      let container = [];

      for (let i = counter; i < pkgList.packages.length; i++) {
        if(pkgList.packages[i].weight > maxWeight){
          counter++;
          break;
        }
        if (containerWeight + pkgList.packages[i].weight > maxWeight) {
          break;
        }
        counter++;
        containerWeight += pkgList.packages[i].weight;
        container.push(pkgList.packages[i]);
      }
      if(container.length > 0){
        shipments.push(container);
      } 
    }
    if(shipments.length > 0){
      shipments = shipments.sort((a, b) => b.length - a.length);
      let vehiclesList = new VehicleList(noOfVehicles, maxSpeed, maxWeight);
  
      let _orders = [];
  
      for (var i in shipments) {
        let shipment = shipments[i];
  
        vehiclesList.vehicles = vehiclesList.sortByTime();
        let maxTime = 0;
        for (let j in shipment) {
          let order = shipment[j];
          let timeForOrder = order.distance / maxSpeed;
          order.deliveryTime = vehiclesList.vehicles[0].time + timeForOrder;
  
          if (timeForOrder > maxTime) {
            maxTime = timeForOrder;
          }
          _orders.push(order);
        }
        vehiclesList.vehicles[0].time += 2 * maxTime;
      }
      pkgList = pkgList.sortById();
      return pkgList;
    }
    pkgList = pkgList.sortById();
    return pkgList;
  }
}
