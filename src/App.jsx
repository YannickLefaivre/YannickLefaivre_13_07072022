import "./App.css"
import AppProvider from "./providers/app"
import AppRoutes from "./routes"

/**
 * @returns {JSX.Element}
 */
function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
