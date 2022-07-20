import NavigationBar from "../../../components/Layout/NavigationBar"
import Footer from "../../../components/Layout/Footer"

function Home() {
  return (
    <div>
      <NavigationBar
        pageTitle="Argent Bank"
        authenticationButtonLabel="Sign In"
      />
      <Footer />
    </div>
  )
}

export default Home
