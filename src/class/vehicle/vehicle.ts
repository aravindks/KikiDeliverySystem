export class Vehicle {
  id: number
  speed: number
  maxWeight: number
  time: number
  timeTobeFree: number
  timeTravelled: number
  constructor(speed: number, maxWeight: number, id: number) {
    this.speed = speed
    this.maxWeight = maxWeight
    this.time = 0
    this.timeTobeFree = 0
    this.timeTravelled = 0
    this.id = id
  }

  public get isFree() {
    return this.timeTobeFree === 0
  }
}
