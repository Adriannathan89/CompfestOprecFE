export type StudentScore = {
    id: string,
    studentTakingClassFormId: string,
    scoringComponentId: string,
    name: string,
    isPublished: boolean,
    percentage: number | string,
}

export type StudentScoringCalculation = {
    FinalGrade: string,
    FinalGradePercentage: number,
    ScoringComponentDetails: {
        scoringComponentName: string,
        percentage: number | string,
        weight: number,
    }[]
    message: string,
}