import { useCalculateStudentScore } from "@/core/hooks/studentScore.hook"
import { useFetchEnrollmentFormDetail } from "@/core/hooks/StudentTakingForm.hook"
import { useParams } from "react-router-dom"
import { toast } from "sonner"

export default function StudentTakingClassFormDetailPage() {
    const { studentTakingFormId } = useParams() as { studentTakingFormId: string }
    const { calculationResult, loading, error } = useCalculateStudentScore(studentTakingFormId)
    const { enrollmentFormDetail, loading: enrollmentLoading, error: enrollmentError } = useFetchEnrollmentFormDetail(studentTakingFormId)

    if (error || enrollmentError) {
        toast.error(error || enrollmentError)
    }

    if (loading || enrollmentLoading || !calculationResult || !enrollmentFormDetail) {
        return <div>Loading...</div>
    }
    console.log(calculationResult)

    return (
        <div className="px-40 max-lg:px-20 max-md:px-2 py-12 flex flex-col items-center gap-8">
            <p className="text-2xl flex justify-center max-md:text-lg max-sm:text-base">Kelas: {enrollmentFormDetail.class.name}</p>
            <div className="flex w-full gap-30 max-xl:flex-col">
                <table className="w-full max-w-[600px] text-center border-1 border-card-foreground/20 rounded-md">
                    <thead>
                        <tr className="bg-card/50">
                            <th className="w-full max-w-1/3 px-4 py-2 border-r-1 border-card-foreground/20 text-center">Range Nilai</th>
                            <th className="w-full max-w-1/3 px-4 py-2 border-r-1 border-card-foreground/20 text-center">Index Akhir</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t-1 border-card-foreground/20">
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">{"NA >= 85"}</td>
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">A</td>
                        </tr>
                        <tr className="border-t-1 border-card-foreground/20">
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">{"80 <= NA < 85"}</td>
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">A-</td>
                        </tr>
                        <tr className="border-t-1 border-card-foreground/20">
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">{"75 <= NA < 85"}</td>
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">B+</td>
                        </tr>
                        <tr className="border-t-1 border-card-foreground/20">
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">{"70 <= NA < 75"}</td>
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">B</td>
                        </tr>
                        <tr className="border-t-1 border-card-foreground/20">
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">{"65 <= NA < 70"}</td>
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">B-</td>
                        </tr>
                        <tr className="border-t-1 border-card-foreground/20">
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">{"60 <= NA < 65"}</td>
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">C+</td>
                        </tr>
                        <tr className="border-t-1 border-card-foreground/20">
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">{"55 <= NA < 60"}</td>
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">C</td>
                        </tr>
                        <tr className="border-t-1 border-card-foreground/20">
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">{"50 <= NA < 55"}</td>
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">D</td>
                        </tr>
                        <tr className="border-t-1 border-card-foreground/20">
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">{"0 <= NA < 50"}</td>
                            <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">E</td>
                        </tr>
                    </tbody>
                </table>
                {calculationResult.ScoringComponentDetails.length === 0 ? (
                    <p className="px-3 text-muted-foreground">Belum ada komponen penilaian untuk kelas ini</p>
                ) : (
                    <table className="w-full max-w-[600px] text-center border-1 border-card-foreground/20 rounded-md">
                        <thead>
                            <tr className="bg-card/50">
                                <th className="w-full max-w-1/3 px-4 py-2 border-r-1 border-card-foreground/20 text-center">Komponen Penilaian</th>
                                <th className="w-full max-w-1/3 px-4 py-2 border-r-1 border-card-foreground/20 text-center">Bobot</th>
                                <th className="w-full max-w-1/3 px-4 py-2 border-r-1 border-card-foreground/20 text-center">Nilai akhir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calculationResult.ScoringComponentDetails.map((detail, index) => (
                                <tr key={index} className="border-t-1 border-card-foreground/20">
                                    <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">{detail.scoringComponentName}</td>
                                    <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">{detail.weight}</td>
                                    <td className="px-4 py-2 border-r-1 border-card-foreground/20 text-center">{typeof detail.percentage === 'number' ? detail.percentage.toFixed(2) + "%" : detail.percentage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
                }
            </div>
            <div className="w-full max-w-[600px] mt-8 p-4 border-1 border-card-foreground/20 rounded-md">
                <p className="text-lg">{calculationResult.message}: {calculationResult.FinalGrade} ({calculationResult.FinalGradePercentage.toFixed(2)}%)</p>
            </div>
        </div>
    )
}