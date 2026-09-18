import { apiUrl } from "../api/api.js";
import { toast } from 'react-toastify'

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

        console.log("Task created successfully:", result);

        toast.success(result.message)

        return result.data;
    } catch (err) {
        toast.error(err)
    }
};

const fetchTasksService = async (token, page) => {
    try {
        const response = await fetch(`${apiUrl}/api/tasks/get?page=${page}`, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })

        const result = await response.json()

        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch tasks")
        }

        return result
    }
    catch (err) {
        toast.error(err.message)
        console.log(err)
    }
}

const updateTaskService = async (token, task_id, task) => {

    try {
        const response = await fetch(`${apiUrl}/api/tasks/update/${task_id}`,
            {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task)
            })

        const result = await response.json()
        toast.success(result.message)

        if (response.ok) {
            return result
        }
    }
    catch (err) {
        toast.error(err.message)
        console.log(err)
    }
}

const deleteTaskService = async (token, task_id) => {
    try {
        const response = await fetch(`${apiUrl}/api/tasks/delete/${task_id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const result = await response.json()
        toast.success(result.message)

        if (!response.ok) {
            toast.error(result.message)
            throw new Error(result.message || "Failed to delete the task");
        }
    }
    catch (err) {
        toast.error(err.message)
        console.log(err)
    }
}



export {
    createTaskService,
    fetchTasksService,
    updateTaskService,
    deleteTaskService,
};