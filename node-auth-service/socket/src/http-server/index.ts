import bodyParser from 'body-parser';
import express, { NextFunction } from 'express';
import logRequestMiddleware from './middlewares/log-request';
import { Server, Socket } from 'socket.io'
import sessionMiddleware from './middlewares/sessionMiddleware';
import corsMiddleware from './middlewares/corsMiddleware';
import client from '../utils/redis';

let io: Server
const app = express()

function init() {
    app.use(sessionMiddleware)
    app.use(corsMiddleware)
    app.use(logRequestMiddleware)
    app.use(bodyParser.json())

    app.get('/sockets', async (req, res) => {
        const s = req.session as any
        if (!s.user) return res.status(401).json({ message: 'Please login!' })
        const sockets = (await io.fetchSockets()).map(s => s.id)
        res.json({
            sockets
        })
    })
}

function socketListen() {

    io.on('connection', socket => {
        socket.emit('hi')
        socket.on('test', () => {
            socket.emit('hi')
        })

        socket.on('hi', () => console.log('hi from', socket.id))
    })
}

export default {
    run(port: number) {
        init()
        const server = app.listen(port, () => console.log('Serving at port ', port))
        io = new Server(server, {
            cors: {
                origin: 'http://localhost:8080',
                credentials: true
            }
        })
        socketListen()
    }
}