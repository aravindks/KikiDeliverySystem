import { coupon } from "../util/coupon";

type Keys = keyof typeof coupon;
type Values = typeof coupon[Keys];

export class Offer {
    discountFactor: number;
    value: string;

    constructor(offer:string, distance:number, weight: number){
        this.value =  coupon.hasOwnProperty(offer.toUpperCase()) ? offer.toUpperCase() : "NODISCOUNT";;

        this.discountFactor= this.getDiscountedFactor(distance,weight);
    }

    getDiscountedFactor(distance: number, weight: number): number {
        let applicableOffer = coupon[this.value as Keys]; 
        if(this.isDiscountApplicable(applicableOffer, distance, weight)){
            return applicableOffer.value;
        }     
        return 0;
    }

    // Given Logic to check if discount is applicable
    private isDiscountApplicable(applicableOffer: Values, distance: number, weight: number): Boolean {
        return weight <= applicableOffer.maxWeight
                && weight >= applicableOffer.minWeight
                && distance <= applicableOffer.maxDistance
                && distance >= applicableOffer.minDistance;
    }
}

