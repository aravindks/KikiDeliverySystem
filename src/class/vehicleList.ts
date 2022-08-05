import { Vehicle } from "./vehicle";

export class VehicleList {
  vehicles: Vehicle[];

  constructor(numberOfVehicles: number, speed: number, maxWeight: number){
    let vehicles:Vehicle[] = [];
    for(let i=0; i< numberOfVehicles; i++){
      vehicles[i] = new Vehicle(speed, maxWeight);
    }
    this.vehicles = vehicles;
  }

  sortByTime(){
    return this.vehicles.sort((a,b) => a.time - b.time);
  }
}