import { CONSTANT } from '../util/constants';
import { Coupon } from '../util/coupon';
import { Offer } from './offer';

describe('offer object gets instanciated', () => {
    it('should create offer object with all its properties', () => {
        let offer = new Offer("OFR001", 10, 100);
        expect(offer.value).toBe(Coupon.OFR001.text);
        expect(offer.discountFactor).toBe(Coupon.OFR001.value);
    })
})

describe('OFR001: calculate right discount according to weight and distance', () => {
    it('offer applicable with coupon', () => {
        let offer = new Offer("OFR001", 10, 100);
        expect(offer.value).toBe(Coupon.OFR001.text);
        expect(offer.discountFactor).toBe(Coupon.OFR001.value);
    })

    it('offer not applicable with coupon', () => {
        let offer = new Offer("OFR001", 200, 100);
        expect(offer.value).toBe(Coupon.OFR001.text);
        expect(offer.discountFactor).toBe(CONSTANT.ZERO);
    })

    it('offer not applicable with coupon', () => {
        let offer = new Offer("OFR001", 20, 210);
        expect(offer.value).toBe(Coupon.OFR001.text);
        expect(offer.discountFactor).toBe(CONSTANT.ZERO);
    })
})

describe('OFR002: calculate right discount according to weight and distance', () => {
    it('offer applicable with coupon', () => {
        let offer = new Offer("OFR002", 60, 150);
        expect(offer.value).toBe(Coupon.OFR002.text);
        expect(offer.discountFactor).toBe(Coupon.OFR002.value);
    })

    it('offer not applicable with coupon', () => {
        let offer = new Offer("OFR002", 200, 100);
        expect(offer.value).toBe(Coupon.OFR002.text);
        expect(offer.discountFactor).toBe(CONSTANT.ZERO);
    })

    it('offer not applicable with coupon', () => {
        let offer = new Offer("OFR002", 60, 99);
        expect(offer.value).toBe(Coupon.OFR002.text);
        expect(offer.discountFactor).toBe(CONSTANT.ZERO);
    })
})

describe('OFR003: calculate right discount according to weight and distance', () => {
    it('offer applicable with coupon', () => {
        let offer = new Offer("OFR003", 180, 20);
        expect(offer.value).toBe(Coupon.OFR003.text);
        expect(offer.discountFactor).toBe(Coupon.OFR003.value);
    })

    it('offer not applicable with coupon', () => {
        let offer = new Offer("OFR003", 300, 100);
        expect(offer.value).toBe(Coupon.OFR003.text);
        expect(offer.discountFactor).toBe(CONSTANT.ZERO);
    })

    it('offer not applicable with coupon', () => {
        let offer = new Offer("OFR003", 60, 200);
        expect(offer.value).toBe(Coupon.OFR003.text);
        expect(offer.discountFactor).toBe(CONSTANT.ZERO);
    })
})

describe('No Coupon: Zero discount when unavailable coupon is used', () => {
    it('offer not applicable with random coupon', () => {
        let offer = new Offer("RANDOM", 180, 20);
        expect(offer.value).toBe(Coupon.NODISCOUNT.text);
        expect(offer.discountFactor).toBe(Coupon.NODISCOUNT.value);
    })
})