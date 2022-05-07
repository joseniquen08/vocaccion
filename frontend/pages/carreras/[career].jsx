import Head from "next/head";
import { ListCareersContainer } from "../../components/Career/ListCareersContainer";
import { Navbar } from '../../components/Navbar';

const Career = ({ name }) => {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content="Carrera." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <ListCareersContainer name={name}/>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {

  const { career } = params;

  let name = career.split('-').map(word => word.split('').map((letter, i) => i === 0 ? letter.toUpperCase() : letter).join('')).join(' ');

  if (name === 'Ingenieria') name = 'Ingeniería';

  return {
    props: {
      name
    }
  }
}

export default Career;
