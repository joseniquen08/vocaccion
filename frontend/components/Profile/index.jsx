import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Button, Divider, Grid, GridItem, HStack, Input, NumberInput, NumberInputField, Tag, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

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

const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput) {
    updateUser(input: $input) {
      user {
        age
      }
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

  const { loading: loadingGetUser, data: dataGetUser } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });
  const [updateUserMutation, { loading: loadingUpdateUser, data: dataUpdateUser }] = useMutation(UPDATE_USER);
  const [updateUserWhitoutProviderMutation, { loading: loadingUpdateUserWhitoutProvider, data: dataUpdateUserWhitoutProvider }] = useMutation(UPDATE_USER_WHITOUT_PROVIDER);

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
      if (user.provider === 'no') {
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
        if (age > 12) {
          updateUserMutation({
            variables: {
              input: {
                email: user.email,
                age: parseInt(age)
              }
            }
          });
        }
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
    if (!loadingUpdateUser && dataUpdateUser) {
      setEditionAvailable(false);
      setAge(dataUpdateUser.updateUser.user.age);
    }
  }, [dataUpdateUser, loadingUpdateUser]);

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
    <Box width='full'>
      {
        loadingGetUser ? (
          <Text>Cargando...</Text>
        ) : (
          user && (
            <Box
              maxWidth='4xl'
              marginX='auto'
              marginY='3rem'
              border='1px solid'
              borderColor='#d6d3d1'
              rounded='2xl'
              overflow='hidden'
            >
              <Box position='relative'>
                <Box height='10rem' bg='cyan.100'></Box>
                <HStack position='absolute' alignItems='end' paddingX='5rem' bottom='-4.2rem' width='full'>
                  <HStack flex='none' alignItems='center' justifyContent='center' borderRadius='full' width='6.5rem' height='6.5rem' bg='white'>
                    <Box flex='none' alignItems='center' justifyContent='center' borderRadius='full' overflow='hidden' width='6rem' height='6rem'>
                      <Image src={user.image === '' ? '/images/user-default.png' : user.image} alt={user.name} width={96} height={96} priority="true"/>
                    </Box>
                  </HStack>
                  <HStack paddingBottom='0.5rem' width='full' justifyContent='space-between'>
                    <Box paddingLeft='0.75rem'>
                      <Text fontWeight={600} fontSize='xl' color='gray.700'>{user.name}</Text>
                      <Text fontWeight={500} fontSize='sm' color='gray.600'>
                        {user.email} <Tag size='sm' variant='outline' marginLeft='0.2rem' colorScheme='blackAlpha'>{user.provider !== 'no' ? user.provider.charAt(0).toUpperCase() + user.provider.slice(1) : 'Correo'}</Tag>
                      </Text>
                    </Box>
                    <Box>
                      {
                        editionAvailable ? (
                          <HStack spacing={2}>
                            <Button onClick={() => setEditionAvailable(!editionAvailable)} size='sm' variant='solid' colorScheme='gray'>Cancelar</Button>
                            <Button onClick={() => updateUser()} size='sm' variant='solid' colorScheme='cyan' color='white'>Guardar</Button>
                          </HStack>
                        ) : (
                          <Button onClick={() => setEditionAvailable(!editionAvailable)} size='sm' variant='solid' colorScheme='cyan' color='white'>Editar</Button>
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
                      <Text fontWeight={700} color='gray.600'>Username</Text>
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
                        color='gray.600'
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
                      <Text fontWeight={700} color='gray.600'>Nombres</Text>
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
                        color='gray.600'
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
                      <Text fontWeight={700} color='gray.600'>Edad</Text>
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
                          color='gray.600'
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
    </Box>
  )
}
