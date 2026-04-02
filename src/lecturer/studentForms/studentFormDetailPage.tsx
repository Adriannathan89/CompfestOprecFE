import NavbarMenuOnStudentFormDetail from "@/components/specificComponent/navbar/navbarMenuOnStudentFormDetail"
import { Outlet } from "react-router-dom"

export default function StudentFormDetailPage() {
    return (
        <div className="px-40 max-lg:px-20 max-md:px-4 py-12">
            <NavbarMenuOnStudentFormDetail />
            <Outlet />
        </div>
    )
}