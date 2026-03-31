import type { StudentScore, StudentScoringCalculation } from "@/core/types/studentScore.type"
import { calculateFinalScore, deleteStudentScore, inputStudentScore, updateStudentScore } from "../services/studentScore/studentScore.service"
import { useEffect, useState } from "react"

export function useScoringComponents() {
    const [message, setMessage] = useState<string | null>(null)

    const inputNewStudentScore = async (studentTakingClassFormId: string,
        scoringComponentId: string, isPublished: boolean, percentage: number) => {

        const reqBody: Partial<StudentScore> = {
            studentTakingClassFormId,
            scoringComponentId,
            isPublished,
            percentage
        }

        await inputStudentScore(reqBody).then((res: any) => {
            setMessage(res.message)
        })
    }

    const updateCurrentStudentScore = async (scoreId: string, studentTakingClassFormId: string,
        isPublished: boolean, percentage: number) => {
        const reqBody: Partial<StudentScore> = {
            studentTakingClassFormId,
            isPublished,
            percentage
        }

        await updateStudentScore(reqBody, scoreId).then((res: any) => {
            setMessage(res.message)
        })
    }

    const deleteCurrentStudentScore = async (scoreId: string) => {
        await deleteStudentScore(scoreId).then((res: any) => {
            setMessage(res.message)
        })
    }

    return { message, inputNewStudentScore, updateCurrentStudentScore, deleteCurrentStudentScore }
}

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