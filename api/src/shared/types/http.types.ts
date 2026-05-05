export class ErrorHTTP extends Error {
    statusCode: number;
    message: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export class NotImplementedError extends ErrorHTTP {
    constructor(message: string = 'Not Implemented') {
        super(501, message);
    }
}

export type HTTP_STATUS = 200 | 201 | 400 | 404 | 500;

export type HTTP_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiResponse<T = any> {
    data: T;
    statusCode: HTTP_STATUS;
}
