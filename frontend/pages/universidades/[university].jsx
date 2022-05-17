import { getSession } from "next-auth/react";
import Head from "next/head";
import { Navbar } from '../../components/Navbar';
import { ListUniversityContainer } from "../../components/University/ListUniversityContainer";

const University = ({ name, isLogged, user }) => {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content="Universidades." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLogged={isLogged} user={user}/>
      <ListUniversityContainer name={name}/>
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
  const { university } = context.params;

  let name = university.split('-').map(word => word.split('').map((letter, i) => i === 0 ? letter.toUpperCase() : letter).join('')).join(' ');

  if (name === 'Publicas') name = 'Públicas';

  return {
    props: {
      name,
      isLogged: session ? true : false,
      user
    }
  }
}

export default University;
