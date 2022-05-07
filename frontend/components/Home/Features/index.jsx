import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { CardFeature } from "./CardFeature"

export const Features = () => {
  return (
    <Flex
      h='full'
      overflow='hidden'
      bg='white'
      alignItems='center'
    >
      <Box h='full' marginX='0.75rem' paddingX='2rem' paddingY='2rem' bg='cyan.500' w='full' borderRadius='3xl'>
        <VStack w='full'>
          <Text
            as='p'
            color='white'
            fontSize='2xl'
            fontWeight='500'
          >
            Todo lo que puedes encontrar
          </Text>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacingX='1.5rem'
            spacingY='1.3rem'
            paddingY='1.5rem'
            paddingX='1rem'
            marginX='auto'
            maxWidth='7xl'
            w='full'
          >
            <CardFeature/>
            <CardFeature/>
            <CardFeature/>
            <CardFeature/>
            <CardFeature/>
            <CardFeature/>
          </SimpleGrid>
        </VStack>
      </Box>
    </Flex>
  )
}
