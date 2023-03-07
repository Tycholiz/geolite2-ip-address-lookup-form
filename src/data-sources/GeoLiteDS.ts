import { Reader, City } from "@maxmind/geoip2-node";

const GEO_LITE_2_LOCAL_DATABASE_LOCATION = process.env
  .GEO_LITE_2_LOCAL_DATABASE_LOCATION as string;

class GeoLiteDS {
  private options = {
    // you can use options like `cache` or `watchForUpdates`
  };

  async getData(): Promise<City> {
    const reader = await Reader.open(
      GEO_LITE_2_LOCAL_DATABASE_LOCATION,
      this.options
    );
    return reader.city("29.109.27.117");
  }
}

export default GeoLiteDS;
