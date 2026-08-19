import express from 'express'
import { auth } from '../middlewares/authMiddleware.js'
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js'

const taskRouter = express.Router()

taskRouter.get('/get', auth, getTasks)
taskRouter.post('/new', auth, createTask)
taskRouter.delete('/delete/:taskid', auth, deleteTask)
taskRouter.patch('/update/:taskid', auth, updateTask)

export default taskRouter