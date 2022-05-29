import { gql, useQuery } from '@apollo/client';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { CardComment } from './CardComment';

const GET_ALL_COMMENTS = gql`
  query GetAllComments {
    getAllComments {
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
      page {
        id
        name
        image
      }
    }
  }
`;

export const Comments = () => {

  const { loading, data } = useQuery(GET_ALL_COMMENTS);

  return (
    <Box color='white' height='full'>
      <Heading
        marginTop='0.5rem'
        fontSize='3xl'
        textAlign='center'
      >
        Comentarios
      </Heading>
      <VStack overflowX='auto' display='block' color='gray.200' paddingX={4} paddingY={7}>
        {
          data && (
            data.getAllComments.map(({ id, content, createdAt, user, page }) => (
              <CardComment
                key={id}
                id={id}
                content={content}
                createdAt={createdAt}
                user={user}
                page={page}
              />
            ))
          )
        }
      </VStack>
    </Box>
  )
}
