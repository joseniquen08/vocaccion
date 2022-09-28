import { gql, useMutation } from "@apollo/client";
import { Box, Button, HStack, Img, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FiImage } from "react-icons/fi";
import Cookies from "universal-cookie";
import { uploadImage } from "../../../../lib/uploadImage";
import { UserType } from '../../../../types/auth/index';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
  refetch: any;
}

const UPDATE_IMAGE_USER_MUTATION = gql`
  mutation UpdateImageUser($input: UpdateImageUserInput) {
    updateImageUser(input: $input) {
      token
      user {
        image
      }
    }
  }
`;

export const ModalPhoto = ({ isOpen, onClose, user, refetch }: Props) => {

  const cookies = new Cookies();
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  const [changeImageUserMutation, { data: dataChangeImageUser, loading: loadingChangeImageUser }] = useMutation(UPDATE_IMAGE_USER_MUTATION);

  const processImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imageUrl = URL.createObjectURL(e.currentTarget.files![0]);
    setImage(imageUrl);
  }

  const changeImage = async () => {
    if (fileRef.current?.files?.length !== 0) {
      const imageUrl = await uploadImage(fileRef.current!.files![0]);
      if (imageUrl) {
        changeImageUserMutation({
          variables: {
            input: {
              email: user.email,
              image: imageUrl
            }
          }
        });
      }
    }
  }

  useEffect(() => {
    if (!loadingChangeImageUser && dataChangeImageUser) {
      onClose();
      cookies.remove("token");
      cookies.set("token", dataChangeImageUser.updateImageUser.token, { path: '/' });
      refetch();
      router.reload();
    }
  }, [dataChangeImageUser, loadingChangeImageUser]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
      size='lg'
      isCentered
      autoFocus={false}
    >
      <ModalOverlay backdropFilter='blur(3px)' />
      <ModalContent bg='gray.800' py={4}>
        <ModalCloseButton />
        <ModalBody>
          <VStack w='full' px={10} spacing={6}>
            <HStack w='full'>
              <Box flex='none' alignItems='center' justifyContent='center' borderRadius='full' overflow='hidden' w='6rem' h='6rem'>
                <Image src={user.image === '' ? '/images/user-default.png' : user.image} alt={user.name} width={96} height={96} priority={true} objectFit='cover' objectPosition='center'/>
              </Box>
              <input type='file' ref={fileRef} onChange={processImage} accept='image/*' style={{ display: 'none' }}></input>
              <HStack w='full' justifyContent='center'>
                <Button
                  leftIcon={<FiImage size={20}/>}
                  variant='outline'
                  size='sm'
                  colorScheme='whiteAlpha'
                  color='white'
                  onClick={() => fileRef.current?.click()}
                  _focus={{
                    boxShadow: 'none',
                  }}
                >
                  Cambiar foto...
                </Button>
              </HStack>
            </HStack>
            {
              image && (
                <HStack
                  w='full'
                  bg='blackAlpha.500'
                  rounded='lg'
                  py={4}
                  alignItems='center'
                  justifyContent='center'
                >
                  <Img src={image} alt={image} boxSize='8rem' objectFit='cover' objectPosition='center'/>
                </HStack>
              )
            }
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack spacing={4}>
            <Button colorScheme='blackAlpha' size='sm' px='6' onClick={onClose}>Cancelar</Button>
            <Button
              isLoading={loadingChangeImageUser}
              loadingText=''
              spinnerPlacement='start'
              colorScheme='cyan'
              color='white'
              size='sm'
              px='6'
              onClick={() => changeImage()}
            >
              Cambiar
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
