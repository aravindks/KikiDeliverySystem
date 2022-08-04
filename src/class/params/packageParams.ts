import { ErrorMessages } from "../../util/errorMessages";

export class PackageParams {
    id: string;
    weight: number;
    distance: number;
    coupon: string;

    constructor(params: string[]){
        this.id = params[0];
        this.weight = parseInt(params[1]);
        this.distance = parseInt(params[2]);
        this.coupon = params[3];
        if(isNaN(this.weight)|| isNaN(this.distance)){
            throw new Error(ErrorMessages.INVALIDPARAM);
        }
    }
}