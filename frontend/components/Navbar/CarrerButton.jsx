import { Button, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import NextLink from "next/link";

export const CarrerButton = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant='ghost'
        colorScheme='gray'
        color='gray.600'
        fontWeight={500}
      >
        Carreras
      </MenuButton>
      <MenuList color='gray.600'>
        <MenuItem>
          <NextLink href="/carreras/ciencias" passHref>
            <Link w='full'>Ciencias</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/carreras/arte" passHref>
            <Link w='full'>Arte</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/carreras/arquitectura" passHref>
            <Link w='full'>Arquitectura</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/carreras/derecho" passHref>
            <Link w='full'>Derecho</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/carreras/ingenieria" passHref>
            <Link w='full'>Ingeniería</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/carreras/ciencias-sociales" passHref>
            <Link w='full'>Ciencias Sociales</Link>
          </NextLink>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
