import { Routes, Route } from "react-router-dom"
import Home from "../features/authentication/routes/Home"
import Login from "../features/authentication/routes/Login"
import Profile from "../features/users/routes/Profile"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default AppRoutes
