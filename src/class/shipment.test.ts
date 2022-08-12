import { Shipment } from './shipment'
import { ShipmentService } from '../service/shipmentService'
import { createPackageList } from '../tests/util'

const MAX_WEIGHT = 200

describe('sort shipments in shipment', () => {
  it('should sort shipments accord to packages length', () => {
    const pkgList = createPackageList()
    let shipment = new Shipment()
    let shipmentService = new ShipmentService();
    shipment = shipmentService.createNewShipments(pkgList, MAX_WEIGHT)
    const sortedShipment = shipment.sortByNoOfPkgs()
    expect(sortedShipment[0].packages.length).toBe(2)
    expect(sortedShipment[1].packages.length).toBe(1)
    expect(sortedShipment[2].packages.length).toBe(1)
    expect(sortedShipment[3].packages.length).toBe(1)
  })
})
