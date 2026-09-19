import express from 'express';
import {login, signup, refresh, getUser, logout} from '../controllers/authController.js'
import {auth} from '../middlewares/authMiddleware.js'

const userRoute = express.Router();

userRoute.post('/login', login)
userRoute.post('/signup', signup)
userRoute.post('/refresh', refresh)
userRoute.get('/getuser', auth, getUser)
userRoute.post('/logout', logout)

export default userRoute