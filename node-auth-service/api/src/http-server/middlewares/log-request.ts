import { NextFunction, Request, Response } from "express"

/**
 * Log all request from client to console
 * @param req 
 * @param res 
 * @param next 
 */
 export default function logRequestMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log('use log request middleware')
    console.log('=====================>>>>', (new Date).toJSON())
    console.log(req.method + ' : ' + req.url)
    next()
}