import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

type Props = {
  ipAddresses: string[];
  setIpAddresses: (arg0: string[]) => void;
};

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

export function StagingIpAddresses({ ipAddresses, setIpAddresses }: Props) {
  const [isValidIpAddress, setIsValidIpAddress] = useState(true);
  const [formIpAddress, setFormIpAddress] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormIpAddress(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ipV4Regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
    const ipV6Regex =
      /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;

    if (ipV4Regex.test(formIpAddress) || ipV6Regex.test(formIpAddress)) {
      setIsValidIpAddress(true);
      setIpAddresses([...ipAddresses, formIpAddress]);
      setFormIpAddress("");
    } else {
      setIsValidIpAddress(false);
    }
  };

  return (
    <>
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
    </>
  );
}
