import { Hono } from "hono"
import {sign} from "hono/jwt"
import { usersTable } from "../db/schemas/user"
import { eq } from "drizzle-orm"
import { db } from ".."


export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>()


type user = typeof usersTable.$inferInsert

userRouter.post('/signup', async (c) => {

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


userRouter.post('/signin', async (c) => {

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
