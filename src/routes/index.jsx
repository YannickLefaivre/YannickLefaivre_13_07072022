import { Routes, Route } from "react-router-dom"
import Home from "../features/authentication/routes/Home"
import Login from "../features/authentication/routes/Login"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default AppRoutes
