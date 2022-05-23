import { Button, ChakraProvider, DarkMode, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { modalAddTheme } from "../../../../styles/theme.chakra";

export const ModalCareers = ({ isOpen, onClose, data, refetch }) => {

  const [idUniversity, setIdUniversity] = useState(null);
  const [typeDurationCareer, setTypeDurationCareer] = useState(null);

  const nameCareerRef = useRef();
  const facultyCareerRef = useRef();
  const durationCareerRef = useRef();

  const handleSelectUniversity = (e) => {
    setIdUniversity(e.target.value);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size='xl'
      isCentered
    >
      <ModalOverlay backdropFilter='blur(3px)' />
      <ModalContent bg='gray.800' color='white' px={3} py={1}>
        <ModalHeader>Agregar Carrera</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ChakraProvider theme={modalAddTheme}>
            <VStack as='form' spacing={5}>
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
                    width='full'
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
              <HStack width='full' spacing={3}>
                <FormControl isRequired variant="floating" width='50%'>
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
                  <FormControl isRequired width='50%'>
                    <Select
                      variant='outline'
                      color='gray.400'
                      fontWeight='500'
                      borderRadius='lg'
                      width='full'
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
          <Button colorScheme='blackAlpha'>Agregar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
