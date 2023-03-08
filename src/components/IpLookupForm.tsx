import { useState } from "react";
import { City } from "@maxmind/geoip2-node";
import { Button, Typography } from "@mui/material";
import { StagingIpAddresses } from "./StagingIpAddresses";
import { IpResultCard } from "./IpResultCard";

export function IpLookupForm() {
  const [ipAddresses, setIpAddresses] = useState<string[]>(["24.207.47.115"]);
  // TODO: modify this to hold an array, rather than single object
  const [ipAddressData, setIpAddressData] = useState<City[]>([]);

  const fetchIpData = async () => {
    const res = await fetch("/api/getGeoLiteCityData", {
      method: "POST",
      body: JSON.stringify({
        ipAddresses,
      }),
    });
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
        To begin, enter an IP address. When you have entered all the PI
        addresses that you want to geolocate, hit the 'Geolocate!' button.
      </Typography>
      <StagingIpAddresses
        ipAddresses={ipAddresses}
        setIpAddresses={setIpAddresses}
      />
      <Button variant="contained" onClick={fetchIpData}>
        Geolocate!
      </Button>
      {ipAddressData[0] && <IpResultCard data={ipAddressData[0]} />}
    </div>
  );
}
