import FeatureData from "./FeatureData"

import chatIcon from "../assets/icon-chat.png"
import moneyIcon from "../assets/icon-money.png"
import securityIcon from "../assets/icon-security.png"

class HomeData {
  /**
   * @typedef {Object} ServiceFeature
   * @property {String} altText
   * @property {String} title
   * @property {String} description
   */

  /**
   *
   * @param {ServiceFeature[]} serviceFeatures
   */
  constructor(serviceFeatures) {
    this.featuresData = this.createFeaturesData(serviceFeatures)
  }

  /**
   * @param {ServiceFeature[]} serviceFeatures
   */
  createFeaturesData(serviceFeatures) {
    const featuresData = serviceFeatures.map((feature) => {
      const { altText, title, description } = feature

      switch (altText) {
        case "Chat Icon":
          return new FeatureData({
            icon: chatIcon,
            iconAlternativeAltText: altText,
            title,
            description,
          })

        case "Money Icon":
          return new FeatureData({
            icon: moneyIcon,
            iconAlternativeAltText: altText,
            title,
            description,
          })

        case "Security Icon":
          return new FeatureData({
            icon: securityIcon,
            iconAlternativeAltText: altText,
            title,
            description,
          })

        default:
          return null
      }
    })

    return featuresData
  }
}

export default HomeData
