import { getSelf } from "../../auth/auth.hooks"
import Navbar from "./lecture-navbar"
import ToggleTheme from "./toggle-theme"

export default function Header() {
    const { username } = getSelf()

    return (
        <div className="flex justify-between w-full h-[64px] bg-card text-secondary-foreground items-center px-4">
            <div>
                <p className="ml-4 text-lg font-medium">SIAKNG Lite</p>
            </div>
            <div className="flex items-center gap-4">
                <ToggleTheme />
                <div className="mr-[60px]">
                    <Navbar />
                </div>
                <p className="text-sm">{username}</p>
                <img src={`https://ui-avatars.com/api/?name=${username}`} alt="Avatar" className="w-8 h-8 rounded-full" />
            </div>
        </div>
    )
}