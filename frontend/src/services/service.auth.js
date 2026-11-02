import { apiUrl } from '../api/api.js'

const refreshService = async (setAccessToken, setIsLoading, setUser) => {
    try {
        const result = await fetch(`${apiUrl}/api/auth/refresh`, {
            method: 'POST',
            credentials: 'include'
        });

        const data = await result.json();

        if (!result.ok) {
            setAccessToken(null);
            setUser(null);
            return;
        }

        setAccessToken(data.accessToken);
        setUser(data.user);
    } catch (err) {
        setAccessToken(null);
        setUser(null);
        console.error("Refresh token error:", err.message);
    } finally {
        setIsLoading(false);
    }
};

const registerService = async (formData) => {
    const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
    }

    return data;
};

const loginService = async (formData) => {
    const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || 'Invalid email/username or password');
    }

    return result;
};

const logoutService = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        const result = await response.json();
        return result;
    } catch (err) {
        console.error("Logout error:", err);
        return { message: "Logged out" };
    }
};

export {
    refreshService,
    registerService,
    loginService,
    logoutService,
}
