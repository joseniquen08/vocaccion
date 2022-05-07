import Head from 'next/head';
import { SignUp } from '../../components/Auth/SignUp';

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

export default Register;
