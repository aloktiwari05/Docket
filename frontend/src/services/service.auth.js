import { apiUrl } from '../api/api.js'
import { toast } from 'react-toastify'


const refreshService = async (setAccessToken, setIsLoading, setUser) => {

    try {
        const result = await fetch(`${apiUrl}/api/auth/refresh`, { method: 'POST', credentials: 'include' })

        const data = await result.json()

        if (!result.ok) {
            setAccessToken(null);
            toast.error(data.message)
            console.log(data.message);
            return;
        }

        setAccessToken(data.accessToken);
        setUser(data.user)
    }
    catch (err) {

        setAccessToken(null)
        console.log(err.message)

    } finally {
        setIsLoading(false)
    }
}

const registerService = async () => {

}

const loginService = async (formData) => {
    const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData })
    })
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message)
    }

    return result
}

const logoutService = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/logout`, { method: 'POST', credentials: 'include' })
        const result = await response.json()
        return result
    }
    catch (err) {
        console.log(err)
    }
}

export {
    refreshService,
    registerService,
    loginService,
    logoutService,
}
