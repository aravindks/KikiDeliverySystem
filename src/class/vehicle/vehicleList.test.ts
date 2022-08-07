import { vehicleList } from '../../tests/util'

describe('sort vehicle based on time', () => {
  it('sort vehicles by time', () => {
    let vehicles = vehicleList()
    vehicles.vehicles[0].time = 0.2
    vehicles.vehicles[1].time = 0.1
    vehicles.sortByTime()
    expect(vehicles.vehicles[0].time).toBe(0.1)
    expect(vehicles.vehicles[1].time).toBe(0.2)
  })
})
