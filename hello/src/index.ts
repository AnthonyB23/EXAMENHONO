import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import ping from  './ping/ping.js'
import greet from './greet/greet.js'

const app = new Hono()

// definar una ruta raiz 
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// montar el enrutador de ping en la ruta ping

app.route('/', ping)

// montar el enrutador de greet en la ruta greet
app.route('/', greet)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
