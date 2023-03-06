import Head from "next/head";
import { Typography } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled(Typography)`
  font-size: 3rem;
`;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>GeoLite2 IP Lookup</title>
      </Head>
      <Title variant="h1">GeoLite2 IP Lookup</Title>
    </Container>
  );
}
