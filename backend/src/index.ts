import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';
import * as postSchema from './db/schemas/post';
import * as userSchema from './db/schemas/user';
import { Frontend } from './config';

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>().basePath('/api/v1');

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, {
  schema: {
    ...postSchema,
    ...userSchema
  }
});

app.use(cors({
  origin: [Frontend, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  exposeHeaders: ['Content-Length', 'Content-Type'],
  credentials: true,
  maxAge: 600
}));

app.route('/user', userRouter);
app.route('/blog', blogRouter);

export default app;
