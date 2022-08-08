import { Offer } from '../offer'
import { CONSTANT } from '../../util/constants'
import { Coupon } from '../../util/coupon'

const COST_PER_WEIGHT = CONSTANT.TEN
const COST_PER_DISTANCE = CONSTANT.FIVE

export class Package {
  id: string
  distance: number
  weight: number
  deliveryCost: number
  discountFactor: number
  discount: number
  totalCost: number
  deliveryTime: number

  constructor(
    id: string,
    weight: number,
    distance: number,
    couponValue = Coupon.NODISCOUNT.text,
    basecost: number
  ) {
    this.id = id
    this.distance = distance
    this.weight = weight

    this.deliveryCost = this.getDeliveryCost(basecost)

    let offer = new Offer(couponValue, distance, weight)
    this.discountFactor = offer.discountFactor
    this.discount = Math.abs(this.deliveryCost * this.discountFactor)

    this.totalCost = this.deliveryCost - this.discount
    this.deliveryTime = CONSTANT.ZERO
  }

  // logic for delivery cost calculation
  getDeliveryCost(basecost: number): number {
    return (
      basecost +
      this.weight * COST_PER_WEIGHT +
      this.distance * COST_PER_DISTANCE
    )
  }

  calculateTimeToDeliver(maxSpeed: number): number {
    return this.distance / maxSpeed
  }
}
