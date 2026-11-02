import { apiUrl } from "../api/api.js";
import { toast } from 'react-toastify';

const createTaskService = async (taskDraft, token) => {
    try {
        const response = await fetch(`${apiUrl}/api/tasks/new`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskDraft),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Failed to create task");
        }

        toast.success(result.message || "Task created successfully!");
        return result.data;
    } catch (err) {
        toast.error(err.message || "Failed to create task");
        throw err;
    }
};

const fetchTasksService = async (token, page = 1) => {
    try {
        const response = await fetch(`${apiUrl}/api/tasks/get?page=${page}`, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        const result = await response.json();

        // 404 or empty is not a system failure - user simply has no tasks
        if (response.status === 404) {
            return { data: [], message: result.message || "No tasks available" };
        }

        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch tasks");
        }

        return { data: result.data || [], message: result.message };
    } catch (err) {
        console.error("fetchTasksService error:", err.message);
        return { data: [] };
    }
};

const updateTaskService = async (token, task_id, task) => {
    try {
        const response = await fetch(`${apiUrl}/api/tasks/update/${task_id}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to update task");
        }

        toast.success(result.message || "Task updated successfully!");
        return result;
    } catch (err) {
        toast.error(err.message || "Failed to update task");
        throw err;
    }
};

const deleteTaskService = async (token, task_id) => {
    try {
        const response = await fetch(`${apiUrl}/api/tasks/delete/${task_id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to delete task");
        }

        toast.success(result.message || "Task deleted successfully!");
        return result;
    } catch (err) {
        toast.error(err.message || "Failed to delete task");
        throw err;
    }
};

const fetchStatsService = async (token) => {
    try {
        const response = await fetch(`${apiUrl}/api/tasks/stats`, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch stats");
        }

        return result.data;
    } catch (err) {
        console.error("Stats fetch error:", err.message);
        return null;
    }
};

const searchTasksService = async (token, search) => {
    try {
        const params = new URLSearchParams({ q: search });

        const response = await fetch(`${apiUrl}/api/tasks/search?${params}`, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Failed to search tasks");
        }

        return result;
    } catch (err) {
        console.error("searchTasksService error:", err.message);
        throw err;
    }
};

export {
    createTaskService,
    fetchTasksService,
    updateTaskService,
    deleteTaskService,
    fetchStatsService,
    searchTasksService,
};
