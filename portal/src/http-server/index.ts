import express from 'express';

const app = express()

app.use(express.static('public'))

export default {
    run(port: number) {
        app.listen(port, () => console.log('Serving at port ', port))
    }
}