const readline = require('readline');
import { Package } from "./class/package";
import { getErrorMessage, reportError } from "./error/general";
import { DeliveryParams } from "./class/params/deliveryParams";
import { PackageParams } from "./class/params/packageParams";

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

async function init() {
  try {
    let data = (await prompt()).split(" ");
    const deliveryInfo = new DeliveryParams(data);
    let pkgList: Package[] = [];
    for(let i =0 ; i < deliveryInfo.noOfPkgs; i++) {
      let info = (await prompt()).split(" ");
      const packageInfo = new PackageParams(info);
      const pkg = new Package(packageInfo.id, packageInfo.weight, packageInfo.distance, packageInfo.coupon, deliveryInfo.baseCost);
      pkgList.push(pkg);
    }
    let vehicleinfo = (await prompt()).split(" ");
    if(!vehicleinfo[0]){
      pkgList.forEach(function(pkg){
        console.log(pkg.id, pkg.discount, pkg.totalCost);
      })
    }
  } catch(e){
    reportError({message: getErrorMessage(e)})
  }
}

init().then(() => lineReader.close())
