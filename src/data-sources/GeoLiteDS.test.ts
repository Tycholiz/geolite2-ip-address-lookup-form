import GeoLiteDS from "./GeoLiteDS";

jest.mock("@maxmind/geoip2-node", () => {
  const mockReaderOpen = jest.fn().mockResolvedValue({
    city: jest.fn().mockResolvedValue({
      city: {
        names: { en: "New York" },
      },
      country: { isoCode: "US" },
    }),
  });
  return {
    __esModule: true,
    Reader: {
      open: mockReaderOpen,
    },
  };
});

describe("GeoLiteDS", () => {
  process.env.GEO_LITE_2_LOCAL_DATABASE_LOCATION = "";
  test("should get data for a valid IP address", async () => {
    const mockCity = {
      city: {
        names: { en: "New York" },
      },
      country: { isoCode: "US" },
    };
    jest
      .spyOn(jest.requireMock("@maxmind/geoip2-node").Reader, "open")
      .mockResolvedValue({
        city: jest.fn().mockResolvedValue(mockCity),
      });
    const geoLiteDS = new GeoLiteDS();

    const ipAddress = "24.207.47.115";
    const cityData = await geoLiteDS.getData(ipAddress);
    expect(cityData?.city?.names.en).toEqual("New York");
    expect(cityData?.country?.isoCode).toEqual("US");
  });

  // test("should throw an error for an invalid IP address", async () => {
  //   const geoLiteDS = new GeoLiteDS();
  //   const ipAddress = "invalid-ip-address";
  //   await expect(geoLiteDS.getData(ipAddress)).rejects.toThrowError();
  // });
});
