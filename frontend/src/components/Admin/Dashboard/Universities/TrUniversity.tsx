import { Badge, Box, Button, DarkMode, Flex, HStack, Image, Td, Text, Tr, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

type Props = {
  id: string;
  name: string;
  regions: {
    idReference: string;
    name: string;
  }[];
  provinces: {
    idReference: string;
    name: string;
    idReferenceRegion: string;
  }[];
  type: string;
  license: string;
  campuses: any;
  image: string;
  onOpen: () => void;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
}

export const TrUniversity = ({ id, name, regions, provinces, type, license, campuses, image, onOpen, setSelectedId }: Props) => {

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
            <Image src={image} objectFit='contain' w='4.5rem' h='4.5rem' alt={name}/>
          </Box>
          <VStack alignItems='left' spacing='0.5rem'>
            <Text fontWeight={600} color='gray.300' noOfLines={1} fontSize='lg'>{name}</Text>
            <HStack alignItems='left' spacing='0.4rem'>
              {
                provinces.map(({ idReference, name }) => (
                  <Badge key={`${idReference}_${name}`} variant='subtle' colorScheme='whiteAlpha' px={1.5} fontWeight={600} fontSize='xs'>{name}</Badge>
                ))
              }
            </HStack>
            <HStack justifyContent='start' spacing='0.4rem'>
              <Badge variant='subtle' cursor='default' fontSize='xs' fontWeight={600} px={1.5} colorScheme='cyan'>{type === 'publica' ? 'Pública' : 'Privada'}</Badge>
              <Badge variant='subtle' cursor='default' fontSize='xs' px={1.5} colorScheme={license === 'si' ? 'green' : 'red'}>{license === 'si' ? 'Licenciada' : 'No licenciada'}</Badge>
              <Badge variant='subtle' cursor='default' fontSize='xs' px={1.5} colorScheme='orange'>{`${campuses} ${campuses === 1 ? 'sede' : 'sedes'}`}</Badge>
            </HStack>
          </VStack>
        </Flex>
      </Td>
      <Td>
        <DarkMode>
          <HStack spacing={2.5}>
            <Button leftIcon={<FaRegEdit />} disabled size='sm' colorScheme='purple' variant='outline'>
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
