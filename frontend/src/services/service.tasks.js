import { apiUrl } from "../api/api.js";

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
        return result.data;
    } catch (err) {
        console.log("Error creating task:", err);
    }
};

const fetchTasksService = async (token, setAllTasks) => {
    try {
        const response = await fetch(`${apiUrl}/api/tasks/get`, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })

        const result = await response.json()

            const fetchedTasks = result.data
            const fixedTasks = fetchedTasks.map((task)=>({ ...task, due_date: task.due_date ? task.due_date.split('T')[0] : ''}))
            setAllTasks([...fixedTasks])
    }
    catch (err) {
        console.log(err)
    }
}

const deleteTaskService = async (token, task_id) => {
    try{
        const response = await fetch(`${apiUrl}/api/tasks/delete/${task_id}`,{
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const result = await response.json()

        if(!response.ok){
            throw new Error(result.message || "Failed to delete the task");
        }
        console.log(result)
    }
    catch(err){
        console.log(err)
    }
}

export {
    createTaskService,
    fetchTasksService,
    deleteTaskService,
};