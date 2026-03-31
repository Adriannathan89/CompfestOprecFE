import type { ClassWithSchedule, ClassWithSubject } from "./Class.type"

export type StudentTakingClassForm = {
    id: string,
    studentId: string,
    classId: string,
    takingPosition: number,
    isFinalized: boolean,
    createdAt: Date,
    class: ClassWithSubject
}

export type StudentTakingFormWithStudentDetail = StudentTakingClassForm & {
    student: {
        username: string,
    }
}

export type DetailedClassConflict = {
    class1: ClassWithSchedule
    class2: ClassWithSchedule
}