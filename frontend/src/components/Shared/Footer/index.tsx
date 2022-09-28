import { Flex, Text } from "@chakra-ui/react"

export const Footer = () => {
  return (
    <Flex
      w='full'
      p={10}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        w="full"
        as="footer"
        flexDir={{ base: "column", sm: "row" }}
        align="center"
        justify="center"
        px="6"
        py="4"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
      >
        <Text
          py={{ base: "2", sm: "0" }}
          color="gray.800"
          _dark={{ color: "white" }}
        >
          © 2022 Vocacción. Todos los derechos reservados
        </Text>
      </Flex>
    </Flex>
  )
}
