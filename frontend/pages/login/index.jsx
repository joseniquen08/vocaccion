import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { SignIn } from "../../components/Auth/SignIn";

const Login = () => {
  return (
    <>
      <Head>
        <title>Iniciar sesión - Vocacción</title>
        <meta name="description" content="Iniciar sesión" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignIn/>
    </>
  )
}

export const getServerSideProps = async (context) => {

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

export default Login;
