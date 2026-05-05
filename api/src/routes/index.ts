import type { Application } from 'express';
import { loadRouteModules } from './modules.js';


export async function registerRoutes(app: Application, prefix: string = '') {
    const routeModules = await loadRouteModules();
    routeModules.forEach((routeModule) => routeModule.register(app, prefix + routeModule.prefix));
}
