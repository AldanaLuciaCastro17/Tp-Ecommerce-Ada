import {
  Heading,
  Box,
  VStack,
  Image,
  Button,
  Grid,
  Flex,
  Text,
} from '@chakra-ui/react'

import { useFetch } from '../../Hooks/useFetch'
import { NavLink } from 'react-router-dom'
import { FilterProducts } from './FilterProducts'
import { FilterPrices } from './FilterPrice'
import { FilterCategory } from './FilterCategory'

export const Product = () => {
  console.log('perro')

  const {
    data,
    page,
    setPage,
    setFilterProducts,
    setFilterCategories,
    setMinPrice,
    setMaxPrice,
  } = useFetch()
  console.log(data)

  return (
    <>
      <VStack align="stretch" w="100%">
        <FilterCategory setFilterCategories={setFilterCategories} />
        <FilterProducts setFilterProducts={setFilterProducts} />
        <FilterPrices setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
      </VStack>
      <VStack>
        {data?.data && (
          <Grid templateColumns="repeat(3, 1fr)" gap={5}>
            {data.data.map((product) => (
              <Flex
                w="400px"
                padding="4%"
                justifyContent="space-between"
                borderBottom="1px solid #a2baba"
                borderRadius="10px"
                bg="#a2baba"
                px={3}
                key={product.id}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Heading fontSize="20px" px={3} color="white">
                    {product.attributes.title}
                  </Heading>

                  <Text mt="30px" px={3} color="white" fontSize="17px">
                    Precio: ${product.attributes.price}
                  </Text>

                  <Button
                    as={NavLink}
                    to={`${product.id}`}
                    margin="15px"
                    _hover={{ bg: 'orange' }}
                  >
                    + Info
                  </Button>
                </Box>

                <Image
                  w="200px"
                  borderRadius="10px"
                  src={product.attributes.image.data.attributes.url}
                />
              </Flex>
            ))}
          </Grid>
        )}
      </VStack>

      <Box display="flex" justifyContent="center" padding="30px">
        <Button
          mr="20px"
          ml="15px"
          bg="#a2baba"
          color="white"
          _hover={{ bg: 'orange' }}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>
        <Button
          mr="20px"
          ml="15px"
          bg="#a2baba"
          color="white"
          _hover={{ bg: 'orange' }}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </>
  )
}
