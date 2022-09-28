import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { CommentCareerType } from "@cust-types/admin/commentTypes";
import dayjs from 'dayjs';
import { FaCircle } from 'react-icons/fa';

interface Props {
  comment: CommentCareerType;
}

export const CommentCareer = ({ comment }: Props) => {
  return (
    <VStack alignItems='start' spacing={2} w='full'>
      <HStack color='gray.400'>
        <HStack flex='none' border='1px solid' borderColor='gray.200' w='2.2rem' h='2.2rem' alignItems='center' justifyContent='center' borderRadius='full' overflow='hidden' mr='0.1rem'>
          <Image src={comment.imageUser === '' ? '/images/user-default.png' : comment.imageUser} alt={comment.nameUser} flex='none' objectFit='contain' w='2.2rem' h='2.2rem'/>
        </HStack>
        <Text fontWeight={700} fontSize='1rem' noOfLines={1} color='gray.700'>{comment.nameUser}</Text>
        <FaCircle size='0.375rem'/>
        <Text fontWeight={500} fontSize='0.8rem' color='gray.400'>{dayjs().to(dayjs(comment.createdAt))}</Text>
      </HStack>
      <HStack>
        <Text fontSize='0.95rem' fontWeight={500} color='gray.600'>{comment.content}</Text>
      </HStack>
    </VStack>
  )
}
