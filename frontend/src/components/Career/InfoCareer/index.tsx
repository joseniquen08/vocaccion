import { gql, useMutation, useQuery } from "@apollo/client";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, FormControl, Heading, HStack, Image, LinkBox, LinkOverlay, SimpleGrid, StackDivider, Text, Textarea, VStack } from "@chakra-ui/react";
import { GetCareerByIdType } from "@cust-types/admin/careerTypes";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { CommentCareer } from "./CommentCareer";

interface Props {
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
}

const CREATE_COMMENT_CAREER = gql`
  mutation CreateCommentCareer($input: CreateCommentCareerInput) {
    createCommentCareer(input: $input) {
      id
      idUser
      idCareer
      content
      createdAt
      updatedAt
    }
  }
`;

const GET_CAREER_BY_ID = gql`
  query GetCareerById($id: String) {
    getCareerById(id: $id) {
      id
      name
      type
      description
      faculty
      idUniversity
      nameUniversity
      imageUniversity
      duration
      lastUpdate
      comments {
        id
        idUser
        idCareer
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

export const InfoCareer = ({ id, user }: Props) => {

  const router = useRouter();

  const [comment, setComment] = useState<string>('');

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const { loading: loadingCareer, data: dataCareer, refetch: refetchCareer } = useQuery<GetCareerByIdType>(GET_CAREER_BY_ID, {
    variables: { id }
  })
  const [createCommentCareerMutation, { loading: loadingCommentCareer, data: dataCommentCareer }] = useMutation(CREATE_COMMENT_CAREER);

  const createCommentCareer = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    createCommentCareerMutation({
      variables: {
        input: {
          idUser: user.id,
          idCareer: id,
          content: commentRef.current?.value
        }
      }
    });
  }

  useEffect(() => {
    if (!loadingCommentCareer && dataCommentCareer) {
      refetchCareer();
    }
  }, [dataCommentCareer, loadingCommentCareer]);

  return (
    <Flex
      flexDirection='column'
      maxW='4xl'
      mx='auto'
      px={2}
    >
      <Box>
        {
          dataCareer && (
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
              <Heading
                mb='1rem'
                fontSize='4xl'
                textAlign='left'
                color='blackAlpha.800'
                fontWeight={800}
              >
                {dataCareer.getCareerById.name}
              </Heading>
              <Divider/>
              <Box>
                <HStack w='full' py='1.5rem'>
                  <LinkBox
                    as={HStack}
                    alignItems='center'
                    justifyContent='start'
                    overflow='hidden'
                    border='1px solid'
                    borderColor='blackAlpha.200'
                    rounded='xl'
                    py={3}
                    px={4}
                  >
                    <Image src={dataCareer.getCareerById.imageUniversity} alt={dataCareer.getCareerById.idUniversity} flex='none' objectFit='contain' w='2.4rem' h='2.4rem' mr='0.1rem'/>
                    <VStack alignItems='left' flexShrink='1' minW='0' spacing='0'>
                      <Text fontWeight={700} fontSize='0.95rem' noOfLines={1} color='gray.700'>
                        <NextLink href={`/universidad/${dataCareer.getCareerById.idUniversity}`} passHref>
                          <LinkOverlay>{dataCareer.getCareerById.nameUniversity}</LinkOverlay>
                        </NextLink>
                      </Text>
                      <Text fontWeight={500} fontSize='0.85rem' noOfLines={1} color='gray.500'>{dataCareer.getCareerById.faculty}</Text>
                    </VStack>
                  </LinkBox>
                </HStack>
                <VStack alignItems='start' spacing={1.5}>
                  <Text fontWeight={700} color='blackAlpha.800' fontSize='2xl'>Descripción</Text>
                  <Text>{dataCareer.getCareerById.description}</Text>
                </VStack>
                <SimpleGrid columns={3} spacing={4} py='1.5rem'>
                  <VStack alignItems='start' spacing={1.5}>
                    <Text fontWeight={700} color='blackAlpha.800' fontSize='xl'>Duración</Text>
                    <Text>{dataCareer.getCareerById.duration} semestres</Text>
                  </VStack>
                  <VStack alignItems='start' spacing={1.5}>
                    <Text fontWeight={700} color='blackAlpha.800' fontSize='xl'>Categoría</Text>
                    <Text>{dataCareer.getCareerById.type}</Text>
                  </VStack>
                  <VStack alignItems='start' spacing={1.5}>
                    <Text fontWeight={700} color='blackAlpha.800' fontSize='xl'>Última actualización</Text>
                    <Text>{dataCareer.getCareerById.lastUpdate}</Text>
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
                            dataCareer.getCareerById.comments.length > 0 ? (
                              dataCareer.getCareerById.comments.map((comment) => (
                                <CommentCareer key={comment.id} comment={comment}/>
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
                            <VStack as='form' onSubmit={createCommentCareer} alignItems='start' w='full'>
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
                        <Box>
                          <FaLock size={30}/>
                        </Box>
                        <Text fontWeight={500}>Inicia sesión o regístrate para ver las experienciasy puedas comentar.</Text>
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
