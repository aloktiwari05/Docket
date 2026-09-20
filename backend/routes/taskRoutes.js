import express from 'express'
import { auth } from '../middlewares/authMiddleware.js'
import { createTask, getTasks, updateTask, deleteTask, getStats } from '../controllers/taskController.js'

const taskRoute = express.Router()

taskRoute.get('/get', auth, getTasks)
taskRoute.get('/stats', auth, getStats)
taskRoute.post('/new', auth, createTask)
taskRoute.delete('/delete/:taskid', auth, deleteTask)
taskRoute.patch('/update/:taskid', auth, updateTask)

export default taskRoute