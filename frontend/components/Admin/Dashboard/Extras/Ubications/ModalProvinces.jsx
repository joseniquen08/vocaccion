import { gql, useMutation } from "@apollo/client";
import { Button, ChakraProvider, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { modalAddTheme } from "../../../../../styles/theme.chakra";

const ADD_PROVINCE_MUTATION = gql`
  mutation CreateProvince($input: CreateProvinceInput) {
    createProvince(input: $input) {
      idReference
      name
    }
  }
`;

export const ModalProvinces = ({ isOpenAddProvince, onCloseAddProvince, refetch, idReferenceRegion, nameRegion }) => {

  const [addProvinceMutation, { data, loading }] = useMutation(ADD_PROVINCE_MUTATION);

  const idReferenceRef = useRef();
  const nameRef = useRef();

  const addProvince = (e) => {
    e.preventDefault();
    addProvinceMutation({
      variables: {
        input: {
          idReference: idReferenceRef.current.value,
          name: nameRef.current.value,
          idReferenceRegion: idReferenceRegion
        }
      }
    })
  }

  useEffect(() => {
    if (!loading && data) {
      onCloseAddProvince();
      refetch();
    }
  }, [data, loading]);

  return (
    <Modal
      isOpen={isOpenAddProvince}
      onClose={onCloseAddProvince}
      motionPreset="slideInBottom"
      size='xl'
      isCentered
    >
      <ModalOverlay backdropFilter='blur(3px)' />
      <ModalContent as='form' onSubmit={addProvince} bg='gray.800' color='white' px={3} py={1}>
        <ModalHeader>Agregar Provincia</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ChakraProvider theme={modalAddTheme}>
            <VStack spacing={5}>
              <FormControl isRequired variant="floating">
                <Input
                  id='name_region'
                  type='text'
                  _focus={{
                    boxShadow: 'none',
                  }}
                  placeholder=' '
                  fontSize='0.95rem'
                  fontWeight='500'
                  value={nameRegion}
                  readOnly
                />
                <FormLabel color='gray.400' htmlFor='name_region'>Región</FormLabel>
              </FormControl>
              <FormControl isRequired variant="floating">
                <Input
                  ref={idReferenceRef}
                  id='id_reference_province'
                  type='text'
                  _focus={{
                    boxShadow: 'none',
                  }}
                  placeholder=' '
                  fontSize='0.95rem'
                  fontWeight='500'
                  autoFocus
                />
                <FormLabel color='gray.400' htmlFor='id_reference_province'>Id reference</FormLabel>
              </FormControl>
              <FormControl isRequired variant="floating">
                <Input
                  ref={nameRef}
                  id='name_province'
                  type='text'
                  _focus={{
                    boxShadow: 'none',
                  }}
                  placeholder=' '
                  fontSize='0.95rem'
                  fontWeight='500'
                />
                <FormLabel color='gray.400' htmlFor='name_province'>Nombre</FormLabel>
              </FormControl>
            </VStack>
          </ChakraProvider>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" colorScheme='blackAlpha' px='8'>Agregar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
