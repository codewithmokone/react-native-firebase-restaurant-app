import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetails: null,
  userLoading: false
}

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.data = action.payload;
      // console.log("User Details Slice: ", state.data)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = userDetailsSlice.actions

export default userDetailsSlice.reducer