import { apiUrl } from "../api/api.js";

const createTask = async (task) => {
    try {
        const response = await fetch(`${apiUrl}/api/tasks/createTask`, {
            method: "POST",
            headers: {
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
        console.error("Error creating task:", err.message);
        throw err; // Optional: rethrow if the caller should handle it
    }
};

export { createTask };