import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';
import restaurantSlice from './slices/restaurantSlice';
import userDetailsSlice from './slices/userDetailsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    userDetails: userDetailsSlice,
    cart: cartSlice,
    restaurant: restaurantSlice,
  },
});