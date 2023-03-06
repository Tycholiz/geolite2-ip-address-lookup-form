import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledTextField = styled(TextField)`
  margin-right: 16px;
`;

const StyledErrorMessage = styled(Typography)`
  color: red;
  margin-top: 0;
`;

export function IpLookupForm() {
  const [formIpAddress, setFormIpAddress] = useState("");
  const [ipAddresses, setIpAddresses] = useState<string[]>([]);
  const [isValidIpAddress, setIsValidIpAddress] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (ipRegex.test(formIpAddress)) {
      setIsValidIpAddress(true);
      setIpAddresses([...ipAddresses, formIpAddress]);
      setFormIpAddress("");
    } else {
      setIsValidIpAddress(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormIpAddress(event.target.value);
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
      {!isValidIpAddress && (
        <StyledErrorMessage variant="caption">
          Please enter a valid IP address.
        </StyledErrorMessage>
      )}
      <StyledForm onSubmit={handleSubmit}>
        <StyledTextField
          label="Enter an IP address"
          variant="outlined"
          size="small"
          value={formIpAddress}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          +
        </Button>
      </StyledForm>
      <List>
        {ipAddresses.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
