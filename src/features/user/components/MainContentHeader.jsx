import { useDispatch, useSelector } from "react-redux"

import { selectUser, updateUserProfile } from "../slices/user.slice"

import Form from "../../../component-library/Form/Form"

import "./MainContentHeader.style.css"

/**
 * @returns {JSX.Element}
 */
function MaintContentHeader() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  /**
   * @param {Boolean} editModeEnabled
   */
  const toggleUserNameEditMode = (editModeEnabled) => {
    const userNameText = document.getElementById("user-name")
    const editButton = document.getElementById("edit-button")
    const editUserNameForm = document.getElementById(
      "edit-user-name-form"
    )

    if (editModeEnabled) {
      userNameText.classList.add("hide")
      editButton.classList.add("hide")
      editUserNameForm.classList.remove("hidden-form")
    } else {
      editUserNameForm.classList.add("hidden-form")
      userNameText.classList.remove("hide")
      editButton.classList.remove("hide")
    }
  }

  /**
   * @param {MouseEvent} event
   *
   * @returns {VoidFunction}
   */
  const handleUserNameEditing = (event) => {
    event.preventDefault()

    let newFirstName = document.getElementById("first-name").value
    let newLastName = document.getElementById("last-name").value

    if (!newFirstName) {
      newFirstName = user.data.firstName
    }

    if (!newLastName) {
      newLastName = user.data.lastName
    }

    dispatch(updateUserProfile(newFirstName, newLastName))

    toggleUserNameEditMode(false)
  }

  return (
    <header className="header">
      <h1>
        Welcome back
        <br />
        <span id="user-name">{`${user.data && user.data.firstName} ${
          user.data && user.data.lastName
        } !`}</span>
      </h1>

      <button
        id="edit-button"
        className="edit-button"
        onClick={() => toggleUserNameEditMode(true)}
      >
        Edit Name
      </button>

      <Form
        id="edit-user-name-form"
        method="POST"
        formStyleModifier="edit-user-name-form hidden-form"
      >
        <div className="input-wrappers-group">
          <div className="input-wrapper input-edit-user-name-wrapper">
            <label htmlFor="first-name" className="sr-only"></label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              className="input-edit-user-name"
              placeholder={user.data && user.data.firstName}
            />
          </div>

          <div className="input-wrapper input-edit-user-name-wrapper">
            <label htmlFor="last-name" className="sr-only">
              Last name
            </label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              className="input-edit-user-name"
              placeholder={user.data && user.data.lastName}
            />
          </div>
        </div>

        <div className="buttons-wrapper">
          <button
            type="submit"
            className="edit-user-name-form-button"
            onClick={handleUserNameEditing}
          >
            Save
          </button>

          <button
            type="reset"
            className="edit-user-name-form-button"
            onClick={() => toggleUserNameEditMode(false)}
          >
            Cancel
          </button>
        </div>
      </Form>
    </header>
  )
}

export default MaintContentHeader
