import { ErrorMessages } from '../../util/errorMessages'
import { DeliveryParams } from './index'

describe('throw error for invalid params', () => {
  it('should throw error with proper message for invalid param', () => {
    let param = ['cost', '70']
    expect(() =>{new DeliveryParams(param)}).toThrowError
    expect(() =>{new DeliveryParams(param)}).toThrow(ErrorMessages.INVALIDPARAM)
  })
})