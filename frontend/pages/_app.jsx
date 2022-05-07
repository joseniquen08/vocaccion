import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { theme } from '../styles/theme.chakra';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Vocacción</title>
        <meta name="description" content="Vocacción web." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;