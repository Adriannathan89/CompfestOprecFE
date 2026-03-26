import { Outlet } from "react-router-dom";
import NavbarMenuOnIRS from "../../components/specificComponent/navbarMenuOnIRS";

export default function IRSPage() {
    return (
        <div className="px-50 py-12">
            <div className="flex flex-col min-h-[900px] h-auto">
                <NavbarMenuOnIRS />
                <Outlet />
            </div>
        </div>
    )
}