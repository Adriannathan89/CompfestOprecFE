export type Class = {
    id?: string,
    name: string,
    subjectId: string,
    lecturerName: string
    isHiddenLecturer: boolean,
    classCapacity: number,
    currentCapacity: number
}