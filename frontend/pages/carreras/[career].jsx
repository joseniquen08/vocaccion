import { getSession } from "next-auth/react";
import Head from "next/head";
import { ListCareersContainer } from "../../components/Career/ListCareersContainer";
import { Footer } from "../../components/Footer";
import { Navbar } from '../../components/Navbar';
import decodeToken from "../../utils/decodeToken";

const Career = ({ name, isLogged, user }) => {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content="Carrera." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLogged={isLogged} user={user}/>
      <ListCareersContainer name={name}/>
      <Footer/>
    </>
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
    };
  }

  const { career } = context.params;

  let name = career.split('-').map(word => word.split('').map((letter, i) => i === 0 ? letter.toUpperCase() : letter).join('')).join(' ');

  if (name === 'Ingenieria') name = 'Ingeniería';

  return {
    props: {
      name,
      isLogged,
      user
    }
  }
}

export default Career;
