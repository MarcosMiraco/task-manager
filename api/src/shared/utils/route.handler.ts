import type { ApiResponse } from "@shared/types/http.types.js";
import type { NextFunction, Request, Response } from "express";


type ControllerFn = (
  request: Request,
  response: Response,
  next: NextFunction
) => ApiResponse | Promise<ApiResponse>;


export function routeHandler(fn: ControllerFn) {
    
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result: ApiResponse = await fn(request, response, next);
            response.locals.apiResponse = result;
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
