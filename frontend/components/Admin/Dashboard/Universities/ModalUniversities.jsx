import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, ChakraProvider, DarkMode, FormControl, FormLabel, HStack, Img, Input, InputGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Stack, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FiImage } from "react-icons/fi";
import { uploadImage } from "../../../../lib/uploadImage";
import { modalAddTheme } from "../../../../styles/theme.chakra";
import { SelectProvinces } from "./SelectProvinces";

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

const ADD_UNIVERSITY_MUTATION = gql`
  mutation CreateUniversity($input: CreateUniversityInput) {
    createUniversity(input: $input) {
      name
      idReferencesRegion
      idReferencesProvince
      type
      license
      campuses
      image
    }
  }
`;

export const ModalUniversities = ({ isOpen, onClose, refetch }) => {

  const [provinces, setProvinces] = useState([]);
  const [typeUniversity, setTypeUniversity] = useState('publica');
  const [licenseUniversity, setLicenseUniversity] = useState('si');
  const [image, setImage] = useState(null);
  const [idReferenceRegion, setIdReferenceRegion] = useState(null);
  const [idReferenceProvince, setIdReferenceProvince] = useState(null);

  const { data: dataRegions } = useQuery(GET_REGIONS);
  const { loading: loadingProvinces, data: dataProvinces, refetch: refetchProvinces } = useQuery(GET_PROVINCES_BY_REGION_ID, {
    variables: { input: { id: idReferenceRegion } }
  });

  const [addUniversityMutation, { data: dataUniversity, loading: loadingUniversity }] = useMutation(ADD_UNIVERSITY_MUTATION);

  const nameUniversityRef = useRef();
  const sedesUniversityRef = useRef();
  const fileRef = useRef();

  const processImage = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setImage(imageUrl);
  }

  const handleSelectRegion = (e) => {
    setIdReferenceRegion(e.target.value);
  }

  const handleSelectProvince = (e) => {
    setIdReferenceProvince(e.target.value);
  }

  const addUniversity = async (e) => {
    e.preventDefault();
    if (fileRef.current.files.length !== 0) {
      const imageUrl = await uploadImage(fileRef.current.files[0]);
      if (imageUrl) {
        addUniversityMutation({
          variables: {
            input: {
              name: nameUniversityRef.current.value,
              idReferencesRegion: [idReferenceRegion],
              idReferencesProvince: [idReferenceProvince],
              type: typeUniversity,
              license: licenseUniversity,
              campuses: parseInt(sedesUniversityRef.current.value),
              image: imageUrl
            }
          }
        });
      }
    }
  }

  useEffect(() => {
    if (!loadingProvinces && dataProvinces) {
      setProvinces(dataProvinces.getProvincesByRegionId);
    }
  }, [dataProvinces, loadingProvinces]);

  useEffect(() => {
    if (!loadingUniversity && dataUniversity) {
      onClose();
      refetch();
    }
  }, [dataUniversity, loadingUniversity]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size='xl'
      isCentered
    >
      <ModalOverlay backdropFilter='blur(3px)' />
      <ModalContent as='form' onSubmit={addUniversity} bg='gray.800' color='white' px={3} py={1}>
        <ModalHeader>Agregar Universidad</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ChakraProvider theme={modalAddTheme}>
            <DarkMode>
              <VStack spacing={5}>
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
                    onChange={handleSelectRegion}
                  >
                    {
                      dataRegions ? (
                        dataRegions.getAllRegions.map(({ idReference, name }) => (
                          <option key={idReference} value={idReference}>{name}</option>
                        ))
                      ) : (<></>)
                    }
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <SelectProvinces loading={loadingProvinces} data={provinces} refetch={refetchProvinces} handleSelectProvince={handleSelectProvince} />
                </FormControl>
                <FormControl isRequired variant="floating">
                  <NumberInput
                    min={1}
                    max={10}
                    defaultValue={1}
                  >
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
                    <input type='file' ref={fileRef} onChange={processImage} accept='image/*' style={{ display: 'none' }}></input>
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
                {
                  image && (
                    <HStack
                      width='full'
                      bg='blackAlpha.400'
                      rounded='lg'
                      paddingY={4}
                      alignItems='center'
                      justifyContent='center'
                    >
                      <Img src={image} alt={image} boxSize='8rem' objectFit='cover' objectPosition='center'/>
                    </HStack>
                  )
                }
              </VStack>
            </DarkMode>
          </ChakraProvider>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" colorScheme='blackAlpha' px='8'>Agregar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
