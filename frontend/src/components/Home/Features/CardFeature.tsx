import { Box, Icon, Text, VStack } from '@chakra-ui/react';
import { IconType } from "react-icons";

type Props = {
  title: string;
  description: string;
  icon: IconType;
}

export const CardFeature = ({ title, description, icon }: Props) => {
  return (
    <VStack
      border='1px solid'
      borderColor='gray.100'
      borderRadius='lg'
      overflow='hidden'
      px='1.8rem'
      py='1.5rem'
      alignItems='start'
      color='gray.100'
      _hover={{ background: 'white', cursor: 'default', color: 'cyan.500' }}
    >
      <Icon
        boxSize='10'
        as={icon}
      />
      <Text fontSize='1.6rem' fontWeight={600}>{title}</Text>
      <Box>
        <Text fontSize='1.1rem' fontWeight={400}>{description}</Text>
      </Box>
    </VStack>
  )
}
