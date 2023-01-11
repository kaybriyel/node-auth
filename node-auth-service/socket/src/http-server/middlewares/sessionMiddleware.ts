import session from "express-session";
import connectRedis from 'connect-redis'
const redisStore = connectRedis(session)
import redisClient from '../../utils/redis'

export default session({
    name: 'auth',
    secret: 'ABC',
    resave: false,
    saveUninitialized: false,
    store: new redisStore({
        client: redisClient
    }),
    cookie: {
        maxAge: 60 * 5000//24 * 60 * 60 * 1000
    }
})