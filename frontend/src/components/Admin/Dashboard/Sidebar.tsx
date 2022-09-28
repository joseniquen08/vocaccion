import { Box, Collapse, Divider, Flex, Icon, Link, Text, useDisclosure, VStack } from "@chakra-ui/react";
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from "react";
import { FaRegCommentDots, FaRegMap } from 'react-icons/fa';
import { HiCode } from 'react-icons/hi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { RiBook2Line, RiBuildingLine, RiGroupLine, RiHomeSmile2Line, RiSettings5Line } from 'react-icons/ri';
import Logo from "./Logo";
import { NavItem } from "./NavItem";

type Props = {
  onClose?: () => void;
  flex?: string;
  w: string;
  borderRight: string;
  borderColor?: string;
  minH: string;
  display: {
    base: string;
    md: string;
  } | string;
  bg?: string;
}

export const Sidebar = ({ onClose, ...rest }: Props) => {

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
      px='1.5rem'
      py='1.5rem'
      {...rest}
    >
      <Box w='full'>
        <Flex pt="3" pb='6' align="center">
          <Logo/>
        </Flex>
        <Divider/>
        <VStack
          as="nav"
          fontSize="sm"
          py='1.5rem'
          color="gray.900"
          w='full'
          spacing='0.5rem'
        >
          <Box w='full'>
            <NextLink href="/admin/dashboard/inicio" passHref>
              <Link w='full'>
                <NavItem
                  onClose={onClose}
                  icon={RiHomeSmile2Line}
                  activeItem={pathname.split('/')[3] === 'inicio'}
                >
                  Inicio
                </NavItem>
              </Link>
            </NextLink>
          </Box>
          <NextLink href="/admin/dashboard/carreras" passHref>
            <Link w='full'>
              <NavItem
                onClose={onClose}
                icon={RiBook2Line}
                activeItem={pathname.split('/')[3] === 'carreras'}
              >
                Carreras
              </NavItem>
            </Link>
          </NextLink>
          <NextLink href="/admin/dashboard/universidades" passHref>
            <Link w='full'>
              <NavItem
                onClose={onClose}
                icon={RiBuildingLine}
                activeItem={pathname.split('/')[3] === 'universidades'}
              >
                Universidades
              </NavItem>
            </Link>
          </NextLink>
          <NextLink href="/admin/dashboard/usuarios" passHref>
            <Link w='full'>
              <NavItem
                onClose={onClose}
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
              mx={0}
              onClose={() => {
                onToggle();
                setIsActiveExtras(!isActiveExtras);
              }}
            >
              <>
                Extras
                <Icon
                  as={MdKeyboardArrowRight}
                  ml="auto"
                  transform={isOpen ? "rotate(90deg)" : "auto"}
                />
              </>
            </NavItem>
            <Collapse in={pathname.split('/')[3] === 'extras' ? isActiveExtras : isOpen}>
              <VStack spacing={1.5} py={1.5}>
                <NextLink href="/admin/dashboard/extras/ubicaciones" passHref>
                  <Link w='full'>
                    <NavItem pl="12" icon={FaRegMap} activeItem={pathname.split('/')[4] === 'ubicaciones'}>
                      Ubicaciones
                    </NavItem>
                  </Link>
                </NextLink>
                <NextLink href="/admin/dashboard/extras/comentarios" passHref>
                  <Link w='full'>
                    <NavItem icon={FaRegCommentDots} pl="12" activeItem={pathname.split('/')[4] === 'comentarios'}>
                      Comentarios
                    </NavItem>
                  </Link>
                </NextLink>
              </VStack>
            </Collapse>
          </Box>
          <NavItem
            onClose={onClose}
            icon={RiSettings5Line}
            activeItem={pathname.split('/')[3] === 'configuracion'}
          >
            <NextLink href="/admin/dashboard/configuracion" passHref>
              <Link w='full'>Configuración</Link>
            </NextLink>
          </NavItem>
        </VStack>
      </Box>
      <Box
        w='full'
        borderTopWidth='1px'
        borderTopColor='gray.300'
        py='0.75rem'
      >
        <Text color='gray.500' fontSize='sm'>© 2022 Vocacción. Todos los derechos reservados.</Text>
      </Box>
    </Box>
  )
}
