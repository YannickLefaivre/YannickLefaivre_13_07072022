import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"

import { API_BASE_URL } from "../../../config"

/**
 * @typedef {Object} ArgentBankAppState
 * @property {UserSlice} user
 */

/**
 * @typedef {Object} UserSlice
 * @property {String} status
 * @property {any} data
 * @property {any} error
 * @property {Boolean} passwordIsInvalid
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

const initialState = {
  status: "void",
  data: null,
  error: null,
  passwordIsInvalid: false,
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
        if (
          draft.status === "pending" ||
          draft.status === "updating"
        ) {
          const data = action.payload

          if (data.token) {
            draft.jwt = data.token
          }

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
      draft.passwordIsInvalid = false

      if (draft.jwt) {
        draft.jwt = null
      }
    },
  },
})

/**
 *
 * @param {User} registeredUser
 * @param {NavigationUtilities} navigationUtilities
 * @param {Boolean} keepUserLoggedIn
 *
 * @returns {import("@reduxjs/toolkit").AsyncThunkAction}
 */
export const login = (
  registeredUser,
  navigationUtilities,
  keepUserLoggedIn
) => {
  return async (dispatch, getState) => {
    const user = selectUser(getState())

    if (user.status === "pending" || user.status === "updating") {
      return
    }

    dispatch(userSlice.actions.fetching())

    try {
      const response = await axios.post(`${API_BASE_URL}user/login`, {
        email: registeredUser.email,
        password: registeredUser.password,
      })

      const data = response.data

      if (user.passwordIsInvalid === true) {
        dispatch(userSlice.actions.passwordIsInvalid(false))
      }

      if (keepUserLoggedIn) {
        localStorage.setItem("jwt", data.body.token)
      }

      dispatch(userSlice.actions.resolved(data.body))

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
        localStorage.removeItem("jwt")

        dispatch(userSlice.actions.passwordIsInvalid(true))

        dispatch(userSlice.actions.rejected(error.response.data))
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
    dispatch(userSlice.actions.fetching())

    try {
      const response = await axios.post(
        `${API_BASE_URL}user/signup`,
        newUser
      )
      const data = response.data

      dispatch(userSlice.actions.resolved(data))

      dispatch(login(newUser, navigationUtilities))
    } catch (error) {
      console.log(error)

      dispatch(userSlice.actions.rejected(error.response.data))
    }
  }
}

/**
 * @param {ArgentBankAppState} state
 *
 * @returns {UserSlice}
 */
export const selectUser = (state) => state.user

/**
 * @param {Function} dispatch
 * @param {Function} getState
 *
 * @returns A async thunk action
 */
export const fetchOrUpdateUser = async (dispatch, getState) => {
  const user = selectUser(getState())
  const jwt = user.jwt ?? localStorage.getItem("jwt")

  if (user.status === "pending" || user.status === "updating") {
    return
  }

  dispatch(userSlice.actions.fetching())

  try {
    const response = await axios({
      url: `${API_BASE_URL}user/profile`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })

    const data = response.data

    dispatch(userSlice.actions.resolved(data.body))
  } catch (error) {
    console.error(error)

    dispatch(userSlice.actions.rejected(error.response.data))
  }
}

/**
 *
 * @param {String} newFirstName
 * @param {String} newLastName
 * @returns
 */
export const updateUserProfile = (newFirstName, newLastName) => {
  return async (dispatch, getState) => {
    const user = selectUser(getState())
    const jwt = user.jwt ?? localStorage.getItem("jwt")

    if (user.status === "pending" || user.status === "updating") {
      return
    }

    dispatch(userSlice.actions.fetching())

    try {
      const body = { firstName: newFirstName, lastName: newLastName }
      const headers = {
        Authorization: `Bearer ${jwt}`,
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
