import { injectable } from "inversify";
import type { ITaskRepository } from "@tasks/task.types.js";
import { ErrorHTTP } from "@src/shared/types/http.types.js";
import { TaskModel, type TPartialTask, type TTask } from "@tasks/task.model.js";


@injectable()
export class TaskRepository implements ITaskRepository {
    async findAll() { 
        const tasks = await TaskModel.find().exec();

        return tasks;
    }

    async findById(taskId: string) { 
        const task = await TaskModel.find({ _id: taskId }).exec();
        if (!task) throw new ErrorHTTP(404, "Task Not Found");

        return task as unknown as TTask;
    }

    async create(data: TPartialTask) {
        const task: TTask = {
            ...data,
            createdAt: new Date(),
        };

        return await TaskModel.create(task);
    }

    async delete(taskId: string) {
        const task = await TaskModel.findOneAndDelete({ _id: taskId })
        if (!task) throw new ErrorHTTP(404, "Task Not Found");

        return task;
    }

    async update(taskId: string, task: TPartialTask) {
        const updatedTask = await TaskModel.findByIdAndUpdate(taskId, task, { new: true })
        if (!updatedTask) {
            throw new ErrorHTTP(404, 'Task not found');
        }

        return updatedTask;
    }
};
