import { Link } from "react-router-dom"

import NavigationBar from "../../../component-library/Layout/NavigationBar"
import Footer from "../../../component-library/Layout/Footer"

import MaintContentHeader from "../components/MainContentHeader"
import Account from "../components/Account"

import { mockedUser1 } from "../../../__mocks__/users"
import { mockedAccounts } from "../../../__mocks__/accounts"

function Profile() {
  document.title = `Argent Bank - ${
    mockedUser1.firstName + " " + mockedUser1.lastName
  } Profile`

  return (
    <>
      <NavigationBar appTitle="Argent Bank">
        <Link className="main-nav-item" to="/profile">
          <i className="fa fa-user-circle"></i>
          {mockedUser1.firstName}
        </Link>

        <Link className="main-nav-item" to="/">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </Link>
      </NavigationBar>

      <main className="main bg-dark">
        <MaintContentHeader
          userFirstName={mockedUser1.firstName}
          userLastName={mockedUser1.lastName}
        />

        <h2 className="sr-only">Accounts</h2>

        {mockedAccounts.map((account) => (
          <Account
            key={`account-${account.id}`}
            title={account.title}
            amount={account.amount}
            amountDescription={account.amountDescription}
          />
        ))}
      </main>

      <Footer />
    </>
  )
}

export default Profile
