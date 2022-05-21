import { Avatar, Box, Collapse, Divider, Flex, HStack, Icon, Link, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure, VStack } from "@chakra-ui/react";
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from "react";
import { HiCode } from 'react-icons/hi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { RiBook2Line, RiBuildingLine, RiGroupLine, RiHomeSmile2Line, RiSettings5Line } from 'react-icons/ri';
import Logo from "./Logo";
import { NavItem } from "./NavItem";

export const Sidebar = (props) => {

  const { isOpen, onToggle } = useDisclosure();
  const { pathname } = useRouter();

  const [isActiveExtras, setIsActiveExtras] = useState(true);

  return (
    <Box
      as='nav'
      position='sticky'
      top='0'
      bottom='0'
      left='0'
      h='full'
      overflowX='hidden'
      overflowY='auto'
      flexDirection='column'
      justifyContent='space-between'
      paddingX='1.5rem'
      paddingY='1.5rem'
      {...props}
    >
      <Box w='full'>
        <Flex pt="3" pb='6' align="center">
          <Logo/>
        </Flex>
        <Divider/>
        <VStack
          as="nav"
          fontSize="sm"
          paddingY='1.5rem'
          color="gray.900"
          w='full'
          spacing='0.5rem'
        >
          <Box width='full'>
            <NextLink href="/admin/dashboard/inicio" passHref>
              <Link width='full'>
                <NavItem
                  onClick={props.onClose}
                  icon={RiHomeSmile2Line}
                  activeItem={pathname.split('/')[3] === 'inicio'}
                >
                  Inicio
                </NavItem>
              </Link>
            </NextLink>
          </Box>
          <NextLink href="/admin/dashboard/carreras" passHref>
            <Link width='full'>
              <NavItem
                onClick={props.onClose}
                icon={RiBook2Line}
                activeItem={pathname.split('/')[3] === 'carreras'}
              >
                Carreras
              </NavItem>
            </Link>
          </NextLink>
          <NextLink href="/admin/dashboard/universidades" passHref>
            <Link width='full'>
              <NavItem
                onClick={props.onClose}
                icon={RiBuildingLine}
                activeItem={pathname.split('/')[3] === 'universidades'}
              >
                Universidades
              </NavItem>
            </Link>
          </NextLink>
          <NextLink href="/admin/dashboard/usuarios" passHref>
            <Link width='full'>
              <NavItem
                onClick={props.onClose}
                icon={RiGroupLine}
                activeItem={pathname.split('/')[3] === 'usuarios'}
              >
                Usuarios
              </NavItem>
            </Link>
          </NextLink>
          <Box w='full'>
            <NavItem
              icon={HiCode}
              marginX={0}
              onClick={() => {
                onToggle();
                setIsActiveExtras(!isActiveExtras);
              }}
            >
              Extras
              <Icon
                as={MdKeyboardArrowRight}
                ml="auto"
                transform={isOpen && "rotate(90deg)"}
              />
            </NavItem>
            <Collapse in={pathname.split('/')[3] === 'extras' ? isActiveExtras : isOpen}>
              <VStack spacing={1.5} paddingY={1.5}>
                <NextLink href="/admin/dashboard/extras/ubicaciones" passHref>
                  <Link width='full'>
                    <NavItem pl="12" py="2" activeItem={pathname.split('/')[4] === 'ubicaciones'}>
                      Ubicaciones
                    </NavItem>
                  </Link>
                </NextLink>
                <NextLink href="/admin/dashboard/extras/slack" passHref>
                  <Link width='full'>
                    <NavItem pl="12" py="2">
                      Slack
                    </NavItem>
                  </Link>
                </NextLink>
                <NextLink href="/admin/dashboard/extras/zapier" passHref>
                  <Link width='full'>
                    <NavItem pl="12" py="2">
                      Zapier
                    </NavItem>
                  </Link>
                </NextLink>
              </VStack>
            </Collapse>
          </Box>
          <NavItem
            onClick={props.onClose}
            icon={RiSettings5Line}
            activeItem={pathname.split('/')[3] === 'configuracion'}
          >
            <NextLink href="/admin/dashboard/configuracion" passHref>
              <Link width='full'>Configuración</Link>
            </NextLink>
          </NavItem>
        </VStack>
      </Box>
      <Box
        w='full'
        borderTopWidth='1px'
        borderTopColor='gray.300'
        py='1.5rem'
      >
        <Menu>
          <MenuButton
            w='full'
            bg='blackAlpha.500'
            color='white'
            rounded='lg'
          >
            <HStack
              w='full'
              px='0.6rem'
              py='1rem'
              alignItems='center'
              justifyContent='start'
              spacing='0.75rem'
              overflow='hidden'
            >
              <Avatar
                flex='none'
                borderRadius='md'
                w='2.5rem'
                h='2.5rem'
                name='anubra266'
                src='https://avatars.githubusercontent.com/u/30869823?v=4'
              />
              <VStack flexShrink='1' minW='0' alignItems='left' spacing='0' pr='0.25rem'>
                <Text fontSize='0.875rem' textAlign='left' fontWeight='500' isTruncated>Juan Ramirez Villanueva</Text>
                <Text fontSize='0.75rem' textAlign='left' fontWeight='300' isTruncated>juan.ramirez05@gmail.com</Text>
              </VStack>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem>Ya</MenuItem>
            <MenuItem>Ya</MenuItem>
            <MenuItem>Ya</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  )
}
