import { useFetchEnrollmentForm, useFinalizeEnrollment } from "@/core/hooks/StudentTakingForm.hook"
import { toast } from "sonner"
import EnrollmentFormDisplayCard from "@/components/specificComponent/enrollmentFormDisplayCard"
import { useGetConflictingClasses } from "@/core/hooks/StudentTakingForm.hook"
import { Button } from "@/components/ui/button"

export default function FinalizeIrsChild() {
    const { enrollmentForm, loading, error } = useFetchEnrollmentForm()
    const { conflictingClasses, loading: conflictingClassesLoading, error: conflictingClassesError } = useGetConflictingClasses()
    const { finalizeEnrollment } = useFinalizeEnrollment()

    if (error || conflictingClassesError) {
        return toast.error(error || conflictingClassesError)
    }

    if (loading || conflictingClassesLoading || !enrollmentForm || !conflictingClasses) {
        return <p>Loading...</p>
    }
    if(enrollmentForm.length === 0) {
        return <p className="py-10 text-center text-muted-foreground">Anda belum mengisi IRS untuk semester ini.</p>
    }

    const totalSks = enrollmentForm.reduce((total, form) => {
        const sks = form.class?.subject?.sks || 0
        return total + sks
    }, 0)

    return (
        <div className="py-12 flex max-xl:flex-wrap gap-20">
            <div className="flex flex-col justify-center items-center gap-12 xl:w-[320px] w-full">
                <div className="flex flex-col w-full max-w-[320px]">
                    <p className="text-xl font-bold text-card-foreground/90 flex justify-center bg-primary/40 py-2">Status IRS</p>
                    <div className="flex h-[40px]">
                        <div className="w-[50%] bg-card/90 flex justify-center items-center">
                            Sks Maksimal
                        </div>
                        <div className="w-[50%] bg-card/50 flex justify-center items-center">
                            24
                        </div>
                    </div>
                    <div className="flex h-[40px]">
                        <div className="w-[50%] bg-card/50 flex justify-center items-center">
                            Sudah Finalisasi
                        </div>
                        <div className="w-[50%] bg-card/90 flex justify-center items-center">
                            {enrollmentForm[0].isFinalized ? "Sudah" : "Belum"}
                        </div>
                    </div>
                    <div className="flex h-[40px]">
                        <div className="w-[50%] bg-card/90 flex justify-center items-center">
                            Total SKS
                        </div>
                        <div className="w-[50%] bg-card/50 flex justify-center items-center">
                            {totalSks}
                        </div>
                    </div>
                </div>
                <div className="max-sm:text-sm w-full max-w-[320px] flex flex-col ">
                    <p className="text-xl font-bold text-card-foreground/90 flex justify-center bg-primary/40 py-2">Pengecekan IRS</p>
                    <div className="flex flex-col">
                        {conflictingClasses.length === 0 ? (
                            <p className="text-center text-green-500 mt-4">Tidak ada konflik jadwal atau prasyarat</p>
                        ) : (
                            conflictingClasses.map((conflict, index) => (
                                <div key={index} className="p-3 bg-red-500/20 border-1 border-red-500/50">
                                    <p className="text-sm text-red-500 font-medium">Konflik {index + 1}:</p>
                                    <p className="text-sm text-red-500">terdapat konflik jadwal untuk kelas {conflict.class1.name} dan {conflict.class2.name}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-8 w-full xl:max-w-[904px] max-xl:items-center max-xl:justify-center max-md:text-xs">
                <div className="px-4 flex w-full max-w-[904px] h-[52px] 
                rounded-md bg-card/90 max-md:text-sm max-sm:text-xs">
                    <div className="flex items-center w-[20%] justify-center">
                        <p className="text-sm max-sm:text-xs font-medium text-card-foreground">Kode MK</p>
                    </div>
                    <div className="flex items-center w-[20%] justify-center">
                        <p className="text-sm max-sm:text-xs font-medium text-card-foreground">Nama MK</p>
                    </div>
                    <div className="flex items-center w-[20%] justify-center">
                        <p className="text-sm max-sm:text-xs font-medium text-card-foreground">SKS</p>
                    </div>
                    <div className="flex items-center w-[20%] justify-center">
                        <p className="text-sm max-sm:text-xs font-medium text-card-foreground">Kelas</p>
                    </div>
                    <div className="flex items-center w-[20%] ml-4 justify-center">
                        <p className="text-sm max-sm:text-xs font-medium text-card-foreground">Tanggal Pengisian</p>
                    </div>
                </div>
                <div className="flex flex-col gap-6 w-full xl:max-w-[904px]">
                    {enrollmentForm.map(form => (
                        <EnrollmentFormDisplayCard key={form.id} enrollmentForm={form} />
                    ))}
                </div>
                <div className="flex justify-center w-full">
                    <Button className="h-[44px] bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-xl w-full max-w-[904px]"
                        disabled={enrollmentForm[0].isFinalized || conflictingClasses.length > 0}
                        onClick={() => {
                            if(confirm("Apakah Anda yakin ingin memfinalisasi IRS? Anda tidak akan dapat melakukan perubahan setelah finalisasi.")) {
                                finalizeEnrollment();
                            }
                        }}>
                        Finalisasi IRS
                    </Button>
                </div>
            </div>
        </div>
    )
}