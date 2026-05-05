import type { ApiResponse } from "@shared/types/http.types.js";
import type { Request, Response } from "express";

export interface Task {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
}

export interface ITaskRepository {
    findAll(): Task[];
    create(data: Omit<Task, 'id' | 'createdAt'>): Task;
    delete(taskId: string): boolean;
    update(taskId: string, task: Omit<Task, 'id' | 'createdAt'>): Task;
}

export interface ITaskService {
    listTasks(): Task[];
    createTask(title: string, description: string): Task;
    deleteTask(taskId: string): string;
    updateTask(taskId: string, task: Omit<Task, 'id' | 'createdAt'>): Task;
}

export interface ITaskController {
    list(request: Request, response: Response): ApiResponse<Task[]>;
    create(request: Request, response: Response): ApiResponse<Task>;
    delete(request: Request, response: Response): ApiResponse<string>;
    update(request: Request, response: Response): ApiResponse<Task>;
}
