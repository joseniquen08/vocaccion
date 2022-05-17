import { getSession } from "next-auth/react";
import Head from "next/head";
import { ListCareersContainer } from "../../components/Career/ListCareersContainer";
import { Navbar } from '../../components/Navbar';

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
    </>
  )
}

export const getServerSideProps = async (context) => {

  let user = null;
  const session = await getSession(context);
  console.log(session);
  if (session) {
    user = session.user;
  }
  const { career } = context.params;

  let name = career.split('-').map(word => word.split('').map((letter, i) => i === 0 ? letter.toUpperCase() : letter).join('')).join(' ');

  if (name === 'Ingenieria') name = 'Ingeniería';

  return {
    props: {
      name,
      isLogged: session ? true : false,
      user
    }
  }
}

export default Career;
