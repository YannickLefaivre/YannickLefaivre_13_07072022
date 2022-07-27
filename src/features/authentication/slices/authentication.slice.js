import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"

import { API_BASE_URL } from "../../../config"

/**
 * @typedef {Object} ArgentBankAppState
 * @property {AuthenticationState} authentication
 */

/**
 * @typedef {Object} AuthenticationState
 * @property {String} status
 * @property {any} data
 * @property {Error} error
 * @property {Boolean} passwordIsInvalid
 * @property {String} jwt
 */

/**
 * @typedef {Object} User
 * @property {String} email
 * @property {String} password
 * @property {String} firstName
 * @property {String} lastName
 */

/**
 * @typedef {Object} NavigationUtilities
 * @property {import("react-router-dom").NavigateFunction} navigate
 * @property {String} previousLocation
 */

/**
 * @type {AuthenticationState}
 */
const initialState = {
  status: "void",
  data: null,
  error: null,
  passwordIsInvalid: false,
  jwt: "",
}

const authenticationSlice = createSlice({
  name: "authentication",
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
        const { body } = action.payload

        if (
          draft.status === "pending" ||
          draft.status === "updating"
        ) {
          if (body.token !== undefined) {
            draft.jsonWebToken = body.token
          } else {
            draft.data = body
          }

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
    passwordIsInvalid: {
      prepare: (isUserPasswordValid) => {
        return { payload: isUserPasswordValid }
      },
      reducer: (draft, action) => {
        draft.passwordIsInvalid = action.payload
      },
    },
    signout: (draft, action) => {
      draft.data = null
      draft.jsonWebToken = ""
    },
  },
})

/**
 * @param {ArgentBankAppState} state
 *
 * @returns {AuthenticationState}
 */
export const selectAuthentication = (state) => state.authentication

/**
 *
 * @param {User} registeredUser
 * @param {NavigationUtilities} navigationUtilities
 *
 * @returns {import("@reduxjs/toolkit").AsyncThunkAction}
 */
export const login = (registeredUser, navigationUtilities) => {
  return async (dispatch, getState) => {
    const authentication = selectAuthentication(getState())

    if (
      authentication.status === "pending" ||
      authentication.status === "updating"
    ) {
      return
    }

    dispatch(authenticationSlice.actions.fetching())

    try {
      const response = await axios.post(`${API_BASE_URL}user/login`, {
        email: registeredUser.email,
        password: registeredUser.password,
      })

      const data = response.data

      if (authentication.passwordIsInvalid === true) {
        dispatch(authenticationSlice.actions.passwordIsInvalid(false))
      }

      dispatch(authenticationSlice.actions.resolved(data))

      navigationUtilities.navigate(
        navigationUtilities.previousLocation,
        { replace: true }
      )
    } catch (error) {
      const { message } = error.response.data

      if (message.toLowerCase().includes("user not found")) {
        dispatch(signup(registeredUser, navigationUtilities))
      }

      if (message.toLowerCase().includes("password is invalid")) {
        dispatch(authenticationSlice.actions.passwordIsInvalid(true))

        dispatch(
          authenticationSlice.actions.rejected(error.response.data)
        )
      }
    }
  }
}

/**
 * @param {User} newUser
 * @param {NavigationUtilities} navigationUtilities
 *
 * @returns {AsyncThunkAction}
 */
export const signup = (newUser, navigationUtilities) => {
  return async (dispatch, getState) => {
    dispatch(authenticationSlice.actions.fetching())

    try {
      const response = await axios.post(
        `${API_BASE_URL}user/signup`,
        newUser
      )
      const data = response.data

      dispatch(authenticationSlice.actions.resolved(data))

      dispatch(login(newUser, navigationUtilities))
    } catch (error) {
      console.log(error)

      dispatch(
        authenticationSlice.actions.rejected(error.response.data)
      )
    }
  }
}

export const { signout } = authenticationSlice.actions

export default authenticationSlice.reducer
