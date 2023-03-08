import { Reader, City } from "@maxmind/geoip2-node";
import { checkIpValidity } from "../utils/checkIpValidity";

const GEO_LITE_2_LOCAL_DATABASE_LOCATION = process.env
  .GEO_LITE_2_LOCAL_DATABASE_LOCATION as string;

class GeoLiteDS {
  private options = {
    // you can use options like `cache` or `watchForUpdates`
  };

  async getData(ipAddress: string): Promise<City> {
    if (!checkIpValidity(ipAddress)) {
      throw new Error("Invalid IP address was passed");
    }
    const reader = await Reader.open(
      GEO_LITE_2_LOCAL_DATABASE_LOCATION,
      this.options
    );
    return reader.city(ipAddress);
  }
}

export default GeoLiteDS;
