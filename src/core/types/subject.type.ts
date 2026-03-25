import type { ClassWithSchedule } from "./Class.type"

export type Subject = {
    id?: string,
    name: string,
    code: string,
    sks: number,
    semesterTaken: number,
}

export type SubjectWithClass = {
    id: string,
    name: string,
    code: string,
    sks: number,
    semesterTaken: number,
    classes: ClassWithSchedule[]
}
