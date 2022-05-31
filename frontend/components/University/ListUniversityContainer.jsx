import { Box, Flex, Heading } from "@chakra-ui/react";
import { ListUniversities } from "./ListUniversities";

export const ListUniversityContainer = ({ name, university }) => {
  return (
    <Flex
      flexDirection='column'
      maxW='6xl'
      marginX='auto'
      marginTop='1rem'
      paddingX={2}
      overflowX='hidden'
    >
      <Box
        overflowX='auto'
      >
        <Box
          minW='full'
          paddingY='0.5rem'
          justifyContent='center'
        >
          <Heading
            marginBottom='1.5rem'
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
