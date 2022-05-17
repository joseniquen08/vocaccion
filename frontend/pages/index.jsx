import { Box } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import { Features } from "../components/Home/Features";
import { Header } from "../components/Home/Header";
import { Navbar } from "../components/Navbar";
import decodeToken from "../utils/decodeToken";

const HomePage = ({ isLogged, user }) => {
  return (
    <Box minH='100vh'>
      <Navbar isLogged={isLogged} user={user}/>
      <Header/>
      <Features/>
    </Box>
  )
}

export const getServerSideProps = async (context) => {
  let user = null;
  let isLogged = null;
  const session = await getSession(context);

  if (session) {
    isLogged = true;
    user = session.user;
  }

  if (context.req.cookies.token) {
    isLogged = true;
    const decryptedToken = decodeToken(context.req.cookies.token);
    user = {
      name: `${decryptedToken.firstName} ${decryptedToken.lastName}`,
      image: ''
    };
  }

  return {
    props: {
      isLogged,
      user
    }
  }
}

export default HomePage;
