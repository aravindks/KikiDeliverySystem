import { createVehicleList } from '../../tests/util'

describe('sort vehicle based on time', () => {
  it('sort vehicles by time', () => {
    let vehicles = createVehicleList()
    vehicles.vehicles[0].timeTobeFree = 0.2
    vehicles.vehicles[1].timeTobeFree = 0.1
    vehicles.sortByTime()
    expect(vehicles.vehicles[0].timeTobeFree).toBe(0.1)
    expect(vehicles.vehicles[1].timeTobeFree).toBe(0.2)
  })
})
