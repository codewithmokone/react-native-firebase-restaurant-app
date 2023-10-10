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
      state.user = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = userDetailsSlice.actions

export default userDetailsSlice.reducer