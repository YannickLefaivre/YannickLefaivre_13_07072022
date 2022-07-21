import PropTypes from "prop-types"
import "./Feature.style.css"

/**
 *
 * @param {Object} [props]
 * @param {String} [props.icon=""]
 * @param {String} [props.iconAlternativeText="Aucun chemin de fichier n'a été fournie au composant"]
 * @param {String} [props.title="Feature title"]
 * @param {String} [props.description="Feature description..."]
 *
 * @returns {JSX.Element}
 */
function Feature({ icon, iconAlternativeText, title, description }) {
  return (
    <div className="feature-item">
      <img
        src={icon}
        alt={iconAlternativeText}
        className="feature-icon"
      />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

Feature.propTypes = {
  icon: PropTypes.string.isRequired,
  titles: PropTypes.string.isRequired,
  descriptions: PropTypes.string.isRequired,
}

Feature.defaultProps = {
  icon: "",
  iconAlternativeText:
    "Aucun chemin de fichier n'a été fournie au composant",
  titles: "Feature title",
  descriptions: "Feature description...",
}

export default Feature
