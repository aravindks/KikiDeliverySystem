import { ErrorMessages } from '../../util/errorMessages'
import { PackageList } from '../package/packageList'

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
      isNaN(this.maxWeight) ||
      this.noOfVehicles <= 0 ||
      this.maxSpeed <= 0 ||
      this.maxWeight <= 0
    ) {
      throw new Error(ErrorMessages.INVALIDPARAM)
    }
  }

  validate(pkgList: PackageList) {
    for (let i = 0; i < pkgList.packages.length; i++) {
      if (pkgList.packages[i].weight > this.maxWeight) {
        throw new Error(ErrorMessages.EXCESSWEIGHT)
      }
    }
  }
}
