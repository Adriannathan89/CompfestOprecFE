import { Navigate, Outlet } from "react-router-dom"
import { useAuthValidation } from "../auth/auth.hooks"

export default function StudentProtectedPage() {
    const { studentValidated, loading } = useAuthValidation()

    if(loading) return <p>Loading...</p>

    return studentValidated ? <Outlet /> : <Navigate to="/login" />
}