const readline = require('readline');
import { Package } from "./class/package";
import { getErrorMessage, reportError } from "./error/general";
import { DeliveryParams } from "./class/params/deliveryParams";
import { PackageParams } from "./class/params/packageParams";
import { ShipmentService } from "./service/shipmentService";
import { VehicleParams } from "./class/params/vehicleParams";

const lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function prompt(): Promise<string> {
  return new Promise((resolve) => {
    lineReader.on('line', (line: string) => {
          resolve(line);
      })
  })
}

function output(pkgList: Package[]): void {
  pkgList.forEach(function(pkg){
    console.log(pkg.id, pkg.discount, pkg.totalCost);
  })
}

async function init() {
  try {
    let pkgList: Package[] = [];

    // parse first set of parameters
    let data = (await prompt()).split(" ");
    const deliveryInfo = new DeliveryParams(data);

    // parse second set of parameters containing packages info
    for(let i =0 ; i < deliveryInfo.noOfPkgs; i++) {
      let info = (await prompt()).split(" ");
      const packageInfo = new PackageParams(info);
      const pkg = new Package(packageInfo.id, packageInfo.weight, packageInfo.distance, packageInfo.coupon, deliveryInfo.baseCost);
      pkgList.push(pkg);
    }

    // parse third set of parameters with vehicle info
    let vehicleinfo = (await prompt()).split(" ");

    // Print output
    if(!vehicleinfo[0]){
      output(pkgList);
    } else {
      let shipmentInfo = new VehicleParams(vehicleinfo);
      let shipmentService = new ShipmentService();
      let estimated = shipmentService.estimate(shipmentInfo.noOfVehicles, shipmentInfo.maxSpeed, shipmentInfo.maxWeight, pkgList);
      output(estimated);
    }
  } catch(e){
    reportError({message: getErrorMessage(e)})
  }
}

init().then(() => lineReader.close())
