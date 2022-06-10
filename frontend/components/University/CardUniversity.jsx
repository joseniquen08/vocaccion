import { Badge, Box, HStack, Image, LinkBox, LinkOverlay, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import NextLink from 'next/link';

const MotionLinkBox = motion(LinkBox);
const MotionBoxImage = motion(Box);

export const CardUniversity = ({
  _id,
  name,
  type,
  campuses,
  image,
  license,
  provinces,
  regions
}) => {
  return (
    <MotionLinkBox
      borderRadius='2xl'
      boxShadow='rgba(0, 0, 0, 0.04) 0px 2px 20px;'
      w='full'
      h='9rem'
      overflow='hidden'
      whileHover="hover"
      transition={{ duration: 0.2 }}
      variants={{ hover: { scale: 1.02, overflow: 'visible' } }}
    >
      <HStack w='full' h='full'>
        <MotionBoxImage
          flex='none'
          borderRadius='2xl'
          overflow='hidden'
          transition={{ duration: 0.1 }}
          variants={{ hover: { scale: 1.07, boxShadow: 'rgba(149, 157, 165, 0.1) 0px 8px 24px' } }}
          bg='white'
        >
          <Image src={image} objectFit='contain' w='9rem' h='9rem' padding='0.5rem' marginRight='0.1rem'/>
        </MotionBoxImage>
        <VStack w='full' flexShrink='1' minW='0px' justifyContent='space-between' h='full' px='0.8rem' py='0.7rem'>
          <VStack w='full' alignItems='start'>
            <Text w='full' noOfLines={2} fontWeight={600} fontSize='lg' textAlign='left' color='gray.700'>
              <NextLink href={`/universidad/${_id}`} passHref>
                <LinkOverlay>{name}</LinkOverlay>
              </NextLink>
            </Text>
            <Badge variant='subtle' colorScheme='cyan' textTransform='none'>{provinces[0].name}</Badge>
          </VStack>
          <HStack w='full' justifyContent='right'>
            <Badge variant='outline' colorScheme={license === 'si' ? 'cyan' : 'red'}>{license === 'si' ? 'licenciada' : 'no licenciada'}</Badge>
          </HStack>
        </VStack>
      </HStack>
    </MotionLinkBox>
  )
}
