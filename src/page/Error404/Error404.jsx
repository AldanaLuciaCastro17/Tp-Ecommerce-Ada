import { Button, Heading, Text, VStack } from '@chakra-ui/react'
import { GiRobotAntennas } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'

export const Error404 = () => {
  return (
    <VStack m="10%" h="100%">
      <GiRobotAntennas size="50px" color="#a2baba" />
      <Heading color="red.400">404</Heading>
      <Text color="#a2baba">
        Lo siento, la página que estas buscando no existe
      </Text>
      <Button bg="red.400" color="white">
        <NavLink to="/">Volver</NavLink>
      </Button>
    </VStack>
  )
}
