import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, SimpleGrid, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { CardUniversity } from "./CardUniversity";
import { UniversitySkeleton } from "./UniversitySkeleton";

export const ListUniversities = ({ name }) => {

  name = name.split('').filter((letter, i) => i !== typeUniversity.length - 1).join('');

  const { data } = useSWR(`/api/universities/${name}`, fetcher);

  const [search, setSearch] = useState('');


  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const filteredUniversities = useMemo(() => {
    return data && data.data.filter(({ nombre }) => removeAccents(nombre.toLowerCase()).includes(removeAccents(search.toLowerCase())))
  }, [data, search]);

  return (
    <>
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
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacingX='1.8rem'
        spacingY='1.6rem'
        paddingY='1.5rem'
        paddingX='1.75rem'
      >
        {
          data ? (
            data.data.length > 0 ? (
              filteredUniversities.map(university => (
                <CardUniversity key={university.id} university={university}/>
              ))
            ) : (
              <Text textAlign='center'>No se han encontrado resultados</Text>
            )
          ) : (
            [0,1,2,3].map(index => (
              <UniversitySkeleton key={index}/>
            ))
          )
        }
      </SimpleGrid>
    </>
  )
}
