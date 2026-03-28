import type { Schedule } from "./shedule.type"

export type Class = {
    id?: string,
    name: string,
    subjectId: string,
    lecturerName: string
    isHiddenLecturer: boolean,
    classCapacity: number,
    currentCapacity: number
}

export type ClassWithSchedule = {
    id?: string,
    name: string,
    subjectId: string,
    lecturerName: string
    isHiddenLecturer: boolean,
    classCapacity: number,
    currentCapacity: number,
    schedules: Schedule[]
}

export type ClassWithSubject = {
    id?: string,
    name: string,
    subject: {
        id: string,
        name: string,
        code: string,
        sks: number
    },
    lecturerName: string
    isHiddenLecturer: boolean,
    classCapacity: number,
    currentCapacity: number,
}