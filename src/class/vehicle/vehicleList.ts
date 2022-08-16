import { Vehicle } from './vehicle'

export class VehicleList {
  vehicles: Vehicle[]

  constructor(numberOfVehicles: number, speed: number, maxWeight: number) {
    let vehicles: Vehicle[] = []
    for (let i = 0; i < numberOfVehicles; i++) {
      vehicles[i] = new Vehicle(speed, maxWeight, i)
    }
    this.vehicles = vehicles
  }

  sortByTime() {
    return this.vehicles.sort((a, b) => a.timeTobeFree - b.timeTobeFree)
  }

  getFreeVehicle(): Vehicle{
    let freeVehicleIndex = this.vehicles.findIndex((val) => val.isFree);
    if(freeVehicleIndex === -1){
      let freeVehicles = this.sortByTime();
      const timeTobeFree = freeVehicles[0].timeTobeFree;
      this.vehicles.forEach(function(v){
        v.timeTravelled += timeTobeFree;
        v.timeTobeFree -= timeTobeFree;
      })
      return freeVehicles[0];
    }
    return this.vehicles[freeVehicleIndex];
  }
}
