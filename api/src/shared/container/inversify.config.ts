import { Container } from "inversify";
import { TYPES } from "./inversify.types.js";
import { TaskRepository } from "../../modules/task/task.repository.js";
import type { ITaskController, ITaskRepository } from "../../modules/task/task.types.js";
import { TaskService } from "@tasks/task.service.js";
import { TaskController } from "@tasks/task.controller.js";


export const container = new Container();
container.bind<ITaskRepository>(TYPES.ITaskRepository).to(TaskRepository).inSingletonScope();
container.bind<ITaskController>(TYPES.ITaskController).to(TaskController).inSingletonScope();
container.bind<TaskService>(TYPES.ITaskService).to(TaskService).inSingletonScope();
