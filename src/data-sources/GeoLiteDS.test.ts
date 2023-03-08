import GeoLiteDS from "./GeoLiteDS";

jest.mock("@maxmind/geoip2-node", () => {
  return {
    __esModule: true,
    Reader: {
      open: jest.fn(() => ({
        city: jest.fn().mockResolvedValue({
          city: { names: { en: "New York" } },
          country: { isoCode: "US" },
        }),
      })),
    },
  };
});

describe("GeoLiteDS", () => {
  process.env.GEO_LITE_2_LOCAL_DATABASE_LOCATION = "";
  test("should get data for a valid IP address", async () => {
    const geoLiteDS = new GeoLiteDS();

    const ipAddress = "24.207.47.115";
    const cityData = await geoLiteDS.getData(ipAddress);
    expect(cityData?.city?.names.en).toEqual("New York");
    expect(cityData?.country?.isoCode).toEqual("US");
  });
});
