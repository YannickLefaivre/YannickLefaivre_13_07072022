import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import NavigationBar from "../../../component-library/Layout/NavigationBar"
import Footer from "../../../component-library/Layout/Footer"

import { login } from "../slices/authentication.slice"

import "./Login.style.css"

/**
 * @returns {JSX.Element}
 */
function Login() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const passwordIsInvalid = localStorage.getItem("passwordIsInvalid")

  const validateUsername = (username) => {
    const usernameRegex = /^[a-z]+\s[a-z]+$/i

    const hasValidUsername = usernameRegex.test(username)

    const usernameErrorMessage = document.getElementById(
      "username-error-message"
    )

    if (hasValidUsername) {
      usernameErrorMessage.classList.add("hide")

      return true
    } else {
      usernameErrorMessage.textContent = `Your first name must be separated from your last name by whitespace`

      usernameErrorMessage.classList.remove("hide")

      return false
    }
  }

  /**
   *
   * @param {SubmitEvent} event
   * @param {import("@reduxjs/toolkit").Dispatch} dispatch
   * @param {import("react-router-dom").NavigateFunction} navigate
   * @param {import("react-router-dom").Location} location
   *
   * @returns {VoidFunction}
   */
  const handleSubmit = (event, dispatch, navigate, location) => {
    event.preventDefault()

    const pathname = location.state?.from?.pathname

    const previousLocation =
      pathname === "/profile" ? pathname : "/profile"

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const isUsernameValid = validateUsername(username)

    const getFirstName = () => username.split(" ")[0]
    const getLastName = () => username.split(" ")[1]

    let user = {}

    if (isUsernameValid) {
      user = {
        email: `${getFirstName().toLowerCase()}@${getLastName().toLowerCase()}.com`,
        password,
        firstName: getFirstName(),
        lastName: getLastName(),
      }

      dispatch(login(user, { navigate, previousLocation }))

      return
    } else {
      return
    }
  }

  document.title = "Argent Bank - Login"

  return (
    <>
      <NavigationBar appTitle="Argent Bank">
        <Link className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </NavigationBar>

      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>

          <form
            id="sign-in-form"
            method="POST"
            onSubmit={(event) =>
              handleSubmit(event, dispatch, navigate, location)
            }
          >
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required
              />
              <p
                id="username-error-message"
                className="error-message hide"
              ></p>
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
              />
              <p
                id="password-error-message"
                className={`error-message${
                  passwordIsInvalid && passwordIsInvalid === "true"
                    ? ""
                    : " hide"
                }`}
              >
                {passwordIsInvalid && passwordIsInvalid === "true"
                  ? "Le mot de passe que vous aviez renseigné ne correspond pas au nom d'utilisateur entrer."
                  : ""}
              </p>
            </div>

            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Login
