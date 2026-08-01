import express from 'express'
import { auth } from '../middlewares/authMiddleware.js'
import { createTask, getTask, updateTask, deleteTask } from '../controllers/taskController.js'

const taskRouter = express.Router()

taskRouter.get('/get', auth, getTask)
taskRouter.post('/new', auth, createTask)
taskRouter.delete('/delete', auth, deleteTask)
taskRouter.patch('/update', auth, updateTask)

export default taskRouter