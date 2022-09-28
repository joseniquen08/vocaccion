import { ListCareersContainer } from "@comp-career/ListCareersContainer";
import { Layout } from "@comp-shared/Layout";
import decodeToken from "@utils/decodeToken";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
  career: string;
}

const Career = ({ name, isLogged, user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content="Carrera." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout isLogged={isLogged} user={user}>
        <ListCareersContainer name={name}/>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

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

  const { career } = context.params as IParams;

  let name: string = career.split('-').map(word => word.split('').map((letter, i) => i === 0 ? letter.toUpperCase() : letter).join('')).join(' ');

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
