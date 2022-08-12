import {
  createPackageList,
  VEHICLE_NUMBER,
  MAX_SPEED,
  MAX_WEIGHT,
} from '../tests/util'
import { ShipmentService } from './shipmentService'

describe('returns packages with delivery time ', () => {
  it('when each container have unequal weights and distances', () => {
    let shipmentService = new ShipmentService()
    let pkgList = createPackageList()
    const estimatedShipment = shipmentService.claculateDeliveryTime(
      VEHICLE_NUMBER,
      MAX_SPEED,
      MAX_WEIGHT,
      pkgList
    )
    expect(estimatedShipment.packages[0].deliveryTime.toFixed(2)).toBe('4.00')
    expect(estimatedShipment.packages[1].deliveryTime.toFixed(2)).toBe('1.79')
    expect(estimatedShipment.packages[2].deliveryTime.toFixed(2)).toBe('1.43')
    expect(estimatedShipment.packages[3].deliveryTime.toFixed(2)).toBe('0.86')
    expect(estimatedShipment.packages[4].deliveryTime.toFixed(2)).toBe('4.21')
  })

  it('when containers with equal weights are present', () => {
    let shipmentService = new ShipmentService()
    let pkgList = createPackageList([
      {
        id: 'pkg1',
        weight: 50,
        distance: 100,
        offer: 'NA',
      },
      {
        id: 'pkg2',
        weight: 147,
        distance: 100,
        offer: 'NA',
      },
      {
        id: 'pkg3',
        weight: 50,
        distance: 100,
        offer: 'NA',
      },
      {
        id: 'pkg4',
        weight: 148,
        distance: 100,
        offer: 'NA',
      },
      {
        id: 'pkg5',
        weight: 50,
        distance: 100,
        offer: 'NA',
      },
    ])
    const estimatedShipment = shipmentService.claculateDeliveryTime(
      1,
      MAX_SPEED,
      MAX_WEIGHT,
      pkgList
    )
    expect(estimatedShipment.packages[0].deliveryTime.toFixed(2)).toBe('1.43')
    expect(estimatedShipment.packages[0].id).toBe('pkg1')
    expect(estimatedShipment.packages[1].deliveryTime.toFixed(2)).toBe('4.29')
    expect(estimatedShipment.packages[1].id).toBe('pkg2')
    expect(estimatedShipment.packages[2].deliveryTime.toFixed(2)).toBe('4.29')
    expect(estimatedShipment.packages[2].id).toBe('pkg3')
    expect(estimatedShipment.packages[3].deliveryTime.toFixed(2)).toBe('1.43')
    expect(estimatedShipment.packages[3].id).toBe('pkg4')
    expect(estimatedShipment.packages[4].deliveryTime.toFixed(2)).toBe('7.14')
    expect(estimatedShipment.packages[4].id).toBe('pkg5')
  })

  it('when containers with equal weights and equal no of packages are present', () => {
    let shipmentService = new ShipmentService()
    let pkgList = createPackageList([
      {
        id: 'pkg1',
        weight: 50,
        distance: 100,
        offer: 'NA',
      },
      {
        id: 'pkg2',
        weight: 147,
        distance: 100,
        offer: 'NA',
      },
      {
        id: 'pkg3',
        weight: 50,
        distance: 50,
        offer: 'NA',
      },
      {
        id: 'pkg4',
        weight: 147,
        distance: 50,
        offer: 'NA',
      },
      {
        id: 'pkg5',
        weight: 197,
        distance: 10,
        offer: 'NA',
      },
    ])
    const estimatedShipment = shipmentService.claculateDeliveryTime(
      1,
      MAX_SPEED,
      MAX_WEIGHT,
      pkgList
    )
    expect(estimatedShipment.packages[0].deliveryTime.toFixed(2)).toBe('2.86')
    expect(estimatedShipment.packages[0].id).toBe('pkg1')
    expect(estimatedShipment.packages[1].deliveryTime.toFixed(2)).toBe('2.86')
    expect(estimatedShipment.packages[1].id).toBe('pkg2')
    expect(estimatedShipment.packages[2].deliveryTime.toFixed(2)).toBe('0.71')
    expect(estimatedShipment.packages[2].id).toBe('pkg3')
    expect(estimatedShipment.packages[3].deliveryTime.toFixed(2)).toBe('0.71')
    expect(estimatedShipment.packages[3].id).toBe('pkg4')
    expect(estimatedShipment.packages[4].deliveryTime.toFixed(2)).toBe('4.43')
    expect(estimatedShipment.packages[4].id).toBe('pkg5')
  })
})
