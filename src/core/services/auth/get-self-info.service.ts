export async function getSelfInfo() {
    const connection = import.meta.env.VITE_GET_SELF_INFO_ENDPOINT
    const accessToken = localStorage.getItem('accessToken')

    const res = await fetch(connection, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    if (!res.ok) {
        throw new Error("Failed to get self info")
    }
    const json = await res.json()
    return json.username
}

export async function getSelfFinalizationStatus() {
    const connection = import.meta.env.VITE_GET_SELF_FINALISATION_STATUS_ENDPOINT
    const res = await fetch(connection, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    if (!res.ok) {
        throw new Error("Failed to get self finalization status")
    }

    const json = await res.json()
    return json.data.isFinalized
}