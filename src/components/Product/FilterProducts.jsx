import { FormControl, Input } from '@chakra-ui/react'

export const FilterProducts = ({ setFilterProducts }) => {
  return (
    <>
      <FormControl>
        <Input
          w="300px"
          mt="15px"
          placeholder="Buscar"
          onChange={(e) => setFilterProducts(e.target.value)}
        />
      </FormControl>
    </>
  )
}
