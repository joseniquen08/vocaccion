import { gql } from "@apollo/client";
import { InfoCareer } from "@comp-career/InfoCareer";
import { Layout } from "@comp-shared/Layout";
import { GetCareerByIdType } from "@cust-types/admin/careerTypes";
import decodeToken from "@utils/decodeToken";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import client from "../../../apollo-client";

interface IParams extends ParsedUrlQuery {
  id: string;
}

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

const Carrera = ({ id, data, isLogged, user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content="Carrera." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout isLogged={isLogged} user={user}>
        <InfoCareer id={id} user={user}/>
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
  const { data } = await client.query<GetCareerByIdType>({ query: GET_CAREER_BY_ID, variables: { id } });

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
