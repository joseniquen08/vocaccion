import { Box, Flex, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from 'next/link';

const MotionLink = motion(Link);

export const Header = ({ user }) => {
  return (
    <Flex
      h='full'
      overflow='hidden'
      bg='white'
      alignItems='center'
    >
      <Box h='full' mx='auto' maxW='5xl' py='12rem' px='2rem'>
        <VStack w='full' spacing='2rem'>
          <Heading
            as='p'
            fontSize={{ base: '6xl', md: '7xl' }}
            lineHeight='1.1'
            fontWeight='700'
            color='cyan.500'
            textAlign='center'
          >
            ¿No sabes qué estudiar?
          </Heading>
          <Text
            textAlign='center'
            my={{ base: '1rem', sm: '1.25rem'}}
            color='gray.500'
            fontSize='xl'
            fontWeight='400'
          >
            Te damos ese empujoncito que necesitas para decidir tu futuro.
          </Text>
          <Flex w='full' alignItems='center' justifyContent='center'>
            <NextLink href={user ? '/carreras/ciencias' : '/login'} passHref>
              <MotionLink
                textAlign='center'
                fontSize='1.1rem'
                py='0.8rem'
                px='1.5rem'
                borderRadius={12}
                bg='cyan.500'
                color='white'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
              >
                Empezar
              </MotionLink>
            </NextLink>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  )
}
