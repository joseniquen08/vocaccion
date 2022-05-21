import { gql, useMutation } from "@apollo/client";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputLeftElement, InputRightAddon, Link, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { signIn } from 'next-auth/react';
import NextLink from "next/link";
import Router from 'next/router';
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Cookies from 'universal-cookie';
import Logo from "../Navbar/Logo";

const MotionButton = motion(Button);

const SIGN_IN_MUTATION = gql`
  mutation SignIn($loginRequest: LoginInput) {
    login(loginRequest: $loginRequest) {
      token
    }
  }
`;

export const SignIn = () => {

  const cookies = new Cookies();

  const [loginUser, { data, loading }] = useMutation(SIGN_IN_MUTATION);

  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  }

  const login = (e) => {
    e.preventDefault();
    if (emailRef.current.value && passwordRef.current.value) {
      loginUser({
        variables: {
          loginRequest: {
            email: emailRef.current.value,
            password: passwordRef.current.value
          }
        }
      });
    }
  }

  // TODO: arreglar errores customizados en el formulario

  useEffect(() => {
    if (!loading && data) {
      cookies.set("token", data.login.token, { path: '/' });
      Router.push("/");
    }
  }, [data, loading]);

  return (
    <Flex
      height='full'
      minHeight='100vh'
    >
      <Flex
        width={{ base: '100%', md: '50%'}}
        paddingX={{ base: '1rem', sm: '1.5rem', lg: '2rem' }}
        paddingY='3rem'
        alignItems='center'
        justifyContent='center'
        position='relative'
      >
        <Box
          width='full'
          maxW='sm'
        >
          <VStack
            as={Flex}
            flexDirection='column'
            spacing='2.2rem'
            paddingX='1.8rem'
            paddingY='2.8rem'
            backgroundColor='white'
          >
            <Box width='full' paddingY='0.3rem'>
              <Heading
                as='p'
                size='xl'
                textAlign='center'
                fontWeight={700}
                color='cyan.500'
                cursor='default'
              >
                Iniciar Sesión
              </Heading>
            </Box>
            <VStack
              as='form'
              width='full'
              marginTop='2rem'
              spacing='1.2rem'
              onSubmit={login}
            >
              <VStack width='full'>
                <Button
                  type='button'
                  onClick={() => signIn('google')}
                  leftIcon={<FaGoogle size={16}/>}
                  variant='outline'
                  fontWeight={400}
                  color='gray.500'
                  colorScheme='gray'
                  width='full'
                >
                  Ingresa con Google
                </Button>
                <Button
                  type='button'
                  onClick={() => signIn('facebook')}
                  leftIcon={<FaFacebook size={18}/>}
                  variant='outline'
                  fontWeight={400}
                  color='gray.500'
                  colorScheme='gray'
                  width='full'
                >
                  Ingresa con Facebook
                </Button>
              </VStack>
              <HStack width='full' alignItems='center' justifyContent='center'>
                <Divider bg='gray.700' opacity={1}/>
                <Text color='gray.500' fontWeight={300}>o</Text>
                <Divider bg='gray.700' opacity={1}/>
              </HStack>
              <VStack
                width='full'
                spacing='0.6rem'
              >
                <FormControl isRequired>
                  <FormLabel color='gray.600' fontSize='0.875rem' htmlFor='email'>Correo Electrónico</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      paddingLeft='0.3rem'
                      color='gray.600'
                      children={<HiOutlineMail size={18}/>}
                    />
                    <Input
                      ref={emailRef}
                      id='email'
                      type='email'
                      size='md'
                      _focus={{
                        boxShadow: 'none',
                      }}
                      fontSize='0.95rem'
                      fontWeight='500'
                      color='gray.600'
                      autoFocus
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color='gray.600' fontSize='0.875rem' htmlFor='password'>Contraseña</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      paddingLeft='0.3rem'
                      color='gray.600'
                      children={<HiOutlineLockClosed size={18}/>}
                    />
                    <Input
                      ref={passwordRef}
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      _focus={{
                        boxShadow: 'none',
                      }}
                      fontSize='0.95rem'
                      fontWeight='500'
                      color='gray.600'
                    />
                    <InputRightAddon
                      backgroundColor='white'
                      paddingX={0}
                      paddingY={0}
                    >
                      <Button
                        color='gray.600'
                        onClick={handleShowPassword}
                      >
                        {showPassword ? <MdVisibilityOff size={18}/> : <MdVisibility size={18}/>}
                      </Button>
                    </InputRightAddon>
                  </InputGroup>
                </FormControl>
              </VStack>
              <VStack width='full' paddingY='0.5rem' spacing='0.6rem'>
                <MotionButton
                  isLoading={loading}
                  type='submit'
                  variant='solid'
                  bg='cyan.500'
                  width='full'
                  whileTap={{ scale: 0.95 }}
                >Ingresar</MotionButton>
                <Text fontSize='0.85rem' textAlign='center' letterSpacing='wide'>
                  ¿No tienes una cuenta? Créala <NextLink href="/register" passHref><Link fontWeight={700} color='cyan.500'>aquí</Link></NextLink>
                </Text>
              </VStack>
              <Flex width='full' paddingY='1.5rem'>
                <NextLink href="/" passHref>
                  <Button
                    leftIcon={<ArrowBackIcon />}
                    colorScheme='cyan'
                    variant='ghost'
                    fontSize='0.95rem'
                  >
                    Regresar
                  </Button>
                </NextLink>
              </Flex>
            </VStack>
          </VStack>
        </Box>
        <Box
          position='absolute'
          top={0}
          left={0}
          right={0}
        >
          <Box
            maxW='lg'
            paddingX='1rem'
            paddingY='1.5rem'
            marginX='auto'
          >
            <Logo/>
          </Box>
        </Box>
      </Flex>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        width='50%'
        paddingX={{ base: '1rem', sm: '1.5rem', lg: '2rem' }}
        paddingY='3rem'
        alignItems='center'
        justifyContent='center'
        backgroundColor='cyan.500'
      >
        <Box
          width='full'
          maxW='md'
        >
          <Heading
            as='p'
            size='3xl'
            lineHeight='shorter'
            textAlign='left'
            fontWeight={700}
            color='white'
            cursor='default'
          >Ready to build your next app?</Heading>
        </Box>
      </Flex>
    </Flex>
  )
}
