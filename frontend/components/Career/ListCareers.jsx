import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, Collapse, HStack, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Select, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { FaSlidersH } from 'react-icons/fa';
import useSWR from 'swr';
import fetcher from "../../lib/fetcher";
import { regiones } from "../../utils/data";
import { CardCareer } from "./CardCareer";
import { CareerSkeleton } from "./CareerSkeleton";

export const ListCareers = ({ name }) => {

  const { data } = useSWR(`/api/universities/${name}`, fetcher);

  const [search, setSearch] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isActiveFilter, setIsActiveFilter] = useState(false);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const filteredCareers = useMemo(() => {
    return data && data.data.filter(({ nombre }) => removeAccents(nombre.toLowerCase()).includes(removeAccents(search.toLowerCase())));
  }, [data, search]);

  return (
    <>
      <Box paddingX='1rem'>
        <HStack justifyContent="space-between" paddingY='3'>
          <Button onClick={() => setIsActiveFilter(state => !state)} leftIcon={<FaSlidersH />} colorScheme='cyan' color={isActiveFilter ? 'white' : 'cyan.500'} variant={isActiveFilter ? 'solid' : 'outline'} size='sm' flex='none'>
            Filtros
          </Button>
          <Button onClick={onOpen} leftIcon={<SearchIcon />} variant="outline" colorScheme='gray' color='gray.400' fontWeight="400" w='sm' justifyContent='left' size='sm' borderRadius='lg'>Buscar...</Button>
        </HStack>
        <Collapse in={isActiveFilter} animateOpacity>
          <Stack
            direction={['column', 'row']}
            border='1px solid'
            borderColor='gray.100'
            borderRadius='lg'
            overflow='hidden'
            spacing='1.5rem'
            marginY='1rem'
            paddingX='1.5rem'
            paddingY='1.2rem'
          >
            <Select
              variant='outline'
              placeholder='Región'
              size='sm'
              borderRadius='lg'
              width='12rem'
              flex='none'
              _focus={{
                boxShadow: 'none',
              }}
            >
              {
                regiones.map(({ id, nombre }) => (
                  <option key={id} value={id}>{nombre}</option>
                ))
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
            <InputGroup marginY='1rem' maxW='md' marginX='auto'>
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
            </InputGroup>
          <ModalCloseButton />
          </ModalBody>
        </ModalContent>
      </Modal>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacingX='1.2rem'
        spacingY='1.3rem'
        paddingY='1.5rem'
        paddingX='1rem'
      >
        {
          data ? (
            data.data.length > 0 ? (
              filteredCareers.map(career => (
                <CardCareer key={career.id} career={career}/>
              ))
            ) : (
              <Text textAlign='center'>No se han encontrado resultados</Text>
            )
          ) : (
            [0,1,2,3,4,5].map(index => (
              <CareerSkeleton key={index}/>
            ))
          )
        }
      </SimpleGrid>
    </>
  )
}


