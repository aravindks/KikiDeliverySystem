import { Shipment } from './shipment'
import { createPackageList } from '../tests/util'

const MAX_WEIGHT = 200
describe('create shipment', () => {
  it('should create shipment in accord to specified weight', () => {
    const pkgList = createPackageList()
    let shipment = new Shipment()
    const shipments = shipment.createNewShipments(pkgList, MAX_WEIGHT)
    expect(shipments.packageLists.length).toBe(4)
    expect(shipments.packageLists[0].packages.length).toBe(1)
    expect(shipments.packageLists[1].packages.length).toBe(1)
    expect(shipments.packageLists[2].packages.length).toBe(2)
    expect(shipments.packageLists[3].packages.length).toBe(1)
    expect(shipments.packageLists[0].packages[0].weight).toBeLessThan(
      MAX_WEIGHT
    )
    expect(shipments.packageLists[1].packages[0].weight).toBeLessThan(
      MAX_WEIGHT
    )
    expect(
      shipments.packageLists[2].packages[0].weight +
        shipments.packageLists[2].packages[1].weight
    ).toBeLessThan(MAX_WEIGHT)
    expect(shipments.packageLists[3].packages[0].weight).toBeLessThan(
      MAX_WEIGHT
    )
  })

  it('should not create shipment if package weight is more than max weight', () => {
    const pkgList = createPackageList([
      {
        id: 'pkg1',
        weight: 250,
        distance: 30,
        offer: 'OFR001',
      },
      {
        id: 'pkg2',
        weight: 275,
        distance: 125,
        offer: 'OFR001',
      },
    ])
    let shipment = new Shipment()
    const shipments = shipment.createNewShipments(pkgList, MAX_WEIGHT)
    expect(shipments.packageLists.length).toBe(0)
  })
})

describe('sort shipments in shipment', () => {
  it('should sort shipments accord to packages length', () => {
    const pkgList = createPackageList()
    let shipment = new Shipment()
    shipment.createNewShipments(pkgList, MAX_WEIGHT)
    const sortedShipment = shipment.sortByNoOfPkgs()
    expect(sortedShipment[0].packages.length).toBe(2)
    expect(sortedShipment[1].packages.length).toBe(1)
    expect(sortedShipment[2].packages.length).toBe(1)
    expect(sortedShipment[3].packages.length).toBe(1)
  })
})
