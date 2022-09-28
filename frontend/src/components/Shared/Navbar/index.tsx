import { Button, chakra, Flex, HStack, VStack } from '@chakra-ui/react';
import { UserType } from '../../../types/auth';
import { CarrerButton } from './CarrerButton';
import Logo from './Logo';
import { MenuMdButton } from './MenuMdButton';
import { SignButton } from './SignButton';
import { UniversityButton } from './UniversityButton';
import { UserButton } from './UserButton';

type Props = {
  isLogged: boolean;
  user: UserType;
}

export const Navbar = ({ isLogged, user }: Props) => {
  return (
    <>
      <chakra.nav
        pos="sticky"
        top={0}
        zIndex={50}
        w="full"
        bg='white'
      >
        <VStack
          px={{ base: '1rem', md: '2.5rem' }}
          w='full'
          justifyContent='center'
          h='4.5rem'
          borderBottom="1px solid"
          borderBottomColor={'#d6d3d1'}
        >
          <Flex w='full' alignItems="center" justifyContent="space-between" mx="auto">
            <Flex>
              <Logo/>
            </Flex>
            <HStack display="flex" alignItems="center" spacing={3}>
              <HStack display="flex" alignItems="center" spacing={4}>
                <HStack
                  spacing={2}
                  mr={1}
                  color="brand.500"
                  display={{ base: "none", md: "inline-flex" }}
                >
                  <CarrerButton/>
                  <UniversityButton/>
                  <Button variant="ghost" colorScheme='gray' color='gray.600' fontWeight="500">Ayuda</Button>
                </HStack>
              </HStack>
              {
                isLogged ? (
                  <UserButton name={user.name} image={user.image}/>
                ) : (
                  <SignButton/>
                )
              }
              <MenuMdButton/>
            </HStack>
          </Flex>
        </VStack>
      </chakra.nav>
    </>
  )
}
