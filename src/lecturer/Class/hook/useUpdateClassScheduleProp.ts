import { useEffect, useState } from "react"
import type { Schedule } from "@/core/types/shedule.type"
import { useScheduleService } from "@/core/hooks/useScheduleService";
import type { ClassWithSchedule } from "@/core/types/Class.type";
import { updateSchedule } from "@/core/services/schedule/shedule.service";

export default function useUpdateClassScheduleProp(classDetail: ClassWithSchedule | null) {
    const { createNewSchedule, deleteCurrentSchedule } = useScheduleService()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [schedulesState, setShedules] = useState<Schedule[]>([]);

    useEffect(() => {
        if (classDetail && classDetail.schedules) {
            setShedules(classDetail.schedules);
        }
    }, [classDetail]);

    const handleInputChange = (scheduleId: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setShedules(prev => prev.map(schedule => schedule.id === scheduleId ? { ...schedule, [name]: value } : schedule));
    }

    const addNewSchedule = async (schedule: Schedule) => {
        try {
            const newSchedule = await createNewSchedule(schedule);
            const updated = schedulesState ? [...schedulesState, newSchedule] : [newSchedule];
            setShedules(updated);
        } catch (error) {
            setError("Failed to add new schedule");
        }
    }

    const removeSchedule = async (scheduleId: string) => {
        setLoading(true);
        setError(null);

        try {
            await deleteCurrentSchedule(scheduleId);
            setShedules((prev) => prev.filter(schedule => schedule.id !== scheduleId));
        } catch (error) {
            setError("Failed to delete schedule");
        } finally {
            setLoading(false);
        }
    }

    const updateAllSchedule = async () => {
        setLoading(true);
        setError(null);

        try {
            await Promise.all(schedulesState.map(schedule => updateSchedule(schedule, String(schedule.id))));
        } catch (error) {
            setError("Failed to update schedules");
        } finally {
            setLoading(false);
        }
    }

    return { schedulesState, loading, error, addNewSchedule, removeSchedule, handleInputChange, updateAllSchedule };
}