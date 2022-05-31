import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import client from '../apollo-client';
import { theme } from '../styles/theme.chakra';

function App({ Component, pageProps: { session, ...pageProps } }) {

  dayjs.extend(updateLocale);
  dayjs.updateLocale('en', {
    relativeTime: {
      future: 'en %s',
      past: 'hace %s',
      s: 'unos segundos',
      m: 'un minuto',
      mm: '%d minutos',
      h: 'una hora',
      hh: '%d horas',
      d: 'un día',
      dd: '%d días',
      M: 'un mes',
      MM: '%d meses',
      y: 'un año',
      yy: '%d años',
    },
  });
  dayjs.extend(relativeTime);

  return (
    <>
      <Head>
        <title>Vocacción</title>
        <meta name="description" content="Vocacción web." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      </SessionProvider>
    </>
  );
};

export default App;