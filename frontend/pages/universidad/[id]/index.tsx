import { gql } from "@apollo/client";
import { Layout } from "@comp-shared/Layout";
import { InfoUniversity } from "@comp-university/InfoUniversity";
import { GetUniversityByIdType } from "@cust-types/admin/universityTypes";
import decodeToken from "@utils/decodeToken";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import client from "../../../apollo-client";

interface IParams extends ParsedUrlQuery {
  id: string;
}

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

const Universidad = ({ id, data, isLogged, user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content="Universidad." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout isLogged={isLogged} user={user}>
        <InfoUniversity id={id} user={user}/>
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
      id: `${decryptedToken.id}`,
      name: `${decryptedToken.name}`,
      image: `${decryptedToken.image}`,
    };
  }

  const { id } = context.params as IParams;
  const { data } = await client.query<GetUniversityByIdType>({ query: GET_UNIVERSITY_BY_ID, variables: { id } });

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
