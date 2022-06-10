import { gql, useQuery } from "@apollo/client";
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, Collapse, HStack, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Select, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { FaSlidersH } from 'react-icons/fa';
import { CardUniversity } from "./CardUniversity";
import { UniversitySkeleton } from "./UniversitySkeleton";

const GET_REGIONS = gql`
  query GetAllRegions {
    getAllRegions {
      idReference
      name
    }
  }
`;

const GET_UNIVERSITIES_BY_TYPE = gql`
  query GetUniversitiesByType($input: GetUniversitiesByTypeInput) {
    getUniversitiesByType(input: $input) {
      _id
      name
      regions {
        id
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

export const ListUniversities = ({ name, university }) => {

  name = name.split('').filter((letter, i) => i !== name.length - 1).join('');
  university = university.split('').filter((letter, i) => i !== university.length - 1).join('');

  // const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isActiveFilter, setIsActiveFilter] = useState(false);

  const { loading: loadingRegions, data: dataRegions } = useQuery(GET_REGIONS);
  const { loading: loadingUniversities, data: dataUniversities, refetch: refetchUniversities } = useQuery(GET_UNIVERSITIES_BY_TYPE, {
    variables: { input: { type: university } }
  });

  // const handleSearch = (event) => {
  //   setSearch(event.target.value);
  // }

  // const removeAccents = (str) => {
  //   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // }

  // const filteredUniversities = useMemo(() => {
  //   return data && data.data.filter(({ nombre }) => removeAccents(nombre.toLowerCase()).includes(removeAccents(search.toLowerCase())))
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
        dataUniversities ? (
          <SimpleGrid
            columns={{ base: 1, lg: dataUniversities.getUniversitiesByType.length > 0 ? 2 : 1 }}
            spacingX='1.8rem'
            spacingY='1.6rem'
            py='1.5rem'
            px='1.75rem'
          >
            {
              dataUniversities.getUniversitiesByType.length > 0 ? (
                dataUniversities.getUniversitiesByType.map(university => (
                  <CardUniversity key={university._id} {...university}/>
                ))
              ) : (
                <Text textAlign='center'>No se han encontrado resultados</Text>
              )
            }
          </SimpleGrid>
        ) : (
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacingX='1.8rem'
            spacingY='1.6rem'
            py='1.5rem'
            px='1.75rem'
          >
            {
              [0,1,2,3].map(index => (
                <UniversitySkeleton key={index}/>
              ))
            }
          </SimpleGrid>
        )
      }
    </>
  )
}
