import { Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';

const Logo = () => {
    return (
      <Flex
        justifyContent="start"
        flex={{ lg: '1 1 0%' }}
      >
        <Link href="/" passHref>
          <a>
            <Heading
              as='h2'
              fontSize={{ base: '2rem' }}
              fontWeight={700}
              color='cyan.500'
            >
              vocacción
            </Heading>
          </a>
        </Link>
      </Flex>
    );
}

export default Logo;