import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightAddon, Stack, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { HiOutlineLockClosed, HiOutlineMail } from 'react-icons/hi';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Logo from "../../Navbar/Logo";

const MotionButton = motion(Button);

export const SignInAdmin = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  }

  const login = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
  }

  return (
    <Flex
      height='full'
      minHeight='100vh'
    >
      <Flex
        width='full'
        paddingX={{ base: '1rem', sm: '1.5rem', lg: '2rem' }}
        paddingY='3rem'
        alignItems='center'
        justifyContent='center'
        position='relative'
      >
        <Box
          width='full'
          maxW='sm'
          border='1px solid'
          borderColor='gray.200'
          borderRadius='xl'
          overflow='hidden'
        >
          <VStack
            as={Flex}
            flexDirection='column'
            spacing='2.2rem'
            paddingX='2.2rem'
            paddingY='3rem'
            backgroundColor='white'
          >
            <Stack width='full' paddingY='0.3rem' justifyContent='center' alignItems='center'>
              <Logo size='2.5rem'/>
            </Stack>
            <VStack
              as='form'
              width='full'
              marginTop='2rem'
              spacing='1.2rem'
              onSubmit={login}
            >
              <VStack
                width='full'
                spacing='1rem'
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
                      fontWeight='400'
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
                      fontSize={showPassword ? '0.9rem' : '0.675rem'}
                      fontWeight='400'
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
                  type='submit'
                  variant='solid'
                  bg='cyan.500'
                  width='full'
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
