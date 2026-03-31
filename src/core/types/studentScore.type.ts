export type StudentScore = {
    id: string,
    studentTakingClassFormId: string,
    scoringComponentId: string,
    isPublished: boolean,
    percentage: number,
}

export type StudentScoringCalculation = {
    FinalGrade: string,
    FinalGradePercentage: number,
    ScoringComponentDetails: {
        scoringComponentName: string,
        percentage: number,
    }[]
    message: string,
}