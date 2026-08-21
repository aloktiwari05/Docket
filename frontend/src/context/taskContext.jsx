import { useState, createContext, useContext, useEffect } from "react";
import { fetchTasksService, createTaskService, deleteTaskService, updateTaskService } from '../services/service.tasks.js'
import { useAuth } from '../context/authContext.jsx'

const TaskContext = createContext()
const TaskProvider = ({ children }) => {

    // const [isFetching, setIsFetching] = useState(true)
    const { accessToken } = useAuth()
    const [taskDraft, setTaskDraft] = useState({
        title: "",
        description: "",
        priority: "medium",
        due_date: "",
    });

    const [allTasks, setAllTasks] = useState([])

    console.log(allTasks)

    const createTask = async () => {
        const newTask = await createTaskService(taskDraft, accessToken)
        setAllTasks(prev => ([...prev, newTask]))
    }

    const deleteTask = async (taskID) => {
        await deleteTaskService(accessToken, taskID)
        setAllTasks((prev) => (prev.filter(t => t.task_id !== taskID)))
    }

    const updateTask = async (taskID, task) => {

        try {
            const result = await updateTaskService(accessToken, taskID, task)
            const data = result.data
            // console.log(data)
            setAllTasks(prev =>prev.map( task => ( task.task_id === data.task_id ? {...prev, ...data} : task)) )

        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {

        if (!accessToken) return;
        fetchTasksService(accessToken, setAllTasks)

    }, [accessToken])

    return (
        <TaskContext.Provider value={{ taskDraft, setTaskDraft, createTask, allTasks, deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    )
}

const useTasks = () => {
    const context = useContext(TaskContext)

    if (!context) {
        throw new Error('useTask must be used within an TaskProvider')
    }

    return context
}

export {
    TaskProvider,
    useTasks
}