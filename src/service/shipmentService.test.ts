import { createPackageList, VEHICLE_NUMBER, MAX_SPEED, MAX_WEIGHT } from "../tests/util";
import { ShipmentService } from "./shipmentService";

describe('calculate delivery time', () => {
  it('returns packages with delivery time', ()=> {
    let shipmentService = new ShipmentService();
    let pkgList = createPackageList();
    const estimatedShipment =  shipmentService.claculateDeliveryTime(VEHICLE_NUMBER, MAX_SPEED, MAX_WEIGHT, pkgList);
    expect(estimatedShipment.packages[0].deliveryTime.toFixed(2)).toBe("4.00");
    expect(estimatedShipment.packages[1].deliveryTime.toFixed(2)).toBe("1.79");
    expect(estimatedShipment.packages[2].deliveryTime.toFixed(2)).toBe("1.43");
    expect(estimatedShipment.packages[3].deliveryTime.toFixed(2)).toBe("0.86");
    expect(estimatedShipment.packages[4].deliveryTime.toFixed(2)).toBe("4.21");
  })

  it('returns packages with delivery time as 0 with package exceeding max weight', ()=> {
    let shipmentService = new ShipmentService();
    let pkgList = createPackageList([
      {
        id: 'zyx',
        weight: 250,
        distance: 30,
        offer: 'OFR001',
      },
      {
        id: 'abc',
        weight: 275,
        distance: 125,
        offer: 'OFR001',
      },
    ]);
    const estimatedShipment =  shipmentService.claculateDeliveryTime(VEHICLE_NUMBER, MAX_SPEED, MAX_WEIGHT, pkgList);
    expect(estimatedShipment.packages[0].deliveryTime.toFixed(2)).toBe("0.00");
    expect(estimatedShipment.packages[1].deliveryTime.toFixed(2)).toBe("0.00");
  })
})