import { CONSTANT } from "../util/constants";
import { PackageList, Package, VehicleList } from "../class";

const BASE_COST = CONSTANT.HUNDRED;
const VEHICLE_NUMBER = CONSTANT.TWO;
const MAX_SPEED = CONSTANT.HUNDRED;
const VEHICLE_SPEED = CONSTANT.TEN;
export const packages = [
  {
    id: "pkg1",
    weight: 50,
    distance: 30,
    offer: "OFR001"
  },
  {
    id: "pkg2",
    weight: 75,
    distance: 125,
    offer: "OFR001"
  },
  {
    id: "pkg3",
    weight: 175,
    distance: 100,
    offer: "OFR001"
  },
  {
    id: "pkg4",
    weight: 110,
    distance: 60,
    offer: "OFR001"
  },
  {
    id: "pkg5",
    weight: 155,
    distance: 95,
    offer: "OFR001"
  },
];

export function createPackage() {
  console.log("hello");
}

export function createShipment() {
  console.log("hello");
}

export function createPackageList(pkgs = packages, baseCost = BASE_COST): PackageList {
  let pkgList = new PackageList();
  pkgList.packages = [];
  pkgs.forEach(function(val){
    let pkg = new Package(val.id, val.weight, val.distance, val.offer, baseCost);
    pkgList.packages.push(pkg);
  })
  return pkgList;
}

export function vehicleList(): VehicleList{
  let vehicleList = new VehicleList(VEHICLE_NUMBER, VEHICLE_SPEED, MAX_SPEED);
  return vehicleList;
}