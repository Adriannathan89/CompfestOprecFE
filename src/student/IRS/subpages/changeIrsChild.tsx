import SelectClassToEnrollForm from "@/components/specificComponent/selectClassToEnrollForm"
import { useFetchSubjectsWithDetails } from "@/core/hooks/useSubjectService"
import { toast } from "sonner"
import { useChangeIRSProp } from "../hook/useChangeIRSProp"
import { Button } from "@/components/ui/button"
import { getFinalizationStatus } from "@/core/hooks/auth.hooks"

export default function RootIrsChild() {
    const { subjects, loading, error } = useFetchSubjectsWithDetails()
    const { registerClassId, loading: changeLoading, error: changeError, handleClickRadio, handleClick } = useChangeIRSProp()
    const { isFinalized } = getFinalizationStatus()

    if(isFinalized) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
                <p className="text-xl font-bold text-card-foreground/90">IRS sudah difinalisasi</p>
                <p className="text-center text-muted-foreground">Anda tidak dapat melakukan perubahan pada IRS Anda. Jika Anda ingin melakukan perubahan, silakan hubungi bagian akademik.</p>
            </div>
        )
    }

    if(error || changeError) {
        toast.error(error || changeError)
    }

    if (loading || changeLoading) return <p>Loading...</p>


    return (
        <div className="px-10 flex flex-col py-4 mt-6 max-xl:text-xs">
            <div className="px-10 flex w-full bg-card py-3 rounded-md">
                <p className="flex justify-start w-1/3">MataKuliah</p>
                <p className="flex justify-center w-1/3">Jadwal</p>
                <p className="flex w-1/3 justify-end">Dosen</p>
            </div>
            {subjects?.map(subject => (
                <SelectClassToEnrollForm 
                key={subject.id} 
                subject={subject} 
                registeredClassId={registerClassId}
                handleClickRadio={handleClickRadio}
                />
            ))}
            <div className="flex justify-center border-t-1 border-card-foreground/20 mt-6 pt-6">
                <Button onClick={handleClick} className="w-[200px] mt-4">Simpan IRS</Button>
            </div>
        </div>
    )
}