import { useFetchEnrollmentFormDetail } from "@/core/hooks/StudentTakingForm.hook"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { useFetchScoringComponent, useInputStudentScoreComponent } from "../hook/inputStudentScoreProp.hook"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function InputStudentScoreFormChild() {
    const { studentTakingFormId } = useParams() as { studentTakingFormId: string }
    const { enrollmentFormDetail, loading, error } = useFetchEnrollmentFormDetail(studentTakingFormId)
    const { scoringComponents, loading: scoringLoading, error: scoringError } = useFetchScoringComponent(enrollmentFormDetail?.classId || "")

    const { studentScores, loading: studentScoresLoading, error: studentScoresError, handleChange, handleSave } = 
    useInputStudentScoreComponent(studentTakingFormId, scoringComponents)


    if (error || scoringError || studentScoresError) {
        toast.error(error || scoringError || studentScoresError)
    }

    if (loading || scoringLoading || !enrollmentFormDetail || !scoringComponents || studentScoresLoading || !studentScores) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-full h-full flex flex-col gap-8 pt-12">
            <p className="">Detail Mahasiswa: </p>
            <div className="flex flex-col gap-[8px]">
                <p>Nama: {enrollmentFormDetail.student.username}</p>
                <p>Posisi Pengambilan: {enrollmentFormDetail.takingPosition}</p>
                <p>Status Finalisasi: {enrollmentFormDetail.isFinalized ? "Final" : "Belum Final"}</p>
            </div>
            <p className="text-2xl flex justify-center max-md:text-lg max-sm:text-base">Input Nilai Mahasiswa</p>
            {scoringComponents.length === 0 ? (
                <p className="px-3 text-muted-foreground">Belum ada komponen penilaian untuk kelas ini</p>
            ) : (
                <div className="flex flex-col gap-4 w-full items-center">
                    {scoringComponents.map((component) => (
                        <div key={component.id} className="flex flex-col gap-4 w-full items-center">
                            <div className="flex justify-start w-full max-w-[400px]">
                                <p className="text-sm text-muted-foreground break-words w-full max-w-[100px]">Komponen Penilaian:</p>
                                <p className="flex items-center text-sm text-muted-foreground break-words w-full max-w-[100px]">persentase:</p>
                                <p className="flex items-center justify-center text-sm text-muted-foreground break-wordsw w-full max-w-[200px]">status Publikasi: </p>
                            </div>
                            <div className="flex flex-row items-center w-full max-w-[400px] gap-4">
                                <p className="w-full max-w-[92px]">{component.name} ({component.weight}%)</p>
                                <div className="w-full max-w-[152px] relative">
                                    <Input
                                        value={studentScores.find(score => score.scoringComponentId === component.id)?.percentage || ""}
                                        onChange={(e) => handleChange(component.id, e)}
                                        className="w-full max-w-[152px]"
                                        placeholder="Masukkan nilai"
                                        name="percentage"
                                        type="text"
                                    />
                                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">%</span>
                                </div>
                                <div className="w-full max-w-[152px]">
                                    <select 
                                    name="isPublished"
                                    onChange={(e) => handleChange(component.id, e)}
                                    value={studentScores.find(score => score.scoringComponentId === component.id)?.isPublished ? "true" : "false"}
                                    className="w-full max-w-[152px]">
                                        <option className="bg-card" value="true">Ya</option>
                                        <option className="bg-card" value="false">Tidak</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full max-w-[400px] pt-6 mt-8 border-t-1 border-card-foreground">
                            </div>
                        </div>
                    ))}
                    <div className="w-full max-w-[400px] pt-6 mt-8 border-t-1 border-card-foreground">
                        <Button
                            onClick={handleSave}
                            className="w-full"
                        >
                            Simpan Nilai
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}   