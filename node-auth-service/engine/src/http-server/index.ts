import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';
import logRequestMiddleware from './middlewares/log-request';
import sessionMiddleware from './middlewares/sessionMiddleware';
import corsMiddleware from './middlewares/corsMiddleware';
import saveCookieMiddleware from './middlewares/saveCookieMiddleware';

const app = express()

function init() {

    // use client request session
    app.use(sessionMiddleware)
    app.use(corsMiddleware)
    app.use(bodyParser.json())
    app.use(saveCookieMiddleware)
    app.use(logRequestMiddleware) // use middleware to log all request
    // app.use(express.static('public'))

    app.use(routes)  // handle cllient request
}

export default {
    run(port: number) {
        init()
        app.listen(port, () => console.log('Serving at port ', port))
    }
}