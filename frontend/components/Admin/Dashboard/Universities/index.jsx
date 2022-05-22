import { gql, useQuery } from "@apollo/client";
import { Badge, Box, Button, Flex, Heading, HStack, Image, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FaPlusCircle } from 'react-icons/fa';
import { ModalUniversities } from "./ModalUniversities";

const GET_UNIVERSITIES = gql`
  query GetAllUniversities {
    getAllUniversities {
      name
      regions {
        idReference
        name
      }
      provinces {
        idReference
        name
        idReferenceRegion
      }
      type
      license
      campuses
      image
    }
  }
`;

export const Universities = () => {

  const [universities, setUniversities] = useState([]);
  const [search, setSearch] = useState('');

  const { loading: loadingUniversities, data: dataUniversities, refetch: refetchUniversities } = useQuery(GET_UNIVERSITIES);

  const { isOpen: isOpenAddUniversity, onOpen: onOpenAddUniversity, onClose: onCloseAddUniversity } = useDisclosure();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const filteredUniversities = useMemo(() => {
    return universities.filter(({ nombre }) => removeAccents(nombre.toLowerCase()).includes(removeAccents(search.toLowerCase())));
  }, [universities, search]);

  return (
    <Box>
      <Heading
        marginTop='0.5rem'
        fontSize='3xl'
        textAlign='center'
        color='white'
      >Universidades</Heading>
      <Box paddingX='1rem'>
        <HStack justifyContent="end" paddingY='3'>
          <Box>
            <Button leftIcon={<FaPlusCircle />} onClick={onOpenAddUniversity} color='white' colorScheme='whiteAlpha' variant='ghost' size='sm'>
              Agregar
            </Button>
            <ModalUniversities isOpen={isOpenAddUniversity} onClose={onCloseAddUniversity} refetch={refetchUniversities}/>
          </Box>
        </HStack>
        {/* <InputGroup marginY='1rem' maxW='md' marginX='auto'>
          <InputLeftElement
            pointerEvents='none'
            children={<SearchIcon color='gray.300'/>}
          />
          <Input
            type='text'
            _focus={{
              boxShadow: 'none',
            }}
            borderRadius='lg'
            fontSize='sm'
            placeholder='Buscar...'
            value={search}
            onChange={handleSearch}
            autoComplete='off'
          />
        </InputGroup> */}
      </Box>
      <Box overflowX='auto' display='block'>
        {
          dataUniversities ? (
            dataUniversities.getAllUniversities.length > 0 ? (
              <Table variant='simple' colorScheme='gray' minW='full' display='block' whiteSpace='nowrap' overflowX='auto' paddingX='1rem'>
                <Tbody display='table' w='full'>
                  <Tr
                    bg='whiteAlpha.200'
                    boxShadow='rgba(0, 0, 0, 0.2) 0px 5px 15px'
                  >
                    <Th color='white' borderBottom='none' borderLeftRadius='md'>Universidad</Th>
                    <Th color='white' borderBottom='none' borderRightRadius='md'>Acción</Th>
                  </Tr>
                  {
                    dataUniversities.getAllUniversities.map(({ name, regions, provinces, type, license, campuses, image }, index) => (
                      <Tr key={`${name}_${index}`}>
                        <Td>
                          <Flex
                            alignItems='start'
                            marginBottom='0.5rem'
                          >
                            <Box flex='none' bgColor='white' marginRight='0.75rem' padding='0.5' rounded='lg'>
                              <Image src={image} objectFit='contain' w='4.5rem' h='4.5rem'/>
                            </Box>
                            <VStack alignItems='left' spacing='0.5rem'>
                              <Text fontWeight={600} color='gray.300' noOfLines={1} fontSize='lg'>{name}</Text>
                              <HStack alignItems='left' spacing='0.4rem'>
                                {
                                  provinces.map(({ idReference, name }) => (
                                    <Badge key={`${idReference}_${name}`} variant='subtle' colorScheme='whiteAlpha' paddingX={1.5} fontWeight={600} fontSize='xs'>{name}</Badge>
                                  ))
                                }
                              </HStack>
                              <HStack justifyContent='start' spacing='0.4rem'>
                                <Badge variant='subtle' cursor='default' fontSize='xs' fontWeight={600} paddingX={1.5} colorScheme='cyan'>{type === 'publica' ? 'Pública' : 'Privada'}</Badge>
                                <Badge variant='subtle' cursor='default' fontSize='xs' paddingX={1.5} colorScheme={license === 'si' ? 'green' : 'red'}>{license === 'si' ? 'Licenciada' : 'No licenciada'}</Badge>
                                <Badge variant='subtle' cursor='default' fontSize='xs' paddingX={1.5} colorScheme='orange'>{`${campuses} ${campuses === 1 ? 'sede' : 'sedes'}`}</Badge>
                              </HStack>
                            </VStack>
                          </Flex>
                        </Td>
                        <Td>
                          <Button variant='ghost' color='cyan.700' colorScheme='cyan' size='sm'>Más información</Button>
                        </Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            ) : (
              <Box w='full' paddingX='1rem'>
                <Table variant='simple' colorScheme='gray' minW='full' whiteSpace='nowrap' overflowX='auto'>
                  <Thead display='table' w='full'>
                    <Tr
                      bg='whiteAlpha.200'
                      boxShadow='rgba(0, 0, 0, 0.2) 0px 5px 15px'
                    >
                      <Th color='white' borderBottom='none' borderLeftRadius='md'>Universidad</Th>
                      <Th color='white' borderBottom='none' borderRightRadius='md' textAlign='center'>Acción</Th>
                    </Tr>
                  </Thead>
                  <TableCaption color='gray.500'>No se han encontrado resultados</TableCaption>
                </Table>
              </Box>
            )
          ) : (
            <Box w='full' paddingX='1rem'>
              <Table variant='simple' colorScheme='gray' minW='full' whiteSpace='nowrap' overflowX='auto'>
                <Thead display='table' w='full'>
                  <Tr
                    bg='whiteAlpha.200'
                    boxShadow='rgba(0, 0, 0, 0.2) 0px 5px 15px'
                  >
                    <Th color='white' borderBottom='none' borderLeftRadius='md'>Universidad</Th>
                    <Th color='white' borderBottom='none' borderRightRadius='md' textAlign='center'>Acción</Th>
                  </Tr>
                </Thead>
                <TableCaption color='gray.500'>Cargando...</TableCaption>
              </Table>
            </Box>
          )
        }
      </Box>
    </Box>
  )
}
