import { Package } from './package'

describe('package object gets instanciated', () => {
  it('should create pkg obkect with all its properties', () => {
    let pkg = new Package('pkg1', 10, 100, 'OFR003', 100)
    expect(pkg.id).toBe('pkg1')
    expect(pkg.weight).toBe(10)
    expect(pkg.distance).toBe(100)
    expect(pkg.deliveryTime).toBe(0)
    expect(pkg.deliveryCost).toBe(700)
    expect(pkg.discountFactor).toBe(0.05)
    expect(pkg.discount).toBe(35)
    expect(pkg.totalCost).toBe(665)
  })
})

describe('calculate delivery time with distance and speed', () => {
  it('should return delivery time', () => {
    let pkg = new Package('pkg1', 10, 30, 'OFR001', 100)
    let deliveryTime = pkg.calculateTimeToDeliver(70)
    expect(deliveryTime.toFixed(2)).toBe('0.43')
  })
})
