import { Badge, Button, DarkMode, HStack, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdReportProblem } from 'react-icons/md';
import { CommentCareerType } from '../../../../../types/admin/careerTypes';
import { CommentUniversityType } from '../../../../../types/admin/universityTypes';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onOpenDelete: () => void;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
  comment: CommentCareerType & CommentUniversityType;
}

export const ModalComment = ({ isOpen, onClose, onOpenDelete, setSelectedId, comment }: Props) => {

  const handleModalDelete = () => {
    setSelectedId(comment.id);
    onClose();
    onOpenDelete();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
      size='xl'
      isCentered
    >
      <ModalOverlay backdropFilter='blur(3px)' />
      <ModalContent bg='gray.800' color='white' px={3} py={2}>
        <ModalBody>
          <VStack>
            <HStack alignItems='start' w='full' py={2}>
              <HStack w='50%' spacing={2}>
                <HStack flex='none' mr={1} alignItems='center' justifyContent='center' rounded='lg' overflow='hidden'>
                  <Image src={comment.user.image === '' ? '/images/user-default.png' : comment.user.image} flex='none' objectFit='contain' w='2.8rem' h='2.8rem' alt={comment.user.name}/>
                </HStack>
                <VStack alignItems='left' spacing={0}>
                  <Text noOfLines={1} fontSize='1rem' fontWeight={500} color='gray.400'>{comment.user.name}</Text>
                  <HStack spacing={1.5} pt={1}>
                    <Badge fontSize='0.7rem' variant='outline' colorScheme='cyan'>
                      {
                        comment.user.role === 'user' ? 'usuario' : comment.user.role === 'admin' ? 'administrador' : 'superadmin'
                      }
                    </Badge>
                  </HStack>
                </VStack>
              </HStack>
              <HStack w='50%'>
                <HStack flex='none' bg='white' mr={1} alignItems='center' justifyContent='center' rounded='lg' overflow='hidden'>
                  <Image src={comment.career ? comment.career.imageUniversity : comment.university.image} flex='none' objectFit='contain' w='2.8rem' h='2.8rem' alt={comment.content}/>
                </HStack>
                <VStack alignItems='left' spacing={0}>
                  <Text noOfLines={2} fontSize='1rem' fontWeight={500} color='gray.400'>
                    {
                      comment.career ? comment.career.name : comment.university.name
                    }
                  </Text>
                </VStack>
              </HStack>
            </HStack>
            <HStack w='full'>
              <VStack alignItems='left' spacing={2}>
                <Text fontSize='md' fontWeight={500} color='white'>{comment.content}</Text>
                <Text noOfLines={1} fontSize='sm' color='gray.600'>{
                  dayjs(comment.createdAt).format('DD/MM/YYYY hh:mm a')
                }</Text>
              </VStack>
            </HStack>
            <DarkMode>
              <HStack spacing={3} py={2}>
                <Button isDisabled leftIcon={<MdReportProblem />} size='sm' colorScheme='yellow' variant='outline'>
                  Enviar advertencia
                </Button>
                <Button onClick={() => handleModalDelete()} leftIcon={<FaTrashAlt />} size='sm' colorScheme='red' variant='outline'>
                  Eliminar
                </Button>
              </HStack>
            </DarkMode>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='whiteAlpha' px='6' onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
