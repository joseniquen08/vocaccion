import { Box, HStack, Skeleton, VStack } from "@chakra-ui/react";

export const UniversitySkeleton = () => {
  return (
    <Box
      border='1px solid'
      borderColor='gray.100'
      borderRadius='2xl'
      overflow='hidden'
      w='full'
      h='9rem'
    >
      <HStack w='full' h='full' overflow='hidden'>
        <Skeleton flex='none' noOfLines={1} height='9rem' width='9rem' borderRadius='2xl'/>
        <VStack w='full' flexShrink='1' minW='0px' justifyContent='space-between' h='full' paddingX='0.8rem' paddingY='0.7rem'>
          <VStack w='full' alignItems='start'>
            <Skeleton noOfLines={1} height='1.4rem' width='full'/>
            <Skeleton noOfLines={1} height='1.4rem' width='75%'/>
            <HStack spacing='1rem'>
              <Skeleton noOfLines={1} height='1.2rem' width='4rem'/>
              <Skeleton noOfLines={1} height='1.2rem' width='4rem'/>
            </HStack>
          </VStack>
          <HStack w='full' justifyContent='right'>
            <Skeleton noOfLines={1} height='1.2rem' width='8rem'/>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  )
}
