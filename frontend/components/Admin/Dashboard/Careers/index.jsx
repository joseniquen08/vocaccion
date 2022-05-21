import { Badge, Box, Button, ChakraProvider, DarkMode, Flex, FormControl, FormLabel, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import { FaPlusCircle } from 'react-icons/fa';
import { modalAddTheme } from "../../../../styles/theme.chakra";
import { regiones } from "../../../../utils/data";

export const Careers = () => {

  const [carrers, setCarrers] = useState([]);
  const [search, setSearch] = useState('');
  const [inputNumber, setInputNumber] = useState(6);
  const [typeDurationCareer, setTypeDurationCareer] = useState('semestres');

  const nameCareerRef = useRef();
  const facultyCareerRef = useRef();
  const durationCareerRef = useRef();

  const { isOpen: isOpenAddCareer, onOpen: onOpenAddCareer, onClose: onCloseAddCareer } = useDisclosure();

  // useEffect(() => {
  //   const getCarrers = async() => {
  //     const { docs } = await getDocs(query(collection(db, 'totalCarreras')));
  //     const data = docs.map( carrera => ({id: carrera.id, ...carrera.data()}));
  //     setCarrers(data);
  //     console.log(data);
  //   }
  //   getCarrers();
  // }, []);

  const format = (value) => `${value} ${typeDurationCareer}`;

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  const filteredCarrers = useMemo(() => {
    return carrers.filter(({ nombre }) => removeAccents(nombre.toLowerCase()).includes(removeAccents(search.toLowerCase())));
  }, [carrers, search]);

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
            <Modal
              isOpen={isOpenAddCareer}
              onClose={onCloseAddCareer}
              motionPreset="slideInBottom"
              size='xl'
              isCentered
            >
              <ModalOverlay backdropFilter='blur(3px)' />
              <ModalContent bg='gray.800' color='white' px={3} py={1}>
                <ModalHeader>Agregar Carrera</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <ChakraProvider theme={modalAddTheme}>
                    <VStack as='form' spacing={5}>
                      <FormControl isRequired variant="floating">
                        <Input
                          ref={nameCareerRef}
                          id='name_career'
                          type='text'
                          _focus={{
                            boxShadow: 'none',
                          }}
                          placeholder=' '
                          fontSize='0.95rem'
                          fontWeight='500'
                          autoFocus
                        />
                        <FormLabel color='gray.400' htmlFor='name_career'>Nombre</FormLabel>
                      </FormControl>
                      <DarkMode>
                        <FormControl isRequired>
                          <Select
                            variant='outline'
                            placeholder='Universidad'
                            color='gray.400'
                            fontWeight='500'
                            borderRadius='lg'
                            width='full'
                            flex='none'
                            _focus={{
                              boxShadow: 'none',
                            }}
                            _hover={{
                              borderColor: 'inherit',
                            }}
                          >
                            {
                              regiones.map(({ id, nombre }) => (
                                <option key={id} value={id}>{nombre}</option>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </DarkMode>
                      <FormControl isRequired variant="floating">
                        <Input
                          ref={facultyCareerRef}
                          id='faculty_career'
                          type='text'
                          _focus={{
                            boxShadow: 'none',
                          }}
                          placeholder=' '
                          fontSize='0.95rem'
                          fontWeight='500'
                        />
                        <FormLabel color='gray.400' htmlFor='faculty_career'>Facultad</FormLabel>
                      </FormControl>
                      <HStack width='full' spacing={3}>
                        <FormControl isRequired variant="floating" width='50%'>
                          <NumberInput min={6} max={12} onChange={(value) => setInputNumber(value)} value={format(inputNumber)}>
                            <NumberInputField
                              ref={durationCareerRef}
                              id='duration_career'
                              _focus={{
                                boxShadow: 'none',
                              }}
                              placeholder=' '
                              fontSize='0.95rem'
                              fontWeight='500'
                              onKeyDown={(e) => {e.preventDefault()}}
                            />
                            <FormLabel color='gray.400' htmlFor='duration_career'>Duración</FormLabel>
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                        <DarkMode>
                          <FormControl isRequired width='50%'>
                            <Select
                              variant='outline'
                              color='gray.400'
                              fontWeight='500'
                              borderRadius='lg'
                              width='full'
                              flex='none'
                              _focus={{
                                boxShadow: 'none',
                              }}
                              _hover={{
                                borderColor: 'inherit',
                              }}
                              onChange={(e) => setTypeDurationCareer(e.target.value)}
                            >
                              <option value="semestres" defaultChecked>semestres</option>
                              <option value="ciclos">ciclos</option>
                            </Select>
                          </FormControl>
                        </DarkMode>
                      </HStack>
                    </VStack>
                  </ChakraProvider>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blackAlpha'>Agregar</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
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
          filteredCarrers.length > 0 ? (
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
                  filteredCarrers.map(({ id, nombre, duracion, img, universidad, facultad, act }) => (
                    <Tr key={id}>
                      <Td>
                        <Flex
                          alignItems='start'
                          marginBottom='0.5rem'
                        >
                          <Image src={img} objectFit='contain' w='2.5rem' h='2.5rem' marginRight='0.75rem'/>
                          <VStack alignItems='left' spacing='0.25rem'>
                            <Text fontWeight={600} color='gray.800' fontSize='lg'>{nombre}</Text>
                            <VStack alignItems='left' spacing='0'>
                              <Text fontWeight={600} fontSize='sm' isTruncated color='gray.600'>{universidad}</Text>
                              <Text fontWeight={500} fontSize='xs' color='gray.500'>{facultad}</Text>
                            </VStack>
                          </VStack>
                        </Flex>
                        <HStack
                          justifyContent='start'
                          spacing='0.5rem'
                        >
                          <Badge variant='subtle' cursor='default' fontSize='0.75rem' paddingX={2} paddingY={0.5} colorScheme='cyan'>{act}</Badge>
                          <Badge variant='subtle' cursor='default' fontSize='0.75rem' paddingX={2} paddingY={0.5} colorScheme='cyan' textTransform='none'>{duracion}</Badge>
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
        }
      </Box>
    </Box>
  )
}
