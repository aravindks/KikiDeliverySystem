import { PackageList } from "./package/packageList";

export class Shipment {
  packageLists: PackageList[];

  constructor(){
    this.packageLists = [];
  }

  sortByNoOfPkgs(){
    return this.packageLists.sort((a, b) => b.packages.length - a.packages.length);
  }

  // create and return list of array of packages according to max weight
  createNewShipments(pkgList: PackageList, maxWeight: number) : Shipment{
    pkgList = pkgList.sortByWeight();
    this.packageLists = [];
    let counter = 0;
    while (counter < pkgList.packages.length) {
      let containerWeight = 0;
      let container = new PackageList();

      for (let i = counter; i < pkgList.packages.length; i++) {
        if(pkgList.packages[i].weight > maxWeight){
          counter++;
          break;
        }
        if (containerWeight + pkgList.packages[i].weight > maxWeight) {
          break;
        }
        counter++;
        containerWeight += pkgList.packages[i].weight;
        container.packages.push(pkgList.packages[i]);
      }
      if(container.packages.length > 0){
        this.packageLists.push(container);
      }
    }
    return this;
  }
}
