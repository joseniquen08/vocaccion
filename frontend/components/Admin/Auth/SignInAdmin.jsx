import { gql, useMutation } from "@apollo/client";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, InputRightAddon, Stack, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Cookies from "universal-cookie";
import Logo from "../../Navbar/Logo";

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

  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [emailNotFoundError, setEmailNotFoundError] = useState(false);
  const [emailNotAdmin, setEmailNotAdmin] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  }

  const login = (e) => {
    e.preventDefault();
    if (emailRef.current.value !== '' && passwordRef.current.value !== '') {
      loginAdmin({
        variables: {
          loginRequest: {
            email: emailRef.current.value,
            password: passwordRef.current.value
          }
        }
      });
    }
  }

  const handleEmail = (e) => {
    setEmailNotFoundError(false);
    setEmailNotAdmin(false);
  }

  const handlePassword = (e) => {
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
                  <FormLabel color='gray.300' fontSize='0.875rem' htmlFor='email'>Correo Electr??nico</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      pl='0.3rem'
                      color='gray.400'
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
                  <FormLabel color='gray.300' fontSize='0.875rem' htmlFor='password'>Contrase??a</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      pl='0.3rem'
                      color='gray.400'
                      children={<HiOutlineLockClosed size={18}/>}
                    />
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
                      <FormErrorMessage>La constrase??a es incorrecta.</FormErrorMessage>
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
