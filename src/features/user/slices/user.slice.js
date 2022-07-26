import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"

import { API_BASE_URL } from "../../../config"

import { selectAuthentication } from "../../authentication/slices/authentication.slice"

const initialState = {
  status: "void",
  data: null,
  error: null,
}

const userSlice = createSlice({
  name: "user",
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
        const data = action.payload
        if (
          draft.status === "pending" ||
          draft.status === "updating"
        ) {
          draft.data = data.body ? data.body : data
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

export const selectUser = (state) => state.user

export const fetchOrUpdateUser = async (dispatch, getState) => {
  const authentication = selectAuthentication(getState())
  const user = selectUser(getState())

  if (authentication.jsonWebToken === undefined) {
    return
  }

  if (user.status === "pending" || user.status === "updating") {
    return
  }

  dispatch(userSlice.actions.fetching())

  try {
    const response = await axios({
      url: `${API_BASE_URL}user/profile`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${authentication.jsonWebToken}`,
      },
    })

    const data = response.data

    dispatch(userSlice.actions.resolved(data.body))
  } catch (error) {
    console.error(error)

    dispatch(userSlice.actions.rejected(error.response.data))
  }
}

export const updateUserProfile = (newFirstName, newLastName) => {
  return async (dispatch, getState) => {
    const authentication = selectAuthentication(getState())
    const user = selectUser(getState())

    if (authentication.jsonWebToken === undefined) {
      return
    }

    if (user.status === "pending" || user.status === "updating") {
      return
    }

    dispatch(userSlice.actions.fetching())

    try {
      const body = { firstName: newFirstName, lastName: newLastName }
      const headers = {
        Authorization: `Bearer ${authentication.jsonWebToken}`,
      }

      const response = await axios.put(
        `${API_BASE_URL}user/profile`,
        body,
        { headers }
      )

      const data = response.data

      dispatch(userSlice.actions.resolved(data))
    } catch (error) {
      console.error(error)

      dispatch(userSlice.actions.rejected(error.response.data))
    }
  }
}

export const { signout } = userSlice.actions

export default userSlice.reducer
