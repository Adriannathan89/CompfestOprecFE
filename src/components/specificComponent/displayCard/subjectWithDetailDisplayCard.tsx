import type { SubjectWithClass } from "@/core/types/subject.type"

export default function SubjectWithDetailDisplayCard({ subject }: { subject: SubjectWithClass }) {
    const dayOfWeekMap: { [key: number]: string } = { 1: "Senin", 2: "Selasa", 3: "Rabu", 4: "Kamis", 5: "Jumat", 6: "Sabtu", 7: "Minggu" }

    return (
        <div className="py-8">
            <div className="flex flex-col gap-2 px-4 max-sm:px-1 py-3">
                <div className="flex justify-between pb-3 border-b-1 border-card-foreground max-sm:ml-1">
                    <p>{subject.code} - {subject.name} ( {subject.sks} SKS, Term {subject.semesterTaken} )</p>
                </div>
                <div className="md:ml-10 max-sm:ml-2">
                    <p>Daftar Kelas terbuka: </p>
                    {subject.classes.length > 0 ? subject.classes.map((classItem) => (
                        <div key={classItem.id} className="flex md:ml-6 justify-between py-2">
                            <div>
                                <p className="text-sm ml-2">{classItem.name}</p>
                            </div>
                            <div>
                                <div className="max-sm:text-xs flex flex-col items-center gap-2 w-[200px] text-sm text-secondary-foreground">{classItem.schedules.map(schedule =>
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
                            <div className="max-sm:text-xs flex">
                                <p className="max-sm:hidden text-sm">{classItem.isHiddenLecturer ? "Belum diInformasikan" : classItem.lecturerName}</p>
                                <p className="sm:hidden">{classItem.isHiddenLecturer ? "X" : classItem.lecturerName}</p>
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