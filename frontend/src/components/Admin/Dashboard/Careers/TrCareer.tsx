import { Box, Button, DarkMode, Flex, HStack, Image, Td, Text, Tr, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

type Props = {
  id: string;
  name: string;
  type: string;
  description: string;
  faculty: string;
  idUniversity: string;
  nameUniversity: string;
  imageUniversity: string;
  duration: number;
  lastUpdate: string;
  onOpen: () => void;
  setSelectedId: Dispatch<SetStateAction<string>>
}

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
}: Props) => {

  const handleOpenModalDelete = () => {
    setSelectedId(id);
    onOpen();
  }

  return (
    <Tr>
      <Td>
        <Flex
          alignItems='start'
          mb='0.5rem'
        >
          <Box flex='none' bg='white' mr='0.75rem' p='0.5' rounded='lg'>
            <Image src={imageUniversity} objectFit='contain' w='4.5rem' h='4.5rem'/>
          </Box>
          <VStack alignItems='left' spacing='0.3rem'>
            <Text fontWeight={600} color='gray.200' noOfLines={1} fontSize='lg'>{name}</Text>
            <VStack alignItems='left' spacing='0.1rem'>
              <Text fontWeight={600} fontSize='sm' noOfLines={1} color='gray.500'>{nameUniversity}</Text>
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
