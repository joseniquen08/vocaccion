import { gql } from "@apollo/client";
import { getSession } from "next-auth/react";
import Head from "next/head";
import client from "../../../apollo-client";
import { Navbar } from "../../../components/Navbar";
import { InfoUniversity } from "../../../components/University/InfoUniversity";
import decodeToken from "../../../utils/decodeToken";

const GET_UNIVERSITY_BY_ID = gql`
  query GetUniversityById($id: String) {
    getUniversityById(id: $id) {
      _id
      name
      regions {
        id
        idReference
        name
      }
      provinces {
        id
        idReference
        name
        idReferenceRegion
      }
      type
      license
      campuses
      image
      comments {
        id
        idUser
        idUniversity
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

const Universidad = ({ id, data, isLogged, user }) => {
  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content="Universidad." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isLogged={isLogged} user={user}/>
      <InfoUniversity id={id} user={user}/>
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
  const { data } = await client.query({ query: GET_UNIVERSITY_BY_ID, variables: { id } });

  if (data.getUniversityById.errors) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      id,
      data: data.getUniversityById,
      isLogged,
      user
    }
  }
}

export default Universidad;
