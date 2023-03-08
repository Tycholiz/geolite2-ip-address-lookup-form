import Head from "next/head";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { IpLookupForm } from "../components/IpLookupForm";

type Props = {
  data: any;
};

const Container = styled.div`
  height: 100vh;
  padding: 2em;
`;

const Title = styled(Typography)`
  font-size: 3rem;
`;

export default function Home({ data }: Props) {
  return (
    <>
      <Head>
        <title>GeoLite2 IP Lookup</title>
      </Head>
      <Container>
        <Title variant="h1">GeoLite2 IP Lookup</Title>
        <IpLookupForm />
      </Container>
    </>
  );
}
