import { CONSTANT } from '../util/constants'
import { Coupon } from '../util/coupon'

type Keys = keyof typeof Coupon
type Values = typeof Coupon[Keys]

export class Offer {
  discountFactor: number
  value: string

  constructor(offer: string, distance: number, weight: number) {
    this.value = Coupon.hasOwnProperty(offer.toUpperCase())
      ? offer.toUpperCase()
      : Coupon.NODISCOUNT.text

    this.discountFactor = this.getDiscountedFactor(distance, weight)
  }

  getDiscountedFactor(distance: number, weight: number): number {
    let applicableOffer = Coupon[this.value as Keys]
    if (this.isDiscountApplicable(applicableOffer, distance, weight)) {
      return applicableOffer.value
    }
    return CONSTANT.ZERO
  }

  // Given Logic to check if discount is applicable
  private isDiscountApplicable(
    applicableOffer: Values,
    distance: number,
    weight: number
  ): Boolean {
    return (
      weight <= applicableOffer.maxWeight &&
      weight >= applicableOffer.minWeight &&
      distance <= applicableOffer.maxDistance &&
      distance >= applicableOffer.minDistance
    )
  }
}
