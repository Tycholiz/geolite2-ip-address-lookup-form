import { Typography, Card, CardContent } from "@mui/material";
import { City } from "@maxmind/geoip2-node";

type Props = {
  data: City;
};

export function IpResultCard({ data }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {data.country?.isoCode}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {data.postal?.code}
        </Typography>
        <Typography variant="body2" component="p">
          {data.city?.names.en}
        </Typography>
        <Typography variant="body2" component="p">
          {data.location?.timeZone}
        </Typography>
        <Typography variant="body2" component="p">
          {data.location?.accuracyRadius}
        </Typography>
      </CardContent>
    </Card>
  );
}
