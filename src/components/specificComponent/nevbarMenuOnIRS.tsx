import { useNavigate } from "react-router-dom"

export default function NavbarMenuOnIRS() {
    const router = useNavigate()

    return (
        <div className="flex gap-[40px]">
            <button 
            onClick={() => router("/student/irs/change")}
            className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground">
                Isi/Ubah IRS
            </button>

            <button 
            onClick={() => router("/student/irs/view")}
            className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground">
                Lihat IRS   
            </button>

            <button 
            onClick={() => router("/student/irs/drop")}
            className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground">
                Drop IRS
            </button>
        </div>
    )
}