import { Outlet } from "react-router-dom"
import NabvarMenuOnCourse from "@/components/specificComponent/navbar/navbarMenuOnCourse"

export default function CourseListPage() {
    return (
        <div className="w-full flex flex-col gap-[40px]">
            <div className="px-50 max-xl:px-30 max-md:px-20 max-sm:px-2">
                <div className="w-full">
                    <NabvarMenuOnCourse />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}   