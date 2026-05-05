import { Router, type Application } from 'express';
import { routeHandler } from '@utils/route.handler.js';
import { container } from '@container/inversify.config.js';
import { methodNotAllowedHandler } from '@shared/utils/error.handler.js';
import { TYPES } from '@shared/container/inversify.types.js';
import type { ITaskController } from './task.types.js';
import type { IModule } from '@src/shared/types/loader.types.js';


const taskController = container.get<ITaskController>(TYPES.ITaskController);
const router = Router();

router.get('/', routeHandler(taskController.list));
router.post('/', routeHandler(taskController.create));
router.delete('/:taskId', routeHandler(taskController.delete));
router.patch('/:taskId', routeHandler(taskController.update));


export default {
    register: (app: Application, prefix: string) => {
        console.log('Registering Task routes');
        
        app.use(prefix, router);
        app.all(prefix, methodNotAllowedHandler(['GET', 'POST', 'DELETE']));
        app.all(prefix + "/:taskId", methodNotAllowedHandler(['DELETE', 'PATCH']));
    },
    prefix: "/tasks"
} as IModule;
