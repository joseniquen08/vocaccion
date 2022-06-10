import { Box } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import { Footer } from "../components/Footer";
import { Features } from "../components/Home/Features";
import { Header } from "../components/Home/Header";
import { Navbar } from "../components/Navbar";
import decodeToken from "../utils/decodeToken";

const HomePage = ({ isLogged, user }) => {
  return (
    <Box minH='100vh'>
      <Navbar isLogged={isLogged} user={user}/>
      <Header user={user}/>
      <Features/>
      <Footer/>
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
      name: `${decryptedToken.name}`,
      image: `${decryptedToken.image}`,
      emailVerifiedV: `${decryptedToken.emailVerifiedV}`,
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
