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
            const refreshToken = generateRefreshToken(id)
            const response = await saveRefreshToken(id, refreshToken)
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
        return res.status(400).json({ message: "Password should be minimum of 8 characters" })
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
                return res.status(409).json({ message: 'Username already exists !' })
            }

            if (err.constraint == 'users_email_key') {
                return res.status(409).json({ message: 'Email already exists !' })
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

        const { id, email, username, refresh_token } = data.rows[0]

        if (refresh_token !== refreshToken) {

            return res.status(401).json({ message: 'Invalid credentials ! Kindly Login again' })
        }

        const accessToken = generateAccessToken(id)
        const newRefreshToken = generateRefreshToken(id)

        const updatedUser = await db.query('UPDATE users SET refresh_token = ($1) WHERE id = ($2) AND refresh_token = ($3) RETURNING id, username, email, refresh_token', [newRefreshToken, id, refreshToken])

        if (updatedUser.rows.length === 0 ) {
            return res.status(401).json({
                message: "Refresh token is no longer valid. Please authenticate again !"
            });
        }

        setRefreshTokenCookie(res, newRefreshToken)
        return res.status(200).json({ message: 'success !', user: { id, username, email}, accessToken })

    } catch (err) {

        console.log(err)
        if (err.name === "TokenExpiredError") {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                path: "/"
            });

            return res.status(401).json({
                message: "Refresh token expired. Please log in again."
            });
        }

        if (err.name === "JsonWebTokenError") {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                path: "/"
            });

            return res.status(401).json({
                message: "Invalid refresh token. Please log in again."
            });
        }

        console.error("Refresh failed:", err.message);

        return res.status(500).json({
            message: "Internal server error."
        });
    }

}

const getUser = async (req, res) => {
    const userId = req.user.id;
    console.log(userId)
    try {
        const result = await db.query('SELECT username, email FROM users WHERE id = ($1)', [userId])
        if (!result) {
            return res.status(404).json({ message: 'User Not found !' })
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
        const refreshToken = req.cookies?.refreshToken;
        if (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
                if (decoded?.id) {
                    await db.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [null, decoded.id]);
                }
            } catch (err) {
                // Ignore token decode error during logout
            }
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });

        return res.status(200).json({ message: 'User Logged out successfully !' });
    } catch (err) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });
        return res.status(200).json({ message: 'User Logged out successfully !' });
    }
}

export {
    login,
    signup,
    refresh,
    getUser,
    logout,
}