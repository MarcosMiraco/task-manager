import { ErrorHTTP, type ApiResponse, type HTTP_STATUS } from "@shared/types/http.types.js";
import type { NextFunction, Request, Response } from "express";


export function createApiResponse(data: any, statusCode: HTTP_STATUS = 200): ApiResponse {
    return { data, statusCode };
}

export function responseHandler(_request: Request, response: Response, next: NextFunction) {
    if (!response.locals.apiResponse) {
        return next(new ErrorHTTP(404, 'Not Found'));
    }

    const apiResponse: ApiResponse = response.locals.apiResponse;
    response
        .status(apiResponse.statusCode)
        .json(apiResponse.data);
}
