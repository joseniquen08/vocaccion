import { Layout } from "@comp-shared/Layout";
import { Verify } from "@comp-verify/index";
import decodeToken from "@utils/decodeToken";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";

const Verificar = ({ isLogged, user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout isLogged={isLogged} user={user}>
      <Verify email={user.email}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context);

  if (!(session || context.req.cookies.token)) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  if (session) {
    if (session.user.emailVerifiedV === true) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
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
      user: null
    }
  }
}

export default Verificar;
