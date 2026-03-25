import { refresh } from "./auth.service"

export async function validate(): Promise<boolean | string> {
    const accessToken = localStorage.getItem('accessToken')

    const res = await fetch(import.meta.env.VITE_VALIDATE_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })

    if(!res.ok) {
        try {
            await refresh()
            return await validate()
        } catch (error) {
            return false
        }
    }

    const json = await res.json()
    return json.validationLevel
}