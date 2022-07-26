import { configureStore } from "@reduxjs/toolkit"

import authenticationReducer from "../features/authentication/slices/authentication.slice"

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
})

export default store
