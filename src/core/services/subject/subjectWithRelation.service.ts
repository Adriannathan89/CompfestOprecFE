import type { SubjectWithClass } from "../../types/subject.type"

export async function getSubjectsWithDetails() {
    const connection = import.meta.env.VITE_GET_SUBJECT_WITH_DETAIL_ENDPOINT

    const res = await fetch(connection, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if (!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to fetch subjects with details")
    }

    const json = await res.json()
    const data: SubjectWithClass[] = json.data.map((subject: any) => ({
        id: subject.id,
        name: subject.name,
        code: subject.code,
        sks: subject.sks,
        semesterTaken: subject.semesterTaken,
        classes: subject.classes.map((cls: any) => ({
            id: cls.id,
            name: cls.name,
            subjectId: cls.subjectId,
            lecturerName: cls.lecturerName,
            isHiddenLecturer: cls.isHiddenLecturer,
            classCapacity: cls.classCapacity,
            currentCapacity: cls.currentCapacity,
            schedules: cls.schedules.map((schedule: any) => ({
                id: schedule.id,
                classId: schedule.classId,
                dayOfWeek: schedule.dayOfWeek,
                startTime: schedule.startTime,
                endTime: schedule.endTime
            }))
        }))
    }))

    return data
}

export async function getSubjectById(subjectId: string) {
    const connection = import.meta.env.VITE_GET_SUBJECT_BY_ID_ENDPOINT
    const res = await fetch(connection + `/${subjectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if (!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to fetch subject details")
    }

    const json = await res.json()
    const data: SubjectWithClass = {
        id: json.data.id,
        name: json.data.name,
        code: json.data.code,
        sks: json.data.sks,
        semesterTaken: json.data.semesterTaken,
        classes: json.data.classes.map((cls: any) => ({
            id: cls.id,
            name: cls.name,
            subjectId: cls.subjectId,
            lecturerName: cls.lecturerName,
            isHiddenLecturer: cls.isHiddenLecturer,
            classCapacity: cls.classCapacity,
            currentCapacity: cls.currentCapacity,
            schedules: cls.schedules.map((schedule: any) => ({
                id: schedule.id,
                classId: schedule.classId,
                dayOfWeek: schedule.dayOfWeek,
                startTime: schedule.startTime,
                endTime: schedule.endTime
            }))
        }))
    }

    return data
}