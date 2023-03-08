import { checkIpValidity } from "./checkIpValidity";

describe("checkIpValidity", () => {
  it("should return true for valid IPv4 address", () => {
    const address = "73.189.58.16";
    expect(checkIpValidity(address)).toBe(true);
  });

  it("should return true for valid IPv6 address", () => {
    const address = "2001:0db8:85a3:0000:0000:8a2e:0370:7334";
    expect(checkIpValidity(address)).toBe(true);
  });

  it("should return false for local IPv4 address", () => {
    const address1 = "127.0.0.1";
    const address2 = "192.168.1.1";
    expect(checkIpValidity(address1)).toBe(false);
    expect(checkIpValidity(address2)).toBe(false);
  });

  it("should return false for invalid IP address", () => {
    const address = "not an IP address";
    expect(checkIpValidity(address)).toBe(false);
  });
});
