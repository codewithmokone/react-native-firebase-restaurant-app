import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  // user: {id: 1},
  userLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      // console.log("User Info slice: ", state.user)
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    setCardDetails: (state, action) => {
      state.user = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser, setUser, setUserLoading, setCardDetails, setUserInfo } = userSlice.actions

export default userSlice.reducer