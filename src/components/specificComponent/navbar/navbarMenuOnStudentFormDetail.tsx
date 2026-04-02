import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavbarMenuOnStudentFormDetail() {
    const router = useNavigate()

    return (
        <div 
        onClick={() => router(-1)}
        className="w-full flex items-center gap-6">
            <button className="flex gap-2 items-center border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground max-sm:text-xs">
                <ArrowLeft size={20} /> kembali
            </button>
            <button
                className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground max-sm:text-xs">
                Input Nilai
            </button>
        </div>
    )
}