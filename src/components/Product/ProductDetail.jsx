import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Image,
  Heading,
  Text,
  Button,
  HStack,
  Container,
  Spinner,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/Slice/cartSlice'

export const ProductDetail = () => {
  const [product, setProduct] = useState()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:1337/api/products/${id}?populate=image`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setProduct(data)
        setIsLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    dispatch(addToCart(product?.data))
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <HStack>
          <Container>
            <Image
              borderRadius="10px"
              src={product.data.attributes.image.data.attributes.url}
            />
          </Container>

          <Container>
            <Heading mt="10px" color="#a2baba">
              {product.data.attributes.title}
            </Heading>
            <Text mt="10px">{product.data.attributes.description}</Text>
            <Text mt="10px" fontSize="17px">
              Precio ${product.data.attributes.price}
            </Text>

            <Button
              mt="10px"
              color="white"
              bg="#a2baba"
              _hover={{ bg: 'orange' }}
              onClick={() => handleAddToCart()}
            >
              Comprar
            </Button>
          </Container>
        </HStack>
      )}
    </>
  )
}
