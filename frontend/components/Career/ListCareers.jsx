import { gql, useQuery } from "@apollo/client";
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, Collapse, HStack, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Select, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { FaSlidersH } from 'react-icons/fa';
import { CardCareer } from "./CardCareer";
import { CareerSkeleton } from "./CareerSkeleton";

const GET_REGIONS = gql`
  query GetAllRegions {
    getAllRegions {
      idReference
      name
    }
  }
`;

const GET_CAREERS_BY_TYPE = gql`
  query GetCareersByType($input: GetCareersByTypeInput) {
    getCareersByType(input: $input) {
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

export const ListCareers = ({ name }) => {

  // const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isActiveFilter, setIsActiveFilter] = useState(false);

  const { loading: loadingRegions, data: dataRegions } = useQuery(GET_REGIONS);
  const { loading: loadingCareers, data: dataCareers, refetch: refetchCareers } = useQuery(GET_CAREERS_BY_TYPE, {
    variables: { input: { type: name } }
  });

  // const handleSearch = (event) => {
  //   setSearch(event.target.value);
  // }

  // const removeAccents = (str) => {
  //   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // }

  // const filteredCareers = useMemo(() => {
  //   return data && data.data.filter(({ nombre }) => removeAccents(nombre.toLowerCase()).includes(removeAccents(search.toLowerCase())));
  // }, [data, search]);

  return (
    <>
      <Box px='1rem'>
        <HStack justifyContent="space-between" py='3'>
          <Button isDisabled onClick={() => setIsActiveFilter(state => !state)} leftIcon={<FaSlidersH />} colorScheme='cyan' color={isActiveFilter ? 'white' : 'cyan.500'} variant={isActiveFilter ? 'solid' : 'outline'} size='sm' flex='none'>
            Filtros
          </Button>
          <Button isDisabled onClick={onOpen} leftIcon={<SearchIcon />} variant="outline" colorScheme='gray' color='gray.400' fontWeight="400" w='sm' justifyContent='left' size='sm' borderRadius='lg'>Buscar...</Button>
        </HStack>
        <Collapse in={isActiveFilter} animateOpacity>
          <Stack
            direction={['column', 'row']}
            border='1px solid'
            borderColor='gray.100'
            borderRadius='lg'
            overflow='hidden'
            spacing='1.5rem'
            my='1rem'
            px='1.5rem'
            py='1.2rem'
          >
            <Select
              variant='outline'
              placeholder='Región'
              size='sm'
              borderRadius='lg'
              w='12rem'
              flex='none'
              _focus={{
                boxShadow: 'none',
              }}
            >
              {
                dataRegions && (
                  dataRegions.getAllRegions.map(({ idReference, name }) => (
                    <option key={idReference} value={idReference}>{name}</option>
                  ))
                )
              }
            </Select>
            <Checkbox colorScheme='cyan'>Acreditadas</Checkbox>
            <Checkbox colorScheme='cyan'>Traslado</Checkbox>
          </Stack>
        </Collapse>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size='xl' motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <InputGroup my='1rem' maxW='md' mx='auto'>
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
                // value={search}
                // onChange={handleSearch}
                autoComplete='off'
              />
            </InputGroup>
          <ModalCloseButton />
          </ModalBody>
        </ModalContent>
      </Modal>
      {
        dataCareers ? (
          <SimpleGrid
            columns={{
              base: 1,
              md: dataCareers.getCareersByType.length > 0 ? 2 : 1,
              lg: dataCareers.getCareersByType.length > 0 ? 3 : 1
            }}
            spacingX='1.2rem'
            spacingY='1.3rem'
            py='1.5rem'
            px='1rem'
          >
            {
              dataCareers.getCareersByType.length > 0 ? (
                dataCareers.getCareersByType.map(career => (
                  <CardCareer key={career.id} {...career} />
                ))
              ) : (
                <Text textAlign='center'>No se han encontrado resultados</Text>
              )
            }
          </SimpleGrid>
        ) : (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacingX='1.2rem'
            spacingY='1.3rem'
            py='1.5rem'
            px='1rem'
          >
            {
              [0,1,2,3,4,5].map(index => (
                <CareerSkeleton key={index}/>
              ))
            }
          </SimpleGrid>
        )
      }
    </>
  )
}


