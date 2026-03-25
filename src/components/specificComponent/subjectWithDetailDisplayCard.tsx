import type { SubjectWithClass } from "@/core/types/subject.type"

export default function SubjectWithDetailDisplayCard({ subject }: { subject: SubjectWithClass }) {
    return (
        <div className="px-10 py-4">
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
                                <p className="text-sm text-secondary-foreground">{classItem.schedules.map(schedule => 
                                    `${schedule.dayOfWeek} ${schedule.startTime}-${schedule.endTime}`).join(", ")}</p>
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