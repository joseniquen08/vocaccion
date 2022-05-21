import { Badge, Box, Button, ChakraProvider, DarkMode, Flex, FormControl, FormLabel, Heading, HStack, Image, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Stack, Table, TableCaption, Tbody, Text, Th, Thead, Tr, useDisclosure, VStack } from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import { FaPlusCircle } from 'react-icons/fa';
import { FiImage } from "react-icons/fi";
import useSWR from "swr";
import fetcher from "../../../../lib/fetcher";
import { modalAddTheme } from "../../../../styles/theme.chakra";

export const Universities = () => {

  const { data: regions } = useSWR('/api/regions', fetcher);
  const { data: provinces } = useSWR('/api/provinces', fetcher);

  const [universities, setUniversities] = useState([]);
  const [search, setSearch] = useState('');
  const [inputNumber, setInputNumber] = useState(1);
  const [typeUniversity, setTypeUniversity] = useState('publica');
  const [licenseUniversity, setLicenseUniversity] = useState('si');

  const nameUniversityRef = useRef();
  const sedesUniversityRef = useRef();
  const fileRef = useRef();

  const { isOpen: isOpenAddUniversity, onOpen: onOpenAddUniversity, onClose: onCloseAddUniversity } = useDisclosure();

  const format = (value) => `${value} ${value > 1 ? 'sedes' : 'sede'}`;

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
            <Modal
              isOpen={isOpenAddUniversity}
              onClose={onCloseAddUniversity}
              motionPreset="slideInBottom"
              size='xl'
              isCentered
            >
              <ModalOverlay backdropFilter='blur(3px)' />
              <ModalContent bg='gray.800' color='white' px={3} py={1}>
                <ModalHeader>Agregar Universidad</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <ChakraProvider theme={modalAddTheme}>
                    <DarkMode>
                      <VStack as='form' spacing={5}>
                        <FormControl isRequired variant="floating">
                          <Input
                            ref={nameUniversityRef}
                            id='name_university'
                            type='text'
                            _focus={{
                              boxShadow: 'none',
                            }}
                            placeholder=' '
                            fontSize='0.95rem'
                            fontWeight='500'
                            autoFocus
                          />
                          <FormLabel color='gray.400' htmlFor='name_university'>Nombre</FormLabel>
                        </FormControl>
                        <FormControl isRequired>
                          <Select
                            variant='outline'
                            placeholder='Región'
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
                              regions ? (
                                regions.data.map(({ id, name }) => (
                                  <option key={id} value={id}>{name}</option>
                                ))
                              ) : (<></>)
                            }
                          </Select>
                        </FormControl>
                        <FormControl isRequired>
                          <Select
                            variant='outline'
                            placeholder='Provincia'
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
                              provinces ? (
                                provinces.data.map(({ id, name }) => (
                                  <option key={id} value={id}>{name}</option>
                                ))
                              ) : (<></>)
                            }
                          </Select>
                        </FormControl>
                        <FormControl isRequired variant="floating">
                          <NumberInput min={1} max={10} defaultValue={1} onChange={(value) => setInputNumber(value)} value={format(inputNumber)}>
                            <NumberInputField
                              ref={sedesUniversityRef}
                              id='sedes_university'
                              _focus={{
                                boxShadow: 'none',
                              }}
                              placeholder=' '
                              fontSize='0.95rem'
                              fontWeight='500'
                              onKeyDown={(e) => {e.preventDefault()}}
                            />
                            <FormLabel color='gray.400' htmlFor='sedes_university'>Sedes</FormLabel>
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </FormControl>
                        <HStack width='full' spacing={3}>
                          <FormControl isRequired>
                            <FormLabel color='gray.400' htmlFor='type_university'>Tipo</FormLabel>
                            <RadioGroup id="type_university" onChange={setTypeUniversity} value={typeUniversity}>
                              <Stack direction='row' spacing={3}>
                                <Radio value='publica'>Pública</Radio>
                                <Radio value='privada'>Privada</Radio>
                              </Stack>
                            </RadioGroup>
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel color='gray.400' htmlFor='license_university'>Licenciada</FormLabel>
                            <RadioGroup id="license_university" name="license_university" onChange={setLicenseUniversity} value={licenseUniversity}>
                              <Stack direction='row' spacing={3}>
                                <Radio value='si'>Sí</Radio>
                                <Radio value='no'>No</Radio>
                              </Stack>
                            </RadioGroup>
                          </FormControl>
                        </HStack>
                        <FormControl isRequired>
                          <FormLabel color='gray.400' htmlFor="writeUpFile">Logo</FormLabel>
                          <InputGroup>
                            <input type='file' ref={fileRef} accept='image/*' style={{ display: 'none' }}></input>
                            <Button
                              leftIcon={<FiImage size={20}/>}
                              variant='solid'
                              colorScheme='whiteAlpha'
                              onClick={() => fileRef.current.click()}
                              color='white'
                              _focus={{
                                boxShadow: 'none',
                              }}
                            >
                              Subir imagen...
                            </Button>
                          </InputGroup>
                        </FormControl>
                      </VStack>
                    </DarkMode>
                  </ChakraProvider>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blackAlpha' px='8'>Agregar</Button>
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
          filteredUniversities.length > 0 ? (
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
                  filteredUniversities.map(({ id, nombre, duracion, img, universidad, facultad, act }) => (
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
                    <Th color='white' borderBottom='none' borderLeftRadius='md'>Universidad</Th>
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
