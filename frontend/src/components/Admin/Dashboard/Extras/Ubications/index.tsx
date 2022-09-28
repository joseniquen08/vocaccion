import { gql, useQuery } from "@apollo/client";
import { Box, Button, Heading, HStack, Icon, IconButton, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPlus } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { GetAllRegionsType, GetProvincesByRegionIdType, ProvinceType } from '../../../../../types/admin/ubicationTypes';
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

  const [idReferenceRegion, setIdReferenceRegion] = useState<string | null>(null);
  const [nameRegion, setNameRegion] = useState<string | null>(null);
  const [provinces, setProvinces] = useState<(Omit<ProvinceType, 'id' | 'idReferenceRegion'>)[]>([]);

  const { loading: loadingRegions, data: dataRegions, refetch: refetchRegions } = useQuery<GetAllRegionsType>(GET_REGIONS);
  const { loading: loadingProvinces, data: dataProvinces, refetch: refetchProvinces } = useQuery<GetProvincesByRegionIdType>(GET_PROVINCES_BY_REGION_ID, {
    variables: { input: { id: idReferenceRegion } }
  });

  const { isOpen: isOpenAddRegion, onOpen: onOpenAddRegion, onClose: onCloseAddRegion } = useDisclosure();
  const { isOpen: isOpenAddProvince, onOpen: onOpenAddProvince, onClose: onCloseAddProvince } = useDisclosure();

  const getProvinces = (id: string, name: string) => {
    setIdReferenceRegion(id);
    setNameRegion(name);
  }

  useEffect(() => {
    if (!loadingProvinces && dataProvinces) {
      setProvinces(dataProvinces.getProvincesByRegionId);
    }
  }, [dataProvinces, loadingProvinces]);

  return (
    <Box color='white' h='full'>
      <Heading
        mt='0.5rem'
        fontSize='3xl'
        textAlign='center'
      >
        Ubicaciones
      </Heading>
      <Box px='0.5rem' py='1.5rem' h='full'>
        <HStack spacing={3} h='full' w='full' alignItems='start'>
          <VStack position='relative' spacing={2} w='50%' bg='blackAlpha.400' h='full' rounded='xl' px={4} py={4}>
            <IconButton aria-label="fa-plus" onClick={onOpenAddRegion} position='absolute' size='md' top={5} right={4} colorScheme='blackAlpha' icon={<FaPlus/>}/>
            <ModalRegions isOpenAddRegion={isOpenAddRegion} onCloseAddRegion={onCloseAddRegion} refetch={refetchRegions}/>
            <Text fontSize='2xl' pb={3}>Regiones</Text>
            {
              loadingRegions ? (
                <Text>Cargando...</Text>
              ) : (
                dataRegions && (
                  dataRegions.getAllRegions.map(({ idReference, name }) => (
                    <Button
                      key={idReference}
                      bg={idReferenceRegion === idReference ? 'blackAlpha.800' : 'blackAlpha.400'}
                      color={idReferenceRegion === idReference ? 'white' : 'gray.400'}
                      w='full'
                      onClick={() => {
                        getProvinces(idReference, name);
                        setIdReferenceRegion(idReference);
                      }}
                    >
                      <HStack alignItems='center' justifyContent='space-between' w='full'>
                        <Text>{name}</Text>
                        <Icon
                          as={MdKeyboardArrowRight}
                        />
                      </HStack>
                    </Button>
                  ))
                )
              )
            }
          </VStack>
          <VStack position='relative' spacing={2} w='50%' bg='blackAlpha.400' h='full' rounded='xl' px={4} py={4}>
            {
              idReferenceRegion && (
                <IconButton aria-label="fa-plus" onClick={onOpenAddProvince} position='absolute' size='md' top={5} right={4} colorScheme='blackAlpha' icon={<FaPlus/>}/>
              )
            }
            <ModalProvinces
              isOpenAddProvince={isOpenAddProvince}
              onCloseAddProvince={onCloseAddProvince}
              refetch={refetchProvinces}
              idReferenceRegion={idReferenceRegion}
              nameRegion={nameRegion}
            />
            <Text fontSize='2xl' pb={3} mt={2}>Provincias</Text>
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
