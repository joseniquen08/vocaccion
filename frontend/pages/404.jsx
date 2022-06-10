import Head from "next/head";
import { Error } from "../components/Error";

const Error404 = () => {
  return (
    <>
      <Head>
        <title>Error 404 - Vocacción</title>
        <meta name="description" content="Error 404" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Error/>
    </>
  );
}

export default Error404;