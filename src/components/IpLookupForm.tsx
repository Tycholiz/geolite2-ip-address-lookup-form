import { useState } from "react";
import { City } from "@maxmind/geoip2-node";
import { Button, Typography, CircularProgress } from "@mui/material";
import { StagingIpAddresses } from "./StagingIpAddresses";
import { IpResultCard } from "./IpResultCard";

export function IpLookupForm() {
  const [ipAddresses, setIpAddresses] = useState<string[]>([]);
  const [ipAddressData, setIpAddressData] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRemoveStagingIpAddress = (ipAddress: string) => {
    setIpAddresses(ipAddresses.filter((address) => address !== ipAddress));
  };

  const fetchIpData = async () => {
    if (!ipAddresses.length) {
      setError("Please add some IP addresses before performing the lookup");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/getGeoLiteCityData", {
        method: "POST",
        body: JSON.stringify({
          ipAddresses,
        }),
      });
      const data = await res.json();
      setIpAddressData(data.result);
      setIpAddresses([]);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const clearIpData = () => {
    setIpAddressData([]);
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
        handleRemoveStagingIpAddress={handleRemoveStagingIpAddress}
      />
      {error && (
        <Typography variant="subtitle2" color="error">
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        onClick={fetchIpData}
        disabled={loading}
        startIcon={loading && <CircularProgress size={16} />}
      >
        Geolocate!
      </Button>
      <Button variant="outlined" onClick={clearIpData}>
        Clear results
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
