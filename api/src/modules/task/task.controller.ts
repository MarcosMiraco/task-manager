import { inject, injectable } from 'inversify';
import type { Request } from 'express';
import { TaskService } from "@tasks/task.service.js";
import type { ITaskController } from "@tasks/task.types.js";
import { createApiResponse } from '@shared/utils/response.handler.js';
import { TYPES } from '@shared/container/inversify.types.js';


@injectable()
export class TaskController implements ITaskController {
    private taskService: TaskService;

    constructor(
        @inject(TYPES.ITaskService) taskService: TaskService
    ) {
        this.taskService = taskService;
    }

    findAll = async () => {
        const serviceResponse = await this.taskService.findAll();

        return createApiResponse(serviceResponse);
    }

    findById = async (request: Request) => {
        const { taskId } = request.params;
        const serviceResponse = await this.taskService.findById(taskId as string);

        return createApiResponse(serviceResponse);
    }

    create = async (request: Request) => {
        const { title, description } = request.body;
        const serviceResponse = await this.taskService.create(title, description);

        return createApiResponse(serviceResponse, 201);
    }

    delete = async (request: Request) => {
        const { taskId } = request.params;
        const serviceResponse = await this.taskService.delete(taskId as string);

        return createApiResponse(serviceResponse);
    }

    update = async (request: Request) => {
        const { taskId } = request.params;
        const { title, description } = request.body;
        const serviceResponse = await this.taskService.update(taskId as string, { title, description });

        return createApiResponse(serviceResponse);
    }
};
