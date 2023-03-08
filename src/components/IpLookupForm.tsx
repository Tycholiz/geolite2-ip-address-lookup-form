import { useState } from "react";
import { City } from "@maxmind/geoip2-node";
import Typography from "@mui/material/Typography";
import { Button, Card, CardContent } from "@mui/material";
import { StagingIpAddresses } from "./StagingIpAddresses";

export function IpLookupForm() {
  const [ipAddresses, setIpAddresses] = useState<string[]>(["24.207.47.115"]);
  // TODO: modify this to hold an array, rather than single object
  const [ipAddressData, setIpAddressData] = useState<City>();

  const fetchIpData = async () => {
    const res = await fetch(
      `/api/getGeoLiteCityData?ipAddresses=${ipAddresses[0]}`
    );
    const data = await res.json();
    setIpAddressData(data.result);
  };

  return (
    <div>
      <Typography variant="subtitle1">
        Welcome to GeoLite2's IP Lookup service! You can use this tool to lookup
        multiple IP address' at the same time.
      </Typography>
      <Typography variant="subtitle2">
        To begin, enter an IP address. When you have entered all the IP
        addresses that you want to geolocate, hit the 'Geolocate!' button.
      </Typography>
      <StagingIpAddresses
        ipAddresses={ipAddresses}
        setIpAddresses={setIpAddresses}
      />
      <Button variant="contained" onClick={fetchIpData}>
        Geolocate!
      </Button>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {ipAddressData?.country?.isoCode}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {ipAddressData?.postal?.code}
          </Typography>
          <Typography variant="body2" component="p">
            {ipAddressData?.city?.names.en}
          </Typography>
          <Typography variant="body2" component="p">
            {ipAddressData?.location?.timeZone}
          </Typography>
          <Typography variant="body2" component="p">
            {ipAddressData?.location?.accuracyRadius}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
