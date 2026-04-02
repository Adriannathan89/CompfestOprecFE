import type { StudentScoringCalculation } from "@/core/types/studentScore.type"
import { calculateFinalScore } from "../services/studentScore/studentScore.service"
import { useEffect, useState } from "react"

export function useCalculateStudentScore(studentTakingFormId: string) {
    const [calculationResult, setCalculationResult] = useState<StudentScoringCalculation | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if(!studentTakingFormId) {
            return
        }
        
        const fetchCalculationResult = async () => {
            setLoading(true)
            setError(null)

            await calculateFinalScore(studentTakingFormId).then((res: any) => {
                setCalculationResult(res.data)
            }
            ).catch((err: any) => {
                setError(err.message || "Failed to calculate final score")
            }).finally(() => {
                setLoading(false)
            })
        }

        fetchCalculationResult()
    }, [studentTakingFormId])

    return { calculationResult, loading, error }
}