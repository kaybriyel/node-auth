import express from 'express'
import requestCoreAPIMiddleware from '../middlewares/request-core-api'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('<h1>Engine</h1>').end()
})

router.get('/sid', (req, res) => {
    const s = req.session as any
    res.json({
        sid: s.id,
        credential: s.user
    })
})

// pass all request from client to core API
router.use(requestCoreAPIMiddleware)

// ========================== auth routes **** these handlers are called by request core api middleware next()

router.post('/signup', (req, res) => {
    const s = req.session as any
    if (res.locals.status === 201)
        s.user = res.locals.data.data
})

router.post('/signin', (req, res) => {
    const s = req.session as any
    if (res.locals.status === 200)
        s.user = res.locals.data.data
})

router.post('/signout', (req, res) => {
    const s = req.session as any
    if (res.locals.status === 200)
        s.user = undefined
})
// ========================== end auth routes

export default router;
