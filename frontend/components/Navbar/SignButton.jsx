import { Button, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

const MotionMenuButton = motion(MenuButton);

export const SignButton = () => {
  return (
    <Menu>
      <MotionMenuButton
        as={Button}
        colorScheme='cyan'
        size='md'
        variant='outline'
        fontWeight={500}
        whileTap={{ scale: 0.92 }}
      >
        Ingresar
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
              py='0.4rem'
              borderRadius={6}
              _hover={{ backgroundColor: 'cyan.50' }}
              color='cyan.900'
            >
              Iniciar Sesión
            </Link>
          </NextLink>
        </MenuItem>
        <MenuItem
          _hover={{ backgroundColor: 'transparent' }}
          _focus={{ backgroundColor: 'transparent' }}
        >
          <NextLink href="/register" passHref>
            <Link
              w="full"
              textColor={'white'}
              textAlign='center'
              py='0.4rem'
              borderRadius={6}
              bg='cyan.600'
            >
              Registrarse
            </Link>
          </NextLink>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}