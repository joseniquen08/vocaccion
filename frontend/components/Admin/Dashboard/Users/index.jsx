import { Box, Heading, SimpleGrid } from "@chakra-ui/react"

export const Users = () => {
  return (
    <Box>
      <Heading
        marginTop='0.5rem'
        fontSize='3xl'
        textAlign='center'
        color='white'
      >
        Usuarios
      </Heading>
      <Box overflowX='auto' display='block' color='gray.200' paddingX={2} paddingY={5}>
        <SimpleGrid columns={2} spacing={3.5}>
          <Box bg='blackAlpha.600' paddingX={5} paddingY={3} rounded='md'>Grid</Box>
          <Box bg='blackAlpha.600' paddingX={5} paddingY={3} rounded='md'>Grid</Box>
          <Box bg='blackAlpha.600' paddingX={5} paddingY={3} rounded='md'>Grid</Box>
          <Box bg='blackAlpha.600' paddingX={5} paddingY={3} rounded='md'>Grid</Box>
        </SimpleGrid>
      </Box>
    </Box>
  )
}