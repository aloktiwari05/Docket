import db from '../config/db.js'

const createTask = async ( req, res) => {
    // console.log(req.body, req.user)
    const userId = req.user.id
    const { title, description, priority, dueDate } = req.body

    try{
        const result = await db.query("INSERT INTO tasks (title, description, priority, due_date, user_id) VALUES ($1, $2,$3, $4, $5) RETURNING *", [title, description, priority, dueDate, userId] )
        if(result.rows.length === 0){
            return res.status(401).json({message: "Error while setting up the new task !"})
        }

        return res.status(200).json({message: "Task created successfully !"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal Server Error", error: err.message})
    }
    return res.status(200).json({ message: 'All good !'})
}

const getTask = async () =>{

}

const updateTask = async () => {

} 

const deleteTask = async () => {

} 

export {
    createTask,
    getTask,
    updateTask,
    deleteTask
}