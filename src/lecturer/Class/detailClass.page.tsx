import NavbarMenuOnDetailedClass from "@/components/specificComponent/navbar/navbarMenuOnDetailedClass"
import { Outlet, useParams } from "react-router-dom"

export default function DetailClassPage() {
    const { classId } = useParams()
    
    return (
        <div className="px-20 max-sm:px-0 py-16">
            <NavbarMenuOnDetailedClass classId={String(classId)} />
            <div className="w-full border-b-1 border-card-foreground py-2"></div>
            <Outlet />
        </div>
    )
}