import { gql, useQuery } from "@apollo/client";
import { Box, Button, Heading, HStack, Icon, IconButton, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlus } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { ListProvinces } from "./ListProvinces";
import { ModalProvinces } from "./ModalProvinces";
import { ModalRegions } from "./ModalRegions";

const GET_REGIONS = gql`
  query GetAllRegions {
    getAllRegions {
      idReference
      name
    }
  }
`;

const GET_PROVINCES_BY_REGION_ID = gql`
  query GetProvincesByRegionId($input: GetProvincesByRegionIdInput!) {
    getProvincesByRegionId(input: $input) {
      idReference
      name
    }
  }
`;

export const Ubications = () => {

  const [idReferenceRegion, setIdReferenceRegion] = useState(null);
  const [nameRegion, setNameRegion] = useState(null);
  const [provinces, setProvinces] = useState([]);

  const { loading: loadingRegions, data: dataRegions, refetch: refetchRegions } = useQuery(GET_REGIONS);
  const { loading: loadingProvinces, data: dataProvinces, refetch: refetchProvinces } = useQuery(GET_PROVINCES_BY_REGION_ID, {
    variables: { input: { id: idReferenceRegion } }
  });

  const { isOpen: isOpenAddRegion, onOpen: onOpenAddRegion, onClose: onCloseAddRegion } = useDisclosure();
  const { isOpen: isOpenAddProvince, onOpen: onOpenAddProvince, onClose: onCloseAddProvince } = useDisclosure();

  const getProvinces = (id, name) => {
    setIdReferenceRegion(id);
    setNameRegion(name);
  }

  useEffect(() => {
    if (!loadingProvinces && dataProvinces) {
      setProvinces(dataProvinces.getProvincesByRegionId);
    }
  }, [dataProvinces, loadingProvinces]);

  return (
    <Box color='white' height='full'>
      <Heading
        marginTop='0.5rem'
        fontSize='3xl'
        textAlign='center'
      >
        Ubicaciones
      </Heading>
      <Box paddingX='0.5rem' paddingY='1.5rem' height='full'>
        <HStack spacing={3} height='full' width='full' alignItems='start'>
          <VStack position='relative' spacing={2} width='50%' bg='blackAlpha.400' height='full' rounded='xl' paddingX={4} paddingY={4}>
            <IconButton onClick={onOpenAddRegion} position='absolute' size='md' top={5} right={4} colorScheme='blackAlpha' icon={<FaPlus/>}/>
            <ModalRegions isOpenAddRegion={isOpenAddRegion} onCloseAddRegion={onCloseAddRegion} refetch={refetchRegions}/>
            <Text fontSize='2xl' paddingBottom={3}>Regiones</Text>
            {
              loadingRegions ? (
                <Text>Cargando...</Text>
              ) : (
                dataRegions.getAllRegions.map(({ idReference, name }) => (
                  <Button
                    key={idReference}
                    bg={idReferenceRegion === idReference ? 'blackAlpha.800' : 'blackAlpha.400'}
                    color={idReferenceRegion === idReference ? 'white' : 'gray.400'}
                    width='full'
                    onClick={() => {
                      getProvinces(idReference, name);
                      setIdReferenceRegion(idReference);
                    }}
                  >
                    <HStack alignItems='center' justifyContent='space-between' width='full'>
                      <Text>{name}</Text>
                      <Icon
                        as={MdKeyboardArrowRight}
                      />
                    </HStack>
                  </Button>
                ))
              )
            }
          </VStack>
          <VStack position='relative' spacing={2} width='50%' bg='blackAlpha.400' height='full' rounded='xl' paddingX={4} paddingY={4}>
            {
              idReferenceRegion && (
                <IconButton onClick={onOpenAddProvince} position='absolute' size='md' top={5} right={4} colorScheme='blackAlpha' icon={<FaPlus/>}/>
              )
            }
            <ModalProvinces
              isOpenAddProvince={isOpenAddProvince}
              onCloseAddProvince={onCloseAddProvince}
              refetch={refetchProvinces}
              idReferenceRegion={idReferenceRegion}
              nameRegion={nameRegion}
            />
            <Text fontSize='2xl' paddingBottom={3} marginTop={2}>Provincias</Text>
            {
              idReferenceRegion ? (
                <ListProvinces
                  loading={loadingProvinces}
                  refetch={refetchProvinces}
                  data={provinces}
                />
              ) : (
                <Text color='gray.500'>No hay datos para mostrar.</Text>
              )
            }
          </VStack>
        </HStack>
      </Box>
    </Box>
  )
}
