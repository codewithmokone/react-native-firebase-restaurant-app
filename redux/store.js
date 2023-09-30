import { configureStore } from '@reduxjs/toolkit';
import user from './slices/userSlice';
import cartSlice from './slices/cartSlice';
import restaurantSlice from './slices/restaurantSlice';

export const store = configureStore({
  reducer: {
    user,
    cart: cartSlice,
    restaurant: restaurantSlice,
  },
})