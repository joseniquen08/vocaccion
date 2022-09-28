import { gql, useMutation } from "@apollo/client";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputLeftElement, InputRightAddon, Link, Text, VStack } from "@chakra-ui/react";
import Logo from "@comp-shared/Navbar/Logo";
import { motion } from "framer-motion";
import { signIn } from 'next-auth/react';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from "react";
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Cookies from 'universal-cookie';

const MotionButton = motion(Button);

const SIGN_IN_MUTATION = gql`
  mutation SignIn($loginRequest: LoginInput) {
    login(loginRequest: $loginRequest) {
      token
      errors {
        message
      }
    }
  }
`;

export const SignIn = () => {

  const cookies = new Cookies();

  const [loginUser, { data, loading }] = useMutation(SIGN_IN_MUTATION);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  }

  const login = async (e: FormEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    if (emailRef.current?.value !== '' && passwordRef.current?.value !== '') {
      setIsLoading(true);
      await loginUser({
        variables: {
          loginRequest: {
            email: emailRef.current?.value,
            password: passwordRef.current?.value
          }
        }
      });
    }
  }

  useEffect(() => {
    if (!loading && data) {
      if (data.login.errors) {
        if (data.login.errors.message === 'email not found') {
          setEmailError(true);
        } else if (data.login.errors.message === 'invalid password') {
          setPasswordError(true);
        }
        setIsLoading(false);
      } else {
        cookies.set("token", data.login.token, { path: '/' });
        router.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  return (
    <Flex
      h='full'
      minH='100vh'
    >
      <Flex
        w='full'
        px={{ base: '1rem', sm: '1.5rem', lg: '2rem' }}
        py='2rem'
        alignItems='center'
        justifyContent='center'
        position='relative'
      >
        <Box
          w='full'
          maxW='sm'
        >
          <VStack
            as={Flex}
            flexDirection='column'
            spacing='1.5rem'
            px='1.8rem'
            py='2rem'
            backgroundColor='white'
          >
            <HStack justifyContent='center' w='full'>
              <Box
                mx='auto'
              >
                <Logo size='2.2rem'/>
              </Box>
            </HStack>
            <VStack
              as='form'
              w='full'
              mt='2rem'
              spacing='0.7rem'
              onSubmit={login}
            >
              <VStack w='full'>
                <Button
                  type='button'
                  onClick={() => signIn('google')}
                  leftIcon={<FaGoogle size={14}/>}
                  variant='outline'
                  fontWeight={400}
                  color='gray.500'
                  colorScheme='gray'
                  size='sm'
                  paddingY='1.1rem'
                  w='full'
                >
                  Ingresa con Google
                </Button>
                <Button
                  type='button'
                  onClick={() => signIn('facebook')}
                  leftIcon={<FaFacebook size={16}/>}
                  variant='outline'
                  fontWeight={400}
                  color='gray.500'
                  colorScheme='gray'
                  size='sm'
                  paddingY='1.1rem'
                  w='full'
                >
                  Ingresa con Facebook
                </Button>
              </VStack>
              <HStack w='full' alignItems='center' justifyContent='center'>
                <Divider bg='gray.700' opacity={1}/>
                <Text color='gray.500' fontWeight={300}>o</Text>
                <Divider bg='gray.700' opacity={1}/>
              </HStack>
              <VStack
                w='full'
                spacing='0.5rem'
              >
                <FormControl isRequired isInvalid={emailError}>
                  <FormLabel color='gray.500' fontSize='0.8rem' htmlFor='email'>Correo Electrónico</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      pl='0.3rem'
                      color='gray.600'
                    >
                      <HiOutlineMail size={17}/>
                    </InputLeftElement>
                    <Input
                      ref={emailRef}
                      id='email'
                      type='email'
                      size='md'
                      _focus={{
                        boxShadow: 'none',
                        borderColor: '#A0AEC0',
                      }}
                      fontSize='0.9rem'
                      fontWeight='500'
                      color='gray.600'
                      onChange={() => setEmailError(false)}
                      autoFocus
                    />
                  </InputGroup>
                  {
                    emailError && (
                      <FormErrorMessage>El correo no se encuentra registrado.</FormErrorMessage>
                    )
                  }
                </FormControl>
                <FormControl isRequired isInvalid={passwordError}>
                  <FormLabel color='gray.500' fontSize='0.8rem' htmlFor='password'>Contraseña</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      pl='0.3rem'
                      color='gray.600'
                    >
                      <HiOutlineLockClosed size={17}/>
                    </InputLeftElement>
                    <Input
                      ref={passwordRef}
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      _focus={{
                        boxShadow: 'none',
                        borderColor: '#A0AEC0',
                      }}
                      fontSize='0.9rem'
                      fontWeight='500'
                      color='gray.600'
                      onChange={() => setPasswordError(false)}
                    />
                    <InputRightAddon
                      bg='white'
                      px={0}
                      py={0}
                    >
                      <Button
                        color='gray.600'
                        onClick={handleShowPassword}
                      >
                        {showPassword ? <MdVisibilityOff size={18}/> : <MdVisibility size={18}/>}
                      </Button>
                    </InputRightAddon>
                  </InputGroup>
                  {
                    passwordError && (
                      <FormErrorMessage>La constraseña es incorrecta.</FormErrorMessage>
                    )
                  }
                </FormControl>
              </VStack>
              <VStack w='full' pt='0.1rem' spacing='0.6rem'>
                <MotionButton
                  isLoading={isLoading}
                  type='submit'
                  variant='solid'
                  colorScheme='cyan'
                  color='white'
                  w='full'
                  whileTap={{ scale: 0.95 }}
                >Ingresar</MotionButton>
                <Text fontSize='0.85rem' textAlign='center' letterSpacing='wide'>
                  ¿No tienes una cuenta? Créala <NextLink href="/register" passHref><Link fontWeight={700} color='cyan.500'>aquí</Link></NextLink>
                </Text>
              </VStack>
              <Flex w='full' py='0.4rem'>
                <Button
                  leftIcon={<ArrowBackIcon />}
                  colorScheme='cyan'
                  variant='ghost'
                  fontSize='0.95rem'
                  onClick={() => router.back()}
                >
                  Regresar
                </Button>
              </Flex>
            </VStack>
          </VStack>
        </Box>
      </Flex>
      <Box position='absolute' bottom={5} right={5}>
        <Button onClick={() => router.push('/admin/login')} size='sm' variant='ghost' colorScheme='cyan'>
          Ingresar como <Badge ml={1} mt={0.5} fontSize='0.7rem' py={0.5} px={1.5}>Admin</Badge>
        </Button>
      </Box>
    </Flex>
  )
}
