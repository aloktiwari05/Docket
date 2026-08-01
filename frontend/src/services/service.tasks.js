import { apiUrl } from "../api/api.js";

const createTask = async (task, token) => {


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
        // throw err; // Optional: rethrow if the caller should handle it
    }
};

export { createTask };