import { createReadStream } from 'fs'
import Http from 'http'
import Koa from 'koa'
import Router from 'koa-router'
import Io from "socket.io"
import {v4 as uuid} from "uuid";

const app      = new Koa()
const http     = Http.createServer(app.callback())
const IoServer = Io(http)
const router   = new Router()

IoServer.on('connection', () => console.log(`User ${uuid()} connected`))

router.get('/', async (ctx, next) => {
    ctx.type = 'html';
    ctx.body = createReadStream('index.html');
    await next()
})

app.use(router.routes())

http.listen(3000, () => console.log('(i) Listening on port 3000'))
