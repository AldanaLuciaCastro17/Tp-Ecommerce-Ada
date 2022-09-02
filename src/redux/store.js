import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './slice/authSlice'
import cartReducer from './Slice/cartSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    cart: cartReducer,
  },
})
