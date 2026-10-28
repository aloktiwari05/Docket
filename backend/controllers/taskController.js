import db from '../config/db.js'

const createTask = async (req, res) => {
    const userId = req.user.id
    const { title, description, priority, due_date = '' } = req.body
    console.log("date : ",due_date)

    try {
        const result = await db.query("INSERT INTO tasks (title, description, priority, due_date, user_id) VALUES ($1, $2,$3, $4, $5) RETURNING task_id, title, description, priority, due_date, status", [title, description, priority, due_date, userId])
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Error while setting up the new task !" })
        }

        const data = result.rows[0]

        console.log(data.due_date)

        return res.status(200).json({ message: "Task created successfully !", data })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error", error: err.message })
    }
}

const getTasks = async (req, res) => {
    const userId = req.user.id;
    const { page = 1 } = req.query;
    const limit = 5;
    const offset = (page - 1) * limit;

    try {
        const result = await db.query('SELECT task_id, title, description, status, priority, due_date FROM tasks WHERE user_id = $1 ORDER BY task_id DESC OFFSET $2 LIMIT $3', [userId, offset, limit])

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No tasks available !', data: [] })
        }
        const data = result.rows
        return res.status(200).json({ message: 'Task fetch successful', data })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal Server Error !' })
    }

}

const updateTask = async (req, res) => {

    const taskId = Number(req.params.taskid)
    const userId = Number(req.user.id)
    const allowedFields = ['title', 'description', 'priority', 'due_date', 'status']

    const task = req.body
    console.log(task)

    const keys = Object.keys(task).filter(key => allowedFields.includes(key))

    if (keys.length === 0) {
        return res.status(400).json({ message: 'No valid fields provided for update !' })
    }

    const values = keys.map(key => task[key])
    const columnsToUpdate = keys.map((key, i) => { return `${key} = $${i + 1}` })
    const setIdNumber = `$${keys.length + 1}`
    const userIdNumber = `$${keys.length + 2}`

    try {
        const result = await db.query(`UPDATE tasks SET ${columnsToUpdate.join(", ")} WHERE task_id = ${setIdNumber} AND user_id = ${userIdNumber} RETURNING task_id, title, description, status, priority, due_date`, [...values, taskId, userId])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Task not found !" })
        }
        res.status(200).json({ message: "Task updated successfully", data: result.rows[0] })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteTask = async (req, res) => {
    const taskId = Number(req.params.taskid);
    const userId = Number(req.user.id)

    try {
        const result = await db.query('DELETE FROM tasks WHERE task_id = $1 AND user_id = $2 ', [taskId, userId])

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Task not found' })
        }
        return res.status(200).json({ message: 'Task Deleted Successfully !' })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const getStats = async (req, res) => {
    const userId = req.user.id

    try {
        const statsResult = await db.query(

            `SELECT 
                COUNT(*) AS total_tasks,
                COUNT(*) FILTER (WHERE status = 'pending') AS pending_tasks,
                COUNT(*) FILTER (WHERE status = 'completed') AS completed_tasks,
                COUNT(*) FILTER (
                    WHERE status != 'completed' 
                    AND due_date < CURRENT_DATE
                ) AS overdue_tasks
             FROM tasks
             WHERE user_id = $1;`,
            [userId]
        )

        const countStats = {
            totalTasks: statsResult.rows[0].total_tasks,
            pendingTasks: statsResult.rows[0].pending_tasks,
            completedTasks: statsResult.rows[0].completed_tasks,
            overdueTasks: statsResult.rows[0].overdue_tasks,

        }

        const { rows: todaysTasks } = await db.query(`SELECT task_id, title, description, status, priority, due_date FROM tasks WHERE user_id = $1 AND due_date = CURRENT_DATE AND status = 'pending'`, [userId])

        const { rows: upcomingTasks } = await db.query(`SELECT task_id, title, description, status, priority, EXTRACT(DAY FROM due_date) AS day, TO_CHAR(due_date, 'Mon') AS month, due_date - CURRENT_DATE AS days_until_due FROM tasks WHERE user_id = $1 AND due_date > CURRENT_DATE AND status = 'pending'`, [userId])
        const totalTasks = Number(countStats.totalTasks)
        const limit = 5
        const pageCount = Math.ceil(totalTasks / limit)

        const data = { ...countStats, upcomingTasks, todaysTasks, pageCount }

        return res.status(200).json({
            message: "Stats fetched successfully !", data
        })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: 'Internal Server Error!' })
    }
}

const searchTask = async (req, res) => {
    const userId = req.user.id
    const { q = "" } = req.query

        const searchQuery = `%${q}%`

    // console.log(searchQuery, typeof searchQuery)

    if (q.length === 0) {
        return res.status(400).json({ message: 'Invalid request !', data: [] })
    }

    try {
        const result = await db.query(`SELECT task_id, title, description, due_date, priority FROM tasks WHERE user_id = $1 AND (CAST(task_id as TEXT) ILIKE $2 OR title ILIKE $2 OR description ILIKE $2)`, [userId, searchQuery])
        if (result.rows.length === 0) {
            return res.status(200).json({ message: 'No task found !', data: [] })
        }
        return res.status(200).json({ message: 'Here are your search results !', data: result.rows })
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getStats,
    searchTask
}