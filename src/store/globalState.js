import { configureStore } from "@reduxjs/toolkit"

import authenticationReducer from "../features/authentication/slices/authentication.slice"
import userReducer from "../features/user/slices/user.slice"
import accountsReducer from "../features/user/slices/accounts.slice"

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    user: userReducer,
    accounts: accountsReducer,
  },
})

export default store
