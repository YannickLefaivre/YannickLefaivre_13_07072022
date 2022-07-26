import { Link } from "react-router-dom"

import NavigationBar from "../../../component-library/Layout/NavigationBar"
import Footer from "../../../component-library/Layout/Footer"

import Hero from "../components/Hero"
import Feature from "../components/Feature"

import { mockedFeatures } from "../../../__mocks__/features"

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
  document.title = "Argent Bank - Home"

  return (
    <>
      <NavigationBar appTitle="Argent Bank">
        <Link className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </NavigationBar>

      <main>
        <Hero />

        <section className="features">
          <h2 className="sr-only">Features</h2>
          {mockedFeatures.map((feature, index) => (
            <Feature
              key={`feature-${index}`}
              icon={feature.icon}
              iconAlternativeText={feature.iconAlternativeText}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Home
