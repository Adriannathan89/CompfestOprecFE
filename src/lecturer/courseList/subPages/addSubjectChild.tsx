import { Button } from "@base-ui/react";
import { useFetchSubjects } from "@/core/hooks/useSubjectService";
import { toast } from "sonner";
import SubjectDisplayCard from "@/components/specificComponent/displayCard/subjectDisplayCard";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function AddSubjectChild() {
    const { subjects, loading, error } = useFetchSubjects()
    const router = useNavigate()

    if(error) {
        toast.error(error)
        return
    }

    if(loading) return <p className="px-12 py-4">Loading...</p>
    return (
        <>
            <div className="px-12 max-md:px-0 py-4">
                <div className="flex justify-end">
                <Button 
                onClick={() => router("/lecturer/subject/new")}
                className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-xl max-sm:hidden">
                    Tambah Matakuliah
                </Button>
                <button
                onClick={() => router("/lecturer/subject/new")}
                className="sm:hidden border-1 rounded-full h-[52px] w-[52px] flex justify-center items-center text-white bg-green-600 hover:bg-green-700">
                    <Plus size={32} />
                </button>
                </div>

                <div>
                    <p className="text-lg font-medium text-card-foreground">Daftar Matakuliah</p>
                </div>
                
                <div className="flex justify-between mb-[12px] mt-4 bg-card rounded-lg">
                    <div className="p-2">
                        <p>Nama</p>
                    </div>
                    <div className="ml-22 px-2 py-2">
                        <p>Semester Diambil</p>
                    </div>
                    <div className="p-2">
                        <p>Total SKS</p>
                    </div>
                </div>
                <div className="flex flex-col gap-[12px]">
                    {subjects.map((subject) => (
                        <SubjectDisplayCard key={subject.id} subject={subject} />
                    ))}
                </div>
            </div>
        </>
    )
}