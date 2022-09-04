import { React, useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Box, Image } from '@chakra-ui/react'

export const Carrousel = () => {
  const [image, setImage] = useState([])

  useEffect(() => {
    fetch('http://localhost:1337/api/carousels?populate=image')
      .then((res) => res.json())
      .then((data) => setImage(data.data))
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <>
      <Box p="10px" w="100%">
        <Slider {...settings}>
          {image &&
            image.map((image) => (
              <Box key={image.id}>
                <Image
                  w="100%"
                  display="flex"
                  h="80%"
                  src={image.attributes.image.data.attributes.url}
                />
              </Box>
            ))}
        </Slider>
      </Box>
    </>
  )
}
