import { Button, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import NextLink from "next/link";

export const CarrerButton = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant='ghost'
        colorScheme='gray'
        color='gray.700'
        fontWeight={500}
      >
        Carreras
      </MenuButton>
      <MenuList color='gray.600'>
        <MenuItem>
          <NextLink href="/carreras/ciencias" passHref>
            <Link width='full'>Ciencias</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/carreras/arte" passHref>
            <Link width='full'>Arte</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/carreras/arquitectura" passHref>
            <Link width='full'>Arquitectura</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/carreras/derecho" passHref>
            <Link width='full'>Derecho</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/carreras/ingenieria" passHref>
            <Link width='full'>Ingeniería</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/carreras/ciencias-sociales" passHref>
            <Link width='full'>Ciencias Sociales</Link>
          </NextLink>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
