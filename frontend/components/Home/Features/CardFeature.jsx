import { Box, Icon, Text, VStack } from "@chakra-ui/react";

export const CardFeature = ({ title, description, icon }) => {
  return (
    <VStack
      border='1px solid'
      borderColor='gray.100'
      borderRadius='lg'
      overflow='hidden'
      px='1.8rem'
      py='1.5rem'
      alignItems='start'
    >
      <Icon
        boxSize='10'
        color='gray.100'
        as={icon}
      />
      <Text fontSize='1.6rem' color='white' fontWeight={600}>{title}</Text>
      <Box>
        <Text fontSize='1.1rem' color='gray.100' fontWeight={400}>{description}</Text>
      </Box>
    </VStack>
  )
}
