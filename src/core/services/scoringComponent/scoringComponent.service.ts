import { type ScoringComponent } from "@/core/types/scoringComponent.type";

export async function createScoringComponent(classId: string, name: string, weight: number) {
    const connection = import.meta.env.VITE_CREATE_SCORING_COMPONENT_ENDPOINT

    const reqBody = {
        classId,
        name,
        weight
    }

    const res = await fetch(connection, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(reqBody)
    })

    if (!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to create scoring component")
    }

    return { message: "Scoring component created successfully" }
}

export async function getScoringComponents(classId: string) {
    const connection = `${import.meta.env.VITE_GET_SCORING_COMPONENTS_ENDPOINT}/${classId}`
    const res = await fetch(connection, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if (!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to get scoring components")
    }

    const json = await res.json()
    const scoringComponents: ScoringComponent[] = json.data.map((componentData: any) => ({
        id: componentData.id,
        classId: componentData.classId,
        name: componentData.name,
        weight: componentData.weight
    }))

    return { message: "Scoring components retrieved successfully", data: scoringComponents }
}

export async function deleteScoringComponent(componentId: string) {
    const connection = `${import.meta.env.VITE_DELETE_SCORING_COMPONENT_ENDPOINT}/${componentId}`
    const res = await fetch(connection, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })

    if (!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to delete scoring component")
    }
    return { message: "Scoring component deleted successfully" }
}

export async function updateScoringComponent(componentId: string, req: Partial<ScoringComponent>) {
    const connection = `${import.meta.env.VITE_UPDATE_SCORING_COMPONENT_ENDPOINT}/${componentId}`
    const reqBody = {
        name: req.name,
        weight: req.weight
    }

    const res = await fetch(connection, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(reqBody)
    })

    if (!res.ok) {
        throw new Error(await res.json().then(json => json.message) || "Failed to update scoring component")
    }

    return { message: "Scoring component updated successfully" }
}