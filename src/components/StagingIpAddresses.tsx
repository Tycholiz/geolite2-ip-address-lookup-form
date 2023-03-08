import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { localIpRegex, ipV4Regex, ipV6Regex } from "../utils/constants";

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

    if (
      (!localIpRegex.test(formIpAddress) && ipV4Regex.test(formIpAddress)) ||
      ipV6Regex.test(formIpAddress)
    ) {
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
