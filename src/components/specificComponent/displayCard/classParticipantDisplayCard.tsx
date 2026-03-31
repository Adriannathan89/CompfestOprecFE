import type { StudentTakingFormWithStudentDetail } from "@/core/types/studentTakingClassForm.type"

export default function ClassParticipantDisplayCard({ participant }: { participant: StudentTakingFormWithStudentDetail }) {
    return (
        <div className="w-full flex items-center gap-4 px-4 py-2 rounded-lg border-1 border-card-foreground xl:min-w-[600px]">
            <div className="w-[40px] h-[40px] rounded-full bg-card-foreground/20 flex items-center justify-center">
                <p className="text-sm text-card-foreground">{participant.student.username.charAt(0).toUpperCase()}</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-sm text-card-foreground">{participant.student.username}</p>
                <p className="text-xs text-muted-foreground">Posisi Pengambilan: {participant.takingPosition}</p>
                <p className="text-xs text-muted-foreground">Status Finalisasi: {participant.isFinalized ? "Final" : "Belum Final"}</p>
            </div>
        </div>
    )
}