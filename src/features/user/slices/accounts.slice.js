import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"

import { selectAuthentication } from "../../authentication/slices/authentication.slice"

const initialState = {
  status: "void",
  data: null,
  error: null,
}

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    fetching: (draft, action) => {
      if (draft.status === "void" || draft.status === "updating") {
        draft.status = "pending"
        return
      }

      if (draft.status === "rejected") {
        draft.error = null
        draft.status = "pending"
        return
      }

      if (draft.status === "resolved") {
        draft.status = "updating"
        return
      }
    },
    resolved: {
      prepare: (data) => {
        return { payload: data }
      },
      reducer: (draft, action) => {
        if (
          draft.status === "pending" ||
          draft.status === "updating"
        ) {
          draft.data = action.payload
          draft.status = "resolved"
          return
        }
      },
    },
    rejected: {
      prepare: (error) => {
        return { payload: error }
      },
      reducer: (draft, action) => {
        if (
          draft.status === "pending" ||
          draft.status === "updating"
        ) {
          draft.status = "rejected"
          draft.data = null
          draft.error = action.payload
          return
        }
      },
    },
    signout: (draft, action) => {
      draft.data = null
    },
  },
})

export const selectAccounts = (state) => state.accounts

export const fetchOrUpdateAccounts = async (dispatch, getState) => {
  const authentication = selectAuthentication(getState())
  const accounts = selectAccounts(getState())

  if (authentication.jsonWebToken === undefined) {
    return
  }

  if (
    accounts.status === "pending" ||
    accounts.status === "updating"
  ) {
    return
  }

  dispatch(accountsSlice.actions.fetching())

  try {
    const response = await axios.get(
      "http://localhost:3000/accounts.json"
    )

    const { accounts } = response.data

    dispatch(accountsSlice.actions.resolved(accounts))
  } catch (error) {
    console.error(error)

    dispatch(accountsSlice.actions.rejected(error.response.data))
  }
}

export const { signout } = accountsSlice.actions

export default accountsSlice.reducer
