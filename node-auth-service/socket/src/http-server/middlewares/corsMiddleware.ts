import cors from 'cors'

const allowlist = ['http://localhost:8080']
const corsOptionsDelegate = function (origin: any, callback: any) {
    let corsOptions;
    if (allowlist.indexOf(origin) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    console.log(corsOptions)
    callback(null, corsOptions) // callback expects two parameters: error and options
}

export default cors({
    origin: corsOptionsDelegate,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})