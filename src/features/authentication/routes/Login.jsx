import NavigationBar from "../../../components/Layout/NavigationBar"
import Footer from "../../../components/Layout/Footer"
import "./Login.style.css"
/**
 *
 * @returns {JSX.Element}
 */
function Login() {
  document.title = "Argent Bank - Login"

  return (
    <>
      <NavigationBar
        pageTitle="Argent Bank"
        authenticationButtonLabel="Sign In"
      />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form id="sign-in-form" method="GET">
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button class="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Login