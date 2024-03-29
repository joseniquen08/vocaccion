import { Button, DarkMode, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { UserType } from '@cust-types/auth/index';
import Image from "next/image";
import { useState } from 'react';
import { FaBan, FaTrashAlt } from 'react-icons/fa';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
}

export const ModalUser = ({ isOpen, onClose, user }: Props) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
      size='xl'
    >
      <ModalOverlay backdropFilter='blur(3px)' />
      <ModalContent bg='gray.800' color='white' px={3} py={2}>
        <ModalBody>
          <DarkMode>
            <HStack alignItems='start' py={4}>
              <HStack mr={2} alignItems='center' justifyContent='center' rounded='lg' overflow='hidden'>
                <Image src={user.image === '' ? '/images/user-default.png' : user.image} alt={user.name} width={70} height={70} priority={true} objectFit='cover' objectPosition='center'/>
              </HStack>
              <VStack alignItems='left' spacing={0}>
                <Text noOfLines={1} fontSize='xl' fontWeight={500}>{user.name}</Text>
                <Text noOfLines={1} fontSize='md' color='gray.500'>{user.email}</Text>
              </VStack>
            </HStack>
            <HStack spacing={2} py={2}>
              <Button isDisabled leftIcon={<FaBan />} isLoading={isLoading} size='sm' colorScheme='yellow' variant='solid'>
                Vetar
              </Button>
              <Button leftIcon={<FaTrashAlt />} isLoading={isLoading} size='sm' colorScheme='red' variant='solid'>
                Eliminar
              </Button>
            </HStack>
          </DarkMode>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='whiteAlpha' px='6' onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
