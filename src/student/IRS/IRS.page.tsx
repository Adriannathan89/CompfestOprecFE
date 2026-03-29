import { Outlet } from "react-router-dom";
import NavbarMenuOnIRS from "../../components/specificComponent/navbarMenuOnIRS";

export default function IRSPage() {
    return (
        <div className="max-sm:px-0 px-10 py-12">
            <div className="flex flex-col min-h-[900px] h-auto">
                <NavbarMenuOnIRS />
                <Outlet />
            </div>
        </div>
    )
}