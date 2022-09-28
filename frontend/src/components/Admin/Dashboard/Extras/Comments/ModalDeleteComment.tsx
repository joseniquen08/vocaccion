import { gql, useMutation } from "@apollo/client";
import { Button, DarkMode, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { CommentCareerAdminType, CommentUniversityAdminType } from '@cust-types/admin/commentTypes';
import { useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  comment: CommentCareerAdminType & CommentUniversityAdminType | null;
  refetchCareer: any;
  refetchUniversity: any;
  onOpenComment: () => void;
}

const DELETE_COMMENT_CAREER = gql`
  mutation DeleteCommentCareer($id: String!) {
    deleteCommentCareer(id: $id) {
      id
    }
  }
`;

const DELETE_COMMENT_UNIVERSITY = gql`
  mutation DeleteCommentUniversity($id: String!) {
    deleteCommentUniversity(id: $id) {
      id
    }
  }
`;

export const ModalDeleteComment = ({ isOpen, onClose, id, comment, refetchCareer, refetchUniversity, onOpenComment }: Props) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [deleteCommentCareerMutation, { loading: loadingDeleteCommentCareer, data: dataDeleteCommentCareer }] = useMutation(DELETE_COMMENT_CAREER);
  const [deleteCommentUniversityMutation, { loading: loadingDeleteCommentUniversity, data: dataDeleteCommentUniversity }] = useMutation(DELETE_COMMENT_UNIVERSITY);

  const handleCloseDelete = () => {
    onClose();
    onOpenComment();
  }

  const handleDeleteComment = async () => {
    if (comment?.career) {
      setIsLoading(true);
      await deleteCommentCareerMutation({ variables: { id } });
    } else {
      setIsLoading(true);
      await deleteCommentUniversityMutation({ variables: { id } });
    }
  }

  useEffect(() => {
    if (!loadingDeleteCommentCareer && dataDeleteCommentCareer) {
      onClose();
      refetchCareer();
      setIsLoading(false);
    }
  }, [dataDeleteCommentCareer, loadingDeleteCommentCareer]);

  useEffect(() => {
    if (!loadingDeleteCommentUniversity && dataDeleteCommentUniversity) {
      onClose();
      refetchUniversity();
      setIsLoading(false);
    }
  }, [dataDeleteCommentUniversity, loadingDeleteCommentUniversity]);

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
              <Button onClick={() => handleCloseDelete()} colorScheme='gray'>Cancelar</Button>
              <Button onClick={() => handleDeleteComment()} isLoading={isLoading} colorScheme='red'>Eliminar</Button>
            </HStack>
          </DarkMode>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
