import { getSelf } from "../../core/hooks/auth.hooks"
import Navbar from "./student-navbar"
import ToggleTheme from "./toggle-theme"


export default function Header() {
    const { username } = getSelf()

    return (
        <div className="flex justify-between w-full h-[64px] bg-card text-secondary-foreground items-center px-4">
            <div>
                <p className="max-md:ml-2 max-md:text-md max-sm:text-sm ml-4 font-medium">SIAKNG Lite</p>
            </div>
            <div className="flex items-center gap-2">
                <ToggleTheme />
                <div className="max-md:mr-[4px] mr-[16px]">
                    <Navbar />
                </div>
                <p className="text-sm">{username}</p>
                <img src={`https://ui-avatars.com/api/?name=${username}`} alt="Avatar" className="w-8 h-8 rounded-full" />
            </div>
        </div>
    )
}