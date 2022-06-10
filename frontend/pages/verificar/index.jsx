import { Box } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { Verify } from "../../components/Verify";
import decodeToken from "../../utils/decodeToken";

const Verificar = ({ isLogged, user }) => {
  return (
    <Box minH='100vh'>
      <Navbar isLogged={isLogged} user={user}/>
      <Verify email={user.email}/>
      <Footer/>
    </Box>
  )
}

export const getServerSideProps = async (context) => {

  let user = null;
  let isLogged = null;
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
    isLogged = true;
    user = session.user;
  }

  if (context.req.cookies.token) {
    isLogged = true;
    const decryptedToken = decodeToken(context.req.cookies.token);
    user = {
      name: `${decryptedToken.name}`,
      image: `${decryptedToken.image}`,
      email: `${decryptedToken.email}`,
      emailVerifiedV: `${decryptedToken.emailVerifiedV}`,
    };
  }

  console.log(user);

  if (user.emailVerifiedV === 'true') {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      isLogged,
      user
    }
  }
}

export default Verificar;
