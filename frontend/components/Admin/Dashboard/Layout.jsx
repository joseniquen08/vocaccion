import { Avatar, Box, Drawer, DrawerContent, DrawerOverlay, Flex, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, useDisclosure } from '@chakra-ui/react';
import { FaBell } from "react-icons/fa";
import { FiMenu, FiSearch } from "react-icons/fi";
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {

  const sidebar = useDisclosure();

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
          // py={{ base: '0.25rem', md: '0.75rem' }}
        >
          <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="6"
            py="1"
            height="3.5rem"
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
            <InputGroup w="96" display={{ base: "none", md: "flex" }}>
              <InputLeftElement color="gray.500" children={<FiSearch/>} />
              <Input
                color="gray.300"
                _focus={{
                  boxShadow: 'none',
                }}
                rounded='md'
                placeholder="Search for articles..."
              />
            </InputGroup>
            <Flex align="center">
              <Icon color="gray.500" as={FaBell} cursor="pointer" />
              <Avatar
                ml="4"
                size="sm"
                name="anubra266"
                src="https://avatars.githubusercontent.com/u/30869823?v=4"
                cursor="pointer"
              />
            </Flex>
          </Flex>
          <Box
            p="4"
            minHeight='calc(100vh - 3.5rem)'
            maxHeight='calc(100vh - 3.5rem)'
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
