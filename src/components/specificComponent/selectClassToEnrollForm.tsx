import { useMemo } from "react"
import type { SubjectWithClass } from "@/core/types/subject.type"

interface SubjectWithDetailDisplayCardProps {
    subject: SubjectWithClass
    registeredClassId: string[]
    handleClickRadio: (classId: string, allClassIds: string[]) => void
}

export default function SubjectWithDetailDisplayCard({
    subject,
    registeredClassId,
    handleClickRadio,
}: SubjectWithDetailDisplayCardProps) {
    const dayOfWeekMap: { [key: number]: string } = {
        1: "Senin",
        2: "Selasa",
        3: "Rabu",
        4: "Kamis",
        5: "Jumat",
        6: "Sabtu",
        7: "Minggu"
    }

    const selectedIds = useMemo(
        () => new Set(registeredClassId.map(String)),
        [registeredClassId]
    )

    return (
        <div className="w-full py-8">
            <div className="flex flex-col gap-2 px-4 py-3">
                <div className="flex justify-between pb-3 border-b-1 border-card-foreground">
                    <p>{subject.code} - {subject.name} ( {subject.sks} SKS, Term {subject.semesterTaken} )</p>
                </div>
                <div className="w-full">
                    <p>Daftar Kelas terbuka: </p>
                    {subject.classes.length > 0 ? subject.classes.map((classItem) => {
                        const classId = String(classItem.id)
                        return (
                            <div key={classId} className="flex ml-6 justify-between py-2">
                                <div className="flex max-md:flex-col">
                                    <p className="text-sm">{classItem.name}</p>
                                    <p className="text-sm ml-5">({classItem.currentCapacity}/{classItem.classCapacity})</p>
                                </div>
                                <div>
                                    <div className="flex flex-col items-center gap-2 text-sm text-secondary-foreground">
                                        {classItem.schedules.map(schedule => (
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
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-[20px] h-[40px] items-center">
                                    <p className="text-sm">
                                        {classItem.isHiddenLecturer ? "Belum diInformasikan" : classItem.lecturerName}
                                    </p>
                                    <input
                                        type="radio"
                                        name={`subject-${subject.id}`}
                                        value={classId}
                                        checked={selectedIds.has(classId)}
                                        onClick={() =>
                                            handleClickRadio(
                                                classId,
                                                subject.classes.map((c) => String(c.id))
                                            )
                                        }
                                        readOnly
                                    />
                                </div>
                            </div>
                        )
                    }) : (
                        <p className="text-sm text-muted-foreground">Belum ada kelas yang dibuka untuk mata kuliah ini</p>
                    )}
                </div>
            </div>
        </div>
    )
}