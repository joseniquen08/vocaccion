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

export default Login;