import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';
import logRequestMiddleware from './middlewares/log-request';

const app = express()

app.use(logRequestMiddleware)

app.use(bodyParser.json())
app.use(routes)

export default {
    run(port: number) {
        app.listen(port, () => console.log('Serving at port ', port))
    }
}