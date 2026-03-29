import { Outlet, useNavigate, useParams } from "react-router-dom"

export default function DetailClassPage() {
    const { classId } = useParams()
    const router = useNavigate()
    
    return (
        <div className="px-20 max-sm:px-0 py-16">
            <div className="flex justify-center gap-[40px]">
                <button 
                onClick={() => router(`/lecturer/class/${classId}`)}
                className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground">
                    Edit Kelas
                </button>
                <button className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground">
                    Daftar Mahasiswa
                </button>
            </div>
            <div className="w-full border-b-1 border-card-foreground py-2"></div>
            <Outlet />
        </div>
    )
}