import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  status: "void",
  data: null,
  error: null,
}

const { actions: featuresActions, reducer: featuresReducer } =
  createSlice({
    name: "features",
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
    },
  })

export const fetchOrUpdateFeatures = async (dispatch, getState) => {
  const features = selectFeatures(getState())

  if (
    features.status === "pending" ||
    features.status === "updating"
  ) {
    return
  }

  dispatch(featuresActions.fetching())

  try {
    const response = await axios.get(
      "http://localhost:3000/features.json"
    )

    const { features } = response.data

    dispatch(featuresActions.resolved(features))
  } catch (error) {
    console.error(error)

    dispatch(featuresActions.rejected(error.response.data))
  }
}

export const selectFeatures = (state) => state.features

export default featuresReducer
