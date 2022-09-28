import { SignUp } from '@comp-auth/SignUp';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

const Register = () => {
  return (
    <>
      <Head>
        <title>Registro - Vocacción</title>
        <meta name="description" content="Registro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUp/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context);

  if (session || context.req.cookies.token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default Register;
