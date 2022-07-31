import * as React from "react"
import PropTypes from "prop-types"
import { BrowserRouter } from "react-router-dom"
import { Provider as ReduxStoreProvider } from "react-redux"

import store from "../store/globalState"

/**
 * @param {React.ReactNode} children The application router
 *
 * @returns {JSX.Element}
 */
function AppProvider({ children }) {
  return (
    <ReduxStoreProvider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </ReduxStoreProvider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppProvider
