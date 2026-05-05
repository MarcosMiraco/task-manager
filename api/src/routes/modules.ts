import path from 'node:path';
import { globSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import taskRoutes from '@tasks/task.routes.js';
import type { TRouteModule } from '@src/shared/types/loader.types.js';


export async function loadRouteModules(): Promise<TRouteModule>  {
    const modules: TRouteModule = [];

    if (process.env.NODE_ENV !== "development") {
        return [
            taskRoutes
        ];
    }

    const dir = import.meta.dirname;
    const selector = path.resolve(dir, '..', 'modules', '**', '*.routes.+(ts|js)');
    const modulePaths = globSync(selector);
    
    if (modulePaths.length === 0) {
        throw new Error('No route files found');
    }

    for (const modulePath of modulePaths) {
        const moduleUrl = pathToFileURL(modulePath).href;    
        const routeModule = await import(moduleUrl);
        if (routeModule.default) {
            modules.push(routeModule.default);
        }
    }

    return modules;    
}