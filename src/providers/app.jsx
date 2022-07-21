import * as React from "react"
import PropTypes from "prop-types"
import { BrowserRouter } from "react-router-dom"

/**
 *
 * @param {React.ReactNode} children The application router
 *
 * @returns {JSX.Element}
 */
function AppProvider({ children }) {
  return <BrowserRouter>{children}</BrowserRouter>
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppProvider
