import { Box } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import { Navbar } from "../../components/Navbar";
import { Profile } from "../../components/Profile";
import decodeToken from "../../utils/decodeToken";

const Perfil = ({ isLogged, user }) => {
  return (
    <Box minH='100vh'>
      <Navbar isLogged={isLogged} user={user}/>
      <Profile id={user.id}/>
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
