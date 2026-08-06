import { apiUrl } from "../api/api.js";

const createTaskService = async (task, token) => {


    try {
        const response = await fetch(`${apiUrl}/api/tasks/new`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to create task");
        }

        console.log("Task created successfully:", result);
        return result;
    } catch (err) {
        console.log("Error creating task:", err);
    }
};

const fetchTasksService = async (token, setTask) => {
    try {
        const response = await fetch(`${apiUrl}/api/tasks/get`, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })

        const result = await response.json()
        console.log(result, result.data)

        if (result.ok) {
            const fetchedTasks = result.data
            setTask({ ...fetchedTasks })
        }
    }
    catch (err) {
        console.log(err)
    }
}

export {
    createTaskService,
    fetchTasksService,
};