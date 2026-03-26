import { useNavigate } from "react-router-dom"
import type { Class } from "@/core/types/Class.type"

export default function OpenClassDisplayCard({ classData } : { classData: Class }) {
    const router = useNavigate()

    return (
        <div
        onClick={() => router(`/lecturer/class/${classData.id}`)}
        className="p-2">
            <div className="w-[300px] h-[200px] 
            cursor-pointer hover:translate-y-[-2px] hover:transition-all hover:ease-in-out hover:duration-300
            hover:bg-card/70
            bg-card rounded-lg shadow-md flex flex-col justify-between p-4">
                <div className="flex justify-between">
                    <p>{classData.name}</p>
                    <p>{classData.lecturerName}</p>
                </div>
                <div className="flex flex-col text-sm gap-1">
                    <p>total capacity: {classData.classCapacity}</p>
                    <p>participants: {classData.classCapacity - classData.currentCapacity}</p>
                </div>
            </div>
        </div>
    )
}