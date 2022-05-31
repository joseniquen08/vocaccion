import { gql, useQuery } from '@apollo/client';
import { Box, Heading, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { CardComment } from './CardComment';
import { ModalComment } from './ModalComment';
import { ModalDeleteComment } from './ModalDeleteComment';

const GET_ALL_COMMENTS_CAREER = gql`
  query GetAllCommentsCareer {
    getAllCommentsCareer {
      id
      content
      createdAt
      updatedAt
      user {
        id
        name
        image
        role
      }
      career {
        id
        name
        imageUniversity
      }
    }
  }
`;

const GET_ALL_COMMENTS_UNIVERSITY = gql`
  query GetAllCommentsUniversity {
    getAllCommentsUniversity {
      id
      content
      createdAt
      updatedAt
      user {
        id
        name
        image
        role
      }
      university {
        id
        name
        image
      }
    }
  }
`;

export const Comments = () => {

  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const { loading: loadingAllCommentsCareer, data: dataAllCommentsCareer, refetch: refetchAllCommentsCareer } = useQuery(GET_ALL_COMMENTS_CAREER);
  const { loading: loadingAllCommentsUniversity, data: dataAllCommentsUniversity, refetch: refetchAllCommentsUniversity } = useQuery(GET_ALL_COMMENTS_UNIVERSITY);

  const { isOpen: isOpenModalComment, onOpen: onOpenModalComment, onClose: onCloseModalComment } = useDisclosure();
  const { isOpen: isOpenModalDeleteComment, onOpen: onOpenModalDeleteComment, onClose: onCloseModalDeleteComment } = useDisclosure();

  const handleModalComment = (comment) => {
    setSelectedComment(comment);
    onOpenModalComment();
  }

  return (
    <Box color='white' height='full'>
      <Heading
        marginTop='0.5rem'
        fontSize='3xl'
        textAlign='center'
      >
        Comentarios
      </Heading>
      <Box paddingY={7} height='full'>
        <HStack spacing={3} height='full' width='full' alignItems='start'>
          <VStack position='relative' spacing={3} width='50%' bg='blackAlpha.500' height='full' rounded='xl' paddingX={4} paddingY={4}>
            <Heading
              fontSize='2xl'
              textAlign='center'
              py={2}
            >
              Carreras
            </Heading>
            {
              dataAllCommentsCareer && (
                dataAllCommentsCareer.getAllCommentsCareer.length > 0 ? (
                  dataAllCommentsCareer.getAllCommentsCareer.map((comment) => (
                    <CardComment
                      key={comment.id}
                      id={comment.id}
                      content={comment.content}
                      createdAt={comment.createdAt}
                      user={comment.user}
                      idPage={comment.career.id}
                      namePage={comment.career.name}
                      imagePage={comment.career.imageUniversity}
                      comment={comment}
                      handleModalComment={handleModalComment}
                    />
                  ))
                ) : (
                  <Box>No hay comentarios para mostrar.</Box>
                )
              )
            }
          </VStack>
          <VStack position='relative' spacing={3} width='50%' bg='blackAlpha.500' height='full' rounded='xl' paddingX={4} paddingY={4}>
            <Heading
              fontSize='2xl'
              textAlign='center'
              py={2}
            >
              Universidades
            </Heading>
            {
              dataAllCommentsUniversity && (
                dataAllCommentsUniversity.getAllCommentsUniversity.length > 0 ? (
                  dataAllCommentsUniversity.getAllCommentsUniversity.map((comment) => (
                    <CardComment
                      key={comment.id}
                      id={comment.id}
                      content={comment.content}
                      createdAt={comment.createdAt}
                      user={comment.user}
                      idPage={comment.university.id}
                      namePage={comment.university.name}
                      imagePage={comment.university.image}
                      comment={comment}
                      handleModalComment={handleModalComment}
                    />
                  ))
                ) : (
                  <Box>No hay comentarios para mostrar.</Box>
                )
              )
            }
          </VStack>
        </HStack>
        {
          selectedComment && (
            <ModalComment
              isOpen={isOpenModalComment}
              onClose={onCloseModalComment}
              onOpenDelete={onOpenModalDeleteComment}
              setSelectedId={setSelectedId}
              comment={selectedComment}
            />
          )
        }
        {
          selectedId && (
            <ModalDeleteComment
              isOpen={isOpenModalDeleteComment}
              onClose={onCloseModalDeleteComment}
              id={selectedId}
              comment={selectedComment}
              refetchCareer={refetchAllCommentsCareer}
              refetchUniversity={refetchAllCommentsUniversity}
              onOpenComment={onOpenModalComment}
            />
          )
        }
      </Box>
    </Box>
  )
}
