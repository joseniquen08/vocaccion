import { Badge, Flex, HStack, Image, LinkBox, LinkOverlay, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from 'next/link';

interface Props {
  id: string;
  name: string;
  type: string;
  description: string;
  faculty: string;
  idUniversity: string;
  nameUniversity: string;
  imageUniversity: string;
  duration: number;
  lastUpdate: string;
}

const MotionLinkBox = motion(LinkBox);

export const CardCareer = ({
  id,
  name,
  type,
  description,
  faculty,
  idUniversity,
  nameUniversity,
  imageUniversity,
  duration,
  lastUpdate
}: Props) => {
  return (
    <MotionLinkBox
      border='1px solid'
      borderColor='gray.100'
      borderRadius='lg'
      overflow='hidden'
      px='1.5rem'
      py='1.2rem'
      h='14rem'
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <VStack spacing='1rem' alignItems='start'>
        <Flex justifyContent='space-between' w='full'>
          <Text w='full' fontWeight={500} fontSize='sm' color='gray.500'>{duration} semestres</Text>
          <Badge variant='subtle' cursor='default' fontSize='0.8rem' px={2} py={0.5} colorScheme='cyan' borderRadius='md'>{lastUpdate}</Badge>
        </Flex>
        <Text w='full' noOfLines={2} fontWeight={600} fontSize='xl' textAlign='left' color='gray.700'>
          <NextLink href={`/carrera/${id}`} passHref>
            <LinkOverlay>{name}</LinkOverlay>
          </NextLink>
        </Text>
        <HStack
          alignItems='center'
          justifyContent='start'
          overflow='hidden'
          w='full'
        >
          <Image src={imageUniversity} flex='none' alt={idUniversity} objectFit='contain' w='2.2rem' h='2.2rem' mr='0.1rem'/>
          <VStack alignItems='left' flexShrink='1' minW='0' spacing='0'>
            <Text fontWeight={600} fontSize='sm' noOfLines={1} color='gray.800'>{nameUniversity}</Text>
            <Text fontWeight={500} fontSize='sm' noOfLines={1} color='gray.500'>{faculty}</Text>
          </VStack>
        </HStack>
      </VStack>
    </MotionLinkBox>
  )
}
