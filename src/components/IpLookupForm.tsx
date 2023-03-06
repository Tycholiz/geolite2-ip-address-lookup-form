import { useState } from "react";
import Typography from "@mui/material/Typography";
import { StagingIpAddresses } from "./StagingIpAddresses";

export function IpLookupForm() {
  const [ipAddresses, setIpAddresses] = useState<string[]>([]);

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
    </div>
  );
}
