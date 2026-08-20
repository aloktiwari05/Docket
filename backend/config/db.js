import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const types = pg.types
types.setTypeParser(1082, function(val) { return val; });

const db = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: 'todoapp'
})

await db.connect();

export default db;

