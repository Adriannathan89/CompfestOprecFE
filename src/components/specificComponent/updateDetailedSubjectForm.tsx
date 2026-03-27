import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Subject } from "@/core/types/subject.type"
import { useNavigate } from "react-router-dom"

interface UpdateDetailedSubjectFormProps {
    subject: Subject
    editMode: boolean
    setEditMode: (editMode: boolean) => void
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    handleDelete: () => void
}

export default function UpdateDetailedSubjectForm({ subject, editMode, setEditMode, handleInputChange, handleSubmit, handleDelete }: UpdateDetailedSubjectFormProps) {
    const router = useNavigate()

    return (
        <div className="px-20 py-16">
            <div className="flex justify-center">
                <form 
                onSubmit={(e) => {
                    handleSubmit(e)
                }}
                className="min-w-[400px] flex flex-col gap-[40px]">
                    <div className="flex flex-col gap-[8px]">
                        <p>Nama Matakuliah: </p>
                        <Input
                            disabled={!editMode}
                            value={subject.name}
                            onChange={handleInputChange}
                            name="name"
                            className="h-[40px] shadow-md border-1 border-t border-card-foreground/20" />
                    </div>

                    <div className="flex flex-col gap-[8px]">
                        <p>Kode Matakuliah: </p>
                        <Input
                            disabled={!editMode}
                            value={subject.code}
                            onChange={handleInputChange}
                            name="code"
                            className="h-[40px] shadow-md border-1 border-t border-card-foreground/20" />
                    </div>

                    <div className="flex flex-col gap-[8px]">
                        <p>Semester Diambil: </p>
                        <Input
                            disabled={!editMode}
                            value={subject.semesterTaken}
                            onChange={handleInputChange}
                            name="semesterTaken"
                            className="h-[40px] shadow-md border-1 border-t border-card-foreground/20" />
                    </div>

                    <div className="flex flex-col gap-[8px]">
                        <p>Total SKS: </p>
                        <Input
                            disabled={!editMode}
                            value={subject.sks}
                            onChange={handleInputChange}
                            name="sks"
                            className="h-[40px] shadow-md border-1 border-t border-card-foreground/20" />
                    </div>

                    <div 
                    hidden={!editMode}
                    className="flex justify-center min-w-[400px] border-t-1 border-card-foreground pt-4">
                        <Button
                            onClick={() => setEditMode(!editMode)}
                            className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md"
                            type="submit"
                        >
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>

            <div className="flex justify-end px-20 py-4 gap-[40px]">
                <Button 
                hidden={editMode}
                onClick={() => setEditMode(!editMode)}
                    className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2">
                    Update Matakuliah
                </Button>
                <Button onClick={() => {
                    if(confirm("Apakah Anda yakin ingin menghapus matakuliah ini? Tindakan ini tidak dapat dibatalkan")) {
                        handleDelete()
                        router("/lecturer/courses/subjects")
                    }
                }} className="text-destructive-foreground bg-destructive hover:bg-destructive/70">
                    Hapus Matakuliah
                </Button>
            </div>
        </div>
    )
}