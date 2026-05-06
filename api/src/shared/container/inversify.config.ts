import { Container } from "inversify";
import { TYPES } from "@container/inversify.types.js";
import { TaskService } from "@tasks/task.service.js";
import { TaskRepository } from "@tasks/task.repository.js";
import { TaskController } from "@tasks/task.controller.js";
import type { ITaskController, ITaskRepository } from "@tasks/task.types.js";
import { TaskModel } from "@src/modules/task/task.model.js";


export const container = new Container();
container.bind<ITaskRepository>(TYPES.ITaskRepository).to(TaskRepository).inSingletonScope();
container.bind<ITaskController>(TYPES.ITaskController).to(TaskController).inSingletonScope();
container.bind<TaskService>(TYPES.ITaskService).to(TaskService).inSingletonScope();
container.bind(TYPES.TaskModel).toConstantValue(TaskModel);
