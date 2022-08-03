"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
it('should work', () => {
    (0, index_1.init)(['100 2', 'pkg1 5 5 OFR001', 'pkg2 10 100 OFR003']);
    const consoleSpy = jest.spyOn(console, 'log');
    expect(consoleSpy).toHaveBeenCalledWith("pkg1");
});
