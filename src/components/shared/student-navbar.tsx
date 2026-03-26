import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
    const router = useNavigate()

    return (
        <div className="flex gap-[40px]">
            <Button
                onClick={() => router("/student")}
                className="w-[100px] bg-sidebar-primary text-primary-foreground hover:bg-sidebar-primary/80 px-4 py-2">
                Home
            </Button>
            <Button
                onClick={() => router("/student/academic")}
                className="w-[100px] bg-sidebar-primary text-primary-foreground hover:bg-sidebar-primary/80 px-4 py-2">
                Akademis
            </Button>
            <Button
                onClick={() => router("/student/irs")}
                className="w-[100px] bg-sidebar-primary text-primary-foreground hover:bg-sidebar-primary/80 px-4 py-2">
                IRS
            </Button>
        </div>
    )
}