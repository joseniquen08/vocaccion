import { Button, HStack, Link, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import NextLink from 'next/link';
import Router from 'next/router';
import Cookies from 'universal-cookie';

const MotionMenuButton = motion(MenuButton);

export const UserButton = ({ name, image }) => {

  const cookies = new Cookies();
  const { data: session } = useSession();

  const logout = () => {
    if (session) {
      signOut();
    } else {
      cookies.remove('token', { path: '/' });
      Router.reload();
    }
  }

  return (
    <Menu>
      <MotionMenuButton
        as={Button}
        colorScheme='cyan'
        leftIcon={
          <HStack alignItems='center' justifyContent='center' borderRadius='full' overflow='hidden'>
            <Image src={image === '' ? '/images/user-default.png' : image} alt={name} width={24} height={24} priority="true"/>
          </HStack>
        }
        size='md'
        width='10rem'
        variant='solid'
        color='white'
        fontWeight={500}
        whileTap={{ scale: 0.92 }}
      >
        <VStack w='full' alignItems='start'>
          <Text w='full' textAlign='left' noOfLines={1}>{name}</Text>
        </VStack>
      </MotionMenuButton>
      <MenuList>
        <MenuItem
          _hover={{ backgroundColor: 'transparent' }}
          _focus={{ backgroundColor: 'transparent' }}
        >
          <NextLink href="/login" passHref>
            <Link
              w="full"
              textAlign='center'
              paddingY='0.4rem'
              borderRadius={6}
              _hover={{ backgroundColor: 'cyan.50' }}
              color='cyan.900'
            >
              Perfil
            </Link>
          </NextLink>
        </MenuItem>
        <MenuItem
          _hover={{ backgroundColor: 'transparent' }}
          _focus={{ backgroundColor: 'transparent' }}
        >
          <Button
            onClick={() => logout()}
            w='full'
            textColor='white'
            colorScheme='cyan'
          >
            Cerrar sesión
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}