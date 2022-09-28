import { gql, useMutation } from '@apollo/client';
import { Box, Button, Flex, HStack, PinInput, PinInputField, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

interface Props {
  email: string;
}

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($verifyRequest: VerifyInput) {
    verifyEmail(verifyRequest: $verifyRequest) {
      token
      errors {
        message
      }
    }
  }
`;

export const Verify = ({ email }: Props) => {

  const cookies = new Cookies();
  const router = useRouter();

  const [verifyEmailMutation, { data, loading }] = useMutation(VERIFY_EMAIL_MUTATION);

  const [pin, setPin] = useState<string>('');
  const [pinNotFoundError, setPinNotFoundError] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setPinNotFoundError(false);
    setPin(value.toUpperCase());
  }

  const handleComplete = (value: string) => {
    verifyEmailMutation({
      variables: {
        verifyRequest: {
          email,
          pin: value.toUpperCase()
        }
      }
    });
  }

  useEffect(() => {
    if (!loading && data) {
      if (data.verifyEmail.errors) {
        if (data.verifyEmail.errors.message === 'not pin') {
          setPinNotFoundError(true);
        // } else if (data.verifyEmail.errors.message === 'invalid password') {
        //   setPasswordError(true);
        }
      } else {
        cookies.set("token", data.verifyEmail.token, { path: '/' });
        router.push("/");
      }
    }
  }, [data, loading]);

  return (
    <Flex
      h='full'
      overflow='hidden'
      bg='white'
      alignItems='center'
    >
      <Box h='full' mx='auto' maxW='5xl' py='8rem' px='2rem'>
        <VStack w='full' spacing='2rem'>
          <Text
            textAlign='center'
            my={{ base: '1rem', sm: '1.25rem'}}
            color='gray.600'
            fontSize='2xl'
            fontWeight='400'
          >
            Ingresa el código de validación que te enviamos a tu correo.
          </Text>
          <Flex w='full' alignItems='center' justifyContent='center'>
            <HStack py={8}>
              <PinInput
                type='alphanumeric'
                value={pin}
                onChange={handleChange}
                onComplete={handleComplete}
                size='lg'
                placeholder=''
              >
                <PinInputField
                  autoFocus={true}
                  _focus={{
                    boxShadow: '0 0 0 1px #00B5D8',
                    borderColor: 'cyan.500'
                  }}
                />
                <PinInputField
                  _focus={{
                    boxShadow: '0 0 0 1px #00B5D8',
                    borderColor: 'cyan.500'
                  }}
                />
                <PinInputField
                  _focus={{
                    boxShadow: '0 0 0 1px #00B5D8',
                    borderColor: 'cyan.500'
                  }}
                />
                <PinInputField
                  _focus={{
                    boxShadow: '0 0 0 1px #00B5D8',
                    borderColor: 'cyan.500'
                  }}
                />
                <PinInputField
                  _focus={{
                    boxShadow: '0 0 0 1px #00B5D8',
                    borderColor: 'cyan.500'
                  }}
                />
                <PinInputField
                  _focus={{
                    boxShadow: '0 0 0 1px #00B5D8',
                    borderColor: 'cyan.500'
                  }}
                />
              </PinInput>
            </HStack>
          </Flex>
          {
            loading && (
              <HStack justifyContent='center' w='full' py={6}>
                <Button
                  isLoading
                  colorScheme='gray'
                  variant='ghost'
                  spinnerPlacement='start'
                  fontSize='3xl'
                  size='lg'
                ></Button>
              </HStack>
            )
          }
          {
            pinNotFoundError && (
              <HStack justifyContent='center' w='full' py={6}>
                <Text>El código es incorrecto</Text>
              </HStack>
            )
          }
          <HStack justifyContent='center' w='full' py={6}>
            <Button
              colorScheme='cyan'
              color='white'
              variant='solid'
              size='md'
              onClick={() => router.push('/')}
            >Omitir</Button>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  )
}
