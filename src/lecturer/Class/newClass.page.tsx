import { toast } from "sonner"
import { useFetchSubjects } from "../../core/hooks/useSubjectService"
import { Input } from "../../components/ui/input"
import { useClassService } from "../../core/hooks/useClassService"
import { useNewClassProp } from "./hook/useNewClassProp"
import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom"

export default function NewClassPage() {
    const { subjects, loading, error } = useFetchSubjects()
    const { createNewClass } = useClassService()
    const { form, onChange, onSelectChange, handleSubmit } = useNewClassProp(createNewClass)
    const router = useNavigate()

    if (error) {
        toast.error(error)
    }

    if (loading) {
        return <p className="px-12 py-4">Loading...</p>
    }
    if(form.subjectId === "") {
        form.subjectId = subjects[0]?.id || ""
    }

    return (
        <div className="flex w-full h-[900px] justify-center items-center">
            <div className="flex flex-col w-[700px] h-[680px] bg-card/50 gap-4 border-1 
            border-card-foreground/20 shadow-md rounded-xl text-card-foreground p-4">
                <p className="text-2xl flex justify-center max-md:text-lg max-sm:text-base">Buka Kelas Baru</p>
                <form 
                onSubmit={(e) => {
                    handleSubmit(e)
                    router("/lecturer/courses/open-class")
                }}
                className="flex flex-col gap-[40px]">
                    <div className="flex flex-col gap-[8px]">
                        <p>Nama Kelas: </p>
                        <Input
                            required
                            name="name"
                            onChange={onChange}
                            className="h-[40px] shadow-md border-1 border-t border-card-foreground/20"
                            type="text"
                        />
                    </div>

                    <div className="flex flex-col gap-[8px]">
                        <p>Untuk Mata Kuliah:</p>
                        <select onChange={onSelectChange}
                        name="subjectId"
                        className="h-[40px] shadow-md border-1 border-t border-card-foreground/20 rounded-md px-2">
                            {subjects.map((subject) => (
                                <option className="bg-card"
                                    key={subject.id}
                                    value={subject.id}>{subject.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-[8px]">
                        <p>Kapasitas Kelas: </p>
                        <Input
                            required
                            className="h-[40px] shadow-md border-1 border-t border-card-foreground/20"
                            type="text"
                            name="classCapacity"
                            value={form.classCapacity}
                            onChange={onChange}
                        />
                    </div>

                    <div className="flex flex-col gap-[8px]">
                        <p>Tampilkan informasi pengajar: </p>
                        <select 
                        onChange={onSelectChange} 
                        name="isHiddenLecturer" 
                        className="h-[40px] shadow-md border-1 border-t border-card-foreground/20 rounded-md px-2">
                            <option className="bg-card" value="false">Ya</option>
                            <option className="bg-card" value="true">Tidak</option>
                        </select>
                    </div>

                    <Button
                    type="submit"
                    className="h-[44px] bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-xl"
                    >
                        Buka Kelas
                    </Button>
                </form>
            </div>
        </div>
    )
}