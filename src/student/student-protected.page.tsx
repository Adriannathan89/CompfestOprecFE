import { Navigate, Outlet } from "react-router-dom"
import { useAuthValidation } from "../auth/auth.hooks"

export default function StudentProtectedPage() {
    const { studentValidated, loading } = useAuthValidation()

    console.log(studentValidated)
    if(loading || studentValidated === null) return <p>Loading...</p>

    return studentValidated ? <Outlet /> : <Navigate to="/login" />
}