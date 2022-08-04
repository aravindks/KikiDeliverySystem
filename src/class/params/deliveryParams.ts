import { ErrorMessages } from '../../util/errorMessages'

export class DeliveryParams {
  baseCost: number
  noOfPkgs: number
  constructor(param: string[]) {
    this.baseCost = parseInt(param[0])
    this.noOfPkgs = parseInt(param[1])
    if (isNaN(this.baseCost) || isNaN(this.noOfPkgs)) {
      throw new Error(ErrorMessages.INVALIDPARAM)
    }
  }
}
