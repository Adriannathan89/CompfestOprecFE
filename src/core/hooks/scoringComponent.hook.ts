import { useEffect, useState } from "react"
import { createScoringComponent, deleteScoringComponent, getScoringComponents, updateScoringComponent } from "../services/scoringComponent/scoringComponent.service"
import type { ScoringComponent } from "../types/scoringComponent.type"
import { toast } from "sonner"

export function useScoringComponentService() {
    const createScoringNewComponent = async (classId: string, name: string, weight: number) => {
        await createScoringComponent(classId, name, weight).then((res : any) => {
            toast.success(res.message)
        }).catch((err: any) => {
            toast.error(err.message || "Failed to create scoring component")
        })
    }

    const updateScoringCurrentComponent = async (componentId: string, name: string, weight: number) => {
        const req = {
            name,
            weight
        }
        await updateScoringComponent(componentId, req).then((res : any) => {
            toast.success(res.message)
        }).catch((err: any) => {
            toast.error(err.message || "Failed to update scoring component")
        })
    }

    const deleteScoringCurrentComponent = async (componentId: string) => {
        await deleteScoringComponent(componentId).then((res : any) => {
            toast.success(res.message)
        }).catch((err: any) => {
            toast.error(err.message || "Failed to delete scoring component")
        })
    }

    return { createScoringNewComponent, updateScoringCurrentComponent, deleteScoringCurrentComponent }
}

export function useFetchScoringComponents(classId: string) {
    const [scoringComponents, setScoringComponents] = useState<ScoringComponent[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        
        if(!classId) {
            return
        }

        const fetchScoringComponents = async () => {
            setLoading(true)
            setError(null)

            await getScoringComponents(classId).then((res : any) => {
                setScoringComponents(res.data)
                toast.success(res.message)
            }).catch((err: any) => {
                setError(err.message || "Failed to fetch scoring components")
            }).finally(() => {
                setLoading(false)
            })
        }

        fetchScoringComponents()
    }, [classId])

    return { scoringComponents, error, loading }
}
