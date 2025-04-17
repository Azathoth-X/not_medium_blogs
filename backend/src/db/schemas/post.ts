import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./user";
import { relations } from "drizzle-orm";

export const postTable= pgTable('posts',{
    id: uuid().primaryKey().defaultRandom(),
    title: text(),
    content: text(),
    published: boolean().default(false),
    authorId: uuid('author_id').references(()=>usersTable.id)
})

export const postRelation= relations(postTable,({one})=>({
    author:one(usersTable,{
        fields:[postTable.authorId],
        references:[usersTable.id],
    })
}))