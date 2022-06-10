import { Badge, HStack, Image, StackDivider, Text, VStack } from "@chakra-ui/react";
import dayjs from 'dayjs';
import { motion } from "framer-motion";

const MotionVStack = motion(VStack);

export const CardComment = ({ id, content, createdAt, user, idPage, namePage, imagePage, comment, handleModalComment }) => {
  return (
    <MotionVStack whileHover={{ scale: 1.01 }} onClick={() => handleModalComment(comment)} divider={<StackDivider borderColor='gray.500'/>} cursor='pointer' bg='blackAlpha.600' px={5} py={5} rounded='xl' border='1px solid' borderColor='gray.700' spacing={2.5} w='full'>
      <HStack alignItems='start' w='full'>
        <HStack w='50%' spacing={2}>
          <HStack flex='none' mr={0.25} alignItems='center' justifyContent='center' rounded='lg' overflow='hidden'>
            <Image src={user.image === '' ? '/images/user-default.png' : user.image} flex='none' objectFit='contain' w='2.2rem' h='2.2rem'/>
          </HStack>
          <VStack alignItems='left' spacing={0}>
            <Text noOfLines={1} fontSize='0.8rem' fontWeight={500} color='gray.400'>{user.name}</Text>
            <HStack spacing={1.5} pt={1}>
              <Badge fontSize='0.65rem' variant='outline' colorScheme='cyan'>
                {
                  user.role === 'user' ? 'usuario' : user.role === 'admin' ? 'administrador' : 'superadmin'
                }
              </Badge>
            </HStack>
          </VStack>
        </HStack>
        <HStack w='50%'>
          <HStack flex='none' bg='white' mr={0.25} alignItems='center' justifyContent='center' rounded='lg' overflow='hidden'>
            <Image src={imagePage} flex='none' objectFit='contain' w='2.2rem' h='2.2rem'/>
          </HStack>
          <VStack alignItems='left' spacing={0}>
            <Text noOfLines={2} fontSize='0.85rem' fontWeight={500} color='gray.400'>{namePage}</Text>
          </VStack>
        </HStack>
      </HStack>
      <HStack w='full'>
        <VStack alignItems='left' spacing={0}>
          <Text noOfLines={1} fontSize='md' fontWeight={500} color='white'>{content}</Text>
          <Text noOfLines={1} fontSize='sm' color='gray.600'>{
            dayjs(createdAt).format('DD/MM/YYYY hh:mm a')
          }</Text>
        </VStack>
      </HStack>
    </MotionVStack>
  )
}
