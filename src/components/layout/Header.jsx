import {
  HStack,
  Box,
  Flex,
  Image,
  Link,
  Icon,
  useColorMode,
  Button,
} from '@chakra-ui/react'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { RiSunLine, RiMoonLine, RiUserHeartFill } from 'react-icons/ri'
import { ModalAuth } from '../../page/auth/ModalAuth'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/Slice/authSlice'
import { CartDrawer } from '../cart/CartDrawer'
import { BiLogOutCircle } from 'react-icons/bi'

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(logout())
  }

  return (
    <>
      <HStack>
        <Box w="100%" borderBottom="1px solid #a2baba" px={5}>
          <Flex as="nav" alignItems={'center'} justify="space-between">
            <Box>
              <NavLink to="/">
                <Image w={140} m={2} src={logo} alt="logo" />
              </NavLink>
            </Box>
            <Flex align="center" justify="space-between" gap={5} padding={5}>
              <Link color="#a2baba" as={NavLink} to="/">
                Inicio
              </Link>
              <Link color="#a2baba" as={NavLink} to="/Product">
                Producto |
              </Link>

              <Icon
                as={colorMode === 'dark' ? RiSunLine : RiMoonLine}
                onClick={toggleColorMode}
                w={4}
                h={4}
                role="button"
                color="#a2baba"
              />

              <CartDrawer />

              {user ? (
                <Flex gap={2}>
                  <Button
                    onClick={handleClick}
                    bg="#a2baba"
                    color="white"
                    _hover={{ bg: 'orange' }}
                  >
                    <BiLogOutCircle /> Cerrar sesion
                  </Button>
                  <Button
                    as={NavLink}
                    to="/profile"
                    bg="#a2baba"
                    color="white"
                    _hover={{ bg: 'orange' }}
                  >
                    <RiUserHeartFill /> Perfil
                  </Button>
                </Flex>
              ) : (
                <ModalAuth />
              )}
            </Flex>
          </Flex>
        </Box>
      </HStack>
    </>
  )
}
