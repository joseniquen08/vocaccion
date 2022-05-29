import { getSession } from "next-auth/react";
import Head from "next/head";
import { Navbar } from '../../components/Navbar';
import { ListUniversityContainer } from "../../components/University/ListUniversityContainer";
import decodeToken from "../../utils/decodeToken";

const University = ({ name, university, isLogged, user }) => {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content="Universidades." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLogged={isLogged} user={user}/>
      <ListUniversityContainer name={name} university={university}/>
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

  const { university } = context.params;

  let name = university.split('-').map(word => word.split('').map((letter, i) => i === 0 ? letter.toUpperCase() : letter).join('')).join(' ');

  if (name === 'Publicas') name = 'Públicas';

  return {
    props: {
      name,
      university,
      isLogged,
      user
    }
  }
}

export default University;
