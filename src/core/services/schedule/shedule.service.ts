import { type Schedule } from "@/core/types/shedule.type";

export async function createSchedule(req: Schedule) {
    const connection = import.meta.env.VITE_CREATE_SCHEDULE_ENDPOINT;

    const reqBody = {
        dayOfWeek: req.dayOfWeek,
        startTime: req.startTime,
        classroom: req.classroom,
        endTime: req.endTime,
        classId: req.classId
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
        throw new Error("Failed to create schedule")
    }

    const json = await res.json()

    const data: Schedule = {
        id: json.data.id,
        classId: json.data.classId,
        classroom: json.data.classroom,
        dayOfWeek: json.data.dayOfWeek,
        startTime: json.data.startTime,
        endTime: json.data.endTime,
    }

    return {message: "Schedule created successfully", data: data}
}

export async function deleteSchedule(scheduleId: string) {
    const connection = import.meta.env.VITE_DELETE_SCHEDULE_ENDPOINT
    const res = await fetch(connection + `/${scheduleId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    if(!res.ok) {
        throw new Error("Failed to delete schedule")
    }

    return {message: "Schedule deleted successfully"}
}

export async function updateSchedule(req: Partial<Schedule>, scheduleId: string) {
    const connection = import.meta.env.VITE_UPDATE_SCHEDULE_ENDPOINT
    const reqBody = {
        dayOfWeek: req.dayOfWeek,
        startTime: req.startTime,
        classroom: req.classroom,
        endTime: req.endTime,
    }

    const res = await fetch(connection + `/${scheduleId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(reqBody)
    })
    if(!res.ok) {
        throw new Error("Failed to update schedule")
    }

    return {message: "Schedule updated successfully"}
}