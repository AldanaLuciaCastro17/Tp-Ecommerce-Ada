import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartsItem: [],
  // cartTotalQuantity: 0,
  // cartTotalAmout: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartsItem.findIndex(
        (item) => item.id === action.payload.id
      )
      if (itemIndex >= 0) {
        state.cartsItem[itemIndex].cartQuantity += 1
      } else {
        const itemProduct = { ...action.payload, cartQuantity: 1 }
        state.cartsItem.push(itemProduct)
      }
    },
    removeFromCart(state, action) {
      const removeItem = state.cartsItem.filter(
        (item) => item.id !== action.payload
      )

      state.cartsItem = removeItem
    },
    increaseToQuantity: (state, action) => {
      const addItem = state.cartsItem.find((item) => item.id === action.payload)
      addItem.cartQuantity++
    },
    decreaseToQuantity: (state, action) => {
      const lessItem = state.cartsItem.find(
        (item) => item.id === action.payload
      )
      if (lessItem.cartQuantity === 1) {
        lessItem.cartQuantity = 1
      } else {
        lessItem.cartQuantity--
      }
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseToQuantity,
  decreaseToQuantity,
} = cartSlice.actions
export default cartSlice.reducer
