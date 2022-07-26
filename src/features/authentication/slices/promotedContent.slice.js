import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  status: "void",
  data: null,
  error: null,
}

const promotedContentSlice = createSlice({
  name: "promoted-content",
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

export const selectPromotedContent = (state) => state.promotedContent

export const fetchOrUpdatePromotedContent = async (
  dispatch,
  getState
) => {
  const promotedContent = selectPromotedContent(getState())

  if (
    promotedContent.status === "pending" ||
    promotedContent.status === "updating"
  ) {
    return
  }

  dispatch(promotedContentSlice.actions.fetching())

  try {
    const response = await axios.get(
      "http://localhost:3000/promotedContent.json"
    )

    const { promotedContent } = response.data

    dispatch(promotedContentSlice.actions.resolved(promotedContent))
  } catch (error) {
    console.error(error)

    dispatch(
      promotedContentSlice.actions.rejected(error.response.data)
    )
  }
}

export default promotedContentSlice.reducer
