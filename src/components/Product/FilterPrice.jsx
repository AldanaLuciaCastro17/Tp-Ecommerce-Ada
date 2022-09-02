import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderThumb,
  RangeSliderFilledTrack,
  HStack,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'

export const FilterPrices = ({ setMinPrice, setMaxPrice }) => {
  const [min, setMin] = useState(100)
  const [max, setMax] = useState(6000)
  return (
    <>
      <HStack
        as="form"
        display="flex"
        w="20%"
        justify="center"
        alignItems="center"
        className="productSearch"
      >
        <Text color="#a2baba">{min}</Text>
        <RangeSlider
          aria-label={['min', 'max']}
          colorScheme="#a2baba"
          defaultValue={[100, 6000]}
          max={6000}
          onChangeEnd={(value) => {
            setMin(value[0])
            setMax(value[1])
          }}
          onChange={(value) => {
            setMinPrice(value[0])
            setMaxPrice(value[1])
          }}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <Text color="#a2baba">{max}</Text>
      </HStack>
    </>
  )
}
