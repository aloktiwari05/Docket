import {apiUrl} from '../api/api.js'

const refreshService = async (setAccessToken, setIsLoading, setUser) => {

    try {
        const result = await fetch(`${apiUrl}/api/auth/refresh`, { method: 'POST', credentials: 'include' })

        const data = await result.json()

        if (!result.ok) {
            setAccessToken(null);
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

const logoutService = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/logout`, { method: 'POST', credentials: 'include'})
        const result = await response.json()
        return result
    }
    catch (err) {
        console.log(err)
    }
}

export{
    refreshService,
    logoutService,
}
