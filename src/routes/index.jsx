import { Routes, Route } from "react-router-dom"
import Home from "../features/authentication/routes/Home"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} index />
    </Routes>
  )
}

export default AppRoutes
