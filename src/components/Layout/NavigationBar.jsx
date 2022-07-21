import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import argentBankLogo from "../../assets/argentBankLogo.png"

import "./NavigationBar.style.css"

/**
 * @param {Object} props
 * @param {String} props.appTitle
 * @param {React.ReactNode} [props.children=null] Navigation links and/or user menu
 *
 * @returns {JSX.Element}
 */
function NavigationBar({ appTitle, children }) {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">{appTitle}</h1>
      </Link>
      <div>{children}</div>
    </nav>
  )
}

NavigationBar.propTypes = {
  appTitle: PropTypes.string.isRequired,
  children: PropTypes.node,
}

NavigationBar.defaultProps = {
  appTitle: "Page title",
  children: null,
}

export default NavigationBar
