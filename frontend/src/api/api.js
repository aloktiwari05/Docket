const apiUrl = import.meta.env.VITE_API_URL;

export {
    apiUrl,
}



// const fetchUser = async (accessToken, setAccessToken, setIsLoading) => {
//     try {

//         const result = await fetch(`${apiUrl}/api/getUser`, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             },
//             credentials: 'include'
//         })

//         const response = await result.json();
//         if (response.message === 'TokenExpiredError') {
//             refresh(setAccessToken, setIsLoading)
//         }
//         fetchUser()
//     }
//     catch (err) {
//         console.log(err)
//     }
// }
