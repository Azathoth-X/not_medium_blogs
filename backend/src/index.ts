import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';
import * as postSchema from './db/schemas/post';
import * as userSchema from './db/schemas/user';

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

app.use(cors());

app.route('/user', userRouter);
app.route('/blog', blogRouter);

export default app;
