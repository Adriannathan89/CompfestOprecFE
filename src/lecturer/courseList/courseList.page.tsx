import { Outlet } from "react-router-dom"
import NabvarMenuOnCourse from "../../components/specificComponent/navbarMenuOnCourse"

export default function CourseListPage() {
    return (
        <div className="flex flex-col gap-[40px]">
            <div className="px-50">
                <div>
                    <NabvarMenuOnCourse />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}   