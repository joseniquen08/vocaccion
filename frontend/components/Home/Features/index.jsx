import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { FaRegCommentDots } from "react-icons/fa"
import { RiBook2Line, RiBuildingLine } from "react-icons/ri"
import { CardFeature } from "./CardFeature"

export const Features = () => {
  return (
    <Flex
      h='full'
      overflow='hidden'
      bg='white'
      alignItems='center'
    >
      <Box h='full' mx='0.75rem' px='2.5rem' py='3rem' bg='cyan.500' w='full' borderRadius='3xl'>
        <VStack w='full'>
          <Text
            as='p'
            color='white'
            fontSize='3xl'
            fontWeight={600}
          >
            Todo lo que puedes encontrar
          </Text>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacingX='1.5rem'
            spacingY='1.3rem'
            py='1.5rem'
            px='1rem'
            mx='auto'
            maxW='6xl'
            w='full'
          >
            <CardFeature
              title='Carreras'
              description='Conoce las carreras que ofrecen las universidades de todo el Perú.'
              icon={RiBook2Line}
            />
            <CardFeature
              title='Universidades'
              description='Encuentra la información básica y detallada de las universidades peruanas.'
              icon={RiBuildingLine}
            />
            <CardFeature
              title='Opiniones'
              description='Interactúa con la comunidad y encuentra las opiniones y experiencias de otros usuarios.'
              icon={FaRegCommentDots}
            />
          </SimpleGrid>
        </VStack>
      </Box>
    </Flex>
  )
}
