import { gql, useMutation, useQuery } from "@apollo/client";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Badge, Box, Button, Divider, Flex, FormControl, Heading, HStack, Image, SimpleGrid, StackDivider, Text, Textarea, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaLock } from 'react-icons/fa';
import { CommentUniversity } from "./CommentUniversity";

const CREATE_COMMENT_UNIVERSITY = gql`
  mutation CreateCommentUniversity($input: CreateCommentUniversityInput) {
    createCommentUniversity(input: $input) {
      id
      idUser
      idUniversity
      content
      createdAt
      updatedAt
    }
  }
`;

const GET_UNIVERSITY_BY_ID = gql`
  query GetUniversityById($id: String) {
    getUniversityById(id: $id) {
      _id
      name
      regions {
        id
        idReference
        name
      }
      provinces {
        id
        idReference
        name
        idReferenceRegion
      }
      type
      license
      campuses
      image
      comments {
        id
        idUser
        idUniversity
        content
        createdAt
        updatedAt
        nameUser
        imageUser
      }
      errors {
        message
      }
    }
  }
`;

export const InfoUniversity = ({ id, user }) => {

  const router = useRouter();

  const [comment, setComment] = useState('');

  const commentRef = useRef();

  const { loading: loadingUniversity, data: dataUniversity, refetch: refetchUniversity } = useQuery(GET_UNIVERSITY_BY_ID, {
    variables: { id }
  })
  const [createCommentUniversityMutation, { loading: loadingCommentUniversity, data: dataCommentUniversity }] = useMutation(CREATE_COMMENT_UNIVERSITY);

  const createCommentUniversity = async (e) => {
    e.preventDefault();
    createCommentUniversityMutation({
      variables: {
        input: {
          idUser: user.id,
          idUniversity: id,
          content: commentRef.current.value
        }
      }
    });
  }

  useEffect(() => {
    if (!loadingCommentUniversity && dataCommentUniversity) {
      setComment('');
      refetchUniversity();
    }
  }, [dataCommentUniversity, loadingCommentUniversity]);

  return (
    <Flex
      flexDirection='column'
      maxW='4xl'
      mx='auto'
      px={2}
    >
      <Box>
        {
          dataUniversity && (
            <Box
              minW='full'
              py='1rem'
              justifyContent='center'
            >
              <Flex w='full' py='1rem'>
                <Button
                  leftIcon={<ArrowBackIcon />}
                  colorScheme='blackAlpha'
                  variant='ghost'
                  fontSize='0.95rem'
                  onClick={() => router.back()}
                >
                  Regresar
                </Button>
              </Flex>
              <HStack
                mb='1rem'
                alignItems='end'
              >
                <Image src={dataUniversity.getUniversityById.image} flex='none' objectFit='contain' w='5rem' h='5rem' mr='0.1rem'/>
                <VStack alignItems='start' spacing={0}>
                  <Heading
                    fontSize='4xl'
                    textAlign='left'
                    color='blackAlpha.800'
                    fontWeight={800}
                  >
                    {dataUniversity.getUniversityById.name}
                  </Heading>
                  <Box>
                    {
                      dataUniversity.getUniversityById.provinces.map((province) => (
                        <Badge key={province.id} colorScheme='blackAlpha' fontSize='0.9rem'>{province.name}</Badge>
                      ))
                    }
                  </Box>
                </VStack>
              </HStack>
              <Divider/>
              <Box py='1.5rem'>
                <SimpleGrid columns={3} spacing={4} py='1.5rem'>
                  <VStack alignItems='start' spacing={1.5}>
                    <Text fontWeight={700} color='blackAlpha.800' fontSize='xl'>Categoría</Text>
                    <Text>{dataUniversity.getUniversityById.type === 'publica' ? 'Pública' : 'Privada'}</Text>
                  </VStack>
                </SimpleGrid>
              </Box>
              <Box>
                <VStack w='full' py='1.5rem' alignItems='start' spacing={4}>
                  <Text fontWeight={700} color='blackAlpha.800' fontSize='2xl'>Experiencias</Text>
                  {
                    user ? (
                      <>
                        <VStack
                          divider={<StackDivider borderColor='gray.200'/>}
                          spacing={4}
                          w='full'
                          borderWidth='1px'
                          borderRadius='lg'
                          overflow='hidden'
                          px={6}
                          py={4}
                        >
                          {
                            dataUniversity.getUniversityById.comments.length > 0 ? (
                              dataUniversity.getUniversityById.comments.map((comment) => (
                                <CommentUniversity key={comment.id} comment={comment}/>
                              ))
                            ): (
                              <Text fontSize='0.95rem' align='center' fontWeight={500} color='gray.600'>Aún no hay experiencias publicadas.</Text>
                            )
                          }
                        </VStack>
                        <Box w='full' py='0.5rem'>
                          <HStack alignItems='start' w='full'>
                            <HStack flex='none' border='1px solid' borderColor='gray.200' w='2.2rem' h='2.2rem' alignItems='center' justifyContent='center' borderRadius='full' overflow='hidden' mr='0.1rem'>
                              <Image src={user.image === '' ? '/images/user-default.png' : user.image} alt={user.name} flex='none' objectFit='contain' w='2.2rem' h='2.2rem'/>
                            </HStack>
                            <VStack as='form' onSubmit={createCommentUniversity} alignItems='start' w='full'>
                              <FormControl isRequired>
                                <Textarea
                                  w='full'
                                  ref={commentRef}
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  placeholder="Escribe tu experiencia en esta carrera"
                                  resize='none'
                                  _focus={{
                                    boxShadow: 'none',
                                  }}
                                  fontSize='0.95rem'
                                  fontWeight='500'
                                />
                              </FormControl>
                              <Button type='submit' variant='solid' size='sm' colorScheme='gray'>Comentar</Button>
                            </VStack>
                          </HStack>
                        </Box>
                      </>
                    ) : (
                      <VStack
                        w='full'
                        borderWidth='1px'
                        borderRadius='lg'
                        overflow='hidden'
                        alignItems='center'
                        cursor='pointer'
                        onClick={() => router.push('/login')}
                        spacing={4}
                        py={8}
                      >
                        <FaLock size={30}/>
                        <Text fontWeight={500}>Inicia sesión o regístrate para ver las experiencias y puedas comentar.</Text>
                      </VStack>
                    )
                  }
                </VStack>
              </Box>
            </Box>
          )
        }
      </Box>
    </Flex>
  );
}
