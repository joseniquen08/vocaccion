import { Box, Button, Grid, GridItem, HStack, Text } from "@chakra-ui/react"
import Image from "next/image"

export const Profile = ({ user }) => {
  return (
    <Box width='full'>
      <Box
        maxWidth='4xl'
        marginX='auto'
        marginY='3rem'
        border='1px solid'
        borderColor={'#d6d3d1'}
        rounded='2xl'
        overflow='hidden'
      >
        <Box position='relative'>
          <Box height='10rem' bg='cyan.100'></Box>
          <HStack position='absolute' alignItems='end' paddingX='5rem' bottom='-4.5rem' width='full'>
            <HStack alignItems='center' justifyContent='center' borderRadius='full' width='6.5rem' height='6.5rem' bg='white'>
              <Box alignItems='center' justifyContent='center' borderRadius='full' overflow='hidden' width='6rem' height='6rem'>
                <Image src={user.image === '' ? '/images/user-default.png' : user.image} alt={user.name} width={96} height={96} priority="true"/>
              </Box>
            </HStack>
            <HStack paddingBottom='0.8rem' width='full' justifyContent='space-between'>
              <Box paddingLeft='0.75rem'>
                <Text fontWeight={600} fontSize='xl' color='gray.700'>{user.name}</Text>
                <Text fontWeight={500} fontSize='sm' color='gray.600'>{user.email}</Text>
              </Box>
              <Box>
                <Button variant='solid' colorScheme='cyan' color='white'>Editar</Button>
              </Box>
            </HStack>
          </HStack>
        </Box>
        <Box height='10rem' marginTop='4.5rem' paddingY='2.5rem' paddingX='5rem'>
          <Grid templateColumns='repeat(9, 1fr)'>
            <GridItem colsSpan={4}/>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
