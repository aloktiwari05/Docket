import cookie from 'cookie-parser'
import jwt from 'jsonwebtoken'
import db from '../config/db.js'

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15min' })
}

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' })
}

const saveRefreshToken = async (userId, token) => {
        const response = await db.query('UPDATE users SET refresh_token = ($1) WHERE id = ($2) RETURNING id, username, email, refresh_token', [token, userId])
        // console.log('generated token: ',response.rows[0].refresh_token)
        return response.rows[0]
}

const setRefreshTokenCookie = (res, refreshToken) => {
    return res.cookie('refreshToken',refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV == 'development',
        sameSite: "lax",
        maxAge: 7*24*60*60*1000,
    })
}

export {
    generateAccessToken,
    generateRefreshToken,
    saveRefreshToken,
    setRefreshTokenCookie,
}