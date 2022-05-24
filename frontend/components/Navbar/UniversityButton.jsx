import { Button, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import NextLink from 'next/link';

export const UniversityButton = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant='ghost'
        colorScheme='gray'
        color='gray.600'
        fontWeight="500"
      >
        Universidades
      </MenuButton>
      <MenuList color='gray.600'>
        <MenuItem>
          <NextLink href="/universidades/publicas" passHref>
            <Link width='full'>Públicas</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/universidades/privadas" passHref>
            <Link width='full'>Privadas</Link>
          </NextLink>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}