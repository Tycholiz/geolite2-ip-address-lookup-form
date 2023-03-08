import { NextApiRequest, NextApiResponse } from "next";
import { City } from "@maxmind/geoip2-node";
import GeoLiteDS from "../../data-sources/GeoLiteDS";

interface Response {
  result?: City;
  err?: any;
  message?: string;
}

export default async function getGeoLiteCityData(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { ipAddresses } = req.query;

  if (!ipAddresses) {
    return res.status(500).json({
      err: `no IP addresses were passed to the GeoLite database`,
    });
  }

  try {
    const geoLiteDS = new GeoLiteDS();

    const geolocationData = await geoLiteDS.getData(ipAddresses as string);
    res.status(200).json({ result: geolocationData });
  } catch (err) {
    return res.status(500).json({
      message: `Couldn't retrieve geo location data from GeoLite Database`,
    });
  }
}
