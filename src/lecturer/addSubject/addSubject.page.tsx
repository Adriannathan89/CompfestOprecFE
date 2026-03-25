import { toast } from "sonner";
import { useSubjectService } from "../../core/hooks/useSubjectService";
import { useAddSubjectProp } from "./useAddSubjectProp";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function AddSubjectPage() {
    const { createNewSubject, loading, error } = useSubjectService()
    const { form, onChange, handleSubmit } = useAddSubjectProp(createNewSubject)

    if (error) {
        toast.error(error)
    }

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="flex justify-center items-center w-full h-[900px] border-1">
            <div className="w-[640px] h-[640px] bg-card/50 border-1 shadow-md border-card-foreground/20 rounded-lg p-6">
                <p className="flex justify-center text-2xl font-semibold mb-4">Tambah Mata Kuliah</p>
                <form 
                className="flex flex-col gap-[40px]"
                onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[8px]">
                        <p>Nama Matakuliah: </p>
                        <Input 
                            required
                            className="h-[40px] shadow-md border-1 border-t border-card-foreground/20"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={onChange} />
                    </div>

                    <div className="flex flex-col gap-[8px]">
                        <p>Kode Matakuliah: </p>
                        <Input 
                            required
                            className="h-[40px] shadow-md border-1 border-t border-card-foreground/20"
                            type="text"
                            name="code"
                            value={form.code}
                            onChange={onChange} />
                    </div>

                    <div className="flex flex-col gap-[8px]">
                        <p>Semester Diambil: </p>
                        <Input 
                            required
                            className="h-[40px] shadow-md border-1 border-t border-card-foreground/20"
                            type="text"
                            name="semesterTaken"
                            value={form.semesterTaken}
                            onChange={onChange} />
                    </div>

                    <div className="flex flex-col gap-[8px]">
                        <p>Total SKS: </p>
                        <Input 
                            required
                            className="h-[40px] shadow-md border-1 border-t border-card-foreground/20"
                            type="text"
                            name="sks"
                            value={form.sks}
                            onChange={onChange} />
                    </div>

                    <Button
                    type="submit"
                    className="h-[44px] bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-xl"
                    >
                        Tambahkan Matakuliah
                    </Button>
                </form>
            </div>
        </div>
    )
}