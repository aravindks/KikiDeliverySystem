import {init } from "./index";

it('should work', () => {
    init(['100 2', 'pkg1 5 5 OFR001', 'pkg2 10 100 OFR003']);
    const consoleSpy = jest.spyOn(console, 'log');
    expect(consoleSpy).toHaveBeenCalledWith("pkg1");
})