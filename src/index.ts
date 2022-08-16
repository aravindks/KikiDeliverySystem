const readline = require('readline')
import {
  Package,
  DeliveryParams,
  PackageParams,
  VehicleParams,
  PackageList,
} from './class'
import { ShipmentService } from './service/shipmentService'
import { getErrorMessage, reportError } from './error/general'

const lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function prompt(): Promise<string> {
  return new Promise((resolve) => {
    lineReader.on('line', (line: string) => {
      resolve(line)
    })
  })
}

export async function init() {
  try {
    let pkgList = new PackageList()

    // parse first set of parameters
    let firstParam = (await prompt()).split(' ')
    const deliveryInfo = new DeliveryParams(firstParam);

    // parse second set of parameters containing packages info
    for (let i = 0; i < deliveryInfo.noOfPkgs; i++) {
      let secParam = (await prompt()).split(' ')
      const packageInfo = new PackageParams(secParam)
      const pkg = new Package(
        packageInfo.id,
        packageInfo.weight,
        packageInfo.distance,
        packageInfo.coupon,
        deliveryInfo.baseCost
      )
      pkgList.packages.push(pkg)
    }

    // parse third set of parameters with vehicle info
    let vehicleinfo = (await prompt()).split(' ')

    // Print output
    if (!vehicleinfo[0]) {
      pkgList.printWithoutDeliveryTime()
    } else {
      let shipmentInfo = new VehicleParams(vehicleinfo)
      shipmentInfo.validate(pkgList);
      let shipmentService = new ShipmentService()
      let etaEstimatedPkgs = shipmentService.claculateDeliveryTime(
        shipmentInfo.noOfVehicles,
        shipmentInfo.maxSpeed,
        shipmentInfo.maxWeight,
        pkgList
      )
      etaEstimatedPkgs.printWithDeliveryTime()
    }
  } catch (e) {
    reportError({ message: getErrorMessage(e) })
  }
}

init().then(() => lineReader.close())
