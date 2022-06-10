import { Select } from "@chakra-ui/react";

export const SelectProvinces = ({ loading, data, refetch, handleSelectProvince }) => {

  if (!loading && data) {
    refetch();
  }

  return (
    <Select
      variant='outline'
      placeholder='Provincia'
      color='gray.400'
      fontWeight='500'
      borderRadius='lg'
      w='full'
      flex='none'
      _focus={{
        boxShadow: 'none',
      }}
      _hover={{
        borderColor: 'inherit',
      }}
      onChange={handleSelectProvince}
    >
      {
        data && (
          data.map(({ idReference, name }) => (
            <option key={idReference} value={idReference}>{name}</option>
          ))
        )
      }
    </Select>
  )
}
