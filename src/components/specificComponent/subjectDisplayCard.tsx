import type { Subject } from "@/core/types/subject.type"
import { useNavigate } from "react-router-dom"

export default function SubjectDisplayCard({ subject }: { subject: Subject}) {
    const router = useNavigate()

    return (
        <div 
        onClick={() => router(`/lecturer/subject/${subject.id}`)}
        className="w-full h-[40px] flex items-center justify-between px-4 bg-card rounded-lg cursor-pointer hover:bg-card/50">
            <div className="w-[180px]">
                <p className="text-sm font-medium text-card-foreground">{subject.name + " (" + subject.code + ")"}</p>
            </div>
            <div className="w-[40px]">
                <p className="text-xs text-muted-foreground">{subject.semesterTaken}</p>
            </div>
            <div className="w-[100px]">
                <p className="flex justify-end text-sm text-secondary-foreground">{subject.sks} SKS</p>
            </div>
        </div>
    )
}