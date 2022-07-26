import { Routes, Route } from "react-router-dom"

import Home from "../features/authentication/routes/Home"
import Login from "../features/authentication/routes/Login"
import Profile from "../features/users/routes/Profile"

import ProtectedRoutes from "./protected"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="/login" element={<Login />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      />
    </Routes>
  )
}

export default AppRoutes
