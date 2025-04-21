import { drizzle } from 'drizzle-orm/postgres-js'
import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import {cors} from 'hono/cors'

export const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>().basePath('/api/v1')

export const db= drizzle(process.env.DATABASE_URL!)

app.use(cors())

app.route('/user', userRouter)
app.route('/blog',blogRouter)


export default app
