import { Hono } from "hono"
import { verify} from "hono/jwt"
import { sql } from "drizzle-orm"
import { RootVariables } from ".."
import { postTable } from "../db/schemas/post"
import { JWTPayload } from "hono/utils/jwt/types"
import { createBlogInput } from "@azath0th_28/not_medium_types/dist"



export const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  },
  Variables:RootVariables & {
    authorId : string
  }
}>()

interface CustomJWTPayload extends JWTPayload {
  id: string
}

type inferInsert = typeof postTable.$inferInsert
type inputBlog = Omit<inferInsert, 'id' >

blogRouter.get('/',async (c) => {
  const db = c.get("db")
  
  try {
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
  } catch (error) {
    return c.json({ error: "Failed to retrieve blogs" }, 500)
  }
})

blogRouter.use("/*", async (c, next) => {
  try {
    // Skip auth for GET /:id and GET / routes
    const path = c.req.path;
    const method = c.req.method;
    
    if (method === "GET" && (path === "/" || /^\/[^\/]+$/.test(path))) {
      return await next();
    }
    
    const authHeader = c.req.header("Authorization") || "";
    if (!authHeader) {
      return c.json({ error: "Authorization header missing" }, 401);
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return c.json({ error: "Invalid Authorization format" }, 401);
    }

    const response = await verify(token, c.env.JWT_SECRET) as CustomJWTPayload;
    
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
    try {
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
        const db = c.get("db")
        const insertReturn = await db.insert(postTable).values(blogPost).returning()
        const blog = insertReturn[0]

        return c.json({ 
            id: blog.id,
            message: "Blog created successfully" 
        })
    } catch (error) {
        console.error("Failed to create blog:", error)
        return c.json({ error: "Failed to create blog" }, 500)
    }
})

blogRouter.get('/:id', async (c) => {
  const uuid = c.req.param("id")
  const db = c.get("db")
  
  try {
    const blogReturn = await db.query.postTable.findFirst({
      with: {
        author: {
          columns: {
            name: true
          }
        }
      },
      where: (post, {eq}) => (eq(post.id, uuid))
    })
    
    if (!blogReturn) {
      return c.json({ error: "Blog not found" }, 404)
    }
    
    return c.json(blogReturn)
  } catch (err) {
    return c.json({ error: "Failed to retrieve blog" }, 500)
  }
})

