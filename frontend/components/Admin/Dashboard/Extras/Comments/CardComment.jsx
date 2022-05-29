import { Badge, HStack, Image, StackDivider, Text, VStack } from "@chakra-ui/react";

export const CardComment = ({ id, content, createdAt, user, page }) => {
  return (
    <VStack divider={<StackDivider borderColor='gray.500'/>} cursor='pointer' bg='blackAlpha.600' paddingX={7} paddingY={5} rounded='xl' border='1px solid' borderColor='gray.700' spacing={3}>
      <HStack alignItems='start' w='full'>
        <HStack w='50%'>
          <HStack flex='none' marginRight={1} alignItems='center' justifyContent='center' rounded='lg' overflow='hidden'>
            <Image src={user.image === '' ? '/images/user-default.png' : user.image} flex='none' objectFit='contain' w='2.5rem' h='2.5rem'/>
          </HStack>
          <VStack alignItems='left' spacing={0}>
            <Text noOfLines={1} fontSize='md' fontWeight={500} color='gray.500'>{user.name}</Text>
            <HStack spacing={1.5} paddingTop={1}>
              <Badge fontSize='0.7rem' variant='outline' colorScheme='cyan'>
                {
                  user.role === 'user' ? 'usuario' : user.role === 'admin' ? 'administrador' : 'superadmin'
                }
              </Badge>
            </HStack>
          </VStack>
        </HStack>
        <HStack w='50%'>
          <HStack flex='none' bgColor='white' marginRight={1} alignItems='center' justifyContent='center' rounded='lg' overflow='hidden'>
            <Image src={page.image} flex='none' objectFit='contain' w='2.5rem' h='2.5rem'/>
          </HStack>
          <VStack alignItems='left' spacing={0}>
            <Text noOfLines={1} fontSize='md' fontWeight={500} color='gray.500'>{page.name}</Text>
          </VStack>
        </HStack>
      </HStack>
      <HStack w='full'>
        <VStack alignItems='left' spacing={0}>
          <Text fontSize='md' fontWeight={500} color='white'>{content}</Text>
          <Text noOfLines={1} fontSize='sm' color='gray.600'>{createdAt}</Text>
        </VStack>
      </HStack>
    </VStack>
  )
}
