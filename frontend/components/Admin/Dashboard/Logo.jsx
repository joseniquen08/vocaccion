import { Badge, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';

const Logo = () => {
    return (
      <Flex
        justifyContent='center'
        flex={{ lg: '1 1 0%' }}
      >
        <Link href="/" passHref>
          <a>
            <HStack alignItems='end' spacing='1'>
              <Heading
                as='h2'
                fontSize={{ base: '2rem' }}
                fontWeight={700}
                color='white'
              >
                vocacción
              </Heading>
              <Text pb='0.2rem'>
                <Badge colorScheme='whiteAlpha' fontSize='0.75rem'>ADMIN</Badge>
              </Text>
            </HStack>
          </a>
        </Link>
      </Flex>
    );
}

export default Logo;