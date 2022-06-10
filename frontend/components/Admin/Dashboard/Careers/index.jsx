import { gql, useQuery } from "@apollo/client";
import { Box, Button, Heading, HStack, Table, TableCaption, Tbody, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlusCircle } from 'react-icons/fa';
import { ModalCareers } from "./ModalCareers";
import { ModalDelete } from "./ModalDelete";
import { TrCareer } from "./TrCareer";

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

  const [universities, setUniversities] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const { loading: loadingUniversities, data: dataUniversities } = useQuery(GET_UNIVERSITIES);
  const { loading: loadingCareers, data: dataCareers, refetch: refetchCareers } = useQuery(GET_CAREERS);

  const { isOpen: isOpenAddCareer, onOpen: onOpenAddCareer, onClose: onCloseAddCareer } = useDisclosure();
  const { isOpen: isOpenDeleteCareer, onOpen: onOpenDeleteCareer, onClose: onCloseDeleteCareer } = useDisclosure();

  useEffect(() => {
    if (!loadingUniversities && dataUniversities) {
      setUniversities(dataUniversities.getAllUniversities);
    }
  }, [dataUniversities, loadingUniversities]);

  return (
    <>
      <Box>
        <Heading
          mt='0.5rem'
          fontSize='3xl'
          textAlign='center'
          color='white'
        >Carreras</Heading>
        <Box px='1rem'>
          <HStack justifyContent="end" py='3'>
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
        </Box>
        <Box overflowX='auto' display='block'>
          {
            dataCareers ? (
              dataCareers.getAllCareers.length > 0 ? (
                <Table variant='simple' colorScheme='gray' minW='full' display='block' whiteSpace='nowrap' overflowX='auto' px='1rem'>
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
                        <TrCareer
                          key={id}
                          id={id}
                          name={name}
                          type={type}
                          description={description}
                          faculty={faculty}
                          idUniversity={idUniversity}
                          nameUniversity={nameUniversity}
                          imageUniversity={imageUniversity}
                          duration={duration}
                          lastUpdate={lastUpdate}
                          onOpen={onOpenDeleteCareer}
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
                        <Th color='white' borderBottom='none' borderLeftRadius='md'>Carrera</Th>
                        <Th color='white' borderBottom='none' borderRightRadius='md' textAlign='center'>Acción</Th>
                      </Tr>
                    </Thead>
                    <TableCaption>No se han encontrado resultados</TableCaption>
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
      <ModalDelete
        isOpen={isOpenDeleteCareer}
        onClose={onCloseDeleteCareer}
        refetch={refetchCareers}
        id={selectedId}
      />
    </>
  )
}
