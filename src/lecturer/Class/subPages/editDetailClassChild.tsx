import { useParams } from "react-router-dom"
import { useGetClassDetail } from "@/core/hooks/useClassService"
import { useClassService } from "@/core/hooks/useClassService"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function EditDetailClassChild() {
    const { classId } = useParams()
    const { classDetail, loading, error } = useGetClassDetail(String(classId))
    const { deleteCurrentClass, loading: updateLoading, error: updateError } = useClassService()
    const [updateMode, setUpdateMode] = useState(false)

    if (error || updateError) {
        toast.error(error || updateError)
    }

    if (loading || updateLoading) return <p>Loading...</p>
    const containerStyle = "flex flex-col p-2 gap-[8px] w-[400px]"

    return (
        <div className="py-4">
            <div className="w-full flex justify-center">
                <form className="flex flex-col gap-[20px]">

                    <div className={containerStyle}>
                        <p className="px-1">Nama Kelas: </p>
                        <Input
                            disabled={!updateMode}
                            name="name"
                            className="h-[40px] shadow-md border-1 border-t border-card-foreground/20"
                            defaultValue={classDetail.name}
                        />
                    </div>

                    <div className={containerStyle}>
                        <p className="px-1">Kapasitas Kelas: </p>
                        <Input
                            disabled={!updateMode}
                            name="classCapacity"
                            className="h-[40px] shadow-md border-1 border-t border-card-foreground/20"
                            defaultValue={classDetail.classCapacity}
                        />
                    </div>

                    <div className={containerStyle}>
                        <p>Tampilkan informasi pengajar: </p>
                        <select
                            name="isHiddenLecturer"
                            disabled={!updateMode}
                            className="h-[40px] shadow-md border-1 border-t border-card-foreground/20 rounded-md px-2 disabled:cursor-not-allowed">
                            <option className="bg-card" value="false">Ya</option>
                            <option className="bg-card" value="true">Tidak</option>
                        </select>
                    </div>

                </form>
            </div>

            <div className="flex justify-end gap-[40px] px-40 py-4">
                <button 
                onClick={() => {
                    setUpdateMode((prev) => !prev)
                    toast.success(updateMode ? "Mode memperbarui dinonaktifkan" : "Mode memperbarui diaktifkan")
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md cursor-pointer">
                    Update Kelas
                </button>
                <button
                    onClick={() => {
                        deleteCurrentClass(String(classId))
                    }}
                    className="bg-destructive text-primary-foreground hover:bg-destructive/90 px-4 py-2 rounded-md cursor-pointer">
                    Hapus Kelas
                </button>
            </div>
        </div>
    )
}