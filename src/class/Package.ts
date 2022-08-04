import { Offer } from "./offer";

export class Package {
    id: string;
    distance: number;
    weight: number;
    deliveryCost: number;
    discountFactor: number;
    discount: number;
    totalCost: number;
    constructor(id:string, weight: number, distance: number, couponValue = 'NODISCOUNT', basecost: number){
        this.id = id;
        this.distance= distance;
        this.weight = weight;
        
        this.deliveryCost = this.getDeliveryCost(distance, weight, basecost)

        let offer = new Offer(couponValue, distance, weight);
        this.discountFactor = offer.discountFactor;
        
        this.discount = Math.abs(this.deliveryCost * this.discountFactor);
        this.totalCost = this.deliveryCost - this.discount;
    }
    
    getDeliveryCost(distance: number, weight: number, basecost: number){
        // logic for delivery cost calculation
        return (basecost + (weight * 10) + (distance * 5));
    }
}