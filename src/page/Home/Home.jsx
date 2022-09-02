import { Carrusel } from '../../components/carrusel/Carrusel'
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

export const Home = () => {
  const { data } = useFetch()
  // console.log(data)

  return (
    <>
      <Carrusel />
      <Flex
        w="100%"
        h="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        wrap="wrap"
        gap={10}
      >
        <Text color="#a2baba" fontWeight="bold">
          Un mundo de cosas utiles y originales para la alimentacion de tu
          bebe!!
        </Text>
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
                      to={`Product/${product.id}`}
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
      </Flex>
    </>
  )
}
