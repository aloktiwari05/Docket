import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { fetchTasksService, createTaskService, deleteTaskService, updateTaskService } from '../services/service.tasks.js'
import { useAuth } from '../context/authContext.jsx'
// import { toast } from 'react-toastify'

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
    const [page, setPage] = useState(1)

    console.log(allTasks)

    const fetchTasks = useCallback(async () => {
        const result = await fetchTasksService(accessToken, page)
        const fetchedTasks = result.data
        setAllTasks([...fetchedTasks])
    },[accessToken, page])

    const createTask = async () => {
        await createTaskService(taskDraft, accessToken)
        await fetchTasks()
    }

    const deleteTask = async (taskID) => {
        await deleteTaskService(accessToken, taskID)
        setAllTasks((prev) => (prev.filter(t => t.task_id !== taskID)))
        await fetchTasks()
    }

    const updateTask = async (taskID, task) => {

        try {
            const result = await updateTaskService(accessToken, taskID, task)
            const data = result.data
            setAllTasks(prev => prev.map(task => (task.task_id === data.task_id ? { ...prev, ...data } : task)))
            await fetchTasks()
        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        if (!accessToken) return;
        fetchTasks()

    }, [accessToken, fetchTasks,])

    return (
        <TaskContext.Provider value={{ taskDraft, setTaskDraft, createTask, allTasks, deleteTask, updateTask, page, setPage }}>
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