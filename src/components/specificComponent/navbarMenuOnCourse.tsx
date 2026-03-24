import { useNavigate } from "react-router-dom"

export default function NavbarMenuOnCourse() {
    const router = useNavigate()

    return (
        <div className="flex mt-[40px] gap-[20px]">
            <button 
            onClick={() => router("/lecturer/courses")}
            className="text-foreground px-4 py-2 border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground">
                Kelas Saya
            </button>
            <button 
            onClick={() => router("/lecturer/courses/open-class")}
            className="text-foreground px-4 py-2 border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground">
                Buka Kelas
            </button>
            <button 
            onClick={() => router("/lecturer/courses/subjects")}
            className="text-foreground px-4 py-2 border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground">
                Matakuliah
            </button>
        </div>
    )
}