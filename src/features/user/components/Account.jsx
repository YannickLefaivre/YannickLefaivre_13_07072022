import PropTypes from "prop-types"

import "./Account.style.css"

/**
 *
 * @param {Object} props
 * @param {String} props.title
 * @param {String | Number} props.amount
 * @param {String} props.amountDescription
 *
 * @returns {JSX.Element}
 */
function Account({ title, amount, amountDescription }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">
          {amountDescription}
        </p>
      </div>

      <div className="account-content-wrapper cta">
        <button className="transaction-button">
          View transactions
        </button>
      </div>
    </section>
  )
}

Account.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  amountDescription: PropTypes.string.isRequired,
}

Account.defaultProps = {
  title: "Account name",
  amount: "$0",
  amountDescription: "Balance state",
}

export default Account
