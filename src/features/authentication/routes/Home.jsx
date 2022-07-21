import NavigationBar from "../../../components/Layout/NavigationBar"
import Footer from "../../../components/Layout/Footer"
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
  return (
    <div>
      <NavigationBar
        pageTitle="Argent Bank"
        authenticationButtonLabel="Sign In"
      />
      <main>
        <Hero />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          {mockedFeatures.map((feature, index) => (
            <Feature
              key={`feature-${index}`}
              icon={feature.icon}
              iconAltText={feature.iconAltText}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
