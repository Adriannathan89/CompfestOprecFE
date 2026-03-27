import type { ClassWithSchedule } from "@/core/types/Class.type";
import type { Schedule } from "@/core/types/shedule.type";

export default function DetailedSubjectClass({ classes }: { classes: ClassWithSchedule[] }) {
    const dayOfWeekMap: { [key: number]: string } = {
        1: "Senin", 2: "Selasa", 3: "Rabu", 4: "Kamis", 5: "Jumat", 6: "Sabtu", 7: "Minggu"
    };

    return (
        <div className="px-20 py-16">
            <div className="flex flex-col items-center">
                <div className="flex justify-center bg-card w-[600px]">
                    <p className="text-xl font-bold text-card-foreground">Daftar Kelas Terbuka</p>
                </div>
                <div className="flex justify-between w-[600px] px-1 py-3 border-b-1 border-card-foreground mt-2">
                    <p className="w-[180px] text-sm font-medium text-card-foreground">Nama Kelas</p>
                    <p className="w-[100px] text-sm font-medium text-card-foreground">Jadwal</p>
                    <p className="flex justify-end w-[120px] text-sm font-medium text-card-foreground">Dosen Pengampu</p>
                </div>
                <div className="flex flex-col gap-4 w-[600px]">
                    {classes.length > 0 ? (
                    classes.map((classItem: ClassWithSchedule, index: number) => (
                        <div key={classItem.id} className="flex ml-6 justify-between py-4">
                            <div className="flex gap-4">
                                <p>{index + 1}.</p>
                                <p>{classItem.name}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                {classItem.schedules.map((schedule: Schedule) => (
                                    <div key={schedule.id} className="text-sm text-secondary-foreground">
                                        {`${dayOfWeekMap[schedule.dayOfWeek]} ${schedule.startTime}-${schedule.endTime}`}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-[20px]">
                                <p className="text-sm">{classItem.lecturerName}</p>
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