import { useEffect, useState } from "react";
import { type ScoringComponent } from "../../../core/types/scoringComponent.type";
import { createScoringComponent, getScoringComponents, deleteScoringComponent, updateScoringComponent } from "@/core/services/scoringComponent/scoringComponent.service";
import { toast } from "sonner";

export function useEditScoringComponentProp(classId: string) {
    const [scoringComponents, setScoringComponents] = useState<ScoringComponent[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchScoringComponents = async () => {
            setLoading(true)
            setError(null)

            try {
                const res = await getScoringComponents(classId)
                setScoringComponents(res.data)
            } catch (err: any) {
                setError(err.message || "Failed to fetch scoring components")
            } finally {
                setLoading(false)
            }
        }

        if (classId) {
            fetchScoringComponents()
        }
    }, [classId])

    const handleInputChange = (componentId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === "weight") {
            const newValue = value.replace(/^0+(?=\d)/, "").replace(/\D/g, "")
            setScoringComponents(prev => prev.map(component => component.id === componentId ? { ...component, [name]: Number(newValue) } : component))
            return
        }

        setScoringComponents(prev => prev.map(component => component.id === componentId ? { ...component, [name]: value } : component))
    }

    const handleAddComponent = (name: string, weight: number) => {
        setLoading(true)
        setError(null)

        createScoringComponent(classId, name, weight).then((res: any) => {
            const newComponent: ScoringComponent = {
                id: res.data.id,
                classId,
                name,
                weight
            }
            setScoringComponents(prev => [...prev, newComponent])
            toast.success("Scoring component created successfully")
        }).catch((err: any) => {
            setError(err.message || "Failed to create scoring component")
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleDeleteComponent = (componentId: string) => {
        setLoading(true)
        setError(null)

        deleteScoringComponent(componentId).then(() => {
            setScoringComponents(prev => prev.filter(component => component.id !== componentId))
            toast.success("Scoring component deleted successfully")
        }).catch((err: any) => {
            setError(err.message || "Failed to delete scoring component")
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleSubmit = () => {
        setLoading(true)
        setError(null)

        Promise.all(scoringComponents.map(component => updateScoringComponent(component.id, { name: component.name, weight: component.weight }))).then(() => {
            toast.success("Scoring components updated successfully")
        }).catch((err: any) => {
            setError(err.message || "Failed to update scoring components")
        }).finally(() => {
            setLoading(false)
        })
    }

    return { scoringComponents, loading, error, handleInputChange, handleAddComponent, handleDeleteComponent, handleSubmit }
}