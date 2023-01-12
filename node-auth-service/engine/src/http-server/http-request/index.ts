import { Request } from "express"
const { FetchStream } = require('fetch')

interface IResponse {
    status: number
    json: any
}

/**
 * Send http request to core API
 * @param req client request from browser
 * @returns response status and response json
 */
export default function sendRequest(req: Request) {
    return new Promise<IResponse>((res, rej) => {
        let text = ''
        const options = {
            method: req.method,
            headers: req.headers,
            payload: JSON.stringify(req.body)
        }

        // if request with authorization
        if (req.headers.authorization === 'Bearer') {
            const s = req.session as any
            if (s?.user)
                req.headers.authorization = `Bearer ${s.user.token}`
            else {
                return res({
                    status: 403,
                    json: {
                        message: 'Unauthenticated'
                    }
                })
            }
        }
        const url = `http://${process.env.API_IP}:${process.env.API_PORT}${req.url}`
        console.log(req.method, url)
        const fetch = new FetchStream(url, options)

        fetch.on('data', (d: string) => text += d)
        fetch.on('end', () => {
            try {
                const json = JSON.parse(text)
                res({status: fetch.meta.status, json })
            } catch (error) {
                res({ status: fetch.meta.status, json: {
                    message: 'Could not parse json'
                } })
            }
        })
    })
}