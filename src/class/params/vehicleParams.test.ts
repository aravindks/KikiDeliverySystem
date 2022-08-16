import { createPackageList } from '../../tests/util'
import { ErrorMessages } from '../../util/errorMessages'
import { VehicleParams } from './index'

describe('throw error for invalid params', () => {
  it('should throw error with proper message for invalid param', () => {
    let param = ['1', '70']
    expect(() => {
      new VehicleParams(param)
    }).toThrowError
    expect(() => {
      new VehicleParams(param)
    }).toThrow(ErrorMessages.INVALIDPARAM)
  })

  it('should throw error with proper message for invalid param', () => {
    let param = ['0', '0', '0']
    expect(() => {
      new VehicleParams(param)
    }).toThrowError
    expect(() => {
      new VehicleParams(param)
    }).toThrow(ErrorMessages.INVALIDPARAM)
  })

  it('should throw error with proper message for excess pkg weight', () => {
    let param = ['1', '50', '50']
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
    ])
    let vehicleinfo = new VehicleParams(param)
    expect(() => {
      vehicleinfo.validate(pkgList)
    }).toThrowError
    expect(() => {
      vehicleinfo.validate(pkgList)
    }).toThrow(ErrorMessages.EXCESSWEIGHT)
  })
})
