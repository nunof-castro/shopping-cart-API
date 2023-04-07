import { DataSource } from "typeorm";
import "dotenv/config"
import "reflect-metadata"

const port = process.env.DB_PORT as number | undefined

export const AppDataSource = new DataSource({
    type:"mysql",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities:[`${__dirname}/**/model/*.ts`]
})