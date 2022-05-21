import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { SignInAdmin } from '../../../components/Admin/Auth/SignInAdmin';

const Login = () => {
  return (
    <>
      <Head>
        <title>Iniciar sesión [Admin] - Vocacción</title>
        <meta name="description" content="Iniciar sesión Admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignInAdmin/>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  console.log(session);

  if (session) {
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

export default Login;