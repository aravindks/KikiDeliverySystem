export class MaxSubSetCalculator {
  arrSize = -1
  maximumSetSum = -1
  chosenPowerSet: number[];
  constructor() {
    this.arrSize = -1
    this.maximumSetSum = -1
    this.chosenPowerSet = [];
  }
  getMaxSubsetLessThan(weights: number[], maxSum: number) {
    let newArr:number[] = [];
    this._recursivelyCalculateMaxSubset(weights, weights.length, 0,0, newArr, maxSum);
    return this.chosenPowerSet;
  }

  _recursivelyCalculateMaxSubset(weights: number[], noOfPkgs: number, preMax: number, curSum: number, packages: number[], maxSum: number){
    if (curSum > maxSum){
      if (preMax >= this.maximumSetSum){
        this._compareSets(preMax, packages.length, packages);
      }
      return;
    }

    if (noOfPkgs == 0){
        if (curSum <= maxSum && curSum >= this.maximumSetSum){
            this._compareSets(curSum, packages.length, packages);
        }

        return;
    }

    let tmp = [...packages];
    if (curSum + weights[noOfPkgs - 1] <= maxSum){
        tmp.push(weights[noOfPkgs - 1]);
    }

    this._recursivelyCalculateMaxSubset(weights, noOfPkgs - 1, curSum, curSum + weights[noOfPkgs - 1], tmp, maxSum);
    this._recursivelyCalculateMaxSubset(weights, noOfPkgs - 1, preMax, curSum, [...packages], maxSum);
  }

  _compareSets(preMax: number, curSize: number, elements: number[]){
    if (preMax == this.maximumSetSum && curSize > this.arrSize){
      this.arrSize = curSize;
      this.chosenPowerSet = elements;
    } else if (preMax > this.maximumSetSum){
      this.maximumSetSum = preMax;
      this.arrSize = curSize;
      this.chosenPowerSet = elements;
    }
  }
}