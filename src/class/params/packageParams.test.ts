import { ErrorMessages } from '../../util/errorMessages'
import { PackageParams } from './index'

describe('throw error for invalid params', () => {
  it('should throw error with proper message for invalid param', () => {
    let param = ['pkg1', '70', 'NA', 'OFR001']
    expect(() =>{new PackageParams(param)}).toThrowError
    expect(() =>{new PackageParams(param)}).toThrow(ErrorMessages.INVALIDPARAM)
  })
})