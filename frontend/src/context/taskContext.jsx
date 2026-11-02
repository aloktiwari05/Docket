import { useState, createContext, useContext, useEffect, useCallback } from "react";
import {
    fetchTasksService,
    createTaskService,
    deleteTaskService,
    updateTaskService,
    fetchStatsService,
    searchTasksService
} from '../services/service.tasks.js';
import { useAuth } from '../context/authContext.jsx';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const { accessToken } = useAuth();
    const [allTasks, setAllTasks] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [editTask, setEditTask] = useState(null);
    const [isLoadingTasks, setIsLoadingTasks] = useState(false);

    const [stats, setStats] = useState({
        totalTasks: 0,
        pendingTasks: 0,
        completedTasks: 0,
        overdueTasks: 0,
        pageCount: 0,
        todaysTasks: [],
        upcomingTasks: [],
    });

    const fetchTotalStats = useCallback(async () => {
        if (!accessToken) return;
        const data = await fetchStatsService(accessToken);
        if (data) {
            setStats(prev => ({ ...prev, ...data }));
        }
    }, [accessToken]);

    const fetchTasks = useCallback(async () => {
        if (!accessToken) return;
        setIsLoadingTasks(true);
        try {
            const result = await fetchTasksService(accessToken, pageNumber);
            const fetchedTasks = result?.data || [];
            setAllTasks(fetchedTasks);
        } catch (err) {
            console.error("fetchTasks error:", err);
            setAllTasks([]);
        } finally {
            setIsLoadingTasks(false);
        }
    }, [accessToken, pageNumber]);

    const createTask = async (task) => {
        try {
            await createTaskService(task, accessToken);
            await fetchTasks();
            await fetchTotalStats();
            return true;
        } catch (err) {
            console.error("createTask failed:", err);
            return false;
        }
    };

    const deleteTask = async (taskID) => {
        try {
            await deleteTaskService(accessToken, taskID);
            await fetchTasks();
            await fetchTotalStats();
            return true;
        } catch (err) {
            console.error("deleteTask failed:", err);
            return false;
        }
    };

    const updateTask = async (taskID, task) => {
        try {
            await updateTaskService(accessToken, taskID, task);
            await fetchTasks();
            await fetchTotalStats();
            return true;
        } catch (err) {
            console.error("updateTask failed:", err);
            return false;
        }
    };

    const searchTasks = useCallback(async (search) => {
        if (!accessToken) return [];
        try {
            const result = await searchTasksService(accessToken, search);
            return result.data || [];
        } catch (err) {
            console.error("searchTasks error:", err);
            return [];
        }
    }, [accessToken]);

    const toggleStatus = async (task) => {
        if (!task || !task.task_id) return false;
        const newStatus = task.status === "completed" ? { status: "pending" } : { status: "completed" };
        return await updateTask(task.task_id, newStatus);
    };

    useEffect(() => {
        if (!accessToken) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTasks();
        fetchTotalStats();
    }, [accessToken, fetchTasks, fetchTotalStats]);

    return (
        <TaskContext.Provider value={{
            createTask,
            allTasks,
            deleteTask,
            updateTask,
            pageNumber,
            setPageNumber,
            stats,
            editTask,
            setEditTask,
            searchTasks,
            toggleStatus,
            isLoadingTasks,
            fetchTasks,
            fetchTotalStats
        }}>
            {children}
        </TaskContext.Provider>
    );
};

const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }

    return context;
};

export {
    TaskProvider,
    // eslint-disable-next-line react-refresh/only-export-components
    useTasks
};
