class AccountData {
  /**
   * @param {Object} information
   * @param {String} information.id
   * @param {String} information.title
   * @param {String} information.amount
   * @param {String} information.amountDescription
   */
  constructor({ id, title, amount, amountDescription }) {
    this.id = id
    this.name = title
    this.amount = amount
    this.balance = amountDescription
  }
}

export default AccountData
