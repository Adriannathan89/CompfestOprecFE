import type { SubjectWithClass } from "@/core/types/subject.type"

export default function SubjectWithDetailDisplayCard({ subject }: { subject: SubjectWithClass }) {
    const dayOfWeekMap: { [key: number]: string } = { 1: "Senin", 2: "Selasa", 3: "Rabu", 4: "Kamis", 5: "Jumat", 6: "Sabtu", 7: "Minggu" }

    return (
        <div className="py-8">
            <div className="flex flex-col gap-2 px-4 py-3">
                <div className="flex justify-between pb-3 border-b-1 border-card-foreground">
                    <p>{subject.code} - {subject.name} ( {subject.sks} SKS, Term {subject.semesterTaken} )</p>
                </div>
                <div className="ml-10">
                    <p>Daftar Kelas terbuka: </p>
                    {subject.classes.length > 0 ? subject.classes.map((classItem) => (
                        <div key={classItem.id} className="flex ml-6 justify-between py-2">
                            <div>
                                <p className="text-sm">{classItem.name}</p>
                            </div>
                            <div>
                                <div className="flex flex-col items-center gap-2 w-[200px] text-sm text-secondary-foreground">{classItem.schedules.map(schedule =>
                                    <div key={schedule.id}>
                                        <p className="max-md:hidden">
                                            {dayOfWeekMap[schedule.dayOfWeek]} {schedule.startTime}-{schedule.endTime}
                                        </p>
                                        <p className="md:hidden">
                                            {dayOfWeekMap[schedule.dayOfWeek]}
                                        </p>
                                        <p className="md:hidden">
                                            {schedule.startTime}-{schedule.endTime}
                                        </p>
                                    </div>
                                )}</div>
                            </div>
                            <div className="flex gap-[20px]">
                                <p className="text-sm">{classItem.isHiddenLecturer ? "Belum diInformasikan" : classItem.lecturerName}</p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-sm text-muted-foreground">Belum ada kelas yang dibuka untuk mata kuliah ini</p>
                    )}
                </div>
            </div>
        </div>
    )
}