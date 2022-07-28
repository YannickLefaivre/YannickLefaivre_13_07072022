import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import * as userActions from "../../features/user/slices/user.slice"

import Form from "./Form"

function LogoutForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickOnLogoutButton = (event) => {
    event.preventDefault()

    dispatch(userActions.signout())

    localStorage.removeItem("jwt")

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
