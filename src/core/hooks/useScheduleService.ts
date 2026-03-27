import type { Schedule } from "../types/shedule.type"
import { toast } from "sonner"
import { deleteSchedule, createSchedule, updateSchedule } from "../services/schedule/shedule.service"

export function useScheduleService() {
    const createNewSchedule = async (scheduleData: Schedule) => {
        try {
            const res = await createSchedule(scheduleData)
            toast.success(res.message)
            return res.data
        } catch (err: any) {
            throw new Error(err.message || "Failed to create schedule")
        } 
    }

    const deleteCurrentSchedule = async (scheduleId: string) => {
        try {
            const res = await deleteSchedule(scheduleId)
            toast.success(res.message)
        } catch (err: any) {
            throw new Error(err.message || "Failed to delete schedule")
        } 
    }

    const updateCurrentSchedule = async (scheduleId: string, scheduleData: Partial<Schedule>) => {
        try {
            await updateSchedule(scheduleData, scheduleId)
        } catch (err: any) {
            throw new Error(err.message || "Failed to update schedule")
        }
    }

    return { createNewSchedule, deleteCurrentSchedule, updateCurrentSchedule }
}