import { Box, Button, Drawer, DrawerContent, DrawerOverlay, Flex, HStack, Icon, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FaBell } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import Cookies from 'universal-cookie';
import { Sidebar } from './Sidebar';

const MotionMenuButton = motion(MenuButton);

export const Layout = ({ user, children }) => {

  const cookies = new Cookies();
  const router = useRouter();

  const sidebar = useDisclosure();

  const logout = () => {
    cookies.remove('token', { path: '/' });
    router.reload();
  }

  return (
    <Box minH='100vh' bg='gray.800'>
      <HStack
        as="section"
        minH="100vh"
        spacing='0'
        bg='blackAlpha.300'
        w='full'
      >
        <Sidebar
          flex='none'
          w='20rem'
          borderRight='1px solid'
          borderColor='gray.600'
          minHeight='100vh'
          display={{ base: 'none', md: 'flex' }}
        />
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay/>
          <DrawerContent>
            <Sidebar w="full" bg='white' minHeight='full' borderRight='none' display='flex' onClose={sidebar.onClose}/>
          </DrawerContent>
        </Drawer>
        <Box
          transition=".3s ease"
          minHeight='100vh'
          maxHeight='100vh'
          overflowY='auto'
          w='full'
        >
          <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="1.5rem"
            height="3.75rem"
            borderBottom='1px solid'
            borderColor='gray.600'
          >
            <IconButton
              display={{ base: "inline-flex", md: "none" }}
              onClick={sidebar.onOpen}
              colorScheme='cyan'
              variant='outline'
              icon={<FiMenu />}
              size="sm"
            />
            <Box>
              <Text color='gray.300' fontWeight={500}>Bienvenid@, {user.name}</Text>
            </Box>
            <HStack alignItems="center" spacing={5}>
              <Icon color="gray.500" as={FaBell} cursor="pointer" />
              <Menu>
                <MotionMenuButton
                  as={IconButton}
                  colorScheme='whiteAlpha'
                  icon={
                    <HStack alignItems='center' justifyContent='center' borderRadius='full' overflow='hidden'>
                      <Image src={user.image === '' ? '/images/user-default.png' : user.image} alt={user.name} width={28} height={28} priority="true"/>
                    </HStack>
                  }
                  size='md'
                  variant='ghost'
                  whileTap={{ scale: 0.92 }}
                />
                <MenuList bg='gray.800' borderColor='gray.600'>
                  <MenuItem
                    _hover={{ backgroundColor: 'transparent' }}
                    _focus={{ backgroundColor: 'transparent' }}
                    color='white'
                  >
                    <NextLink href="/admin/dashboard/perfil" passHref>
                      <Link
                        w="full"
                        textAlign='center'
                        paddingY='0.4rem'
                        borderRadius={6}
                        _hover={{ backgroundColor: 'whiteAlpha.50' }}
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
            </HStack>
          </Flex>
          <Box
            p="4"
            minHeight='calc(100vh - 3.75rem)'
            maxHeight='calc(100vh - 3.75rem)'
            overflowY='scroll'
            sx={{
              '&::-webkit-scrollbar': {
                width: '14px',
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'transparent',
                borderRadius: '10px',
              },
              '&:hover::-webkit-scrollbar': {
                background: '#1A202C',
              },
              '&:hover::-webkit-scrollbar-thumb': {
                background: '#718096',
                border: '3px solid #1A202C',
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </HStack>
    </Box>
  )
}
