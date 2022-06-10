import { Badge, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";

const MotionBox = motion(Box);

export const CardUser = ({ user, handleUser, id, name, email, image, role, provider, emailVerifiedV }) => {
  return (
    <MotionBox whileHover={{ scale: 1.01 }} onClick={() => handleUser(user)} cursor='pointer' bg='blackAlpha.600' px={5} py={4} rounded='md' border='1px solid' borderColor='gray.700'>
      <HStack alignItems='start'>
        <HStack flex='none' mr={1} alignItems='center' justifyContent='center' rounded='lg' overflow='hidden'>
          <Image src={image === '' ? '/images/user-default.png' : image} alt={name} width={60} height={60} priority="true" objectFit='cover' objectPosition='center'/>
        </HStack>
        <VStack alignItems='left' spacing={0}>
          <Text noOfLines={1} fontSize='md' fontWeight={500} color='white'>{name}</Text>
          <Text noOfLines={1} fontSize='sm' color='gray.600'>{email}</Text>
          <HStack spacing={1.5} pt={1} flexWrap='wrap'>
            <Badge my={1.5} fontSize='0.75rem' variant='outline' colorScheme='cyan'>
              {
                role === 'user' ? 'usuario' : role === 'admin' ? 'administrador' : 'superadmin'
              }
            </Badge>
            <Badge my={1.5} fontSize='0.75rem' variant='outline' colorScheme='yellow'>
              {
                provider === 'no' ? 'correo' : provider
              }
            </Badge>
            <Badge my={1.5} fontSize='0.75rem' variant='outline' colorScheme={emailVerifiedV  ? 'green' : 'red'}>
              {
                emailVerifiedV  ? 'verificado' : 'no verificado'
              }
            </Badge>
          </HStack>
        </VStack>
      </HStack>
    </MotionBox>
  )
}
