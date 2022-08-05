import { Package } from 'src/class/package'
import { VehicleList } from '../class/vehicleList';

export class ShipmentService {
  claculateDeliveryTime(
    noOfVehicles: number,
    maxSpeed: number,
    maxWeight: number,
    pkgs: Package[]
  ) {
    pkgs = pkgs.sort((a, b) => b.weight - a.weight);
    let shipments = [];
    let counter = 0;
    while (counter < pkgs.length) {
      let containerWeight = 0;
      let container = [];

      for (let i = counter; i < pkgs.length; i++) {
        if(pkgs[i].weight > maxWeight){
          counter++;
          break;
        }
        if (containerWeight + pkgs[i].weight > maxWeight) {
          break;
        }
        counter++;
        containerWeight += pkgs[i].weight;
        container.push(pkgs[i]);
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
      pkgs = pkgs.sort((a, b) => a.id.localeCompare(b.id));
      return pkgs;
    }
    pkgs = pkgs.sort((a, b) => a.id.localeCompare(b.id));
    return pkgs;
  }
}
