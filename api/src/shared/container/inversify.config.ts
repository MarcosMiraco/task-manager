import { Container } from "inversify";
import { TYPES } from "@container/inversify.types.js";
import { TaskService } from "@tasks/task.service.js";
import { TaskRepository } from "@tasks/task.repository.js";
import { TaskController } from "@tasks/task.controller.js";
import { Model } from "mongoose";
import { redisClient } from "@src/cache/redis.client.js";

import type Redis from "ioredis";
import type { ITaskController, ITaskRepository } from "@tasks/task.types.js";
import { TaskModel, type TTask } from "@src/modules/task/task.model.js";
import { CachedService, type ICachedService } from "../models/cachedService.js";


export const container = new Container();
container.bind<ITaskRepository>(TYPES.ITaskRepository).to(TaskRepository).inSingletonScope();
container.bind<ITaskController>(TYPES.ITaskController).to(TaskController).inSingletonScope();
container.bind<ICachedService>(TYPES.ICachedService).to(CachedService).inSingletonScope();
container.bind<TaskService>(TYPES.ITaskService).to(TaskService).inSingletonScope();
container.bind<Model<TTask>>(TYPES.TaskModel).toConstantValue(TaskModel);
container.bind<Redis.Redis>(TYPES.RedisClient).toConstantValue(redisClient);
