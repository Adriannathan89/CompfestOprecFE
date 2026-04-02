import { useNavigate } from "react-router-dom"

export default function NavbarMenuOnDetailedClass({ classId } : { classId: string }) {
    const router = useNavigate()

    return (
        <div className="flex justify-center gap-[40px]">
            <button
                onClick={() => router(`/lecturer/class/${classId}`)}
                className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground max-sm:text-xs">
                Edit Kelas
            </button>
            <button
                onClick={() => router(`/lecturer/class/${classId}/participants`)}
                className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground max-sm:text-xs">
                Daftar Mahasiswa
            </button>
            <button
                onClick={() => router(`/lecturer/class/${classId}/scoring-component`)}
                className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground max-sm:text-xs">
                Komponen Penilaian
            </button>
        </div>
    )
}