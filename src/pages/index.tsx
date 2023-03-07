import Head from "next/head";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { IpLookupForm } from "../components/IpLookupForm";
import GeoLiteDS from "../data-sources/GeoLiteDS";
import { makeObjectSerializable } from "../utils/makeObjectSerializable";

type Props = {
  data: any;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

export async function getServerSideProps() {
  const geoLiteDS = new GeoLiteDS();
  const geolocationData = await geoLiteDS.getData();

  return {
    props: {
      data: makeObjectSerializable({ ...geolocationData }),
    },
  };
}
