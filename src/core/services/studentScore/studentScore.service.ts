import type { StudentScore, StudentScoringCalculation } from "@/core/types/studentScore.type";


export async function inputStudentScore(req: Partial<StudentScore> ) {
    const connection = import.meta.env.VITE_INPUT_STUDENT_SCORE_ENDPOINT

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

    return { message: "Student score inputted successfully" }
}

export async function updateStudentScore(req: Partial<StudentScore>, scoreId: string) {
    const connection = `${import.meta.env.VITE_UPDATE_STUDENT_SCORE_ENDPOINT}/${scoreId}`

    const reqBody = {
        studentTakingClassFormId: req.studentTakingClassFormId,
        scoringComponentId: req.scoringComponentId,
        percentage: req.percentage,
        isPublished: req.isPublished
    }

    const res = await fetch(connection, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(reqBody)
    })

    if (!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to update student score")
    }

    return { message: "Student score updated successfully" }
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
    const connection = `${import.meta.env.VITE_CALCULATE_FINAL_SCORE_ENDPOINT}/${studentTakingClassFormId}`

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
        FinalGrade: json.data.finalGrade,
        FinalGradePercentage: json.data.finalGradePercentage,
        message: json.data.message,
        ScoringComponentDetails: json.data.scoringComponentDetails.map((detail: any) => ({
            scoringComponentName: detail.scoringComponentName,
            percentage: detail.percentage,
        }))
    }

    return { message: "Final score calculated successfully", data: finalScore }
}