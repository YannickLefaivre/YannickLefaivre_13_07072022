import { Routes, Route } from "react-router-dom"
import Home from "../features/landing/routes/Home"
import Login from "../features/user/routes/Login"
import Profile from "../features/user/routes/Profile"
import NotFound from "../features/notfound/routes/NotFound"
import ProtectedRoutes from "./protected"

/**
 * @returns {JSX.Element}
 */
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
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
