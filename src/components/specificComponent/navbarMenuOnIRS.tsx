import { useNavigate } from "react-router-dom"

export default function NavbarMenuOnIRS() {
    const router = useNavigate()

    return (
        <div className="flex gap-[40px]">
            <button
            onClick={() => router("/student/irs")}
            className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground">
                Jadwal
            </button>
            <button 
            onClick={() => router("/student/irs/change")}
            className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground">
                Isi/Ubah IRS
            </button>

            <button 
            onClick={() => router("/student/irs/finalize")}
            className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground">
                Finalisasi IRS
            </button>
        </div>
    )
}