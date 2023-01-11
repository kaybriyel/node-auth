import { NextFunction, Request, Response } from "express"

export default (req:Request, res: Response, next: NextFunction) => {
    console.log('use save cookie')
    const s = req.session as any
    s.ip = req.ip
    next()
}