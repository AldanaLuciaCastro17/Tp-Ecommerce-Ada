import { HStack, Select } from '@chakra-ui/react'
import React from 'react'

export const FilterCategory = ({ setFilterCategories }) => {
  return (
    <HStack
      as="form"
      display="flex"
      w="50%"
      justify="center"
      alignItems="center"
      className="productSearch"
    >
      <Select
        type="text"
        color="#a2baba"
        onChange={(e) => setFilterCategories(e.target.value)}
      >
        <option value="Elegi una categoria..." disabled>
          Elegi una categoria...
        </option>
        <option value="Alimentacion del bebe">Alimentacion del bebe</option>
        <option value="Accesorios para bebe">Accesorios para bebe</option>
      </Select>
    </HStack>
  )
}
