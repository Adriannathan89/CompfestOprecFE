import { useParams } from "react-router-dom"
import { useGetClassDetail } from "@/core/hooks/useClassService"
import { useClassService } from "@/core/hooks/useClassService"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import type { Schedule } from "@/core/types/shedule.type"
import useUpdateClassScheduleProp from "../hook/useUpdateClassScheduleProp"

export default function EditDetailClassChild() {
    const { classId } = useParams()

    //intialization
    const { classDetail, loading, error } = useGetClassDetail(String(classId))
    const [ updateMode, setUpdateMode] = useState(false)

    //update hooks
    const { deleteCurrentClass, loading: updateLoading, error: updateError } = useClassService()
    const { schedulesState, addNewSchedule, removeSchedule, loading: updateScheduleLoading, error: updateScheduleError} = useUpdateClassScheduleProp(classDetail)

    if (error || updateError || updateScheduleError) {
        toast.error(error || updateError || updateScheduleError)
    }

    if (loading || updateLoading || updateScheduleLoading || !classDetail) return <p>Loading...</p>

    const containerStyle = "flex flex-col p-2 gap-[8px] w-[500px]"

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
                    <p className="px-3">Jadwal Kelas: </p>
                    {!schedulesState || schedulesState.length === 0 ? (
                        <p className="px-3 text-muted-foreground">Tidak ada jadwal kelas</p>
                    ) : (
                        schedulesState.map((schedule) => (
                            <div key={schedule.id} className="flex gap-2 items-center">
                                <span>{schedule.dayOfWeek}</span>
                                <span>{schedule.startTime} - {schedule.endTime}</span>
                            </div>
                        ))
                    )}

                    {updateMode && (
                        <div>
                            <div className="flex flex-col gap-[8px] py-4">
                                <button 
                                onClick={() => addNewSchedule(
                                    {classId: String(classId), classroom: "A101", dayOfWeek: 1, startTime: "08:00", endTime: "10:00"} as Schedule)
                                }
                                className="ml-auto w-[160px] py-2 mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 rounded-md cursor-pointer">
                                    Tambah Jadwal
                                </button>
                            </div>
                            <div className="flex flex-col mt-4 py-8 border-t-1 border-card-foreground">
                                <button
                                    type="submit"
                                    className="bg-primary text-primary-foreground hover:bg-primary/80 px-2 py-2 rounded-md cursor-pointer">
                                    Simpan Perubahan
                                </button>
                            </div>
                        </div>
                    )}
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
                        if (confirm("Apakah Anda yakin ingin menghapus kelas ini?")) {
                            deleteCurrentClass(String(classId))
                        }
                    }}
                    className="bg-destructive text-primary-foreground hover:bg-destructive/90 px-4 py-2 rounded-md cursor-pointer">
                    Hapus Kelas
                </button>
            </div>
        </div>
    )
}