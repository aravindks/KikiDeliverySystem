import { createPackageList } from '../../tests/util';

describe('sort packages', () => {
  it('sort packages by descending weight', () => {
    let packageList = createPackageList();
    packageList.sortByWeight();
    expect(packageList.packages[0].weight).toBe(175);
    expect(packageList.packages[1].weight).toBe(155);
    expect(packageList.packages[2].weight).toBe(110);
    expect(packageList.packages[3].weight).toBe(75);
    expect(packageList.packages[4].weight).toBe(50);
  })

  it('sort packages by ascending Id', () => {
    const packageList = createPackageList([{
      id: "zyx",
      weight: 250,
      distance: 30,
      offer: "OFR001"
    },
    {
      id: "abc",
      weight: 275,
      distance: 125,
      offer: "OFR001"
    }]);
    packageList.sortById();
    expect(packageList.packages[0].id).toBe("abc");
    expect(packageList.packages[1].id).toBe("zyx");
  })
})

describe('write to console', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should write to console without delivery time', () => {
    jest.spyOn(global.console, 'log').mockImplementation();
    let packageList = createPackageList();
    packageList.sortByWeight();
    packageList.printWithoutDeliveryTime();
    expect(console.log).toBeCalledTimes(5);
    expect(console.log).nthCalledWith(1, "pkg3", "235.00", "2115.00");
    expect(console.log).nthCalledWith(2, "pkg5", "212.50", "1912.50");
    expect(console.log).nthCalledWith(3, "pkg4", "150.00", "1350.00");
    expect(console.log).nthCalledWith(4, "pkg2", "147.50", "1327.50");
    expect(console.log).nthCalledWith(5, "pkg1", "0.00", "750.00");
  })

  it('should write to console with delivery time', () => {
    jest.spyOn(global.console, 'log').mockImplementation();
    let packageList = createPackageList();
    packageList.sortByWeight();
    packageList.printWithDeliveryTime();
    expect(console.log).toBeCalledTimes(5);
    expect(console.log).nthCalledWith(1, "pkg3", "235.00", "2115.00", "0.00");
    expect(console.log).nthCalledWith(2, "pkg5", "212.50", "1912.50", "0.00");
    expect(console.log).nthCalledWith(3, "pkg4", "150.00", "1350.00", "0.00");
    expect(console.log).nthCalledWith(4, "pkg2", "147.50", "1327.50", "0.00");
    expect(console.log).nthCalledWith(5, "pkg1", "0.00", "750.00", "0.00");
  })
})