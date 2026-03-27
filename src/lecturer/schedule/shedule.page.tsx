import { useFetchClasses } from "@/core/hooks/useClassService"
import { toast } from "sonner"
import { useMemo, useEffect } from "react"

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]
const TIME_SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
const DAY_NUMBERS = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4 }

// Total durasi grid dari jam 8 sampai 18 adalah 10 jam
const START_HOUR = 8
const TOTAL_HOURS = 10 

export default function ShedulePage() {
    const { classes, loading, error } = useFetchClasses()

    useEffect(() => {
        if (error) {
            toast.error(error)
        }
    }, [error])

    const allSchedules = useMemo(() => {
        return classes?.flatMap(cls =>
            cls.schedules?.map(schedule => ({
                ...schedule,
                className: cls.name,
                classroom: schedule.classroom || "TBA"
            })) || []
        ) || []
    }, [classes])

    const schedulesByDay = useMemo(() => {
        const grid: { [key: number]: any[] } = { 0: [], 1: [], 2: [], 3: [], 4: [] }
        
        allSchedules.forEach(schedule => {
            const dayIndex = DAY_NUMBERS[schedule.dayOfWeek as keyof typeof DAY_NUMBERS] ?? 0
            grid[dayIndex].push(schedule)
        })
        
        return grid
    }, [allSchedules])

    if (loading) {
        return <p className="px-20 py-5">Loading...</p>
    }

    // Ubah perhitungan px menjadi persentase (%)
    const getScheduleStyle = (startTime: string, endTime: string) => {
        const [startHour, startMinute] = startTime.split(':').map(Number)
        const [endHour, endMinute] = endTime.split(':').map(Number)
        
        const startOffsetInHours = (startHour - START_HOUR) + (startMinute / 60)
        const durationInHours = (endHour + (endMinute / 60)) - (startHour + (startMinute / 60))

        const topPercent = (startOffsetInHours / TOTAL_HOURS) * 100
        const heightPercent = (durationInHours / TOTAL_HOURS) * 100

        return {
            top: `${topPercent}%`,
            height: `calc(${heightPercent}% - 4px)`,
        }
    }

    return (
        <div className="px-4 md:px-10 py-5 w-full mx-auto min-w-[600px] flex flex-col h-[calc(100vh-100px)] min-h-[600px]">
            <div className="flex border-b border-card-foreground/20 shrink-0">
                <div className="w-16 md:w-20 flex-shrink-0"></div>
                {DAYS.map((day) => (
                    <div key={day} className="flex-1 text-center py-2 md:py-3 text-sm md:text-base font-semibold text-primary">
                        {day}
                    </div>
                ))}
            </div>

            {/* Container ini mengisi sisa tinggi (flex-1) */}
            <div className="flex flex-1 relative mt-2">
                <div className="w-16 md:w-20 flex-shrink-0 flex flex-col relative h-full">
                    {TIME_SLOTS.map((time, index) => (
                        <div 
                            key={time} 
                            // Hitung posisi label jam berdasarkan persentase
                            style={{ top: `${(index / TOTAL_HOURS) * 100}%` }} 
                            className="absolute w-full text-right pr-2 md:pr-4 text-[10px] md:text-xs text-muted-foreground font-medium -translate-y-1/2"
                        >
                            {time}
                        </div>
                    ))}
                </div>

                <div className="flex flex-1 relative border-t border-l border-card-foreground/10 h-full">
                    
                    {/* Background Grid Horizontal */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col">
                        {TIME_SLOTS.slice(1).map((time) => (
                            // Tiap blok punya tinggi 10% (1 per TOTAL_HOURS)
                            <div key={time} style={{ height: `${(1 / TOTAL_HOURS) * 100}%` }} className="border-b border-card-foreground/10 w-full" />
                        ))}
                    </div>

                    {DAYS.map((day, dayIndex) => (
                        <div key={day} className="flex-1 border-r border-card-foreground/10 relative h-full">
                            {schedulesByDay[dayIndex].map((schedule, idx) => {
                                const style = getScheduleStyle(schedule.startTime, schedule.endTime)
                                
                                return (
                                    <div
                                        key={`${schedule.id}-${idx}`}
                                        style={{
                                            ...style,
                                            left: '2%',
                                            width: '96%',
                                        }}
                                        className="absolute bg-blue-500/90 hover:bg-blue-600 rounded flex flex-col p-1.5 md:p-2 shadow-sm text-white overflow-hidden border border-blue-400/50 transition-colors z-10"
                                    >
                                        <p className="font-semibold text-[10px] md:text-xs mb-0.5 tracking-wide">
                                            {schedule.startTime} - {schedule.endTime}
                                        </p>
                                        <p className="text-[10px] md:text-xs font-semibold leading-tight line-clamp-2">
                                            {schedule.className}
                                        </p>
                                        <p className="text-[9px] md:text-[11px] mt-auto truncate text-blue-100">
                                            R: {schedule.classroom}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}