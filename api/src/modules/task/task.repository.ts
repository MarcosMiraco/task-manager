import { inject, injectable } from "inversify";
import { ErrorHTTP } from "@src/shared/types/http.types.js";
import { TYPES } from "@src/shared/container/inversify.types.js";
import { TaskModel, type TPartialTask, type TTask } from "@tasks/task.model.js";
import type { Model } from "mongoose";
import type { ITaskRepository } from "@tasks/task.types.js";


@injectable()
export class TaskRepository implements ITaskRepository {
    
    constructor(
        @inject(TYPES.TaskModel) private taskModel: Model<TTask>
    ) {}

    async findAll() { 
        const tasks = await TaskModel.find().exec();

        return tasks;
    }

    async findById(taskId: string) { 
        const task = await this.taskModel.find({ _id: taskId }).exec();
        if (!task) throw new ErrorHTTP(404, "Task Not Found");

        return task as unknown as TTask;
    }

    async create(data: TPartialTask) {
        const task: TTask = {
            ...data,
            createdAt: new Date(),
        };

        return await this.taskModel.create(task);
    }

    async delete(taskId: string) {
        const task = await this.taskModel.findOneAndDelete({ _id: taskId })
        if (!task) throw new ErrorHTTP(404, "Task Not Found");

        return task;
    }

    async update(taskId: string, task: TPartialTask) {
        const updatedTask = await this.taskModel.findByIdAndUpdate(taskId, task, { new: true })
        if (!updatedTask) {
            throw new ErrorHTTP(404, 'Task not found');
        }

        return updatedTask;
    }
};
