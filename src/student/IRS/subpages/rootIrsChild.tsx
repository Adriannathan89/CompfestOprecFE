import SubjectWithDetailDisplayCard from "@/components/specificComponent/subjectWithDetailDisplayCard"
import { useFetchSubjectsWithDetails } from "@/core/hooks/useSubjectService"
import { toast } from "sonner"

export default function RootIrsChild() {
    const { subjects, loading, error } = useFetchSubjectsWithDetails()

    if(error) {
        toast.error(error)
    }

    if (loading) return <p>Loading...</p>


    return (
        <div className="flex flex-col py-4">
            {subjects?.map(subject => (
                <SubjectWithDetailDisplayCard key={subject.id} subject={subject} />
            ))}

        </div>
    )
}