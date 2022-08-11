import { PackageList } from './package/packageList'
// import { MaxSubSetCalculator } from '../util/maxSubsetCalculator';

export class Shipment {
  packageLists: PackageList[]

  constructor() {
    this.packageLists = []
  }

  sortByNoOfPkgs() {
    return this.packageLists.sort(
      (a, b) => b.packages.length - a.packages.length
    )
  }
  
}
