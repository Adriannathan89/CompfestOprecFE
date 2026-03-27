import { toast } from "sonner"
import useUpdateSubjectProp from "./hook/useUpdateSubjectProp"
import { useParams } from "react-router-dom"
import { useState } from "react"
import UpdateDetailedSubjectForm from "@/components/specificComponent/updateDetailedSubjectForm"
import DetailedSubjectClass from "@/components/specificComponent/detailedSubjectClass"

export default function SubjectDetailedPage() {
    const { subjectId } = useParams()
    const { subject, loading, error, handleSubmit, handleInputChange, handleDelete } = useUpdateSubjectProp(String(subjectId))
    const [editMode, setEditMode] = useState(false)
    const [ viewClassMode, setViewClassMode ] = useState(false)

    if (error) {
        toast.error(error)
    }
    if (loading || !subject) {
        return <p className="px-12 py-4">Loading...</p>
    }

    return (
        <>
            <div className="flex justify-center gap-6 mt-12">
                <button 
                onClick={() => setViewClassMode(false)}
                className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground">
                    ubah matakuliah
                </button>
                <button 
                onClick={() => setViewClassMode(true)}
                className="border-b-1 border-transparent hover:border-b-1 hover:border-card-foreground text-foreground">
                    kelas terdaftar
                </button>
            </div>
            {viewClassMode ? (
                <DetailedSubjectClass classes={subject.classes} />
            ) : (
            <UpdateDetailedSubjectForm
                subject={subject}
                editMode={editMode}
                setEditMode={setEditMode}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
            />
            )}
        </>
    )
}