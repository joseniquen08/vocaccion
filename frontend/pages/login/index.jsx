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

export default Login;
