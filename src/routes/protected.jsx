import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

import { selectAuthentication } from "../features/authentication/slices/authentication.slice"

/**
 * @param {Object} props
 * @param {import("react").ReactNode} props.children The protected route components
 *
 * @returns {JSX.Element}
 */
function ProtectedRoutes({ children }) {
  const location = useLocation()
  const auth = useSelector(selectAuthentication)

  if (!auth.jsonWebToken) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoutes
