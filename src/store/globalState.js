import { configureStore } from "@reduxjs/toolkit"

import userReducer from "../features/user/slices/user.slice"
import accountsReducer from "../features/user/slices/accounts.slice"
import promotedContentReducer from "../features/authentication/slices/promotedContent.slice"
import featuresReducer from "../features/authentication/slices/features.slice"

const store = configureStore({
  reducer: {
    promotedContent: promotedContentReducer,
    features: featuresReducer,
    user: userReducer,
    accounts: accountsReducer,
  },
})

export default store
