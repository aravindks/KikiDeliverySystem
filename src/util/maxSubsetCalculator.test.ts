import { MaxSubSetCalculator } from "./maxSubsetCalculator";

describe('calculate max sub sequence with given sum', () =>{
  it('should calculate max sub sequence with given sum', () => {
    let maxSubSetCalulator = new MaxSubSetCalculator()
    let weightsList = [50, 50, 150, 99, 100]
    let maxWeight = 200
    let selectedWeights = maxSubSetCalulator.getMaxSubsetLessThan(
      weightsList,
      maxWeight
    )
    expect(selectedWeights.length).toBe(3)
    expect(selectedWeights[0]).toBe(100);
    expect(selectedWeights[1]).toBe(50);
    expect(selectedWeights[2]).toBe(50);
  })

  it('should calculate max sub sequence with given sum', () => {
    let maxSubSetCalulator = new MaxSubSetCalculator()
    let weightsList = [50, 75, 175, 110, 155]
    let maxWeight = 200
    let selectedWeights = maxSubSetCalulator.getMaxSubsetLessThan(
      weightsList,
      maxWeight
    )
    expect(selectedWeights.length).toBe(2)
    expect(selectedWeights[0]).toBe(110);
    expect(selectedWeights[1]).toBe(75);
  })

  it('should calculate max sub sequence with given sum', () => {
    let maxSubSetCalulator = new MaxSubSetCalculator()
    let weightsList = [1, 1, 1, 1]
    let maxWeight = 4
    let selectedWeights = maxSubSetCalulator.getMaxSubsetLessThan(
      weightsList,
      maxWeight
    )
    expect(selectedWeights.length).toBe(4)
    expect(selectedWeights[0]).toBe(1);
    expect(selectedWeights[1]).toBe(1);
    expect(selectedWeights[2]).toBe(1);
    expect(selectedWeights[3]).toBe(1);
  })

  it('should return empty sub sequence with given sum less than all subset', () => {
    let maxSubSetCalulator = new MaxSubSetCalculator()
    let weightsList = [20, 30]
    let maxWeight = 1
    let selectedWeights = maxSubSetCalulator.getMaxSubsetLessThan(
      weightsList,
      maxWeight
    )
    expect(selectedWeights.length).toBe(0)
  })
})