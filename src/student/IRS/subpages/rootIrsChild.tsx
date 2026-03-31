import SubjectWithDetailDisplayCard from "@/components/specificComponent/displayCard/subjectWithDetailDisplayCard"
import { useFetchSubjectsWithDetails } from "@/core/hooks/useSubjectService"
import { toast } from "sonner"

export default function RootIrsChild() {
    const { subjects, loading, error } = useFetchSubjectsWithDetails()

    if(error) {
        toast.error(error)
    }

    if (loading) return <p>Loading...</p>


    return (
        <div className="max-sm:px-0 px-10 flex flex-col py-4 mt-6 max-md:text-xs">
            <div className="px-10 flex justify-between w-full bg-card py-3 rounded-md">
                <div className="w-[36px]">MataKuliah</div>
                <div>Jadwal</div>
                <div>Dosen</div>
            </div>
            {subjects?.map(subject => (
                <SubjectWithDetailDisplayCard key={subject.id} subject={subject} />
            ))}

        </div>
    )
}