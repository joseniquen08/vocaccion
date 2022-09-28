import { Profile } from "@comp-profile/index";
import { Layout } from "@comp-shared/Layout";
import decodeToken from "@utils/decodeToken";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";

const Perfil = ({ isLogged, user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout isLogged={isLogged} user={user}>
      <Profile id={user.id}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  let user = null;
  let isLogged = null;
  const session = await getSession(context);

  if (!(session || context.req.cookies.token)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  if (session) {
    isLogged = true;
    user = session.user;
  }

  if (context.req.cookies.token) {
    isLogged = true;
    const decryptedToken = decodeToken(context.req.cookies.token);
    user = {
      id: `${decryptedToken.id}`,
      name: `${decryptedToken.name}`,
      email: `${decryptedToken.email}`,
      age: `${decryptedToken.age}`,
      image: `${decryptedToken.image}`,
      username: `${decryptedToken.username}`,
      role: `${decryptedToken.role}`,
      provider: `${decryptedToken.provider}`,
    };
  }

  return {
    props: {
      isLogged,
      user
    }
  }
}

export default Perfil;
