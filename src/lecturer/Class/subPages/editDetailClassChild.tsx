import { useNavigate, useParams } from "react-router-dom"
import { useGetClassDetail } from "@/core/hooks/useClassService"
import { useClassService } from "@/core/hooks/useClassService"
import { toast } from "sonner"
import { useState } from "react"
import type { Schedule } from "@/core/types/shedule.type"
import useUpdateClassScheduleProp from "../hook/useUpdateClassScheduleProp"
import AddScheduleForm from "@/components/specificComponent/form/addScheduleForm"
import useUpdateClassProp from "../hook/useUpdateClassProp"
import UpdateClassForm from "@/components/specificComponent/form/updateClassForm"

export default function EditDetailClassChild() {
    const { classId } = useParams()
    const router = useNavigate()

    //intialization
    const { classDetail, loading, error } = useGetClassDetail(String(classId))
    const [updateMode, setUpdateMode] = useState(false)

    //update hooks
    const { deleteCurrentClass, loading: updateLoading, error: updateError } = useClassService()
    const { schedulesState, addNewSchedule, removeSchedule, handleInputChange, 
        loading: updateScheduleLoading, error: updateScheduleError, updateAllSchedule } = useUpdateClassScheduleProp(classDetail)
    const { updatedData, error: updateClassError, loading: updateClassLoading, handleInputChange: handleClassInputChange, handleSubmit } = useUpdateClassProp(classDetail)

    if (error || updateError || updateScheduleError || updateClassError) {
        toast.error(error || updateError || updateScheduleError || updateClassError)
    }

    if (loading || updateLoading || updateScheduleLoading || updateClassLoading || !classDetail || !updatedData) return <p>Loading...</p>

    return (
        <div className="py-4">
            <div className="w-full flex justify-center">
                <form 
                onSubmit={(e) => {
                    handleSubmit(e);
                    updateAllSchedule();
                    setUpdateMode(false);
                }}  
                className="w-full md:max-w-[400px] flex flex-col gap-[20px]">
                    <UpdateClassForm updatedData={updatedData} handleInputChange={handleClassInputChange} updateMode={updateMode} />

                    <p className="px-3">Jadwal Kelas: </p>
                    {!schedulesState || schedulesState.length === 0 ? (
                        <p className="px-3 text-muted-foreground">Tidak ada jadwal kelas</p>
                    ) : (
                        schedulesState.map((schedule, index) => (
                            <div className="flex ml-16 max-sm:ml-2" key={schedule.id}>
                                <p>{index + 1}.</p>
                                <AddScheduleForm
                                    shedule={schedule}
                                    handleInputChange={handleInputChange}
                                    removeShedule={removeSchedule}
                                    updateMode={updateMode}
                                />
                            </div>
                        ))
                    )}

                    {updateMode && (
                        <div>
                            <div className="flex flex-col gap-[8px] py-4">
                                <button
                                    type="button"
                                    onClick={() => addNewSchedule(
                                        { classId: String(classId), classroom: "A101", dayOfWeek: 1, startTime: "08:00", endTime: "10:00" } as Schedule)
                                    }
                                    className="w-[160px] py-2 mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 rounded-md cursor-pointer">
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

            <div className="flex justify-end gap-[40px] max-sm:px-0 max-sm:gap-[20px] px-40 py-4">
                <button
                    hidden={updateMode}
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
                            router("/lecturer/courses/open-class")
                        }
                    }}
                    className="bg-destructive text-primary-foreground hover:bg-destructive/90 px-4 py-2 rounded-md cursor-pointer">
                    Hapus Kelas
                </button>
            </div>
        </div>
    )
}