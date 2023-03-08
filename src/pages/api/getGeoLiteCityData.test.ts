import { NextApiRequest, NextApiResponse } from "next";
import { City } from "@maxmind/geoip2-node";
import getGeoLiteCityData, { Response } from "./getGeoLiteCityData";
import GeoLiteDS from "../../data-sources/GeoLiteDS";
import { mockIpAddressData } from "../../mockData";

jest.mock("../../data-sources/GeoLiteDS");

describe("getGeoLiteCityData", () => {
  let req: NextApiRequest;
  let res: NextApiResponse<Response>;

  beforeEach(() => {
    req = {
      body: JSON.stringify({ ipAddresses: ["1.2.3.4", "5.6.7.8"] }),
    } as NextApiRequest;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse<Response>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 500 if no IP addresses are passed", async () => {
    req.body = JSON.stringify({});

    await getGeoLiteCityData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      err: "no IP addresses were passed to the GeoLite database",
    });
  });

  it("should retrieve geo location data from GeoLite database", async () => {
    const getDataMock = jest.fn().mockResolvedValueOnce(mockIpAddressData);
    GeoLiteDS.prototype.getData = getDataMock;

    await getGeoLiteCityData(req, res);

    expect(getDataMock).toHaveBeenCalledTimes(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: [mockIpAddressData],
    });
  });

  it("should return 500 if GeoLite database retrieval fails", async () => {
    const error = new Error("Unable to retrieve data from GeoLite database");
    GeoLiteDS.prototype.getData = jest.fn().mockRejectedValueOnce(error);

    await getGeoLiteCityData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Couldn't retrieve geo location data from GeoLite Database",
    });
  });
});
