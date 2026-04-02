import type { ClassWithSchedule } from "@/core/types/Class.type";
import type { Schedule } from "@/core/types/shedule.type";

export default function DetailedSubjectClass({ classes }: { classes: ClassWithSchedule[] }) {
    const dayOfWeekMap: { [key: number]: string } = {
        1: "Senin", 2: "Selasa", 3: "Rabu", 4: "Kamis", 5: "Jumat", 6: "Sabtu", 7: "Minggu"
    };

    return (
        <div className="px-20 py-16 max-sm:px-4">
            <div className="flex flex-col items-center">
                <div className="flex justify-center bg-card max-w-[600px]">
                    <p className="text-xl font-bold text-card-foreground">Daftar Kelas Terbuka</p>
                </div>
                <div className="flex justify-between w-full max-w-[600px] px-1 py-3 border-b-1 border-card-foreground mt-2">
                    <p className="w-1/3 text-sm font-medium text-card-foreground max-sm:text-xs">Nama Kelas</p>
                    <p className="flex justify-center w-1/3 text-sm font-medium text-card-foreground max-sm:text-xs">Jadwal</p>
                    <p className="flex justify-end w-1/3 text-sm font-medium text-card-foreground max-sm:text-xs    ">Dosen Pengampu</p>
                </div>
                <div className="flex flex-col gap-4 w-full max-w-[600px]">
                    {classes.length > 0 ? (
                    classes.map((classItem: ClassWithSchedule, index: number) => (
                        <div key={classItem.id} className="flex ml-6 justify-between py-4 max-sm:ml-2 max-sm:text-xs">
                            <div className="flex gap-4">
                                <p>{index + 1}.</p>
                                <p>{classItem.name}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                {classItem.schedules.map((schedule: Schedule) => (
                                    <div key={schedule.id} className="text-sm text-secondary-foreground max-sm:text-xs">
                                        {`${dayOfWeekMap[schedule.dayOfWeek]} ${schedule.startTime}-${schedule.endTime}`}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-[20px]">
                                <p className="text-sm max-sm:text-xs">{classItem.lecturerName}</p>
                            </div>
                        </div>
                    ))
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Tidak ada kelas yang tersedia.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}