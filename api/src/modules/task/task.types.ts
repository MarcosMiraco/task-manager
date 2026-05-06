import type { ApiResponse } from "@shared/types/http.types.js";
import type { Request, Response } from "express";
import type { TPartialTask, TTask } from "./task.model.js";


export interface ITaskRepository {
    findAll(): Promise<TTask[]>;
    findById(taskId: string): Promise<TTask>;
    create(data: TPartialTask): Promise<TTask>;
    delete(taskId: string): Promise<TTask>;
    update(taskId: string, task: TPartialTask): Promise<TTask>;
}

export interface ITaskService {
    findAll(): Promise<TTask[]>;
    findById(taskId: string): Promise<TTask>;
    create(title: string, description: string): Promise<TTask>;
    delete(taskId: string): Promise<TTask>;
    update(taskId: string, task: TPartialTask): Promise<TTask>;
}

export interface ITaskController {
    findAll(request: Request, response: Response): Promise<ApiResponse<TTask[]>>;
    findById(request: Request, response: Response): Promise<ApiResponse<TTask>>;
    create(request: Request, response: Response): Promise<ApiResponse<TTask>>;
    delete(request: Request, response: Response): Promise<ApiResponse<TTask>>;
    update(request: Request, response: Response): Promise<ApiResponse<TTask>>;
}
