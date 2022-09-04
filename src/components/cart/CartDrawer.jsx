import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Text,
  Flex,
  Image,
} from '@chakra-ui/react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  removeFromCart,
  increaseToQuantity,
  decreaseToQuantity,
} from '../../redux/Slice/cartSlice'
import { RiShoppingCartLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'

export const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const dispatch = useDispatch()
  const { cartsItem } = useSelector((state) => state.cart)
  const cart = useSelector((state) => state.cart)

  const totalCart = () => {
    let cartTotalQuantity = 0
    let cartTotalAmout = 0
    cart.cartsItem.forEach((product) => {
      cartTotalQuantity += product.cartQuantity
      cartTotalAmout += product.attributes.price * product.cartQuantity
    })
    return { cartTotalQuantity, cartTotalAmout }
  }

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        <RiShoppingCartLine color="#a2baba" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="#a2baba" color="white">
            Mi carrito
          </DrawerHeader>
          <DrawerBody bg="#a2baba" color="white">
            {cart.cartsItem.length === 0 ? (
              <Flex
                w="100%"
                justifyContent="center"
                alignItems="center"
                wrap="wrap"
                gap={5}
              >
                <Text color="white">Tu carrito esta vacio</Text>
                <Button
                  as={NavLink}
                  bg="orange"
                  _hover={{ bg: '#a2baba' }}
                  to="/"
                >
                  Volver a Inicio
                </Button>
              </Flex>
            ) : (
              <Flex
                w="100%"
                flexDirection="column"
                justifyContent="center"
                alignItems="space-between"
                wrap="wrap"
                gap={5}
              >
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
                      flexDirection="column"
                      w="100%"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text
                        color="white"
                        m={1}
                        textAlign="center"
                        fontWeight="bold"
                      >
                        {product.attributes.title}
                      </Text>

                      <Text color="white" m={1} textAlign="center">
                        Precio: ${product.attributes.price}
                      </Text>
                      <Text>Cantidad: {product.cartQuantity}</Text>

                      <Flex alignItems="center" gap={1} m="10px">
                        <Button
                          bg="orange"
                          m={1}
                          disabled={product.cartQuantity === 1}
                          onClick={() =>
                            dispatch(decreaseToQuantity(product.id))
                          }
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
                          onClick={() =>
                            dispatch(increaseToQuantity(product.id))
                          }
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
                  <Text fontWeight="bold">
                    Total: $ {totalCart().cartTotalAmout}
                  </Text>
                  <Button bg="orange" as={NavLink} to="/orders">
                    Ir al carrito
                  </Button>
                </Flex>
              </Flex>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
