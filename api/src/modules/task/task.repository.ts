import { injectable } from "inversify";
import type { ITaskRepository, Task } from "@tasks/task.types.js";
import { ErrorHTTP } from "@src/shared/types/http.types.js";


@injectable()
export class TaskRepository implements ITaskRepository {
    /* WIP
      Banco de dados em memória por enquanto
    */
    private tasks: Task[] = [];

    findAll() { return this.tasks }

    create(data: Omit<Task, 'id' | 'createdAt'>) {
        const task: Task = {
            id: Math.random().toString(36).substring(2, 9),
            ...data,
            createdAt: new Date(),
        };
        this.tasks.push(task);

        return task;
    }

    delete(taskId: string) {
        const taskIndex = this.tasks.findIndex((t) => t.id === taskId);
        console.log('Deleting task with id:', taskId, 'Found index:', taskIndex, this.tasks);
        if (taskIndex === -1) {
            throw new ErrorHTTP(404, 'Task not found');
        }
        this.tasks.splice(taskIndex, 1);
        
        return true;
    }

    update(taskId: string, task: Omit<Task, 'id' | 'createdAt'>) {
        const taskIndex = this.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex === -1) {
            throw new ErrorHTTP(404, 'Task not found');
        }
        const updatedTask = {
            ...this.tasks[taskIndex],
            ...task
        } as Task;

        this.tasks[taskIndex] = updatedTask;
        return updatedTask;
    }
};
