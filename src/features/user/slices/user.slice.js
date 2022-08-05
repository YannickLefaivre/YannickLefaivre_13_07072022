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
 * @property {String} invaliUsernameErrorMessage
 * @property {String} couldNotRecoverTheData
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
 * @property {Function} navigate the navigate
 * function returned by the useNavigate hook of
 * React Router DOM
 *
 * @property {String} previousLocation
 */

/**
 * @type {UserSlice}
 */
const initialState = {
  status: "void",
  data: null,
  error: null,
  passwordIsInvalid: false,
  invaliUsernameErrorMessage: "",
  couldNotRecoverTheData: "",
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
    backendUnavailable: {
      prepare: (errorMessage) => {
        return { payload: errorMessage }
      },
      reducer: (draft, action) => {
        draft.couldNotRecoverTheData = action.payload
      },
    },
    usernameInvalid: {
      prepare: (errorMessage) => {
        return { payload: errorMessage }
      },
      reducer: (draft, action) => {
        draft.invaliUsernameErrorMessage = action.payload
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
      draft.invaliUsernameErrorMessage = ""
      draft.couldNotRecoverTheData = ""

      if (draft.jwt) {
        draft.jwt = null
      }
    },
  },
})

/**
 * @function
 *
 * @param {ArgentBankAppState} state
 *
 * @returns {UserSlice}
 */
export const selectUser = (state) => state.user

/**
 * @function
 *
 * @param {User} registeredUser
 * @param {NavigationUtilities} navigationUtilities
 * @param {Boolean} keepUserLoggedIn
 *
 * @returns An asynchronous action
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
      const { message } = error.response.data ?? error

      if (message.toLowerCase().includes("network error")) {
        dispatch(
          userSlice.actions.backendUnavailable(
            "Sorry but we had an error with our systems, try logging in later."
          )
        )

        dispatch(userSlice.actions.rejected(message))
      }

      if (message.toLowerCase().includes("user not found")) {
        dispatch(
          userSlice.actions.usernameInvalid(
            "Sorry but your username is not registered in our systems"
          )
        )

        dispatch(userSlice.actions.rejected(error.response.data))
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
 * @function
 *
 * @param {Function} dispatch
 * @param {Function} getState
 *
 * @returns An asynchronous action
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
 * @function
 *
 * @param {String} newFirstName
 * @param {String} newLastName
 *
 * @returns An asynchronous action
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
