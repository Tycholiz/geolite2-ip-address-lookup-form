import { Typography, Card, CardContent } from "@mui/material";
import { City } from "@maxmind/geoip2-node";

type Props = {
  data: City;
};

export function IpResultCard({ data }: Props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h1">
          {data.traits?.ipAddress}
        </Typography>
        <Typography variant="h6" component="h2">
          Country Code: {data.country?.isoCode || `<data indeterminate>`}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Postal Code: {data.postal?.code || `<data indeterminate>`}
        </Typography>
        <Typography variant="body2" component="p">
          City: {data.city?.names.en || `<data indeterminate>`}
        </Typography>
        <Typography variant="body2" component="p">
          Timezone: {data.location?.timeZone || `<data indeterminate>`}
        </Typography>
        <Typography variant="body2" component="p">
          Accuracy Radius:{" "}
          {data.location?.accuracyRadius || `<data indeterminate>`}
        </Typography>
      </CardContent>
    </Card>
  );
}
