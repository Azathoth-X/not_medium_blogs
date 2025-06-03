import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';
import * as postSchema from './db/schemas/post';
import * as userSchema from './db/schemas/user';
import { Frontend } from './config';

function dbBindingType(connectionString : string){
  const client = postgres(connectionString, { 
      max: 1,               
      idle_timeout: 10,     
      connect_timeout: 10   
    });
  return drizzle(client, {
    schema: {
      ...postSchema,
      ...userSchema
    }
  });
}

export type RootVariables={
    db: ReturnType<typeof dbBindingType>
}


export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: RootVariables
}>().basePath('/api/v1');


app.use(cors({
  origin: [Frontend, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  exposeHeaders: ['Content-Length', 'Content-Type'],
  credentials: true,
  maxAge: 600
}));

app.use('*',async(c,next)=>{
  try {
    const client = postgres(c.env.DATABASE_URL, { 
      max: 1,               
      idle_timeout: 10,     
      connect_timeout: 10, 
      prepare: false,     
      debug: false       
    });
    
    const db = drizzle(client, {
      schema: {
        ...postSchema,
        ...userSchema
      }
    });
    
    c.set("db", db);
    
    try {
      await next();
    } finally {
      // Always ensure connection is closed
      await client.end({ timeout: 5 });
    }
  } catch (error) {
    console.error("Database connection error:", error);
    return c.json({ error: "Database connection failed" }, 500);
  }
})

app.route('/user', userRouter);
app.route('/blog', blogRouter);

export default app;
