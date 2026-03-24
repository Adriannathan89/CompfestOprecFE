import { useNavigate } from "react-router-dom"

export default function NavbarMenuOnCourse() {
    const router = useNavigate()

    return (
        <div className="flex mt-[40px] gap-[20px]">
            <button className="text-foreground px-4 py-2 border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground">
                Kelas Saya
            </button>
            <button className="text-foreground px-4 py-2 border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground">
                Buka Kelas
            </button>
            <button 
            onClick={() => router("/lecturer/courses/addCourse")}
            className="text-foreground px-4 py-2 border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground">
                Tambahkan Matakuliah
            </button>
        </div>
    )
}