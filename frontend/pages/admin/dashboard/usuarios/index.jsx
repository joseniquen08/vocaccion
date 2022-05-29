import { Layout } from "../../../../components/Admin/Dashboard/Layout";
import { Users } from "../../../../components/Admin/Dashboard/Users";
import decodeToken from "../../../../utils/decodeToken";

const Usuarios = ({ user }) => {
  return (
    <Layout user={user}>
      <Users/>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {

  const decryptedToken = decodeToken(context.req.cookies.token);

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

export default Usuarios;
