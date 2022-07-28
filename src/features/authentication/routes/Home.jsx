import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  fetchOrUpdateUser,
  selectUser,
} from "../../user/slices/user.slice"
import UserData from "../../user/data-formatters/UserData"
import NavigationBar from "../../../component-library/Layout/NavigationBar"
import Footer from "../../../component-library/Layout/Footer"
import LogoutForm from "../../../component-library/Form/LogoutForm"
import Loader from "../../../component-library/DataFetchingStateIndicator/Loader"
import Error from "../../../component-library/DataFetchingStateIndicator/Error"
import chatIcon from "../assets/icon-chat.png"
import moneyIcon from "../assets/icon-money.png"
import securityIcon from "../assets/icon-security.png"
import "./Home.style.css"

/**
 * Displays a home page with a header, a hero,
 * the presentation of the advantages provided by
 * the company's services and a footer with the
 * copyright.
 *
 * @returns {JSX.Element}
 */
function Home() {
  let userData = {}

  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  const isLoading =
    user.status === "pending" || user.status === "updating"

  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    if (jwt) {
      dispatch(fetchOrUpdateUser)
    }
  }, [dispatch, jwt])

  if (user.data) {
    userData = new UserData(user.data)
  }

  if (
    user.status === "rejected" &&
    user.passwordIsInvalid === false
  ) {
    return <Error type="Erreur" />
  }

  document.title = "Argent Bank - Home"

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <NavigationBar appTitle="Argent Bank">
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
          <main>
            <div className="hero">
              <section className="hero-content">
                <h2 className="sr-only">Promoted Content</h2>
                <p className="subtitle">No fees.</p>
                <p className="subtitle">No minimum deposit.</p>
                <p className="subtitle">High interest rates.</p>
                <p className="text">
                  Open a savings account with Argent Bank today!
                </p>
              </section>
            </div>
            <section className="features">
              <h2 className="sr-only">Features</h2>
              <div className="feature-item">
                <img
                  src={chatIcon}
                  alt="Chat Icon"
                  className="feature-icon"
                />
                <h3 className="feature-item-title">
                  You are our #1 priority
                </h3>
                <p>
                  Need to talk to a representative? You can get in
                  touch through our 24/7 chat or through a phone call
                  in less than 5 minutes.
                </p>
              </div>
              <div className="feature-item">
                <img
                  src={moneyIcon}
                  alt="Money Icon"
                  className="feature-icon"
                />
                <h3 className="feature-item-title">
                  More savings means higher rates
                </h3>
                <p>
                  The more you save with us, the higher your interest
                  rate will be!
                </p>
              </div>
              <div className="feature-item">
                <img
                  src={securityIcon}
                  alt="Security Icon"
                  className="feature-icon"
                />
                <h3 className="feature-item-title">
                  Security you can trust
                </h3>
                <p>
                  We use top of the line encryption to make sure your
                  data and money is always safe.
                </p>
              </div>
            </section>
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

export default Home
