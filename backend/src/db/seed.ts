import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './schemas/user';
import { postTable } from './schemas/post';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function seed() {
  // Clear existing data
  await db.delete(usersTable).execute();
  await db.delete(postTable).execute();

  // Seed users
  const user1 = await db.insert(usersTable).values({
    email: 'user1@example.com',
    name: 'UserOne',
    password: 'password1',
  }).returning();

  const user2 = await db.insert(usersTable).values({
    email: 'user2@example.com',
    name: 'UserTwo',
    password: 'password2',
  }).returning();

  const user3 = await db.insert(usersTable).values({
    email: 'user3@example.com',
    name: 'UserThree',
    password: 'password3',
  }).returning();

  // Seed posts
  await db.insert(postTable).values([
    {
      title: 'First Post',
      content: 'This is the first post.',
      published: true,
      authorId: user1[0].id,
    },
    {
      title: 'Second Post',
      content: 'This is the second post.',
      published: false,
      authorId: user2[0].id,
    },
    {
      title: 'Third Post',
      content: 'This is the third post.',
      published: true,
      authorId: user3[0].id,
    },
    {
      title: 'Fourth Post',
      content: 'This is the fourth post.',
      published: false,
      authorId: user1[0].id,
    },
  ]).execute();

  console.log('Database seeded successfully!');
}

seed().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
}).finally(() => {
  pool.end();
});
