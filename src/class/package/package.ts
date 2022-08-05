import { Offer } from '../offer'

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
    couponValue = 'NODISCOUNT',
    basecost: number
  ) {
    this.id = id
    this.distance = distance
    this.weight = weight

    this.deliveryCost = this.getDeliveryCost(distance, weight, basecost)

    let offer = new Offer(couponValue, distance, weight)
    this.discountFactor = offer.discountFactor

    this.discount = Math.abs(this.deliveryCost * this.discountFactor)
    this.totalCost = this.deliveryCost - this.discount
    this.deliveryTime = 0
  }

  // logic for delivery cost calculation
  getDeliveryCost(distance: number, weight: number, basecost: number) {
    return basecost + weight * 10 + distance * 5
  }

  calculateTimeToDeliver(maxSpeed: number){
    return (this.distance / maxSpeed);
  }
}
