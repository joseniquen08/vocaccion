import { gql, useMutation } from "@apollo/client";
import { Button, ChakraProvider, DarkMode, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Textarea, VStack } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { modalAddTheme } from "../../../../theme/theme.chakra";
import { UniversityType } from '../../../../types/admin/universityTypes';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: (Omit<UniversityType, 'id'> & { '_id': string })[];
  refetch: any;
}

const ADD_CAREER_MUTATION = gql`
  mutation CreateCareer($input: CreateCareerInput) {
    createCareer(input: $input) {
      name
      type
      description
      faculty
      idUniversity
      imageUniversity
      duration
      lastUpdate
    }
  }
`;

export const ModalCareers = ({ isOpen, onClose, data, refetch }: Props) => {

  const [idUniversity, setIdUniversity] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [typeDurationCareer, setTypeDurationCareer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [addCareerMutation, { data: dataCareer, loading: loadingCareer }] = useMutation(ADD_CAREER_MUTATION);

  const nameCareerRef = useRef<HTMLInputElement>(null);
  const descriptionCareerRef = useRef<HTMLTextAreaElement>(null);
  const facultyCareerRef = useRef<HTMLInputElement>(null);
  const durationCareerRef = useRef<HTMLInputElement>(null);

  const handleSelectUniversity = (e: ChangeEvent<HTMLSelectElement>) => {
    setIdUniversity(e.target.value);
  }

  const handleSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }

  const addCareer = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await addCareerMutation({
      variables: {
        input: {
          name: nameCareerRef.current?.value,
          type: category,
          description: descriptionCareerRef.current?.value,
          faculty: facultyCareerRef.current?.value,
          idUniversity: idUniversity,
          imageUniversity: '',
          duration: parseInt(durationCareerRef.current!.value),
          lastUpdate: '22-1',
        }
      }
    });
  }

  useEffect(() => {
    if (!loadingCareer && dataCareer) {
      onClose();
      refetch();
      setIsLoading(false);
    }
  }, [dataCareer, loadingCareer]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size='xl'
      isCentered
    >
      <ModalOverlay backdropFilter='blur(3px)' />
      <ModalContent as='form' onSubmit={addCareer} bg='gray.800' color='white' px={3} py={1}>
        <ModalHeader>Agregar Carrera</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ChakraProvider theme={modalAddTheme}>
            <VStack spacing={5}>
              <FormControl isRequired variant="floating">
                <Input
                  ref={nameCareerRef}
                  id='name_career'
                  type='text'
                  _focus={{
                    boxShadow: 'none',
                  }}
                  placeholder=' '
                  fontSize='0.95rem'
                  fontWeight='500'
                  autoFocus
                />
                <FormLabel color='gray.400' htmlFor='name_career'>Nombre</FormLabel>
              </FormControl>
              <DarkMode>
                <FormControl isRequired>
                  <Select
                    variant='outline'
                    placeholder='Universidad'
                    color='gray.400'
                    fontWeight='500'
                    borderRadius='lg'
                    w='full'
                    flex='none'
                    _focus={{
                      boxShadow: 'none',
                    }}
                    _hover={{
                      borderColor: 'inherit',
                    }}
                    onChange={handleSelectUniversity}
                  >
                    {
                      data && (
                        data.map(({ _id, name }) => (
                          <option key={_id} value={_id}>{name}</option>
                        ))
                      )
                    }
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <Select
                    variant='outline'
                    placeholder='Categoría'
                    color='gray.400'
                    fontWeight='500'
                    borderRadius='lg'
                    w='full'
                    flex='none'
                    _focus={{
                      boxShadow: 'none',
                    }}
                    _hover={{
                      borderColor: 'inherit',
                    }}
                    onChange={handleSelectCategory}
                  >
                    <option value='Arquitectura'>Arquitectura</option>
                    <option value='Arte'>Arte</option>
                    <option value='Ciencias'>Ciencias</option>
                    <option value='Ciencias Sociales'>Ciencias Sociales</option>
                    <option value='Derecho'>Derecho</option>
                    <option value='Ingeniería'>Ingeniería</option>
                  </Select>
                </FormControl>
              </DarkMode>
              <FormControl isRequired variant="floating">
                <Input
                  ref={facultyCareerRef}
                  id='faculty_career'
                  type='text'
                  _focus={{
                    boxShadow: 'none',
                  }}
                  placeholder=' '
                  fontSize='0.95rem'
                  fontWeight='500'
                />
                <FormLabel color='gray.400' htmlFor='faculty_career'>Facultad</FormLabel>
              </FormControl>
              <FormControl isRequired variant="floating">
                <Textarea
                  ref={descriptionCareerRef}
                  id='description_career'
                  resize='none'
                  placeholder=' '
                  _focus={{
                    boxShadow: 'none',
                  }}
                  fontSize='0.95rem'
                  fontWeight='500'
                />
                <FormLabel color='gray.400' htmlFor='description_career'>Descripción</FormLabel>
              </FormControl>
              <HStack w='full' spacing={3}>
                <FormControl isRequired variant="floating" w='50%'>
                  <NumberInput min={6} max={12} defaultValue={6}>
                    <NumberInputField
                      ref={durationCareerRef}
                      id='duration_career'
                      _focus={{
                        boxShadow: 'none',
                      }}
                      placeholder=' '
                      fontSize='0.95rem'
                      fontWeight='500'
                      onKeyDown={(e) => {e.preventDefault()}}
                    />
                    <FormLabel color='gray.400' htmlFor='duration_career'>Duración</FormLabel>
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <DarkMode>
                  <FormControl isRequired w='50%'>
                    <Select
                      variant='outline'
                      color='gray.400'
                      fontWeight='500'
                      borderRadius='lg'
                      w='full'
                      flex='none'
                      _focus={{
                        boxShadow: 'none',
                      }}
                      _hover={{
                        borderColor: 'inherit',
                      }}
                      onChange={(e) => setTypeDurationCareer(e.target.value)}
                    >
                      <option value="semestres" defaultChecked>semestres</option>
                      <option value="ciclos">ciclos</option>
                    </Select>
                  </FormControl>
                </DarkMode>
              </HStack>
            </VStack>
          </ChakraProvider>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" isLoading={isLoading} colorScheme='blackAlpha'>Agregar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
