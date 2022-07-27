import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { selectUser } from "../../user/slices/user.slice"

import UserData from "../../user/data-formatters/UserData"

import NavigationBar from "../../../component-library/Layout/NavigationBar"
import Footer from "../../../component-library/Layout/Footer"
import LogoutForm from "../../../component-library/Form/LogoutForm"
import Error from "../../../component-library/DataFetchingStateIndicator/Error"

import "./NotFound.style.css"

/**
 * @returns {JSX.Element}
 */
function NotFound() {
  let userData = {}

  const user = useSelector(selectUser)

  if (user.data) {
    userData = new UserData(user.data)
  }

  document.title = "Argent Bank - Home"

  return (
    <>
      <NavigationBar>
        {user.data ? (
          <>
            {userData && (
              <Link
                className="main-nav-item margin-right-0-3rem"
                to="/profile"
              >
                <i className="fa fa-user-circle main-nav-item-icon"></i>
                {userData.firstName && userData.firstName}
              </Link>
            )}

            <LogoutForm />
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </NavigationBar>

      <Error
        type="Error 404"
        styleModifier={{ errorContainer: "not-found-page-layout" }}
        message="Sorry but the page you search to acces doesn't exist."
      >
        <p className="not-found-page-redirect">
          Returns to <Link to="/">the home page</Link>
        </p>
      </Error>

      <Footer />
    </>
  )
}

export default NotFound
