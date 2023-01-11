import { NextFunction, Request, Response } from "express"
import sendRequest from "../http-request"

/**
 * Pass all request from client to core API
 * @param req 
 * @param res 
 * @param next 
 */
export  default async function requestCoreAPIMiddleware(req: Request, res: Response, next: NextFunction) {
    const { status, json } = await sendRequest(req)
    res.locals.status = status
    res.locals.data = json
    next()
    res.status(status).json(json)
}