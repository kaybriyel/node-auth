import session from 'express-session'
import connectRedis from 'connect-redis'
import { sessionClient } from '../../utils/redis';
const redisStore = connectRedis(session);

export default session({
    name: 'auth',
    secret: 'ABC',
    resave: false,
    saveUninitialized: false,
    store: new redisStore({
        client: sessionClient()
    }),
    cookie: {
        maxAge: 60 * 5000//24 * 60 * 60 * 1000
    }
})