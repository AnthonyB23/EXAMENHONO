import { Hono } from 'hono';
import { Greet } from './greet.mariadb.js';
const greet = new Hono();
// Nuevo Endpoint GET STATS
greet.get('/greet/stats', async (c) => c.json(await Greet.stats()));
greet.get('/regards', async (c) => c.json(await Greet.findAll()));
greet.get('/greet/:id', async (c) => c.json(await Greet.findById(Number(c.req.param('id')))));
greet.post('/greet', async (c) => {
    const param = await c.req.json();
    const result = await Greet.create(param);
    return c.json(result, 201);
});
// Nuevo Endpoint PUT - UPDATE
greet.put('/greet/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const data = await c.req.json();
    const result = await Greet.update(id, data);
    return c.json(result);
});
// Nuevo Endpoint DELETE 
greet.delete('/greet/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const result = await Greet.remove(id);
    return c.json({ deleted: result });
});
export default greet;
