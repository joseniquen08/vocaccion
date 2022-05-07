import { Box, Flex, HStack, Skeleton, VStack } from "@chakra-ui/react"

export const CareerSkeleton = () => {
  return (
    <Box
      border='1px solid'
      borderColor='gray.100'
      borderRadius='lg'
      overflow='hidden'
      paddingX='1.5rem'
      paddingY='1.2rem'
      w='full'
      h='14rem'
    >
      <VStack spacing='1rem' alignItems='start'>
        <Flex justifyContent='space-between' width='full'>
          <Skeleton noOfLines={1} height='1.3rem' width='6rem'/>
          <Skeleton noOfLines={1} height='1.3rem' width='3rem'/>
        </Flex>
        <Box width='full'>
          <Skeleton noOfLines={1} height='1.5rem' width='full'/>
          <Skeleton noOfLines={1} height='1.5rem' marginTop='0.5rem' width='75%'/>
        </Box>
        <HStack
          alignItems='start'
          justifyContent='start'
          w='full'
          height='full'
        >
          <Skeleton
            noOfLines={1}
            height='2.2rem'
            flex='none'
            width='2.2rem'
            marginRight='0.1rem'
          />
          <VStack justifyContent='start' height='full' spacing='0.4rem' width='full'>
            <Skeleton noOfLines={1} height='0.8rem' width='full'/>
            <Skeleton noOfLines={1} height='0.8rem' width='full'/>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  )
}
