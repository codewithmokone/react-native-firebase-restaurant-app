import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  menu: null,
  menuLoading: false
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.data = action.payload;
      // console.log("User Details Slice: ", state.data)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMenu } = menuSlice.actions

export default menuSlice.reducer