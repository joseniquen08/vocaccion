import { gql, useQuery } from "@apollo/client";
import { Box, Button, Heading, HStack, Table, TableCaption, Tbody, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { GetAllUniversitiesType } from '@cust-types/admin/universityTypes';
import { useState } from "react";
import { FaPlusCircle, FaSlidersH } from 'react-icons/fa';
import { ModalDelete } from "./ModalDelete";
import { ModalUniversities } from "./ModalUniversities";
import { TrUniversity } from "./TrUniversity";

const GET_UNIVERSITIES = gql`
  query GetAllUniversities {
    getAllUniversities {
      _id
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

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { loading: loadingUniversities, data: dataUniversities, refetch: refetchUniversities } = useQuery<GetAllUniversitiesType>(GET_UNIVERSITIES);

  const { isOpen: isOpenAddUniversity, onOpen: onOpenAddUniversity, onClose: onCloseAddUniversity } = useDisclosure();
  const { isOpen: isOpenDeleteUniversity, onOpen: onOpenDeleteUniversity, onClose: onCloseDeleteUniversity } = useDisclosure();

  return (
    <>
      <Box>
        <Heading
          mt='0.5rem'
          fontSize='3xl'
          textAlign='center'
          color='white'
        >
          Universidades
        </Heading>
        <Box px='1rem'>
          <HStack justifyContent="space-between" py='3'>
            <Box>
              <Button leftIcon={<FaSlidersH />} color='white' colorScheme='whiteAlpha' variant='ghost' size='sm'>
                Filtros
              </Button>
            </Box>
            <Box>
              <Button leftIcon={<FaPlusCircle />} onClick={onOpenAddUniversity} color='white' colorScheme='whiteAlpha' variant='ghost' size='sm'>
                Agregar
              </Button>
              <ModalUniversities isOpen={isOpenAddUniversity} onClose={onCloseAddUniversity} refetch={refetchUniversities}/>
            </Box>
          </HStack>
        </Box>
        <Box overflowX='auto' display='block'>
          {
            dataUniversities ? (
              dataUniversities.getAllUniversities.length > 0 ? (
                <Table variant='simple' colorScheme='gray' minW='full' display='block' whiteSpace='nowrap' overflowX='auto' px='1rem'>
                  <Tbody display='table' w='full'>
                    <Tr
                      bg='whiteAlpha.200'
                      boxShadow='rgba(0, 0, 0, 0.2) 0px 5px 15px'
                    >
                      <Th color='white' borderBottom='none' borderLeftRadius='md'>Universidad</Th>
                      <Th color='white' borderBottom='none' borderRightRadius='md'>Acción</Th>
                    </Tr>
                    {
                      dataUniversities.getAllUniversities.map(({ _id, name, regions, provinces, type, license, campuses, image }) => (
                        <TrUniversity
                          key={_id}
                          id={_id}
                          name={name}
                          regions={regions}
                          provinces={provinces}
                          type={type}
                          license={license}
                          campuses={campuses}
                          image={image}
                          onOpen={onOpenDeleteUniversity}
                          setSelectedId={setSelectedId}
                        />
                      ))
                    }
                  </Tbody>
                </Table>
              ) : (
                <Box w='full' px='1rem'>
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
              <Box w='full' px='1rem'>
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
      <ModalDelete
        isOpen={isOpenDeleteUniversity}
        onClose={onCloseDeleteUniversity}
        refetch={refetchUniversities}
        id={selectedId!}
      />
    </>
  )
}
