import Head from "next/head";
import { ListCareersContainer } from "../../components/Career/ListCareersContainer";
import { Navbar } from '../../components/Navbar';

const University = ({ name }) => {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content="Universidades." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <ListCareersContainer name={name}/>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {

  const { university } = params;

  let name = university.split('-').map(word => word.split('').map((letter, i) => i === 0 ? letter.toUpperCase() : letter).join('')).join(' ');

  if (name === 'Publicas') name = 'Públicas';

  return {
    props: {
      name
    }
  }
}

export default University;
