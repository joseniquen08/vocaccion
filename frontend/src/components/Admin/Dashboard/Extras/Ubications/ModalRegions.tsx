import { gql, useMutation } from "@apollo/client";
import { Button, ChakraProvider, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { FormEvent, useEffect, useRef } from "react";
import { modalAddTheme } from "../../../../../theme/theme.chakra";

type Props = {
  isOpenAddRegion: boolean;
  onCloseAddRegion: () => void;
  refetch: any;
}

const ADD_REGION_MUTATION = gql`
  mutation CreateRegion($input: CreateRegionInput) {
    createRegion(input: $input) {
      idReference
      name
    }
  }
`;

export const ModalRegions = ({ isOpenAddRegion, onCloseAddRegion, refetch }: Props) => {

  const [addRegionMutation, { data, loading }] = useMutation(ADD_REGION_MUTATION);

  const idReferenceRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const addRegion = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    addRegionMutation({
      variables: {
        input: {
          idReference: idReferenceRef.current?.value,
          name: nameRef.current?.value
        }
      }
    })
  }

  useEffect(() => {
    if (!loading && data) {
      onCloseAddRegion();
      refetch();
    }
  }, [data, loading]);

  return (
    <Modal
      isOpen={isOpenAddRegion}
      onClose={onCloseAddRegion}
      motionPreset="slideInBottom"
      size='xl'
      isCentered
    >
      <ModalOverlay backdropFilter='blur(3px)' />
      <ModalContent as='form' onSubmit={addRegion} bg='gray.800' color='white' px={3} py={1}>
        <ModalHeader>Agregar Región</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ChakraProvider theme={modalAddTheme}>
            <VStack spacing={5}>
              <FormControl isRequired variant="floating">
                <Input
                  ref={idReferenceRef}
                  id='id_reference_region'
                  type='text'
                  _focus={{
                    boxShadow: 'none',
                  }}
                  placeholder=' '
                  fontSize='0.95rem'
                  fontWeight='500'
                  autoFocus
                />
                <FormLabel color='gray.400' htmlFor='id_reference_region'>Id reference</FormLabel>
              </FormControl>
              <FormControl isRequired variant="floating">
                <Input
                  ref={nameRef}
                  id='name_region'
                  type='text'
                  _focus={{
                    boxShadow: 'none',
                  }}
                  placeholder=' '
                  fontSize='0.95rem'
                  fontWeight='500'
                />
                <FormLabel color='gray.400' htmlFor='name_region'>Nombre</FormLabel>
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
