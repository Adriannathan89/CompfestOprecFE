import { Navigate, Outlet } from "react-router-dom"
import { useAuthValidation } from "../core/hooks/auth.hooks"
import Header from "../components/shared/student-header"

export default function StudentProtectedPage() {
    const { studentValidated, loading } = useAuthValidation()

    if (loading || studentValidated === null) return <p>Loading...</p>
    

    return studentValidated ? (
        <>
            <Header />
            <Outlet />
        </>
    ) :
        <Navigate to="/login" />
}