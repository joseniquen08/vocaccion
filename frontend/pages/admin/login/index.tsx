import { SignInAdmin } from '@comp-admin/Auth/SignInAdmin';
import { GetServerSideProps } from "next";
import { getSession } from 'next-auth/react';
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Iniciar sesión - Vocacción</title>
        <meta name="description" content="Iniciar sesión Admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignInAdmin/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default Login;