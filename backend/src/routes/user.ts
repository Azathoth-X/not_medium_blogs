import { Hono } from "hono"
import {sign} from "hono/jwt"
import { usersTable } from "../db/schemas/user"
import { eq } from "drizzle-orm"
import { db } from ".."
import {signUpInput, signInInput} from "@azath0th_28/not_medium_types/dist"


export const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>()


type user = signUpInput

userRouter.post('/signup', async (c) => {

  const body = await c.req.json()

  const {success} = signUpInput.safeParse(body)
  if (!success){
    return c.json({message:"input not correct "},411)
  }
  
  const insertUser=body as user

  const retUser=await db.insert(usersTable).values(insertUser).returning()

  const token =await sign({"id":retUser[0].id},c.env.JWT_SECRET)

  return c.json({
    jwt:token
  })
})


userRouter.post('/signin', async (c) => {
  const body = await c.req.json()
  
  const {success} = signInInput.safeParse(body)
  if (!success) {
    return c.json({message: "Invalid input"}, 411)
  }

  const user = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.email, body.email))
  
  if(!user.length){
    c.status(403)
    return c.json({"error":"invalid user or password"})
  }
  else{
    const token= await sign({id:user[0].id},c.env.JWT_SECRET)

    return c.json({jwt:token})
  }
})
