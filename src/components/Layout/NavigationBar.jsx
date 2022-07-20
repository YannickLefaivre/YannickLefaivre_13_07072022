import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import argentBankLogo from "../../assets/argentBankLogo.png"
import "./NavigationBar.style.css"

/**
 *
 * @param {Object} props
 * @param {String} props.pageTitle
 * @param {String} props.authenticationButtonLabel
 *
 * @returns {JSX.Element}
 */
function NavigationBar({ pageTitle, authenticationButtonLabel }) {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">{pageTitle}</h1>
      </Link>
      <div>
        <a className="main-nav-item" href="./sign-in.html">
          <i className="fa fa-user-circle"></i>
          {authenticationButtonLabel}
        </a>
      </div>
    </nav>
  )
}

NavigationBar.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  authenticationButtonLabel: PropTypes.string.isRequired,
}

NavigationBar.defaultProps = {
  pageTitle: "Page title",
  authenticationButtonLabel: "Login or Logout button",
}

export default NavigationBar
