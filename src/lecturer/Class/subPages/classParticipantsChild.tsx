import ClassParticipantDisplayCard from "@/components/specificComponent/displayCard/classParticipantDisplayCard";
import { useGetClassParticipants } from "@/core/hooks/useClassService";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ClassParticipantsChild() {
    const { classId } = useParams() as { classId: string };
    const { participants, loading, error} = useGetClassParticipants(classId)

    if(error) {
        toast.error(error)
    }

    if(loading) {
        return <div>Loading...</div>
    }
    console.log(participants)

    return (
        <div className="w-full flex justify-center max-sm:px-2">
            <div className="w-full md:max-w-[400px] xl:max-w-[600px] flex flex-col gap-[20px] pt-8 items-center">
                <p className="text-2xl flex justify-center max-md:text-lg max-sm:text-base">Daftar Mahasiswa</p>
                {!participants || participants.length === 0 ? (
                    <p className="px-3 text-muted-foreground">Belum ada mahasiswa yang mengambil kelas ini</p>
                ) : (
                    participants.map((participant) => (
                        <ClassParticipantDisplayCard key={participant.id} participant={participant} />
                    ))
                )}
            </div>
        </div>
    )
}