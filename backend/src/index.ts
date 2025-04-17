import { drizzle } from 'drizzle-orm/postgres-js'
import { Hono } from 'hono'
import { usersTable } from './db/schemas/user'
import { decode,sign,verify } from 'hono/jwt'
import { eq } from 'drizzle-orm'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>().basePath('/api/v1')

const db= drizzle(process.env.DATABASE_URL!)

type user = typeof usersTable.$inferInsert


app.post('/signup', async (c) => {

  const body = await c.req.json()

  const insertUser:user={
    email:body.email,
    password:body.password,
  } 

  const retUser=await db.insert(usersTable).values(insertUser).returning()

  const token =await sign({"id":retUser[0].id},c.env.JWT_SECRET)

  return c.json({
    jwt:token
  })
})

app.post('/signin', async (c) => {

  const body= await c.req.json()

  const user = await db
                .select()
                .from(usersTable)
                .where(
                  eq(usersTable.email,body.email)
                )
  
  if(!user.length){
    c.status(403)
    return c.json({"error":"invalid user or password"})
  }
  else{
    const token= await sign({id:user[0].id},c.env.JWT_SECRET)

    return c.json({jwt:token})
  }
})

app.post('/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/blog', (c) => {
  return c.text('Hello Hono!')
})

app.put('/blog', (c) => {
  return c.text('Hello Hono!')
})

export default app
