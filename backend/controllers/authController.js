import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateAccessToken, generateRefreshToken, saveRefreshToken, setRefreshTokenCookie } from '../utils/authUtils.js'

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS)

// Login POST route

const login = async (req, res) => {
    const formData = req.body;

    try {
        const result = await db.query('SELECT id, email, username, password_hash FROM users WHERE email = ($1) or username = ($1)', [formData.identifier])

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email/username or password." })
        }

        const { id, username, email, password_hash } = { ...result.rows[0] }
        const isMatch = await bcrypt.compare(formData.password, password_hash)

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email/username or password." })
        }
        else {
            const accessToken = generateAccessToken(id)
            console.log(accessToken)
            const refreshToken = generateRefreshToken(id)
            const response = await saveRefreshToken(id, refreshToken)
            console.log('stored token : ', refreshToken)
            setRefreshTokenCookie(res, refreshToken)
            return res.status(201).json({ message: 'User Logged In Successfully', user: { id, username, email }, accessToken })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error !' })
    }
}

// Register POST route

const signup = async (req, res) => {

    if (!req.body) {
        return res.status(400).json({ error: 'Form Data is REQUIRED !' })
    }

    const formData = req.body;

    if (formData.password.length < 8) {
        return res.status(400).json({ error: "Password should be minimum of 8 characters" })
    }
    try {
        const hash = await bcrypt.hash(formData.password, saltRounds)

        const result = await db.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)  RETURNING id, username, email', [formData.username, formData.email, hash])

        const accessToken = generateAccessToken(result.rows[0].id)
        console.log('access token : ', accessToken)
        console.log('user : ', result.rows[0])
        const refreshToken = generateRefreshToken(result.rows[0].id)
        console.log('access token : ', accessToken)

        const response = await saveRefreshToken(result.rows[0].id, refreshToken)

        setRefreshTokenCookie(res, refreshToken)

        res.status(201).json({ message: 'User Created Successfully', user: response, accessToken })
    }
    catch (err) {

        console.log(err)
        if (err.code == '23505') {

            if (err.constraint == 'users_username_key') {
                return res.status(409).json({ error: 'Username already exists !' })
            }

            if (err.constraint == 'users_email_key') {
                return res.status(409).json({ error: 'Email already exists !' })
            }

        }

        return res.status(500).json({ message: 'Internal Server Error !' })
    }
}

const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token missing",
            });
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

        const data = await db.query('SELECT id, username, email, refresh_token FROM users WHERE id = $1', [decoded.id])
        if (data.rows.length === 0) {
            return res.status(404).json({ message: 'Invalid access attempt' })
        }

        const { id, username, email, refresh_token } = data.rows[0]

        if (refresh_token !== refreshToken) {
            // console.log('refresh token: ',refreshToken, 'db token: ', refresh_token)
            return res.status(401).json({ message: 'Invalid credentials ! Kindly Login again' })
        }

        const accessToken = generateAccessToken(id)
        const newRefreshToken = generateRefreshToken(id)
        await saveRefreshToken(id, newRefreshToken)

        setRefreshTokenCookie(res, newRefreshToken)
        return res.status(200).json({ message: 'success !', user: { id, username, email }, accessToken })

    } catch (err) {

        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
        });

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Refresh token expired. Please Login again !' })
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid refresh token !' })
        }
        res.status(500).json({ message: 'Internal Server Error !' })
    }

}

const getUser = async (req, res) => {
    const userId = req.user.id;
    console.log(userId)
    try {
        const result = await db.query('SELECT username, email FROM users WHERE id = ($1)', [userId])
        if (!result) {
            return res.stauts(404).json({ message: 'User Not found !' })
        }
        res.status(201).json({ user: result.rows[0] })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

const logout = async (req, res) => {

    try {
        const refreshToken = req.cookies?.refreshToken

        if (!refreshToken) {
            return res.status(401).json({ message: 'Invalid unauthorized attempt !' })
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        const { id } = decoded
        console.log(decoded, id)

        const result = await db.query('SELECT id, username FROM users WHERE id = $1 AND refresh_token = $2', [id, refreshToken])

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Unauthorized user !' })
        }

        const revoke = await db.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [null, id])
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
        });

        return res.status(200).json({ message: 'User Logged out successfully !' })
    } catch (err) {
        if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        return res.status(500).json({ message: err.message });
    }
}

export {
    login,
    signup,
    refresh,
    getUser,
    logout,
}