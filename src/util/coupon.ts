export const Coupon = {
  OFR001: {
    minWeight: 70,
    maxWeight: 200,
    minDistance: 0,
    maxDistance: 200,
    value: 0.1,
    text: "OFR001",
  },
  OFR002: {
    minWeight: 100,
    maxWeight: 250,
    minDistance: 50,
    maxDistance: 150,
    value: 0.07,
    text: "OFR002"
  },
  OFR003: {
    minWeight: 10,
    maxWeight: 150,
    minDistance: 50,
    maxDistance: 250,
    value: 0.05,
    text: "OFR003"
  },
  NODISCOUNT: {
    minWeight: 0,
    maxWeight: Number.MAX_SAFE_INTEGER,
    minDistance: 0,
    maxDistance: Number.MAX_SAFE_INTEGER,
    value: 0,
    text: "NODISCOUNT"
  },
}
