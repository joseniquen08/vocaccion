import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaCircle } from 'react-icons/fa';

export const CommentUniversity = ({ comment }) => {
  return (
    <VStack alignItems='start' spacing={2} w='full'>
      <HStack color='gray.400'>
        <HStack flex='none' border='1px solid' borderColor='gray.200' w='2.2rem' h='2.2rem' alignItems='center' justifyContent='center' borderRadius='full' overflow='hidden' marginRight='0.1rem'>
          <Image src={comment.imageUser === '' ? '/images/user-default.png' : comment.imageUser} alt={comment.nameUser} flex='none' objectFit='contain' w='2.2rem' h='2.2rem'/>
        </HStack>
        <Text fontWeight={700} fontSize='1rem' isTruncated color='gray.700'>{comment.nameUser}</Text>
        <FaCircle size='0.4rem'/>
        <Text fontSize='0.85rem' color='gray.500'>{comment.createdAt}</Text>
      </HStack>
      <HStack>
        <Text fontSize='0.95rem' fontWeight={500} color='gray.600'>{comment.content}</Text>
      </HStack>
    </VStack>
  )
}
