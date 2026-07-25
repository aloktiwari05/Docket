import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOption = {origin: process.env.ORIGIN, credentials: true,}

app.use(express.json())
app.use(cors(corsOption))
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/tasks', taskRoutes)

app.get('/', (req,res) => {
    res.json({message: "Hello Developer"})
})

const startServer = () =>{
    try{
    app.listen(port, (req,res)=>{
    console.log(`Server listening on http://localhost:${port}`)
})

}catch(err){
    console.log(err)
}}


startServer();
