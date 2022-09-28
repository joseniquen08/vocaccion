import { Features } from '@comp-home/Features';
import { Header } from '@comp-home/Header';
import { Layout } from '@comp-shared/Layout';
import decodeToken from '@utils/decodeToken';
import type { NextPage } from 'next';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';

const Home: NextPage = ({ isLogged, user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout isLogged={isLogged} user={user}>
      <>
        <Header user={user}/>
        <Features/>
      </>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context);

  if (session) {
    return {
      props: {
        isLogged: true,
        user: session.user,
      }
    }
  }

  if (context.req.cookies.token) {
    const decryptedToken = decodeToken(context.req.cookies.token);
    const user = {
      name: `${decryptedToken.name}`,
      image: `${decryptedToken.image}`,
      emailVerifiedV: decryptedToken.emailVerifiedV,
    }
    return {
      props: {
        isLogged: true,
        user,
      }
    }
  }

  return {
    props: {
      isLogged: null,
      user: null,
    }
  }
}

export default Home
