import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const types = pg.types
types.setTypeParser(1082, function (val) { return val; });

types.setTypeParser(1700, function (val) {
    return parseFloat(val);
});

types.setTypeParser(20, function (val) {
    return parseInt(val, 10)
});

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL || undefined,

    // Local database settings (used when DATABASE_URL is not set)
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME || 'todoapp',

    // Neon requires an encrypted connection.
    ssl: process.env.DATABASE_URL
        ? { rejectUnauthorized: false }
        : false
})

await db.connect();

export default db;

