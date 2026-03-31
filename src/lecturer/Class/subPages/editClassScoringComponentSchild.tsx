import ScoringComponentDisplayCard from "@/components/specificComponent/displayCard/scoringComponentDisplayCard";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEditScoringComponentProp } from "../hook/useEditScoringComponentProp";
import { useState } from "react";

export default function EditClassScoringComponentSchild() {
    const { classId } = useParams() as { classId: string };
    const { scoringComponents, error, loading, handleInputChange, handleAddComponent,
        handleDeleteComponent, handleSubmit } = useEditScoringComponentProp(classId)
    const [isEdit, setIsEdit] = useState(false)

    if (error) {
        toast.error(error)
    }

    if (loading || !scoringComponents) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-full flex justify-center max-sm:px-2">
            <div className="w-full md:max-w-[400px] xl:max-w-[600px] flex flex-col gap-[20px] pt-8 items-center">
                <p className="text-2xl flex justify-center max-md:text-lg max-sm:text-base">Daftar Komponen Penilaian</p>
                {!scoringComponents || scoringComponents.length === 0 ? (
                    <p className="px-3 text-muted-foreground">Belum ada komponen penilaian untuk kelas ini</p>
                ) : (
                    scoringComponents.map((component) => (
                        <ScoringComponentDisplayCard
                            key={component.id}
                            scoringComponent={component}
                            isEdit={isEdit}
                            handleInputChange={handleInputChange}
                            handleDeleteComponent={handleDeleteComponent} />
                    ))
                )}
                <div 
                hidden={!isEdit}
                className="w-full flex justify-end pt-2 max-sm:pr-4">
                    <button
                        onClick={() => handleAddComponent("UTS", 30)}
                        className="bg-primary h-[44px] text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md  max-sm:hidden">
                        Tambah Komponen Penilaian
                    </button>
                    <button
                        onClick={() => handleAddComponent("UTS", 30)}
                        className="sm:hidden border-1 rounded-full h-[52px] w-[52px] flex justify-center items-center text-white bg-green-600 hover:bg-green-700">
                        <Plus size={32} />
                    </button>
                </div>

                <div className="w-full flex justify-center border-t-1 border-card-foreground pt-8">
                    {isEdit ? (
                        <button
                            onClick={() => {
                                setIsEdit(false)
                                handleSubmit()
                            }}
                            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md w-full"
                        >
                            Selesai
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md w-full"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}