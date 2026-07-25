import express from 'express'
import { createTask, getTask, updateTask, deleteTask } from '../controllers/taskController.js'

const taskRouter = express.Router()

taskRouter.get('/get', getTask)
taskRouter.post('/post', createTask)
taskRouter.delete('/delete', deleteTask)
taskRouter.patch('/update', updateTask)

export default taskRouter