import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Button, Divider, Grid, GridItem, Heading, HStack, IconButton, Input, NumberInput, NumberInputField, Tag, Text, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import Cookies from "universal-cookie";
import { ModalPhoto } from "./ModalPhoto";

const GET_USER_BY_ID = gql`
  query getUserById($id: String) {
    getUserById(id: $id) {
      username
      name
      email
      image
      age
      provider
    }
  }
`;

const UPDATE_USER_WHITOUT_PROVIDER = gql`
  mutation UpdateUserWhitoutProvider($input: UpdateUserWhitoutProviderInput) {
    updateUserWhitoutProvider(input: $input) {
      token
      user {
        username
        name
        age
      }
    }
  }
`;

export const Profile = ({ id }) => {

  const cookies = new Cookies();

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [editionAvailable, setEditionAvailable] = useState(false);

  const { loading: loadingGetUser, data: dataGetUser, refetch: refetchGetUser } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });
  const [updateUserWhitoutProviderMutation, { loading: loadingUpdateUserWhitoutProvider, data: dataUpdateUserWhitoutProvider }] = useMutation(UPDATE_USER_WHITOUT_PROVIDER);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleAge = (value) => {
    setAge(value);
  }

  const updateUser = () => {
    if (
      username !== user.username ||
      name !== user.name ||
      age !== user.age
    ) {
      if (
        username !== '' &&
        name !== '' &&
        age > 12
      ) {
        updateUserWhitoutProviderMutation({
          variables: {
            input: {
              email: user.email,
              username,
              name,
              age: parseInt(age)
            }
          }
        });
      }
    } else {
      setEditionAvailable(false);
    }
  }

  useEffect(() => {
    if (!loadingGetUser && dataGetUser) {
      setEditionAvailable(false);
      setUser(dataGetUser.getUserById);
      setUsername(dataGetUser.getUserById.username);
      setName(dataGetUser.getUserById.name);
      setAge(dataGetUser.getUserById.age);
    }
  }, [loadingGetUser, dataGetUser]);

  useEffect(() => {
    if (!loadingUpdateUserWhitoutProvider && dataUpdateUserWhitoutProvider) {
      cookies.remove("token");
      cookies.set("token", dataUpdateUserWhitoutProvider.updateUserWhitoutProvider.token, { path: '/' });
      setEditionAvailable(false);
      setUsername(dataUpdateUserWhitoutProvider.updateUserWhitoutProvider.user.username);
      setName(dataUpdateUserWhitoutProvider.updateUserWhitoutProvider.user.name);
      setAge(dataUpdateUserWhitoutProvider.updateUserWhitoutProvider.user.age);
    }
  }, [dataUpdateUserWhitoutProvider, loadingUpdateUserWhitoutProvider]);

  return (
    <Box w='full'>
      <Heading
        marginTop='0.5rem'
        fontSize='3xl'
        textAlign='center'
        color='white'
        marginBottom={5}
      >
        Perfil
      </Heading>
      {
        loadingGetUser ? (
          <HStack justifyContent='center' w='full' py={6}>
            <Button
              isLoading
              loadingText='Cargando...'
              colorScheme='gray'
              variant='ghost'
              spinnerPlacement='start'
              size='lg'
            ></Button>
          </HStack>
        ) : (
          user && (
            <Box
              maxWidth='4xl'
              marginX='auto'
              marginY='0.5rem'
              border='1px solid'
              borderColor='#d6d3d1'
              rounded='2xl'
              overflow='hidden'
            >
              <Box position='relative'>
                <Box height='10rem' bg='gray.700'></Box>
                <HStack position='absolute' alignItems='end' paddingX='5rem' bottom='-4.2rem' width='full'>
                  <HStack flex='none' position='relative' alignItems='center' justifyContent='center' borderRadius='full' width='6.5rem' height='6.5rem' bg='gray.800'>
                    <Box flex='none' alignItems='center' justifyContent='center' borderRadius='full' overflow='hidden' width='6rem' height='6rem'>
                      <Image src={user.image === '' ? '/images/user-default.png' : user.image} alt={user.name} width={96} height={96} priority="true" objectFit="cover" objectPosition='center'/>
                    </Box>
                    {
                      user.provider === 'no' && (
                        <Box position='absolute' bottom={0} right={0}>
                          <IconButton
                            colorScheme='blackAlpha'
                            size='sm'
                            icon={<FaCamera />}
                            rounded='full'
                            onClick={onOpen}
                          />
                        </Box>
                      )
                    }
                  </HStack>
                  <HStack paddingBottom='0.5rem' width='full' justifyContent='space-between'>
                    <Box paddingLeft='0.75rem'>
                      <Text fontWeight={600} fontSize='xl' color='gray.100'>{user.name}</Text>
                      <Text fontWeight={500} fontSize='sm' color='gray.500'>
                        {user.email} <Tag size='sm' variant='outline' marginLeft='0.2rem' colorScheme='whiteAlpha'>{user.provider !== 'no' ? user.provider.charAt(0).toUpperCase() + user.provider.slice(1) : 'Correo'}</Tag>
                      </Text>
                    </Box>
                    <Box>
                      {
                        editionAvailable ? (
                          <HStack spacing={2}>
                            <Button onClick={() => setEditionAvailable(!editionAvailable)} size='sm' variant='solid' colorScheme='whiteAlpha'>Cancelar</Button>
                            <Button onClick={() => updateUser()} size='sm' variant='solid' colorScheme='blackAlpha' color='white'>Guardar</Button>
                          </HStack>
                        ) : (
                          <Button onClick={() => setEditionAvailable(!editionAvailable)} size='sm' variant='solid' colorScheme='blackAlpha' color='white'>Editar</Button>
                        )
                      }
                    </Box>
                  </HStack>
                </HStack>
              </Box>
              <Box marginTop='4.5rem' paddingY='3rem' paddingX='5rem'>
                <Box paddingY='1rem'>
                  <Grid templateColumns='repeat(12, 1fr)'>
                    <GridItem colSpan={4}>
                      <Text fontWeight={700} color='gray.500'>Username</Text>
                    </GridItem>
                    <GridItem colSpan={8}>
                      <Input
                        variant={editionAvailable ? 'outline' : 'unstyled'}
                        name="username"
                        value={username}
                        onChange={handleUsername}
                        _focus={{
                          boxShadow: 'none',
                        }}
                        fontSize='0.95rem'
                        fontWeight='500'
                        color='gray.300'
                        bg={editionAvailable ? user.provider !== 'no' ? 'gray.100' : 'transparent' : 'transparent'}
                        readOnly={user.provider === 'no' ? !editionAvailable : true}
                      />
                    </GridItem>
                  </Grid>
                </Box>
                <Divider/>
                <Box paddingY='1rem'>
                  <Grid templateColumns='repeat(12, 1fr)'>
                    <GridItem colSpan={4}>
                      <Text fontWeight={700} color='gray.500'>Nombres</Text>
                    </GridItem>
                    <GridItem colSpan={8}>
                      <Input
                        variant={editionAvailable ? 'outline' : 'unstyled'}
                        name="name"
                        value={name}
                        onChange={handleName}
                        _focus={{
                          boxShadow: 'none',
                        }}
                        fontSize='0.95rem'
                        fontWeight='500'
                        color='gray.300'
                        bg={editionAvailable ? user.provider !== 'no' ? 'gray.100' : 'transparent' : 'transparent'}
                        readOnly={user.provider === 'no' ? !editionAvailable : true}
                      />
                    </GridItem>
                  </Grid>
                </Box>
                <Divider/>
                <Box paddingY='1rem'>
                  <Grid templateColumns='repeat(12, 1fr)'>
                    <GridItem colSpan={4}>
                      <Text fontWeight={700} color='gray.500'>Edad</Text>
                    </GridItem>
                    <GridItem colSpan={8}>
                      <NumberInput
                        variant={editionAvailable ? 'outline' : 'unstyled'}
                        name="age"
                        defaultValue={age}
                        value={age}
                        onChange={handleAge}
                        readOnly={!editionAvailable}
                      >
                        <NumberInputField
                          _focus={{
                            boxShadow: 'none',
                          }}
                          fontSize='0.95rem'
                          fontWeight='500'
                          color='gray.300'
                        />
                      </NumberInput>
                    </GridItem>
                  </Grid>
                </Box>
              </Box>
            </Box>
          )
        )
      }
      {
        user && (
          <ModalPhoto isOpen={isOpen} onClose={onClose} user={user} refetch={refetchGetUser}/>
        )
      }
    </Box>
  )
}
