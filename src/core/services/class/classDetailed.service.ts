import { type ClassWithSchedule } from "@/core/types/Class.type"

export async function getClassById(id: string) {
    const connection = import.meta.env.VITE_GET_DETAILED_CLASS_ENDPOINT

    const res = await fetch(connection + `/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if(!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to get class details")
    }

    const json = await res.json()
    const data: ClassWithSchedule = {
        id: json.data.id,
        name: json.data.name,
        subjectId: json.data.subjectId,
        isHiddenLecturer: json.data.isHiddenLecturer,
        classCapacity: json.data.classCapacity,
        currentCapacity: json.data.currentCapacity,
        lecturerName: json.data.lecturerName,
        schedules: json.data.schedules.map((scheduleData: any) => ({
            id: scheduleData.id,
            dayOfWeek: scheduleData.dayOfWeek,
            classroom: scheduleData.classroom,
            startTime: scheduleData.startTime,
            endTime: scheduleData.endTime,
        }))
    }   

    return data
}

