import type { Schedule } from "../types/shedule.type"
import { toast } from "sonner"
import { deleteSchedule, createSchedule } from "../services/schedule/shedule.service"

export function useScheduleService() {
    const createNewSchedule = async (scheduleData: Schedule) => {
        try {
            const res = await createSchedule(scheduleData)
            toast.success(res.message)
            return res.data
        } catch (err) {
            throw new Error("Failed to create schedule")
        } 
    }

    const deleteCurrentSchedule = async (scheduleId: string) => {
        try {
            const res = await deleteSchedule(scheduleId)
            toast.success(res.message)
        } catch (err) {
            throw new Error("Failed to delete schedule")
        } 
    }

    return { createNewSchedule, deleteCurrentSchedule }
}