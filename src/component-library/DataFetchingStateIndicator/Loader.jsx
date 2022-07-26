import React from "react"
import PropTypes from "prop-types"
import "./Loader.style.css"

/**
 * Displays the wireframe of a part of the
 * application or a text indicating the loading of
 * a resource, depending on the elements assigned
 * to the children property.
 *
 * @param {Object} props Properties of the
 * functional component.
 *
 * @param {React.ReactNode[]} [props.children=<p>Chargement des données en cours...</p>]
 * The wireframe or text to display.
 *
 * @returns {JSX.Element} A Loader component.
 */
function Loader({ children }) {
  return <div className="Loader">{children}</div>
}

Loader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

Loader.defaultProps = {
  children: <p>Chargement des données en cours...</p>,
}

export default Loader
