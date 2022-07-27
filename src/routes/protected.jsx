import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

import { selectUser } from "../features/user/slices/user.slice"

/**
 * @param {Object} props
 * @param {import("react").ReactNode} props.children The protected route components
 *
 * @returns {JSX.Element}
 */
function ProtectedRoutes({ children }) {
  const location = useLocation()
  const auth = useSelector(selectUser)

  if (!auth.jwt) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoutes
