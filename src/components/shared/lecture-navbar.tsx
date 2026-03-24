import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Navbar() {
    const router = useNavigate()

    return (
        <div className="flex gap-[40px]">
            <Button 
            onClick={() => router("/lecturer")}
            className="bg-sidebar-primary text-primary-foreground hover:bg-sidebar-primary/80 px-4 py-2">
                Home
            </Button>
            <Button 
            onClick={() => router("/lecturer/courses")}
            className="bg-sidebar-primary text-primary-foreground hover:bg-sidebar-primary/80 px-4 py-2">
                Course-List
            </Button>
            <Button 
            onClick={() => router("/lecturer/schedule")}
            className="bg-sidebar-primary text-primary-foreground hover:bg-sidebar-primary/80 px-4 py-2">
                Schedule
            </Button>
        </div>
    )
}