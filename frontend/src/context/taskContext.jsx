import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { fetchTasksService, createTaskService, deleteTaskService, updateTaskService,fetchStatsService } from '../services/service.tasks.js'
import { useAuth } from '../context/authContext.jsx'
// import { toast } from 'react-toastify'

const TaskContext = createContext()
const TaskProvider = ({ children }) => {

    const { accessToken } = useAuth()
    const [allTasks, setAllTasks] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [taskDraft, setTaskDraft] = useState({
        title: "",
        description: "",
        priority: "medium",
        due_date: "",
    });

    const [stats, setStats] = useState({
        totalTasks : "",
        pendingTasks : "",
        completedTasks : "",
        overdueTasks : "",
        pageCount : "",
    })

    console.log(stats)

    const fetchTotalStats = useCallback(async () => {
        const result = await fetchStatsService(accessToken)
        setStats(prev => ({...prev, ...result}))

    },[accessToken])

    const fetchTasks = useCallback(async () => {
        const result = await fetchTasksService(accessToken, pageNumber)
        const fetchedTasks = result.data
        setAllTasks([...fetchedTasks])
    },[accessToken, pageNumber])

    const createTask = async () => {
        await createTaskService(taskDraft, accessToken)
        await fetchTasks()
        await fetchTotalStats()
    }

    const deleteTask = async (taskID) => {
        await deleteTaskService(accessToken, taskID)
        setAllTasks((prev) => (prev.filter(t => t.task_id !== taskID)))
        await fetchTasks()
        await fetchTotalStats()
    }

    const updateTask = async (taskID, task) => {

        try {
            const result = await updateTaskService(accessToken, taskID, task)
            const data = result.data
            setAllTasks(prev => prev.map(task => (task.task_id === data.task_id ? { ...prev, ...data } : task)))
            await fetchTasks()
            await fetchTotalStats()
        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        if (!accessToken) return;
        fetchTasks()
        fetchTotalStats()
    }, [accessToken, fetchTasks, fetchTotalStats])

    return (
        <TaskContext.Provider value={{ taskDraft, setTaskDraft, createTask, allTasks, deleteTask, updateTask, pageNumber, setPageNumber, stats, setStats }}>
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