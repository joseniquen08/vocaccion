import { gql, useMutation } from "@apollo/client";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, InputGroup, InputLeftElement, InputRightAddon, Link, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { HiOutlineIdentification, HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Cookies from "universal-cookie";
import Logo from "../Navbar/Logo";

const MotionButton = motion(Button);

const SIGN_UP_MUTATION = gql`
  mutation SignUp($userRequest: CreateUserInput) {
    createUser(userRequest: $userRequest) {
      token
      errors {
        message
      }
    }
  }
`;

export const SignUp = () => {

  const cookies = new Cookies();

  const [createUser, { data, loading }] = useMutation(SIGN_UP_MUTATION);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [lengthPasswordError, setLengthPasswordError] = useState(false);
  const [equalPasswordError, setEqualPasswordError] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  }

  const handleShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(showPasswordConfirmation => !showPasswordConfirmation);
  }

  const register = (e) => {
    e.preventDefault();
    if (nameRef.current.value && emailRef.current.value && passwordRef.current.value) {
      if (passwordRef.current.value === passwordConfirmRef.current.value) {
        createUser({
          variables: {
            userRequest: {
              name: nameRef.current.value,
              email: emailRef.current.value,
              password: passwordRef.current.value,
            }
          }
        });
      }
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setLengthPasswordError(false);
  }

  const handlePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
    setEqualPasswordError(true);
  }

  useEffect(() => {
    if (password !== passwordConfirmation) {
      setEqualPasswordError(true);
    }
    if (password === passwordConfirmation && password !== '') {
      setEqualPasswordError(false);
    }
  }, [password, passwordConfirmation]);

  useEffect(() => {
    if (!loading && data) {
      if (data.createUser.errors) {
        if (data.createUser.errors.message === 'length') {
          setLengthPasswordError(true);
        } else if (data.createUser.errors.message === 'duplicate key') {
          setEmailError(true);
        }
      } else {
        cookies.set("token", data.createUser.token, { path: '/' });
        router.push("/verificar");
      }
    }
  }, [data, loading]);

  return (
    <Flex
      h='full'
      minH='100vh'
    >
      <Flex
        w={{ base: '100%', md: '50%'}}
        px={{ base: '1rem', sm: '1.5rem', lg: '2rem' }}
        py='3rem'
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
            spacing='2.2rem'
            px='1.8rem'
            py='2.8rem'
            bg='white'
          >
            <Box w='full' py='0.3rem'>
              <Heading
                as='p'
                size='xl'
                textAlign='center'
                fontWeight={700}
                color='cyan.500'
              >
                Registrarse
              </Heading>
            </Box>
            <VStack
              as='form'
              w='full'
              mt='2rem'
              spacing='0.4rem'
              onSubmit={register}
            >
              <VStack w='full'>
                <Button
                  type='button'
                  onClick={() => signIn('google')}
                  leftIcon={<FaGoogle size={16}/>}
                  variant='outline'
                  fontWeight={400}
                  color='gray.500'
                  colorScheme='gray'
                  w='full'
                >
                  Continua con Google
                </Button>
                <Button
                  type='button'
                  onClick={() => signIn('facebook')}
                  leftIcon={<FaFacebook size={18}/>}
                  variant='outline'
                  fontWeight={400}
                  color='gray.500'
                  colorScheme='gray'
                  w='full'
                >
                  Contin??a con Facebook
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
                <FormControl isRequired>
                  <FormLabel color='gray.600' fontSize='0.875rem' htmlFor='first_name'>Nombres Completos</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      pl='0.3rem'
                      color='gray.600'
                      children={<HiOutlineIdentification size={18}/>}
                    />
                    <Input
                      ref={nameRef}
                      name="first_name"
                      id="first_name"
                      type='text'
                      fontSize='0.95rem'
                      fontWeight='500'
                      color='gray.600'
                      _focus={{
                        boxShadow: 'none',
                      }}
                      autoFocus
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired isInvalid={emailError}>
                  <FormLabel color='gray.600' fontSize='0.875rem' htmlFor='email'>Correo Electr??nico</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      pl='0.3rem'
                      color='gray.600'
                      children={<HiOutlineMail size={18}/>}
                    />
                    <Input
                      ref={emailRef}
                      name="email"
                      id="email"
                      type='email'
                      fontSize='0.95rem'
                      fontWeight='500'
                      color='gray.600'
                      _focus={{
                        boxShadow: 'none',
                      }}
                      onChange={() => setEmailError(false)}
                    />
                  </InputGroup>
                  {
                    emailError && (
                      <FormErrorMessage>El correo ya se encuentra registrado.</FormErrorMessage>
                    )
                  }
                </FormControl>
                <FormControl isRequired isInvalid={lengthPasswordError}>
                  <FormLabel color='gray.600' fontSize='0.875rem' htmlFor='password'>Contrase??a</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      pl='0.3rem'
                      color='gray.600'
                      children={<HiOutlineLockClosed size={18}/>}
                    />
                    <Input
                      ref={passwordRef}
                      name="password"
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      fontSize='0.95rem'
                      fontWeight='500'
                      color='gray.600'
                      _focus={{
                        boxShadow: 'none',
                      }}
                      value={password}
                      onChange={handlePassword}
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
                    lengthPasswordError && (
                      <FormErrorMessage>Ingresa por lo menos 8 caracteres.</FormErrorMessage>
                    )
                  }
                </FormControl>
                <FormControl isRequired isInvalid={equalPasswordError}>
                  <FormLabel color='gray.600' fontSize='0.875rem' htmlFor='password_confirmation'>Confirmar contrase??a</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      pl='0.3rem'
                      color='gray.600'
                      children={<HiOutlineLockClosed size={18}/>}
                    />
                    <Input
                      ref={passwordConfirmRef}
                      name="password_confirmation"
                      id="password_confirmation"
                      type={showPasswordConfirmation ? 'text' : 'password'}
                      fontSize='0.95rem'
                      fontWeight='500'
                      color='gray.600'
                      _focus={{
                        boxShadow: 'none',
                      }}
                      value={passwordConfirmation}
                      onChange={handlePasswordConfirmation}
                    />
                    <InputRightAddon
                      bg='white'
                      px={0}
                      py={0}
                    >
                      <Button
                        color='gray.600'
                        onClick={handleShowPasswordConfirmation}
                      >
                        {showPasswordConfirmation ? <MdVisibilityOff size={18}/> : <MdVisibility size={18}/>}
                      </Button>
                    </InputRightAddon>
                  </InputGroup>
                  {
                    equalPasswordError && (
                      <FormErrorMessage>La contrase??as no coinciden.</FormErrorMessage>
                    )
                  }
                </FormControl>
              </VStack>
              <VStack w='full' py='0.5rem' spacing='0.6rem'>
                <MotionButton
                  type='submit'
                  variant='solid'
                  bg='cyan.500'
                  w='full'
                  whileTap={{ scale: 0.98 }}
                >Registrarme</MotionButton>
                <Text fontSize='0.85rem' textAlign='center' letterSpacing='wide'>
                  ??Ya tienes una cuenta? Inicia sesi??n <NextLink href="/login" passHref><Link fontWeight={700} color='cyan.500'>aqu??</Link></NextLink>
                </Text>
              </VStack>
              <Flex w='full' py='1.5rem'>
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
        <Box
          position='absolute'
          top={0}
          left={0}
          right={0}
        >
          <Box
            maxW='lg'
            px='1rem'
            py='1.5rem'
            mx='auto'
          >
            <Logo/>
          </Box>
        </Box>
      </Flex>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        w='50%'
        px={{ base: '1rem', sm: '1.5rem', lg: '2rem' }}
        py='3rem'
        alignItems='center'
        justifyContent='center'
        bg='cyan.500'
      >
        <Box
          w='full'
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
