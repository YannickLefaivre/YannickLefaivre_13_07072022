/**
 * Provides static methods for performing advanced
 * formatting techniques on strings.
 */
class FormatString {
  /**
   * @param {String} string
   *
   * @returns {String}
   */
  static firstLetterToUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}

export default FormatString
