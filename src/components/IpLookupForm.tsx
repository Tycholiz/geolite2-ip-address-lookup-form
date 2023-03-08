import { useState } from "react";
import { City } from "@maxmind/geoip2-node";
import { Button, Typography } from "@mui/material";
import { StagingIpAddresses } from "./StagingIpAddresses";
import { IpResultCard } from "./IpResultCard";

export function IpLookupForm() {
  const [ipAddresses, setIpAddresses] = useState<string[]>(["24.207.47.115"]);
  const [ipAddressData, setIpAddressData] = useState<City[]>([]);

  const fetchIpData = async () => {
    try {
      const res = await fetch("/api/getGeoLiteCityData", {
        method: "POST",
        body: JSON.stringify({
          ipAddresses,
        }),
      });
      const data = await res.json();
      setIpAddressData(data.result);
    } catch (error) {
      console.error("error: ", error);
    }
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
      {ipAddressData.length > 0 &&
        ipAddressData.map((ipAddressData) => {
          return (
            <IpResultCard
              data={ipAddressData}
              key={ipAddressData.traits.ipAddress}
            />
          );
        })}
    </div>
  );
}
