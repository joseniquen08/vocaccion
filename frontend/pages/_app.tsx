import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@theme/theme.chakra';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import client from '../apollo-client';

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps<{ session: Session }>) {

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
        <meta name='description' content='Vocaccion'/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps}/>
          </ChakraProvider>
        </ApolloProvider>
      </SessionProvider>
    </>
  )
}

export default MyApp;
