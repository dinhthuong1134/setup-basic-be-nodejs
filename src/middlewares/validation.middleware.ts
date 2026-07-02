
import { NextFunction, Request, Response } from "express";
import {ZodError, ZodObject} from "zod";
import {ParsedQs} from "qs";
import {ParamsDictionary} from 'express-serve-static-core';

export const validationMiddleware = (schema: ZodObject) => async(req: Request, res: Response, next: NextFunction) => {
    Object.defineProperty(req, "query", {
    ...Object.getOwnPropertyDescriptor(req, "query"),
    value: req.query,
    writable: true,
    });

    try {
        const parsed = await schema.parseAsync({
            body: req.body,
            params: req.params,
            query: req.query
        });

        req.body = parsed.body;
        req.query = parsed.query as ParsedQs; 
        req.params = parsed.params as ParamsDictionary;
        return next();

    } catch (error) {
        if(error instanceof ZodError) {
            return res.status(400).json({
                status: 400,
                errors: error.issues.map(err => ({
                    path: err.path[1],
                    message: err.message
                })) 
            });
        }
        return next(error);
    }
}