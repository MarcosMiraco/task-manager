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

    list = () => {
        return createApiResponse(this.taskService.listTasks());
    }

    create = (request: Request) => {
        const { title, description } = request.body;

        return createApiResponse(this.taskService.createTask(title, description), 201);
    }

    delete = (request: Request) => {
        const { taskId } = request.params;

        return createApiResponse({
            message: this.taskService.deleteTask(taskId as string)
        });
    }

    update = (request: Request) => {
        const { taskId } = request.params;
        const { title, description } = request.body;

        return createApiResponse(this.taskService.updateTask(taskId as string, { title, description }));
    }
};
