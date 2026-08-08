import db from '../config/db.js'

const createTask = async (req, res) => {
    // console.log(req.body, req.user)
    const userId = req.user.id
    const { title, description, priority, dueDate } = req.body
    const dbDueDate = dueDate === "" ? null : dueDate;

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
        console.log(data)
        return res.status(200).json({ message: 'Task fetch successful', data })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Internal Server Error !'})

    }

}

const updateTask = async () => {

}

const deleteTask = async () => {

}

export {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}