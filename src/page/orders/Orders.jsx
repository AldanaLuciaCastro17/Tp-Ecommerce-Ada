import {
  removeFromCart,
  increaseToQuantity,
  decreaseToQuantity,
} from '../../redux/Slice/cartSlice'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Flex, Image, Button, Text, useToast } from '@chakra-ui/react'

import { BsTrash } from 'react-icons/bs'

export const Orders = () => {
  const dispatch = useDispatch()
  const { cartsItem } = useSelector((state) => state.cart)
  const cart = useSelector((state) => state.cart)
  const toast = useToast()

  const totalCart = () => {
    let cartTotalQuantity = 0
    let cartTotalAmout = 0
    cart.cartsItem.forEach((product) => {
      cartTotalQuantity += product.cartQuantity
      cartTotalAmout += product.attributes.price * product.cartQuantity
    })
    return { cartTotalQuantity, cartTotalAmout }
  }

  const postOrders = async () => {
    const response = await fetch(`http://localhost:1337/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { Item: cart.cartsItem } }),
    })
    const dataOrder = await response.json()
    console.log(dataOrder)
    toast({
      title: 'Su orden fue enviada con exito!',

      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <>
      {cartsItem.map((product) => (
        <Flex
          key={product.id}
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image
            src={product.attributes.image.data.attributes.url}
            w="70px"
            borderRadius="5px"
          />

          <Flex
            key={product.id}
            flexDirection="row"
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            m="40px"
          >
            <Text m={1} textAlign="center" fontWeight="bold" color="#a2baba">
              {product.attributes.title}
            </Text>

            <Text m={1} textAlign="center">
              Precio: ${product.attributes.price}
            </Text>
            <Text>Cantidad: {product.cartQuantity}</Text>

            <Flex alignItems="center" gap={1} m="10px">
              <Button
                bg="orange"
                m={1}
                disabled={product.cartQuantity === 1}
                onClick={() => dispatch(decreaseToQuantity(product.id))}
              >
                -
              </Button>

              <Button
                bg="orange"
                m={1}
                onClick={() => dispatch(removeFromCart(product.id))}
              >
                <BsTrash color="white" />
              </Button>
              <Button
                bg="orange"
                m={1}
                onClick={() => dispatch(increaseToQuantity(product.id))}
              >
                +
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ))}
      <Flex
        w="100%"
        flexDirection="column"
        justifyContent="center"
        alignItems="space-between"
        wrap="wrap"
        gap={5}
      >
        <Text fontWeight="bold">Total: $ {totalCart().cartTotalAmout}</Text>
      </Flex>
      <Button onClick={postOrders}>Comprar</Button>
    </>
  )
}
// `http://localhost:1337/api/users/${id}?populate[0]=orders`
