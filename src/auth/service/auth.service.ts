export async function register(username: string, password: string) {
    const body = {
        username,
        password
    }

    const res = await fetch(import.meta.env.VITE_REGISTER_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const json = await res.json()

    if (!json.success) {
        throw new Error(json.message)
    }

    return true
}

export async function login(username: string, password: string) {
    const body = {
        username,
        password
    }

    const res = await fetch(import.meta.env.VITE_LOGIN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (!res.ok) throw new Error("Login failed")

    const json = await res.json()

    localStorage.setItem('accessToken', json.data.token)
    localStorage.setItem('refreshToken', json.data.refreshToken)
    return true
}

export async function refresh() {
    const refreshToken = localStorage.getItem('refreshToken')

    const body = {
        refreshToken
    }

    const res = await fetch(import.meta.env.VITE_REFRESH_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    if (!res.ok) {
        throw new Error("Failed to refresh token")
    }

    const json = await res.json()
    localStorage.setItem('accessToken', json.data.token)
}

export async function logout() {
    const refreshToken = localStorage.getItem('refreshToken')

    const body = {
        refreshToken
    }

    await fetch(import.meta.env.VITE_LOGOUT_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}