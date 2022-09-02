import { useSelector } from 'react-redux'
import { Box, Text } from '@chakra-ui/react'

export const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <Box h="100vh">
      <Text fontWeight="bold" color="#a2baba">
        Hola {user.username}!!!
      </Text>
      <Text>Bienvenidx a nuestra web</Text>
    </Box>
  )
}
