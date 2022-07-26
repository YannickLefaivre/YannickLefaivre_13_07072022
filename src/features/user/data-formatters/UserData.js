import Account from "./AccountData"

class UserData {
  /**
   * @typedef {Object} CivilInformation
   * @property {String} firstName
   * @property {String} lastName
   */

  /**
   * @param {CivilInformation} civilInformation
   * @param {Account[] | []} accountsInformation
   */
  constructor(civilInformation, accountsInformation = []) {
    this.firstName = civilInformation.firstName
    this.lastName = civilInformation.lastName
    this.accounts = accountsInformation.map(
      (account) => new Account(account) ?? []
    )
  }
}

export default UserData
