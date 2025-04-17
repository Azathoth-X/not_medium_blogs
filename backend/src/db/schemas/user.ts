import {pgTable, text, uuid} from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users',{
    id: uuid().primaryKey().defaultRandom(),
    email: text().notNull().unique(),
    name: text(),
    password: text().notNull()
})
