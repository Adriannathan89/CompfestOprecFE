import { getScoringComponents } from "@/core/services/scoringComponent/scoringComponent.service"
import { getStudentScores, inputStudentScore } from "@/core/services/studentScore/studentScore.service"
import type { ScoringComponent } from "@/core/types/scoringComponent.type"
import type { StudentScore } from "@/core/types/studentScore.type"
import { useEffect, useState } from "react"

export function useFetchScoringComponent(classId: string) {
    const [scoringComponents, setScoringComponents] = useState<ScoringComponent[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchScoringComponents = async () => {
            if (!classId) {
                return
            }

            setLoading(true)
            setError(null)

            getScoringComponents(classId).then((res: any) => {
                setScoringComponents(res.data)
            }).catch(err => {
                setError(err.message || "Failed to fetch scoring components")
            }).finally(() => {
                setLoading(false)
            })
        }
        fetchScoringComponents()
    }, [classId])

    return { scoringComponents, loading, error }
}

export function useInputStudentScoreComponent(studentTakingFormId: string, scoringComponents: ScoringComponent[]) {
    const [studentScores, setStudentScores] = useState<StudentScore[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!studentTakingFormId) {
            return
        }

        const fetchStudentScores = async () => {
            setLoading(true)
            setError(null)

            await getStudentScores(studentTakingFormId).then((res: any) => {
                setStudentScores(res.data)
            }).catch(err => {
                setError(err.message || "Failed to fetch student scores")
            }).finally(() => {
                setLoading(false)
            })
        }
        fetchStudentScores()
    }, [studentTakingFormId])


    useEffect(() => {
        if (!scoringComponents) return

        const initializeScoresForNewComponents = async () => {
            setLoading(true)
            setError(null)

            if (!studentScores) return
            for (const component of scoringComponents) {
                const existingScore = studentScores.find(score => score.scoringComponentId === component.id)
                if (!existingScore) {
                    const reqBody: Partial<StudentScore> = {
                        studentTakingClassFormId: studentTakingFormId,
                        scoringComponentId: component.id,
                        isPublished: false,
                        percentage: 0
                    }
                    await inputStudentScore(reqBody).then((res: any) => {
                        const newScore: StudentScore = res.data
                        setStudentScores(prevScores => prevScores ? [...prevScores, newScore] : [newScore])
                    }).catch(err => {
                        setError(err.message || "Failed to initialize student score for new component")
                    }).finally(() => {
                        setLoading(false)
                    })
                }
            }
            setLoading(false)
        }

        initializeScoresForNewComponents()
    }, [scoringComponents])


    const handleChange = (scoreId: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === "isPublished") {
            const isPublished = value === "true"
            setStudentScores(prevScores => prevScores && prevScores.map(score => {
                if (score.scoringComponentId === scoreId) {
                    return { ...score, isPublished }
                }
                return score
            }))

        } else if (name === "percentage") {
            let percentageValue = value
            percentageValue = value.replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1")
                .replace(/^(\d*\.\d{0,2}).*$/, "$1");

            const newPercentage = percentageValue

            setStudentScores(prevScores => prevScores && prevScores.map(score => {
                if (score.scoringComponentId === scoreId) {
                    return { ...score, percentage: newPercentage }
                }
                return score
            }))
        }
    }

    const handleSave = async () => {
        if (!studentScores) return

        setLoading(true)
        setError(null)

        await Promise.all(studentScores.map(score => {
            const reqBody: Partial<StudentScore> = {
                studentTakingClassFormId: studentTakingFormId,
                scoringComponentId: score.scoringComponentId,
                isPublished: score.isPublished,
                percentage: typeof score.percentage === "string" ? parseFloat(score.percentage) : score.percentage
            }

            return inputStudentScore(reqBody).catch(err => {
                setError(err.message || "Failed to save student score")
            })
        })).catch(err => {
            setError(err.message || "Failed to save student scores")
        }).finally(() => {
            setLoading(false)
        })
    }

    return { studentScores, loading, error, handleChange, handleSave }
}