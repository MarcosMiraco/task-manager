import { ErrorHTTP, type HTTP_METHOD } from "@shared/types/http.types.js";
import type { NextFunction, Request, Response } from "express";


export function errorHandler(error: unknown, _request: Request, response: Response, _next: NextFunction) {
    if (error instanceof ErrorHTTP) {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        response.status(statusCode).json({ error: message });
        return;
    }

    response.status(500).json({ error: 'Internal Server Error' });
}

export function methodNotAllowedHandler(allowedMethods: HTTP_METHOD[]) {
    return (request: Request, response: Response, next: NextFunction) => {
        if (allowedMethods.includes(request.method as HTTP_METHOD)) {
            return next();
        }

        response.set('Allow', allowedMethods.join(', '));
        response.status(405).json({ error: 'Method Not Allowed' });
    }
}
