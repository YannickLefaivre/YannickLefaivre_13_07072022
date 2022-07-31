import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrUpdateUser, selectUser } from "../slices/user.slice"
import UserData from "../data-formatters/UserData"
import NavigationBar from "../../../component-library/Layout/NavigationBar"
import Footer from "../../../component-library/Layout/Footer"
import LogoutForm from "../../../component-library/Form/LogoutForm"
import Loader from "../../../component-library/DataFetchingStateIndicator/Loader"
import Error from "../../../component-library/DataFetchingStateIndicator/Error"
import MaintContentHeader from "../components/MainContentHeader"
import "./Profile.style.css"

/**
 * @returns {JSX.Element}
 */
function Profile() {
  let userData = {}

  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const isLoading =
    user.status === "pending" || user.status === "updating"

  if (user.data) {
    userData = new UserData(user.data)
  }

  useEffect(() => {
    dispatch(fetchOrUpdateUser)
  }, [dispatch])

  document.title = `Argent Bank - Profile Page`

  if (user.status === "rejected") {
    return <Error type="Erreur" />
  }

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
                <i className="fa fa-user-circle"></i> Sign In
              </Link>
            )}
          </NavigationBar>
          <main className="main bg-dark">
            <MaintContentHeader />
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">
                  Argent Bank Checking (x8349)
                </h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">
                  Available Balance
                </p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">
                  Argent Bank Savings (x6712)
                </h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">
                  Available Balance
                </p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
            <section className="account">
              <div className="account-content-wrapper">
                <h3 className="account-title">
                  Argent Bank Credit Card (x8349)
                </h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">
                  Current Balance
                </p>
              </div>
              <div className="account-content-wrapper cta">
                <button className="transaction-button">
                  View transactions
                </button>
              </div>
            </section>
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

export default Profile
