import type { StudentTakingClassFormDetailed } from "@/core/types/studentTakingClassForm.type"
import { type Class, type ClassWithSchedule } from "../../types/Class.type"

export async function createClass(req: Class) {
    const connection = import.meta.env.VITE_CREATE_CLASS_ENDPOINT

    const reqBody = {
        name: req.name,
        subjectId: req.subjectId,
        isHiddenLecturer: req.isHiddenLecturer,
        classCapacity: req.classCapacity
    }

    const res = await fetch(connection, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(reqBody)
    })

    if(!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to create class")
    }

    return {message: "Class created successfully"}
}

export async function updateClass(req: Partial<Class>, classId: string) {
    const connection = import.meta.env.VITE_UPDATE_CLASS_ENDPOINT
    const reqBody = {
        name: req.name,
        subjectId: req.subjectId,
        isHiddenLecturer: req.isHiddenLecturer,
        classCapacity: req.classCapacity
    }

    const res = await fetch(connection + `/${classId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(reqBody)
    })

    if(!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to update class")
    }

    return {message: "Class updated successfully"}
}

export async function deleteClass(classId: string) {
    const connection = import.meta.env.VITE_DELETE_CLASS_ENDPOINT
    const res = await fetch(connection + `/${classId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if(!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to delete class")
    }

    return {message: "Class deleted successfully"}
}

export async function getLecturerClasses() {
    const connnection = import.meta.env.VITE_LECTURER_GET_OWN_CLASS_ENDPOINT

    const res = await fetch(connnection, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if(!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to get lecturer classes")
    }

    const json = await res.json()
    const data: ClassWithSchedule[] = json.data.map((classData: any) => ({
        id: classData.id,
        name: classData.name,
        subjectId: classData.subjectId,
        lecturerName: classData.lecturerName,
        isHiddenLecturer: classData.isHiddenLecturer,
        classCapacity: classData.classCapacity,
        currentCapacity: classData.currentCapacity,
        schedules: classData.schedules.map((scheduleData: any) => ({
            id: scheduleData.id,
            dayOfWeek: scheduleData.dayOfWeek,
            classroom: scheduleData.classroom,
            startTime: scheduleData.startTime,
            endTime: scheduleData.endTime,
        }))
    }))

    return data
}

export async function getClassParticipants(classId: string) {
    const connection = import.meta.env.VITE_GET_CLASS_PARTICIPANTS_ENDPOINT
    const res = await fetch(connection + `/${classId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if(!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to get class participants")
    }

    const json = await res.json()
    
    const participants: StudentTakingClassFormDetailed[] = json.data.map((participantData: any) => ({
        id: participantData.id,
        classId: participantData.classId,
        studentId: participantData.studentId,
        takingPosition: participantData.takingPosition,
        isFinalized: participantData.isFinalized,
        createdAt: new Date(participantData.createdAt),
        student: {
            username: participantData.student.username
        }
    }))

    return participants
}
