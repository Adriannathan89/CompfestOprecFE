import type { ClassWithSchedule } from "@/core/types/Class.type"
import { type DetailedClassConflict } from "@/core/types/studentTakingClassForm.type"

export async function getClassConflict() {
    const connnection = import.meta.env.VITE_GET_CONFLICTING_SCHEDULE_ENDPOINT

    const res = await fetch(connnection, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    
    if(!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to get conflicting schedules")
    }

    const json = await res.json()
    const data = json.data

    const scheduleConflict: DetailedClassConflict[] = data.map((conflictData: any) => {
        const data1 = conflictData.class1
        const data2 = conflictData.class2

        const class1: ClassWithSchedule = {
            id: data1.id,
            name: data1.name,
            subjectId: data1.subjectId,
            isHiddenLecturer: data1.isHiddenLecturer,
            classCapacity: data1.classCapacity,
            currentCapacity: data1.currentCapacity,
            lecturerName: data1.lecturerName,
            schedules: data1.schedules.map((scheduleData: any) => ({
                id: scheduleData.id,
                dayOfWeek: scheduleData.dayOfWeek,
                classroom: scheduleData.classroom,
                startTime: scheduleData.startTime,
                endTime: scheduleData.endTime,
            }))
        }
        const class2: ClassWithSchedule = {
            id: data2.id,
            name: data2.name,
            subjectId: data2.subjectId,
            isHiddenLecturer: data2.isHiddenLecturer,
            classCapacity: data2.classCapacity,
            currentCapacity: data2.currentCapacity,
            lecturerName: data2.lecturerName,
            schedules: data2.schedules.map((scheduleData: any) => ({
                id: scheduleData.id,
                dayOfWeek: scheduleData.dayOfWeek,
                classroom: scheduleData.classroom,
                startTime: scheduleData.startTime,
                endTime: scheduleData.endTime,
            }))
        }
        return { class1, class2 }

    })

    return { message: "Conflicting schedules found", data: scheduleConflict }
}

export async function finalizeMyEnrollment() {
    const connection = import.meta.env.VITE_FINALIZE_ENROLLMENT_ENDPOINT

    const res = await fetch(connection, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if(!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to finalize enrollment")
    }

    const json = await res.json()

    return {message: "Enrollment finalized successfully", data: json.data}
}