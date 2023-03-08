import { NextApiRequest, NextApiResponse } from "next";
import { City } from "@maxmind/geoip2-node";
import GeoLiteDS from "../../data-sources/GeoLiteDS";

export interface RequestBody {
  ipAddresses: string[];
}

export interface Response {
  result?: City[];
  err?: any;
  message?: string;
}

export default async function getGeoLiteCityData(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { ipAddresses }: RequestBody = JSON.parse(req.body);

  if (!ipAddresses) {
    return res.status(500).json({
      err: `no IP addresses were passed to the GeoLite database`,
    });
  }

  try {
    const geoLiteDS = new GeoLiteDS();
    const geoLiteFetchPromises = ipAddresses.map((ipAddress) =>
      geoLiteDS.getData(ipAddress)
    );
    const allGeoLiteFetchData = await Promise.all(geoLiteFetchPromises);
    res.status(200).json({ result: allGeoLiteFetchData });
  } catch (err) {
    return res.status(500).json({
      message: `Couldn't retrieve geo location data from GeoLite Database`,
    });
  }
}
