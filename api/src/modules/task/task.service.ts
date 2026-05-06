import { inject, injectable } from 'inversify';
import { TaskRepository } from '@tasks/task.repository.js';
import { TYPES } from '@shared/container/inversify.types.js';
import type { ITaskService } from '@tasks/task.types.js';
import type { TPartialTask } from '@tasks/task.model.js';


@injectable()
export class TaskService implements ITaskService {

    constructor(
        @inject(TYPES.ITaskRepository) private taskRepository: TaskRepository
    ) {}

    findAll() { 
        return this.taskRepository.findAll(); 
    }

    findById(taskId: string) {
        return this.taskRepository.findById(taskId);
    }

    create(title: string, description: string) {
        return this.taskRepository.create({ title, description });
    }

    delete(taskId: string) {
        return this.taskRepository.delete(taskId);
    }

    update(taskId: string, task: TPartialTask) {
        return this.taskRepository.update(taskId, task);
    }
};
