import { inject, injectable } from 'inversify';
import { TaskRepository } from '@tasks/task.repository.js';
import type { ITaskService, Task } from '@tasks/task.types.js';
import { TYPES } from '@shared/container/inversify.types.js';


@injectable()
export class TaskService implements ITaskService {
    private taskRepository: TaskRepository;

    constructor(
        @inject(TYPES.ITaskRepository) taskRepository: TaskRepository
    ) {
        this.taskRepository = taskRepository;
    }

    listTasks() { return this.taskRepository.findAll(); }

    createTask(title: string, description: string) {
        return this.taskRepository.create({ title, description });
    }

    deleteTask(taskId: string) {
        this.taskRepository.delete(taskId);
        return "Task deleted successfully";
    }

    updateTask(taskId: string, task: Omit<Task, 'id' | 'createdAt'>) {
        return this.taskRepository.update(taskId, task);
    }
};
