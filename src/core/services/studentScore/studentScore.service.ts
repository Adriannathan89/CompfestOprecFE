import type { StudentScore, StudentScoringCalculation } from "@/core/types/studentScore.type";


export async function inputStudentScore(req: Partial<StudentScore> ) {
    const connection = import.meta.env.VITE_INPUT_SCORE_ENDPOINT

    const reqBody = {
        studentTakingClassFormId: req.studentTakingClassFormId,
        scoringComponentId: req.scoringComponentId,
        percentage: req.percentage,
        isPublished: req.isPublished
    }

    const res = await fetch(connection, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(reqBody)
    })

    if (!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to input student score")
    }
    const json = await res.json()
    const newScore: StudentScore = {
        id: json.data.id,
        studentTakingClassFormId: req.studentTakingClassFormId || "",
        scoringComponentId: req.scoringComponentId || "",
        name: json.data.name,
        isPublished: req.isPublished || false,
        percentage: req.percentage || 0
    }

    return { message: "Student score inputted successfully", data: newScore }
}

export async function deleteStudentScore(scoreId: string) {
    const connection = `${import.meta.env.VITE_DELETE_STUDENT_SCORE_ENDPOINT}/${scoreId}`

    const res = await fetch(connection, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if (!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to delete student score")
    }

    return { message: "Student score deleted successfully" }
}

export async function calculateFinalScore(studentTakingClassFormId: string) {
    const connection = `${import.meta.env.VITE_CALCULATE_SCORE_ENDPOINT}/${studentTakingClassFormId}`

    const res = await fetch(connection, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if (!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to calculate final score")
    }

    const json = await res.json()

    const finalScore: StudentScoringCalculation = {
        FinalGrade: json.data.FinalGrade,
        FinalGradePercentage: json.data.FinalGradePercentage,
        message: json.data.message,
        ScoringComponentDetails: json.data.scoringDetails.map((detail: any) => ({
            scoringComponentName: detail.scoringComponentName,
            percentage: detail.percentage,
            weight: detail.weight
        }))
    }

    return { message: "Final score calculated successfully", data: finalScore }
}

export async function getStudentScores(studentTakingFormId: string) {
    const connection = `${import.meta.env.VITE_GET_SCORES_ENDPOINT}/${studentTakingFormId}`
    const res = await fetch(connection, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if (!res.ok) {
        if(res.status === 404) {
            return { message: "No scores found for this student", data: [] }
        }
        throw new Error(await res.json().then(json => json.message) || "Failed to get student scores")
    }

    const json = await res.json()
    const scores: StudentScore[] = json.data.map((scoreData: any) => ({
        id: scoreData.id,
        studentTakingClassFormId: scoreData.studentTakingClassFormId,
        scoringComponentId: scoreData.scoringComponentId,
        name: scoreData.name,
        isPublished: scoreData.isPublished,
        percentage: scoreData.percentage
    }))

    return { message: "Student scores retrieved successfully", data: scores }
}