import { gql } from "@apollo/client";
import { getSession } from "next-auth/react";
import Head from "next/head";
import client from "../../../apollo-client";
import { InfoCareer } from "../../../components/Career/InfoCareer";
import { Navbar } from "../../../components/Navbar";
import decodeToken from "../../../utils/decodeToken";

const GET_CAREER_BY_ID = gql`
  query GetCareerById($id: String) {
    getCareerById(id: $id) {
      id
      name
      type
      description
      faculty
      idUniversity
      nameUniversity
      imageUniversity
      duration
      lastUpdate
      comments {
        id
        idUser
        idCareer
        content
        createdAt
        updatedAt
        nameUser
        imageUser
      }
      errors {
        message
      }
    }
  }
`;

const Carrera = ({ id, data, isLogged, user }) => {
  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content="Carrera." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLogged={isLogged} user={user}/>
      <InfoCareer id={id} user={user}/>
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

  const { id } = context.params;
  const { data } = await client.query({ query: GET_CAREER_BY_ID, variables: { id } });

  if (data.getCareerById.errors) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      id,
      data: data.getCareerById,
      isLogged,
      user
    }
  }
}

export default Carrera;
