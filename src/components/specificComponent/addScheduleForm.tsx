import { Input } from "../ui/input";
import type { Schedule } from "@/core/types/shedule.type";

interface AddScheduleFormProps {
    shedule: Schedule,
    handleInputChange: (scheduleId: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    removeShedule: (scheduleId: string) => void,
    updateMode: boolean
}


export default function AddScheduleForm({ shedule, handleInputChange, removeShedule, updateMode }: AddScheduleFormProps) {

    const mappedDays = (day: number) => {
        const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]
        return days[day - 1]
    }
    const daysOfWeek = [1, 2, 3, 4, 5, 6, 7]

    return (
        <div className="px-4">
            <div>
                <div className="flex flex-col gap-2">
                    <div className={`flex gap-[8px] ${updateMode ? "flex-col" : ""}`}>
                        {updateMode ? (
                            <>
                                <p className="px-1">Hari: </p>
                                <select
                                    name="dayOfWeek"
                                    value={shedule.dayOfWeek}
                                    onChange={(e) => handleInputChange(shedule.id, e)}
                                    className="h-[40px] shadow-md border-1 border-t border-card-foreground/20 rounded-md px-2"
                                >
                                    {daysOfWeek.map((day) => (
                                        <option
                                            className="p-2 bg-card"
                                            key={day}
                                            value={day}>{mappedDays(day)}
                                        </option>
                                    ))}
                                </select>
                            </>
                        ) : (
                            <p>{mappedDays(shedule.dayOfWeek)}</p>
                        )}
                    </div>
                    <div className={`flex gap-[8px] ${updateMode ? "flex-col" : ""}`}>
                        <p className="px-1">ruangan: </p>
                        {updateMode ? (
                            <Input
                                name="classroom"
                                value={shedule.classroom}
                                onChange={(e) => handleInputChange(shedule.id, e)}
                            />
                        ) : (
                            <p>{shedule.classroom}</p>
                        )}
                    </div>
                    <div className={`flex gap-[8px] ${updateMode ? "flex-col" : ""}`}>
                        <p className="px-1">Jam: </p>
                        {updateMode ? (
                            <div className="flex gap-2">
                                <Input
                                    type="time"
                                    name="startTime"
                                    value={shedule.startTime}
                                    onChange={(e) => handleInputChange(shedule.id, e)}
                                />
                                <span>-</span>
                                <Input
                                    type="time"
                                    name="endTime"
                                    value={shedule.endTime}
                                    onChange={(e) => handleInputChange(shedule.id, e)}
                                />
                            </div>
                        ) : (
                            <p>{`${shedule.startTime} - ${shedule.endTime}`}</p>
                        )}
                    </div>
                    <button
                        hidden={!updateMode}
                        type="button"
                        onClick={() => removeShedule(shedule.id)}
                        className="mt-4 bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2 rounded-md cursor-pointer"
                        disabled={!updateMode}
                    >
                        Hapus Jadwal
                    </button>
                </div>
            </div>
        </div>
    )
}