import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, IconButton, Link, useDisclosure, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

export const MenuMdButton = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

    return (
      <Box display={{ base: "inline-flex", md: "none" }}>
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="Open menu"
          fontSize="20px"
          color='gray.600'
          variant="ghost"
          colorScheme='gray'
          icon={<AiOutlineMenu />}
          onClick={onOpen}
          ref={btnRef}
        />
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
          size='xs'
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton _focus={{ boxShadow: 'none' }}/>
            <DrawerBody mt={12} p={0} color='gray.600'>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton _focus={{ boxShadow: 'none' }}>
                      <Box flex='1' textAlign='left' fontWeight={500}>
                        Carreras
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <VStack
                    as={AccordionPanel}
                    display="flex"
                    alignItems="center"
                    flexDirection='column'
                    spacing={4}
                    py={4}
                  >
                    <NextLink href="/carreras/ciencias" passHref>
                      <Link fontWeight={400} w='full'>Ciencias</Link>
                    </NextLink>
                    <NextLink href="/carreras/arte" passHref>
                      <Link fontWeight={400} w='full'>Arte</Link>
                    </NextLink>
                    <NextLink href="/carreras/arquitectura" passHref>
                      <Link fontWeight={400} w='full'>Arquitectura</Link>
                    </NextLink>
                    <NextLink href="/carreras/derecho" passHref>
                      <Link fontWeight={400} w='full'>Derecho</Link>
                    </NextLink>
                    <NextLink href="/carreras/ingenieria" passHref>
                      <Link fontWeight={400} w='full'>Ingeniería</Link>
                    </NextLink>
                    <NextLink href="/carreras/ciencias-sociales" passHref>
                      <Link fontWeight={400} w='full'>Ciencias Sociales</Link>
                    </NextLink>
                  </VStack>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton _focus={{ boxShadow: 'none' }}>
                      <Box flex='1' textAlign='left' fontWeight={500}>
                        Universidades
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <VStack
                    as={AccordionPanel}
                    display="flex"
                    alignItems="center"
                    flexDirection='column'
                    spacing={4}
                    py={4}
                  >
                    <NextLink href="/universidades/publicas" passHref>
                      <Link fontWeight={400} w='full'>Públicas</Link>
                    </NextLink>
                    <NextLink href="/universidades/privadas" passHref>
                      <Link fontWeight={400} w='full'>Privadas</Link>
                    </NextLink>
                  </VStack>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <NextLink href="help" passHref>
                        <Box flex='1' textAlign='left' fontWeight={500}>
                          Ayuda
                        </Box>
                      </NextLink>
                    </AccordionButton>
                  </h2>
                </AccordionItem>
              </Accordion>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    );
}
