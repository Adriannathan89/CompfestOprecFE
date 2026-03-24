import { Navigate, Outlet } from "react-router-dom";
import { useAuthValidation } from "../auth/auth.hooks";
import { toast } from "sonner";
import Header from "../components/shared/lecuture-header";


export default function LecturerProtectedPage() {
    const { lecturerValidated, studentValidated, loading } = useAuthValidation()

    if (loading || lecturerValidated === null) return <p>Loading...</p>

    if (studentValidated) {
        toast.error("Anda tidak memiliki akses ke halaman ini")
        return <Navigate to="/student" />
    }

    return lecturerValidated ? (
        <>
            <Header />
            <Outlet />
        </>) : <Navigate to="/login" />
}