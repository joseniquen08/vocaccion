import { Badge, Flex, HStack, Image, LinkBox, LinkOverlay, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from 'next/link';

const MotionLinkBox = motion(LinkBox);

export const CardCareer = ({ career }) => {
  return (
    <MotionLinkBox
      border='1px solid'
      borderColor='gray.100'
      borderRadius='lg'
      overflow='hidden'
      paddingX='1.5rem'
      paddingY='1.2rem'
      h='14rem'
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <VStack spacing='1rem' alignItems='start'>
        <Flex justifyContent='space-between' w='full'>
          <Text w='full' fontWeight={500} fontSize='sm' color='gray.500'>{career && career.duracion}</Text>
          <Badge variant='subtle' cursor='default' fontSize='0.8rem' paddingX={2} paddingY={0.5} colorScheme='cyan' borderRadius='md'>{career && career.act}</Badge>
        </Flex>
        <Text w='full' noOfLines={2} fontWeight={600} fontSize='xl' textAlign='left' color='gray.700'>
          <NextLink href="/" passHref>
            <LinkOverlay>{career && career.nombre}</LinkOverlay>
          </NextLink>
        </Text>
        <HStack
          alignItems='center'
          justifyContent='start'
          overflow='hidden'
          w='full'
        >
          <Image src={career && career.img} flex='none' objectFit='contain' w='2.2rem' h='2.2rem' marginRight='0.1rem'/>
          <VStack alignItems='left' flexShrink='1' minW='0' spacing='0'>
            <Text fontWeight={600} fontSize='sm' isTruncated color='gray.800'>{career && career.universidad}</Text>
            <Text fontWeight={500} fontSize='sm' isTruncated color='gray.500'>{career && career.facultad}</Text>
          </VStack>
        </HStack>
      </VStack>
    </MotionLinkBox>
  )
}
