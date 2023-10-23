import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
        state.items = [...state.items, action.payload]
    },
    removeFromCart: (state, action) => {
       let newCart = [...state.items];
       let itemIndex = state.items.findIndex(item => item.id==action.payload.id);
       if(itemIndex >= 0){
        newCart.splice(itemIndex,1);
       }else{
        console.log("Can't remove the item that is not added to cart!")
       }
       state.items = newCart;
    },
    emptyCart: (state) => {
        state.items = [];
    },
  },
})

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectCartItems = state => state.cart.items;

export const selectCartItemsById = (state, id) => state.cart.items.filter(item => item.id == id);

export const selectCartItemsByIdMemoized = createSelector(
  (state) => state.cart, // Input selector
  (_, itemId) => itemId, // Additional parameters, in this case, the itemId
  (cart, itemId) => {
    // Your selector logic here
    return cart.items.filter(item => item.id === itemId);
  }
);

export const selectCartTotal = state => state.cart.items.reduce((total, item) => total = total+item.price, 0)

export default cartSlice.reducer