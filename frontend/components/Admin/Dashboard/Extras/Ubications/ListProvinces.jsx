import { Button, HStack, Text } from "@chakra-ui/react";

export const ListProvinces = ({ loading, data, refetch }) => {

  if (!loading && data) {
    refetch();
  }

  return (
    <>
      {
        loading ? (
          <Text>Cargando...</Text>
        ) : (
          data && (
            data.length > 0 ? (
              data.map(({ idReference, name }) => (
                <Button key={idReference} bg='blackAlpha.400' w='full' pointerEvents='none'>
                  <HStack alignItems='center' justifyContent='space-between' w='full'>
                    <Text key={idReference}>{name}</Text>
                  </HStack>
                </Button>
              ))
            ) : (
              <Text color='gray.500'>No hay datos para mostrar.</Text>
            )
          )
        )
      }
    </>
  )
}
