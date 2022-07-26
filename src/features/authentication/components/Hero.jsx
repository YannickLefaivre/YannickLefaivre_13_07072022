import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import PromotedContentData from "../data-formatters/PromotedContentData"

import {
  fetchOrUpdatePromotedContent,
  selectPromotedContent,
} from "../slices/promotedContent.slice"

import Loader from "../../../component-library/DataFetchingStateIndicator/Loader"
import Error from "../../../component-library/DataFetchingStateIndicator/Error"

import "./Hero.style.css"

function Hero() {
  let promotedContentData = {}

  const dispatch = useDispatch()
  const promotedContent = useSelector(selectPromotedContent)

  const isLoading =
    promotedContent.status === "pending" ||
    promotedContent.status === "updating"

  useEffect(() => {
    dispatch(fetchOrUpdatePromotedContent)
  }, [dispatch])

  if (promotedContent.data) {
    promotedContentData = new PromotedContentData(
      promotedContent.data
    )
  }

  if (promotedContent.status === "rejected") {
    return <Error />
  }

  return (
    <div className="hero">
      {isLoading ? (
        <Loader />
      ) : (
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          {promotedContent.data &&
            promotedContentData.sellingPoint.map((point, index) => (
              <p key={`point-${index}`} className="subtitle">
                {point}
              </p>
            ))}
          <p className="text">
            {promotedContent.data &&
              promotedContentData.callToActionText}
          </p>
        </section>
      )}
    </div>
  )
}

export default Hero
