import { Box, Flex, HStack, Skeleton, VStack } from "@chakra-ui/react"

export const CareerSkeleton = () => {
  return (
    <Box
      border='1px solid'
      borderColor='gray.100'
      borderRadius='lg'
      overflow='hidden'
      px='1.5rem'
      py='1.2rem'
      w='full'
      h='14rem'
    >
      <VStack spacing='1rem' alignItems='start'>
        <Flex justifyContent='space-between' w='full'>
          <Skeleton noOfLines={1} h='1.3rem' w='6rem'/>
          <Skeleton noOfLines={1} h='1.3rem' w='3rem'/>
        </Flex>
        <Box w='full'>
          <Skeleton noOfLines={1} h='1.5rem' w='full'/>
          <Skeleton noOfLines={1} h='1.5rem' mt='0.5rem' w='75%'/>
        </Box>
        <HStack
          alignItems='start'
          justifyContent='start'
          w='full'
          h='full'
        >
          <Skeleton
            noOfLines={1}
            h='2.2rem'
            flex='none'
            w='2.2rem'
            mr='0.1rem'
          />
          <VStack justifyContent='start' h='full' spacing='0.4rem' w='full'>
            <Skeleton noOfLines={1} h='0.8rem' w='full'/>
            <Skeleton noOfLines={1} h='0.8rem' w='full'/>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  )
}
