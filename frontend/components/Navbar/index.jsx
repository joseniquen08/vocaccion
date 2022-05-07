import { Box, Button, chakra, Flex, HStack } from "@chakra-ui/react";
import { CarrerButton } from "./CarrerButton";
import Logo from "./Logo";
import { MenuMdButton } from "./MenuMdButton";
import { SignButton } from "./SignButton";
import { UniversityButton } from "./UniversityButton";

export const Navbar = () => {
  return (
    <>
      <chakra.nav
        pos="sticky"
        top={0}
        zIndex={50}
        w="full"
        bg='white'
      >
        <Box
          paddingX={{ base: '1rem', md: '2.5rem' }}
          paddingY="1rem"
          borderBottom="1px solid"
          borderBottomColor={'#d6d3d1'}
        >
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <Flex>
              <Logo/>
            </Flex>
            <HStack display="flex" alignItems="center" spacing={4}>
              <HStack display="flex" alignItems="center" spacing={4}>
                <HStack
                  spacing={2}
                  mr={1}
                  color="brand.500"
                  display={{ base: "none", md: "inline-flex" }}
                >
                  <CarrerButton/>
                  <UniversityButton/>
                  <Button variant="ghost" colorScheme='gray' color='gray.700' fontWeight="500">Ayuda</Button>
                </HStack>
              </HStack>
              <SignButton/>
              <MenuMdButton/>
            </HStack>
          </Flex>
        </Box>
      </chakra.nav>
    </>
  )
}