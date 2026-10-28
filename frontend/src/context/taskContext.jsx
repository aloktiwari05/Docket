import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { fetchTasksService, createTaskService, deleteTaskService, updateTaskService,fetchStatsService } from '../services/service.tasks.js'
import { useAuth } from '../context/authContext.jsx'
import { searchTasksService } from "../services/service.tasks.js";
// import { toast } from 'react-toastify'

const TaskContext = createContext()
const TaskProvider = ({ children }) => {

    const { accessToken } = useAuth()
    const [allTasks, setAllTasks] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [editTask, setEditTask] = useState(null)

    const [taskDraft, setTaskDraft] = useState({ title: "", description: "", priority: "medium", due_date: null});

    const [stats, setStats] = useState({
        totalTasks : 0,
        pendingTasks : 0,
        completedTasks : 0,
        overdueTasks : 0,
        pageCount : 0,
        todaysTasks : [],
        upcomingTasks : [],
    })


    const fetchTotalStats = useCallback(async () => {
        const data = await fetchStatsService(accessToken)
        setStats(prev => ({...prev, ...data}))
    },[accessToken])

    const fetchTasks = useCallback(async () => {
        const result = await fetchTasksService(accessToken, pageNumber)
        const fetchedTasks = result.data
        setAllTasks(fetchedTasks)
    },[accessToken, pageNumber])

    const createTask = async () => {
        await createTaskService(taskDraft, accessToken)
        await fetchTasks()
        await fetchTotalStats()
    }

    const deleteTask = async (taskID) => {
        await deleteTaskService(accessToken, taskID)
        // setAllTasks((prev) => (prev.filter(t => t.task_id !== taskID)))
        await fetchTasks()
        await fetchTotalStats()
    }

    const updateTask = async (taskID, task) => {

        try {
            await updateTaskService(accessToken, taskID, task)
            await fetchTasks()
            await fetchTotalStats()
        }
        catch (err) {
            console.log(err)
        }

    }

    const searchTasks = useCallback(async (search) => {
        if(!accessToken) return;
        const result = await searchTasksService(accessToken, search)
        return result.data
    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTasks()
        fetchTotalStats()
    }, [accessToken, fetchTasks, fetchTotalStats])

    return (
        <TaskContext.Provider value={{ taskDraft, setTaskDraft, createTask, allTasks, deleteTask, updateTask, pageNumber, setPageNumber, stats, editTask, setEditTask, searchTasks }}>
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
    // eslint-disable-next-line react-refresh/only-export-components
    useTasks
}