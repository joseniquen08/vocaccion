import { gql, useQuery } from "@apollo/client";
import { Badge, Box, Button, Flex, Heading, HStack, Image, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlusCircle } from 'react-icons/fa';
import { ModalCareers } from "./ModalCareers";

const GET_UNIVERSITIES = gql`
  query GetAllUniversities {
    getAllUniversities {
      _id
      name
    }
  }
`;

const GET_CAREERS = gql`
  query GetAllCareers {
    getAllCareers {
      id
      name
      type
      description
      faculty
      idUniversity
      nameUniversity
      imageUniversity
      duration
      lastUpdate
    }
  }
`;

export const Careers = () => {

  // const [carrers, setCarrers] = useState([]);
  // const [search, setSearch] = useState('');
  const [universities, setUniversities] = useState([]);

  const { loading: loadingUniversities, data: dataUniversities } = useQuery(GET_UNIVERSITIES);
  const { loading: loadingCareers, data: dataCareers, refetch: refetchCareers } = useQuery(GET_CAREERS);

  const { isOpen: isOpenAddCareer, onOpen: onOpenAddCareer, onClose: onCloseAddCareer } = useDisclosure();

  // const handleSearch = (event) => {
  //   setSearch(event.target.value)
  // }
  // const removeAccents = (str) => {
  //   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // }
  // const filteredCarrers = useMemo(() => {
  //   return carrers.filter(({ nombre }) => removeAccents(nombre.toLowerCase()).includes(removeAccents(search.toLowerCase())));
  // }, [carrers, search]);

  useEffect(() => {
    if (!loadingUniversities && dataUniversities) {
      setUniversities(dataUniversities.getAllUniversities);
    }
  }, [dataUniversities, loadingUniversities]);

  return (
    <Box>
      <Heading
        marginTop='0.5rem'
        fontSize='3xl'
        textAlign='center'
        color='white'
      >Carreras</Heading>
      <Box paddingX='1rem'>
        <HStack justifyContent="end" paddingY='3'>
          <Box>
            <Button leftIcon={<FaPlusCircle />} onClick={onOpenAddCareer} color='white' colorScheme='whiteAlpha' variant='ghost' size='sm'>
              Agregar
            </Button>
            <ModalCareers
              isOpen={isOpenAddCareer}
              onClose={onCloseAddCareer}
              refetch={refetchCareers}
              data={universities}
            />
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
          dataCareers ? (
            dataCareers.getAllCareers.length > 0 ? (
              <Table variant='simple' colorScheme='gray' minW='full' display='block' whiteSpace='nowrap' overflowX='auto' paddingX='1rem'>
                <Tbody display='table' w='full'>
                  <Tr
                    bg='whiteAlpha.200'
                    boxShadow='rgba(0, 0, 0, 0.2) 0px 5px 15px'
                  >
                    <Th color='white' borderBottom='none' borderLeftRadius='md'>Carrera</Th>
                    <Th color='white' borderBottom='none' borderRightRadius='md'>Acción</Th>
                  </Tr>
                  {
                    dataCareers.getAllCareers.map(({
                      id,
                      name,
                      type,
                      description,
                      faculty,
                      idUniversity,
                      nameUniversity,
                      imageUniversity,
                      duration,
                      lastUpdate
                    }) => (
                      <Tr key={id}>
                        <Td>
                          <Flex
                            alignItems='start'
                            marginBottom='0.5rem'
                          >
                            <Box flex='none' bgColor='white' marginRight='0.75rem' padding='0.5' rounded='lg'>
                              <Image src={imageUniversity} objectFit='contain' w='4.5rem' h='4.5rem'/>
                            </Box>
                            <VStack alignItems='left' spacing='0.25rem'>
                              <Text fontWeight={600} color='gray.200' noOfLines={1} fontSize='lg'>{name}</Text>
                              <VStack alignItems='left' spacing='0'>
                                <Text fontWeight={600} fontSize='sm' isTruncated color='gray.500'>{nameUniversity}</Text>
                                <Text fontWeight={500} fontSize='xs' color='gray.400'>{faculty}</Text>
                              </VStack>
                            </VStack>
                          </Flex>
                          <HStack
                            justifyContent='start'
                            spacing='0.5rem'
                          >
                            <Badge variant='subtle' cursor='default' fontSize='0.75rem' paddingX={2} paddingY={0.5} colorScheme='cyan'>{lastUpdate}</Badge>
                            <Badge variant='subtle' cursor='default' fontSize='0.75rem' paddingX={2} paddingY={0.5} colorScheme='cyan' textTransform='none'>{duration}</Badge>
                          </HStack>
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
                      <Th color='white' borderBottom='none' borderLeftRadius='md'>Carrera</Th>
                      <Th color='white' borderBottom='none' borderRightRadius='md' textAlign='center'>Acción</Th>
                    </Tr>
                  </Thead>
                  <TableCaption>No se han encontrado resultados</TableCaption>
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
                    <Th color='white' borderBottom='none' borderLeftRadius='md'>Carrera</Th>
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
