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
          Country Code: {data.country?.isoCode}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Postal Code: {data.postal?.code}
        </Typography>
        <Typography variant="body2" component="p">
          City: {data.city?.names.en}
        </Typography>
        <Typography variant="body2" component="p">
          Timezone: {data.location?.timeZone}
        </Typography>
        <Typography variant="body2" component="p">
          Accuracy Radius: {data.location?.accuracyRadius}
        </Typography>
      </CardContent>
    </Card>
  );
}
