import { inject, injectable } from 'inversify';
import { CachedService } from '@models/cachedService.js';
import { TaskRepository } from '@tasks/task.repository.js';
import { TYPES } from '@shared/container/inversify.types.js';
import { CACHE_KEYS, CACHE_TTL, generateSpecificKey } from '@cache/redis.client.js';

import type Redis from 'ioredis';
import type { ITaskService } from '@tasks/task.types.js';
import type { TPartialTask } from '@tasks/task.model.js';


@injectable()
export class TaskService extends CachedService implements ITaskService {

    constructor(
        @inject(TYPES.RedisClient) redisClient: Redis.Redis,
        @inject(TYPES.ITaskRepository) private taskRepository: TaskRepository
    ) {
        super(redisClient, CACHE_TTL)
    }

    findAll() { 
        return this.getOrSet(CACHE_KEYS.ALL_TASKS, () => this.taskRepository.findAll()); 
    }

    findById(taskId: string) {
        const cacheKey = generateSpecificKey(CACHE_KEYS.TASK_BY_ID, taskId);
        return this.getOrSet(cacheKey, () => this.taskRepository.findById(taskId));
    }

    async create(title: string, description: string) {
        const [ createTaskResponse ] = await Promise.all([
            this.taskRepository.create({ title, description }),
            this.deleteKey(CACHE_KEYS.ALL_TASKS)
        ]);

        return createTaskResponse;
    }

    delete(taskId: string) {
        return this.taskRepository.delete(taskId);
    }

    update(taskId: string, task: TPartialTask) {
        return this.taskRepository.update(taskId, task);
    }
};
