import { Box, Heading, Image, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from 'next/link';

export const Error = () => {
  return (
    <Stack
      position='relative'
      flexDirection='row'
      alignItems='center'
      minH='100vh'
      minW='100wh'
      px={{ base: 5, md: 20 }}
      overflow='hidden'
      bg='cyan.200'
    >
      <Stack
        position='relative'
        flexDirection='row'
        flex='1'
        minW='full'
        h='auto'
        p={{ base: 10, md: 20 }}
        textAlign={{ base: 'center', md: 'left' }}
        color='gray.700'
        bg='white'
        shadow='xl'
        rounded='3xl'
      >
        <Box w={{ base: 'full', md: '60%' }}>
          <Box mb={{ base: 10, md: 12 }}>
            <NextLink href="/" passHref>
              <Link
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight='bold'
                color='cyan.500'
              >
                vocacción
              </Link>
            </NextLink>
          </Box>
          <Box
            mb={10}
            fontWeight='400'
            color='gray.600'
          >
            <Heading
              as='h1'
              mb={10}
              fontSize={{ base: '3xl', lg: '6xl' }}
              textTransform='uppercase'
            >
              NO ENCONTRADO
            </Heading>
            <Text>La página que está buscando no está disponible.</Text>
            <Text>Intente buscar de nuevo o utilice a continuación el botón <NextLink href="/" passHref><Link fontWeight={600}>Inicio</Link></NextLink>.</Text>
          </Box>
        </Box>
        <Box w={{ base: 'full', md: '40%' }} display='flex' alignItems='center' justifyContent='center'>
          <Image w='auto' h='96' src="/images/404.png" priority="true" alt="Error" layout="fill"/>
        </Box>
      </Stack>
    </Stack>
  )
}

