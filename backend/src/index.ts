import { Hono } from 'hono'

const app = new Hono().basePath('/api/v1')


app.post('/signup', (c) => {
  return c.text('Hello Hono!')
})

app.post('/signin', (c) => {
  return c.text('Hello Hono!')
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
