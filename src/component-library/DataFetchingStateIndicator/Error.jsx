import PropTypes from "prop-types"
import React from "react"
import "./Error.style.css"

/**
 * Display an error message.
 *
 * @param {Object} [props] Properties of the
 * functional component.
 *
 * @param {String} [props.message="Une erreur est survenue lorsque nous avons tenté d'afficher les informations que vous voulez consulter. Recharger la page pourrait vous permettre de voir de nouveau ces informations."] Error message displayed.
 *
 * @param {String} [props.type=""] The type of error.
 *
 * @param {React.ReactNode | React.ReactNode[]} [props.children=null]
 * Displays other useful content for the user to
 * resolve the error or return to a viewable page.
 *
 * @param {Object} [props.styleModifier=null]
 * Allows you to add one or more BEM-type modifier
 * CSS classes to customize the style of the
 * elements making up the component.
 *
 * @param {String} [props.styleModifier.errorContainer=undefined]
 * Allows you to change the style of the component
 * element container.
 *
 * @param {String} [props.styleModifier.typeOfError=undefined]
 * Allows you to change the style of the text
 * indicating the type of error that occurred.
 *
 * @param {String} [props.styleModifier.errorMessage=undefined]
 * This parameter allows you to change the style of
 * the text used to give more detail, explain or
 * apologize for the error.
 *
 * @returns {JSX.Element} A Error component.
 */
function Error({ type, message, children, styleModifier }) {
  return (
    <div
      className={`error${
        styleModifier && styleModifier.errorContainer
          ? ` ${styleModifier.errorContainer}`
          : ""
      }`}
    >
      {type && (
        <h1
          className={`error__type${
            styleModifier && styleModifier.typeOfError
              ? ` ${styleModifier.typeOfError}`
              : ""
          }`}
        >
          {type}
        </h1>
      )}
      <p
        className={`error__message${
          styleModifier && styleModifier.errorMessage
            ? ` ${styleModifier.errorMessage}`
            : ""
        }`}
      >
        {message}
      </p>
      {children && children}
    </div>
  )
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  styleModifier: PropTypes.object,
}

Error.defaultProps = {
  message:
    "Une erreur est survenue lorsque nous avons tenté d'afficher les informations que vous voulez consulter. Recharger la page pourrait vous permettre de voir de nouveau ces informations.",
  type: "",
  children: null,
  styleModifier: null,
}

export default Error
