import { gql, useMutation } from "@apollo/client";
import { Button, DarkMode, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  refetch: any;
  id: string;
}

const DELETE_CAREER_MUTATION = gql`
  mutation DeleteCareer($id: String!) {
    deleteCareer(id: $id) {
      name
    }
  }
`;

export const ModalDelete = ({ isOpen, onClose, refetch, id }: Props) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [deleteCareerMutation, { loading, data }] = useMutation(DELETE_CAREER_MUTATION);

  const handleDeleteCareer = async () => {
    setIsLoading(true);
    await deleteCareerMutation({
      variables: {
        id
      }
    });
  }

  useEffect(() => {
    if (!loading && data) {
      onClose();
      refetch();
      setIsLoading(false);
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
              <Button onClick={() => handleDeleteCareer()} isLoading={isLoading} colorScheme='red'>Eliminar</Button>
            </HStack>
          </DarkMode>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
