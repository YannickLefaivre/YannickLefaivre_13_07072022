import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import FormatString from "../../../utils/FormatString"
import NavigationBar from "../../../component-library/Layout/NavigationBar"
import Footer from "../../../component-library/Layout/Footer"
import { login, selectUser } from "../slices/user.slice"
import "./Login.style.css"

/**
 * @returns {JSX.Element}
 */
function Login() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const user = useSelector(selectUser)

  /**
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

    const email = document.getElementById("username").value
    const password = document.getElementById("password").value
    const rememberMeOption = document.getElementById("remember-me")

    const getFirstName = () => email.split("@")[0]
    const getLastName = () => email.split("@")[1].split(".")[0]

    const keepUserLoggedIn =
      rememberMeOption.checked === true || false

    const user = {
      email,
      password,
    }

    dispatch(
      login(user, { navigate, previousLocation }, keepUserLoggedIn)
    )

    return
  }

  document.title = "Argent Bank - Login Page"

  return (
    <>
      <NavigationBar appTitle="Argent Bank">
        <Link className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i> Sign In
        </Link>
      </NavigationBar>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {user.invaliUsernameErrorMessage && (
            <p>{user.invaliUsernameErrorMessage}</p>
          )}
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
                type="email"
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
                  user.passwordIsInvalid ? "" : " hide"
                }`}
              >
                {user.passwordIsInvalid
                  ? "Le mot de passe que vous avez renseigné ne correspond pas au nom d'utilisateur entrer."
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
