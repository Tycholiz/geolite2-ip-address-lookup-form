import GeoLiteDS from "./GeoLiteDS";

describe("GeoLiteDS", () => {
  const geoLiteDS = new GeoLiteDS();

  test("should get data for a valid IP address", async () => {
    const ipAddress = "24.207.47.115";
    const cityData = await geoLiteDS.getData(ipAddress);
    expect(cityData?.city?.names.en).toEqual("Delta");
    expect(cityData?.country?.isoCode).toEqual("CA");
  });

  test("should throw an error for an invalid IP address", async () => {
    const ipAddress = "invalid-ip-address";
    await expect(geoLiteDS.getData(ipAddress)).rejects.toThrowError();
  });
});
