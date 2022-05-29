import { Box, Button, DarkMode, Flex, HStack, Image, Td, Text, Tr, VStack } from "@chakra-ui/react";
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

export const TrCareer = ({
  id,
  name,
  type,
  description,
  faculty,
  idUniversity,
  nameUniversity,
  imageUniversity,
  duration,
  lastUpdate,
  onOpen,
  setSelectedId
}) => {

  const handleOpenModalDelete = () => {
    setSelectedId(id);
    onOpen();
  }

  return (
    <Tr>
      <Td>
        <Flex
          alignItems='start'
          marginBottom='0.5rem'
        >
          <Box flex='none' bgColor='white' marginRight='0.75rem' padding='0.5' rounded='lg'>
            <Image src={imageUniversity} objectFit='contain' w='4.5rem' h='4.5rem'/>
          </Box>
          <VStack alignItems='left' spacing='0.3rem'>
            <Text fontWeight={600} color='gray.200' noOfLines={1} fontSize='lg'>{name}</Text>
            <VStack alignItems='left' spacing='0.1rem'>
              <Text fontWeight={600} fontSize='sm' isTruncated color='gray.500'>{nameUniversity}</Text>
              <Text fontWeight={500} fontSize='xs' color='gray.400'>{faculty}</Text>
            </VStack>
          </VStack>
        </Flex>
      </Td>
      <Td>
        <DarkMode>
          <HStack spacing={2.5}>
            <Button disabled leftIcon={<FaRegEdit />} size='sm' colorScheme='purple' variant='outline'>
              Editar
            </Button>
            <Button onClick={() => handleOpenModalDelete()} leftIcon={<FaTrashAlt />} size='sm' colorScheme='red' variant='outline'>
              Eliminar
            </Button>
          </HStack>
        </DarkMode>
      </Td>
    </Tr>
  )
}
