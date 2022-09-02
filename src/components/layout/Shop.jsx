import { Header } from './Header'
// import { Footer } from './Footer'
import { Flex } from '@chakra-ui/react'

const Shop = ({ children }) => {
  return (
    <div>
      <Header />
      <Flex
        w="100%"
        h="100%"
        p={10}
        flexDirection="row"
        alignItems="center"
        justify="center"
        flexWrap="wrap"
      >
        {children}
      </Flex>
    </div>
  )
}

export default Shop
