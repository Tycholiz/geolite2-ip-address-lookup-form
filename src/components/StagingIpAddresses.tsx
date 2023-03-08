import { useState } from "react";
import { Box, Typography, List, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { checkIpValidity } from "../utils/checkIpValidity";

type Props = {
  ipAddresses: string[];
  setIpAddresses: (arg0: string[]) => void;
  handleRemoveStagingIpAddress: (ipAddress: string) => void;
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

export function StagingIpAddresses({
  ipAddresses,
  setIpAddresses,
  handleRemoveStagingIpAddress,
}: Props) {
  const [isValidIpAddress, setIsValidIpAddress] = useState(true);
  const [formIpAddress, setFormIpAddress] = useState("");

  const handleIpFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormIpAddress(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkIpValidity(formIpAddress)) {
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
          onChange={handleIpFormChange}
        />
        <Button type="submit" variant="contained" color="primary">
          +
        </Button>
      </StyledForm>
      <List>
        {ipAddresses.map((ipAddress) => (
          <Box key={ipAddress} sx={{ m: 2 }}>
            <li>
              <span>{ipAddress}</span>
              <Button
                onClick={() => handleRemoveStagingIpAddress(ipAddress)}
                color="error"
              >
                X
              </Button>
            </li>
          </Box>
        ))}
      </List>
    </>
  );
}
