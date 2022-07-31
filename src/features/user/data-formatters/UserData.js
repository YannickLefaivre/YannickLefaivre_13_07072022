/**
 * Formatting class for data retrieved via the
 * "POST /user/profile" route
 */
class UserData {
  /**
   * @typedef {Object} CivilInformation
   * @property {String} firstName
   * @property {String} lastName
   */

  /**
   * @param {CivilInformation} civilInformation
   */
  constructor(civilInformation) {
    this.firstName = civilInformation.firstName
    this.lastName = civilInformation.lastName
  }
}

export default UserData
