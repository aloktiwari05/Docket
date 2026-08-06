import { useState, createContext, useContext, useEffect } from "react";
import { fetchTasksService, createTaskService } from '../services/service.tasks.js'
import { useAuth } from '../context/authContext.jsx'

const TaskContext = createContext()
const TaskProvider = ({ children }) => {

    // const [isFetching, setIsFetching] = useState(true)
    const { accessToken } = useAuth()
    const [task, setTask] = useState({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
    });

    const createTask = async () =>{
        await createTaskService(task, accessToken)
    }

    useEffect(() => {

        if (!accessToken) return;
        fetchTasksService(accessToken, setTask)

    }, [accessToken, task])

    return (
        <TaskContext.Provider value={{ task, setTask, createTask }}>
            {children}
        </TaskContext.Provider>
    )
}

const useTasks = () => {
    const context = useContext(TaskContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

export {
    TaskProvider,
    useTasks
}