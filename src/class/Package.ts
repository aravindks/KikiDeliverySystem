export class Package {
    id: string;
    distance: number;
    weight: number;
    cost: number;
    constructor(id:string, distance: number, weight: number, offer: string, basecost: number){
        this.id = id;
        this.distance= distance;
        this.weight = weight;

        this.cost = this.getTotalCost(distance, weight, offer, basecost)
    }
    
    getTotalCost(distance: number, weight: number, offer: string, basecost: number){
        // TODO implement cost calculation logic
        return 10;
    }
}