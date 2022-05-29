import { gql, useMutation } from "@apollo/client";
import { Button, DarkMode, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useEffect } from "react";

const DELETE_UNIVERSITY_MUTATION = gql`
  mutation DeleteUniversity($id: String!) {
    deleteUniversity(id: $id) {
      name
    }
  }
`;

export const ModalDelete = ({ isOpen, onClose, refetch, id }) => {

  const [deleteUniversityMutation, { loading, data }] = useMutation(DELETE_UNIVERSITY_MUTATION);

  const handleUniversityCareer = async () => {
    deleteUniversityMutation({
      variables: {
        id
      }
    });
  }

  useEffect(() => {
    if (!loading && data) {
      onClose();
      refetch();
    }
  }, [data, loading]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size='lg'
      isCentered
      autoFocus={false}
    >
      <ModalOverlay backdropFilter='blur(3px)' />
      <ModalContent bg='gray.800' color='white' px={3} py={1}>
        <ModalHeader>Eliminar Carrera</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>¿Está seguro que desea eliminar la carrera?</Text>
        </ModalBody>
        <ModalFooter>
          <DarkMode>
            <HStack>
              <Button onClick={() => onClose()} colorScheme='gray'>Cancelar</Button>
              <Button onClick={() => handleUniversityCareer()} colorScheme='red'>Eliminar</Button>
            </HStack>
          </DarkMode>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
