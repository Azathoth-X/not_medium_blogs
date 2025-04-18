import { Hono } from "hono"
import {sign, verify} from "hono/jwt"
import { eq } from "drizzle-orm"
import { app, db } from ".."
import { postRelation, postTable } from "../db/schemas/post"
import { JWTPayload } from "hono/utils/jwt/types"

type Variables={
  authorId: string
}

export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  },
  Variables:Variables
}>()

interface CustomJWTPayload extends JWTPayload {
  id: string
}

type inferInsert = typeof postTable.$inferInsert
type inputBlog = Omit<inferInsert, 'id' >

blogRouter.use("/blog/*", async (c, next) => {
  try {
    const dead = c.req.header("Authorization") || "";
    if (!dead) {
      return c.json({ error: "Authorization header missing" }, 401);
    }

    const header = dead.split(" ")[1];
    if (!header) {
      return c.json({ error: "Invalid Authorization format" }, 401);
    }

    const response = await verify(header, c.env.JWT_SECRET) as CustomJWTPayload;
    
    if (!response.id) {
      return c.json({ error: "Invalid token payload" }, 401);
    }

    c.set("authorId", response.id);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
})

blogRouter.post('/blog', async (c) => {

    const body:inputBlog = await c.req.json()
    body.authorId= c.get("authorId")
    body.published=true

    const insertReturn = await db.insert(postTable).values(body).returning()

    const blog =insertReturn[0]

    return c.redirect(`/blog/${blog.id}`) 
})

blogRouter.get('/blog/:id', async (c) => {

  const id =c.req.param("id")

  const blogReturn = await db.selectDistinct().from(postTable).where(eq(postTable.id,id))

  const blog = blogReturn[0]

  return c.json(blog)
})

blogRouter.put('/blog', (c) => {
  return c.text('Hello Hono!')
})
