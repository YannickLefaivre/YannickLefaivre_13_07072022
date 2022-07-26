import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import * as authenticationActions from "../../features/authentication/slices/authentication.slice"
import * as userActions from "../../features/user/slices/user.slice"
import * as accountsActions from "../../features/user/slices/accounts.slice"

import Form from "./Form"

function LogoutForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickOnLogoutButton = (event) => {
    event.preventDefault()

    dispatch(authenticationActions.signout())

    dispatch(userActions.signout())

    dispatch(accountsActions.signout())

    navigate("/")
  }

  return (
    <Form
      id="logout-form"
      method="POST"
      handleSubmit={handleClickOnLogoutButton}
      formStyleModifier="main-nav-item logout-form"
    >
      <button type="submit" className="logout-form-button">
        <i className="fa fa-sign-out logout-form-button-icon"></i>
        Sign Out
      </button>
    </Form>
  )
}

export default LogoutForm
