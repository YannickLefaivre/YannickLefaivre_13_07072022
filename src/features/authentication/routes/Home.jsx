import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import {
  fetchOrUpdateFeatures,
  selectFeatures,
} from "../slices/features.slice"
import {
  fetchOrUpdateUser,
  selectUser,
} from "../../user/slices/user.slice"

import HomeData from "../data-formatters/HomeData"
import UserData from "../../user/data-formatters/UserData"

import NavigationBar from "../../../component-library/Layout/NavigationBar"
import Footer from "../../../component-library/Layout/Footer"
import LogoutForm from "../../../component-library/Form/LogoutForm"
import Loader from "../../../component-library/DataFetchingStateIndicator/Loader"
import Error from "../../../component-library/DataFetchingStateIndicator/Error"

import Hero from "../components/Hero"
import Feature from "../components/Feature"

import "./Home.style.css"

/**
 * Displays a home page with a header, a hero,
 * the presentation of the advantages provided by
 * the company's services and a footer with the
 * copyright.
 *
 * @returns {JSX.Element}
 */
function Home() {
  let homeData = {}
  let userData = {}

  const dispatch = useDispatch()

  const features = useSelector(selectFeatures)
  const user = useSelector(selectUser)

  const isLoading =
    features.status === "pending" ||
    user.status === "pending" ||
    features.status === "updating" ||
    user.status === "updating"

  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    if (jwt) {
      dispatch(fetchOrUpdateUser)
    }

    dispatch(fetchOrUpdateFeatures)
  }, [dispatch, jwt])

  if (features.data) {
    homeData = new HomeData(features.data)
  }

  if (user.data) {
    userData = new UserData(user.data)
  }

  if (
    (user.status === "rejected" &&
      user.passwordIsInvalid === false) ||
    features.status === "rejected"
  ) {
    return <Error type="Erreur" />
  }

  document.title = "Argent Bank - Home"

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <NavigationBar appTitle="Argent Bank">
            {user.data ? (
              <>
                {userData && (
                  <Link
                    className="main-nav-item margin-right-0-3rem"
                    to="/profile"
                  >
                    <i className="fa fa-user-circle main-nav-item-icon"></i>
                    {userData.firstName && userData.firstName}
                  </Link>
                )}

                <LogoutForm />
              </>
            ) : (
              <Link className="main-nav-item" to="/login">
                <i className="fa fa-user-circle"></i>
                Sign In
              </Link>
            )}
          </NavigationBar>

          <main>
            <Hero />

            <section className="features">
              <h2 className="sr-only">Features</h2>
              {homeData.featuresData &&
                homeData.featuresData.map((featureData, index) => (
                  <Feature
                    key={`feature-${index}`}
                    icon={featureData.icon}
                    iconAlternativeText={
                      featureData.iconAlternativeText
                    }
                    title={featureData.title}
                    description={featureData.description}
                  />
                ))}
            </section>
          </main>

          <Footer />
        </>
      )}
    </>
  )
}

export default Home
