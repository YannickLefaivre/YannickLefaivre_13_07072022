import PropTypes from "prop-types"

import "./MainContentHeader.style.css"

/**
 * @param {Object} props
 * @param {String} props.userFirstName
 * @param {String} props.userLastName
 *
 * @returns {JSX.Element}
 */
function MaintContentHeader({ userFirstName, userLastName }) {
  return (
    <header className="header">
      <h1>
        Welcome back
        <br />
        {`${userFirstName} ${userLastName} !`}
      </h1>
      <button className="edit-button">Edit Name</button>
    </header>
  )
}

MaintContentHeader.propTypes = {
  userFirstName: PropTypes.string.isRequired,
  userLastName: PropTypes.string.isRequired,
}

export default MaintContentHeader
