import { NextFunction, Request, Response } from "express";
import {ErrorWidthStatus} from '../types/err.type';

export const notFoundMiddlware = (req: Request, res: Response, next: NextFunction) => {
    const err: ErrorWidthStatus = new Error("Đường dẫn không tồn tại");
    err.status = 404;
    next(err);
}

export const ErrorHandlingMiddleware = (err: ErrorWidthStatus, req: Request, res: Response, _next: NextFunction) => {
    const message = err instanceof Error ? err.message : err;
    const status = err.status || 500;

    res.status(status).json({
        susscess: false,
        status,
        message
    })
}