import { Box, Flex, Heading } from "@chakra-ui/react";
import { ListUniversities } from "./ListUniversities";

interface Props {
  name: string;
  university: string;
}

export const ListUniversityContainer = ({ name, university }: Props) => {
  return (
    <Flex
      flexDirection='column'
      maxW='6xl'
      mx='auto'
      mt='1rem'
      px={2}
      overflowX='hidden'
    >
      <Box
        overflowX='auto'
      >
        <Box
          minW='full'
          py='0.5rem'
          justifyContent='center'
        >
          <Heading
            mb='1.5rem'
            fontSize='4xl'
            textAlign='center'
            color='cyan.500'
            fontWeight={700}
          >
            {name}
          </Heading>
          <ListUniversities name={name} university={university}/>
        </Box>
      </Box>
    </Flex>
  )
}
