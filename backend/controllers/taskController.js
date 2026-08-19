import db from '../config/db.js'

const createTask = async (req, res) => {
    // console.log(req.body, req.user)
    const userId = req.user.id
    const { title, description, priority, dueDate } = req.body
    console.log(req.body)
    const dbDueDate = dueDate === "" ? null : dueDate;
    // console.log(dbDueDate)

    try {
        const result = await db.query("INSERT INTO tasks (title, description, priority, due_date, user_id) VALUES ($1, $2,$3, $4, $5) RETURNING *", [title, description, priority, dbDueDate, userId])
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Error while setting up the new task !" })
        }

        const data = result.rows[0]

        return res.status(200).json({ message: "Task created successfully !", data })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error", error: err.message })
    }
    return res.status(200).json({ message: 'All good !' })
}

const getTasks = async (req, res) => {
    const userId = req.user.id

    try {
        const result = await db.query('SELECT * FROM tasks WHERE user_id = $1', [userId])

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No tasks available !' })
        }

        const data = result.rows
        const newDate = data.map((d) => (new Date(d.due_date)))
        // console.log(newDate)
        // console.log(data)
        return res.status(200).json({ message: 'Task fetch successful', data })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error !' })

    }

}

const updateTask = async (req, res) => {

    const taskID = Number(req.params.taskid)
    const userID = Number(req.user.id)
    const allowedFields = ['title', 'description', 'priority', 'due_date']

    const task = req.body
    console.log(task, req.body)

    const keys = Object.keys(task).filter(key => allowedFields.includes(key))

    if (keys.length === 0) {
        return res.status(400).json({ message: 'No valid fields provided for update !' })
    }

    const values = keys.map(key => task[key])
    const columnsToUpdate = keys.map((key, i) => { return `${key} = $${i + 1}` })
    const setIdNumber = `$${keys.length + 1}`
    const userIdNumber = `$${keys.length + 2}`
    console.log(columnsToUpdate)

    try {
        const result = await db.query(`UPDATE tasks SET ${columnsToUpdate.join(", ")} WHERE task_id = ${setIdNumber} AND user_id = ${userIdNumber} RETURNING *`, [...values, taskID, userID])
        console.log(result.rows)
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Task not found !" })
        }
        res.status(200).json({ message: "Task updated successfully", data: result.rows })
    }
    catch (err) {
        res.status(500).json({ message: err })
    }
}

const deleteTask = async (req, res) => {
    const taskID = Number(req.params.taskid);

    try {
        const result = await db.query('DELETE FROM tasks WHERE task_id = $1', [taskID])

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Task not found' })
        }
        console.log(result)
        return res.status(200).json({ message: 'Task Deleted Successfully !' })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

export {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}