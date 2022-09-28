import { gql, useMutation } from "@apollo/client";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputLeftElement, InputRightAddon, Link, Text, VStack } from "@chakra-ui/react";
import Logo from "@comp-shared/Navbar/Logo";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { HiOutlineIdentification, HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Cookies from "universal-cookie";

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

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [lengthPasswordError, setLengthPasswordError] = useState<boolean>(false);
  const [equalPasswordError, setEqualPasswordError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  }

  const handleShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(showPasswordConfirmation => !showPasswordConfirmation);
  }

  const register = async (e: FormEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    if (nameRef.current?.value && emailRef.current?.value && passwordRef.current?.value) {
      if (passwordRef.current.value === passwordConfirmRef.current?.value) {
      setIsLoading(true);
        await createUser({
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

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setLengthPasswordError(false);
  }

  const handlePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => {
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
        setIsLoading(false);
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
            bg='white'
          >
            <HStack w='full'>
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
              spacing='0.4rem'
              onSubmit={register}
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
                  Continua con Google
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
                  Continúa con Facebook
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
                  <FormLabel color='gray.500' fontSize='0.8rem' htmlFor='first_name'>Nombres Completos</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      pl='0.3rem'
                      color='gray.600'
                    >
                      <HiOutlineIdentification size={17}/>
                    </InputLeftElement>
                    <Input
                      ref={nameRef}
                      name="first_name"
                      id="first_name"
                      type='text'
                      fontSize='0.9rem'
                      fontWeight='500'
                      color='gray.600'
                      _focus={{
                        boxShadow: 'none',
                        borderColor: '#A0AEC0',
                      }}
                      autoFocus
                    />
                  </InputGroup>
                </FormControl>
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
                      name="email"
                      id="email"
                      type='email'
                      fontSize='0.9rem'
                      fontWeight='500'
                      color='gray.600'
                      _focus={{
                        boxShadow: 'none',
                        borderColor: '#A0AEC0',
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
                      name="password"
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      fontSize='0.9rem'
                      fontWeight='500'
                      color='gray.600'
                      _focus={{
                        boxShadow: 'none',
                        borderColor: '#A0AEC0',
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
                  <FormLabel color='gray.500' fontSize='0.8rem' htmlFor='password_confirmation'>Confirmar contraseña</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      pl='0.3rem'
                      color='gray.600'
                    >
                      <HiOutlineLockClosed size={17}/>
                    </InputLeftElement>
                    <Input
                      ref={passwordConfirmRef}
                      name="password_confirmation"
                      id="password_confirmation"
                      type={showPasswordConfirmation ? 'text' : 'password'}
                      fontSize='0.9rem'
                      fontWeight='500'
                      color='gray.600'
                      _focus={{
                        boxShadow: 'none',
                        borderColor: '#A0AEC0',
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
                      <FormErrorMessage>La contraseñas no coinciden.</FormErrorMessage>
                    )
                  }
                </FormControl>
              </VStack>
              <VStack w='full' py='0.5rem' spacing='0.6rem'>
                <MotionButton
                  isLoading={isLoading}
                  type='submit'
                  variant='solid'
                  colorScheme='cyan'
                  color='white'
                  w='full'
                  whileTap={{ scale: 0.95 }}
                >Registrarme</MotionButton>
                <Text fontSize='0.85rem' textAlign='center' letterSpacing='wide'>
                  ¿Ya tienes una cuenta? Inicia sesión <NextLink href="/login" passHref><Link fontWeight={700} color='cyan.500'>aquí</Link></NextLink>
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
    </Flex>
  )
}
