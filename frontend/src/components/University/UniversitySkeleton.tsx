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
        <Skeleton flex='none' noOfLines={1} h='9rem' w='9rem' borderRadius='2xl'/>
        <VStack w='full' flexShrink='1' minW='0px' justifyContent='space-between' h='full' px='0.8rem' py='0.7rem'>
          <VStack w='full' alignItems='start'>
            <Skeleton noOfLines={1} h='1.4rem' w='full'/>
            <Skeleton noOfLines={1} h='1.4rem' w='75%'/>
            <HStack spacing='1rem'>
              <Skeleton noOfLines={1} h='1.2rem' w='4rem'/>
              <Skeleton noOfLines={1} h='1.2rem' w='4rem'/>
            </HStack>
          </VStack>
          <HStack w='full' justifyContent='right'>
            <Skeleton noOfLines={1} h='1.2rem' w='8rem'/>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  )
}
