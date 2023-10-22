import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';
import restaurantSlice from './slices/restaurantSlice';
import userDataSlice  from './slices/userDataSlice';
import menuSlice from './slices/menuSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    data: userDataSlice,
    cart: cartSlice,
    restaurant: restaurantSlice,
    menu: menuSlice,
  },
});