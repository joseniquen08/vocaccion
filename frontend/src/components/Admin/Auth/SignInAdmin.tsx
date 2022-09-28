import { gql, useMutation } from "@apollo/client";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, InputRightAddon, Stack, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Cookies from "universal-cookie";
import Logo from "../../Shared/Navbar/Logo";

const MotionButton = motion(Button);

const SIGN_IN_ADMIN_MUTATION = gql`
  mutation SignInAdmin($loginRequest: LoginInput) {
    loginAdmin(loginRequest: $loginRequest) {
      token
      errors {
        message
      }
    }
  }
`;

export const SignInAdmin = () => {

  const cookies = new Cookies();

  const [loginAdmin, { data, loading }] = useMutation(SIGN_IN_ADMIN_MUTATION);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailNotFoundError, setEmailNotFoundError] = useState<boolean>(false);
  const [emailNotAdmin, setEmailNotAdmin] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  }

  const login = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (emailRef.current?.value !== '' && passwordRef.current?.value !== '') {
      setIsLoading(true);
      await loginAdmin({
        variables: {
          loginRequest: {
            email: emailRef.current?.value,
            password: passwordRef.current?.value
          }
        }
      });
    }
  }

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailNotFoundError(false);
    setEmailNotAdmin(false);
  }

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordError(false);
  }

  useEffect(() => {
    if (!loading && data) {
      if (data.loginAdmin.errors) {
        if (data.loginAdmin.errors.message === 'email not found') {
          setEmailNotFoundError(true);
        } else if (data.loginAdmin.errors.message === 'invalid password') {
          setPasswordError(true);
        } else if (data.loginAdmin.errors.message === 'not admin') {
          setEmailNotAdmin(true);
        }
        setIsLoading(false);
      } else {
        cookies.set("token", data.loginAdmin.token, { path: '/' });
        router.push("/admin/dashboard/inicio");
      }
    }
  }, [data, loading]);

  return (
    <Flex
      h='full'
      minH='100vh'
      bg='gray.800'
    >
      <Flex
        w='full'
        px={{ base: '1rem', sm: '1.5rem', lg: '2rem' }}
        py='3rem'
        alignItems='center'
        justifyContent='center'
        position='relative'
      >
        <Box
          w='full'
          maxW='sm'
          border='1px solid'
          borderColor='gray.200'
          borderRadius='xl'
          overflow='hidden'
        >
          <VStack
            as={Flex}
            flexDirection='column'
            bg='blackAlpha.300'
            spacing='2.2rem'
            px='2.2rem'
            py='3rem'
          >
            <Stack w='full' justifyContent='center' alignItems='center'>
              <Logo size='3rem'/>
            </Stack>
            <VStack
              as='form'
              w='full'
              marginTop='2rem'
              spacing='1.2rem'
              onSubmit={login}
            >
              <VStack
                w='full'
                spacing='1rem'
              >
                <FormControl isRequired isInvalid={emailNotFoundError || emailNotAdmin}>
                  <FormLabel color='gray.300' fontSize='0.875rem' htmlFor='email'>Correo Electrónico</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      pl='0.3rem'
                      color='gray.400'
                    >
                      <HiOutlineMail size={18}/>
                    </InputLeftElement>
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
                      color='gray.300'
                      onChange={handleEmail}
                      autoFocus
                    />
                  </InputGroup>
                  {
                    emailNotFoundError && (
                      <FormErrorMessage>El correo no se encuentra registrado.</FormErrorMessage>
                    )
                  }
                  {
                    emailNotAdmin && (
                      <FormErrorMessage>El correo no le pertenece a un administrador.</FormErrorMessage>
                    )
                  }
                </FormControl>
                <FormControl isRequired isInvalid={passwordError}>
                  <FormLabel color='gray.300' fontSize='0.875rem' htmlFor='password'>Contraseña</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      pl='0.3rem'
                      color='gray.400'
                    >
                      <HiOutlineLockClosed size={18}/>
                    </InputLeftElement>
                    <Input
                      ref={passwordRef}
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      _focus={{
                        boxShadow: 'none',
                      }}
                      fontSize={'0.95rem'}
                      fontWeight='500'
                      color='gray.300'
                      onChange={handlePassword}
                    />
                    <InputRightAddon
                      bg='blackAlpha.300'
                      px={0}
                      py={0}
                    >
                      <Button
                        color='gray.400'
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
              <VStack w='full' py='0.5rem' spacing='0.6rem'>
                <MotionButton
                  isLoading={isLoading}
                  type='submit'
                  variant='solid'
                  colorScheme='cyan'
                  color='white'
                  w='full'
                  whileTap={{ scale: 0.95 }}
                >Ingresar</MotionButton>
              </VStack>
            </VStack>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  )
}
