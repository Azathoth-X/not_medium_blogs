import { Hono } from "hono"
import {sign, verify} from "hono/jwt"
import { eq, sql } from "drizzle-orm"
import { app, db } from ".."
import { postTable } from "../db/schemas/post"
import { JWTPayload } from "hono/utils/jwt/types"
import { createBlogInput } from "@azath0th_28/not_medium_types/dist"
import { usersTable } from "../db/schemas/user"

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

blogRouter.get('/',async (c) => {
  const blogs = await db.query.postTable.findMany({
    with: {
      author: {
        columns:{
          name: true
        }
      }
    },
    limit: 10,
    orderBy: sql`RANDOM()`
  });

  return c.json(blogs)
})

blogRouter.use("/*", async (c, next) => {
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

blogRouter.post('/', async (c) => {
    const body = await c.req.json()
    
    const {success} = createBlogInput.safeParse(body)
    if (!success) {
        return c.json({message: "Invalid blog input"}, 411)
    }

    const blogPost: inputBlog = {
        ...body,
        authorId: c.get("authorId"),
        published: true
    }

    const insertReturn = await db.insert(postTable).values(blogPost).returning()
    const blog = insertReturn[0]

    return c.redirect(`/blog/${blog.id}`)
})

blogRouter.get('/:id', async (c) => {

  const id =c.req.param("id")

  const blogReturn = await db.selectDistinct().from(postTable).where(eq(postTable.id,id))

  const blog = blogReturn[0]

  return c.json(blog)
})

