import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetails: null,
  userLoading: false
}

export const userDataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
      // console.log("User Details Slice: ", state.data)
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserData } = userDataSlice.actions

export default userDataSlice.reducer