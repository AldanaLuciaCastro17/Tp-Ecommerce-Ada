import { FormControl, Input } from '@chakra-ui/react'

export const FilterProducts = ({ setFilterProducts }) => {
  return (
    <>
      <FormControl>
        <Input
          textAlign="center"
          w="40%"
          placeholder="Buscar"
          onChange={(e) => setFilterProducts(e.target.value)}
        />
      </FormControl>
    </>
  )
}
