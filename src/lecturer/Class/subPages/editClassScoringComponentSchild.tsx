import { useFetchScoringComponents } from "@/core/hooks/scoringComponent.hook";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function EditClassScoringComponentSchild() {
    const { classId } = useParams() as { classId: string };
    const { scoringComponents, loading, error} = useFetchScoringComponents(classId)
    
    if(error) {
        toast.error(error)
    }

    if(loading || !scoringComponents) {
        return <div>Loading...</div>
    }

    return (
        <div>
            Edit Class Scoring Component
        </div>
    )
}