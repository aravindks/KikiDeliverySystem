import { ErrorMessages } from '../../util/errorMessages'

export class VehicleParams {
  noOfVehicles: number
  maxSpeed: number
  maxWeight: number
  constructor(param: string[]) {
    this.noOfVehicles = parseInt(param[0])
    this.maxSpeed = parseInt(param[1])
    this.maxWeight = parseInt(param[2])
    if (
      isNaN(this.noOfVehicles) ||
      isNaN(this.maxSpeed) ||
      isNaN(this.maxWeight)
    ) {
      throw new Error(ErrorMessages.INVALIDPARAM)
    }
  }
}
