import { useFetchEnrollmentForm, useGetConflictingClasses } from "@/core/hooks/StudentTakingForm.hook"
import { toast } from "sonner"
import EnrollmentFormDisplayCard from "@/components/specificComponent/enrollmentFormDisplayCard"

export default function AcademicPage() {
    const { enrollmentForm, loading, error } = useFetchEnrollmentForm()
    const { conflictingClasses, loading: conflictingClassesLoading, error: conflictingClassesError } = useGetConflictingClasses()

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
        <div className="ml-10 px-10 py-12 w-full max-xl:px-0">
            <p className="flex justify-center mb-12 text-2xl">Ringkasan Akademis</p>
            <div className="flex max-xl:flex-wrap gap-20">
                <div className="flex flex-col justify-center items-center gap-12 xl:w-[320px] w-full">
                    <div className="flex flex-col w-full max-w-[320px]">
                        <p className="text-xl font-bold text-card-foreground/90 flex justify-center bg-primary/40 py-2">Info IRS</p>
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
                                {enrollmentForm[0].isFinalized ? "Ya" : "Belum"}
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
                </div>
                <div className="flex flex-col gap-8 w-full xl:max-w-[904px] max-xl:items-center max-xl:justify-center max-md:text-xs">
                    <div className="px-4 flex w-full max-w-[904px] h-[52px] 
                rounded-md bg-card/90 max-md:text-sm max-sm:text-xs">
                        <div className="flex items-center w-[20%]">
                            <p className="text-sm font-medium text-card-foreground">Kode MK</p>
                        </div>
                        <div className="flex items-center w-[20%]">
                            <p className="text-sm font-medium text-card-foreground">Nama MK</p>
                        </div>
                        <div className="flex items-center w-[20%]">
                            <p className="text-sm font-medium text-card-foreground">SKS</p>
                        </div>
                        <div className="flex items-center w-[20%]">
                            <p className="text-sm font-medium text-card-foreground">Kelas</p>
                        </div>
                        <div className="flex items-center w-[20%] ml-4">
                            <p className="text-sm font-medium text-card-foreground">Tanggal Pengisian</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 w-full xl:max-w-[904px]">
                        {enrollmentForm.map(form => (
                            <EnrollmentFormDisplayCard key={form.id} enrollmentForm={form} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}