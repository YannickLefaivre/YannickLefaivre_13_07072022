import NavigationBar from "../../../components/Layout/NavigationBar"
import Footer from "../../../components/Layout/Footer"
import Hero from "../components/Hero"

function Home() {
  return (
    <div>
      <NavigationBar
        pageTitle="Argent Bank"
        authenticationButtonLabel="Sign In"
      />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  )
}

export default Home
