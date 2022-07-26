import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { fetchOrUpdateUser, selectUser } from "../slices/user.slice"
import {
  fetchOrUpdateAccounts,
  selectAccounts,
} from "../slices/accounts.slice"

import UserData from "../data-formatters/UserData"

import NavigationBar from "../../../component-library/Layout/NavigationBar"
import Footer from "../../../component-library/Layout/Footer"
import LogoutForm from "../../../component-library/Form/LogoutForm"
import Error from "../../../component-library/DataFetchingStateIndicator/Error"
import Loader from "../../../component-library/DataFetchingStateIndicator/Loader"

import MaintContentHeader from "../components/MainContentHeader"
import Account from "../components/Account"

import "./Profile.style.css"

function Profile() {
  let userData = {}

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const accounts = useSelector(selectAccounts)

  const isLoading =
    user.status === "pending" ||
    accounts.status === "pending" ||
    user.status === "updating" ||
    accounts.status === "updating"

  if (user.data && accounts.data) {
    userData = new UserData(user.data, accounts.data)
  }

  useEffect(() => {
    dispatch(fetchOrUpdateUser)

    dispatch(fetchOrUpdateAccounts)
  }, [dispatch])

  document.title = `Argent Bank - Profile`

  if (user.status === "rejected" || accounts.status === "rejected") {
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
                <i className="fa fa-user-circle"></i>
                Sign In
              </Link>
            )}
          </NavigationBar>

          <main className="main bg-dark">
            <MaintContentHeader />

            <h2 className="sr-only">Accounts</h2>

            {userData.accounts &&
              userData.accounts.map((account) => (
                <Account
                  key={`account-${account.id}`}
                  title={account.name}
                  amount={account.amount}
                  amountDescription={account.balance}
                />
              ))}
          </main>

          <Footer />
        </>
      )}
    </>
  )
}

export default Profile
