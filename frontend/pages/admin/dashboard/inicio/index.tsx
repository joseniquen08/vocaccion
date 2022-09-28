import { Home } from "@comp-admin/Dashboard/Home";
import { Layout } from '@comp-admin/Dashboard/Layout';
import decodeToken from '@utils/decodeToken';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';


const Inicio = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout user={user}>
      <Home />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const decryptedToken = decodeToken(context.req.cookies.token!);

  let user = {
    id: `${decryptedToken.id}`,
    name: `${decryptedToken.name}`,
    email: `${decryptedToken.email}`,
    age: `${decryptedToken.age}`,
    image: `${decryptedToken.image}`,
    username: `${decryptedToken.username}`,
    role: `${decryptedToken.role}`,
    provider: `${decryptedToken.provider}`,
  };

  return {
    props: {
      user
    }
  }
}

export default Inicio;
